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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var core_1 = require("@rsi/core");
var rxjs_1 = require("rxjs");
var Tracks = /** @class */ (function (_super) {
    __extends(Tracks, _super);
    // private _logger = RsiLogger.getInstance().getLogger("media");
    function Tracks(service) {
        var _this = _super.call(this, service) || this;
        _this.tracks = [];
        var mocksPath = path.join(__dirname, "..", "data", "mocks.json");
        var mocks = JSON.parse(fs.readFileSync(mocksPath).toString());
        for (var idx in mocks.tracks) {
            if (mocks.tracks.hasOwnProperty(idx)) {
                var track = mocks.tracks[idx];
                var trackObject = new rxjs_1.BehaviorSubject({
                    data: Object.assign({
                        uri: "/" +
                            _this.service.name +
                            "/" +
                            _this.name +
                            "/" +
                            track.id
                    }, track),
                    lastUpdate: Date.now(),
                    propertiesChanged: []
                });
                _this.tracks.push(trackObject);
            }
        }
        _this._change = new rxjs_1.BehaviorSubject({ lastUpdate: Date.now(), action: "init" });
        return _this;
    }
    Object.defineProperty(Tracks.prototype, "elementSubscribable", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tracks.prototype, "elements", {
        get: function () {
            return this.tracks;
        },
        enumerable: true,
        configurable: true
    });
    Tracks.prototype.getElement = function (elementId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // find the element requested by the client
                return [2 /*return*/, {
                        data: this.tracks.find(function (element) {
                            return element.getValue().data.id === elementId;
                        }),
                        status: "ok"
                    }];
            });
        });
    };
    Tracks.prototype.getResource = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                if ((typeof offset === "number" && typeof limit === "number") ||
                    (typeof limit === "number" && !offset) ||
                    (typeof offset === "number" && !limit) ||
                    (!offset && !limit)) {
                    resp = this.tracks.slice(offset, limit);
                }
                return [2 /*return*/, { status: "ok", data: resp }];
            });
        });
    };
    return Tracks;
}(core_1.Resource));
exports.Tracks = Tracks;
//# sourceMappingURL=tracks.js.map