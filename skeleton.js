const BASEANGLE = Math.PI / 2

const PI90 = Math.PI / 2
const PI45 = Math.PI / 4
const PI22 = Math.PI / 8
const PI11 = Math.PI / 16
const PI180 = Math.PI
const PI360 = Math.PI * 2

const PENCILSTROKE = "#33333375"
const PENCILWIDTH = 3
const PENCILBLUR = "blur(1px)"

const JOINTRADIUS = 10

const SKVELOCITY = 0.01;

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
    "chest",
    "neck",
    "head",
    // "leftShoulder",
    // "rightShoulder"
]

function calcCoords([x1,y1],r,a){
    const x2 = Math.cos(a) * r
    const y2 = Math.sin(a) * r
    return [x1 + x2, y1 + y2]
}

const skeleton = {
    halfHeight: Math.floor(canvasSkeleton.height * 0.9 * 0.5),
    halfWidth: Math.floor(canvasSkeleton.height * 0.4 * 0.5),
    centerX: Math.floor(canvasSkeleton.width * 0.4),
    centerY: Math.floor(canvasSkeleton.height * 0.5),
    radius: 10,

    centerOfMass: {
        length: 0,
        angle: 0,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1,
        skipDraw: 1
    },

    leftLegSocket: {
        length: Math.floor(canvasSkeleton.height * 0.08),
        angle: PI45,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1
    },
    rightLegSocket: {
        length: Math.floor(canvasSkeleton.height * 0.08),
        angle: -PI45,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1
    },

    leftHip: {
        length: Math.floor(canvasSkeleton.height * 0.08),
        angle: PI90,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1,
        skipDraw: 1
    },
    rightHip: {
        length: Math.floor(canvasSkeleton.height * 0.08),
        angle: -PI90,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1,
        skipDraw: 1
    },

    leftKnee: {
        length: Math.floor(canvasSkeleton.height * 0.15),
        angle: PI11,
        coord: [0,0],
        midPoint: [0,0],
        parent: "leftLegSocket",
        jointRadius: 10,
        lineWidth: 1
    },
    rightKnee: {
        length: Math.floor(canvasSkeleton.height * 0.15),
        angle: -PI11,
        coord: [0,0],
        midPoint: [0,0],
        parent: "rightLegSocket",
        jointRadius: 10,
        lineWidth: 1
    },

    leftAnkle: {
        length: Math.floor(canvasSkeleton.height * 0.15),
        angle: 0,
        coord: [0,0],
        midPoint: [0,0],
        parent: "leftKnee",
        jointRadius: 10,
        lineWidth: 1
    },
    rightAnkle: {
        length: Math.floor(canvasSkeleton.height * 0.15),
        angle: 0,
        coord: [0,0],
        midPoint: [0,0],
        parent: "rightKnee",
        jointRadius: 10,
        lineWidth: 1
    },

    leftFoot: {
        length: Math.floor(canvasSkeleton.height * 0.05),
        angle: PI45,
        coord: [0,0],
        midPoint: [0,0],
        parent: "leftAnkle",
        jointRadius: 10,
        lineWidth: 1
    },
    rightFoot: {
        length: Math.floor(canvasSkeleton.height * 0.05),
        angle: -PI45,
        coord: [0,0],
        midPoint: [0,0],
        parent: "rightAnkle",
        jointRadius: 10,
        lineWidth: 1
    },

    leftArmSocket: {
        length: Math.floor(canvasSkeleton.height * 0.25),
        angle: PI180 - PI22,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1,
        skipDraw: 2
    },
    rightArmSocket: {
        length: Math.floor(canvasSkeleton.height * 0.25),
        angle: -PI180 + PI22,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1,
        skipDraw: 2
    },

    leftElbow: {
        length: Math.floor(canvasSkeleton.height * 0.15),
        angle: PI22,
        coord: [0,0],
        midPoint: [0,0],
        parent: "leftArmSocket",
        jointRadius: 10,
        lineWidth: 1
    },
    rightElbow: {
        length: Math.floor(canvasSkeleton.height * 0.15),
        angle: -PI22,
        coord: [0,0],
        midPoint: [0,0],
        parent: "rightArmSocket",
        jointRadius: 10,
        lineWidth: 1
    },

    leftWrist: {
        length: Math.floor(canvasSkeleton.height * 0.10),
        angle: 0,
        coord: [0,0],
        midPoint: [0,0],
        parent: "leftElbow",
        jointRadius: 10,
        lineWidth: 1
    },
    rightWrist: {
        length: Math.floor(canvasSkeleton.height * 0.10),
        angle: 0,
        coord: [0,0],
        midPoint: [0,0],
        parent: "rightElbow",
        jointRadius: 10,
        lineWidth: 1
    },

    leftHand: {
        length: Math.floor(canvasSkeleton.height * 0.03),
        angle: PI45,
        coord: [0,0],
        midPoint: [0,0],
        parent: "leftWrist",
        jointRadius: 10,
        lineWidth: 1
    },

    rightHand: {
        length: Math.floor(canvasSkeleton.height * 0.03),
        angle: -PI45,
        coord: [0,0],
        midPoint: [0,0],
        parent: "rightWrist",
        jointRadius: 10,
        lineWidth: 1
    },

    chest: {
        length: Math.floor(canvasSkeleton.height * 0.16),
        angle: -PI180,
        coord: [0,0],
        midPoint: [0,0],
        parent: "centerOfMass",
        jointRadius: 10,
        lineWidth: 1
    },

    neck: {
        length: Math.floor(canvasSkeleton.height * 0.1),
        angle: -PI180,
        coord: [0,0],
        midPoint: [0,0],
        parent: "chest",
        jointRadius: 10,
        lineWidth: 1
    },

    head: {
        length: Math.floor(canvasSkeleton.height * 0.1),
        angle: -PI180,
        coord: [0,0],
        midPoint: [0,0],
        parent: "neck",
        jointRadius: 10,
        lineWidth: 1,
        // skipDraw: 1
    },
    leftShoulder: {
        length: Math.floor(canvasSkeleton.height * 0.05),
        angle: PI90,
        coord: [0,0],
        midPoint: [0,0],
        parent: "neck",
        jointRadius: 10,
        lineWidth: 1,
        // skipDraw: 2
    },
    rightShoulder: {
        length: Math.floor(canvasSkeleton.height * 0.05),
        angle: -PI90,
        coord: [0,0],
        midPoint: [0,0],
        parent: "neck",
        jointRadius: 10,
        lineWidth: 1,
        // skipDraw: 2
    },

}

function calcPoints(joint, sk = skeleton){
    const randomAngle = fxrand() / 3
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

function calcLineWidth(){
    SKELETON.forEach(sk =>{
        skeleton[sk].lineWidth = PENCILWIDTH * fxrand() + 0.5
    })
}

function calcMidPoint(jointA , sk = skeleton){
    const x1 = sk[jointA].coord[0]
    const y1 = sk[jointA].coord[1]
    const halfLength = sk[jointA].length / 2
    const angle = BASEANGLE + sk[jointA].angle + PI180
    sk[jointA].midPoint = calcCoords([x1, y1], halfLength, angle)

    // console.log(half)
}

function drawJointArc(joint , sk = skeleton){
    contextSkeleton.save()
    contextSkeleton.filter = PENCILBLUR
    contextSkeleton.lineWidth = sk[joint].lineWidth
    contextSkeleton.strokeStyle = PENCILSTROKE
    contextSkeleton.translate(sk.centerX, sk.centerY)
    contextSkeleton.beginPath()
    contextSkeleton.arc(sk[joint].coord[0] , sk[joint].coord[1] , sk[joint].jointRadius , 0 , PI360)
    contextSkeleton.stroke()
    contextSkeleton.restore()
}

function drawJointMidpoint(joint , sk = skeleton){
    if(sk[joint].skipDraw === 1){return}
    if(sk[joint].skipDraw === 2){return}
    contextSkeleton.save()
    contextSkeleton.filter = PENCILBLUR
    contextSkeleton.lineWidth = sk[joint].lineWidth
    contextSkeleton.strokeStyle = PENCILSTROKE
    contextSkeleton.translate(sk.centerX, sk.centerY)
    contextSkeleton.beginPath()
    contextSkeleton.arc(sk[joint].midPoint[0] , sk[joint].midPoint[1] , 2 , 0 , PI360)
    contextSkeleton.stroke()
    contextSkeleton.restore()
}

function drawJointEllipse(joint , sk = skeleton){
    if(sk[joint].skipDraw === 1){return}
    if(sk[joint].skipDraw === 2){return}
    const angle = BASEANGLE + sk[joint].angle + PI180
    const width = sk[joint].length / 1.5
    const height = width / 4
    contextSkeleton.save()
    contextSkeleton.filter = PENCILBLUR
    contextSkeleton.lineWidth = sk[joint].lineWidth
    contextSkeleton.strokeStyle = PENCILSTROKE
    contextSkeleton.translate(sk.centerX, sk.centerY)
    contextSkeleton.beginPath()
    contextSkeleton.ellipse(sk[joint].midPoint[0] , sk[joint].midPoint[1], width, height , angle , 0 , PI360)
    contextSkeleton.stroke()
    contextSkeleton.restore()
}

function drawHead(joint , sk = skeleton){
    const radius = sk[joint].length / 2
    contextSkeleton.save()
    contextSkeleton.filter = PENCILBLUR
    contextSkeleton.lineWidth = sk[joint].lineWidth
    contextSkeleton.strokeStyle = PENCILSTROKE
    contextSkeleton.translate(sk.centerX, sk.centerY)
    contextSkeleton.beginPath()
    contextSkeleton.arc(sk[joint].coord[0] , sk[joint].coord[1] , radius , 0 , PI360)
    contextSkeleton.stroke()
    contextSkeleton.restore()
}

function drawJointConnection(joint, sk = skeleton){
    if(sk[joint].skipDraw === 1){return}
    if(sk[joint].skipDraw === 2){return}
    const parent = sk[joint].parent
    contextSkeleton.save()
    contextSkeleton.filter = PENCILBLUR
    contextSkeleton.lineWidth = sk[joint].lineWidth
    contextSkeleton.strokeStyle = PENCILSTROKE
    contextSkeleton.translate(sk.centerX, sk.centerY)
    contextSkeleton.beginPath()
    contextSkeleton.moveTo(sk[joint].coord[0] , sk[joint].coord[1])
    contextSkeleton.lineTo(sk[parent].coord[0] , sk[parent].coord[1])
    contextSkeleton.stroke()
    contextSkeleton.restore()
}

function calcSkeleton(){
    SKELETON.forEach(sk =>{
        calcPoints(sk)
        
    })
}

function calcMidpoints(){
    SKELETON.forEach(sk=>{
        calcMidPoint(sk)
    })
}

function drawJoints(){
    SKELETON.forEach(sk =>{
        drawJointArc(sk)
    })
}

function drawJointMidpoints(){
    SKELETON.forEach(sk =>{
        drawJointMidpoint(sk)
    })
}

function drawJointEllipses(){
    SKELETON.forEach(sk =>{
        drawJointEllipse(sk)
    })
}

function drawConnections(){
    SKELETON.forEach(sk =>{
        drawJointConnection(sk)
    })
}

function cycleAngle(joint, sk = skeleton){
    sk[joint].angle += SKVELOCITY
}

function drawSkeleton(sk = skeleton){
    // cycleAngle("leftAnkle")
    calcSkeleton()
    calcMidpoints()
    calcLineWidth()
    drawJoints()
    // drawJointEllipses()
    drawJointMidpoints()
    drawConnections()
    drawHead("head")
}