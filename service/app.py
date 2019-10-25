import json
import os
import threading
import wave
from datetime import datetime

from flask import Flask, abort, jsonify, render_template, request

import pyaudio

app = Flask(__name__)

with open("config.json", "r") as f:
    conf = json.load(f)


@app.route('/', methods=['GET'])
def root():
    html = render_template('index.html')
    return html


@app.route('/', methods=['POST'])
def upload():
    fname = "sounds/" + datetime.now().strftime('%m%d%H%M%S') + ".wav"
    with open(f"{fname}", "wb") as f:
        f.write(request.files['data'].read())
    print("posted binary data")
    if conf["talking"]:
        player = threading.Thread(target=play_wav_file, args=(fname, ))
        player.start()
    return jsonify({"data": fname})


def play_wav_file(fname):  # talking mode
    try:
        wf = wave.open(fname, "r")
    except FileNotFoundError:
        print("[Error 404] No such file or directory: " + fname)
        return 0

    p = pyaudio.PyAudio()
    print("talking: open audio stream")
    stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                    channels=wf.getnchannels(),
                    rate=wf.getframerate(),
                    output=True)

    print("talking: loading data")
    data = wf.readframes(1024)
    print(wf)
    while data != '':
        stream.write(data)
        data = wf.readframes(1024)
    stream.close()
    p.terminate()

if __name__ == "__main__":
    app.run()
