from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from aryn_sdk.partition import partition_file

aryn_api_key="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1sIjoibXVoaXJ3ZWpAdWNpLmVkdSIsImFjdCI6IjQ3ODQyODE0MDcyMiJ9LCJpYXQiOjE3Mzc3ODIxNDB9._tnOlKs7grs-UccASlKHIUCT3ew8MYIA8u_ut6cuggY2nY6Gc5KSF7Ek9LQLWLeK1RCmQF-flkUUNNLlgD73DA"
app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])

def file_parser(file):
    with open(file, "rb") as f:
        data = partition_file(
            f,
            chunking_options={
                "tokenizer": "huggingface",
                "tokenizer_options": {
                    "model_name": "bert-base-uncased",
                    "tokenizer_type": "BertTokenizer",
                }
            }
        )

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