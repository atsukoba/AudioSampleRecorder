import json
import os

from datetime import datetime
from flask import Flask, abort, jsonify, render_template, request
from flask_ngrok import run_with_ngrok
from service import sound

app = Flask(__name__)
# run_with_ngrok(app)


@app.route('/', methods=['GET'])
def root():
    html = render_template('index.html')
    return html


@app.route('/', methods=['POST'])
def upload():
    with open(f"sounds/{datetime.now().strftime('%m%d%H%M%S')}.wav", "wb") as f:
        f.write(request.files['data'].read())
    print("posted binary data")
    return jsonify({"data": "hoge"})


if __name__ == "__main__":
    app.run()
