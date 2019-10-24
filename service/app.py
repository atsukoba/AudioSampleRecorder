import json
import os
from service import sound
from flask import Flask, abort, render_template, request, jsonify


app = Flask(__name__)


@app.route('/', methods=['GET'])
def root():
    html = render_template('index.html', data={})
    return html


@app.route('/', methods=['POST'])
def upload():
    with open("sounds/sample.wav", "wb") as f:
        f.write(request.files['data'].read())
    print("posted binary data")
    return jsonify({"data": "hoge"})


if __name__ == "__main__":
    app.run()
