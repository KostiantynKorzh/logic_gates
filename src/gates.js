// ------------------------------- SETUP -------------------------------

const initGates = () => {
    for (let i = 0; i < 3; i++) {
        logicGates.push(new AndLogicGate(random(width), random(height), AND_OUTPUT_CIRCLE_OFFSET_X, AND_OUTPUT_CIRCLE_OFFSET_Y, -5, -60, -5, -20));
    }
    for (let i = 0; i < 3; i++) {
        logicGates.push(new OrLogicGate(random(width), random(height), OR_OUTPUT_CIRCLE_OFFSET_X, OR_OUTPUT_CIRCLE_OFFSET_Y, -5, 25, -5, 75));
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
        if (gate.firstInput !== undefined) {
            if (gate.firstInput instanceof Switch) {
                stroke(126);
                line(gate.p.x + gate.firstInputCircleOffsetX, gate.p.y + gate.firstInputCircleOffsetY, gate.firstInput.p.x, gate.firstInput.p.y);
            } else {
                stroke(126);
                line(gate.p.x + gate.firstInputCircleOffsetX, gate.p.y + gate.firstInputCircleOffsetY, gate.firstInput.p.x + gate.firstInput.outputCircleOffsetX, gate.firstInput.p.y + gate.firstInput.outputCircleOffsetY);
            }
        }
        if (gate.secondInput !== undefined) {
            if (gate.secondInput instanceof Switch) {
                stroke(126);
                line(gate.p.x + gate.secondInputCircleOffsetX, gate.p.y + gate.secondInputCircleOffsetY, gate.secondInput.p.x, gate.secondInput.p.y);
            } else {
                stroke(126);
                line(gate.p.x + gate.secondInputCircleOffsetX, gate.p.y + gate.secondInputCircleOffsetY, gate.secondInput.p.x + gate.secondInput.outputCircleOffsetX, gate.secondInput.p.y + gate.secondInput.outputCircleOffsetY);
            }
        }
    })
    if (resultSwitch.from.p) {
        stroke(126);
        line(resultSwitch.from.p.x + resultSwitch.from.outputCircleOffsetX, resultSwitch.from.p.y + resultSwitch.from.outputCircleOffsetY, resultSwitch.p.x, resultSwitch.p.y);
    }
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
        line(from.p.x + from.outputCircleOffsetX, from.p.y + from.outputCircleOffsetY, mouseX, mouseY);
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
        if (mouseVector.dist(createVector(gate.p.x + gate.outputCircleOffsetX, gate.p.y + gate.outputCircleOffsetY)) < 10) {
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
        if (mouseVector.dist(createVector(gate.p.x + gate.firstInputCircleOffsetX, gate.p.y + gate.firstInputCircleOffsetY)) < 10) {
            gate.firstInput = undefined;
        }
        if (mouseVector.dist(createVector(gate.p.x + gate.secondInputCircleOffsetX, gate.p.y + gate.secondInputCircleOffsetY)) < 10) {
            gate.secondInput = undefined;
        }
    })
}
