/*! For license information please see api.js.LICENSE.txt */
(()=>{"use strict";var e={6415:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CompatibilityWrapper=void 0;const n=r(3832);t.CompatibilityWrapper=function(e){return({homey:t,body:r,params:i,query:a})=>(n.ApiBase.initialize(t),new Promise(((t,n)=>{e.fn({body:r,params:i,query:a},((e,r)=>{e?n(e):t(r)}))})))}},1437:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DebuggerOff=t.DebuggerOn=void 0;const n=r(655),i=r(1789),a=r(3832);let o=class extends a.ApiBase{constructor(){super("GET","/debugger/on"),this.public=!1}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){throw new Error("Access denied.")}))}};o=n.__decorate([(0,i.injectable)(),n.__metadata("design:paramtypes",[])],o),t.DebuggerOn=o;let s=class extends a.ApiBase{constructor(){super("GET","/debugger/off"),this.public=!1}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){throw new Error("Access denied.")}))}};s=n.__decorate([(0,i.injectable)(),n.__metadata("design:paramtypes",[])],s),t.DebuggerOff=s},6964:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GetMode=t.PutMode=void 0;const n=r(655),i=r(5390),a=r(1789),o=r(3832);let s=class extends o.ApiBase{constructor(e){super("PUT","/mode"),this.manager=e}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){const t=e.body.mode;return this.manager.operationMode=t,o.SUCCESS}))}};s=n.__decorate([(0,a.injectable)(),n.__metadata("design:paramtypes",[i.HeatingManagerService])],s),t.PutMode=s;let c=class extends o.ApiBase{constructor(e){super("GET","/mode"),this.manager=e}execute(){return n.__awaiter(this,void 0,void 0,(function*(){return{mode:this.manager.operationMode}}))}};c=n.__decorate([(0,a.injectable)(),n.__metadata("design:paramtypes",[i.HeatingManagerService])],c),t.GetMode=c},5034:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DeletePlan=t.PutPlan=t.GetPlan=t.GetPlans=t.GetResetPlans=void 0;const n=r(655),i=r(8192),a=r(5390),o=r(4793),s=r(1789),c=r(3832);let l=class extends c.ApiBase{constructor(e){super("GET","/resetplans"),this.manager=e}execute(){return n.__awaiter(this,void 0,void 0,(function*(){return this.manager.replacePlans(i.DEFAULT_HEATING_PLAN),yield this.manager.plans}))}};l=n.__decorate([(0,s.injectable)(),n.__metadata("design:paramtypes",[a.HeatingPlanRepositoryService])],l),t.GetResetPlans=l;let u=class extends c.ApiBase{constructor(e){super("GET","/plans"),this.manager=e}execute(){return n.__awaiter(this,void 0,void 0,(function*(){return yield this.manager.plans}))}};u=n.__decorate([(0,s.injectable)(),n.__metadata("design:paramtypes",[a.HeatingPlanRepositoryService])],u),t.GetPlans=u;let d=class extends c.ApiBase{constructor(e){super("GET","/plans/:id"),this.manager=e}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){return yield this.manager.find(e.params.id)}))}};d=n.__decorate([(0,s.injectable)(),n.__metadata("design:paramtypes",[a.HeatingPlanRepositoryService])],d),t.GetPlan=d;let p=class extends c.ApiBase{constructor(e,t){super("PUT","/plans/:id"),this.manager=e,this.devices=t}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){const t=e.body;return t.id=e.params.id,t.devices&&(0,o.remove)(t.devices,(e=>null==(0,o.find)(this.devices.devices,(t=>t.id===e)))),t.zones&&(0,o.remove)(t.zones,(e=>null==(0,o.find)(this.devices.zones,(t=>t.id===e)))),t.enabled||delete t.thermostatMode,yield this.manager.update(t),t}))}};p=n.__decorate([(0,s.injectable)(),n.__metadata("design:paramtypes",[a.HeatingPlanRepositoryService,a.DeviceManagerService])],p),t.PutPlan=p;let f=class extends c.ApiBase{constructor(e){super("DELETE","/plans/:id"),this.manager=e}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){return yield this.manager.remove(e.params.id),c.SUCCESS}))}};f=n.__decorate([(0,s.injectable)(),n.__metadata("design:paramtypes",[a.HeatingPlanRepositoryService])],f),t.DeletePlan=f},2472:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GetSchedule=void 0;const n=r(655),i=r(5390),a=r(1789),o=r(3832);let s=class extends o.ApiBase{constructor(e,t){super("GET","/schedule"),this.manager=e,this.scheduler=t}execute(){return n.__awaiter(this,void 0,void 0,(function*(){return{mode:this.manager.operationMode,nextDate:this.scheduler.nextSchedule,temperatures:yield this.manager.evaluateActivePlans()}}))}};s=n.__decorate([(0,a.injectable)(),n.__metadata("design:paramtypes",[i.HeatingManagerService,i.HeatingSchedulerService])],s),t.GetSchedule=s},4258:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PutSettings=t.GetSettings=void 0;const n=r(655),i=r(5390),a=r(4793),o=r(1789),s=r(3832);let c=class extends s.ApiBase{constructor(e){super("GET","/settings"),this.manager=e}execute(){return n.__awaiter(this,void 0,void 0,(function*(){const e={};return(0,a.forEach)(Object.keys(i.Settings),(t=>{e[t]=this.manager.get(i.Settings[t])})),e}))}};c=n.__decorate([(0,o.injectable)(),n.__metadata("design:paramtypes",[i.SettingsManagerService])],c),t.GetSettings=c;let l=class extends s.ApiBase{constructor(e){super("PUT","/settings"),this.manager=e}execute(e){return n.__awaiter(this,void 0,void 0,(function*(){const t=e.body;return(0,a.forEach)([...Object.keys(i.Settings),...Object.keys(i.InternalSettings)],(e=>{const r=i.Settings[e];t.hasOwnProperty(e)&&(this.manager.get(r)!==t[e]?this.manager.set(r,t[e]):this.logger.debug(`Setting ${r} did not change.`))})),s.SUCCESS}))}};l=n.__decorate([(0,o.injectable)(),n.__metadata("design:paramtypes",[i.SettingsManagerService])],l),t.PutSettings=l},3832:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ApiBase=t.SUCCESS=void 0;const n=r(655),i=r(8192),a=r(5390),o=r(1789);t.SUCCESS="OK";class s{get logger(){return s.logger||console}static initialize(e){return n.__awaiter(this,void 0,void 0,(function*(){if(s.initialized)return;const t=yield s.mutex.lock();{yield(0,a.BootStrapper)(e);const t=o.container.resolve(a.SettingsManagerService);t.onChanged.subscribe(((e,t)=>{t.setting===a.InternalSettings.LogApi&&(s.logApi=t.value)})),s.logApi=!0===t.get(a.InternalSettings.LogApi,!1),s.logger=o.container.resolve(a.LoggerFactory).createLogger("Api"),s.initialized=!0}t()}))}constructor(e,t){this.method=e,this.path=t,this.public=!1}fn(e,t){return n.__awaiter(this,void 0,void 0,(function*(){try{s.logApi?this.logger.debug(`${this.method} ${this.path} ${JSON.stringify(e)}`):this.logger.debug(`${this.method} ${this.path}`);const r=yield this.execute(e);s.logApi&&this.logger.debug(`${this.method} ${this.path}`,"Request:",JSON.stringify(e),"Response:",JSON.stringify(r)),t(null,r)}catch(r){this.logger.error(r,`${this.method} ${this.path} failed`,e),t(r,null)}}))}}s.mutex=new i.Mutex,s.logApi=!1,s.initialized=!1,t.ApiBase=s},5284:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GetDevices=t.GetZones=void 0;const n=r(655),i=r(5390),a=r(4793),o=r(1789),s=r(3832);let c=class extends s.ApiBase{constructor(e){super("GET","/zones"),this.manager=e}execute(){return n.__awaiter(this,void 0,void 0,(function*(){return(0,a.map)(this.manager.zones,(e=>({id:e.id,name:e.name,icon:e.icon})))}))}};c=n.__decorate([(0,o.injectable)(),n.__metadata("design:paramtypes",[i.DeviceManagerService])],c),t.GetZones=c;let l=class extends s.ApiBase{constructor(e){super("GET","/devices"),this.manager=e}execute(){return n.__awaiter(this,void 0,void 0,(function*(){return(0,a.map)(this.manager.devices,(e=>({id:e.id,name:e.name,icon:e.iconObj&&e.iconObj.url})))}))}};l=n.__decorate([(0,o.injectable)(),n.__metadata("design:paramtypes",[i.DeviceManagerService])],l),t.GetDevices=l},655:(e,t,r)=>{r.r(t),r.d(t,{__assign:()=>a,__asyncDelegator:()=>b,__asyncGenerator:()=>m,__asyncValues:()=>S,__await:()=>h,__awaiter:()=>u,__classPrivateFieldGet:()=>O,__classPrivateFieldSet:()=>G,__createBinding:()=>p,__decorate:()=>s,__exportStar:()=>f,__extends:()=>i,__generator:()=>d,__importDefault:()=>x,__importStar:()=>w,__makeTemplateObject:()=>P,__metadata:()=>l,__param:()=>c,__read:()=>_,__rest:()=>o,__spread:()=>v,__spreadArrays:()=>y,__values:()=>g});var n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},n(e,t)};function i(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var a=function(){return a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},a.apply(this,arguments)};function o(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]])}return r}function s(e,t,r,n){var i,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o}function c(e,t){return function(r,n){t(r,n,e)}}function l(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function u(e,t,r,n){return new(r||(r=Promise))((function(i,a){function o(e){try{c(n.next(e))}catch(e){a(e)}}function s(e){try{c(n.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}c((n=n.apply(e,t||[])).next())}))}function d(e,t){var r,n,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,n=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],n=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}function p(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}function f(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||(t[r]=e[r])}function g(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function _(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,i,a=r.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(n=a.next()).done;)o.push(n.value)}catch(e){i={error:e}}finally{try{n&&!n.done&&(r=a.return)&&r.call(a)}finally{if(i)throw i.error}}return o}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(_(arguments[t]));return e}function y(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),i=0;for(t=0;t<r;t++)for(var a=arguments[t],o=0,s=a.length;o<s;o++,i++)n[i]=a[o];return n}function h(e){return this instanceof h?(this.v=e,this):new h(e)}function m(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,i=r.apply(e,t||[]),a=[];return n={},o("next"),o("throw"),o("return"),n[Symbol.asyncIterator]=function(){return this},n;function o(e){i[e]&&(n[e]=function(t){return new Promise((function(r,n){a.push([e,t,r,n])>1||s(e,t)}))})}function s(e,t){try{(r=i[e](t)).value instanceof h?Promise.resolve(r.value.v).then(c,l):u(a[0][2],r)}catch(e){u(a[0][3],e)}var r}function c(e){s("next",e)}function l(e){s("throw",e)}function u(e,t){e(t),a.shift(),a.length&&s(a[0][0],a[0][1])}}function b(e){var t,r;return t={},n("next"),n("throw",(function(e){throw e})),n("return"),t[Symbol.iterator]=function(){return this},t;function n(n,i){t[n]=e[n]?function(t){return(r=!r)?{value:h(e[n](t)),done:"return"===n}:i?i(t):t}:i}}function S(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=g(e),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,i){!function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)}(n,i,(t=e[r](t)).done,t.value)}))}}}function P(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function w(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function x(e){return e&&e.__esModule?e:{default:e}}function O(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function G(e,t,r){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,r),r}},8192:e=>{e.exports=require("@app/helper")},5390:e=>{e.exports=require("@app/services")},4793:e=>{e.exports=require("lodash")},5733:e=>{e.exports=require("reflect-metadata")},1789:e=>{e.exports=require("tsyringe")},1405:e=>{e.exports=require("inspector")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{var e=n;Object.defineProperty(e,"__esModule",{value:!0}),e.GetSchedule=e.GetZones=e.GetDevices=e.GetResetPlans=e.GetPlans=e.PutPlan=e.GetPlan=e.DeletePlan=e.PutMode=e.GetMode=e.PutSettings=e.GetSettings=e.DebuggerOff=e.DebuggerOn=void 0,r(5733);const t=r(1789),i=r(6415),a=r(1437),o=r(6964),s=r(5034),c=r(2472),l=r(4258),u=r(5284);console.info("Bootstrapping API v2.0.7 (v2.0.7)"),e.DebuggerOn=(0,i.CompatibilityWrapper)(t.container.resolve(a.DebuggerOn)),e.DebuggerOff=(0,i.CompatibilityWrapper)(t.container.resolve(a.DebuggerOff)),e.GetSettings=(0,i.CompatibilityWrapper)(t.container.resolve(l.GetSettings)),e.PutSettings=(0,i.CompatibilityWrapper)(t.container.resolve(l.PutSettings)),e.GetMode=(0,i.CompatibilityWrapper)(t.container.resolve(o.GetMode)),e.PutMode=(0,i.CompatibilityWrapper)(t.container.resolve(o.PutMode)),e.DeletePlan=(0,i.CompatibilityWrapper)(t.container.resolve(s.DeletePlan)),e.GetPlan=(0,i.CompatibilityWrapper)(t.container.resolve(s.GetPlan)),e.PutPlan=(0,i.CompatibilityWrapper)(t.container.resolve(s.PutPlan)),e.GetPlans=(0,i.CompatibilityWrapper)(t.container.resolve(s.GetPlans)),e.GetResetPlans=(0,i.CompatibilityWrapper)(t.container.resolve(s.GetResetPlans)),e.GetDevices=(0,i.CompatibilityWrapper)(t.container.resolve(u.GetDevices)),e.GetZones=(0,i.CompatibilityWrapper)(t.container.resolve(u.GetZones)),e.GetSchedule=(0,i.CompatibilityWrapper)(t.container.resolve(c.GetSchedule))})(),module.exports=n})();
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.7/api.js.map