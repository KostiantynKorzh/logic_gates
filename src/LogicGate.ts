abstract class LogicGate {
    id: any;
    p: any;
    output: boolean;
    outputCircleOffsetX: number;
    outputCircleOffsetY: number;
    firstInputCircleOffsetX: number;
    firstInputCircleOffsetY: number;
    secondInputCircleOffsetX: number;
    secondInputCircleOffsetY: number;
    shape: any;


    constructor(x: any, y: any, outputCircleOffsetX: number, outputCircleOffsetY: number, firstInputCircleOffsetX: number, firstInputCircleOffsetY: number, secondInputCircleOffsetX: number, secondInputCircleOffsetY: number, shape: any) {
        this.id = random(10000);
        this.p = createVector(x, y);
        this.output = undefined;
        this.outputCircleOffsetX = outputCircleOffsetX;
        this.outputCircleOffsetY = outputCircleOffsetY;
        this.firstInputCircleOffsetX = firstInputCircleOffsetX;
        this.firstInputCircleOffsetY = firstInputCircleOffsetY;
        this.secondInputCircleOffsetX = secondInputCircleOffsetX;
        this.secondInputCircleOffsetY = secondInputCircleOffsetY;
        this.shape = shape;
    }

    abstract draw(): void;

    abstract calculateOutput(): void;
}

abstract class DoubleInputLogicGate extends LogicGate {
    firstInput: any;
    secondInput: any;


    constructor(x: any, y: any, outputCircleOffsetX: number, outputCircleOffsetY: number, firstInputCircleOffsetX: number, firstInputCircleOffsetY: number, secondInputCircleOffsetX: number, secondInputCircleOffsetY: number, shape: any) {
        super(x, y, outputCircleOffsetX, outputCircleOffsetY, firstInputCircleOffsetX, firstInputCircleOffsetY, secondInputCircleOffsetX, secondInputCircleOffsetY, shape);
    }
}

class AndLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any, outputCircleOffsetX: number, outputCircleOffsetY: number, firstInputCircleOffsetX: number, firstInputCircleOffsetY: number, secondInputCircleOffsetX: number, secondInputCircleOffsetY: number) {
        super(x, y, outputCircleOffsetX, outputCircleOffsetY, firstInputCircleOffsetX, firstInputCircleOffsetY, secondInputCircleOffsetX, secondInputCircleOffsetY,
            ()=>{

            });
    }

    calculateOutput() {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output && this.secondInput.output;
        }
    }

    draw(): void {
        fill("black");
        const x = this.p.x;
        const y = this.p.y;
        beginShape();
        vertex(x, y);
        vertex(x + 80, y - 40);
        vertex(x, y - 80);
        if (this.firstInput !== undefined) {
            if (this.firstInput.output === undefined) {
                fill("black");
            } else if (this.firstInput.output === false) {
                fill("red");
            } else {
                fill("green");
            }
        }
        circle(x + this.firstInputCircleOffsetX, y + this.firstInputCircleOffsetY, 10);
        fill("black");
        if (this.secondInput !== undefined) {
            if (this.secondInput.output === undefined) {
                fill("black");
            } else if (this.secondInput.output === false) {
                fill("red");
            } else {
                fill("green");
            }
        }
        circle(x + this.secondInputCircleOffsetX, y + this.secondInputCircleOffsetY, 10);
        fill("black");
        this.calculateOutput();
        endShape(CLOSE);
        if (this.output !== undefined) {
            if (this.output) {
                fill("green");
            } else {
                fill("red");
            }
        }
        circle(x + this.outputCircleOffsetX, y + this.outputCircleOffsetY, 10);
        fill("black");
    }

}

class OrLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any, outputCircleOffsetX: number, outputCircleOffsetY: number, firstInputCircleOffsetX: number, firstInputCircleOffsetY: number, secondInputCircleOffsetX: number, secondInputCircleOffsetY: number, firstInput: any, secondInput: any) {
        super(x, y, outputCircleOffsetX, outputCircleOffsetY, firstInputCircleOffsetX, firstInputCircleOffsetY, secondInputCircleOffsetX, secondInputCircleOffsetY, firstInput, secondInput);
    }

    calculateOutput(): void {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output || this.secondInput.output;
        }
    }

    draw(): void {
        fill("black");
        const x = this.p.x;
        const y = this.p.y;
        rect(x, y, 100, 100);
        if (this.firstInput !== undefined) {
            if (this.firstInput.output === undefined) {
                fill("black");
            } else if (this.firstInput.output === false) {
                fill("red");
            } else {
                fill("green");
            }
        }
        circle(x + this.firstInputCircleOffsetX, y + this.firstInputCircleOffsetY, 10);
        fill("black");
        if (this.secondInput !== undefined) {
            if (this.secondInput.output === undefined) {
                fill("black");
            } else if (this.secondInput.output === false) {
                fill("red");
            } else {
                fill("green");
            }
        }
        circle(x + this.secondInputCircleOffsetX, y + this.secondInputCircleOffsetY, 10);
        fill("black");
        this.calculateOutput();
        endShape(CLOSE);
        if (this.output !== undefined) {
            if (this.output) {
                fill("green");
            } else {
                fill("red");
            }
        }
        circle(x + this.outputCircleOffsetX, y + this.outputCircleOffsetY, 10);
        fill("black");
    }

}