import P5 from "p5";
import {LogicGate} from "./logic-gates/abstract-gates/LogicGate";
import {AndLogicGate} from "./logic-gates/doubleinput-gates/AndLogicGate";
import {BufferLogicGate} from "./logic-gates/singleinput-gates/BufferLogicGate";
import {NotLogicGate} from "./logic-gates/singleinput-gates/NotLogicGate";
import {SingleInputLogicGate} from "./logic-gates/abstract-gates/SingleInputLogicGate";
import {DoubleInputLogicGate} from "./logic-gates/abstract-gates/DoubleInputLogicGate";
import {Switch} from "./Switch";

const sketch = (p5: P5) => {

    let hover: any;
    let grabbed: any;
    let logicGates: LogicGate[];
    let switches: Switch[];
    let from: LogicGate | Switch | {};
    let isCreatingConnectionFromSwitchToGate: boolean;
    let isCreatingConnectionFromGateOutput: boolean;
    const resultSwitch: Switch = new Switch(700, 125, false, p5);
    let isInside: boolean;
    let mouseVector: P5.Vector;

    // ------------------------------- SETUP -------------------------------

    const initGates = () => {
        for (let i = 0; i < 1; i++) {
            logicGates.push(new AndLogicGate(p5.random(p5.width), p5.random(p5.height), p5));
        }
        for (let i = 0; i < 1; i++) {
            logicGates.push(new BufferLogicGate(p5.random(p5.width), p5.random(p5.height), p5));
        }
        for (let i = 0; i < 1; i++) {
            logicGates.push(new NotLogicGate(p5.random(p5.width), p5.random(p5.height), p5));
        }
        // for (let i = 0; i < 1; i++) {
        //     logicGates.push(new OrLogicGate(random(width), random(height)));
        // }
        // for (let i = 0; i < 1; i++) {
        //     logicGates.push(new NorLogicGate(random(width), random(height)));
        // }
        // for (let i = 0; i < 1; i++) {
        //     logicGates.push(new XorLogicGate(random(width), random(height)));
        // }
        // for (let i = 0; i < 1; i++) {
        //     logicGates.push(new NandLogicGate(random(width), random(height)));
        // }
        // for (let i = 0; i < 1; i++) {
        //     logicGates.push(new XnorLogicGate(random(width), random(height)));
        // }
    }

    const initSwitches = () => {
        for (let i = 0; i < 8; i++) {
            switches.push(new Switch(30, i * 60 + 60, false, p5));
        }
    }

    p5.setup = () => {
        let hover = null;
        let grabbed = null;
        const d = 800;
        p5.createCanvas(d, 600);
        p5.ellipseMode(p5.RADIUS);
        logicGates = [];
        switches = [];
        from = {};
        isCreatingConnectionFromSwitchToGate = false;
        isCreatingConnectionFromGateOutput = false;
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
            p5.strokeWeight(4);
            p5.stroke(126);
            let firstInputCircleHeight = gate.height / 5;
            if (gate instanceof SingleInputLogicGate) {
                firstInputCircleHeight = gate.height / 2;
            }
            if (gate.firstInput !== undefined) {
                if (gate.firstInput instanceof Switch) {
                    if (gate.firstInput.output !== undefined) {
                        if (gate.firstInput.output) {
                            p5.stroke("green");
                        } else {
                            p5.stroke("red");
                        }
                    }
                    p5.line(gate.p.x, gate.p.y + firstInputCircleHeight, gate.firstInput.p.x, gate.firstInput.p.y);
                } else {
                    if (gate.firstInput.output !== undefined) {
                        if (gate.firstInput.output) {
                            p5.stroke("green");
                        } else {
                            p5.stroke("red");
                        }
                    }
                    p5.line(gate.p.x, gate.p.y + firstInputCircleHeight, gate.firstInput.p.x + gate.firstInput.width, gate.firstInput.p.y + gate.firstInput.height / 2);
                }
            }
            if (gate.secondInput !== undefined) {
                if (gate.secondInput instanceof Switch) {
                    if (gate.secondInput.output !== undefined) {
                        if (gate.secondInput.output) {
                            p5.stroke("green");
                        } else {
                            p5.stroke("red");
                        }
                    }
                    p5.line(gate.p.x, gate.p.y + 4 * gate.height / 5, gate.secondInput.p.x, gate.secondInput.p.y);
                } else {
                    if (gate.secondInput.output !== undefined) {
                        if (gate.secondInput.output) {
                            p5.stroke("green");
                        } else {
                            p5.stroke("red");
                        }
                    }
                    p5.line(gate.p.x, gate.p.y + 4 * gate.height / 5, gate.secondInput.p.x + gate.secondInput.width, gate.secondInput.p.y + gate.secondInput.height / 2);
                }
            }
        })
        if (resultSwitch.from.p) {
            if (resultSwitch.from.output !== undefined) {
                if (resultSwitch.from.output) {
                    p5.stroke("green");
                } else {
                    p5.stroke("red");
                }
            }
            p5.line(resultSwitch.from.p.x + resultSwitch.from.width, resultSwitch.from.p.y + resultSwitch.from.height / 2, resultSwitch.p.x, resultSwitch.p.y);
        }
        p5.strokeWeight(1);
        p5.stroke(126);
    }

    p5.draw = () => {
        mouseVector = p5.createVector(p5.mouseX, p5.mouseY);
        hover = null;
        for (let gate of logicGates) {
            isInside = mouseVector.dist(gate.p) < gate.width;
            if (isInside) {
                hover = gate;
            }
        }
        p5.background("white");
        p5.noStroke();
        drawConnections();
        drawSwitches();
        drawResultSwitch();
        if (hover) p5.cursor("grab"); else p5.cursor(p5.ARROW);
        if (from instanceof LogicGate) {
            if (isCreatingConnectionFromGateOutput) {
                p5.stroke(126);
                p5.line(from.p.x + from.width, from.p.y + from.height / 2, p5.mouseX, p5.mouseY);
            }
        } else if (from instanceof Switch) {
            if (isCreatingConnectionFromSwitchToGate) {
                p5.stroke(126);
                p5.line(from.p.x, from.p.y, p5.mouseX, p5.mouseY);
            }
        }
        for (let c of logicGates) {
            if (c == grabbed) p5.fill(50); else if (c == hover) p5.fill(100); else p5.fill(0);
            c.draw();
        }
    }

// ------------------------------- EVENTS -------------------------------

    p5.mouseReleased = () => {
        let m = p5.createVector(p5.mouseX, p5.mouseY);
        for (let gate of logicGates) {
            isInside = m.dist(gate.p) < gate.width;
            if (isInside && (from instanceof LogicGate || from instanceof Switch)) {
                if (from.id) {
                    if (gate.firstInput === undefined) {
                        gate.firstInput = from;
                    } else if (gate instanceof DoubleInputLogicGate) {
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

    p5.mouseDragged = () => {
        if (grabbed) {
            grabbed.p.add(p5.createVector(p5.movedX, p5.movedY));
        }
    }

    p5.mousePressed = () => {
        if (hover) {
            grabbed = hover;
        }
        for (let currentSwitch of switches) {
            if (mouseVector.dist(currentSwitch.p) < currentSwitch.r) {
                console.log("YES")
                from = currentSwitch;
                isCreatingConnectionFromSwitchToGate = true;
            }
        }
        logicGates.forEach(gate => {
            if (mouseVector.dist(p5.createVector(gate.p.x + gate.width, gate.p.y + gate.height / 2)) < 10) {
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

    p5.mouseClicked = () => {
        toggleSwitches();
        logicGates.forEach(gate => {
            if (mouseVector.dist(p5.createVector(gate.p.x, gate.p.y + gate.height / 5)) < 10) {
                gate.firstInput = undefined;
            }
            if (mouseVector.dist(p5.createVector(gate.p.x, gate.p.y + 4 * gate.height / 5)) < 10) {
                gate.secondInput = undefined;
            }
        })
    }

}

new P5(sketch);
