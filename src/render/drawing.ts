import {SingleInputLogicGate} from "../logic-gates/abstract-gates/SingleInputLogicGate";
import {Switch} from "../Switch";
import {LogicGate} from "../logic-gates/abstract-gates/LogicGate";
import P5 from "p5";
import {p5} from "..";
import {isInsideGate} from "../utils";
import {LOGIC_GATE_WIDTH} from "../constants";

export const drawSwitches = (switches: Switch[]) => {
    for (let currentSwitch of switches) {
        currentSwitch.draw();
    }
}

export const drawResultSwitch = (resultSwitch: Switch) => {
    resultSwitch.draw();
}

export const drawConnections = (logicGates: LogicGate[], resultSwitch: Switch) => {
    logicGates.forEach(gate => {
        p5.strokeWeight(4);
        p5.stroke(126);
        let firstInputCircleHeight = gate.height / 5;
        if (gate instanceof SingleInputLogicGate) {
            firstInputCircleHeight = gate.height / 2;
        }
        if (gate.firstInput !== undefined && gate.firstInput.id) {
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
        if (gate.secondInput !== undefined && gate.secondInput.id) {
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

export const getItemToDrag = (logicGates: LogicGate[], isInside: boolean, mouseVector: P5.Vector): LogicGate => {
    for (const gate of logicGates) {
        isInside = isInsideGate(mouseVector, gate);
        if (isInside) {
            p5.cursor("grab");
            return gate;
        }
    }
}

export const resetCanvas = () => {
    p5.background("white");
    p5.noStroke();
}

export const drawNewGateArea = (canvasHeight: number, logicGatesFromNewGateArea: LogicGate[]) => {
    p5.fill("gray");
    p5.rect(0, 0, LOGIC_GATE_WIDTH + 50, canvasHeight);
    logicGatesFromNewGateArea.forEach(gate => {
        gate.draw();
    });
}

export const drawLine = (from: any, isCreatingConnectionFromGateOutput: boolean, isCreatingConnectionFromSwitchToGate: boolean) => {
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
}

export const drawGates = (logicGates: LogicGate[]) => {
    logicGates.forEach(gate => {
        gate.draw();
    });
}

export const drawGatesFromNewGateArea = (logicGatesFromNewGateArea: LogicGate[], mouseVector: P5.Vector) => {
    logicGatesFromNewGateArea.forEach(gate => {
        if (mouseVector.dist(p5.createVector(gate.p.x + gate.width, gate.p.y + gate.height / 2)) < 10) {
            gate.draw();
        }
    });
}