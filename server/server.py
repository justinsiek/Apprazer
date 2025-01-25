from flask import Flask, jsonify, request
from flask_cors import CORS

import sqlite3

dbname = 'loaddb.db'
connection = sqlite3.connect(dbname)
from aryn_sdk.partition import partition_file
from werkzeug.utils import secure_filename
import os

# Flask app setup
app = Flask(__name__)
CORS(app)

# Configure Aryn API key
aryn_api_key = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1sIjoibXVoaXJ3ZWpAdWNpLmVkdSIsImFjdCI6IjQ3ODQyODE0MDcyMiJ9LCJpYXQiOjE3Mzc3ODIxNDB9._tnOlKs7grs-UccASlKHIUCT3ew8MYIA8u_ut6cuggY2nY6Gc5KSF7Ek9LQLWLeK1RCmQF-flkUUNNLlgD73DA"

# Allowable file extensions
ALLOWED_EXTENSIONS = {'pdf'}

# Check if the file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """
    Endpoint to handle file uploads and parse the PDF content using Aryn API.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Unsupported file type'}), 400

    # Secure the filename
    filename = secure_filename(file.filename)
    file_path = os.path.join("/tmp", filename)  # Temporary storage for the uploaded file
    file.save(file_path)

    try:
        # Parse the file with Aryn SDK
        with open(file_path, "rb") as f:
            parsed_data = partition_file(
                f,
                chunking_options={
                    "tokenizer": "huggingface",
                    "tokenizer_options": {
                        "model_name": "bert-base-uncased",
                        "tokenizer_type": "BertTokenizer",
                    }
                },
                api_key=aryn_api_key  # Pass the API key here
            )

        # Clean up temporary file
        os.remove(file_path)

        # Return parsed content
        return jsonify({'parsed_content': parsed_data}), 200

    except Exception as e:
        # Handle errors and return an appropriate message
        os.remove(file_path)  # Ensure file cleanup
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)