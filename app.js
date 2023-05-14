/*! For license information please see app.js.LICENSE.txt */
(()=>{"use strict";var e={9962:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HeatingSchedulerApp=void 0;const n=r(655);r(5733);const o=r(5390),i=r(4559),a=r(1789);let c=class{constructor(e,t,r,n,o,i){this.loggerFactory=e,this.heatingScheduler=t,this.heatingManager=r,this.translation=n,this.notification=o,this.flowService=i,this.logger=this.loggerFactory.createLogger("App")}run(e){return n.__awaiter(this,void 0,void 0,(function*(){this.logger.information("Bootstrapping HeatingScheduler"),process.on("uncaughtException",(e=>{this.logger.error(e,"uncought Exception")})),process.on("unhandledRejection",((e,t)=>{this.logger.error(e,"Unhandled Rejection at:",t,"reason:",e)})),yield this.translation.init(e.homey.__),yield this.notification.init(e.homey),yield this.flowService.init(e),yield this.heatingManager.init(),yield this.heatingScheduler.start()}))}};n.__decorate([(0,o.trycatchlog)(!0),n.__metadata("design:type",Function),n.__metadata("design:paramtypes",[i.App]),n.__metadata("design:returntype",Promise)],c.prototype,"run",null),c=n.__decorate([(0,a.injectable)(),n.__param(5,(0,a.inject)("FlowService")),n.__metadata("design:paramtypes",[o.LoggerFactory,o.HeatingSchedulerService,o.HeatingManagerService,o.TranslationService,o.NotificationService,o.FlowService])],c),t.HeatingSchedulerApp=c;class u extends i.App{onInit(){return n.__awaiter(this,void 0,void 0,(function*(){(()=>{n.__awaiter(this,void 0,void 0,(function*(){yield(0,o.BootStrapper)(this);const e=a.container.resolve(c);yield e.run(this)}))})()}))}}t.default=u,e.exports=u},655:(e,t,r)=>{r.r(t),r.d(t,{__assign:()=>i,__asyncDelegator:()=>m,__asyncGenerator:()=>b,__asyncValues:()=>w,__await:()=>g,__awaiter:()=>f,__classPrivateFieldGet:()=>j,__classPrivateFieldSet:()=>P,__createBinding:()=>p,__decorate:()=>c,__exportStar:()=>y,__extends:()=>o,__generator:()=>s,__importDefault:()=>x,__importStar:()=>O,__makeTemplateObject:()=>S,__metadata:()=>l,__param:()=>u,__read:()=>h,__rest:()=>a,__spread:()=>_,__spreadArrays:()=>v,__values:()=>d});var n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},n(e,t)};function o(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i=function(){return i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)};function a(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r}function c(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a}function u(e,t){return function(r,n){t(r,n,e)}}function l(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function f(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function c(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,c)}u((n=n.apply(e,t||[])).next())}))}function s(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}function p(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}function y(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||(t[r]=e[r])}function d(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a}function _(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]));return e}function v(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var i=arguments[t],a=0,c=i.length;a<c;a++,o++)n[o]=i[a];return n}function g(e){return this instanceof g?(this.v=e,this):new g(e)}function b(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,o=r.apply(e,t||[]),i=[];return n={},a("next"),a("throw"),a("return"),n[Symbol.asyncIterator]=function(){return this},n;function a(e){o[e]&&(n[e]=function(t){return new Promise((function(r,n){i.push([e,t,r,n])>1||c(e,t)}))})}function c(e,t){try{(r=o[e](t)).value instanceof g?Promise.resolve(r.value.v).then(u,l):f(i[0][2],r)}catch(e){f(i[0][3],e)}var r}function u(e){c("next",e)}function l(e){c("throw",e)}function f(e,t){e(t),i.shift(),i.length&&c(i[0][0],i[0][1])}}function m(e){var t,r;return t={},n("next"),n("throw",(function(e){throw e})),n("return"),t[Symbol.iterator]=function(){return this},t;function n(n,o){t[n]=e[n]?function(t){return(r=!r)?{value:g(e[n](t)),done:"return"===n}:o?o(t):t}:o}}function w(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=d(e),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,o){!function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)}(n,o,(t=e[r](t)).done,t.value)}))}}}function S(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function O(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function x(e){return e&&e.__esModule?e:{default:e}}function j(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)}function P(e,t,r){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,r),r}},5390:e=>{e.exports=require("@app/services")},4559:e=>{e.exports=require("homey")},5733:e=>{e.exports=require("reflect-metadata")},1789:e=>{e.exports=require("tsyringe")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n=r(9962);module.exports=n})();
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.7/app.js.map