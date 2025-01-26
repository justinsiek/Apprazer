from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF
import cv2
import numpy as np
import pytesseract


# Flask app setup
app = Flask(__name__)
CORS(app)

# Allowable file extensions
ALLOWED_EXTENSIONS = {'pdf'}

# Check if the file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_image(file_path):
    # Set Tesseract path for Windows
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    
    pdf_document = fitz.open(file_path)
    print(f"Total pages in PDF: {len(pdf_document)}")
    extracted_data = {}
    
    # Define extraction coordinates for each field on each page
    fields = {
        'monthly_income': (0, 0.575, 0.88, 0.06, 0.013),  # Page 1
        'debt': (2, 0.67, 0.653, 0.06, 0.013),  # Page 3
        'loan_amount': (4, 0.166, 0.122, 0.07, 0.013),  # Page 4 (index 3)
        'property_value': (4, 0.479, 0.175, 0.07, 0.013),  # Page 4 (index 3)
        'loan_purpose': (4, 0.4735, 0.127, 0.005, 0.005),  # Page 4 (index 3)
    }
    
    for field_name, (page_num, left_ratio, top_ratio, width_ratio, height_ratio) in fields.items():
        try:
            print(f"\nProcessing {field_name} on page {page_num + 1}")
            # Get the specified page
            page = pdf_document[page_num]
            
            # Convert page to image
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(
                pix.height, pix.width, pix.n
            )
            
            # Calculate ROI coordinates
            height, width = img.shape[:2]
            roi_x = int(width * left_ratio)
            roi_y = int(height * top_ratio)
            roi_w = int(width * width_ratio)
            roi_h = int(height * height_ratio)
            
            # Create a copy of the full page and draw rectangle for visualization
            full_page_with_rect = img.copy()
            cv2.rectangle(full_page_with_rect, 
                         (roi_x, roi_y), 
                         (roi_x + roi_w, roi_y + roi_h), 
                         (0, 255, 0), 2)
            
            # Save the full page with rectangle
            os.makedirs('debug', exist_ok=True)
            cv2.imwrite(f'debug/{field_name}_full_page.png', full_page_with_rect)
            
            # Extract the ROI
            roi = img[roi_y:roi_y+roi_h, roi_x:roi_x+roi_w]
            
            if field_name == 'loan_purpose':
                # Convert to grayscale
                gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
                
                # Calculate the average pixel value (0-255, where 0 is black and 255 is white)
                avg_pixel_value = np.mean(gray)
                print(f"Average pixel value: {avg_pixel_value}")
                
                # Save ROI for debugging
                cv2.imwrite(f'debug/{field_name}_roi.png', gray)
                
                # If average pixel value is closer to black (0) than white (255)
                threshold = 128  # Midpoint between black and white
                value = 1 if avg_pixel_value < threshold else 2  # 1 for Purchase, 2 for Refinance
                print(f"Loan purpose value: {value} ({'Purchase' if value == 1 else 'Refinance'})")
                extracted_data[field_name] = int(value)  # Ensure it's an integer
                
            else:
                # Regular OCR processing for other fields
                gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
                _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
                
                # Save ROI
                cv2.imwrite(f'debug/{field_name}_roi.png', thresh)
                
                # Extract text
                text = pytesseract.image_to_string(thresh, config='--psm 7')
                text = text.strip()
                print(f"Extracted {field_name}: {text}")
                
                # Convert to number if it's a numeric field
                if field_name in ['monthly_income', 'property_value', 'loan_amount']:
                    text = text.replace('$', '').replace(',', '')
                    value = float(text)
                else:
                    value = text
                    
                extracted_data[field_name] = value
            
        except Exception as e:
            print(f"Error extracting {field_name}: {str(e)}")
            extracted_data[field_name] = None
    
    pdf_document.close()
    return extracted_data
    

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    # Check for username in request
    username = request.form.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Save the file temporarily
            filename = secure_filename(file.filename)
            temp_path = os.path.join('temp', filename)
            os.makedirs('temp', exist_ok=True)
            file.save(temp_path)
            file.close()

            # Process the file
            extracted_data = process_image(temp_path)
            print("Extracted data:", extracted_data)  # Debug print

            # Validate extracted data
            if None in extracted_data.values():
                return jsonify({'error': 'Could not extract valid data from document'}), 400

            # Ensure numeric values are floats
            monthly_income = float(extracted_data['monthly_income'])
            debt = float(extracted_data['debt'])
            loan_amount = float(extracted_data['loan_amount'])
            property_value = float(extracted_data['property_value'])
            loan_purpose = int(extracted_data['loan_purpose'])

            # Calculate debt-to-income ratio
            debt_to_income_ratio = round(debt / monthly_income, 2)
            print(f"Debt: {debt}, Income: {monthly_income}, Ratio: {debt_to_income_ratio}")  # Debug print

            # Use extracted data for loan processing
            derived_race = 1
            derived_sex = 1
            occupancy_type = 1
            action_taken = 0
            status = 0
            
            # Insert loan data
            conn = sqlite3.connect('loandb.db')
            cursor = conn.cursor()
            
            loan_data = (
                username,
                loan_amount,
                monthly_income,
                property_value,
                debt_to_income_ratio,
                derived_race,
                derived_sex,
                occupancy_type,
                loan_purpose,  # 1 = Purchase, 2 = Refinance
                action_taken,
                status
            )
            
            cursor.execute("""
                INSERT INTO loan (
                    username, loan_amount, income, property_value, 
                    debt_to_income_ratio, derived_race, derived_sex,
                    occupancy_type, loan_purpose, action_taken, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, loan_data)
            
            conn.commit()
            conn.close()
            
            # Clean up temp file
            os.remove(temp_path)
            
            return jsonify({
                'message': 'File processed successfully',
                'username': username,
                'extracted_data': extracted_data  # Return extracted data in response
            }), 200
            
        except Exception as e:
            print(f"Error processing file: {str(e)}")
            return jsonify({'error': 'Error processing file'}), 500
    
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/api/retrieve_loans', methods=['GET'])
def retrieve_loans():
    try:
        # Get username from query parameters
        username = request.args.get('username')
        
        # Connect to the database
        conn = sqlite3.connect('loandb.db')
        cursor = conn.cursor()
        
        # Modify query to filter by username if provided and sort by created_at DESC
        if username and username.lower() != 'admin':
            cursor.execute("SELECT * FROM loan WHERE username = ? ORDER BY created_at DESC", (username,))
        else:
            cursor.execute("SELECT * FROM loan ORDER BY created_at DESC")  # Admin sees all loans
        
        # Get column names from cursor description
        columns = [description[0] for description in cursor.description]
        
        # Fetch all rows
        loans = cursor.fetchall()
        
        # Convert to list of dictionaries for JSON serialization
        loans_list = []
        for loan in loans:
            loan_dict = dict(zip(columns, loan))
            loans_list.append(loan_dict)
            
        conn.close()

        return jsonify({
            'message': 'Loans retrieved successfully',
            'loans': loans_list
        }), 200
        
    except Exception as e:
        print(f"Error retrieving loans: {str(e)}")
        return jsonify({'error': 'Error retrieving loans'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    

    
