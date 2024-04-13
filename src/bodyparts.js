

//map for body part to id
const bodyPartMap = {
    "nose": 0,
    "left eye (inner)": 1,
    "left eye": 2,
    "left eye (outer)": 3,
    "right eye (inner)": 4,
    "right eye": 5,
    "right eye (outer)": 6,
    "left ear": 7,
    "right ear": 8,
    "mouth (left)": 9,
    "mouth (right)": 10,
    "left shoulder": 11,
    "right shoulder": 12,
    "left elbow": 13,
    "right elbow": 14,
    "left wrist": 15,
    "right wrist": 16,
    "left pinky": 17,
    "right pinky": 18,
    "left index": 19,
    "right index": 20,
    "left thumb": 21,
    "right thumb": 22,
    "left hip": 23,
    "right hip": 24,
    "left knee": 25,
    "right knee": 26,
    "left ankle": 27,
    "right ankle": 28,
    "left heel": 29,
    "right heel": 30,
    "left foot index": 31,
    "right foot index": 32
};

const rightHand = {
    label:"RH",
    points:[21, 19, 15, 17],
    lastHit: 0,
}

const leftHand = {
    label:"LH",
    points:[22, 20, 18, 16],
    lastHit: 0,
}

const body = {
    label:"BD",
    points:[12, 11, 24 , 23],
    lastHit: 0,
}

const head = {
    label:"HD",
    points:[0,1,2,3,4,5,6,7,8,9,10],
    lastHit: 0,
}

const leftLeg = {
    label:"LL",
    points:[26,28,32,30],
    lastHit: 0,
}

const rightLeg = {
    label:"RL",
    points:[25,27,29,31],
    lastHit: 0,
}

function detectAttack(attack, target, attackBody, targetBody){
    let hit = false;
    for (let i = 0; i < attack.points.length; i++){
        for (let j = 0; j < target.points.length; j++){
            if (inRange(attack.points[i], target.points[j], attackBody, targetBody)){
                hit = true;
                break;
            }
        }
        if (hit){
            break;
        }
    }

    if (!hit || performance.now() < attack.lastHit + .25){
        return 0;
    }

    attack.lastHit = performance.now();

    // punch
    if (attack.label == "RH" || attack.label == "LH"){
        switch(target.label){
            case "HD":
                return 10;
            case "BD":
                return 5;
            case "LL":
            case "RL":
                return 5;
        }
    }
    else if (attack.label == "LL" || attack.label == "RL"){
        switch(target.label){
            case "HD":
                return 20;
            case "BD":
                return 10;
            case "LL":
            case "RL":
                return 10;
        }
    }
}

function inRange(pt1, pt2, attackBody, targetBody){
   
    if(Math.abs(attackBody[pt1].x - targetBody[pt2].x > 0.1)){
        return false;
    }

    if(Math.abs(attackBody[pt1].y - targetBody[pt2].y > 0.1)){
        return false;
    }

    if(Math.abs(attackBody[pt1].z - targetBody[pt2].z > 0.1)){
        return false;
    }

    return true;
}


module.exports = {
    bodyPartMap,
    rightHand,
    leftHand,
    rightLeg,
    leftLeg,
    head,
    body,
    detectAttack,
    inRange,
};