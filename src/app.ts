
import {WebApp} from "./lib/web-app";
import {SpinEle} from "./lib/spin-ele";
import {Point} from "./lib/point";
import {DivEle} from "./lib/div-ele";
import {RandomNumber} from "./lib/random-number";
import {ButtonEle} from "./lib/button-ele";

class Text extends DivEle {

    set text(t: string) { this.target.innerHTML = t;}

    constructor() {
        super();
        this.style.display = "inline-block";
        this.style.color = "gray";
        this.style.fontFamily = "verdana";
        this.style.fontSize = "10px";
    }
}

class veil extends DivEle {
    constructor(public spinEles: Array<SpinEle>) {
        super();

        this.style.position = "absolute";
        this.style.width = "200px";
        this.style.height = "200px";

        this.style.top = "200px";
        this.style.left = "200px";

        this.target.addEventListener("mousedown", ()=>this.mouseDown());
        this.target.addEventListener("mouseup", ()=>this.mouseUp());
    }

    mouseDown() {
        this.timerHandle = setInterval(() => this.tick(), 33);
    }

    mouseUp() {
        clearInterval(this.timerHandle);
    }

    tick() {
        this.spinEles.forEach(e => e.faster());
    }

    timerHandle: number;
}

class App extends WebApp {
    
    constructor() {
        super();
        let eles: Array<SpinEle> = [];
        let initVel = 1;
        for (let i = 0; i < 26; i++) {
            let ele = new SpinEle("src/img/" + i.toString() + ".png", new Point(200, 200), initVel, (i%2===0)?true:false);
            eles.push(ele);
            this.addChild(ele);
            initVel += 0.1;
            //initVel -= 0.01;
            //initVel = RandomNumber.between(0.9, 1.1);
        }

        this.addChild(new veil(eles));
        let velocity = new Text();
        let faster = new ButtonEle("faster", () => {});
        let slower = new ButtonEle("slower", () => {});
        this.addChild(faster);
        this.addChild(slower);
        this.addChild(velocity);

        faster.target.addEventListener("mousedown", () => this.timerHandle = setInterval(() => {eles.forEach(e => e.faster()); velocity.text = eles[0].velocity.toString();}, 33));
        faster.target.addEventListener("mouseup", () => clearInterval(this.timerHandle));

        slower.target.addEventListener("mousedown", () => this.timerHandle = setInterval(() => {eles.forEach(e => e.slower()); velocity.text = eles[0].velocity.toString();}, 33));
        slower.target.addEventListener("mouseup", () => clearInterval(this.timerHandle));

        let frict = new Text();
        let moreFrict = new ButtonEle("more friction", () => {
            eles.forEach((e: SpinEle) => e.moreFriction());
            frict.text = eles[0].friction.toString();
        });
        let lessFriction = new ButtonEle("less friction", () => {
            eles.forEach((e: SpinEle) => e.lessFriction())
            frict.text = eles[0].friction.toString();
        });
        this.addChild(moreFrict);
        this.addChild(lessFriction);
        this.addChild(frict);


    }

    timerHandle: number;
}

window.onload = () => {
    try {
        new App();
    } catch (e) {
        console.error(e);
    }
}