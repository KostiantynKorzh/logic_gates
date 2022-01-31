class Switch {
    id: any;
    p: any;
    r: number;
    output: any;
    from: any;

    constructor(x, y, output) {
        this.id = random(10000);
        this.p = createVector(x, y);
        this.r = 20;
        this.output = output;
        this.from = {};
    }

    draw() {
        if (this.from.output) {
            if (this.from.output) {
                fill("green");
            } else {
                fill("red");
            }
        } else {
            if (this.output) {
                fill("green");
            } else {
                fill("red");
            }
        }
        circle(this.p.x, this.p.y, this.r);
    }
}