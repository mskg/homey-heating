"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[452],{4746:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(5163);function a(e,t,n=null){return(0,o.mG)(this,void 0,void 0,(function*(){return yield new Promise(((o,a)=>{Homey.api(e,t,n,((e,t)=>{e?a(e):o(t)}))}))}))}},3834:(e,t,n)=>{n.d(t,{i:()=>i});var o=n(5163),a=n(6635),s=n(4746);const i={fetchHeatingDevices:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/devices"),t=(0,a.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},8681:(e,t,n)=>{n.d(t,{M:()=>r,X:()=>l});var o=n(5163),a=n(6635),s=n(4746);const i=e=>(0,o.mG)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,s.Z)("PUT",`/plans/${e.id}`,t)})),r={fetchPlans:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/plans");return(0,a.sortBy)((0,a.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){const t=yield(0,s.Z)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/schedule");return e.temperatures=(0,a.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:i,removePlan:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield i(e),!0}))},l={fetchMode:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){return(yield(0,s.Z)("GET","/mode")).mode})),setMode:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("PUT","/mode",{mode:e})}))}},2094:(e,t,n)=>{n.d(t,{Ls:()=>p,yU:()=>f,xn:()=>m,Si:()=>g,rV:()=>h,HT:()=>v});var o=n(3834),a=n(8681),s=n(2817),i=n(5163),r=n(2784);const l=new Map,c="Loading...";function d(e,t){return(n=!1,o=!1)=>{const a=l.get(e);let[s,d]=[null,null];n&&([s,d]=r.useState(a!==c?a:null));const[u,m]=r.useState(!1);function p(n=!1){if(null==a||a===c||n)throw l.set(e,c),function(e,t){return(0,i.mG)(this,void 0,void 0,(function*(){try{t(yield e())}catch(e){t((()=>{throw e}))}}))}(t,(t=>{"function"==typeof t?l.set(e,t(l.get(e))):l.set(e,t)})).catch((e=>{m(!!o||(()=>{throw e}))}))}return p(),(0,r.useEffect)((()=>()=>{l.delete(e)}),[]),{[e]:n?s:a,[`set${e.charAt(0).toUpperCase()+e.slice(1)}`]:n?d:function(){},[`load${e.charAt(0).toUpperCase()+e.slice(1)}`]:p,[`load${e.charAt(0).toUpperCase()+e.slice(1)}Failed`]:u}}}var u=n(8516);const m=d("plans",a.M.fetchPlans),p=d("devices",o.i.fetchHeatingDevices),v=d("zones",u.v.fetchHeatingZones),g=d("scheduleInformation",a.M.fetchSchedule),h=d("settings",s.w.fetchSettings),f=d("mode",a.X.fetchMode)},2817:(e,t,n)=>{n.d(t,{w:()=>s});var o=n(5163),a=n(4746);const s={fetchSettings:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,a.Z)("GET","/settings")})),updateSettings:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,a.Z)("PUT","/settings",e)}))}},8516:(e,t,n)=>{n.d(t,{v:()=>i});var o=n(5163),a=n(6635),s=n(4746);const i={fetchHeatingZones:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/zones"),t=(0,a.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},5030:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(331),a=n(2511),s=n(5223),i=n(436),r=n(2784);const l=(0,a.Z)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:n,title:a,actions:l,subBar:c}=e.children||{button:null,title:null,actions:null,subBar:null};return r.createElement(r.Fragment,null,r.createElement(o.Z,{position:"absolute",color:"primary",className:t.appBar},r.createElement(s.Z,{className:t.toolbar},e.button||n,r.createElement(i.Z,{variant:"h6",color:"inherit",noWrap:!0},e.title||a),r.createElement("div",{className:t.grow}),null!=l&&r.createElement("div",{className:t.buttons},l)),null!=c&&c))}))},7606:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(5163),a=n(2511),s=n(436),i=n(2784);const r=(0,a.Z)((e=>({text:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,a=(0,o._T)(e,["classes","text"]);return i.createElement(s.Z,Object.assign({className:t.text,color:"textSecondary"},a),n)}))},7546:(e,t,n)=>{n.d(t,{T2:()=>y,j2:()=>b});var o=n(5163),a=n(436),s=n(5256),i=n(1776),r=n(9378),l=n(1837),c=n(2511),d=n(4190),u=n(4882),m=n(2784),p=n(7267),v=n(1810),g=n(8402),h=n(7933);const f=e=>{const t=e.to.toString();return m.createElement(g.Z,Object.assign({},e,{component:t.match(/https/)?"a":h.rU,href:t}),e.children)},Z=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),y=e=>{const[t,n]=m.useState(!1);return m.createElement(m.Fragment,null,m.createElement(E,{open:t,onClose:()=>{n(!1)}}),m.createElement(b,{first:!0,onClick:()=>{n(!0)},icon:m.createElement(u.Z,null)}))},E=(0,p.EN)((0,c.Z)(Z)((e=>{const{classes:t}=e,n=[{type:"entry",to:"/",text:(0,v.Z)("menu.plans")},{to:"/temperatures",text:(0,v.Z)("menu.temperatures")},{to:"/schedules",text:(0,v.Z)("menu.schedules")},{to:"/settings",text:(0,v.Z)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,v.Z)("menu.help")}];return m.createElement(d.ZP,{open:e.open,onClose:e.onClose},m.createElement(a.Z,{className:t.text,variant:"h5",gutterBottom:!0},(0,v.Z)("menu.title")),m.createElement(a.Z,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.4-rc20"),m.createElement(s.Z,null),m.createElement(i.Z,null,n.map((n=>"Divider"===n.type?m.createElement(s.Z,null):m.createElement(f,{key:n.to,to:n.to,disabled:e.match.url===n.to,button:!0},m.createElement(r.Z,{primary:n.text,classes:{primary:e.match.url!==n.to?t.normal:t.selected}}))))))}))),b=(0,c.Z)(Z)((e=>{const{classes:t,first:n,icon:a}=e,s=(0,o._T)(e,["classes","first","icon"]);return m.createElement(l.Z,Object.assign({className:n?t.firstButton:t.otherButton,color:"inherit"},s),a)}))},638:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(5163),a=n(2511),s=n(436),i=n(2784);const r=(0,a.Z)((e=>({headline:{marginTop:e.spacing(4),paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,a=(0,o._T)(e,["classes","text"]);return i.createElement(s.Z,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},a),n)}))},3589:(e,t,n)=>{n.d(t,{Z:()=>s});var o=n(2511),a=n(2784);const s=(0,o.Z)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:n,body:o,paddingTop:s,paddingBottom:i}=e.children,r=i||"auto";return a.createElement(a.Fragment,null,a.createElement("div",{className:t.root},n,a.createElement("div",{className:t.body,style:{paddingTop:s,paddingBottom:r}},o)))}))},452:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var o=n(2511),a=n(3826),s=n(2784),i=n(7267),r=n(2094),l=n(5030),c=n(7606),d=n(7546),u=n(638),m=n(1810),p=n(3589);const v=s.lazy((()=>Promise.all([n.e(786),n.e(778)]).then(n.bind(n,6778)))),g=(0,a.RM)((0,i.EN)((0,o.Z)((e=>({list:{marginTop:0,marginBottom:e.spacing(2)}})))((e=>{const{plans:t}=(0,r.xn)();return s.createElement(p.Z,null,{header:s.createElement(l.Z,{title:(0,m.Z)("menu.schedules"),button:s.createElement(d.T2,null)}),paddingTop:50,paddingBottom:50,body:s.createElement(s.Fragment,null,0===t.length?s.createElement(c.Z,{style:{paddingTop:16},text:(0,m.Z)("plans.plans.empty")}):t.map((e=>s.createElement(s.Fragment,{key:e.id},s.createElement(u.Z,{text:e.name}),s.createElement(v,{plan:e})))))})}))))}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.4-rc20/settings/452.js.map