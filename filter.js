const FULLCIRCLE = Math.PI * 2

function drawPaperShadows(color = "#000"){
    const x = Math.floor(canvas.width * fxrand())
    const y = Math.floor(canvas.height * fxrand())
    context.save()
    context.fillStyle = "#000"
    context.filter = "blur(100px)"
    context.beginPath()
    context.arc(x , y, 10, 0, FULLCIRCLE)
    context.fill()
    context.restore()
}

function drawPaperDots(color = "#00000010"){
    const x = Math.floor(canvas.width * fxrand())
    const y = Math.floor(canvas.height * fxrand())
    context.save()
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, 1, 0, FULLCIRCLE)
    context.fill()
    context.restore()
}

function paperFilters(percentage = 1 , filterFunction, color = "#000"){
    const canvasArea = canvas.width * canvas.height
    const count = Math.floor(canvasArea * percentage / 100)
    for(let i = 0; i < count; i++){
        filterFunction(color)
    }   
}

function applyFilers(){
paperFilters(0.01 , drawPaperShadows , "#AAAAAA25")
paperFilters(0.01 , drawPaperShadows , "#FFFFFF50")
paperFilters(10 , drawPaperDots , "#00000005")
paperFilters(15 , drawPaperDots , "#FFFFFF10")
}