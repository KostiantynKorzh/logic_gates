// ------------------------------- SETUP -------------------------------

const initGates = () => {
    for (let i = 0; i < 3; i++) {
        logicGates.push(new AndLogicGate(random(width), random(height)));
    }
    for (let i = 0; i < 3; i++) {
        logicGates.push(new OrLogicGate(random(width), random(height)));
    }
}

const initSwitches = () => {
    for (let i = 0; i < 8; i++) {
        switches.push(new Switch(30, i * 60 + 60, false));
    }
}

function setup() {
    hover = null;
    grabbed = null;
    d = 800;
    createCanvas(d, 600);
    ellipseMode(RADIUS);
    logicGates = [];
    switches = [];
    from = {};
    isCreatingConnectionFromSwitchToGate = false;
    isCreatingConnectionFromGateOutput = false;
    resultSwitch = new Switch(700, 125, false);
    initGates();
    initSwitches();
}

// ------------------------------- DRAW -------------------------------

function drawSwitches() {
    for (let currentSwitch of switches) {
        currentSwitch.draw();
    }
}

function drawResultSwitch() {
    resultSwitch.draw();
}

function drawConnections() {
    logicGates.forEach(gate => {
        strokeWeight(4);
        stroke(126);
        if (gate.firstInput !== undefined) {
            if (gate.firstInput instanceof Switch) {
                if(gate.firstInput.output!==undefined){
                    if(gate.firstInput.output){
                        stroke("green");
                    }else{
                        stroke("red");
                    }
                }
                line(gate.p.x, gate.p.y + gate.height / 5, gate.firstInput.p.x, gate.firstInput.p.y);
            } else {
                if(gate.firstInput.output!==undefined){
                    if(gate.firstInput.output){
                        stroke("green");
                    }else{
                        stroke("red");
                    }
                }
                line(gate.p.x, gate.p.y + gate.height / 5, gate.firstInput.p.x + gate.firstInput.width, gate.firstInput.p.y + gate.firstInput.height / 2);
            }
        }
        if (gate.secondInput !== undefined) {
            if (gate.secondInput instanceof Switch) {
                if(gate.secondInput.output!==undefined){
                    if(gate.secondInput.output){
                        stroke("green");
                    }else{
                        stroke("red");
                    }
                }
                line(gate.p.x, gate.p.y + 4 * gate.height / 5, gate.secondInput.p.x, gate.secondInput.p.y);
            } else {
                if(gate.secondInput.output!==undefined){
                    if(gate.secondInput.output){
                        stroke("green");
                    }else{
                        stroke("red");
                    }
                }
                line(gate.p.x, gate.p.y + 4 * gate.height / 5, gate.secondInput.p.x + gate.secondInput.width, gate.secondInput.p.y + gate.secondInput.height / 2);
            }
        }
    })
    if (resultSwitch.from.p) {
        if(resultSwitch.from.output!==undefined){
            if(resultSwitch.from.output){
                stroke("green");
            }else{
                stroke("red");
            }
        }
        line(resultSwitch.from.p.x + resultSwitch.from.width, resultSwitch.from.p.y + resultSwitch.from.height / 2, resultSwitch.p.x, resultSwitch.p.y);
    }
    strokeWeight(1);
    stroke(126);
}

function draw() {
    mouseVector = createVector(mouseX, mouseY);
    hover = null;
    for (let c of logicGates) {
        if (c.r) {
            isInside = mouseVector.dist(c.p) < c.r;
        } else {
            isInside = mouseVector.dist(c.p) < 80;
        }
        if (isInside) {
            hover = c;
        }
    }
    background("white");
    noStroke();
    drawConnections();
    drawSwitches();
    drawResultSwitch();
    if (hover) cursor("grab"); else cursor(ARROW);
    if (isCreatingConnectionFromSwitchToGate) {
        stroke(126);
        line(from.p.x, from.p.y, mouseX, mouseY);
    }
    if (isCreatingConnectionFromGateOutput) {
        stroke(126);
        line(from.p.x + from.width, from.p.y + from.height / 2, mouseX, mouseY);
    }
    for (let c of logicGates) {
        if (c == grabbed) fill(50); else if (c == hover) fill(100); else fill(0);
        c.draw();
    }
}

// ------------------------------- EVENTS -------------------------------

function mouseReleased() {
    m = createVector(mouseX, mouseY);
    for (let gate of logicGates) {
        let isInside = false;
        if (gate.r) {
            isInside = m.dist(gate.p) < gate.r;
        } else {
            isInside = m.dist(gate.p) < 80;
        }
        if (isInside) {
            if (from.id) {
                if (gate.firstInput === undefined) {
                    gate.firstInput = from;
                } else {
                    gate.secondInput = from;
                }
            }
        }
    }
    if (m.dist(resultSwitch.p) < resultSwitch.r) {
        resultSwitch.from = from;
    }
    grabbed = null;
    isCreatingConnectionFromSwitchToGate = false;
    isCreatingConnectionFromGateOutput = false;
    from = {};
}

function mouseDragged() {
    if (grabbed) {
        grabbed.p.add(createVector(movedX, movedY));
    }
}

function mousePressed() {
    if (hover) {
        grabbed = hover;
    }
    for (let currentSwitch of switches) {
        if (mouseVector.dist(currentSwitch.p) < currentSwitch.r) {
            from = currentSwitch;
            isCreatingConnectionFromSwitchToGate = true;
        }
    }
    logicGates.forEach(gate => {
        if (mouseVector.dist(createVector(gate.p.x + gate.width, gate.p.y + gate.height / 2)) < 10) {
            from = gate;
            isCreatingConnectionFromGateOutput = true;
        }
    })
}

function toggleSwitches() {
    for (let currentSwitch of switches) {
        if (mouseVector.dist(currentSwitch.p) < currentSwitch.r) {
            currentSwitch.output = !currentSwitch.output;
        }
    }
}

function mouseClicked() {
    toggleSwitches();
    logicGates.forEach(gate => {
        if (mouseVector.dist(createVector(gate.p.x, gate.p.y + gate.height / 5)) < 10) {
            gate.firstInput = undefined;
        }
        if (mouseVector.dist(createVector(gate.p.x, gate.p.y + 4 * gate.height / 5)) < 10) {
            gate.secondInput = undefined;
        }
    })
}
