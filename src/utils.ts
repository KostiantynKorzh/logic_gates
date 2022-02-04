import P5 from "p5";
import {LogicGate} from "./logic-gates/abstract-gates/LogicGate";

export const isInsideGate = (mouseVector: P5.Vector, gate: LogicGate) => {
    return mouseVector.x > gate.p.x &&
        mouseVector.x < gate.p.x + gate.width &&
        mouseVector.y > gate.p.y &&
        mouseVector.y < gate.p.y + gate.height;
}