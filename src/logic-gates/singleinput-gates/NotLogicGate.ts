import P5 from "p5";
import {SingleInputLogicGate} from "../abstract-gates/SingleInputLogicGate";

export class NotLogicGate extends SingleInputLogicGate {

    constructor(x: any, y: any, p5: P5) {
        super(x, y, p5);
        this.name = "NOT";
    }

    calculateOutput() {
        if (this.firstInput !== undefined) {
            this.output = !this.firstInput.output;
        }
    }
}