/*! For license information please see device.js.LICENSE.txt */
(()=>{"use strict";var e={1931:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=r(655);r(5733);const a=r(8192),n=r(4543),o=r(5390),s=r(4559),l=r(4793),d=r(1789);class u extends s.Device{constructor(){super(...arguments),this.plan=void 0}onInit(){return i.__awaiter(this,void 0,void 0,(function*(){yield(0,o.BootStrapper)(this.homey.app),this.id=this.getData().id;const e=d.container.resolve(o.LoggerFactory);this.logger=e.createLogger("Device").createSubLogger(this.id),this.logger.information(`Init for device ${this.getName()}`),this.repository=d.container.resolve(o.HeatingPlanRepositoryService),this.manager=d.container.resolve(o.HeatingManagerService),this.devices=d.container.resolve(o.DeviceManagerService),this.flow=d.container.resolve("FlowService");const t=d.container.resolve(o.SettingsManagerService);this.tryRegisterCapability(o.CapabilityType.TargetTemperature,(0,a.AsyncDebounce)(this.onTargetTemperatureChanged.bind(this),t.get(o.InternalSettings.DriverDebounce,5e3))),this.tryRegisterCapability(o.CapabilityType.ThermostatOverride,(0,a.AsyncDebounce)(this.onThermostatModeChanged.bind(this),t.get(o.InternalSettings.DriverDebounce,5e3))),this.tryRegisterCapability(o.CapabilityType.OnOff,(0,a.AsyncDebounce)(this.onOnOff.bind(this),t.get(o.InternalSettings.DriverDebounce,5e3))),this.repositoryChanged=this.plansChanged.bind(this),this.capabilitiesChanged=this.capabilititesChanged.bind(this),this.plansApplied=this.scheduleChanged.bind(this),this.repository.onChanged.subscribe(this.repositoryChanged),this.devices.onCapabilityChanged.subscribe(this.capabilitiesChanged),this.manager.onPlansApplied.subscribe(this.plansApplied),this.plan=yield this.repository.find(this.id),yield this.updateCapabilitiesFromPlan(),yield this.updateTemperature(),yield this.updateOnOffStatus()}))}onDeleted(){return i.__awaiter(this,void 0,void 0,(function*(){this.repository.onChanged.unsubscribe(this.repositoryChanged),this.devices.onCapabilityChanged.unsubscribe(this.capabilitiesChanged),this.manager.onPlansApplied.unsubscribe(this.plansApplied),this.plan=void 0,delete this.devices,delete this.repository,delete this.manager,this.logger.information("was removed")}))}changeThermostatMode(e){return i.__awaiter(this,void 0,void 0,(function*(){yield this.onThermostatModeChanged(e.toString(),null)}))}plansChanged(e,t){return i.__awaiter(this,void 0,void 0,(function*(){yield Promise.all(t.filter((e=>e.plan.id===this.id)).map((e=>i.__awaiter(this,void 0,void 0,(function*(){this.plan=e.event===o.PlanChangeEventType.Removed?void 0:e.plan,this.logger.information(`plan was ${o.PlanChangeEventType[e.event]}`),yield this.updateCapabilitiesFromPlan(),yield this.updateTemperature(),yield this.updateOnOffStatus()})))))}))}scheduleChanged(e,t){return i.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;if(!(0,l.find)(t.plans,(e=>e.id===this.id)))return;this.logger.debug("Plans applied - received new schedule");const e=(0,l.filter)(t.schedule,(e=>e.plan.id===this.id));yield this.updateTemperature(e),e.length>0&&(yield this.doSetCapabilityValue(o.CapabilityType.TargetTemperature,this.adjustTemperatureValue(e[0].targetTemperature)))}))}capabilititesChanged(e,t){return i.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;if(t.capability!==o.CapabilityType.MeasureTemperature)return;let e=(0,l.find)(this.plan.devices||[],(e=>e===t.device.id));e=e||(0,l.find)(this.plan.zones||[],(e=>e===t.device.zone)),e&&(this.logger.debug(`${o.CapabilityType.MeasureTemperature} changed`),yield this.updateTemperature())}))}tryRegisterCapability(e,t){return i.__awaiter(this,void 0,void 0,(function*(){(0,l.find)(this.getCapabilities(),(t=>t===e))?(this.logger.information(`attached listener for ${e}`),yield this.registerCapabilityListener(e,t)):this.logger.information(`does not have ${e} - cannot register listener`)}))}doSetCapabilityValue(e,t){return i.__awaiter(this,void 0,void 0,(function*(){return this.getCapabilityValue(e)!==t&&(this.logger.information(`Set ${e} = ${t}`),yield this.setCapabilityValue(e,t),!0)}))}adjustTemperatureValue(e){return Math.round(100*Math.min(Math.max(4,e),35))/100}updateTemperature(e){return i.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;if(this.logger.debug(`Updating ${o.CapabilityType.MeasureTemperature}`),null==e&&(e=yield this.manager.evaluatePlan(this.plan)),0===e.length)return;let t=0;e.forEach((e=>{t+=e.temperature||0})),0===t&&(t=this.adjustTemperatureValue(e[0].targetTemperature)),t=this.adjustTemperatureValue(0===e.length?0:t/e.length),this.logger.debug("Calculated temperature",t),yield this.doSetCapabilityValue(o.CapabilityType.MeasureTemperature,t)}))}updateCapabilitiesFromPlan(){return i.__awaiter(this,void 0,void 0,(function*(){if(this.logger.debug(`Updating ${o.CapabilityType.ThermostatOverride} and ${o.CapabilityType.TargetTemperature}`),null==this.plan)this.logger.information("Plan does not exist -> exit"),yield this.setUnavailable(this.homey.__("Device.plan_removed"));else{this.logger.debug(`available? ${this.getAvailable()}`),yield this.unsetWarning(),yield this.setAvailable();let e=n.NormalOperationMode.Automatic;this.plan.enabled?null!=this.plan.thermostatMode&&(e=this.plan.thermostatMode):e=n.ThermostatMode.FullManual,(yield this.doSetCapabilityValue(o.CapabilityType.ThermostatOverride,e.toString()))&&(yield this.flow.thermostatModeChanged.trigger(this,{mode:this.homey.__(`ThermostatMode.${e}`)}));const t=(yield this.manager.evaluatePlan(this.plan)).filter((e=>e.thermostatMode===n.NormalOperationMode.Automatic));t.length>0&&(yield this.doSetCapabilityValue(o.CapabilityType.TargetTemperature,this.adjustTemperatureValue(t[0].targetTemperature)))}}))}onThermostatModeChanged(e,t){return i.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;this.logger.information(`${o.CapabilityType.ThermostatOverride} ${e}`);const t=parseInt(e,10);this.plan.thermostatMode=t,yield this.repository.update(this.plan),yield this.flow.thermostatModeChanged.trigger(this,{mode:this.homey.__(`ThermostatMode.${e}`)})}))}onTargetTemperatureChanged(e,t){return i.__awaiter(this,void 0,void 0,(function*(){if(null==this.plan)return;this.logger.information(`${o.CapabilityType.TargetTemperature} ${e}`),this.plan.thermostatMode!==n.ThermostatMode.FullManual&&(this.plan.thermostatMode!==n.ThermostatMode.OverrideDay&&(this.plan.thermostatMode=n.ThermostatMode.OverrideDay,this.repository.update(this.plan,!1)),(yield this.doSetCapabilityValue(o.CapabilityType.ThermostatOverride,n.ThermostatMode.OverrideDay.toString()))&&(yield this.flow.thermostatModeChanged.trigger(this,{mode:this.homey.__(`ThermostatMode.${n.ThermostatMode.OverrideDay}`)})));const t=[];(this.plan.devices||[]).forEach((e=>{const r=this.devices.findDevice(e);null!=r&&t.push(r)})),(this.plan.zones||[]).forEach((e=>{const r=this.devices.getDevicesForZone(e);null!=r&&t.push(...r)})),0!==t.length?yield Promise.all(t.map((t=>i.__awaiter(this,void 0,void 0,(function*(){return yield this.manager.setTemperature(this.plan.name||"",t,e)}))))):this.logger.debug("we don't have associated devices")}))}onOnOff(e,t){return i.__awaiter(this,void 0,void 0,(function*(){null!=this.plan&&(this.logger.information(`${o.CapabilityType.OnOff} ${e}`),this.plan.enabled=e,yield this.repository.update(this.plan))}))}updateOnOffStatus(){return i.__awaiter(this,void 0,void 0,(function*(){null!=this.plan&&(this.logger.debug(`Updating ${o.CapabilityType.OnOff} ${this.plan.enabled}`),yield this.doSetCapabilityValue(o.CapabilityType.OnOff,this.plan.enabled))}))}}i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[]),i.__metadata("design:returntype",Promise)],u.prototype,"onInit",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[]),i.__metadata("design:returntype",Promise)],u.prototype,"onDeleted",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[o.HeatingPlanRepositoryService,Array]),i.__metadata("design:returntype",Promise)],u.prototype,"plansChanged",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[o.HeatingSchedulerService,Object]),i.__metadata("design:returntype",Promise)],u.prototype,"scheduleChanged",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[o.DeviceManagerService,Object]),i.__metadata("design:returntype",Promise)],u.prototype,"capabilititesChanged",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[String,Function]),i.__metadata("design:returntype",Promise)],u.prototype,"tryRegisterCapability",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[]),i.__metadata("design:returntype",Promise)],u.prototype,"updateCapabilitiesFromPlan",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[String,Object]),i.__metadata("design:returntype",Promise)],u.prototype,"onThermostatModeChanged",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[Number,Object]),i.__metadata("design:returntype",Promise)],u.prototype,"onTargetTemperatureChanged",null),i.__decorate([(0,o.trycatchlog)(!0),i.__metadata("design:type",Function),i.__metadata("design:paramtypes",[Boolean,Object]),i.__metadata("design:returntype",Promise)],u.prototype,"onOnOff",null),e.exports=u},655:(e,t,r)=>{r.r(t),r.d(t,{__assign:()=>n,__asyncDelegator:()=>b,__asyncGenerator:()=>v,__asyncValues:()=>T,__await:()=>_,__awaiter:()=>u,__classPrivateFieldGet:()=>S,__classPrivateFieldSet:()=>P,__createBinding:()=>h,__decorate:()=>s,__exportStar:()=>c,__extends:()=>a,__generator:()=>p,__importDefault:()=>O,__importStar:()=>w,__makeTemplateObject:()=>C,__metadata:()=>d,__param:()=>l,__read:()=>g,__rest:()=>o,__spread:()=>f,__spreadArrays:()=>m,__values:()=>y});var i=function(e,t){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},i(e,t)};function a(e,t){function r(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var n=function(){return n=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)};function o(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(r[i[a]]=e[i[a]])}return r}function s(e,t,r,i){var a,n=arguments.length,o=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(o=(n<3?a(o):n>3?a(t,r,o):a(t,r))||o);return n>3&&o&&Object.defineProperty(t,r,o),o}function l(e,t){return function(r,i){t(r,i,e)}}function d(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function u(e,t,r,i){return new(r||(r=Promise))((function(a,n){function o(e){try{l(i.next(e))}catch(e){n(e)}}function s(e){try{l(i.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}l((i=i.apply(e,t||[])).next())}))}function p(e,t){var r,i,a,n,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return n={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function s(n){return function(s){return function(n){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,i&&(a=2&n[0]?i.return:n[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[2&n[0],a.value]),n[0]){case 0:case 1:a=n;break;case 4:return o.label++,{value:n[1],done:!1};case 5:o.label++,i=n[1],n=[0];continue;case 7:n=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==n[0]&&2!==n[0])){o=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){o.label=n[1];break}if(6===n[0]&&o.label<a[1]){o.label=a[1],a=n;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(n);break}a[2]&&o.ops.pop(),o.trys.pop();continue}n=t.call(e,o)}catch(e){n=[6,e],i=0}finally{r=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,s])}}}function h(e,t,r,i){void 0===i&&(i=r),e[i]=t[r]}function c(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||(t[r]=e[r])}function y(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],i=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function g(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var i,a,n=r.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(e){a={error:e}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o}function f(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(g(arguments[t]));return e}function m(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var i=Array(e),a=0;for(t=0;t<r;t++)for(var n=arguments[t],o=0,s=n.length;o<s;o++,a++)i[a]=n[o];return i}function _(e){return this instanceof _?(this.v=e,this):new _(e)}function v(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i,a=r.apply(e,t||[]),n=[];return i={},o("next"),o("throw"),o("return"),i[Symbol.asyncIterator]=function(){return this},i;function o(e){a[e]&&(i[e]=function(t){return new Promise((function(r,i){n.push([e,t,r,i])>1||s(e,t)}))})}function s(e,t){try{(r=a[e](t)).value instanceof _?Promise.resolve(r.value.v).then(l,d):u(n[0][2],r)}catch(e){u(n[0][3],e)}var r}function l(e){s("next",e)}function d(e){s("throw",e)}function u(e,t){e(t),n.shift(),n.length&&s(n[0][0],n[0][1])}}function b(e){var t,r;return t={},i("next"),i("throw",(function(e){throw e})),i("return"),t[Symbol.iterator]=function(){return this},t;function i(i,a){t[i]=e[i]?function(t){return(r=!r)?{value:_(e[i](t)),done:"return"===i}:a?a(t):t}:a}}function T(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=y(e),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(r){t[r]=e[r]&&function(t){return new Promise((function(i,a){!function(e,t,r,i){Promise.resolve(i).then((function(t){e({value:t,done:r})}),t)}(i,a,(t=e[r](t)).done,t.value)}))}}}function C(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function w(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function O(e){return e&&e.__esModule?e:{default:e}}function S(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function P(e,t,r){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,r),r}},8192:e=>{e.exports=require("@app/helper")},4543:e=>{e.exports=require("@app/model")},5390:e=>{e.exports=require("@app/services")},4559:e=>{e.exports=require("homey")},4793:e=>{e.exports=require("lodash")},5733:e=>{e.exports=require("reflect-metadata")},1789:e=>{e.exports=require("tsyringe")}},t={};function r(i){var a=t[i];if(void 0!==a)return a.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i=r(1931);module.exports=i})();
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.6-rc22/drivers/virtual-thermostat/device.js.map