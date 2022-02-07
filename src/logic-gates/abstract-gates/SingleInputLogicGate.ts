import P5 from "p5";
import {LogicGate} from "./LogicGate";

export abstract class SingleInputLogicGate extends LogicGate {

    constructor(x: any, y: any, p5: P5) {
        super(x, y, p5);
        this.firstInput = undefined;
    }

    draw() {
        this.p5.fill("black");
        const x = this.p.x;
        const y = this.p.y;
        this.p5.rect(x, y, this.width, this.height);
        if (this.firstInput !== undefined) {
            if (this.firstInput.output === undefined) {
                this.p5.fill("black");
            } else if (this.firstInput.output === false) {
                this.p5.fill("red");
            } else {
                this.p5.fill("green");
            }
        }
        this.p5.circle(x, y + this.height / 2, 10);
        this.p5.fill("black");
        this.calculateOutput();
        if (this.output !== undefined) {
            if (this.output) {
                this.p5.fill("green");
            } else {
                this.p5.fill("red");
            }
        } else {
            this.p5.fill("black");
        }
        this.p5.circle(x + this.width, y + this.height / 2, 10);
        this.p5.fill("black");
        this.p5.textSize(28);
        this.p5.fill("red");
        this.p5.text(this.name, this.p.x + this.width / 6, this.p.y + 3 * this.height / 5);
    }
}