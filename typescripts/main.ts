"use strict"

let audio_context : AudioContext
//@ts-ignore
let recorder : Recorder

const __log = (e : string) => {
  let log : Element = document.querySelector("#log") || document.createElement("p")
  log.innerHTML += "\n" + e
}

const startUserMedia = (stream : MediaStream) => {
  audio_context = new AudioContext
  __log('Audio context set up.')
  let input : AudioNode = audio_context.createMediaStreamSource(stream)
  console.log('Media stream created.')
  __log('Media stream created.')

  // Uncomment if you want the audio to feedback directly
  // input.connect(audio_context.destination)
  // console.log('Input connected to audio context destination.')

  //@ts-ignore
  recorder = new Recorder(input)
  console.log('Recorder initialized.')
  __log('Recorder initialized.')
}

const startRecording = () => {
  recorder && recorder.record()
  console.log('Recording...')
  __log('Recording...')
}

let startButton : Element = document.querySelector("#startButton") || document.createElement("div")
startButton.addEventListener('click', startRecording)

const createDownloadLink = () => {
  console.dir("Sending Data...")
  __log("Sending Data...")
  recorder && recorder.exportWAV((blob : Blob) => {
    let fd = new FormData()
    fd.append('data', blob)
    $.ajax({
      type: 'POST',
      url: '/',
      data: fd,
      processData: false,
      contentType: false
    }).done((data) => {
      console.dir(data)
      __log(data.data)
      recorder.clear()
      }
    )
  })
}

const stopRecording = () => {
  recorder && recorder.stop()
  console.log('Stopped recording.')
  __log('Stopped recording.')
  // create WAV download link using audio data blob
  createDownloadLink()
}

let stopButton : Element = document.querySelector("#stopButton") || document.createElement("div")
stopButton.addEventListener('click', stopRecording)
window.onload = function init() {
  try {
    // webkit shim
    //@ts-ignore
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    //@ts-ignore
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
    window.URL = window.URL || window.webkitURL

    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'))
  } catch (e) {
    alert('No web audio support in this browser!')
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, (e) => {
    __log('No live audio input: ' + e)
  })
}
