import P5 from "p5";
import {DoubleInputLogicGate} from "../abstract-gates/DoubleInputLogicGate";

export class NandLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any, p5: P5) {
        super(x, y, p5);
        this.name = "NAND";
    }

    calculateOutput() {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = !(this.firstInput.output == this.secondInput.output && this.firstInput.output == 1);
        } else {
            this.output = undefined;
        }
    }

}