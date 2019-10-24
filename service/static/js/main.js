"use strict";

const DURATION = 10000;

navigator.getUserMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

document.querySelector("#startButton").addEventListener('click', () => {
  navigator.getUserMedia({
    audio: true,
    video: false
  }, succeedStartRecord, errorRecord);
})

const succeedStartRecord = (stream) => {
  const recorder = new MediaRecorder(stream, {
    // mimeType: 'video/webm;codecs=vp9'
    mimeType: "audio/webm"
  });

  let chunks = [];

  recorder.addEventListener('dataavailable', (ele) => {
    if (ele.data.size > 0) {
      chunks.push(ele.data);
    }
  });

  recorder.addEventListener('stop', () => {
    let dl = document.querySelector("#dl");
    let blobData = new Blob(chunks, {type: 'audio/wav'});

    dl.href = URL.createObjectURL(blobData);
    dl.download = 'sample.wav';

    let fd = new FormData();
    fd.append('fname', 'test.wav');
    fd.append('data', blobData);
    $.ajax({
      type: 'POST',
      url: '/',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(data) {
      console.log(data);
    });
  });

  recorder.start();
  console.log("Recorder Started");

  document.querySelector("#stopButton").addEventListener('click', () => {
    console.log("stop");
    recorder.stop();
  });

  setTimeout(() => {
    console.log("stop");
    recorder.stop();
  }, DURATION);
}

const errorRecord = (error) => {
  alert("error");
}