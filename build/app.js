/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var web_app_1 = __webpack_require__(1);
var spin_ele_1 = __webpack_require__(2);
var point_1 = __webpack_require__(7);
var div_ele_1 = __webpack_require__(3);
var button_ele_1 = __webpack_require__(9);
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super.call(this) || this;
        _this.style.display = "inline-block";
        _this.style.color = "gray";
        _this.style.fontFamily = "verdana";
        _this.style.fontSize = "10px";
        return _this;
    }
    Object.defineProperty(Text.prototype, "text", {
        set: function (t) { this.target.innerHTML = t; },
        enumerable: true,
        configurable: true
    });
    return Text;
}(div_ele_1.DivEle));
var veil = /** @class */ (function (_super) {
    __extends(veil, _super);
    function veil(spinEles) {
        var _this = _super.call(this) || this;
        _this.spinEles = spinEles;
        _this.style.position = "absolute";
        _this.style.width = "200px";
        _this.style.height = "200px";
        _this.style.top = "200px";
        _this.style.left = "200px";
        _this.target.addEventListener("mousedown", function () { return _this.mouseDown(); });
        _this.target.addEventListener("mouseup", function () { return _this.mouseUp(); });
        return _this;
    }
    veil.prototype.mouseDown = function () {
        var _this = this;
        this.timerHandle = setInterval(function () { return _this.tick(); }, 33);
    };
    veil.prototype.mouseUp = function () {
        clearInterval(this.timerHandle);
    };
    veil.prototype.tick = function () {
        this.spinEles.forEach(function (e) { return e.faster(); });
    };
    return veil;
}(div_ele_1.DivEle));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        var eles = [];
        var initVel = 1;
        for (var i = 0; i < 26; i++) {
            var ele = new spin_ele_1.SpinEle("src/img/" + i.toString() + ".png", new point_1.Point(200, 200), initVel, (i % 2 === 0) ? true : false);
            eles.push(ele);
            _this.addChild(ele);
            initVel += 0.1;
            //initVel -= 0.01;
            //initVel = RandomNumber.between(0.9, 1.1);
        }
        _this.addChild(new veil(eles));
        var velocity = new Text();
        var faster = new button_ele_1.ButtonEle("faster", function () { });
        var slower = new button_ele_1.ButtonEle("slower", function () { });
        _this.addChild(faster);
        _this.addChild(slower);
        _this.addChild(velocity);
        faster.target.addEventListener("mousedown", function () { return _this.timerHandle = setInterval(function () { eles.forEach(function (e) { return e.faster(); }); velocity.text = eles[0].velocity.toString(); }, 33); });
        faster.target.addEventListener("mouseup", function () { return clearInterval(_this.timerHandle); });
        slower.target.addEventListener("mousedown", function () { return _this.timerHandle = setInterval(function () { eles.forEach(function (e) { return e.slower(); }); velocity.text = eles[0].velocity.toString(); }, 33); });
        slower.target.addEventListener("mouseup", function () { return clearInterval(_this.timerHandle); });
        var frict = new Text();
        var moreFrict = new button_ele_1.ButtonEle("more friction", function () {
            eles.forEach(function (e) { return e.moreFriction(); });
            frict.text = eles[0].friction.toString();
        });
        var lessFriction = new button_ele_1.ButtonEle("less friction", function () {
            eles.forEach(function (e) { return e.lessFriction(); });
            frict.text = eles[0].friction.toString();
        });
        _this.addChild(moreFrict);
        _this.addChild(lessFriction);
        _this.addChild(frict);
        return _this;
    }
    return App;
}(web_app_1.WebApp));
window.onload = function () {
    try {
        new App();
    }
    catch (e) {
        console.error(e);
    }
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WebApp = /** @class */ (function () {
    function WebApp() {
        this._children = [];
    }
    WebApp.prototype.addChildren = function (children) {
        var _this = this;
        children.forEach(function (child) { return _this.addChild(child); });
    };
    WebApp.prototype.addChild = function (child) {
        this._children.push(child);
        window.document.body.appendChild(child.target);
    };
    WebApp.prototype.removeChild = function (child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex < 0) {
            throw new Error("Attempted to remove unknown child");
        }
        this._children.splice(childIndex, 1);
        window.document.body.removeChild(child.target);
        child = null;
        console.log("num web app children: " + this._children.length);
    };
    return WebApp;
}());
exports.WebApp = WebApp;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var div_ele_1 = __webpack_require__(3);
var img_ele_1 = __webpack_require__(5);
var SpinEle = /** @class */ (function (_super) {
    __extends(SpinEle, _super);
    function SpinEle(imgPath, pos, initialVelocity, spinClockwise) {
        if (initialVelocity === void 0) { initialVelocity = 1; }
        if (spinClockwise === void 0) { spinClockwise = true; }
        var _this = _super.call(this) || this;
        _this.spinClockwise = spinClockwise;
        _this.sleepIntervalMs = 10;
        _this.angularVelocity = 0;
        _this.angularFriction = 0.9999;
        _this.rotationDegrees = 0;
        _this.timerHandle = null;
        _this.px = "px";
        _this.style.position = "absolute";
        _this.style.top = pos.x + _this.px;
        _this.style.left = pos.y + _this.px;
        _this.style.width = "200px";
        _this.style.height = "200px";
        _this.addChild(new img_ele_1.ImgEle(imgPath, function (i) { }));
        _this.angularVelocity = initialVelocity;
        _this.timerHandle = setInterval(function () { return _this.tick(); }, _this.sleepIntervalMs);
        return _this;
    }
    Object.defineProperty(SpinEle.prototype, "friction", {
        get: function () { return this.angularFriction; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinEle.prototype, "velocity", {
        get: function () { return this.angularVelocity; },
        enumerable: true,
        configurable: true
    });
    SpinEle.prototype.tick = function () {
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
    };
    SpinEle.prototype.faster = function () {
        var _this = this;
        if (this.timerHandle === null) {
            this.timerHandle = setInterval(function () { return _this.tick(); }, this.sleepIntervalMs);
        }
        this.angularVelocity *= 1.01;
        if (this.angularVelocity > 360) {
            this.angularVelocity = 360;
        }
    };
    SpinEle.prototype.slower = function () {
        this.angularVelocity *= 0.99;
        if (this.angularVelocity < 0) {
            this.angularVelocity = 0;
        }
    };
    SpinEle.prototype.moreFriction = function () {
        this.angularFriction -= 0.001;
        if (this.angularFriction < 0.99)
            this.angularFriction = 0.99;
    };
    SpinEle.prototype.lessFriction = function () {
        this.angularFriction += 0.001;
        if (this.angularFriction > 1)
            this.angularFriction = 1;
    };
    SpinEle.angularVelocityBump = 3;
    SpinEle.maxAngularVelocity = 360;
    return SpinEle;
}(div_ele_1.DivEle));
exports.SpinEle = SpinEle;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(4);
var DivEle = /** @class */ (function (_super) {
    __extends(DivEle, _super);
    function DivEle() {
        var _this = _super.call(this) || this;
        _this.target = document.createElement("div");
        return _this;
    }
    return DivEle;
}(ele_1.Ele));
exports.DivEle = DivEle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ele = /** @class */ (function () {
    function Ele() {
        this.children = [];
    }
    Object.defineProperty(Ele.prototype, "style", {
        get: function () { return this.target.style; },
        enumerable: true,
        configurable: true
    });
    Ele.prototype.addChild = function (child) {
        this.children.push(child);
        this.target.appendChild(child.target);
    };
    // Add a child that isn't in the children list and won't get unloaded.
    Ele.prototype.addUntrackedChild = function (child) {
        this.target.appendChild(child.target);
    };
    Ele.prototype.addChildren = function (children) {
        var _this = this;
        children.forEach(function (child) { return _this.addChild(child); });
    };
    Ele.prototype.removeChild = function (child) {
        this.target.removeChild(child.target);
        this.children.splice(this.children.indexOf(child), 1);
        child._unload();
    };
    Ele.prototype._unload = function () {
        this.children.forEach(function (child) { return child.unload; });
        this.children = [];
        this.unload();
    };
    // Derived classes override this if you need to cancel any timers
    Ele.prototype.unload = function () {
    };
    return Ele;
}());
exports.Ele = Ele;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(4);
var model_1 = __webpack_require__(6);
var ImgEle = /** @class */ (function (_super) {
    __extends(ImgEle, _super);
    function ImgEle(src, _onRemoved) {
        if (src === void 0) { src = null; }
        var _this = _super.call(this) || this;
        _this._onRemoved = _onRemoved;
        _this.target = document.createElement("img");
        _this.src = src;
        _this.imgElement.addEventListener("contextmenu", function (e) { return _this._onContextMenu(e); });
        return _this;
    }
    Object.defineProperty(ImgEle.prototype, "imgElement", {
        get: function () { return this.target; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImgEle.prototype, "src", {
        set: function (src) {
            if (src === null) {
                this.imgElement.style.display = "hidden";
            }
            else {
                this.imgElement.style.display = "block";
                this.imgElement.src = src;
            }
        },
        enumerable: true,
        configurable: true
    });
    ImgEle.prototype.toModel = function () {
        return new ImgEleModel(this.imgElement.src);
    };
    ImgEle.prototype._onContextMenu = function (e) {
        this._onRemoved(this);
        e.preventDefault();
        e.stopPropagation();
    };
    return ImgEle;
}(ele_1.Ele));
exports.ImgEle = ImgEle;
var ImgEleModel = /** @class */ (function (_super) {
    __extends(ImgEleModel, _super);
    function ImgEleModel(src) {
        var _this = _super.call(this) || this;
        _this.src = src;
        return _this;
    }
    return ImgEleModel;
}(model_1.Model));
exports.ImgEleModel = ImgEleModel;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.updateFromMouseEvent = function (e) {
        this.x = e.clientX;
        this.y = e.clientY;
    };
    Point.prototype.copy = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.bumpBy = function (other) {
        this.x = this.x + other.x;
        this.y = this.y + other.y;
    };
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };
    Point.prototype.subtract = function (other) {
        return new Point(this.x - other.x, this.y - other.y);
    };
    Point.prototype.toModel = function () {
        return this.copy();
    };
    return Point;
}());
exports.Point = Point;
var PointAverager = /** @class */ (function () {
    function PointAverager() {
        this._averageBuffer = [];
        this._averageBufferSize = 10;
    }
    Object.defineProperty(PointAverager.prototype, "average", {
        get: function () {
            var xSum = 0;
            var ySum = 0;
            this._averageBuffer.forEach(function (point) {
                xSum += point.x;
                ySum += point.y;
            });
            if (this._averageBuffer.length === 0) {
                return new Point();
            }
            else {
                return new Point(xSum / this._averageBuffer.length, ySum / this._averageBuffer.length);
            }
        },
        enumerable: true,
        configurable: true
    });
    PointAverager.prototype.push = function (p) {
        this._averageBuffer.push(p.copy());
        if (this._averageBuffer.length > this._averageBufferSize) {
            this._averageBuffer.splice(0, 1);
        }
    };
    PointAverager.prototype.clear = function () {
        this._averageBuffer = [];
    };
    return PointAverager;
}());
exports.PointAverager = PointAverager;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(4);
var ButtonEle = /** @class */ (function (_super) {
    __extends(ButtonEle, _super);
    function ButtonEle(buttonText, _onClicked) {
        var _this = _super.call(this) || this;
        _this._onClicked = _onClicked;
        _this.target = document.createElement("button");
        _this.buttonElement.innerHTML = buttonText;
        _this.buttonElement.onclick = _this._onClicked;
        return _this;
    }
    Object.defineProperty(ButtonEle.prototype, "buttonElement", {
        get: function () { return this.target; },
        enumerable: true,
        configurable: true
    });
    return ButtonEle;
}(ele_1.Ele));
exports.ButtonEle = ButtonEle;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map