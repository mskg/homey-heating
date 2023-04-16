/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/drivers/virtual-thermostat/device.ts":
/*!**************************************************!*\
  !*** ./src/drivers/virtual-thermostat/device.ts ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// must not be removed
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
// position must not be changed
const helper_1 = __webpack_require__(/*! @app/helper */ "@app/helper");
const model_1 = __webpack_require__(/*! @app/model */ "@app/model");
const services_1 = __webpack_require__(/*! @app/services */ "@app/services");
const homey_1 = __webpack_require__(/*! homey */ "homey");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const tsyringe_1 = __webpack_require__(/*! tsyringe */ "tsyringe");
class VirtualThermostat extends homey_1.Device {
    constructor() {
        super(...arguments);
        this.plan = undefined;
    }
    onInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, services_1.BootStrapper)(this.homey.app);
            this.id = this.getData().id; // handback from initialization
            const factory = tsyringe_1.container.resolve(services_1.LoggerFactory);
            this.logger = factory.createLogger("Device").createSubLogger( true ? this.getName() : 0);
            this.logger.information(`Init for device ${this.getName()}`);
            // services
            this.repository = tsyringe_1.container.resolve(services_1.HeatingPlanRepositoryService);
            this.manager = tsyringe_1.container.resolve(services_1.HeatingManagerService);
            this.devices = tsyringe_1.container.resolve(services_1.DeviceManagerService);
            this.flow = tsyringe_1.container.resolve("FlowService");
            const settings = tsyringe_1.container.resolve(services_1.SettingsManagerService);
            // Capabilities
            this.tryRegisterCapability(services_1.CapabilityType.TargetTemperature, (0, helper_1.AsyncDebounce)(this.onTargetTemperatureChanged.bind(this), settings.get(services_1.InternalSettings.DriverDebounce, 5 * 1000)));
            this.tryRegisterCapability(services_1.CapabilityType.ThermostatOverride, (0, helper_1.AsyncDebounce)(this.onThermostatModeChanged.bind(this), settings.get(services_1.InternalSettings.DriverDebounce, 5 * 1000)));
            this.repositoryChanged = this.plansChanged.bind(this);
            this.capabilitiesChanged = this.capabilititesChanged.bind(this);
            this.plansApplied = this.scheduleChanged.bind(this);
            // Service hooks
            this.repository.onChanged.subscribe(this.repositoryChanged);
            this.devices.onCapabilityChanged.subscribe(this.capabilitiesChanged);
            this.manager.onPlansApplied.subscribe(this.plansApplied);
            // Update values
            this.plan = yield this.repository.find(this.id);
            yield this.updateCapabilitiesFromPlan();
            yield this.updateTemperature();
        });
    }
    onDeleted() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.repository.onChanged.unsubscribe(this.repositoryChanged);
            this.devices.onCapabilityChanged.unsubscribe(this.capabilitiesChanged);
            this.manager.onPlansApplied.unsubscribe(this.plansApplied);
            this.plan = undefined;
            // @ts-ignore
            delete this.devices;
            // @ts-ignore
            delete this.repository;
            // @ts-ignore
            delete this.manager;
            this.logger.information(`was removed`);
        });
    }
    changeThermostatMode(mode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // conversion forward, backward, ...
            yield this.onThermostatModeChanged(mode.toString(), null);
        });
    }
    /**
     * Plans in the repository changed
     */
    plansChanged(_rep, plans) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(plans.filter((pc) => pc.plan.id === this.id).map((change) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // if the plan was removed => we are null
                this.plan = change.event === services_1.PlanChangeEventType.Removed ? undefined : change.plan;
                this.logger.information(`plan was ${services_1.PlanChangeEventType[change.event]}`);
                // must be processed, we don't care
                yield this.updateCapabilitiesFromPlan();
                yield this.updateTemperature();
            })));
        });
    }
    /**
     * Plan was applied
     */
    scheduleChanged(_scheduler, evt) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // we are removed
            if (this.plan == null) {
                return;
            }
            // not for us
            if (!(0, lodash_1.find)(evt.plans, (p) => p.id === this.id)) {
                return;
            }
            this.logger.debug(`Plans applied - received new schedule`);
            const calculation = (0, lodash_1.filter)(evt.schedule, (f) => f.plan.id === this.id);
            yield this.updateTemperature(calculation);
            if (calculation.length > 0) {
                yield this.doSetCapabilityValue(services_1.CapabilityType.TargetTemperature, this.adjustTemperatureValue(calculation[0].targetTemperature));
            }
        });
    }
    /**
     * A device's capability changed
     */
    capabilititesChanged(_devices, evt) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // we are removed
            if (this.plan == null) {
                return;
            }
            // not interested in other changes
            if (evt.capability !== services_1.CapabilityType.MeasureTemperature) {
                return;
            }
            // device belongs to us, or our zones
            let found = (0, lodash_1.find)(this.plan.devices || [], (id) => id === evt.device.id);
            found = found || (0, lodash_1.find)(this.plan.zones || [], (id) => id === evt.device.zone);
            if (found) {
                this.logger.debug(`${services_1.CapabilityType.MeasureTemperature} changed`);
                yield this.updateTemperature();
            }
        });
    }
    /**
     * Try to register the given capability with the device. If the capability is not available,
     * the error is logged.
     *
     * @param capability The one
     * @param callback The for the capability
     */
    tryRegisterCapability(capability, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(0, lodash_1.find)(this.getCapabilities(), (c) => c === capability)) {
                this.logger.information(`does not have ${capability} - cannot register listener`);
            }
            else {
                this.logger.information(`attached listener for ${capability}`);
                // this.capabilityListeners[capability] = callback;
                yield this.registerCapabilityListener(capability, callback);
            }
        });
    }
    /**
     * Onyl sets the value if the capabilities value is different.
     *
     * @param type The one
     * @param val The value to set/check
     */
    doSetCapabilityValue(type, val) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.getCapabilityValue(type) !== val) {
                this.logger.information(`Set ${type} = ${val}`);
                yield this.setCapabilityValue(type, val);
                return true;
            }
            return false;
        });
    }
    /**
     * Convert the number in target_temperature range.
     * @param num value
     */
    adjustTemperatureValue(num) {
        // two digits from 4 to 35
        return Math.round(Math.min(Math.max(4, num), 35) * 100) / 100;
    }
    /**
     * Update this device's temperature if we are part of the calculation
     * applied.
     *
     * @param calculation If the value is null, the plan is evaluated with the manager
     */
    updateTemperature(calculation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.plan == null) {
                return;
            }
            this.logger.debug(`Updating ${services_1.CapabilityType.MeasureTemperature}`);
            if (calculation == null) {
                calculation = yield this.manager.evaluatePlan(this.plan);
            }
            // nothing to do
            if (calculation.length === 0) {
                return;
            }
            let sum = 0;
            calculation.forEach((v) => {
                sum += v.temperature || 0;
            });
            // we take the target if we don't have readings
            if (sum === 0) {
                sum = this.adjustTemperatureValue(calculation[0].targetTemperature);
            }
            sum = this.adjustTemperatureValue(calculation.length === 0 ? 0 : sum / calculation.length);
            this.logger.debug(`Calculated temperature`, sum);
            yield this.doSetCapabilityValue(services_1.CapabilityType.MeasureTemperature, sum);
        });
    }
    /**
     * Update all capabilities that depend on the plan.
     */
    updateCapabilitiesFromPlan() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Updating ${services_1.CapabilityType.ThermostatOverride} and ${services_1.CapabilityType.TargetTemperature}`);
            if (this.plan == null) {
                this.logger.information(`Plan does not exist -> exit`);
                yield this.setUnavailable(this.homey.__("Device.plan_removed"));
            }
            else {
                this.logger.debug(`available? ${this.getAvailable()}`);
                yield this.unsetWarning();
                yield this.setAvailable();
                // if the plan is disabled, thermostat goes to manual
                let thermostatMode = model_1.NormalOperationMode.Automatic;
                if (!this.plan.enabled) {
                    thermostatMode = model_1.ThermostatMode.FullManual;
                }
                else if (this.plan.thermostatMode != null) {
                    thermostatMode = this.plan.thermostatMode;
                }
                if (yield this.doSetCapabilityValue(services_1.CapabilityType.ThermostatOverride, thermostatMode.toString())) {
                    yield this.flow.thermostatModeChanged.trigger(this, { mode: this.homey.__(`ThermostatMode.${thermostatMode}`) });
                }
                // need to filter out our own overrides
                const dev = (yield this.manager.evaluatePlan(this.plan))
                    .filter((t) => t.thermostatMode === model_1.NormalOperationMode.Automatic);
                if (dev.length > 0) {
                    yield this.doSetCapabilityValue(services_1.CapabilityType.TargetTemperature, this.adjustTemperatureValue(dev[0].targetTemperature));
                }
            }
        });
    }
    /**
     * React to a thermostat mode change.
     *
     * @param value The mode
     * @param opts unused
     */
    onThermostatModeChanged(value, _opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.plan == null) {
                return;
            } // should not happen unavailable
            this.logger.information(`${services_1.CapabilityType.ThermostatOverride} ${value}`);
            const mode = parseInt(value, 10);
            this.plan.thermostatMode = mode;
            yield this.repository.update(this.plan);
            yield this.flow.thermostatModeChanged.trigger(this, { mode: this.homey.__(`ThermostatMode.${value}`) });
        });
    }
    /**
     * A temperature was read
     *
     * @param value The temperature
     * @param opts unsused
     */
    onTargetTemperatureChanged(value, _opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.plan == null) {
                return;
            } // should not happen unavailable
            this.logger.information(`${services_1.CapabilityType.TargetTemperature} ${value}`);
            if (this.plan.thermostatMode !== model_1.ThermostatMode.FullManual) {
                if (this.plan.thermostatMode !== model_1.ThermostatMode.OverrideDay) {
                    this.plan.thermostatMode = model_1.ThermostatMode.OverrideDay;
                    // we're the only ones, that are interested in this change
                    this.repository.update(this.plan, false);
                }
                // ok, will only change if not like that
                if (yield this.doSetCapabilityValue(services_1.CapabilityType.ThermostatOverride, model_1.ThermostatMode.OverrideDay.toString())) {
                    yield this.flow.thermostatModeChanged.trigger(this, { mode: this.homey.__(`ThermostatMode.${model_1.ThermostatMode.OverrideDay}`) });
                }
            }
            const devices = [];
            (this.plan.devices || []).forEach((id) => {
                const dev = this.devices.findDevice(id);
                if (dev != null) {
                    devices.push(dev);
                }
            });
            (this.plan.zones || []).forEach((id) => {
                const dev = this.devices.getDevicesForZone(id);
                if (dev != null) {
                    devices.push(...dev);
                }
            });
            if (devices.length !== 0) {
                // should debounce here
                yield Promise.all(devices.map((d) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.manager.setTemperature(this.plan.name || "", d, value); })));
            }
            else {
                this.logger.debug(`we don't have associated devices`);
            }
        });
    }
}
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "onInit", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "onDeleted", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingPlanRepositoryService, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "plansChanged", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [services_1.HeatingSchedulerService, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "scheduleChanged", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [services_1.DeviceManagerService, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "capabilititesChanged", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "tryRegisterCapability", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "updateCapabilitiesFromPlan", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "onThermostatModeChanged", null);
tslib_1.__decorate([
    (0, services_1.trycatchlog)(true),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VirtualThermostat.prototype, "onTargetTemperatureChanged", null);
module.exports = VirtualThermostat;


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

/***/ "@app/model":
/*!*****************************!*\
  !*** external "@app/model" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("@app/model");

/***/ }),

/***/ "@app/services":
/*!********************************!*\
  !*** external "@app/services" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@app/services");

/***/ }),

/***/ "homey":
/*!************************!*\
  !*** external "homey" ***!
  \************************/
/***/ ((module) => {

module.exports = require("homey");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/drivers/virtual-thermostat/device.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dGluZy8uL3NyYy9kcml2ZXJzL3ZpcnR1YWwtdGhlcm1vc3RhdC9kZXZpY2UudHMiLCJ3ZWJwYWNrOi8vaG9tZXktaGVhdGluZy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vaG9tZXktaGVhdGluZy9leHRlcm5hbCBjb21tb25qczIgXCJAYXBwL2hlbHBlclwiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwiQGFwcC9tb2RlbFwiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwiQGFwcC9zZXJ2aWNlc1wiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwiaG9tZXlcIiIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL2V4dGVybmFsIGNvbW1vbmpzMiBcImxvZGFzaFwiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwicmVmbGVjdC1tZXRhZGF0YVwiIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvZXh0ZXJuYWwgY29tbW9uanMyIFwidHN5cmluZ2VcIiIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ob21leS1oZWF0aW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaG9tZXktaGVhdGluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2hvbWV5LWhlYXRpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIG11c3Qgbm90IGJlIHJlbW92ZWRcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbi8vIHBvc2l0aW9uIG11c3Qgbm90IGJlIGNoYW5nZWRcblxuaW1wb3J0IHsgQXN5bmNEZWJvdW5jZSB9IGZyb20gXCJAYXBwL2hlbHBlclwiO1xuaW1wb3J0IHsgSUNhbGN1bGF0ZWRUZW1wZXJhdHVyZSwgSUhlYXRpbmdQbGFuLCBOb3JtYWxPcGVyYXRpb25Nb2RlLCBUaGVybW9zdGF0TW9kZSB9IGZyb20gXCJAYXBwL21vZGVsXCI7XG5pbXBvcnQge1xuICAgIEF1ZGl0ZWREZXZpY2UsIEJvb3RTdHJhcHBlciwgQ2FwYWJpbGl0eUNoYW5nZWRFdmVudEFyZ3MsIENhcGFiaWxpdHlUeXBlLCBEZXZpY2VNYW5hZ2VyU2VydmljZSxcbiAgICBGbG93U2VydmljZSwgSGVhdGluZ01hbmFnZXJTZXJ2aWNlLCBIZWF0aW5nUGxhblJlcG9zaXRvcnlTZXJ2aWNlLFxuICAgIEhlYXRpbmdTY2hlZHVsZXJTZXJ2aWNlLCBJTG9nZ2VyLCBJbnRlcm5hbFNldHRpbmdzLCBMb2dnZXJGYWN0b3J5LCBQbGFuQ2hhbmdlRXZlbnRUeXBlLFxuICAgIFBsYW5zQXBwbGllZEV2ZW50QXJncywgUGxhbnNDaGFuZ2VkRXZlbnRBcmdzLCBTZXR0aW5nc01hbmFnZXJTZXJ2aWNlLCB0cnljYXRjaGxvZyxcbn0gZnJvbSBcIkBhcHAvc2VydmljZXNcIjtcbmltcG9ydCB7IERldmljZSB9IGZyb20gXCJob21leVwiO1xuaW1wb3J0IHsgZmlsdGVyLCBmaW5kIH0gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgSUV2ZW50SGFuZGxlciB9IGZyb20gXCJzdGUtZXZlbnRzXCI7XG5pbXBvcnQgeyBjb250YWluZXIgfSBmcm9tIFwidHN5cmluZ2VcIjtcbmltcG9ydCB7IElWaXJ0dWFsVGhlcm1vc3RhdCB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG50eXBlIERhdGEgPSB7XG4gICAgaWQ6IHN0cmluZztcbn07XG5cbmNsYXNzIFZpcnR1YWxUaGVybW9zdGF0IGV4dGVuZHMgRGV2aWNlIGltcGxlbWVudHMgSVZpcnR1YWxUaGVybW9zdGF0IHtcbiAgICBwcml2YXRlIGRldmljZXMhOiBEZXZpY2VNYW5hZ2VyU2VydmljZTtcbiAgICBwcml2YXRlIHJlcG9zaXRvcnkhOiBIZWF0aW5nUGxhblJlcG9zaXRvcnlTZXJ2aWNlO1xuICAgIHByaXZhdGUgbWFuYWdlciE6IEhlYXRpbmdNYW5hZ2VyU2VydmljZTtcblxuICAgIHByaXZhdGUgZmxvdyE6IEZsb3dTZXJ2aWNlO1xuICAgIHByaXZhdGUgbG9nZ2VyITogSUxvZ2dlcjtcbiAgICBwcml2YXRlIGlkITogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBwbGFuOiBJSGVhdGluZ1BsYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgICBwcml2YXRlIHJlcG9zaXRvcnlDaGFuZ2VkITogSUV2ZW50SGFuZGxlcjxIZWF0aW5nUGxhblJlcG9zaXRvcnlTZXJ2aWNlLCBQbGFuc0NoYW5nZWRFdmVudEFyZ3M+O1xuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzQ2hhbmdlZCE6IElFdmVudEhhbmRsZXI8RGV2aWNlTWFuYWdlclNlcnZpY2UsIENhcGFiaWxpdHlDaGFuZ2VkRXZlbnRBcmdzPjtcbiAgICBwcml2YXRlIHBsYW5zQXBwbGllZCE6IElFdmVudEhhbmRsZXI8SGVhdGluZ01hbmFnZXJTZXJ2aWNlLCBQbGFuc0FwcGxpZWRFdmVudEFyZ3M+O1xuXG4gICAgQHRyeWNhdGNobG9nKHRydWUpXG4gICAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHtcbiAgICAgICAgYXdhaXQgQm9vdFN0cmFwcGVyKHRoaXMuaG9tZXkuYXBwKTtcbiAgICAgICAgdGhpcy5pZCA9ICh0aGlzLmdldERhdGEoKSBhcyBEYXRhKS5pZDsgLy8gaGFuZGJhY2sgZnJvbSBpbml0aWFsaXphdGlvblxuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBjb250YWluZXIucmVzb2x2ZTxMb2dnZXJGYWN0b3J5PihMb2dnZXJGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBmYWN0b3J5LmNyZWF0ZUxvZ2dlcihcIkRldmljZVwiKS5jcmVhdGVTdWJMb2dnZXIoIV9fUFJPRFVDVElPTl9fID8gdGhpcy5nZXROYW1lKCkgOiB0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mb3JtYXRpb24oYEluaXQgZm9yIGRldmljZSAke3RoaXMuZ2V0TmFtZSgpfWApO1xuXG4gICAgICAgIC8vIHNlcnZpY2VzXG4gICAgICAgIHRoaXMucmVwb3NpdG9yeSA9IGNvbnRhaW5lci5yZXNvbHZlPEhlYXRpbmdQbGFuUmVwb3NpdG9yeVNlcnZpY2U+KEhlYXRpbmdQbGFuUmVwb3NpdG9yeVNlcnZpY2UpO1xuICAgICAgICB0aGlzLm1hbmFnZXIgPSBjb250YWluZXIucmVzb2x2ZTxIZWF0aW5nTWFuYWdlclNlcnZpY2U+KEhlYXRpbmdNYW5hZ2VyU2VydmljZSk7XG4gICAgICAgIHRoaXMuZGV2aWNlcyA9IGNvbnRhaW5lci5yZXNvbHZlPERldmljZU1hbmFnZXJTZXJ2aWNlPihEZXZpY2VNYW5hZ2VyU2VydmljZSk7XG4gICAgICAgIHRoaXMuZmxvdyA9IGNvbnRhaW5lci5yZXNvbHZlPEZsb3dTZXJ2aWNlPihcIkZsb3dTZXJ2aWNlXCIpO1xuXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gY29udGFpbmVyLnJlc29sdmU8U2V0dGluZ3NNYW5hZ2VyU2VydmljZT4oU2V0dGluZ3NNYW5hZ2VyU2VydmljZSk7XG5cbiAgICAgICAgLy8gQ2FwYWJpbGl0aWVzXG4gICAgICAgIHRoaXMudHJ5UmVnaXN0ZXJDYXBhYmlsaXR5KENhcGFiaWxpdHlUeXBlLlRhcmdldFRlbXBlcmF0dXJlLFxuICAgICAgICAgICAgQXN5bmNEZWJvdW5jZSh0aGlzLm9uVGFyZ2V0VGVtcGVyYXR1cmVDaGFuZ2VkLmJpbmQodGhpcyksIHNldHRpbmdzLmdldDxudW1iZXI+KEludGVybmFsU2V0dGluZ3MuRHJpdmVyRGVib3VuY2UsIDUgKiAxMDAwKSkpO1xuXG4gICAgICAgIHRoaXMudHJ5UmVnaXN0ZXJDYXBhYmlsaXR5KENhcGFiaWxpdHlUeXBlLlRoZXJtb3N0YXRPdmVycmlkZSxcbiAgICAgICAgICAgIEFzeW5jRGVib3VuY2UodGhpcy5vblRoZXJtb3N0YXRNb2RlQ2hhbmdlZC5iaW5kKHRoaXMpLCBzZXR0aW5ncy5nZXQ8bnVtYmVyPihJbnRlcm5hbFNldHRpbmdzLkRyaXZlckRlYm91bmNlLCA1ICogMTAwMCkpKTtcblxuICAgICAgICB0aGlzLnJlcG9zaXRvcnlDaGFuZ2VkID0gdGhpcy5wbGFuc0NoYW5nZWQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jYXBhYmlsaXRpZXNDaGFuZ2VkID0gdGhpcy5jYXBhYmlsaXRpdGVzQ2hhbmdlZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYW5zQXBwbGllZCA9IHRoaXMuc2NoZWR1bGVDaGFuZ2VkLmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gU2VydmljZSBob29rc1xuICAgICAgICB0aGlzLnJlcG9zaXRvcnkub25DaGFuZ2VkLnN1YnNjcmliZSh0aGlzLnJlcG9zaXRvcnlDaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5kZXZpY2VzLm9uQ2FwYWJpbGl0eUNoYW5nZWQuc3Vic2NyaWJlKHRoaXMuY2FwYWJpbGl0aWVzQ2hhbmdlZCk7XG4gICAgICAgIHRoaXMubWFuYWdlci5vblBsYW5zQXBwbGllZC5zdWJzY3JpYmUodGhpcy5wbGFuc0FwcGxpZWQpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB2YWx1ZXNcbiAgICAgICAgdGhpcy5wbGFuID0gYXdhaXQgdGhpcy5yZXBvc2l0b3J5LmZpbmQodGhpcy5pZCk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ2FwYWJpbGl0aWVzRnJvbVBsYW4oKTtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVUZW1wZXJhdHVyZSgpO1xuICAgIH1cblxuICAgIEB0cnljYXRjaGxvZyh0cnVlKVxuICAgIHB1YmxpYyBhc3luYyBvbkRlbGV0ZWQoKSB7XG4gICAgICAgIHRoaXMucmVwb3NpdG9yeS5vbkNoYW5nZWQudW5zdWJzY3JpYmUodGhpcy5yZXBvc2l0b3J5Q2hhbmdlZCk7XG4gICAgICAgIHRoaXMuZGV2aWNlcy5vbkNhcGFiaWxpdHlDaGFuZ2VkLnVuc3Vic2NyaWJlKHRoaXMuY2FwYWJpbGl0aWVzQ2hhbmdlZCk7XG4gICAgICAgIHRoaXMubWFuYWdlci5vblBsYW5zQXBwbGllZC51bnN1YnNjcmliZSh0aGlzLnBsYW5zQXBwbGllZCk7XG5cbiAgICAgICAgdGhpcy5wbGFuID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVsZXRlIHRoaXMuZGV2aWNlcztcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkZWxldGUgdGhpcy5yZXBvc2l0b3J5O1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1hbmFnZXI7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mb3JtYXRpb24oYHdhcyByZW1vdmVkYCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNoYW5nZVRoZXJtb3N0YXRNb2RlKG1vZGU6IFRoZXJtb3N0YXRNb2RlIHwgTm9ybWFsT3BlcmF0aW9uTW9kZSkge1xuICAgICAgICAvLyBjb252ZXJzaW9uIGZvcndhcmQsIGJhY2t3YXJkLCAuLi5cbiAgICAgICAgYXdhaXQgdGhpcy5vblRoZXJtb3N0YXRNb2RlQ2hhbmdlZChtb2RlLnRvU3RyaW5nKCksIG51bGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYW5zIGluIHRoZSByZXBvc2l0b3J5IGNoYW5nZWRcbiAgICAgKi9cbiAgICBAdHJ5Y2F0Y2hsb2codHJ1ZSlcbiAgICBwcml2YXRlIGFzeW5jIHBsYW5zQ2hhbmdlZChfcmVwOiBIZWF0aW5nUGxhblJlcG9zaXRvcnlTZXJ2aWNlLCBwbGFuczogUGxhbnNDaGFuZ2VkRXZlbnRBcmdzKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHBsYW5zLmZpbHRlcigocGMpID0+IHBjLnBsYW4uaWQgPT09IHRoaXMuaWQpLm1hcChhc3luYyAoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgcGxhbiB3YXMgcmVtb3ZlZCA9PiB3ZSBhcmUgbnVsbFxuICAgICAgICAgICAgdGhpcy5wbGFuID0gY2hhbmdlLmV2ZW50ID09PSBQbGFuQ2hhbmdlRXZlbnRUeXBlLlJlbW92ZWQgPyB1bmRlZmluZWQgOiBjaGFuZ2UucGxhbjtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm9ybWF0aW9uKGBwbGFuIHdhcyAke1BsYW5DaGFuZ2VFdmVudFR5cGVbY2hhbmdlLmV2ZW50XX1gKTtcblxuICAgICAgICAgICAgLy8gbXVzdCBiZSBwcm9jZXNzZWQsIHdlIGRvbid0IGNhcmVcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ2FwYWJpbGl0aWVzRnJvbVBsYW4oKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlVGVtcGVyYXR1cmUoKTtcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYW4gd2FzIGFwcGxpZWRcbiAgICAgKi9cbiAgICBAdHJ5Y2F0Y2hsb2codHJ1ZSlcbiAgICBwcml2YXRlIGFzeW5jIHNjaGVkdWxlQ2hhbmdlZChfc2NoZWR1bGVyOiBIZWF0aW5nU2NoZWR1bGVyU2VydmljZSwgZXZ0OiBQbGFuc0FwcGxpZWRFdmVudEFyZ3MpIHtcbiAgICAgICAgLy8gd2UgYXJlIHJlbW92ZWRcbiAgICAgICAgaWYgKHRoaXMucGxhbiA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIG5vdCBmb3IgdXNcbiAgICAgICAgaWYgKCFmaW5kKGV2dC5wbGFucywgKHApID0+IHAuaWQgPT09IHRoaXMuaWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgUGxhbnMgYXBwbGllZCAtIHJlY2VpdmVkIG5ldyBzY2hlZHVsZWApO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGlvbiA9IGZpbHRlcihldnQuc2NoZWR1bGUsIChmKSA9PiBmLnBsYW4uaWQgPT09IHRoaXMuaWQpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZVRlbXBlcmF0dXJlKGNhbGN1bGF0aW9uKTtcblxuICAgICAgICBpZiAoY2FsY3VsYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5kb1NldENhcGFiaWxpdHlWYWx1ZShDYXBhYmlsaXR5VHlwZS5UYXJnZXRUZW1wZXJhdHVyZSxcbiAgICAgICAgICAgICAgICB0aGlzLmFkanVzdFRlbXBlcmF0dXJlVmFsdWUoY2FsY3VsYXRpb25bMF0udGFyZ2V0VGVtcGVyYXR1cmUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZGV2aWNlJ3MgY2FwYWJpbGl0eSBjaGFuZ2VkXG4gICAgICovXG4gICAgQHRyeWNhdGNobG9nKHRydWUpXG4gICAgcHJpdmF0ZSBhc3luYyBjYXBhYmlsaXRpdGVzQ2hhbmdlZChfZGV2aWNlczogRGV2aWNlTWFuYWdlclNlcnZpY2UsIGV2dDogQ2FwYWJpbGl0eUNoYW5nZWRFdmVudEFyZ3MpIHtcbiAgICAgICAgLy8gd2UgYXJlIHJlbW92ZWRcbiAgICAgICAgaWYgKHRoaXMucGxhbiA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIG5vdCBpbnRlcmVzdGVkIGluIG90aGVyIGNoYW5nZXNcbiAgICAgICAgaWYgKGV2dC5jYXBhYmlsaXR5ICE9PSBDYXBhYmlsaXR5VHlwZS5NZWFzdXJlVGVtcGVyYXR1cmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRldmljZSBiZWxvbmdzIHRvIHVzLCBvciBvdXIgem9uZXNcbiAgICAgICAgbGV0IGZvdW5kID0gZmluZCh0aGlzLnBsYW4uZGV2aWNlcyB8fCBbXSwgKGlkKSA9PiBpZCA9PT0gZXZ0LmRldmljZS5pZCk7XG4gICAgICAgIGZvdW5kID0gZm91bmQgfHwgZmluZCh0aGlzLnBsYW4uem9uZXMgfHwgW10sIChpZCkgPT4gaWQgPT09IGV2dC5kZXZpY2Uuem9uZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgJHtDYXBhYmlsaXR5VHlwZS5NZWFzdXJlVGVtcGVyYXR1cmV9IGNoYW5nZWRgKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlVGVtcGVyYXR1cmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyeSB0byByZWdpc3RlciB0aGUgZ2l2ZW4gY2FwYWJpbGl0eSB3aXRoIHRoZSBkZXZpY2UuIElmIHRoZSBjYXBhYmlsaXR5IGlzIG5vdCBhdmFpbGFibGUsXG4gICAgICogdGhlIGVycm9yIGlzIGxvZ2dlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYXBhYmlsaXR5IFRoZSBvbmVcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGZvciB0aGUgY2FwYWJpbGl0eVxuICAgICAqL1xuICAgIEB0cnljYXRjaGxvZyh0cnVlKVxuICAgIHByaXZhdGUgYXN5bmMgdHJ5UmVnaXN0ZXJDYXBhYmlsaXR5KGNhcGFiaWxpdHk6IENhcGFiaWxpdHlUeXBlLCBjYWxsYmFjazogKHZhbDogYW55LCBvcHRzOiBDYWxsYWJsZUZ1bmN0aW9uKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgICAgIGlmICghZmluZCh0aGlzLmdldENhcGFiaWxpdGllcygpLCAoYykgPT4gYyA9PT0gY2FwYWJpbGl0eSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm9ybWF0aW9uKGBkb2VzIG5vdCBoYXZlICR7Y2FwYWJpbGl0eX0gLSBjYW5ub3QgcmVnaXN0ZXIgbGlzdGVuZXJgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm9ybWF0aW9uKGBhdHRhY2hlZCBsaXN0ZW5lciBmb3IgJHtjYXBhYmlsaXR5fWApO1xuXG4gICAgICAgICAgICAvLyB0aGlzLmNhcGFiaWxpdHlMaXN0ZW5lcnNbY2FwYWJpbGl0eV0gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVnaXN0ZXJDYXBhYmlsaXR5TGlzdGVuZXIoY2FwYWJpbGl0eSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT255bCBzZXRzIHRoZSB2YWx1ZSBpZiB0aGUgY2FwYWJpbGl0aWVzIHZhbHVlIGlzIGRpZmZlcmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlIFRoZSBvbmVcbiAgICAgKiBAcGFyYW0gdmFsIFRoZSB2YWx1ZSB0byBzZXQvY2hlY2tcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGRvU2V0Q2FwYWJpbGl0eVZhbHVlPFQgZXh0ZW5kcyBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuPih0eXBlOiBDYXBhYmlsaXR5VHlwZSwgdmFsOiBUKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICh0aGlzLmdldENhcGFiaWxpdHlWYWx1ZSh0eXBlKSAhPT0gdmFsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvcm1hdGlvbihgU2V0ICR7dHlwZX0gPSAke3ZhbH1gKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0Q2FwYWJpbGl0eVZhbHVlKHR5cGUsIHZhbCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgdGhlIG51bWJlciBpbiB0YXJnZXRfdGVtcGVyYXR1cmUgcmFuZ2UuXG4gICAgICogQHBhcmFtIG51bSB2YWx1ZVxuICAgICAqL1xuICAgIHByaXZhdGUgYWRqdXN0VGVtcGVyYXR1cmVWYWx1ZShudW06IG51bWJlcikge1xuICAgICAgICAvLyB0d28gZGlnaXRzIGZyb20gNCB0byAzNVxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCg0LCBudW0pLCAzNSkgKiAxMDApIC8gMTAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGlzIGRldmljZSdzIHRlbXBlcmF0dXJlIGlmIHdlIGFyZSBwYXJ0IG9mIHRoZSBjYWxjdWxhdGlvblxuICAgICAqIGFwcGxpZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2FsY3VsYXRpb24gSWYgdGhlIHZhbHVlIGlzIG51bGwsIHRoZSBwbGFuIGlzIGV2YWx1YXRlZCB3aXRoIHRoZSBtYW5hZ2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVUZW1wZXJhdHVyZShjYWxjdWxhdGlvbj86IElDYWxjdWxhdGVkVGVtcGVyYXR1cmVbXSkge1xuICAgICAgICBpZiAodGhpcy5wbGFuID09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFVwZGF0aW5nICR7Q2FwYWJpbGl0eVR5cGUuTWVhc3VyZVRlbXBlcmF0dXJlfWApO1xuICAgICAgICBpZiAoY2FsY3VsYXRpb24gPT0gbnVsbCkgeyBjYWxjdWxhdGlvbiA9IGF3YWl0IHRoaXMubWFuYWdlci5ldmFsdWF0ZVBsYW4odGhpcy5wbGFuKTsgfVxuXG4gICAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgaWYgKGNhbGN1bGF0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN1bTogbnVtYmVyID0gMDtcbiAgICAgICAgY2FsY3VsYXRpb24uZm9yRWFjaCgodikgPT4ge1xuICAgICAgICAgICAgc3VtICs9IHYudGVtcGVyYXR1cmUgfHwgMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gd2UgdGFrZSB0aGUgdGFyZ2V0IGlmIHdlIGRvbid0IGhhdmUgcmVhZGluZ3NcbiAgICAgICAgaWYgKHN1bSA9PT0gMCkgeyBzdW0gPSB0aGlzLmFkanVzdFRlbXBlcmF0dXJlVmFsdWUoY2FsY3VsYXRpb25bMF0udGFyZ2V0VGVtcGVyYXR1cmUpOyB9XG5cbiAgICAgICAgc3VtID0gdGhpcy5hZGp1c3RUZW1wZXJhdHVyZVZhbHVlKGNhbGN1bGF0aW9uLmxlbmd0aCA9PT0gMCA/IDAgOiBzdW0gLyBjYWxjdWxhdGlvbi5sZW5ndGgpO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgQ2FsY3VsYXRlZCB0ZW1wZXJhdHVyZWAsIHN1bSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5kb1NldENhcGFiaWxpdHlWYWx1ZShDYXBhYmlsaXR5VHlwZS5NZWFzdXJlVGVtcGVyYXR1cmUsIHN1bSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFsbCBjYXBhYmlsaXRpZXMgdGhhdCBkZXBlbmQgb24gdGhlIHBsYW4uXG4gICAgICovXG4gICAgQHRyeWNhdGNobG9nKHRydWUpXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDYXBhYmlsaXRpZXNGcm9tUGxhbigpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFVwZGF0aW5nICR7Q2FwYWJpbGl0eVR5cGUuVGhlcm1vc3RhdE92ZXJyaWRlfSBhbmQgJHtDYXBhYmlsaXR5VHlwZS5UYXJnZXRUZW1wZXJhdHVyZX1gKTtcblxuICAgICAgICBpZiAodGhpcy5wbGFuID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm9ybWF0aW9uKGBQbGFuIGRvZXMgbm90IGV4aXN0IC0+IGV4aXRgKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0VW5hdmFpbGFibGUodGhpcy5ob21leS5fXyhcIkRldmljZS5wbGFuX3JlbW92ZWRcIikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYGF2YWlsYWJsZT8gJHt0aGlzLmdldEF2YWlsYWJsZSgpfWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy51bnNldFdhcm5pbmcoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0QXZhaWxhYmxlKCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBwbGFuIGlzIGRpc2FibGVkLCB0aGVybW9zdGF0IGdvZXMgdG8gbWFudWFsXG4gICAgICAgICAgICBsZXQgdGhlcm1vc3RhdE1vZGU6IChUaGVybW9zdGF0TW9kZSB8IE5vcm1hbE9wZXJhdGlvbk1vZGUpID0gTm9ybWFsT3BlcmF0aW9uTW9kZS5BdXRvbWF0aWM7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGxhbi5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhlcm1vc3RhdE1vZGUgPSBUaGVybW9zdGF0TW9kZS5GdWxsTWFudWFsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBsYW4udGhlcm1vc3RhdE1vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoZXJtb3N0YXRNb2RlID0gdGhpcy5wbGFuLnRoZXJtb3N0YXRNb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy5kb1NldENhcGFiaWxpdHlWYWx1ZShDYXBhYmlsaXR5VHlwZS5UaGVybW9zdGF0T3ZlcnJpZGUsIHRoZXJtb3N0YXRNb2RlLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5mbG93LnRoZXJtb3N0YXRNb2RlQ2hhbmdlZC50cmlnZ2VyKHRoaXMsIHttb2RlOiB0aGlzLmhvbWV5Ll9fKGBUaGVybW9zdGF0TW9kZS4ke3RoZXJtb3N0YXRNb2RlfWApfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG5lZWQgdG8gZmlsdGVyIG91dCBvdXIgb3duIG92ZXJyaWRlc1xuICAgICAgICAgICAgY29uc3QgZGV2ID0gKGF3YWl0IHRoaXMubWFuYWdlci5ldmFsdWF0ZVBsYW4odGhpcy5wbGFuKSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCh0KSA9PiB0LnRoZXJtb3N0YXRNb2RlID09PSBOb3JtYWxPcGVyYXRpb25Nb2RlLkF1dG9tYXRpYyk7XG5cbiAgICAgICAgICAgIGlmIChkZXYubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZG9TZXRDYXBhYmlsaXR5VmFsdWUoQ2FwYWJpbGl0eVR5cGUuVGFyZ2V0VGVtcGVyYXR1cmUsIHRoaXMuYWRqdXN0VGVtcGVyYXR1cmVWYWx1ZShkZXZbMF0udGFyZ2V0VGVtcGVyYXR1cmUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWN0IHRvIGEgdGhlcm1vc3RhdCBtb2RlIGNoYW5nZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgbW9kZVxuICAgICAqIEBwYXJhbSBvcHRzIHVudXNlZFxuICAgICAqL1xuICAgIEB0cnljYXRjaGxvZyh0cnVlKVxuICAgIHByaXZhdGUgYXN5bmMgb25UaGVybW9zdGF0TW9kZUNoYW5nZWQodmFsdWU6IHN0cmluZywgX29wdHM6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5wbGFuID09IG51bGwpIHsgcmV0dXJuOyB9IC8vIHNob3VsZCBub3QgaGFwcGVuIHVuYXZhaWxhYmxlXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm9ybWF0aW9uKGAke0NhcGFiaWxpdHlUeXBlLlRoZXJtb3N0YXRPdmVycmlkZX0gJHt2YWx1ZX1gKTtcblxuICAgICAgICBjb25zdCBtb2RlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgdGhpcy5wbGFuLnRoZXJtb3N0YXRNb2RlID0gbW9kZTtcblxuICAgICAgICBhd2FpdCB0aGlzLnJlcG9zaXRvcnkudXBkYXRlKHRoaXMucGxhbik7XG4gICAgICAgIGF3YWl0IHRoaXMuZmxvdy50aGVybW9zdGF0TW9kZUNoYW5nZWQudHJpZ2dlcih0aGlzLCB7bW9kZTogdGhpcy5ob21leS5fXyhgVGhlcm1vc3RhdE1vZGUuJHt2YWx1ZX1gKX0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgdGVtcGVyYXR1cmUgd2FzIHJlYWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdGVtcGVyYXR1cmVcbiAgICAgKiBAcGFyYW0gb3B0cyB1bnN1c2VkXG4gICAgICovXG4gICAgQHRyeWNhdGNobG9nKHRydWUpXG4gICAgcHJpdmF0ZSBhc3luYyBvblRhcmdldFRlbXBlcmF0dXJlQ2hhbmdlZCh2YWx1ZTogbnVtYmVyLCBfb3B0czogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnBsYW4gPT0gbnVsbCkgeyByZXR1cm47IH0gLy8gc2hvdWxkIG5vdCBoYXBwZW4gdW5hdmFpbGFibGVcblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvcm1hdGlvbihgJHtDYXBhYmlsaXR5VHlwZS5UYXJnZXRUZW1wZXJhdHVyZX0gJHt2YWx1ZX1gKTtcblxuICAgICAgICBpZiAodGhpcy5wbGFuLnRoZXJtb3N0YXRNb2RlICE9PSBUaGVybW9zdGF0TW9kZS5GdWxsTWFudWFsKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBsYW4udGhlcm1vc3RhdE1vZGUgIT09IFRoZXJtb3N0YXRNb2RlLk92ZXJyaWRlRGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFuLnRoZXJtb3N0YXRNb2RlID0gVGhlcm1vc3RhdE1vZGUuT3ZlcnJpZGVEYXk7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSdyZSB0aGUgb25seSBvbmVzLCB0aGF0IGFyZSBpbnRlcmVzdGVkIGluIHRoaXMgY2hhbmdlXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvc2l0b3J5LnVwZGF0ZSh0aGlzLnBsYW4sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb2ssIHdpbGwgb25seSBjaGFuZ2UgaWYgbm90IGxpa2UgdGhhdFxuICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuZG9TZXRDYXBhYmlsaXR5VmFsdWUoQ2FwYWJpbGl0eVR5cGUuVGhlcm1vc3RhdE92ZXJyaWRlLCBUaGVybW9zdGF0TW9kZS5PdmVycmlkZURheS50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuZmxvdy50aGVybW9zdGF0TW9kZUNoYW5nZWQudHJpZ2dlcih0aGlzLCB7bW9kZTogdGhpcy5ob21leS5fXyhgVGhlcm1vc3RhdE1vZGUuJHtUaGVybW9zdGF0TW9kZS5PdmVycmlkZURheX1gKX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGV2aWNlczogQXVkaXRlZERldmljZVtdID0gW107XG4gICAgICAgICh0aGlzLnBsYW4uZGV2aWNlcyB8fCBbXSkuZm9yRWFjaCgoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldiA9IHRoaXMuZGV2aWNlcy5maW5kRGV2aWNlKGlkKTtcbiAgICAgICAgICAgIGlmIChkZXYgIT0gbnVsbCkgeyBkZXZpY2VzLnB1c2goZGV2KTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICAodGhpcy5wbGFuLnpvbmVzIHx8IFtdKS5mb3JFYWNoKChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGV2ID0gdGhpcy5kZXZpY2VzLmdldERldmljZXNGb3Jab25lKGlkKTtcbiAgICAgICAgICAgIGlmIChkZXYgIT0gbnVsbCkgeyBkZXZpY2VzLnB1c2goLi4uZGV2KTsgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGV2aWNlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIC8vIHNob3VsZCBkZWJvdW5jZSBoZXJlXG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChkZXZpY2VzLm1hcChhc3luYyAoZCkgPT5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm1hbmFnZXIuc2V0VGVtcGVyYXR1cmUodGhpcy5wbGFuIS5uYW1lIHx8IFwiXCIsIGQsIHZhbHVlKSksXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYHdlIGRvbid0IGhhdmUgYXNzb2NpYXRlZCBkZXZpY2VzYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlydHVhbFRoZXJtb3N0YXQ7XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jcmVhdGVCaW5kaW5nKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYXBwL2hlbHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYXBwL21vZGVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhcHAvc2VydmljZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaG9tZXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHN5cmluZ2VcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9kcml2ZXJzL3ZpcnR1YWwtdGhlcm1vc3RhdC9kZXZpY2UudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=