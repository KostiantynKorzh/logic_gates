import P5 from "p5";

export class Switch {
    id: any;
    p: any;
    r: number;
    output: any;
    from: any;
    p5: P5;

    constructor(x, y, output,  p5: P5) {
        this.p5 = p5;
        this.id = this.p5.random(10000);
        this.p = this.p5.createVector(x, y);
        this.r = 20;
        this.output = output;
        this.from = {};
    }

    draw() {
        if (this.from.output) {
            if (this.from.output) {
                this.p5.fill("green");
            } else {
                this.p5.fill("red");
            }
        } else {
            if (this.output) {
                this.p5.fill("green");
            } else {
                this.p5.fill("red");
            }
        }
        this.p5.circle(this.p.x, this.p.y, this.r);
    }
}