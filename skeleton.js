const BASEANGLE = Math.PI / 2

const PI90 = Math.PI / 2
const PI45 = Math.PI / 4
const PI22 = Math.PI / 8
const PI11 = Math.PI / 16
const PI180 = Math.PI
const PI360 = Math.PI * 2

const PENCILSTROKE = "#33333375"
const PENCILWIDTH = 0
const PENCILBLUR = "blur(1px)"

const JOINTRADIUS = 10

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
    "leftFoot",
    "rightFoot",
    "leftArmSocket",
    "rightArmSocket",
    "leftElbow",
    "rightElbow",
    "leftWrist",
    "rightWrist",
    "leftHand",
    "rightHand",
    "neck",
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
        parent: "centerOfMass",
        jointRadius: 10
    },

    leftLegSocket: {
        length: Math.floor(canvas.height * 0.08),
        angle: PI45,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },
    rightLegSocket: {
        length: Math.floor(canvas.height * 0.08),
        angle: -PI45,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },

    leftHip: {
        length: Math.floor(canvas.height * 0.08),
        angle: PI90,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },
    rightHip: {
        length: Math.floor(canvas.height * 0.08),
        angle: -PI90,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },

    leftKnee: {
        length: Math.floor(canvas.height * 0.15),
        angle: PI11,
        coord: [0,0],
        parent: "leftLegSocket",
        jointRadius: 10
    },
    rightKnee: {
        length: Math.floor(canvas.height * 0.15),
        angle: -PI11,
        coord: [0,0],
        parent: "rightLegSocket",
        jointRadius: 10
    },

    leftAnkle: {
        length: Math.floor(canvas.height * 0.15),
        angle: 0,
        coord: [0,0],
        parent: "leftKnee",
        jointRadius: 10
    },
    rightAnkle: {
        length: Math.floor(canvas.height * 0.15),
        angle: 0,
        coord: [0,0],
        parent: "rightKnee",
        jointRadius: 10
    },

    leftFoot: {
        length: Math.floor(canvas.height * 0.05),
        angle: PI45,
        coord: [0,0],
        parent: "leftAnkle",
        jointRadius: 10
    },
    rightFoot: {
        length: Math.floor(canvas.height * 0.05),
        angle: -PI45,
        coord: [0,0],
        parent: "rightAnkle",
        jointRadius: 10
    },

    leftArmSocket: {
        length: Math.floor(canvas.height * 0.25),
        angle: PI180 - PI22,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },
    rightArmSocket: {
        length: Math.floor(canvas.height * 0.25),
        angle: -PI180 + PI22,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },

    leftElbow: {
        length: Math.floor(canvas.height * 0.15),
        angle: PI22,
        coord: [0,0],
        parent: "leftArmSocket",
        jointRadius: 10
    },
    rightElbow: {
        length: Math.floor(canvas.height * 0.15),
        angle: -PI22,
        coord: [0,0],
        parent: "rightArmSocket",
        jointRadius: 10
    },

    leftWrist: {
        length: Math.floor(canvas.height * 0.10),
        angle: 0,
        coord: [0,0],
        parent: "leftElbow",
        jointRadius: 10
    },
    rightWrist: {
        length: Math.floor(canvas.height * 0.10),
        angle: 0,
        coord: [0,0],
        parent: "rightElbow",
        jointRadius: 10
    },

    leftHand: {
        length: Math.floor(canvas.height * 0.03),
        angle: PI45,
        coord: [0,0],
        parent: "leftWrist",
        jointRadius: 10
    },

    rightHand: {
        length: Math.floor(canvas.height * 0.03),
        angle: -PI45,
        coord: [0,0],
        parent: "rightWrist",
        jointRadius: 10
    },
    neck: {
        length: Math.floor(canvas.height * 0.25),
        angle: -PI180,
        coord: [0,0],
        parent: "centerOfMass",
        jointRadius: 10
    },

    head: {
        length: Math.floor(canvas.height * 0.1),
        angle: -PI180,
        coord: [0,0],
        parent: "neck",
        jointRadius: 10
    }
}

function calcPoints(joint, sk = skeleton){
    const randomAngle = fxrand() / 5
    const randomDirection = fxrand() > 0.5 ? 1 : -1
    sk1 = sk[joint]
    sk2 = sk[sk1.parent]
    sk3 = sk.centerOfMass
    sk1.coord = calcCoords(sk2.coord, sk1.length, BASEANGLE + sk1.angle - sk3.angle + randomAngle*randomDirection)
}

function calcJointRadius(){
    SKELETON.forEach(sk =>{
        skeleton[sk].jointRadius = JOINTRADIUS * fxrand()
    })
}

function drawJoint(joint , sk = skeleton){
    // const randomRadius = sk.radius * fxrand()
    context.save()
    context.filter = PENCILBLUR
    context.lineWidth = fxrand() + PENCILWIDTH
    context.strokeStyle = PENCILSTROKE
    context.translate(sk.centerX, sk.centerY)
    context.beginPath()
    context.arc(sk[joint].coord[0] , sk[joint].coord[1] , sk[joint].jointRadius , 0 , PI360)
    context.stroke()
    context.restore()
}


function connectJoint(joint, sk = skeleton){
    const parent = sk[joint].parent
    context.save()
    context.filter = PENCILBLUR
    context.lineWidth = fxrand() + PENCILWIDTH
    context.strokeStyle = PENCILSTROKE
    context.translate(sk.centerX, sk.centerY)
    context.beginPath()
    context.moveTo(sk[joint].coord[0] , sk[joint].coord[1])
    context.lineTo(sk[parent].coord[0] , sk[parent].coord[1])
    context.stroke()
    context.restore()
}

function drawHip(sk = skeleton){
    // Math.abs(sk["leftHip"].coord[0] )
    const x1 = sk["rightHip"].coord[0]
    const y1 = sk["rightHip"].coord[1]

    const x2 = sk["leftHip"].coord[0]
    const y2 = sk["leftHip"].coord[1]

    const xDist = Math.abs(x1) + Math.abs(x2)
    const yDist = Math.abs(y1) + Math.abs(y2)

    console.log(xDist, yDist)
    // const randomRadius = sk.radius * fxrand()
    context.save()
    // context.filter = PENCILBLUR
    // context.lineWidth = 2 //fxrand() + PENCILWIDTH
    context.strokeStyle = "black"//PENCILSTROKE
    context.translate(sk.centerX,sk.centerY)
    context.beginPath()
    // context.ellipse(x,y,10,40, sk["rightHip"].angle,0,PI360)
    context.stroke()
    context.restore()
}

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

function connectJoints(){
    SKELETON.forEach(sk =>{
        connectJoint(sk)
    })
}

function drawSkeleton(sk = skeleton){
    calcSkeleton()
    // calcJointRadius()
    drawHip()
    drawJoints()
    connectJoints()
}