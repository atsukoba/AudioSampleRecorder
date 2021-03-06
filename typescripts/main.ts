"use strict";

let audio_context: AudioContext;
//@ts-ignore
let recorder: Recorder;

const __log = (e: string) => {
  let log: Element =
    document.querySelector("#log") || document.createElement("p");
  log.innerHTML = `<span>${e}</span>` + log.innerHTML;
  console.log(e);
};

const startUserMedia = (stream: MediaStream) => {
  audio_context = new AudioContext();
  __log("Audio context set up.");
  let input: AudioNode = audio_context.createMediaStreamSource(stream);
  __log("Media stream created.");

  // Uncomment if you want the audio to feedback directly
  // input.connect(audio_context.destination)

  //@ts-ignore
  recorder = new Recorder(input);
  __log("Recorder initialized.");
};

const startRecording = () => {
  recorder && recorder.record();
  __log("Recording...");
};
let startButton: Element =
  document.querySelector("#startButton") || document.createElement("div");
startButton.addEventListener("click", startRecording);

const stopRecording = () => {
  recorder && recorder.stop();
  __log("Stopped recording.");
  // create WAV download link using audio data blob
  createDownloadLink();
};
let stopButton: Element =
  document.querySelector("#stopButton") || document.createElement("div");
stopButton.addEventListener("click", stopRecording);

const createDownloadLink = () => {
  __log("Sending Data...");
  recorder &&
    recorder.exportWAV((blob: Blob) => {
      let url = URL.createObjectURL(blob);
      let dlLink = <HTMLAnchorElement>document.getElementById("dl");
      dlLink.style.opacity = "1";
      dlLink.href = url;
      dlLink.download = "sound.wav";
      let fd = new FormData();
      fd.append("data", blob);
      $.ajax({
        type: "POST",
        url: "/",
        data: fd,
        processData: false,
        contentType: false,
      }).done((data) => {
        __log(`file saved : ${data.data}`);
        recorder.clear();
      });
    });
};

window.onload = function init() {
  let mediaDevicesInterface: any;
  let nav = <any>navigator;
  try {
    //@ts-ignore
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    //@ts-ignore
    mediaDevicesInterface =
      nav.mediaDevices || nav.mozGetUserMedia || nav.webkitGetUserMedia;
    console.dir(mediaDevicesInterface);
    if (!nav.mediaDevices) {
      __log("getUserMedia() not supported.");
      return;
    }
    window.URL = window.URL || window.webkitURL;
  } catch (e) {
    alert("No web audio support in this browser!:" + e);
  }

  mediaDevicesInterface
    .getUserMedia({ audio: true })
    .then(startUserMedia)
    .catch(function (e: any) {
      __log("No live audio input: " + e);
    });
};
