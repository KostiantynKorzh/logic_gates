import P5 from "p5";
import {DoubleInputLogicGate} from "../abstract-gates/DoubleInputLogicGate";

export class OrLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any, p5: P5) {
        super(x, y, p5);
        this.name = "OR";
    }

    calculateOutput(): void {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output || this.secondInput.output;
        } else {
            this.output = undefined;
        }
    }
}