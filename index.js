// Author : ART4VETS
const maxLoop = 10
let currentLoop = 0

drawBook()
applyFilers()
calcSkeleton()
calcJointRadius()
calcLineWidth()
drawSkeleton()
function loop(){
    if(currentLoop > maxLoop){
        // requestAnimationFrame(loop)
        clearCanvas(canvasSkeleton , contextSkeleton)
        drawSkeleton()
        currentLoop = 0
    }
    requestAnimationFrame(loop)
    currentLoop++
}

// loop()

window.$fxhashFeatures = {
    // "Bird Count": birdCount
}