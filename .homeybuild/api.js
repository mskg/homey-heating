/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/compat.ts":
/*!***************************!*\
  !*** ./src/api/compat.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompatibilityWrapper = void 0;
function CompatibilityWrapper(c) {
    return ({ body, params, query }) => {
        return new Promise((resolve, reject) => {
            c.fn({ body, params, query }, (e, v) => {
                if (e) {
                    reject(e);
                }
                else {
                    resolve(v);
                }
            });
        });
    };
}
exports.CompatibilityWrapper = CompatibilityWrapper;


/***/ }),

/***/ "./src/api/debugger.ts":
/*!*****************************!*\
  !*** ./src/api/debugger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DebuggerOff = exports.DebuggerOn = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const types_1 = __webpack_require__(/*! ./types */ "./src/api/types.ts");
let DebuggerOn = class DebuggerOn extends types_1.ApiBase {
    constructor() {
        super("GET", "/debugger/on");
        this.public =  true || 0;
    }
    execute(_args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (true) {
                throw new Error("Access denied.");
            }
            const inspector = __webpack_require__(/*! inspector */ "inspector");
            inspector.open(9229, "0.0.0.0", false);
            return types_1.SUCCESS;
        });
    }
};
DebuggerOn = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], DebuggerOn);
exports.DebuggerOn = DebuggerOn;
let DebuggerOff = class DebuggerOff extends types_1.ApiBase {
    constructor() {
        super("GET", "/debugger/off");
        this.public =  true || 0;
    }
    execute(_args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (true) {
                throw new Error("Access denied.");
            }
            const inspector = __webpack_require__(/*! inspector */ "inspector");
            inspector.close();
            return types_1.SUCCESS;
        });
    }
};
DebuggerOff = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], DebuggerOff);
exports.DebuggerOff = DebuggerOff;


/***/ }),

/***/ "./src/api/mode.ts":
/*!*************************!*\
  !*** ./src/api/mode.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetMode = exports.PutMode = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const types_1 = __webpack_require__(/*! ./types */ "./src/api/types.ts");
let PutMode = class PutMode extends types_1.ApiBase {
    constructor(manager) {
        super("PUT", "/mode");
        this.manager = manager;
    }
    execute(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mode = args.body.mode;
            this.manager.operationMode = mode;
            return types_1.SUCCESS;
        });
    }
};
PutMode = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingManagerService])
], PutMode);
exports.PutMode = PutMode;
let GetMode = class GetMode extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/mode");
        this.manager = manager;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { mode: this.manager.operationMode };
        });
    }
};
GetMode = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingManagerService])
], GetMode);
exports.GetMode = GetMode;


/***/ }),

/***/ "./src/api/plans.ts":
/*!**************************!*\
  !*** ./src/api/plans.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeletePlan = exports.PutPlan = exports.GetPlan = exports.GetPlans = exports.GetResetPlans = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const helper_1 = __webpack_require__(/*! @app/helper */ "@app/helper");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const types_1 = __webpack_require__(/*! ./types */ "./src/api/types.ts");
let GetResetPlans = class GetResetPlans extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/resetplans");
        this.manager = manager;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.manager.replacePlans(helper_1.DEFAULT_HEATING_PLAN);
            return yield this.manager.plans;
        });
    }
};
GetResetPlans = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingPlanRepositoryService])
], GetResetPlans);
exports.GetResetPlans = GetResetPlans;
let GetPlans = class GetPlans extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/plans");
        this.manager = manager;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.manager.plans;
            return result;
        });
    }
};
GetPlans = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingPlanRepositoryService])
], GetPlans);
exports.GetPlans = GetPlans;
let GetPlan = class GetPlan extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/plans/:id");
        this.manager = manager;
    }
    execute(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.manager.find(args.params.id);
            return result;
        });
    }
};
GetPlan = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingPlanRepositoryService])
], GetPlan);
exports.GetPlan = GetPlan;
let PutPlan = class PutPlan extends types_1.ApiBase {
    constructor(manager, devices) {
        super("PUT", "/plans/:id");
        this.manager = manager;
        this.devices = devices;
    }
    execute(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const plan = args.body;
            plan.id = args.params.id;
            // kill all unkown devices
            if (plan.devices) {
                (0, lodash_1.remove)(plan.devices, (r) => (0, lodash_1.find)(this.devices.devices, (d) => d.id === r) == null);
            }
            // kill all unkown devices
            if (plan.zones) {
                (0, lodash_1.remove)(plan.zones, (r) => (0, lodash_1.find)(this.devices.zones, (z) => z.id === r) == null);
            }
            // if the plan is disabled -> no override
            // this way we can recover from fully manual
            if (!plan.enabled) {
                delete plan.thermostatMode;
            }
            yield this.manager.update(plan);
            return plan;
        });
    }
};
PutPlan = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingPlanRepositoryService,
        services_1.DeviceManagerService])
], PutPlan);
exports.PutPlan = PutPlan;
let DeletePlan = class DeletePlan extends types_1.ApiBase {
    constructor(manager) {
        super("DELETE", "/plans/:id");
        this.manager = manager;
    }
    execute(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.manager.remove(args.params.id);
            return types_1.SUCCESS;
        });
    }
};
DeletePlan = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingPlanRepositoryService])
], DeletePlan);
exports.DeletePlan = DeletePlan;


/***/ }),

/***/ "./src/api/schedule.ts":
/*!*****************************!*\
  !*** ./src/api/schedule.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSchedule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const types_1 = __webpack_require__(/*! ./types */ "./src/api/types.ts");
let GetSchedule = class GetSchedule extends types_1.ApiBase {
    constructor(manager, scheduler) {
        super("GET", "/schedule");
        this.manager = manager;
        this.scheduler = scheduler;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                mode: this.manager.operationMode,
                nextDate: this.scheduler.nextSchedule,
                temperatures: yield this.manager.evaluateActivePlans(),
            };
        });
    }
};
GetSchedule = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingManagerService,
        services_1.HeatingSchedulerService])
], GetSchedule);
exports.GetSchedule = GetSchedule;


/***/ }),

/***/ "./src/api/settings.ts":
/*!*****************************!*\
  !*** ./src/api/settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PutSettings = exports.GetSettings = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const types_1 = __webpack_require__(/*! ./types */ "./src/api/types.ts");
let GetSettings = class GetSettings extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/settings");
        this.manager = manager;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = {};
            // const manager = this.myApp.getService(SettingsManagerService);
            (0, lodash_1.forEach)(Object.keys(services_1.Settings), (s) => {
                result[s] = this.manager.get(services_1.Settings[s]);
            });
            return result;
        });
    }
};
GetSettings = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.SettingsManagerService])
], GetSettings);
exports.GetSettings = GetSettings;
let PutSettings = class PutSettings extends types_1.ApiBase {
    constructor(manager) {
        super("PUT", "/settings");
        this.manager = manager;
    }
    execute(args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settings = args.body;
            (0, lodash_1.forEach)([...Object.keys(services_1.Settings), ...Object.keys(services_1.InternalSettings)], (publicKey) => {
                // @ts-ignore
                const privateKey = services_1.Settings[publicKey];
                if (settings.hasOwnProperty(publicKey)) {
                    if (this.manager.get(privateKey) !== settings[publicKey]) {
                        this.manager.set(privateKey, settings[publicKey]);
                    }
                    else {
                        this.logger.debug(`Setting ${privateKey} did not change.`);
                    }
                }
            });
            return types_1.SUCCESS;
        });
    }
};
PutSettings = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.SettingsManagerService])
], PutSettings);
exports.PutSettings = PutSettings;


/***/ }),

/***/ "./src/api/types.ts":
/*!**************************!*\
  !*** ./src/api/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiBase = exports.SUCCESS = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
/***
 * Success for APIs not returning a value.
 */
exports.SUCCESS = "OK";
/**
 * Base class for API methods.
 */
class ApiBase {
    get logger() {
        return ApiBase.logger;
    }
    /**
     * static initializer
     */
    static initialize() {
        if (ApiBase.initialized) {
            return;
        }
        const settings = tsyringe_1.container.resolve(services_1.SettingsManagerService);
        settings.onChanged.subscribe((_s, v) => {
            if (v.setting === services_1.InternalSettings.LogApi) {
                ApiBase.logApi = v.value;
            }
        });
        ApiBase.logApi = settings.get(services_1.InternalSettings.LogApi, false) === true;
        ApiBase.logger = tsyringe_1.container.resolve(services_1.LoggerFactory).createLogger("Api");
        ApiBase.initialized = true;
    }
    constructor(method, path) {
        this.method = method;
        this.path = path;
        this.public = !false;
        ApiBase.initialize();
        this.logger.information(`Bound endpoint ${method} ${path}`);
    }
    fn(args, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (ApiBase.logApi) {
                    this.logger.debug(`${this.method} ${this.path} ${JSON.stringify(args)}`);
                }
                else {
                    this.logger.debug(`${this.method} ${this.path}`);
                }
                const result = yield (this.execute(args));
                if (ApiBase.logApi) {
                    this.logger.debug(`${this.method} ${this.path}`, "Request:", JSON.stringify(args), "Response:", JSON.stringify(result));
                }
                callback(null, result);
            }
            catch (e) {
                this.logger.error(e, `${this.method} ${this.path} failed`, args);
                callback(e, null);
            }
        });
    }
}
ApiBase.logApi = false;
ApiBase.initialized = false;
exports.ApiBase = ApiBase;


/***/ }),

/***/ "./src/api/utility.ts":
/*!****************************!*\
  !*** ./src/api/utility.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetDevices = exports.GetZones = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const types_1 = __webpack_require__(/*! ./types */ "./src/api/types.ts");
let GetZones = class GetZones extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/zones");
        this.manager = manager;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = (0, lodash_1.map)(this.manager.zones, (z) => {
                return {
                    id: z.id,
                    name: z.name,
                    icon: z.icon,
                };
            });
            return result;
        });
    }
};
GetZones = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.DeviceManagerService])
], GetZones);
exports.GetZones = GetZones;
let GetDevices = class GetDevices extends types_1.ApiBase {
    constructor(manager) {
        super("GET", "/devices");
        this.manager = manager;
    }
    execute() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = (0, lodash_1.map)(this.manager.devices, (z) => {
                return {
                    id: z.id,
                    name: z.name,
                    icon: z.iconObj && z.iconObj.url,
                };
            });
            return result;
        });
    }
};
GetDevices = tslib_1.__decorate([
    (0, tsyringe_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [services_1.DeviceManagerService])
], GetDevices);
exports.GetDevices = GetDevices;


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "@app/helper":
/*!******************************!*\
  !*** external "@app/helper" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@app/helper");

/***/ }),

/***/ "@app/services":
/*!********************************!*\
  !*** external "@app/services" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@app/services");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "tsyringe":
/*!***************************!*\
  !*** external "tsyringe" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("tsyringe");

/***/ }),

/***/ "inspector":
/*!****************************!*\
  !*** external "inspector" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("inspector");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSchedule = exports.GetZones = exports.GetDevices = exports.GetResetPlans = exports.GetPlans = exports.PutPlan = exports.GetPlan = exports.DeletePlan = exports.PutMode = exports.GetMode = exports.PutSettings = exports.GetSettings = exports.DebuggerOff = exports.DebuggerOn = void 0;
// must not be removed
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
// position must not be changed
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
const compat_1 = __webpack_require__(/*! ./compat */ "./src/api/compat.ts");
const debugger_1 = __webpack_require__(/*! ./debugger */ "./src/api/debugger.ts");
const mode_1 = __webpack_require__(/*! ./mode */ "./src/api/mode.ts");
const plans_1 = __webpack_require__(/*! ./plans */ "./src/api/plans.ts");
const schedule_1 = __webpack_require__(/*! ./schedule */ "./src/api/schedule.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./src/api/settings.ts");
const utility_1 = __webpack_require__(/*! ./utility */ "./src/api/utility.ts");
// tslint:disable-next-line: no-console
console.info(`Bootstrapping API v${"2.0.0-rc7"} (${undefined})`);
exports.DebuggerOn = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(debugger_1.DebuggerOn));
exports.DebuggerOff = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(debugger_1.DebuggerOff));
exports.GetSettings = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(settings_1.GetSettings));
exports.PutSettings = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(settings_1.PutSettings));
exports.GetMode = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(mode_1.GetMode));
exports.PutMode = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(mode_1.PutMode));
exports.DeletePlan = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(plans_1.DeletePlan));
exports.GetPlan = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(plans_1.GetPlan));
exports.PutPlan = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(plans_1.PutPlan));
exports.GetPlans = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(plans_1.GetPlans));
exports.GetResetPlans = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(plans_1.GetResetPlans));
exports.GetDevices = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(utility_1.GetDevices));
exports.GetZones = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(utility_1.GetZones));
exports.GetSchedule = (0, compat_1.CompatibilityWrapper)(tsyringe_1.container.resolve(schedule_1.GetSchedule));

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLENBQUMsT0FBTyxDQUFDLHFCQUFrQixDQUFDLENBQUMsQ0FBQztBQUU1RSxrQkFBVSxHQUFHLGlDQUFvQixFQUFDLG9CQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFRLEdBQUcsaUNBQW9CLEVBQUMsb0JBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQWEsQ0FBQyxDQUFDLENBQUM7QUFFbEUsbUJBQVcsR0FBRyxpQ0FBb0IsRUFBQyxvQkFBUyxDQUFDLE9BQU8sQ0FBQyxzQkFBZ0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nLy4vc3JjL2FwaS9jb21wYXQudHMiLCJ3ZWJwYWNrOi8vaG9tZXktaGVhdGluZy8uL3NyYy9hcGkvZGVidWdnZXIudHMiLCJ3ZWJwYWNrOi8vaG9tZXktaGVhdGluZy8uL3NyYy9hcGkvbW9kZS50cyIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nLy4vc3JjL2FwaS9wbGFucy50cyIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nLy4vc3JjL2FwaS9zY2hlZHVsZS50cyIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nLy4vc3JjL2FwaS9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nLy4vc3JjL2FwaS90eXBlcy50cyIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nLy4vc3JjL2FwaS91dGlsaXR5LnRzIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwiQGFwcC9oZWxwZXJcIiIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL2V4dGVybmFsIGNvbW1vbmpzMiBcIkBhcHAvc2VydmljZXNcIiIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL2V4dGVybmFsIGNvbW1vbmpzMiBcImxvZGFzaFwiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwidHN5cmluZ2VcIiIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJpbnNwZWN0b3JcIiIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaG9tZXktaGVhdGluZy8uL3NyYy9hcGkvYXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCBhcyBIb21leUFwcCB9IGZyb20gXCJob21leVwiO1xuaW1wb3J0IHsgQXBpQmFzZSwgSUFQSVBhcmFtcywgVW5rb3duUGFyYW1ldGVycyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbnR5cGUgUGFyYW1ldGVycyA9IHtcbiAgICBob21leTogSG9tZXlBcHAsXG4gICAgYm9keTogb2JqZWN0LFxuICAgIHBhcmFtczogeyBbaWQ6IHN0cmluZ106IHN0cmluZzsgfVxuICAgIHF1ZXJ5OiB7IFtpZDogc3RyaW5nXTogc3RyaW5nOyB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBhdGliaWxpdHlXcmFwcGVyPEIgPSBhbnksIFAgPSBVbmtvd25QYXJhbWV0ZXJzLCBRID0gVW5rb3duUGFyYW1ldGVycz4oYzogQXBpQmFzZTxCLCBQLCBRPik6IChwOiBQYXJhbWV0ZXJzKSA9PiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiAoeyBib2R5LCBwYXJhbXMsIHF1ZXJ5IH06IFBhcmFtZXRlcnMpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYy5mbih7IGJvZHksIHBhcmFtcywgcXVlcnkgfSBhcyBJQVBJUGFyYW1zPEIsIFAsIFE+LCAoZTogYW55LCB2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tIFwidHN5cmluZ2VcIjtcbmltcG9ydCB7IEFwaUJhc2UsIElBUElQYXJhbXMsIFNVQ0NFU1MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVidWdnZXJPbiBleHRlbmRzIEFwaUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIkdFVFwiLCBcIi9kZWJ1Z2dlci9vblwiKTtcbiAgICAgICAgdGhpcy5wdWJsaWMgPSAhX19QUk9EVUNUSU9OX18gfHwgX19WRVJTSU9OID09PSBcIjAuMC4wXCI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGV4ZWN1dGUoX2FyZ3M6IElBUElQYXJhbXMpIHtcbiAgICAgICAgaWYgKF9fVkVSU0lPTiAhPT0gXCIwLjAuMFwiKSB7IHRocm93IG5ldyBFcnJvcihcIkFjY2VzcyBkZW5pZWQuXCIpOyB9XG5cbiAgICAgICAgY29uc3QgaW5zcGVjdG9yID0gcmVxdWlyZShcImluc3BlY3RvclwiKTtcbiAgICAgICAgaW5zcGVjdG9yLm9wZW4oOTIyOSwgXCIwLjAuMC4wXCIsIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gU1VDQ0VTUztcbiAgICB9XG59XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEZWJ1Z2dlck9mZiBleHRlbmRzIEFwaUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIkdFVFwiLCBcIi9kZWJ1Z2dlci9vZmZcIik7XG4gICAgICAgIHRoaXMucHVibGljID0gIV9fUFJPRFVDVElPTl9fIHx8IF9fVkVSU0lPTiA9PT0gXCIwLjAuMFwiO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBleGVjdXRlKF9hcmdzOiBJQVBJUGFyYW1zKSB7XG4gICAgICAgIGlmIChfX1ZFUlNJT04gIT09IFwiMC4wLjBcIikgeyB0aHJvdyBuZXcgRXJyb3IoXCJBY2Nlc3MgZGVuaWVkLlwiKTsgfVxuXG4gICAgICAgIGNvbnN0IGluc3BlY3RvciA9IHJlcXVpcmUoXCJpbnNwZWN0b3JcIik7XG4gICAgICAgIGluc3BlY3Rvci5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBTVUNDRVNTO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE9wZXJhdGlvbk1vZGUgfSBmcm9tIFwiQGFwcC9tb2RlbFwiO1xuaW1wb3J0IHsgSGVhdGluZ01hbmFnZXJTZXJ2aWNlIH0gZnJvbSBcIkBhcHAvc2VydmljZXNcIjtcbmltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tIFwidHN5cmluZ2VcIjtcbmltcG9ydCB7IEFwaUJhc2UsIElBUElQYXJhbXMsIFNVQ0NFU1MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG50eXBlIEJvZHkgPSB7XG4gICAgbW9kZTogT3BlcmF0aW9uTW9kZSxcbn07XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQdXRNb2RlIGV4dGVuZHMgQXBpQmFzZTxCb2R5PiB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbWFuYWdlcjogSGVhdGluZ01hbmFnZXJTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFwiUFVUXCIsIFwiL21vZGVcIik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGV4ZWN1dGUoYXJnczogSUFQSVBhcmFtczxCb2R5Pikge1xuICAgICAgICBjb25zdCBtb2RlOiBudW1iZXIgPSBhcmdzLmJvZHkubW9kZTtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLm9wZXJhdGlvbk1vZGUgPSBtb2RlO1xuICAgICAgICByZXR1cm4gU1VDQ0VTUztcbiAgICB9XG59XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZXRNb2RlIGV4dGVuZHMgQXBpQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYW5hZ2VyOiBIZWF0aW5nTWFuYWdlclNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXCJHRVRcIiwgXCIvbW9kZVwiKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgZXhlY3V0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHttb2RlOiB0aGlzLm1hbmFnZXIub3BlcmF0aW9uTW9kZX07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgREVGQVVMVF9IRUFUSU5HX1BMQU4gfSBmcm9tIFwiQGFwcC9oZWxwZXJcIjtcbmltcG9ydCB7IElIZWF0aW5nUGxhbiB9IGZyb20gXCJAYXBwL21vZGVsXCI7XG5pbXBvcnQgeyBEZXZpY2VNYW5hZ2VyU2VydmljZSwgSGVhdGluZ1BsYW5SZXBvc2l0b3J5U2VydmljZSB9IGZyb20gXCJAYXBwL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBmaW5kLCByZW1vdmUgfSBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSBcInRzeXJpbmdlXCI7XG5pbXBvcnQgeyBBcGlCYXNlLCBJQVBJUGFyYW1zLCBTVUNDRVNTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxudHlwZSBQYXJhbXMgPSB7XG4gICAgaWQ6IHN0cmluZztcbn07XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZXRSZXNldFBsYW5zIGV4dGVuZHMgQXBpQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYW5hZ2VyOiBIZWF0aW5nUGxhblJlcG9zaXRvcnlTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFwiR0VUXCIsIFwiL3Jlc2V0cGxhbnNcIik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIHRoaXMubWFuYWdlci5yZXBsYWNlUGxhbnMoREVGQVVMVF9IRUFUSU5HX1BMQU4pO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5tYW5hZ2VyLnBsYW5zO1xuICAgIH1cbn1cblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdldFBsYW5zIGV4dGVuZHMgQXBpQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYW5hZ2VyOiBIZWF0aW5nUGxhblJlcG9zaXRvcnlTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFwiR0VUXCIsIFwiL3BsYW5zXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBleGVjdXRlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLm1hbmFnZXIucGxhbnM7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2V0UGxhbiBleHRlbmRzIEFwaUJhc2U8YW55LCBQYXJhbXM+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hbmFnZXI6IEhlYXRpbmdQbGFuUmVwb3NpdG9yeVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXCJHRVRcIiwgXCIvcGxhbnMvOmlkXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBleGVjdXRlKGFyZ3M6IElBUElQYXJhbXM8YW55LCBQYXJhbXM+KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMubWFuYWdlci5maW5kKGFyZ3MucGFyYW1zLmlkKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFB1dFBsYW4gZXh0ZW5kcyBBcGlCYXNlPGFueSwgUGFyYW1zPiB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbWFuYWdlcjogSGVhdGluZ1BsYW5SZXBvc2l0b3J5U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBkZXZpY2VzOiBEZXZpY2VNYW5hZ2VyU2VydmljZSkge1xuICAgICAgICBzdXBlcihcIlBVVFwiLCBcIi9wbGFucy86aWRcIik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGV4ZWN1dGUoYXJnczogSUFQSVBhcmFtczxhbnksIFBhcmFtcz4pIHtcbiAgICAgICAgY29uc3QgcGxhbiA9IGFyZ3MuYm9keSBhcyBJSGVhdGluZ1BsYW47XG4gICAgICAgIHBsYW4uaWQgPSBhcmdzLnBhcmFtcy5pZDtcblxuICAgICAgICAvLyBraWxsIGFsbCB1bmtvd24gZGV2aWNlc1xuICAgICAgICBpZiAocGxhbi5kZXZpY2VzKSB7XG4gICAgICAgICAgICByZW1vdmUocGxhbi5kZXZpY2VzLCAocjogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgIGZpbmQodGhpcy5kZXZpY2VzLmRldmljZXMsIChkKSA9PiBkLmlkID09PSByKSA9PSBudWxsLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGtpbGwgYWxsIHVua293biBkZXZpY2VzXG4gICAgICAgIGlmIChwbGFuLnpvbmVzKSB7XG4gICAgICAgICAgICByZW1vdmUocGxhbi56b25lcywgKHI6IHN0cmluZykgPT5cbiAgICAgICAgICAgICAgICBmaW5kKHRoaXMuZGV2aWNlcy56b25lcywgKHopID0+IHouaWQgPT09IHIpID09IG51bGwsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIHBsYW4gaXMgZGlzYWJsZWQgLT4gbm8gb3ZlcnJpZGVcbiAgICAgICAgLy8gdGhpcyB3YXkgd2UgY2FuIHJlY292ZXIgZnJvbSBmdWxseSBtYW51YWxcbiAgICAgICAgaWYgKCFwbGFuLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwbGFuLnRoZXJtb3N0YXRNb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5tYW5hZ2VyLnVwZGF0ZShwbGFuKTtcbiAgICAgICAgcmV0dXJuIHBsYW47XG4gICAgfVxufVxuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVsZXRlUGxhbiBleHRlbmRzIEFwaUJhc2U8YW55LCBQYXJhbXM+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hbmFnZXI6IEhlYXRpbmdQbGFuUmVwb3NpdG9yeVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXCJERUxFVEVcIiwgXCIvcGxhbnMvOmlkXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBleGVjdXRlKGFyZ3M6IElBUElQYXJhbXM8YW55LCBQYXJhbXM+KSB7XG4gICAgICAgIGF3YWl0IHRoaXMubWFuYWdlci5yZW1vdmUoYXJncy5wYXJhbXMuaWQpO1xuICAgICAgICByZXR1cm4gU1VDQ0VTUztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJU2NoZWR1bGVJbmZvcm1hdGlvbiB9IGZyb20gXCJAYXBwL21vZGVsXCI7XG5pbXBvcnQgeyBIZWF0aW5nTWFuYWdlclNlcnZpY2UsIEhlYXRpbmdTY2hlZHVsZXJTZXJ2aWNlIH0gZnJvbSBcIkBhcHAvc2VydmljZXNcIjtcbmltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tIFwidHN5cmluZ2VcIjtcbmltcG9ydCB7IEFwaUJhc2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2V0U2NoZWR1bGUgZXh0ZW5kcyBBcGlCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtYW5hZ2VyOiBIZWF0aW5nTWFuYWdlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBIZWF0aW5nU2NoZWR1bGVyU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIoXCJHRVRcIiwgXCIvc2NoZWR1bGVcIik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb2RlOiB0aGlzLm1hbmFnZXIub3BlcmF0aW9uTW9kZSxcbiAgICAgICAgICAgIG5leHREYXRlOiB0aGlzLnNjaGVkdWxlci5uZXh0U2NoZWR1bGUsXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZXM6IGF3YWl0IHRoaXMubWFuYWdlci5ldmFsdWF0ZUFjdGl2ZVBsYW5zKCksXG4gICAgICAgIH0gYXMgSVNjaGVkdWxlSW5mb3JtYXRpb247XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQWxsU2V0dGluZ3MsIEludGVybmFsU2V0dGluZ3MsIFNldHRpbmdzLCBTZXR0aW5nc01hbmFnZXJTZXJ2aWNlIH0gZnJvbSBcIkBhcHAvc2VydmljZXNcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSBcInRzeXJpbmdlXCI7XG5pbXBvcnQgeyBBcGlCYXNlLCBJQVBJUGFyYW1zLCBTVUNDRVNTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdldFNldHRpbmdzIGV4dGVuZHMgQXBpQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYW5hZ2VyOiBTZXR0aW5nc01hbmFnZXJTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKFwiR0VUXCIsIFwiL3NldHRpbmdzXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBleGVjdXRlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IHtcbiAgICAgICAgICAgIFtrZXk6IHN0cmluZ106IGFueSxcbiAgICAgICAgfSA9IHt9O1xuICAgICAgICAvLyBjb25zdCBtYW5hZ2VyID0gdGhpcy5teUFwcC5nZXRTZXJ2aWNlKFNldHRpbmdzTWFuYWdlclNlcnZpY2UpO1xuXG4gICAgICAgIGZvckVhY2goT2JqZWN0LmtleXMoU2V0dGluZ3MpLCAoczogYW55KSA9PiB7XG4gICAgICAgICAgICByZXN1bHRbc10gPSB0aGlzLm1hbmFnZXIuZ2V0KChTZXR0aW5ncyBhcyBhbnkpW3NdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbnR5cGUgQm9keSA9IHtba2V5OiBzdHJpbmddOiBzdHJpbmc7IH07XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQdXRTZXR0aW5ncyBleHRlbmRzIEFwaUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFuYWdlcjogU2V0dGluZ3NNYW5hZ2VyU2VydmljZSkge1xuICAgICAgICBzdXBlcihcIlBVVFwiLCBcIi9zZXR0aW5nc1wiKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgZXhlY3V0ZShhcmdzOiBJQVBJUGFyYW1zPEJvZHk+KSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXJncy5ib2R5O1xuXG4gICAgICAgIGZvckVhY2goWy4uLk9iamVjdC5rZXlzKFNldHRpbmdzKSwgLi4uT2JqZWN0LmtleXMoSW50ZXJuYWxTZXR0aW5ncyldLCAocHVibGljS2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IHByaXZhdGVLZXk6IHN0cmluZyA9IFNldHRpbmdzW3B1YmxpY0tleV07XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShwdWJsaWNLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFuYWdlci5nZXQocHJpdmF0ZUtleSBhcyBBbGxTZXR0aW5ncykgIT09IHNldHRpbmdzW3B1YmxpY0tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnNldChwcml2YXRlS2V5IGFzIEFsbFNldHRpbmdzLCBzZXR0aW5nc1twdWJsaWNLZXldKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU2V0dGluZyAke3ByaXZhdGVLZXl9IGRpZCBub3QgY2hhbmdlLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFNVQ0NFU1M7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSUxvZ2dlciwgSW50ZXJuYWxTZXR0aW5ncywgTG9nZ2VyRmFjdG9yeSwgU2V0dGluZ3NNYW5hZ2VyU2VydmljZSB9IGZyb20gXCJAYXBwL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBjb250YWluZXIgfSBmcm9tIFwidHN5cmluZ2VcIjtcblxuZXhwb3J0IHR5cGUgVW5rb3duUGFyYW1ldGVycyA9IHsgW2s6IHN0cmluZ106IHN0cmluZzsgfTtcblxuLyoqKlxuICogU3VjY2VzcyBmb3IgQVBJcyBub3QgcmV0dXJuaW5nIGEgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBTVUNDRVNTID0gXCJPS1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBUElQYXJhbXM8QiA9IGFueSwgUCA9IFVua293blBhcmFtZXRlcnMsIFEgPSBVbmtvd25QYXJhbWV0ZXJzPiB7XG4gICAgYm9keTogQjtcbiAgICBwYXJhbXM6IFA7XG4gICAgcXVlcnk6IFE7XG59XG5cbnR5cGUgQ2FsbEJhY2sgPSAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpID0+IHZvaWQ7XG50eXBlIE1ldGhvZCA9IFwiR0VUXCIgfCBcIlBPU1RcIiB8IFwiUFVUXCIgfCBcIkRFTEVURVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBUElGdW5jdGlvbjxCID0gYW55LCBQID0gVW5rb3duUGFyYW1ldGVycywgUSA9IFVua293blBhcmFtZXRlcnM+IHtcbiAgICByZWFkb25seSBtZXRob2Q6IE1ldGhvZCB8IE1ldGhvZFtdO1xuICAgIHJlYWRvbmx5IHBhdGg6IHN0cmluZztcbiAgICByZWFkb25seSBwdWJsaWM6IGJvb2xlYW47XG5cbiAgICBmbjogKGFyZ3M6IElBUElQYXJhbXM8QiwgUCwgUT4sIGNhbGxiYWNrOiBDYWxsQmFjaykgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBBUEkgbWV0aG9kcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwaUJhc2U8QiA9IGFueSwgUCA9IFVua293blBhcmFtZXRlcnMsIFEgPSBVbmtvd25QYXJhbWV0ZXJzPiBpbXBsZW1lbnRzIElBUElGdW5jdGlvbjxCLCBQLCBRPiB7XG5cbiAgICBnZXQgbG9nZ2VyKCk6IElMb2dnZXIge1xuICAgICAgICByZXR1cm4gQXBpQmFzZS5sb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc3RhdGljIGluaXRpYWxpemVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCkge1xuICAgICAgICBpZiAoQXBpQmFzZS5pbml0aWFsaXplZCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGNvbnRhaW5lci5yZXNvbHZlPFNldHRpbmdzTWFuYWdlclNlcnZpY2U+KFNldHRpbmdzTWFuYWdlclNlcnZpY2UpO1xuICAgICAgICBzZXR0aW5ncy5vbkNoYW5nZWQuc3Vic2NyaWJlKChfcywgdikgPT4ge1xuICAgICAgICAgICAgaWYgKHYuc2V0dGluZyA9PT0gSW50ZXJuYWxTZXR0aW5ncy5Mb2dBcGkpIHtcbiAgICAgICAgICAgICAgICBBcGlCYXNlLmxvZ0FwaSA9IHYudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFwaUJhc2UubG9nQXBpID0gc2V0dGluZ3MuZ2V0PGJvb2xlYW4+KEludGVybmFsU2V0dGluZ3MuTG9nQXBpLCBmYWxzZSkgPT09IHRydWU7XG4gICAgICAgIEFwaUJhc2UubG9nZ2VyID0gY29udGFpbmVyLnJlc29sdmU8TG9nZ2VyRmFjdG9yeT4oTG9nZ2VyRmFjdG9yeSkuY3JlYXRlTG9nZ2VyKFwiQXBpXCIpO1xuICAgICAgICBBcGlCYXNlLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBsb2dnZXI6IElMb2dnZXI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nQXBpID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHB1YmxpYyBwdWJsaWMgPSAhX19QUk9EVUNUSU9OX187XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWV0aG9kOiBNZXRob2QsIHB1YmxpYyByZWFkb25seSBwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgQXBpQmFzZS5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm9ybWF0aW9uKGBCb3VuZCBlbmRwb2ludCAke21ldGhvZH0gJHtwYXRofWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBmbihhcmdzOiBJQVBJUGFyYW1zPEIsIFAsIFE+LCBjYWxsYmFjazogQ2FsbEJhY2spIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChBcGlCYXNlLmxvZ0FwaSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGAke3RoaXMubWV0aG9kfSAke3RoaXMucGF0aH0gJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYCR7dGhpcy5tZXRob2R9ICR7dGhpcy5wYXRofWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCAodGhpcy5leGVjdXRlKGFyZ3MpKTtcblxuICAgICAgICAgICAgaWYgKEFwaUJhc2UubG9nQXBpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYCR7dGhpcy5tZXRob2R9ICR7dGhpcy5wYXRofWAsXG4gICAgICAgICAgICAgICAgICAgIFwiUmVxdWVzdDpcIiwgSlNPTi5zdHJpbmdpZnkoYXJncyksXG4gICAgICAgICAgICAgICAgICAgIFwiUmVzcG9uc2U6XCIsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlLCBgJHt0aGlzLm1ldGhvZH0gJHt0aGlzLnBhdGh9IGZhaWxlZGAsIGFyZ3MpO1xuICAgICAgICAgICAgY2FsbGJhY2sgKGUsIG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGV4ZWN1dGUoYXJnczogSUFQSVBhcmFtczxCLCBQLCBRPik6IFByb21pc2U8YW55Pjtcbn1cbiIsImltcG9ydCB7IElIZWF0aW5nRGV2aWNlLCBJSGVhdGluZ1pvbmUgfSBmcm9tIFwiQGFwcC9tb2RlbFwiO1xuaW1wb3J0IHsgRGV2aWNlTWFuYWdlclNlcnZpY2UgfSBmcm9tIFwiQGFwcC9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgaW5qZWN0YWJsZSB9IGZyb20gXCJ0c3lyaW5nZVwiO1xuaW1wb3J0IHsgQXBpQmFzZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZXRab25lcyBleHRlbmRzIEFwaUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFuYWdlcjogRGV2aWNlTWFuYWdlclNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoXCJHRVRcIiwgXCIvem9uZXNcIik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGV4ZWN1dGUoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1hcCh0aGlzLm1hbmFnZXIuem9uZXMsXG4gICAgICAgICAgICAoeikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB6LmlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB6Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGljb246IHouaWNvbixcbiAgICAgICAgICAgICAgICB9IGFzIElIZWF0aW5nWm9uZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZXREZXZpY2VzIGV4dGVuZHMgQXBpQmFzZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtYW5hZ2VyOiBEZXZpY2VNYW5hZ2VyU2VydmljZSkge1xuICAgICAgICBzdXBlcihcIkdFVFwiLCBcIi9kZXZpY2VzXCIpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBleGVjdXRlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBtYXAodGhpcy5tYW5hZ2VyLmRldmljZXMsXG4gICAgICAgICAgICAoeikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB6LmlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB6Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGljb246IHouaWNvbk9iaiAmJiB6Lmljb25PYmoudXJsLFxuICAgICAgICAgICAgICAgIH0gYXMgSUhlYXRpbmdEZXZpY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFwcC9oZWxwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFwcC9zZXJ2aWNlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0c3lyaW5nZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbnNwZWN0b3JcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBtdXN0IG5vdCBiZSByZW1vdmVkXG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG4vLyBwb3NpdGlvbiBtdXN0IG5vdCBiZSBjaGFuZ2VkXG5pbXBvcnQgeyBjb250YWluZXIgfSBmcm9tIFwidHN5cmluZ2VcIjtcbmltcG9ydCB7IENvbXBhdGliaWxpdHlXcmFwcGVyIH0gZnJvbSBcIi4vY29tcGF0XCI7XG5pbXBvcnQgeyBEZWJ1Z2dlck9mZiBhcyBEZWJ1Z2dlck9mZkNsYXNzLCBEZWJ1Z2dlck9uIGFzIERlYnVnZ2VyT25DbGFzcyB9IGZyb20gXCIuL2RlYnVnZ2VyXCI7XG5pbXBvcnQgeyBHZXRNb2RlIGFzIEdldE1vZGVDbGFzcywgUHV0TW9kZSBhcyBQdXRNb2RlQ2xhc3MgfSBmcm9tIFwiLi9tb2RlXCI7XG5pbXBvcnQge1xuICAgIERlbGV0ZVBsYW4gYXMgRGVsZXRlUGxhbkNsYXNzLFxuICAgIEdldFBsYW4gYXMgR2V0UGxhbkNsYXNzLFxuICAgIEdldFBsYW5zIGFzIEdldFBsYW5zQ2xhc3MsXG4gICAgR2V0UmVzZXRQbGFucyBhcyBHZXRSZXNldFBsYW5zQ2xhc3MsXG4gICAgUHV0UGxhbiBhcyBQdXRQbGFuQ2xhc3MsXG59IGZyb20gXCIuL3BsYW5zXCI7XG5pbXBvcnQgeyBHZXRTY2hlZHVsZSBhcyBHZXRTY2hlZHVsZUNsYXNzIH0gZnJvbSBcIi4vc2NoZWR1bGVcIjtcbmltcG9ydCB7IEdldFNldHRpbmdzIGFzIEdldFNldHRpbmdzQ2xhc3MsIFB1dFNldHRpbmdzIGFzIFB1dFNldHRpbmdzQ2xhc3MgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuaW1wb3J0IHsgR2V0RGV2aWNlcyBhcyBHZXREZXZpY2VzQ2xhc3MsIEdldFpvbmVzIGFzIEdldFpvbmVzQ2xhc3MgfSBmcm9tIFwiLi91dGlsaXR5XCI7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uc29sZVxuY29uc29sZS5pbmZvKGBCb290c3RyYXBwaW5nIEFQSSB2JHtfX1ZFUlNJT059ICgke19fQlVJTER9KWApO1xuXG5leHBvcnQgY29uc3QgRGVidWdnZXJPbiA9IENvbXBhdGliaWxpdHlXcmFwcGVyKGNvbnRhaW5lci5yZXNvbHZlKERlYnVnZ2VyT25DbGFzcykpO1xuZXhwb3J0IGNvbnN0IERlYnVnZ2VyT2ZmID0gQ29tcGF0aWJpbGl0eVdyYXBwZXIoY29udGFpbmVyLnJlc29sdmUoRGVidWdnZXJPZmZDbGFzcykpO1xuXG5leHBvcnQgY29uc3QgR2V0U2V0dGluZ3MgPSBDb21wYXRpYmlsaXR5V3JhcHBlcihjb250YWluZXIucmVzb2x2ZShHZXRTZXR0aW5nc0NsYXNzKSk7XG5leHBvcnQgY29uc3QgUHV0U2V0dGluZ3MgPSBDb21wYXRpYmlsaXR5V3JhcHBlcihjb250YWluZXIucmVzb2x2ZShQdXRTZXR0aW5nc0NsYXNzKSk7XG5cbmV4cG9ydCBjb25zdCBHZXRNb2RlID0gQ29tcGF0aWJpbGl0eVdyYXBwZXIoY29udGFpbmVyLnJlc29sdmUoR2V0TW9kZUNsYXNzKSk7XG5leHBvcnQgY29uc3QgUHV0TW9kZSA9IENvbXBhdGliaWxpdHlXcmFwcGVyKGNvbnRhaW5lci5yZXNvbHZlKFB1dE1vZGVDbGFzcykpO1xuXG5leHBvcnQgY29uc3QgRGVsZXRlUGxhbiA9IENvbXBhdGliaWxpdHlXcmFwcGVyKGNvbnRhaW5lci5yZXNvbHZlKERlbGV0ZVBsYW5DbGFzcykpO1xuZXhwb3J0IGNvbnN0IEdldFBsYW4gPSBDb21wYXRpYmlsaXR5V3JhcHBlcihjb250YWluZXIucmVzb2x2ZShHZXRQbGFuQ2xhc3MpKTtcbmV4cG9ydCBjb25zdCBQdXRQbGFuID0gQ29tcGF0aWJpbGl0eVdyYXBwZXIoY29udGFpbmVyLnJlc29sdmUoUHV0UGxhbkNsYXNzKSk7XG5leHBvcnQgY29uc3QgR2V0UGxhbnMgPSBDb21wYXRpYmlsaXR5V3JhcHBlcihjb250YWluZXIucmVzb2x2ZShHZXRQbGFuc0NsYXNzKSk7XG5leHBvcnQgY29uc3QgR2V0UmVzZXRQbGFucyA9IENvbXBhdGliaWxpdHlXcmFwcGVyKGNvbnRhaW5lci5yZXNvbHZlKEdldFJlc2V0UGxhbnNDbGFzcykpO1xuXG5leHBvcnQgY29uc3QgR2V0RGV2aWNlcyA9IENvbXBhdGliaWxpdHlXcmFwcGVyKGNvbnRhaW5lci5yZXNvbHZlKEdldERldmljZXNDbGFzcykpO1xuZXhwb3J0IGNvbnN0IEdldFpvbmVzID0gQ29tcGF0aWJpbGl0eVdyYXBwZXIoY29udGFpbmVyLnJlc29sdmUoR2V0Wm9uZXNDbGFzcykpO1xuXG5leHBvcnQgY29uc3QgR2V0U2NoZWR1bGUgPSBDb21wYXRpYmlsaXR5V3JhcHBlcihjb250YWluZXIucmVzb2x2ZShHZXRTY2hlZHVsZUNsYXNzKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=