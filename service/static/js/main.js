"use strict";

let audio_context;
let recorder;


const __log = (e, data) => {
  log.innerHTML += "\n" + e + " " + (data || '');
}

const startUserMedia = (stream) => {
  audio_context = new AudioContext;
    __log('Audio context set up.');
  let input = audio_context.createMediaStreamSource(stream);
  console.log('Media stream created.');
  __log('Media stream created.');
  // Uncomment if you want the audio to feedback directly
  // input.connect(audio_context.destination);
  // console.log('Input connected to audio context destination.');
  recorder = new Recorder(input);
  console.log('Recorder initialised.');
  __log('Recorder initialised.');
}

const startRecording = (button) => {
  recorder && recorder.record();
  console.log('Recording...');
  __log('Recording...');
}

document.querySelector("#startButton").addEventListener('click', startRecording);

const stopRecording = (button) => {
  recorder && recorder.stop();
  console.log('Stopped recording.');
  __log('Stopped recording.');
  // create WAV download link using audio data blob
  createDownloadLink();
  recorder.clear();
}

document.querySelector("#stopButton").addEventListener('click', stopRecording);

const createDownloadLink = () => {
  recorder && recorder.exportWAV((blob) => {
    let fd = new FormData();
    fd.append('data', blob);
    $.ajax({
      type: 'POST',
      url: '/',
      data: fd,
      processData: false,
      contentType: false
    }).done((data) => {
      console.dir(data);
      __log(data.data);
    });
  });
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, (e) => {
    __log('No live audio input: ' + e);
  });
};

// window.onload = () => {
//   try {
//     window.AudioContext = window.AudioContext || window.webkitAudioContext;

//     audio_context = new AudioContext;
//     console.log('Audio context set up.');
//     __log('Audio context set up.');
//   } catch (e) {
//     alert('No web audio support in this browser!');
//   }

//   navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
//     getUserMedia: (c) => {
//       return new Promise(function(y, n) {
//         (navigator.mozGetUserMedia ||
//          navigator.webkitGetUserMedia).call(navigator, c, y, n);
//       });
//     }
//   } : null);

//   navigator.mediaDevices.getUserMedia({audio: true})
//     .then(startUserMedia)
//     .catch((e) => {
//       console.log('No live audio input: ' + e);
//       __log('No live audio input: ' + e);
//     });
// }
