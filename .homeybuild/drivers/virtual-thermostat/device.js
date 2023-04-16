/*! For license information please see device.js.LICENSE.txt */
(()=>{"use strict";var e={1931:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=r(655);r(5733);const i=r(8192),n=r(4543),o=r(5390),s=r(4559),l=r(4793),d=r(1789);class u extends s.Device{constructor(){super(...arguments),this.plan=void 0}onInit(){return a.__awaiter(this,void 0,void 0,(function*(){yield(0,o.BootStrapper)(this.homey.app),this.id=this.getData().id;const e=d.container.resolve(o.LoggerFactory);this.logger=e.createLogger("Device").createSubLogger(this.id),this.logger.information(`Init for device ${this.getName()}`),this.repository=d.container.resolve(o.HeatingPlanRepositoryService),this.manager=d.container.resolve(o.HeatingManagerService),this.devices=d.container.resolve(o.DeviceManagerService),this.flow=d.container.resolve("FlowService");const t=d.container.resolve(o.SettingsManagerService);this.tryRegisterCapability(o.CapabilityType.TargetTemperature,(0,i.AsyncDebounce)(this.onTargetTemperatureChanged.bind(this),t.get(o.InternalSettings.DriverDebounce,5e3))),this.tryRegisterCapability(o.CapabilityType.ThermostatOverride,(0,i.AsyncDebounce)(this.onThermostatModeChanged.bind(this),t.get(o.InternalSettings.DriverDebounce,5e3))),this.repositoryChanged=this.plansChanged.bind(this),this.capabilitiesChanged=this.capabilititesChanged.bind(this),this.plansApplied=this.scheduleChanged.bind(this),this.repository.onChanged.subscribe(this.repositoryChanged),this.devices.onCapabilityChanged.subscribe(this.capabilitiesChanged),this.manager.onPlansApplied.subscribe(this.plansApplied),this.plan=yield this.repository.find(this.id),yield this.updateCapabilitiesFromPlan(),yield this.updateTemperature()}))}onDeleted(){return a.__awaiter(this,void 0,void 0,(function*(){this.repository.onChanged.unsubscribe(this.repositoryChanged),this.devices.onCapabilityChanged.unsubscribe(this.capabilitiesChanged),this.manager.onPlansApplied.unsubscribe(this.plansApplied),this.plan=void 0,delete this.devices,delete this.repository,delete this.manager,this.logger.information("was removed")}))}changeThermostatMode(e){return a.__awaiter(this,void 0,void 0,(function*(){yield this.onThermostatModeChanged(e.toString(),null)}))}plansChanged(e,t){return a.__awaiter(this,void 0,void 0,(function*(){yield Promise.all(t.filter((e=>e.plan.id===this.id)).map((e=>a.__awaiter(this,void 0,void 0,(function*(){this.plan=e.event===o.PlanChangeEventType.Removed?void 0:e.plan,this.logger.information(`plan was ${o.PlanChangeEventType[e.event]}`),yield this.updateCapabilitiesFromPlan(),yield this.updateTemperature()})))))}))}scheduleChanged(e,t){return a.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;if(!(0,l.find)(t.plans,(e=>e.id===this.id)))return;this.logger.debug("Plans applied - received new schedule");const e=(0,l.filter)(t.schedule,(e=>e.plan.id===this.id));yield this.updateTemperature(e),e.length>0&&(yield this.doSetCapabilityValue(o.CapabilityType.TargetTemperature,this.adjustTemperatureValue(e[0].targetTemperature)))}))}capabilititesChanged(e,t){return a.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;if(t.capability!==o.CapabilityType.MeasureTemperature)return;let e=(0,l.find)(this.plan.devices||[],(e=>e===t.device.id));e=e||(0,l.find)(this.plan.zones||[],(e=>e===t.device.zone)),e&&(this.logger.debug(`${o.CapabilityType.MeasureTemperature} changed`),yield this.updateTemperature())}))}tryRegisterCapability(e,t){return a.__awaiter(this,void 0,void 0,(function*(){(0,l.find)(this.getCapabilities(),(t=>t===e))?(this.logger.information(`attached listener for ${e}`),yield this.registerCapabilityListener(e,t)):this.logger.information(`does not have ${e} - cannot register listener`)}))}doSetCapabilityValue(e,t){return a.__awaiter(this,void 0,void 0,(function*(){return this.getCapabilityValue(e)!==t&&(this.logger.information(`Set ${e} = ${t}`),yield this.setCapabilityValue(e,t),!0)}))}adjustTemperatureValue(e){return Math.round(100*Math.min(Math.max(4,e),35))/100}updateTemperature(e){return a.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;if(this.logger.debug(`Updating ${o.CapabilityType.MeasureTemperature}`),null==e&&(e=yield this.manager.evaluatePlan(this.plan)),0===e.length)return;let t=0;e.forEach((e=>{t+=e.temperature||0})),0===t&&(t=this.adjustTemperatureValue(e[0].targetTemperature)),t=this.adjustTemperatureValue(0===e.length?0:t/e.length),this.logger.debug("Calculated temperature",t),yield this.doSetCapabilityValue(o.CapabilityType.MeasureTemperature,t)}))}updateCapabilitiesFromPlan(){return a.__awaiter(this,void 0,void 0,(function*(){if(this.logger.debug(`Updating ${o.CapabilityType.ThermostatOverride} and ${o.CapabilityType.TargetTemperature}`),null==this.plan)this.logger.information("Plan does not exist -> exit"),yield this.setUnavailable(this.homey.__("Device.plan_removed"));else{this.logger.debug(`available? ${this.getAvailable()}`),yield this.unsetWarning(),yield this.setAvailable();let e=n.NormalOperationMode.Automatic;this.plan.enabled?null!=this.plan.thermostatMode&&(e=this.plan.thermostatMode):e=n.ThermostatMode.FullManual,(yield this.doSetCapabilityValue(o.CapabilityType.ThermostatOverride,e.toString()))&&(yield this.flow.thermostatModeChanged.trigger(this,{mode:this.homey.__(`ThermostatMode.${e}`)}));const t=(yield this.manager.evaluatePlan(this.plan)).filter((e=>e.thermostatMode===n.NormalOperationMode.Automatic));t.length>0&&(yield this.doSetCapabilityValue(o.CapabilityType.TargetTemperature,this.adjustTemperatureValue(t[0].targetTemperature)))}}))}onThermostatModeChanged(e,t){return a.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;this.logger.information(`${o.CapabilityType.ThermostatOverride} ${e}`);const t=parseInt(e,10);this.plan.thermostatMode=t,yield this.repository.update(this.plan),yield this.flow.thermostatModeChanged.trigger(this,{mode:this.homey.__(`ThermostatMode.${e}`)})}))}onTargetTemperatureChanged(e,t){return a.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;this.logger.information(`${o.CapabilityType.TargetTemperature} ${e}`),this.plan.thermostatMode!==n.ThermostatMode.FullManual&&(this.plan.thermostatMode!==n.ThermostatMode.OverrideDay&&(this.plan.thermostatMode=n.ThermostatMode.OverrideDay,this.repository.update(this.plan,!1)),(yield this.doSetCapabilityValue(o.CapabilityType.ThermostatOverride,n.ThermostatMode.OverrideDay.toString()))&&(yield this.flow.thermostatModeChanged.trigger(this,{mode:this.homey.__(`ThermostatMode.${n.ThermostatMode.OverrideDay}`)})));const t=[];(this.plan.devices||[]).forEach((e=>{const r=this.devices.findDevice(e);null!=r&&t.push(r)})),(this.plan.zones||[]).forEach((e=>{const r=this.devices.getDevicesForZone(e);null!=r&&t.push(...r)})),0!==t.length?yield Promise.all(t.map((t=>a.__awaiter(this,void 0,void 0,(function*(){return yield this.manager.setTemperature(this.plan.name||"",t,e)}))))):this.logger.debug("we don't have associated devices")}))}}a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[]),a.__metadata("design:returntype",Promise)],u.prototype,"onInit",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[]),a.__metadata("design:returntype",Promise)],u.prototype,"onDeleted",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[o.HeatingPlanRepositoryService,Array]),a.__metadata("design:returntype",Promise)],u.prototype,"plansChanged",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[o.HeatingSchedulerService,Object]),a.__metadata("design:returntype",Promise)],u.prototype,"scheduleChanged",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[o.DeviceManagerService,Object]),a.__metadata("design:returntype",Promise)],u.prototype,"capabilititesChanged",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[String,Function]),a.__metadata("design:returntype",Promise)],u.prototype,"tryRegisterCapability",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[]),a.__metadata("design:returntype",Promise)],u.prototype,"updateCapabilitiesFromPlan",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[String,Object]),a.__metadata("design:returntype",Promise)],u.prototype,"onThermostatModeChanged",null),a.__decorate([(0,o.trycatchlog)(!0),a.__metadata("design:type",Function),a.__metadata("design:paramtypes",[Number,Object]),a.__metadata("design:returntype",Promise)],u.prototype,"onTargetTemperatureChanged",null),e.exports=u},655:(e,t,r)=>{r.r(t),r.d(t,{__assign:()=>n,__asyncDelegator:()=>b,__asyncGenerator:()=>v,__asyncValues:()=>T,__await:()=>_,__awaiter:()=>u,__classPrivateFieldGet:()=>P,__classPrivateFieldSet:()=>O,__createBinding:()=>h,__decorate:()=>s,__exportStar:()=>c,__extends:()=>i,__generator:()=>p,__importDefault:()=>S,__importStar:()=>C,__makeTemplateObject:()=>w,__metadata:()=>d,__param:()=>l,__read:()=>g,__rest:()=>o,__spread:()=>f,__spreadArrays:()=>m,__values:()=>y});var a=function(e,t){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},a(e,t)};function i(e,t){function r(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var n=function(){return n=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};function o(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(r[a[i]]=e[a[i]])}return r}function s(e,t,r,a){var i,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,a);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(n<3?i(o):n>3?i(t,r,o):i(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o}function l(e,t){return function(r,a){t(r,a,e)}}function d(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function u(e,t,r,a){return new(r||(r=Promise))((function(i,n){function o(e){try{l(a.next(e))}catch(e){n(e)}}function s(e){try{l(a.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}l((a=a.apply(e,t||[])).next())}))}function p(e,t){var r,a,i,n,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return n={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function s(n){return function(s){return function(n){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,a&&(i=2&n[0]?a.return:n[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;switch(a=0,i&&(n=[2&n[0],i.value]),n[0]){case 0:case 1:i=n;break;case 4:return o.label++,{value:n[1],done:!1};case 5:o.label++,a=n[1],n=[0];continue;case 7:n=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==n[0]&&2!==n[0])){o=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){o.label=n[1];break}if(6===n[0]&&o.label<i[1]){o.label=i[1],i=n;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(n);break}i[2]&&o.ops.pop(),o.trys.pop();continue}n=t.call(e,o)}catch(e){n=[6,e],a=0}finally{r=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,s])}}}function h(e,t,r,a){void 0===a&&(a=r),e[a]=t[r]}function c(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||(t[r]=e[r])}function y(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],a=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&a>=e.length&&(e=void 0),{value:e&&e[a++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function g(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var a,i,n=r.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(a=n.next()).done;)o.push(a.value)}catch(e){i={error:e}}finally{try{a&&!a.done&&(r=n.return)&&r.call(n)}finally{if(i)throw i.error}}return o}function f(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(g(arguments[t]));return e}function m(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var a=Array(e),i=0;for(t=0;t<r;t++)for(var n=arguments[t],o=0,s=n.length;o<s;o++,i++)a[i]=n[o];return a}function _(e){return this instanceof _?(this.v=e,this):new _(e)}function v(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a,i=r.apply(e,t||[]),n=[];return a={},o("next"),o("throw"),o("return"),a[Symbol.asyncIterator]=function(){return this},a;function o(e){i[e]&&(a[e]=function(t){return new Promise((function(r,a){n.push([e,t,r,a])>1||s(e,t)}))})}function s(e,t){try{(r=i[e](t)).value instanceof _?Promise.resolve(r.value.v).then(l,d):u(n[0][2],r)}catch(e){u(n[0][3],e)}var r}function l(e){s("next",e)}function d(e){s("throw",e)}function u(e,t){e(t),n.shift(),n.length&&s(n[0][0],n[0][1])}}function b(e){var t,r;return t={},a("next"),a("throw",(function(e){throw e})),a("return"),t[Symbol.iterator]=function(){return this},t;function a(a,i){t[a]=e[a]?function(t){return(r=!r)?{value:_(e[a](t)),done:"return"===a}:i?i(t):t}:i}}function T(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=y(e),t={},a("next"),a("throw"),a("return"),t[Symbol.asyncIterator]=function(){return this},t);function a(r){t[r]=e[r]&&function(t){return new Promise((function(a,i){!function(e,t,r,a){Promise.resolve(a).then((function(t){e({value:t,done:r})}),t)}(a,i,(t=e[r](t)).done,t.value)}))}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function C(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function S(e){return e&&e.__esModule?e:{default:e}}function P(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function O(e,t,r){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,r),r}},8192:e=>{e.exports=require("@app/helper")},4543:e=>{e.exports=require("@app/model")},5390:e=>{e.exports=require("@app/services")},4559:e=>{e.exports=require("homey")},4793:e=>{e.exports=require("lodash")},5733:e=>{e.exports=require("reflect-metadata")},1789:e=>{e.exports=require("tsyringe")}},t={};function r(a){var i=t[a];if(void 0!==i)return i.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a=r(1931);module.exports=a})();
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc16/drivers/virtual-thermostat/device.js.map