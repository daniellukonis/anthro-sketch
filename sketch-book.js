
const PAGETOPMID = [Math.floor(canvasBook.width * 0.80) , Math.floor(canvasBook.height * 0.15)]
const PAGETOPBEND = [Math.floor(canvasBook.width * 0.40) , 0]
const PAGEBOTRIGHT = [Math.floor(canvasBook.width * 0.95) , canvasBook.height]
const PAGEBOTLEFT = [0 , canvasBook.height]

function paperGradientLeft(){
    contextBook.save()
    const gradient = contextBook.createLinearGradient(PAGETOPMID[0], PAGETOPMID[1], PAGEBOTLEFT[0], PAGEBOTLEFT[1])
    gradient.addColorStop(0, "#FFF")
    gradient.addColorStop(1, "#999" )
    contextBook.fillStyle = gradient
    contextBook.beginPath()
    contextBook.moveTo(0,0)
    contextBook.lineTo(PAGETOPBEND[0], PAGETOPBEND[1])
    contextBook.quadraticCurveTo(Math.floor(PAGETOPMID[0] * 0.90) , 0, PAGETOPMID[0], PAGETOPMID[1])
    contextBook.lineTo(PAGEBOTRIGHT[0], PAGEBOTRIGHT[1])
    contextBook.lineTo(PAGEBOTLEFT[0], PAGEBOTLEFT[1])
    contextBook.closePath()
    contextBook.fill()
    contextBook.restore()
}

function paperGradientRight(){
    contextBook.save()
    const gradient = contextBook.createLinearGradient(canvasBook.width, 0, PAGEBOTLEFT[0], PAGEBOTLEFT[1])
    gradient.addColorStop(0, "#FFFFFF")
    gradient.addColorStop(1, "#888" )
    contextBook.fillStyle = gradient
    contextBook.beginPath()
    contextBook.moveTo(canvasBook.width, PAGETOPMID[1])
    contextBook.quadraticCurveTo(Math.floor(PAGETOPMID[0] * 1.1) , Math.floor(PAGETOPMID[1] * 0.8 ), PAGETOPMID[0], Math.floor(PAGETOPMID[1] * 1.1))
    contextBook.lineTo(PAGEBOTRIGHT[0], PAGEBOTRIGHT[1])
    contextBook.lineTo(canvasBook.width, canvasBook.height)
    contextBook.closePath()
    contextBook.fill()
    contextBook.restore()
}

function bindLine(){
    contextBook.save()
    contextBook.strokeStyle = "#00000050"
    contextBook.lineWidth = 0.5
    contextBook.filter = "blur(4px)"
    contextBook.beginPath()
    contextBook.moveTo(PAGETOPMID[0], Math.floor(PAGETOPMID[1] * 1.1))
    contextBook.lineTo(PAGEBOTRIGHT[0], PAGEBOTRIGHT[1])
    contextBook.stroke()
    contextBook.restore()
}

function bookBackground(){
    const margin = 3
    contextBookBackground.save()
    const gradient = contextBook.createLinearGradient(PAGETOPMID[0], PAGETOPMID[1], canvasBook.width * 0.9, 0)
    gradient.addColorStop(0, "#55F")
    gradient.addColorStop(1, "#F5F" )
    contextBookBackground.fillStyle = gradient
    contextBookBackground.beginPath()
    contextBookBackground.moveTo(canvasBookBackground.width, 0)
    contextBookBackground.lineTo(PAGETOPBEND[0] + margin, PAGETOPBEND[1])
    contextBookBackground.quadraticCurveTo(Math.floor(PAGETOPMID[0] * 0.90) + margin , 0, PAGETOPMID[0], PAGETOPMID[1])
    contextBookBackground.lineTo(PAGETOPMID[0] + margin, Math.floor(PAGETOPMID[1] * 1.1) - margin / 3)
    contextBookBackground.quadraticCurveTo(Math.floor(PAGETOPMID[0] * 1.1) , Math.floor(PAGETOPMID[1] * 0.8 ), canvasBookBackground.width, PAGETOPMID[1])
    contextBookBackground.closePath()
    contextBookBackground.fill()
    contextBookBackground.restore()
}

function drawBook(){
    // bookBackground()
    paperGradientRight()
    paperGradientLeft()
    bindLine()
}
