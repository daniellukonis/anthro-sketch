const BASEANGLE = Math.PI / 2

const PI90 = Math.PI / 2
const PI45 = Math.PI / 4
const PI22 = Math.PI / 8
const PI11 = Math.PI / 16
const PI360 = Math.PI * 2

const SKELETON = [
    "centerOfMass",
    "leftLegSocket",
    "rightLegSocket",
    "leftHip",
    "rightHip",
    "leftKnee",
    "rightKnee",
    "leftAnkle",
    "rightAnkle",
    // "leftFoot",
    // "rightFoot",
    "leftArmSocket",
    "rightArmSocket",
    "leftElbow",
    "rightElbow",
    "leftWrist",
    "rightWrist",
    // "leftHand",
    // "rightHand",
    "head"

]

function calcCoords([x1,y1],r,a){
    const x2 = Math.cos(a) * r
    const y2 = Math.sin(a) * r
    return [x1 + x2, y1 + y2]
}

const skeleton = {
    halfHeight: Math.floor(canvas.height * 0.9 * 0.5),
    halfWidth: Math.floor(canvas.height * 0.4 * 0.5),
    centerX: Math.floor(canvas.width * 0.4),
    centerY: Math.floor(canvas.height * 0.5),
    radius: 10,

    centerOfMass: {
        length: 0,
        angle: 0,
        coord: [0,0],
        parent: "centerOfMass"
    },

    leftLegSocket: {
        length: Math.floor(canvas.height * 0.08),
        angle: BASEANGLE + PI45,
        coord: [0,0],
        parent: "centerOfMass"
    },
    rightLegSocket: {
        length: Math.floor(canvas.height * 0.08),
        angle: BASEANGLE - PI45,
        coord: [0,0],
        parent: "centerOfMass"
    },

    leftHip: {
        length: Math.floor(canvas.height * 0.08),
        angle: BASEANGLE + PI90,
        coord: [0,0],
        parent: "centerOfMass"
    },
    rightHip: {
        length: Math.floor(canvas.height * 0.08),
        angle: BASEANGLE - PI90,
        coord: [0,0],
        parent: "centerOfMass"
    },
    leftKnee: {
        length: Math.floor(canvas.height * 0.15),
        angle: BASEANGLE + PI11,
        coord: [0,0],
        parent: "leftLegSocket"
    },
    rightKnee: {
        length: Math.floor(canvas.height * 0.15),
        angle: BASEANGLE - PI11,
        coord: [0,0],
        parent: "rightLegSocket"
    },
    leftAnkle: {
        length: Math.floor(canvas.height * 0.15),
        angle: BASEANGLE,
        coord: [0,0],
        parent: "leftKnee"
    },
    rightAnkle: {
        length: Math.floor(canvas.height * 0.15),
        angle: BASEANGLE,
        coord: [0,0],
        parent: "rightKnee"
    },
    leftArmSocket: {
        length: Math.floor(canvas.height * 0.25),
        angle: -BASEANGLE - PI22,
        coord: [0,0],
        parent: "centerOfMass"
    },
    rightArmSocket: {
        length: Math.floor(canvas.height * 0.25),
        angle: -BASEANGLE + PI22,
        coord: [0,0],
        parent: "centerOfMass"
    },
    leftElbow: {
        length: Math.floor(canvas.height * 0.15),
        angle: BASEANGLE + PI22,
        coord: [0,0],
        parent: "leftArmSocket"
    },
    rightElbow: {
        length: Math.floor(canvas.height * 0.15),
        angle: BASEANGLE - PI22,
        coord: [0,0],
        parent: "rightArmSocket"
    },
    leftWrist: {
        length: Math.floor(canvas.height * 0.10),
        angle: BASEANGLE,
        coord: [0,0],
        parent: "leftElbow"
    },
    rightWrist: {
        length: Math.floor(canvas.height * 0.10),
        angle: BASEANGLE,
        coord: [0,0],
        parent: "rightElbow"
    },
    head: {
        length: Math.floor(canvas.height * 0.35),
        angle: -PI45 * 2,
        coord: [0,0],
        parent: "centerOfMass"
    }
}

function calcPoints(joint, sk = skeleton){
    sk1 = sk[joint]
    sk2 = sk[sk1.parent]
    sk3 = sk.centerOfMass
    sk1.coord = calcCoords(sk2.coord, sk1.length, sk1.angle - sk3.angle)
}

// function drawSkeletonFrame(){
//     context.save()
//     context.translate(skeleton.centerX, skeleton.centerY)
//     context.rotate(BASEANGLE + skeleton.centerOfMass.angle)
//     context.beginPath()
//     context.moveTo(0, skeleton.halfHeight)
//     context.lineTo(skeleton.halfWidth, skeleton.halfHeight)
//     context.lineTo(skeleton.halfWidth, -skeleton.halfHeight)
//     context.lineTo(-skeleton.halfWidth, -skeleton.halfHeight)
//     context.lineTo(-skeleton.halfWidth, skeleton.halfHeight)
//     context.closePath()
//     context.stroke()
//     context.restore()
// }

function drawJoint(joint , sk = skeleton){
    context.save()
    context.translate(sk.centerX, sk.centerY)
    context.beginPath()
    context.arc(sk[joint].coord[0] , sk[joint].coord[1] , sk.radius , 0 , PI360)
    context.stroke()
    context.restore()
}

// function connectJoint(jointA, jointB){
//     context.save()
//     context.translate(skeleton.centerX, skeleton.centerY)
//     context.beginPath()
//     context.moveTo(jointA.coord[0], jointA.coord[1])
//     context.lineTo(jointB.coord[0], jointB.coord[1])
//     context.stroke()
//     context.restore()
// }

function calcSkeleton(){
    SKELETON.forEach(sk =>{
        calcPoints(sk)
    })
}

function drawJoints(){
    SKELETON.forEach(sk =>{
        drawJoint(sk)
    })
}

function drawSkeleton(sk = skeleton){
    // drawSkeletonFrame()
    calcSkeleton()
    drawJoints()
}