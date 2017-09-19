import {DivEle} from "./div-ele";
import {Point} from "./point";
import {ImgEle} from "./img-ele";

export class SpinEle extends DivEle {

    get friction(): number { return this.angularFriction; }
    get velocity(): number { return this.angularVelocity; }

    constructor(imgPath: string, pos: Point, initialVelocity = 1, private spinClockwise = true) {
        super();

        this.style.position = "absolute";
        this.style.top = pos.x + this.px;
        this.style.left = pos.y + this.px;

        this.style.width = "200px";
        this.style.height = "200px";

        this.addChild(new ImgEle(imgPath, (i: ImgEle) => {}));

        this.angularVelocity = initialVelocity;

        this.timerHandle = setInterval(() => this.tick(), this.sleepIntervalMs);
    }

    tick() {
        this.rotationDegrees += (this.spinClockwise) ? this.angularVelocity : -this.angularVelocity;
        this.rotationDegrees %= 360;
        this.angularVelocity *= this.angularFriction;
        // if (this.angularVelocity < 0.01) {
        //     this.angularVelocity = 0;
        //     clearInterval(this.timerHandle);
        //     this.timerHandle = null;
        // }

        //this.style.transform = "rotateZ(" + this.rotationDegrees + "deg) rotateY(" + this.rotationDegrees + "deg) rotateX(" + this.rotationDegrees + "deg)";
        this.style.transform = "rotateZ(" + this.rotationDegrees + "deg)";
    }

    faster() {
        if (this.timerHandle === null) { this.timerHandle = setInterval(() => this.tick(), this.sleepIntervalMs); }
        this.angularVelocity *= 1.01;
        if (this.angularVelocity > 360) { this.angularVelocity = 360; }
    }

    slower() {
        this.angularVelocity *= 0.99;
        if (this.angularVelocity < 0) { this.angularVelocity = 0; }
    }

    moreFriction() {
        this.angularFriction -= 0.001;
        if (this.angularFriction < 0.99) this.angularFriction = 0.99;
    }

    lessFriction() {
        this.angularFriction += 0.001;
        if (this.angularFriction > 1) this.angularFriction = 1;
    }

    private sleepIntervalMs: number = 10;
    private static angularVelocityBump: number = 3;
    private static maxAngularVelocity: number = 360;
    private angularVelocity: number = 0;
    private angularFriction: number = 0.9999;
    private rotationDegrees: number = 0;
    private transformStyle;

    private timerHandle: any = null;

    private px = "px";
}