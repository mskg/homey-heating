module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=66)}({10:function(e,t){e.exports=require("./model")},66:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(67)),n(r(68)),n(r(69)),n(r(70))},67:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,a){function u(e){try{d(n.next(e))}catch(e){a(e)}}function i(e){try{d(n.throw(e))}catch(e){a(e)}}function d(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(u,i)}d((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0}),t.AsyncThrottle=function(e,t,r=1){let o=0,a=0;return function(...u){return n(this,void 0,void 0,function*(){return new Promise((n,i)=>{const d=Date.now();d-a>1?(o=t,a=d):o<r?o++:(a+=t,o=1),setTimeout(()=>{n(e.apply(this,u))},a-d)})})}}},68:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Mutex=class{constructor(){this.locking=Promise.resolve(()=>null)}lock(){let e;const t=new Promise(t=>e=(()=>{t()})),r=this.locking.then(()=>e);return this.locking=this.locking.then(()=>t),r}}},69:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Retry=function e(t,r,n=5,o=1e3,a=!1,u=1e4){return new Promise((i,d)=>{t().then(i).catch(s=>{null!=r&&r.error(`Retry action ${n} times, waiting for ${o}`,s),n-1<=0?d(s):setTimeout(()=>{const s=a?Math.min(u,2*o):o;e(t,r,n-1,s,a,u).then(i,d)},o)})})}},70:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(10);t.WARM=20.5,t.INTERMEDIATE=18.5,t.COOL=16;const o=[{day:n.Day.Monday,hour:0,minute:0,targetTemperature:16}];t.DEFAULT_HEATING_PLAN=[{id:"1",name:"Living Room",enabled:!0,schedule:function(){const e=[];for(const r of[n.Day.Monday,n.Day.Tuesday,n.Day.Wednesday,n.Day.Thursday,n.Day.Friday])e.push({day:r,hour:17,minute:0,targetTemperature:t.INTERMEDIATE}),e.push({day:r,hour:18,minute:30,targetTemperature:t.WARM}),e.push({day:r,hour:23,minute:0,targetTemperature:t.COOL});for(const r of[n.Day.Saturday,n.Day.Sunday])e.push({day:r,hour:9,minute:0,targetTemperature:t.WARM}),e.push({day:r,hour:23,minute:30,targetTemperature:t.COOL});return e}(),zones:["Living Room"],overrides:{DayAtHome:{targetTemperature:17}}},{id:"2",name:"Bathroom",enabled:!0,schedule:function(){const e=[];for(const r of[n.Day.Monday,n.Day.Tuesday,n.Day.Wednesday,n.Day.Thursday,n.Day.Friday])e.push({day:r,hour:6,minute:0,targetTemperature:t.WARM}),e.push({day:r,hour:9,minute:0,targetTemperature:t.COOL});for(const r of[n.Day.Saturday,n.Day.Sunday])e.push({day:r,hour:9,minute:0,targetTemperature:t.INTERMEDIATE}),e.push({day:r,hour:23,minute:30,targetTemperature:t.COOL});return e}(),zones:["Bathroom"],overrides:{DayAway:{targetTemperature:17}}},{id:"3",name:"Utility",enabled:!0,schedule:function(){const e=[];for(const r of[n.Day.Monday,n.Day.Tuesday,n.Day.Wednesday,n.Day.Thursday,n.Day.Friday])e.push({day:r,hour:17,minute:0,targetTemperature:t.INTERMEDIATE}),e.push({day:r,hour:23,minute:0,targetTemperature:t.COOL});for(const r of[n.Day.Saturday,n.Day.Sunday])e.push({day:r,hour:9,minute:0,targetTemperature:t.INTERMEDIATE}),e.push({day:r,hour:23,minute:30,targetTemperature:t.COOL});return e}(),zones:["Kitchen","Study"],overrides:{Holiday:{targetTemperature:17}}},{id:"4",name:"Bedroom",enabled:!0,schedule:o,zones:["Bedroom"],overrides:{Sleep:{targetTemperature:17}}}],t.DEFAULT_HEATING_ZONES=[{id:"Bathroom",name:"Bathroom"},{id:"Bedroom",name:"Bedroom"},{id:"Kitchen",name:"Kitchen"},{id:"Living Room",name:"Living Room"},{id:"Study",name:"Study"}],t.DEFAULT_HEATING_DEVICES=[{id:"Bad",name:"Bad"},{id:"Bett",name:"Bett"},{id:"Flur",name:"Flur"},{id:"Tür",name:"Tür"},{id:"Mitte",name:"Mitte"},{id:"Sofa",name:"Sofa"},{id:"Tisch",name:"Tisch"},{id:"Büro",name:"Büro"}]}});
//# sourceMappingURL=helper.js.map