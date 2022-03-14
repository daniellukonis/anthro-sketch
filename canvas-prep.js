// const FULLCIRCLE = Math.PI*2


window.addEventListener("contextmenu",e => e.preventDefault())

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

function resizeCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

resizeCanvas()

function colorCanvas(color = "#FFF"){
    context.save()
    context.fillStyle = color
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.restore()
}

colorCanvas("#CCC")