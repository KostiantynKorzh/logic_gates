import {LogicGate} from "../logic-gates/abstract-gates/LogicGate";
import {Switch} from "../Switch";
import {DoubleInputLogicGate} from "../logic-gates/abstract-gates/DoubleInputLogicGate";
import {p5} from "..";
import P5 from "p5";

export const makeConnectionToGate = (logicGates: LogicGate[], isInside: boolean,  from: LogicGate | Switch | {},mouseVector: P5.Vector) => {
    logicGates.forEach(gate => {
        isInside = mouseVector.dist(gate.p) < gate.width;
        if (isInside && (from instanceof LogicGate || from instanceof Switch)) {
            if (from.id) {
                if (gate.firstInput === undefined) {
                    gate.firstInput = from;
                } else if (gate instanceof DoubleInputLogicGate) {
                    gate.secondInput = from;
                }
            }
        }
    });
}

export const makeConnectionToResultSwitch = (resultSwitch: Switch, from: LogicGate | Switch | {}, mouseVector: P5.Vector) => {
    if (mouseVector.dist(resultSwitch.p) < resultSwitch.r) {
        resultSwitch.from = from;
    }
}

export const removeGate = (logicGates: LogicGate[], mouseVector: P5.Vector) => {
    const gateToDelete = logicGates.find(gate => {
        if (mouseVector.dist(p5.createVector(gate.p.x, gate.p.y)) < 80) {
            return gate;
        }
    });
    if (gateToDelete) {
        const index = logicGates.findIndex((gate: any) => {
            return gate.id === gateToDelete.id
        })
        if (index !== -1) {
            logicGates.splice(index, 1);
        }
    }
}

export const addNewGateToCanvasByCopyingGateFromNewGateArea = (logicGates: LogicGate[], gateToAddFromDnd: any, grabbed: any) => {
    if (gateToAddFromDnd) {
        const newGate = new gateToAddFromDnd.constructor(gateToAddFromDnd.p.x, gateToAddFromDnd.p.y, p5);
        logicGates.push(newGate);
        return newGate;
    }
}

export const startDrawingConnectionFromSwitch = (switches: Switch[], from: LogicGate | Switch | {}, isCreatingConnectionFromSwitchToGate: boolean, mouseVector: P5.Vector) => {
    for (const currentSwitch of switches) {
        if (mouseVector.dist(currentSwitch.p) < currentSwitch.r) {
            return currentSwitch;
        }
    }
}

export const startDrawingConnectionFromGate = (logicGates: LogicGate[], from: LogicGate | Switch | {}, isCreatingConnectionFromGateOutput: boolean, mouseVector: P5.Vector) => {
    for (const gate of logicGates) {
        if (mouseVector.dist(p5.createVector(gate.p.x + gate.width, gate.p.y + gate.height / 2)) < 10) {
            return  gate;
        }
    }
}

export const toggleSwitches = (switches: Switch[], mouseVector: P5.Vector) => {
    for (const currentSwitch of switches) {
        if (mouseVector.dist(currentSwitch.p) < currentSwitch.r) {
            currentSwitch.output = !currentSwitch.output;
            return;
        }
    }
}

export const deleteConnection = (logicGates: LogicGate[], mouseVector: P5.Vector) => {
    logicGates.forEach(gate => {
        if (mouseVector.dist(p5.createVector(gate.p.x, gate.p.y + gate.height / 5)) < 10) {
            gate.firstInput = undefined;
        }
        if (mouseVector.dist(p5.createVector(gate.p.x, gate.p.y + 4 * gate.height / 5)) < 10) {
            gate.secondInput = undefined;
        }
    });
}