import P5 from "p5";
import {LOGIC_GATE_HEIGHT, LOGIC_GATE_WIDTH} from "../../constants";

export abstract class LogicGate {
    id: any;
    name: string;
    p: P5.Vector;
    output: boolean | undefined;
    width: number;
    height: number;
    firstInput: any;
    secondInput: any;
    p5: P5;

    constructor(x: any, y: any, p5: P5) {
        this.p5 = p5;
        this.id = p5.random(10000);
        this.name = "";
        this.p = p5.createVector(x, y);
        this.output = undefined;
        this.width = LOGIC_GATE_WIDTH;
        this.height = LOGIC_GATE_HEIGHT;
    }

    abstract draw(): void;

    abstract calculateOutput(): void;
}