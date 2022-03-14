
const PAGETOPMID = [Math.floor(canvas.width * 0.80) , Math.floor(canvas.height * 0.15)]
const PAGETOPBEND = [Math.floor(canvas.width * 0.40) , 0]
const PAGEBOTRIGHT = [Math.floor(canvas.width * 0.95) , canvas.height]
const PAGEBOTLEFT = [0 , canvas.height]

function paperGradientLeft(){
    context.save()
    const gradient = context.createLinearGradient(PAGETOPMID[0], PAGETOPMID[1], PAGEBOTLEFT[0], PAGEBOTLEFT[1])
    gradient.addColorStop(0, "#FFF")
    gradient.addColorStop(1, "#999" )
    context.fillStyle = gradient
    context.beginPath()
    context.moveTo(0,0)
    context.lineTo(PAGETOPBEND[0], PAGETOPBEND[1])
    context.quadraticCurveTo(Math.floor(PAGETOPMID[0] * 0.90) , 0, PAGETOPMID[0], PAGETOPMID[1])
    context.lineTo(PAGEBOTRIGHT[0], PAGEBOTRIGHT[1])
    context.lineTo(PAGEBOTLEFT[0], PAGEBOTLEFT[1])
    context.closePath()
    context.fill()
    context.restore()
}

function paperGradientRight(){
    context.save()
    const gradient = context.createLinearGradient(canvas.width, 0, PAGEBOTLEFT[0], PAGEBOTLEFT[1])
    gradient.addColorStop(0, "#FFFFFF")
    gradient.addColorStop(1, "#888" )
    context.fillStyle = gradient
    context.beginPath()
    context.moveTo(canvas.width, PAGETOPMID[1])
    context.quadraticCurveTo(Math.floor(PAGETOPMID[0] * 1.1) , Math.floor(PAGETOPMID[1] * 0.8 ), PAGETOPMID[0], Math.floor(PAGETOPMID[1] * 1.1))
    context.lineTo(PAGEBOTRIGHT[0], PAGEBOTRIGHT[1])
    context.lineTo(canvas.width, canvas.height)
    context.closePath()
    context.fill()
    context.restore()
}

function bindLine(){
    context.save()
    context.strokeStyle = "#00000050"
    context.lineWidth = 0.5
    context.filter = "blur(4px)"
    context.beginPath()
    context.moveTo(PAGETOPMID[0], Math.floor(PAGETOPMID[1] * 1.1))
    context.lineTo(PAGEBOTRIGHT[0], PAGEBOTRIGHT[1])
    context.stroke()
    context.restore()
}

function drawBook(){
    paperGradientRight()
    paperGradientLeft()
    bindLine()
}
