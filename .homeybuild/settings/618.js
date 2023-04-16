(self.webpackChunk=self.webpackChunk||[]).push([[618],{1634:(e,t)=>{"use strict";t.Z=void 0;t.Z={50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca28",500:"#ffc107",600:"#ffb300",700:"#ffa000",800:"#ff8f00",900:"#ff6f00",A100:"#ffe57f",A200:"#ffd740",A400:"#ffc400",A700:"#ffab00"}},9406:(e,t)=>{"use strict";t.Z=void 0;t.Z={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"}},5126:(e,t)=>{"use strict";t.Z=void 0;t.Z={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"}},3434:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var a=n(7896),r=n(9740),s=n(2784),o=n(6277),i=n(2511);const l=(0,n(3752).Z)(s.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var c=s.forwardRef((function(e,t){var n,i=e.alt,c=e.children,d=e.classes,u=e.className,m=e.component,f=void 0===m?"div":m,p=e.imgProps,g=e.sizes,v=e.src,h=e.srcSet,Z=e.variant,b=void 0===Z?"circular":Z,E=(0,r.Z)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),y=function(e){var t=e.src,n=e.srcSet,a=s.useState(!1),r=a[0],o=a[1];return s.useEffect((function(){if(t||n){o(!1);var e=!0,a=new Image;return a.src=t,a.srcSet=n,a.onload=function(){e&&o("loaded")},a.onerror=function(){e&&o("error")},function(){e=!1}}}),[t,n]),r}({src:v,srcSet:h}),x=v||h,w=x&&"error"!==y;return n=w?s.createElement("img",(0,a.Z)({alt:i,src:v,srcSet:h,sizes:g,className:d.img},p)):null!=c?c:x&&i?i[0]:s.createElement(l,{className:d.fallback}),s.createElement(f,(0,a.Z)({className:(0,o.Z)(d.root,d.system,d[b],u,!w&&d.colorDefault),ref:t},E),n)}));const d=(0,i.Z)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(c)},3806:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var a=n(7896),r=n(9740),s=n(2784),o=n(6277),i=n(2511),l=n(413),c=s.forwardRef((function(e,t){var n=e.classes,i=e.className,c=(0,r.Z)(e,["classes","className"]),d=s.useContext(l.Z);return s.createElement("div",(0,a.Z)({className:(0,o.Z)(n.root,i,"flex-start"===d.alignItems&&n.alignItemsFlexStart),ref:t},c))}));const d=(0,i.Z)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(c)},9520:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var a=n(7896),r=n(9740),s=n(2784),o=n(6277),i=n(2511),l=s.forwardRef((function(e,t){var n=e.classes,i=e.className,l=(0,r.Z)(e,["classes","className"]);return s.createElement("div",(0,a.Z)({className:(0,o.Z)(n.root,i),ref:t},l))}));l.muiName="ListItemSecondaryAction";const c=(0,i.Z)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(l)},2231:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var a=n(9740),r=n(6666),s=n(7896),o=n(2784),i=n(6277),l=n(2511),c=n(8402),d=o.forwardRef((function(e,t){var n,r=e.classes,l=e.className,d=e.component,u=void 0===d?"li":d,m=e.disableGutters,f=void 0!==m&&m,p=e.ListItemClasses,g=e.role,v=void 0===g?"menuitem":g,h=e.selected,Z=e.tabIndex,b=(0,a.Z)(e,["classes","className","component","disableGutters","ListItemClasses","role","selected","tabIndex"]);return e.disabled||(n=void 0!==Z?Z:-1),o.createElement(c.Z,(0,s.Z)({button:!0,role:v,tabIndex:n,component:u,selected:h,disableGutters:f,classes:(0,s.Z)({dense:r.dense},p),className:(0,i.Z)(r.root,l,h&&r.selected,!f&&r.gutters),ref:t},b))}));const u=(0,l.Z)((function(e){return{root:(0,s.Z)({},e.typography.body1,(0,r.Z)({minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",width:"auto",overflow:"hidden",whiteSpace:"nowrap"},e.breakpoints.up("sm"),{minHeight:"auto"})),gutters:{},selected:{},dense:(0,s.Z)({},e.typography.body2,{minHeight:"auto"})}}),{name:"MuiMenuItem"})(d)},4087:(e,t,n)=>{e.exports=n.p+"icon_black.svg?5136879a03a13f9fb18f241b081f38cb"},4746:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var a=n(5163);function r(e,t,n=null){return(0,a.mG)(this,void 0,void 0,(function*(){return yield new Promise(((a,r)=>{Homey.api(e,t,n,((e,t)=>{e?r(e):a(t)}))}))}))}},3834:(e,t,n)=>{"use strict";n.d(t,{i:()=>o});var a=n(5163),r=n(6635),s=n(4746);const o={fetchHeatingDevices:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/devices"),t=(0,r.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},8681:(e,t,n)=>{"use strict";n.d(t,{M:()=>i,X:()=>l});var a=n(5163),r=n(6635),s=n(4746);const o=e=>(0,a.mG)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,s.Z)("PUT",`/plans/${e.id}`,t)})),i={fetchPlans:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/plans");return(0,r.sortBy)((0,r.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){const t=yield(0,s.Z)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/schedule");return e.temperatures=(0,r.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:o,removePlan:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield o(e),!0}))},l={fetchMode:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){return(yield(0,s.Z)("GET","/mode")).mode})),setMode:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("PUT","/mode",{mode:e})}))}},2094:(e,t,n)=>{"use strict";n.d(t,{Ls:()=>f,yU:()=>h,xn:()=>m,Si:()=>g,rV:()=>v,HT:()=>p});var a=n(3834),r=n(8681),s=n(2817),o=n(5163),i=n(2784);const l=new Map,c="Loading...";function d(e,t){return(n=!1,a=!1)=>{const r=l.get(e);let[s,d]=[null,null];n&&([s,d]=i.useState(r!==c?r:null));const[u,m]=i.useState(!1);function f(n=!1){if(null==l.get(e)||n)throw l.set(e,c),function(e,t){return(0,o.mG)(this,void 0,void 0,(function*(){try{t(yield e())}catch(e){t((()=>{throw e}))}}))}(t,(t=>{"function"==typeof t?l.set(e,t(l.get(e))):l.set(e,t)})).catch((e=>{m(!!a||(()=>{throw e}))}))}return f(),(0,i.useEffect)((()=>()=>{l.delete(e)}),[]),{[e]:n?s:r,[`set${e.charAt(0).toUpperCase()+e.slice(1)}`]:n?d:function(){},[`load${e.charAt(0).toUpperCase()+e.slice(1)}`]:f,[`load${e.charAt(0).toUpperCase()+e.slice(1)}Failed`]:u}}}var u=n(8516);const m=d("plans",r.M.fetchPlans),f=d("devices",a.i.fetchHeatingDevices),p=d("zones",u.v.fetchHeatingZones),g=d("scheduleInformation",r.M.fetchSchedule),v=d("settings",s.w.fetchSettings),h=d("mode",r.X.fetchMode)},2817:(e,t,n)=>{"use strict";n.d(t,{w:()=>s});var a=n(5163),r=n(4746);const s={fetchSettings:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){return yield(0,r.Z)("GET","/settings")})),updateSettings:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return yield(0,r.Z)("PUT","/settings",e)}))}},8516:(e,t,n)=>{"use strict";n.d(t,{v:()=>o});var a=n(5163),r=n(6635),s=n(4746);const o={fetchHeatingZones:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/zones"),t=(0,r.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},5030:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(331),r=n(2511),s=n(5223),o=n(436),i=n(2784);const l=(0,r.Z)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:n,title:r,actions:l,subBar:c}=e.children||{button:null,title:null,actions:null,subBar:null};return i.createElement(i.Fragment,null,i.createElement(a.Z,{position:"absolute",color:"primary",className:t.appBar},i.createElement(s.Z,{className:t.toolbar},e.button||n,i.createElement(o.Z,{variant:"h6",color:"inherit",noWrap:!0},e.title||r),i.createElement("div",{className:t.grow}),null!=l&&i.createElement("div",{className:t.buttons},l)),null!=c&&c))}))},7606:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(5163),r=n(2511),s=n(436),o=n(2784);const i=(0,r.Z)((e=>({text:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,r=(0,a._T)(e,["classes","text"]);return o.createElement(s.Z,Object.assign({className:t.text,color:"textSecondary"},r),n)}))},3547:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(5163),r=n(7869),s=n(2784),o=n(9503);const i=e=>{var{classes:t}=e,n=(0,a._T)(e,["classes"]);return s.createElement(o.Z,null,s.createElement(r.Z,Object.assign({fullWidth:!0,margin:"normal"},n)))}},9503:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var a=n(2511),r=n(2784);const s=(0,a.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>r.createElement("div",{className:e.classes.inputContainer},e.children)))},7546:(e,t,n)=>{"use strict";n.d(t,{T2:()=>E,j2:()=>x});var a=n(5163),r=n(436),s=n(5256),o=n(1776),i=n(9378),l=n(1837),c=n(2511),d=n(4190),u=n(4882),m=n(2784),f=n(7267),p=n(1810),g=n(8402),v=n(7933);function h(e){var{innerRef:t}=e,n=(0,a._T)(e,["innerRef"]);return n.to.toString().match(/https/)?m.createElement("a",Object.assign({onClick:()=>Homey.openURL(n.to.toString())},n),n.children):m.createElement(v.rU,Object.assign({},n))}const Z=e=>m.createElement(g.Z,Object.assign({},e,{component:h}),e.children),b=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),E=e=>{const[t,n]=m.useState(!1);return m.createElement(m.Fragment,null,m.createElement(y,{open:t,onClose:()=>{n(!1)}}),m.createElement(x,{first:!0,onClick:()=>{n(!0)},icon:m.createElement(u.Z,null)}))},y=(0,f.EN)((0,c.Z)(b)((e=>{const{classes:t}=e,n=[{type:"entry",to:"/",text:(0,p.Z)("menu.plans")},{to:"/temperatures",text:(0,p.Z)("menu.temperatures")},{to:"/schedules",text:(0,p.Z)("menu.schedules")},{to:"/settings",text:(0,p.Z)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,p.Z)("menu.help")}];return m.createElement(d.ZP,{open:e.open,onClose:e.onClose},m.createElement(r.Z,{className:t.text,variant:"h5",gutterBottom:!0},(0,p.Z)("menu.title")),m.createElement(r.Z,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.0-rc7"," (","v2.0.0-rc7",")"),m.createElement(s.Z,null),m.createElement(o.Z,null,n.map((n=>"Divider"===n.type?m.createElement(s.Z,null):m.createElement(Z,{key:n.to,to:n.to,disabled:e.match.url===n.to,button:!0},m.createElement(i.Z,{primary:n.text,classes:{primary:e.match.url!==n.to?t.normal:t.selected}}))))))}))),x=(0,c.Z)(b)((e=>{const{classes:t,first:n,icon:r}=e,s=(0,a._T)(e,["classes","first","icon"]);return m.createElement(l.Z,Object.assign({className:n?t.firstButton:t.otherButton,color:"inherit"},s),r)}))},638:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(5163),r=n(2511),s=n(436),o=n(2784);const i=(0,r.Z)((e=>({headline:{marginTop:e.spacing(4),paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,r=(0,a._T)(e,["classes","text"]);return o.createElement(s.Z,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},r),n)}))},4397:(e,t,n)=>{"use strict";n.d(t,{lt:()=>g,xj:()=>p});var a=n(436),r=n(2511),s=n(3434),o=n(3660),i=n(5126),l=n(2784),c=n(4901);const d=n(4087),u=35,m=e=>({root:{fontSize:"1em",float:"left",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",width:45},avatar:{width:u,height:u,lineHeight:u,position:"relative",overflow:"hidden"},img:{width:u,height:u,zIndex:2,position:"absolute",left:0,bottom:0},fill:{display:"block",width:u,height:33,zIndex:1,position:"absolute",left:0,bottom:1}});function f(e,t){return(Math.round(e*Math.pow(10,t))/Math.pow(10,t)).toFixed(t)}const p=(0,r.Z)(m)((e=>{const{value:t,classes:n,fill:r}=e;let{digits:s}=e;const c=(100===r?i.Z:o.Z)[500];return null==s&&(s=2),l.createElement("div",{className:n.root},l.createElement("div",{className:n.avatar},l.createElement("object",{className:n.img,data:d,type:"image/svg+xml"}),l.createElement("span",{style:{height:`calc(${r}% - 5px)`,background:c},className:n.fill})),l.createElement(a.Z,{variant:"body1",color:"textSecondary",component:"div"},f(t,s),"°"))})),g=(0,r.Z)(m)((e=>{const{value:t}=e;return l.createElement(s.Z,{style:{padding:"25px",background:(0,c.h)(t),fontSize:"1em"}},f(t,1),"°")}))},4901:(e,t,n)=>{"use strict";n.d(t,{h:()=>i});var a=n(1634),r=n(6144),s=n(3660),o=n(9406);const i=e=>{const t=Math.round(100*(n=Math.min(Math.max(16,e),24),16,24,1,8,Math.floor(7*(n-16)/8+1))+100);var n;return e<=16?r.Z[t]:e<=18.5?o.Z[t]:e<=20.5?a.Z[t]:s.Z[t]}},3589:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var a=n(2511),r=n(2784);const s=(0,a.Z)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:n,body:a,paddingTop:s,paddingBottom:o}=e.children,i=o||"auto";return r.createElement(r.Fragment,null,r.createElement("div",{className:t.root},n,r.createElement("div",{className:t.body,style:{paddingTop:s,paddingBottom:i}},a)))}))},618:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>N});var a=n(2494),r=n(8146),s=n(2940),o=n(2231),i=n(3806),l=n(5256),c=n(1776),d=n(8402),u=n(9520),m=n(9378),f=n(2511),p=n(2784),g=n(9330),v=n(2094),h=n(5030),Z=n(7606),b=n(3547),E=n(9503),y=n(7546),x=n(638),w=n(4397),S=n(1810),T=n(3589);const N=(0,f.Z)((e=>({list:{marginTop:0,marginBottom:e.spacing(2)}})))((e=>{const{classes:t}=e,{scheduleInformation:n}=(0,v.Si)();function f(e){if(e.thermostatMode!==g.bc.Automatic)return(0,S.Z)(`ThermostatMode.${e.thermostatMode}`);if(e.conflictingPlans.length>1){const t=e.conflictingPlans.filter((t=>e.plan.id!==t.id)).map((e=>e.name)).join(", ");return`${e.plan.name} (${t})`}return e.plan.name}return p.createElement(T.Z,null,{header:p.createElement(h.Z,null,{title:(0,S.Z)("temperatures.title"),button:p.createElement(y.T2,null)}),paddingTop:50,body:p.createElement(p.Fragment,null,p.createElement(x.Z,{text:(0,S.Z)("temperatures.schedule")}),p.createElement(E.Z,null,p.createElement(a.Z,{className:t.formControl,fullWidth:!0},p.createElement(r.Z,null,(0,S.Z)("temperatures.mode")),p.createElement(s.Z,{fullWidth:!0,disabled:!0,value:n.mode},[0,1,2,3,4,5].map((e=>p.createElement(o.Z,{key:e,value:e},(0,S.Z)(`Modes.${e}`))))))),n.nextDate&&p.createElement(b.Z,{label:(0,S.Z)("temperatures.next"),type:"datetime-local",value:(e=>{if(null==e)return"";const t=new Date(e),n=e=>(e<10?"0":"")+e;return t.getFullYear()+"-"+n(t.getMonth()+1)+"-"+n(t.getDate())+"T"+n(t.getHours())+":"+n(t.getMinutes())+":"+n(t.getSeconds())})(n.nextDate),disabled:!0}),p.createElement(x.Z,{text:(0,S.Z)("temperatures.list.title")}),p.createElement(Z.Z,{text:(0,S.Z)("temperatures.list.text")}),0===n.temperatures.length?p.createElement(Z.Z,{style:{paddingTop:16},text:(0,S.Z)("temperatures.list.empty")}):p.createElement(c.Z,{className:t.list},n.temperatures.length>0&&p.createElement(l.Z,null),n.temperatures.map((e=>{return p.createElement(p.Fragment,{key:e.device.id+e.plan.id},p.createElement(d.Z,null,p.createElement(i.Z,null,p.createElement(w.lt,{value:e.targetTemperature})),p.createElement(m.Z,{primary:e.device.name,secondary:f(e)}),p.createElement(u.Z,{style:{paddingRight:16}},p.createElement(w.xj,{value:e.temperature||e.targetTemperature,fill:(t=e.temperature||e.targetTemperature,n=e.targetTemperature,t>n?100:Math.round(t/n*100))}))),p.createElement(l.Z,null));var t,n}))))})}))}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc7/settings/618.js.map