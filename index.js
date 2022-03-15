// Author : ART4VETS
drawBook()
applyFilers()
calcSkeleton()
calcJointRadius()
drawSkeleton()
function loop(){
    requestAnimationFrame(loop)
    clearCanvas(canvasSkeleton , contextSkeleton)
    drawSkeleton()
}

// loop()

window.$fxhashFeatures = {
    // "Bird Count": birdCount
}