import P5 from "p5";
import {LogicGate} from "./logic-gates/abstract-gates/LogicGate";
import {AndLogicGate} from "./logic-gates/doubleinput-gates/AndLogicGate";
import {Switch} from "./Switch";
import {
    drawConnections,
    drawGates,
    drawGatesFromNewGateArea,
    drawLine,
    drawNewGateArea,
    drawResultSwitch,
    drawSwitches,
    getItemToDrag,
    resetCanvas
} from "./render/drawing";
import {createAddSwitchButton, initGatesForDndArea, initSwitches} from "./render/setup";
import {
    deleteConnection,
    makeConnectionToGate,
    makeConnectionToResultSwitch,
    removeGate,
    removeSwitch,
    startDrawingConnectionFromGate,
    startDrawingConnectionFromSwitch,
    toggleSwitches
} from "./render/events";

const sketch = (p5: P5) => {

    const canvasWidth = 1200;
    const canvasHeight = 1400;
    let currentGateToDrag: any;
    let gateToAddFromDnd: any;
    let grabbed: any;
    let grabbedGateToAddFromDnd: any;
    let logicGates: LogicGate[];
    let logicGatesFromNewGateArea: LogicGate[] = [];
    let switches: Switch[];
    let from: LogicGate | Switch | {};
    let isCreatingConnectionFromSwitchToGate: boolean;
    let isCreatingConnectionFromGateOutput: boolean;
    const resultSwitch: Switch = new Switch(canvasWidth - 50, 125, false, p5);
    let isInside: boolean;
    let mouseVector: P5.Vector;

    // ------------------------------- SETUP -------------------------------

    p5.setup = () => {
        currentGateToDrag = null;
        grabbed = null;
        gateToAddFromDnd = null;
        grabbedGateToAddFromDnd = null;
        p5.createCanvas(canvasWidth, canvasHeight);
        p5.ellipseMode(p5.RADIUS);
        logicGates = [];
        logicGates.push(new AndLogicGate(300, 300, p5))
        switches = [];
        from = {};
        isCreatingConnectionFromSwitchToGate = false;
        isCreatingConnectionFromGateOutput = false;
        document.addEventListener('contextmenu', event => event.preventDefault()); // to remove browser right click for custom right click
        initGatesForDndArea(canvasWidth, canvasHeight, logicGatesFromNewGateArea);
        initSwitches(switches);
        createAddSwitchButton(switches);
    }

// ------------------------------- RENDER -------------------------------

    p5.draw = () => {
        // console.log(logicGates)
        resetCanvas();
        mouseVector = p5.createVector(p5.mouseX, p5.mouseY);
        p5.cursor(p5.ARROW);
        currentGateToDrag = getItemToDrag(logicGates, isInside, mouseVector);
        gateToAddFromDnd = getItemToDrag(logicGatesFromNewGateArea, isInside, mouseVector);
        drawNewGateArea(canvasHeight, logicGatesFromNewGateArea);
        drawConnections(logicGates, resultSwitch);
        drawSwitches(switches);
        drawResultSwitch(resultSwitch);
        drawLine(from, isCreatingConnectionFromGateOutput, isCreatingConnectionFromSwitchToGate);
        drawGates(logicGates);
        drawGatesFromNewGateArea(logicGatesFromNewGateArea, mouseVector);
    }

// ------------------------------- EVENTS -------------------------------

    p5.mouseReleased = () => {
        makeConnectionToGate(logicGates, isInside, from, mouseVector);
        makeConnectionToResultSwitch(resultSwitch, from, mouseVector);
        grabbed = null;
        grabbedGateToAddFromDnd = null;
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
        if (p5.mouseButton === p5.RIGHT) {
            removeGate(logicGates, resultSwitch, mouseVector);
            removeSwitch(switches, logicGates, mouseVector);
        } else {
            if (currentGateToDrag) {
                grabbed = currentGateToDrag;
            }
            if (gateToAddFromDnd) {
                const newGate = new gateToAddFromDnd.constructor(gateToAddFromDnd.p.x, gateToAddFromDnd.p.y, p5);
                logicGates.push(newGate);
                return newGate;
            }
            from = startDrawingConnectionFromSwitch(switches, from, isCreatingConnectionFromSwitchToGate, mouseVector);
            if (from) {
                isCreatingConnectionFromSwitchToGate = true;
            }
            const fromGateToDrawConnection = startDrawingConnectionFromGate(logicGates, from, isCreatingConnectionFromSwitchToGate, mouseVector);
            if (fromGateToDrawConnection) {
                from = fromGateToDrawConnection;
                isCreatingConnectionFromGateOutput = true;
            }
        }
    }

    p5.mouseClicked = () => {
        toggleSwitches(switches, mouseVector);
        deleteConnection(logicGates, mouseVector);
    }
}


export const p5 = new P5(sketch);
