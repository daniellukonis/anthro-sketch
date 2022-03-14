const FULLCIRCLE = Math.PI * 2

function drawPaperShadows(color = "#000"){
    const x = Math.floor(canvasFilter.width * fxrand())
    const y = Math.floor(canvasFilter.height * fxrand())
    contextFilter.save()
    contextFilter.fillStyle = "#000"
    contextFilter.filter = "blur(100px)"
    contextFilter.beginPath()
    contextFilter.arc(x , y, 10, 0, FULLCIRCLE)
    contextFilter.fill()
    contextFilter.restore()
}

function drawPaperDots(color = "#00000010"){
    const x = Math.floor(canvasFilter.width * fxrand())
    const y = Math.floor(canvasFilter.height * fxrand())
    contextFilter.save()
    contextFilter.fillStyle = color
    contextFilter.beginPath()
    contextFilter.arc(x, y, 1, 0, FULLCIRCLE)
    contextFilter.fill()
    contextFilter.restore()
}

function paperFilters(percentage = 1 , filterFunction, color = "#000"){
    const canvasFilterArea = canvasFilter.width * canvasFilter.height
    const count = Math.floor(canvasFilterArea * percentage / 100)
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