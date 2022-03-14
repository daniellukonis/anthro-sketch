
window.addEventListener("contextmenu",e => e.preventDefault())

const canvas = document.querySelector("#base-canvas")
const canvasBook = document.querySelector("#book")
const canvasFilter = document.querySelector("#filter")
const canvasSkeleton = document.querySelector("#skeleton")

const context = canvas.getContext("2d")
const contextBook = canvasBook.getContext("2d")
const contextFilter = canvasFilter.getContext("2d")
const contextSkeleton = canvasSkeleton.getContext("2d")

const allCanvas = document.querySelectorAll("canvas")

function resizeCanvas(cavnasObject = canvas){
    cavnasObject.width = window.innerWidth
    cavnasObject.height = window.innerHeight
}
resizeCanvas()

function resizeAllCanvas(cavnasObject = allCanvas){
    cavnasObject.forEach(c => resizeCanvas(c))
    // cavnasObject.width = window.innerWidth
    // cavnasObject.height = window.innerHeight
}
resizeAllCanvas()

function colorCanvas(cavnasObject = canvas, contextObject = context, color = "#FFF"){
    contextObject.save()
    contextObject.fillStyle = color
    contextObject.fillRect(0, 0, cavnasObject.width, cavnasObject.height)
    contextObject.restore()
}

colorCanvas(canvas, context, "#CCC")