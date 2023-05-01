"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[577],{4746:(e,t,n)=>{n.d(t,{Z:()=>l});var o=n(5163);function l(e,t,n=null){return(0,o.mG)(this,void 0,void 0,(function*(){return yield new Promise(((o,l)=>{Homey.api(e,t,n,((e,t)=>{e?l(e):o(t)}))}))}))}},3834:(e,t,n)=>{n.d(t,{i:()=>s});var o=n(5163),l=n(6635),a=n(4746);const s={fetchHeatingDevices:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,a.Z)("GET","/devices"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},8681:(e,t,n)=>{n.d(t,{M:()=>c,X:()=>r});var o=n(5163),l=n(6635),a=n(4746);const s=e=>(0,o.mG)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,a.Z)("PUT",`/plans/${e.id}`,t)})),c={fetchPlans:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,a.Z)("GET","/plans");return(0,l.sortBy)((0,l.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){const t=yield(0,a.Z)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,a.Z)("GET","/schedule");return e.temperatures=(0,l.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:s,removePlan:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,a.Z)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield s(e),!0}))},r={fetchMode:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){return(yield(0,a.Z)("GET","/mode")).mode})),setMode:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,a.Z)("PUT","/mode",{mode:e})}))}},2094:(e,t,n)=>{n.d(t,{Ls:()=>g,yU:()=>p,xn:()=>m,Si:()=>Z,rV:()=>v,HT:()=>h});var o=n(3834),l=n(8681),a=n(2817),s=n(5163),c=n(2784);const r=new Map,i="Loading...";function d(e,t){return(n=!1,o=!1)=>{const l=r.get(e);let[a,d]=[null,null];n&&([a,d]=c.useState(l!==i?l:null));const[u,m]=c.useState(!1);function g(n=!1){if(null==l||l===i||n)throw r.set(e,i),function(e,t){return(0,s.mG)(this,void 0,void 0,(function*(){try{t(yield e())}catch(e){t((()=>{throw e}))}}))}(t,(t=>{"function"==typeof t?r.set(e,t(r.get(e))):r.set(e,t)})).catch((e=>{m(!!o||(()=>{throw e}))}))}return g(),(0,c.useEffect)((()=>()=>{r.delete(e)}),[]),{[e]:n?a:l,[`set${e.charAt(0).toUpperCase()+e.slice(1)}`]:n?d:function(){},[`load${e.charAt(0).toUpperCase()+e.slice(1)}`]:g,[`load${e.charAt(0).toUpperCase()+e.slice(1)}Failed`]:u}}}var u=n(8516);const m=d("plans",l.M.fetchPlans),g=d("devices",o.i.fetchHeatingDevices),h=d("zones",u.v.fetchHeatingZones),Z=d("scheduleInformation",l.M.fetchSchedule),v=d("settings",a.w.fetchSettings),p=d("mode",l.X.fetchMode)},2817:(e,t,n)=>{n.d(t,{w:()=>a});var o=n(5163),l=n(4746);const a={fetchSettings:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,l.Z)("GET","/settings")})),updateSettings:e=>(0,o.mG)(void 0,void 0,void 0,(function*(){return yield(0,l.Z)("PUT","/settings",e)}))}},8516:(e,t,n)=>{n.d(t,{v:()=>s});var o=n(5163),l=n(6635),a=n(4746);const s={fetchHeatingZones:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,a.Z)("GET","/zones"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},5030:(e,t,n)=>{n.d(t,{Z:()=>r});var o=n(331),l=n(2511),a=n(5223),s=n(436),c=n(2784);const r=(0,l.Z)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:n,title:l,actions:r,subBar:i}=e.children||{button:null,title:null,actions:null,subBar:null};return c.createElement(c.Fragment,null,c.createElement(o.Z,{position:"absolute",color:"primary",className:t.appBar},c.createElement(a.Z,{className:t.toolbar},e.button||n,c.createElement(s.Z,{variant:"h6",color:"inherit",noWrap:!0},e.title||l),c.createElement("div",{className:t.grow}),null!=r&&c.createElement("div",{className:t.buttons},r)),null!=i&&i))}))},7606:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(5163),l=n(2511),a=n(436),s=n(2784);const c=(0,l.Z)((e=>({text:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,l=(0,o._T)(e,["classes","text"]);return s.createElement(a.Z,Object.assign({className:t.text,color:"textSecondary"},l),n)}))},3547:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(5163),l=n(7869),a=n(2784),s=n(9503);const c=e=>{var{classes:t}=e,n=(0,o._T)(e,["classes"]);return a.createElement(s.Z,null,a.createElement(l.Z,Object.assign({fullWidth:!0,margin:"normal"},n)))}},9503:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(2511),l=n(2784);const a=(0,o.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>l.createElement("div",{className:e.classes.inputContainer},e.children)))},7546:(e,t,n)=>{n.d(t,{T2:()=>f,j2:()=>b});var o=n(5163),l=n(436),a=n(5256),s=n(1776),c=n(9378),r=n(1837),i=n(2511),d=n(4190),u=n(4882),m=n(2784),g=n(7267),h=n(1810),Z=n(8402),v=n(7933);const p=e=>{const t=e.to.toString();return m.createElement(Z.Z,Object.assign({},e,{component:t.match(/https/)?"a":v.rU,href:t}),e.children)},E=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),f=e=>{const[t,n]=m.useState(!1);return m.createElement(m.Fragment,null,m.createElement(y,{open:t,onClose:()=>{n(!1)}}),m.createElement(b,{first:!0,onClick:()=>{n(!0)},icon:m.createElement(u.Z,null)}))},y=(0,g.EN)((0,i.Z)(E)((e=>{const{classes:t}=e,n=[{type:"entry",to:"/",text:(0,h.Z)("menu.plans")},{to:"/temperatures",text:(0,h.Z)("menu.temperatures")},{to:"/schedules",text:(0,h.Z)("menu.schedules")},{to:"/settings",text:(0,h.Z)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,h.Z)("menu.help")}];return m.createElement(d.ZP,{open:e.open,onClose:e.onClose},m.createElement(l.Z,{className:t.text,variant:"h5",gutterBottom:!0},(0,h.Z)("menu.title")),m.createElement(l.Z,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.5-rc21"),m.createElement(a.Z,null),m.createElement(s.Z,null,n.map((n=>"Divider"===n.type?m.createElement(a.Z,null):m.createElement(p,{key:n.to,to:n.to,disabled:e.match.url===n.to,button:!0},m.createElement(c.Z,{primary:n.text,classes:{primary:e.match.url!==n.to?t.normal:t.selected}}))))))}))),b=(0,i.Z)(E)((e=>{const{classes:t,first:n,icon:l}=e,a=(0,o._T)(e,["classes","first","icon"]);return m.createElement(r.Z,Object.assign({className:n?t.firstButton:t.otherButton,color:"inherit"},a),l)}))},638:(e,t,n)=>{n.d(t,{Z:()=>c});var o=n(5163),l=n(2511),a=n(436),s=n(2784);const c=(0,l.Z)((e=>({headline:{marginTop:e.spacing(4),paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,l=(0,o._T)(e,["classes","text"]);return s.createElement(a.Z,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},l),n)}))},3589:(e,t,n)=>{n.d(t,{Z:()=>a});var o=n(2511),l=n(2784);const a=(0,o.Z)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:n,body:o,paddingTop:a,paddingBottom:s}=e.children,c=s||"auto";return l.createElement(l.Fragment,null,l.createElement("div",{className:t.root},n,l.createElement("div",{className:t.body,style:{paddingTop:a,paddingBottom:c}},o)))}))},6577:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var o=n(5163),l=n(7277),a=n(5806),s=n(2511),c=n(2938),r=n(9166),i=n(3826),d=n(2784),u=n(7267),m=n(2094),g=n(2817),h=n(5030),Z=n(7606),v=n(3547),p=n(9503),E=n(7546),f=n(638),y=n(1810),b=n(3589);const x=(0,i.RM)((0,u.EN)((0,s.Z)((e=>({})))((e=>{const{settings:t,setSettings:n,loadSettings:s}=(0,m.rV)(!0),[i,u]=d.useState(!1);function x(e,n=null){const o=t[e];return null==o?n:o}const C=(e,t="value")=>o=>{const l=o.target[t];n((t=>Object.assign(Object.assign({},t),{[e]:l}))),u(!0)};return d.createElement(b.Z,null,{header:d.createElement(h.Z,null,{title:(0,y.Z)("settings.title"),button:d.createElement(d.Fragment,null,!i&&d.createElement(E.T2,null),i&&d.createElement(E.j2,{first:!0,onClick:()=>(0,o.mG)(void 0,void 0,void 0,(function*(){yield s(),u(!1)})),icon:d.createElement(r.Z,null)})),actions:d.createElement(d.Fragment,null,i&&d.createElement(l.Z,{color:"inherit",onClick:()=>{g.w.updateSettings(t).then((t=>{e.enqueueSnackbar((0,y.Z)("settings.saved")),u(!1)}))}},"save"))}),paddingTop:50,paddingBottom:50,body:d.createElement(d.Fragment,null,d.createElement(f.Z,{text:(0,y.Z)("settings.notifications.category")}),d.createElement(Z.Z,{text:(0,y.Z)("settings.notifications.text")}),d.createElement(p.Z,null,d.createElement(a.Z,{control:d.createElement(c.Z,{checked:!0===x("NotifyModeChange",!0),onChange:C("NotifyModeChange","checked")}),label:(0,y.Z)("settings.notifications.NotifyModeChange"),labelPlacement:"end"})),d.createElement(p.Z,null,d.createElement(a.Z,{control:d.createElement(c.Z,{checked:!0===x("NotifySetError",!0),onChange:C("NotifySetError","checked")}),label:(0,y.Z)("settings.notifications.NotifySetError"),labelPlacement:"end"})),d.createElement(p.Z,null,d.createElement(a.Z,{control:d.createElement(c.Z,{checked:!0===x("NotifySetSuccess",!0),onChange:C("NotifySetSuccess","checked")}),label:(0,y.Z)("settings.notifications.NotifySetSuccess"),labelPlacement:"end"})),d.createElement(f.Z,{text:(0,y.Z)("settings.sentry.category")}),d.createElement(Z.Z,{text:(0,y.Z)("settings.sentry.text")}),d.createElement(p.Z,null,d.createElement(a.Z,{control:d.createElement(c.Z,{checked:!0===x("SentryEnabled",!0),onChange:C("SentryEnabled","checked")}),label:(0,y.Z)("settings.enabled.label"),labelPlacement:"end"})),d.createElement(f.Z,{text:(0,y.Z)("settings.log.category")}),d.createElement(Z.Z,{text:(0,y.Z)("settings.log.text")}),d.createElement(p.Z,null,d.createElement(a.Z,{control:d.createElement(c.Z,{checked:!0===x("ConsoleReLogEnabled"),onChange:C("ConsoleReLogEnabled","checked")}),label:(0,y.Z)("settings.enabled.label"),labelPlacement:"end"})),d.createElement(v.Z,{label:(0,y.Z)("settings.category.label"),placeholder:(0,y.Z)("settings.category.placeholder"),required:!0===x("ConsoleReLogEnabled"),value:x("ConsoleReLogCategory",""),onChange:C("ConsoleReLogCategory")}),d.createElement(f.Z,{text:(0,y.Z)("settings.backup.title")}),d.createElement(Z.Z,{text:(0,y.Z)("settings.backup.text")}),d.createElement(v.Z,{label:(0,y.Z)("settings.backup.label"),placeholder:(0,y.Z)("settings.backup.placeholder"),multiline:!0,rowsMax:"10",value:x("Plans",""),onChange:C("Plans")}))})}))))}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.5-rc21/settings/577.js.map