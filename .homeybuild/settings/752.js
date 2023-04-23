(self.webpackChunk=self.webpackChunk||[]).push([[752],{5352:(e,t,a)=>{"use strict";var n=a(1600),r=a(4590);t.Z=void 0;var s=r(a(2784)),l=(0,n(a(175)).default)(s.createElement("path",{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");t.Z=l},8695:(e,t,a)=>{"use strict";var n;a.d(t,{L6:()=>r,zq:()=>s}),function(e){e.TargetTemperature="target_temperature",e.MeasureTemperature="measure_temperature",e.ThermostatOverride="thermostat_override"}(n||(n={}));const r=4,s=35},4746:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var n=a(5163);function r(e,t,a=null){return(0,n.mG)(this,void 0,void 0,(function*(){return yield new Promise(((n,r)=>{Homey.api(e,t,a,((e,t)=>{e?r(e):n(t)}))}))}))}},8681:(e,t,a)=>{"use strict";a.d(t,{M:()=>o,X:()=>i});var n=a(5163),r=a(6635),s=a(4746);const l=e=>(0,n.mG)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,s.Z)("PUT",`/plans/${e.id}`,t)})),o={fetchPlans:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/plans");return(0,r.sortBy)((0,r.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){const t=yield(0,s.Z)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/schedule");return e.temperatures=(0,r.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:l,removePlan:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield l(e),!0}))},i={fetchMode:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){return(yield(0,s.Z)("GET","/mode")).mode})),setMode:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("PUT","/mode",{mode:e})}))}},5030:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var n=a(331),r=a(2511),s=a(5223),l=a(436),o=a(2784);const i=(0,r.Z)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:a,title:r,actions:i,subBar:c}=e.children||{button:null,title:null,actions:null,subBar:null};return o.createElement(o.Fragment,null,o.createElement(n.Z,{position:"absolute",color:"primary",className:t.appBar},o.createElement(s.Z,{className:t.toolbar},e.button||a,o.createElement(l.Z,{variant:"h6",color:"inherit",noWrap:!0},e.title||r),o.createElement("div",{className:t.grow}),null!=i&&o.createElement("div",{className:t.buttons},i)),null!=c&&c))}))},7606:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(5163),r=a(2511),s=a(436),l=a(2784);const o=(0,r.Z)((e=>({text:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:a}=e,r=(0,n._T)(e,["classes","text"]);return l.createElement(s.Z,Object.assign({className:t.text,color:"textSecondary"},r),a)}))},3547:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(5163),r=a(7869),s=a(2784),l=a(9503);const o=e=>{var{classes:t}=e,a=(0,n._T)(e,["classes"]);return s.createElement(l.Z,null,s.createElement(r.Z,Object.assign({fullWidth:!0,margin:"normal"},a)))}},9503:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var n=a(2511),r=a(2784);const s=(0,n.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>r.createElement("div",{className:e.classes.inputContainer},e.children)))},7546:(e,t,a)=>{"use strict";a.d(t,{T2:()=>b,j2:()=>E});var n=a(5163),r=a(436),s=a(5256),l=a(1776),o=a(9378),i=a(1837),c=a(2511),d=a(4190),u=a(4882),m=a(2784),p=a(7267),v=a(1810),g=a(8402),y=a(7933);const f=e=>{const t=e.to.toString();return m.createElement(g.Z,Object.assign({},e,{component:t.match(/https/)?"a":y.rU,href:t}),e.children)},h=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),b=e=>{const[t,a]=m.useState(!1);return m.createElement(m.Fragment,null,m.createElement(Z,{open:t,onClose:()=>{a(!1)}}),m.createElement(E,{first:!0,onClick:()=>{a(!0)},icon:m.createElement(u.Z,null)}))},Z=(0,p.EN)((0,c.Z)(h)((e=>{const{classes:t}=e,a=[{type:"entry",to:"/",text:(0,v.Z)("menu.plans")},{to:"/temperatures",text:(0,v.Z)("menu.temperatures")},{to:"/schedules",text:(0,v.Z)("menu.schedules")},{to:"/settings",text:(0,v.Z)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,v.Z)("menu.help")}];return m.createElement(d.ZP,{open:e.open,onClose:e.onClose},m.createElement(r.Z,{className:t.text,variant:"h5",gutterBottom:!0},(0,v.Z)("menu.title")),m.createElement(r.Z,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.2-rc18"),m.createElement(s.Z,null),m.createElement(l.Z,null,a.map((a=>"Divider"===a.type?m.createElement(s.Z,null):m.createElement(f,{key:a.to,to:a.to,disabled:e.match.url===a.to,button:!0},m.createElement(o.Z,{primary:a.text,classes:{primary:e.match.url!==a.to?t.normal:t.selected}}))))))}))),E=(0,c.Z)(h)((e=>{const{classes:t,first:a,icon:r}=e,s=(0,n._T)(e,["classes","first","icon"]);return m.createElement(i.Z,Object.assign({className:a?t.firstButton:t.otherButton,color:"inherit"},s),r)}))},638:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(5163),r=a(2511),s=a(436),l=a(2784);const o=(0,r.Z)((e=>({headline:{marginTop:e.spacing(4),paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:a}=e,r=(0,n._T)(e,["classes","text"]);return l.createElement(s.Z,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},r),a)}))},3589:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var n=a(2511),r=a(2784);const s=(0,n.Z)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:a,body:n,paddingTop:s,paddingBottom:l}=e.children,o=l||"auto";return r.createElement(r.Fragment,null,r.createElement("div",{className:t.root},a,r.createElement("div",{className:t.body,style:{paddingTop:s,paddingBottom:o}},n)))}))},2752:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>x});var n=a(7277),r=a(2511),s=a(5352),l=a(9166),o=a(2784),i=a(7267),c=a(3314),d=a(5030),u=a(7606),m=a(7546),p=a(5806),v=a(2938),g=a(8695),y=a(1810),f=a(3547);const h=(0,r.Z)((e=>({planOverride:{marginBottom:e.spacing(2)}})))((e=>o.createElement(o.Fragment,null,o.createElement("div",{className:e.classes.planOverride},o.createElement(p.Z,{style:{marginLeft:0},control:o.createElement(v.Z,{checked:e.enabled,onChange:(t,a)=>{e.setOverride(e.mode,a?0===e.targetTemperature?16:e.targetTemperature:0)}}),label:e.text,labelPlacement:"end"}),o.createElement(f.Z,{label:(0,y.Z)("plan.target.label"),placeholder:(0,y.Z)("plan.target.placeholder"),disabled:!e.enabled,hidden:!e.enabled,type:"number",InputProps:{inputProps:{min:g.L6,max:g.zq,step:.5}},value:e.targetTemperature,onChange:t=>{e.setOverride(e.mode,parseFloat(t.target.value))}})))));var b=a(638),Z=a(3589),E=a(1105);const x=(0,i.EN)((0,r.Z)((e=>({resetPadding:{paddingBottom:100,paddingLeft:0,paddingRight:0}})))((e=>{const{history:t,classes:a}=e,{plan:r}=(0,E.g0)(e.match.params.id),{isDirty:i,updateOverride:p}=(0,E._b)(),{undo:v,commit:g}=(0,E.k6)(),f=e=>{const t=null!=r.overrides?r.overrides[c.pl[e]]||r.overrides[e]:null;return{mode:e,enabled:null!=t&&0!==t.targetTemperature,targetTemperature:null!=t?t.targetTemperature:0}};return o.createElement(Z.Z,null,{header:o.createElement(d.Z,null,{title:(0,y.Z)("overrides.title"),button:o.createElement(m.j2,{first:!0,onClick:function(){v(),t.replace({pathname:`/plans/${r.id}`,state:!0})},icon:i?o.createElement(l.Z,null):o.createElement(s.Z,null)}),actions:o.createElement(o.Fragment,null,i&&o.createElement(n.Z,{color:"inherit",onClick:function(){g(),t.replace({pathname:`/plans/${r.id}`,state:!0})}},(0,y.Z)("schedule.save")))}),paddingTop:50,body:o.createElement("div",{className:a.resetPadding},o.createElement(b.Z,{text:(0,y.Z)("overrides.section")}),o.createElement(u.Z,{text:(0,y.Z)("overrides.text")}),o.createElement(h,Object.assign({text:(0,y.Z)("overrides.athome"),setOverride:p},f(c.pl.DayAtHome))),o.createElement(h,Object.assign({text:(0,y.Z)("overrides.away"),setOverride:p},f(c.pl.DayAway))),o.createElement(h,Object.assign({text:(0,y.Z)("overrides.sleeping"),setOverride:p},f(c.pl.Sleep))),o.createElement(h,Object.assign({text:(0,y.Z)("overrides.holiday"),setOverride:p},f(c.pl.Holiday))),o.createElement(h,Object.assign({text:(0,y.Z)("overrides.outofseason"),setOverride:p},f(c.pl.OutOfSeason))))})})))},1105:(e,t,a)=>{"use strict";a.d(t,{P5:()=>i,Zk:()=>d,_b:()=>c,g0:()=>m,k6:()=>o});var n=a(2784),r=a(4481),s=a(8681),l=a(2958);const o=()=>{const e=(0,l.dr)(),t=(0,l.QG)("loaded"),a=(0,n.useCallback)((()=>e({type:"savePoint"})),[e]),r=(0,n.useCallback)((()=>e({type:"undo"})),[e]),s=(0,n.useCallback)((()=>e({type:"commit"})),[e]);return(0,n.useEffect)((()=>{a()}),[t]),{savePoint:a,undo:r,commit:s}},i=()=>{const e=(0,l.dr)();return{setName:(0,n.useCallback)((t=>e({type:"setName",name:t.target.value})),[e]),setDescription:(0,n.useCallback)((t=>e({type:"setDescription",description:t.target.value})),[e]),toggleState:(0,n.useCallback)((()=>e({type:"toggleEnabled"})),[e]),toggleZone:(0,n.useCallback)((t=>e({type:"toggleZone",zone:t})),[e]),toggleDevice:(0,n.useCallback)((t=>e({type:"toggleDevice",device:t})),[e])}},c=()=>{const e=(0,l.dr)(),[t,a]=(0,n.useState)(!1),r=(0,n.useCallback)(((t,n)=>{e({type:"setOverride",mode:t,temperature:n}),a(!0)}),[e]),s=(0,n.useCallback)((t=>{e({type:"clearOverride",mode:t}),a(!0)}),[e]),o=(0,n.useCallback)(((e,t)=>{0===t?s(e):r(e,t)}),[e]);return(0,n.useEffect)((()=>{a(!1)}),[]),{isDirty:t,setOverride:r,clearOverride:s,updateOverride:o}},d=()=>{const[e,t]=(0,n.useState)(!1),a=(0,l.dr)(),r=(0,n.useCallback)((e=>{a({type:"selectDay",day:e})}),[a]),s=(0,l.QG)("selectedDay"),o=(0,l.QG)("setPoint"),i=(0,n.useCallback)(((e,n)=>{null!=n&&n.length>0&&(t(!0),a({type:"copyDays",source:e,targets:n}))}),[a]),c=(0,n.useCallback)((e=>{t(!0),a({type:"removeSetPoint",index:e})}),[a]),d=(0,n.useCallback)((e=>{a({type:"loadSetPoint",setPoint:e})}),[a]),u=(0,n.useCallback)((e=>{a({type:"newSetPoint",day:e})}),[a]),m=(0,n.useCallback)((e=>{-1===e.index?a({type:"addSetPoint",setPoint:e}):a({type:"updateSetPoint",setPoint:e})}),[a]),p=(0,n.useCallback)((e=>a({type:"setStart",start:e})),[a]),v=(0,n.useCallback)((e=>a({type:"setTargetTemperature",temperature:parseFloat(e.target.value)})),[a]);return(0,n.useEffect)((()=>{t(!1)}),[]),{setDirty:t,isDirty:e,selectedDay:s,setPoint:o,copyDays:i,removeSetPoint:c,loadSetPoint:d,newSetPoint:u,selectDay:r,saveSetPoint:m,setStart:p,setTargetTemperature:v}};let u=!1;const m=(e,t=!0)=>{const a=(0,l.dr)(),o=(0,l.QG)("plan"),i=(0,l.QG)("loaded"),c=(0,l.QG)("dirty");if(!i||!t)if(null!=e&&"new"!==e||u){if(!u)throw s.M.fetchPlanById(e).then((e=>{u=!0,a({type:"loadPlan",plan:e})}))}else u=!0,a({type:"loadPlan",plan:{id:r(),enabled:!1,name:"",zones:[],devices:[],schedule:[],overrides:void 0}});return(0,n.useEffect)((()=>()=>{u=!1}),[e,t]),{plan:o,isDirty:c,loaded:i}}},8725:e=>{for(var t=[],a=0;a<256;++a)t[a]=(a+256).toString(16).substr(1);e.exports=function(e,a){var n=a||0,r=t;return[r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]]].join("")}},9157:e=>{var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var a=new Uint8Array(16);e.exports=function(){return t(a),a}}else{var n=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}},4481:(e,t,a)=>{var n,r,s=a(9157),l=a(8725),o=0,i=0;e.exports=function(e,t,a){var c=t&&a||0,d=t||[],u=(e=e||{}).node||n,m=void 0!==e.clockseq?e.clockseq:r;if(null==u||null==m){var p=s();null==u&&(u=n=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==m&&(m=r=16383&(p[6]<<8|p[7]))}var v=void 0!==e.msecs?e.msecs:(new Date).getTime(),g=void 0!==e.nsecs?e.nsecs:i+1,y=v-o+(g-i)/1e4;if(y<0&&void 0===e.clockseq&&(m=m+1&16383),(y<0||v>o)&&void 0===e.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");o=v,i=g,r=m;var f=(1e4*(268435455&(v+=122192928e5))+g)%4294967296;d[c++]=f>>>24&255,d[c++]=f>>>16&255,d[c++]=f>>>8&255,d[c++]=255&f;var h=v/4294967296*1e4&268435455;d[c++]=h>>>8&255,d[c++]=255&h,d[c++]=h>>>24&15|16,d[c++]=h>>>16&255,d[c++]=m>>>8|128,d[c++]=255&m;for(var b=0;b<6;++b)d[c+b]=u[b];return t||l(d)}}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.2-rc18/settings/752.js.map