import {BufferLogicGate} from "../logic-gates/singleinput-gates/BufferLogicGate";
import {NotLogicGate} from "../logic-gates/singleinput-gates/NotLogicGate";
import {AndLogicGate} from "../logic-gates/doubleinput-gates/AndLogicGate";
import {OrLogicGate} from "../logic-gates/doubleinput-gates/OrLogicGate";
import {NorLogicGate} from "../logic-gates/doubleinput-gates/NorLogicGate";
import {XorLogicGate} from "../logic-gates/doubleinput-gates/XorLogicGate";
import {NandLogicGate} from "../logic-gates/doubleinput-gates/NandLogicGate";
import {XnorLogicGate} from "../logic-gates/doubleinput-gates/XnorLogicGate";
import {Switch} from "../Switch";
import {LogicGate} from "../logic-gates/abstract-gates/LogicGate";
import { p5 } from "..";

export const initGatesForDndArea = (canvasWidth: number, canvasHeight: number, logicGatesFromNewGateArea:LogicGate[]) => {
    const height = canvasHeight / 8;
    logicGatesFromNewGateArea.push(new BufferLogicGate(canvasWidth / 20, 0, p5))
    logicGatesFromNewGateArea.push(new NotLogicGate(canvasWidth / 20, height, p5))
    logicGatesFromNewGateArea.push(new AndLogicGate(canvasWidth / 20, height * 2, p5))
    logicGatesFromNewGateArea.push(new OrLogicGate(canvasWidth / 20, height * 3, p5))
    logicGatesFromNewGateArea.push(new NorLogicGate(canvasWidth / 20, height * 4, p5))
    logicGatesFromNewGateArea.push(new XorLogicGate(canvasWidth / 20, height * 5, p5))
    logicGatesFromNewGateArea.push(new NandLogicGate(canvasWidth / 20, height * 6, p5))
    logicGatesFromNewGateArea.push(new XnorLogicGate(canvasWidth / 20, height * 7, p5))
}

export const initSwitches = (switches: Switch[]) => {
    for (let i = 0; i < 8; i++) {
        switches.push(new Switch(300, i * 60 + 60, false, p5));
    }
}