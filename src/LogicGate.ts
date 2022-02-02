abstract class LogicGate {
    id: any;
    name: string;
    p: any;
    output: boolean;
    width: number;
    height: number;

    constructor(x: any, y: any) {
        this.id = random(10000);
        this.name = "";
        this.p = createVector(x, y);
        this.output = undefined;
        this.width = 115;
        this.height = 70;
    }

    abstract draw(): void;

    abstract calculateOutput(): void;
}

abstract class SingleInputLogicGate extends LogicGate {
    firstInput: any;


    constructor(x: any, y: any) {
        super(x, y);
        this.firstInput = undefined;
    }

    draw() {
        fill("black");
        const x = this.p.x;
        const y = this.p.y;
        rect(x, y, this.width, this.height);
        if (this.firstInput !== undefined) {
            if (this.firstInput.output === undefined) {
                fill("black");
            } else if (this.firstInput.output === false) {
                fill("red");
            } else {
                fill("green");
            }
        }
        circle(x, y + this.height / 2, 10);
        fill("black");
        this.calculateOutput();
        if (this.output !== undefined) {
            if (this.output) {
                fill("green");
            } else {
                fill("red");
            }
        }
        circle(x + this.width, y + this.height / 2, 10);
        fill("black");
        textSize(28);
        fill("red");
        text(this.name, this.p.x + this.width / 6, this.p.y + 3 * this.height / 5);
    }
}

abstract class DoubleInputLogicGate extends LogicGate {
    firstInput: any;
    secondInput: any;

    constructor(x: any, y: any) {
        super(x, y);
    }

    draw() {
        fill("black");
        const x = this.p.x;
        const y = this.p.y;
        rect(x, y, this.width, this.height);
        if (this.firstInput !== undefined) {
            if (this.firstInput.output === undefined) {
                fill("black");
            } else if (this.firstInput.output === false) {
                fill("red");
            } else {
                fill("green");
            }
        }
        circle(x, y + this.height / 5, 10);
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
        circle(x, y + 4 * this.height / 5, 10);
        fill("black");
        this.calculateOutput();
        if (this.output !== undefined) {
            if (this.output) {
                fill("green");
            } else {
                fill("red");
            }
        }
        circle(x + this.width, y + this.height / 2, 10);
        fill("black");
        textSize(28);
        fill("red");
        text(this.name, this.p.x + this.width / 6, this.p.y + 3 * this.height / 5);
    }

}

class BufferLogicGate extends SingleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "BUF";
    }

    calculateOutput() {
        if (this.firstInput !== undefined) {
            this.output = this.firstInput.output;
        }
    }
}

class NotLogicGate extends SingleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "NOT";
    }

    calculateOutput() {
        if (this.firstInput !== undefined) {
            this.output = !this.firstInput.output;
        }
        // console.log(this.output)
    }
}

class AndLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "AND";
    }

    calculateOutput() {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output && this.secondInput.output;
        }
    }

}

class NandLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "NAND";
    }

    calculateOutput() {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = !(this.firstInput.output == this.secondInput.output && this.firstInput.output == 1);
        }
    }

}

class OrLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "OR";
    }

    calculateOutput(): void {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output || this.secondInput.output;
        }
    }
}

class NorLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "NOR";
    }

    calculateOutput(): void {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output == this.secondInput.output && this.firstInput.output == 0;
        }
    }
}

class XorLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "XOR";
    }

    calculateOutput(): void {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output != this.secondInput.output;
        }
    }
}

class XnorLogicGate extends DoubleInputLogicGate {

    constructor(x: any, y: any) {
        super(x, y);
        this.name = "XNOR";
    }

    calculateOutput(): void {
        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            this.output = this.firstInput.output == this.secondInput.output;
        }
    }
}