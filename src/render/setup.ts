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
import {p5} from "..";
import {LOGIC_GATE_WIDTH} from "../constants";

export const initGatesForDndArea = (canvasWidth: number, canvasHeight: number, logicGatesFromNewGateArea: LogicGate[]) => {
    const x = 25;
    const height = canvasHeight / 8;
    logicGatesFromNewGateArea.push(new BufferLogicGate(x, 0, p5))
    logicGatesFromNewGateArea.push(new NotLogicGate(x, height, p5))
    logicGatesFromNewGateArea.push(new AndLogicGate(x, height * 2, p5))
    logicGatesFromNewGateArea.push(new OrLogicGate(x, height * 3, p5))
    logicGatesFromNewGateArea.push(new NorLogicGate(x, height * 4, p5))
    logicGatesFromNewGateArea.push(new XorLogicGate(x, height * 5, p5))
    logicGatesFromNewGateArea.push(new NandLogicGate(x, height * 6, p5))
    logicGatesFromNewGateArea.push(new XnorLogicGate(x, height * 7, p5))
}

export const initSwitches = (switches: Switch[]) => {
    switches.push(new Switch(LOGIC_GATE_WIDTH + 150, 200, false, p5));
    switches.push(new Switch(LOGIC_GATE_WIDTH + 150, 300, false, p5));
}

export const createAddSwitchButton = (switches: Switch[]) => {
    const button = p5.createButton('Add switch');
    button.position(200, 20);
    button.mousePressed(() => {
        switches.push(new Switch(LOGIC_GATE_WIDTH + 150, 200 + switches.length * 100, false, p5));
    });
}