import P5 from "p5";
import {LogicGate} from "./logic-gates/abstract-gates/LogicGate";
import {p5} from "./index";
import {LOGIC_GATE_HEIGHT, LOGIC_GATE_WIDTH} from "./constants";

export const isInsideGate = (mouseVector: P5.Vector, gate: LogicGate) => {
    return mouseVector.x > gate.p.x &&
        mouseVector.x < gate.p.x + gate.width &&
        mouseVector.y > gate.p.y &&
        mouseVector.y < gate.p.y + gate.height;
}

type Point = {
    x: number;
    y: number;
}

type Line = {
    x: number;
    y: number;
    c: number;
}

type LineCoords = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export const getLineAndRectIntersectionPoint = (p5: P5, lineX1, lineY1, lineX2, lineY2, rectX1, rectY1, rectX2, rectY2, rectX3, rectY3, rectX4, rectY4): Point | undefined => {
    const lineCoords: LineCoords = {x1: lineX1, y1: lineY1, x2: lineX2, y2: lineY2};
    const rectFirstCoords: LineCoords = {x1: rectX1, y1: rectY1, x2: rectX2, y2: rectY2};
    const rectSecondCoords: LineCoords = {x1: rectX2, y1: rectY2, x2: rectX3, y2: rectY3};
    const rectThirdCoords: LineCoords = {x1: rectX3, y1: rectY3, x2: rectX4, y2: rectY4};
    const rectFourthCoords: LineCoords = {x1: rectX4, y1: rectY4, x2: rectX1, y2: rectY1};

    const lineCoordsArray = [rectFirstCoords, rectSecondCoords, rectThirdCoords, rectFourthCoords];

    for (let i = 0; i < 4; i++) {
        const intersection = calculateIntersection(lineCoords, lineCoordsArray[i]);
        if (intersection) {
            const isContainsInRect = intersection.x >= rectX1 && intersection.x <= rectX2
                && intersection.y >= rectY1 && intersection.y <= rectY4;
            if (isContainsInRect) {
                return intersection;
            }
        }
    }
}

export const calculateIntersection = (p1: LineCoords, p2: LineCoords) => {
    const d1 = (p1.x1 - p1.x2) * (p2.y1 - p2.y2);
    const d2 = (p1.y1 - p1.y2) * (p2.x1 - p2.x2);
    const d = d1 - d2;

    if (d === 0) {
        return;
    }

    const u1 = (p1.x1 * p1.y2 - p1.y1 * p1.x2);
    const u4 = (p2.x1 * p2.y2 - p2.y1 * p2.x2);

    const u2x = p2.x1 - p2.x2;
    const u3x = p1.x1 - p1.x2;
    const u2y = p2.y1 - p2.y2;
    const u3y = p1.y1 - p1.y2;

    const px = (u1 * u2x - u3x * u4) / d;
    const py = (u1 * u2y - u3y * u4) / d;

    return {x: px, y: py};
}

export const calculateDistanceBetweenPoints = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

export const createLineFromUpperOutputToLowerFirstInput = (firstInputX: number, firstInputY: number, outputX: number, outputY: number, firstInputCircleHeight: number) => {
    p5.line(firstInputX, firstInputY + firstInputCircleHeight, firstInputX - 20, firstInputY + firstInputCircleHeight);
    p5.line(firstInputX - 20, firstInputY + firstInputCircleHeight, firstInputX - 20, firstInputY + firstInputCircleHeight - 20);
    p5.line(firstInputX - 20, firstInputY + firstInputCircleHeight - 20, outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2 + 50);
    p5.line(outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2 + 50, outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2);
    p5.line(outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2, outputX + LOGIC_GATE_WIDTH, outputY + LOGIC_GATE_HEIGHT / 2);
}

export const createLineFromUpperInputToLowerOutput = (firstInputX: number, firstInputY: number, outputX: number, outputY: number, firstInputCircleHeight: number) => {
    p5.line(firstInputX, firstInputY + firstInputCircleHeight, firstInputX - 20, firstInputY + firstInputCircleHeight);
    p5.line(firstInputX - 20, firstInputY + firstInputCircleHeight, firstInputX - 20, firstInputY + firstInputCircleHeight + LOGIC_GATE_HEIGHT);
    p5.line(firstInputX - 20, firstInputY + firstInputCircleHeight + LOGIC_GATE_HEIGHT, outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2 - 50);
    p5.line(outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2 - 50, outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2);
    p5.line(outputX + LOGIC_GATE_WIDTH + 20, outputY + LOGIC_GATE_HEIGHT / 2, outputX + LOGIC_GATE_WIDTH, outputY + LOGIC_GATE_HEIGHT / 2);
}

