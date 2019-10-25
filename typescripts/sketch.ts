const bodyPadding : number = 15
const buttonWidth : number = 150
let buttonLeftY : number
let buttonLeftX : number
let buttonRightX : number
let buttonRightY : number

function setup() {
  const canvas = createCanvas(window.screen.availWidth - (bodyPadding * 2), window.screen.availHeight/2)
  canvas.parent('canvas')
  console.log("canvas set")
  buttonLeftX = width / 2 - (buttonWidth / 2)
  buttonRightX = width / 2 + (buttonWidth / 2)
  buttonLeftY = height / 2 - (buttonWidth / 2)
  buttonRightY = height / 2 + (buttonWidth / 2)
}

function windowResized() {
  resizeCanvas(window.screen.availWidth - (bodyPadding * 2), window.screen.availHeight/2);
}

function draw() {

}
