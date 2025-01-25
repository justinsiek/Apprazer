from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

dbname = 'loaddb.db'
connection = sqlite3.connect(dbname)

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_content = file.read().decode('utf-8')
    print(file_content)
    return jsonify({'content': file_content})

if __name__ == '__main__':
    app.run(debug=True, port=8080)