"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[423],{4746:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(5163);function l(e,t,n=null){return(0,a.mG)(this,void 0,void 0,(function*(){return yield new Promise(((a,l)=>{Homey.api(e,t,n,((e,t)=>{e?l(e):a(t)}))}))}))}},3834:(e,t,n)=>{n.d(t,{i:()=>r});var a=n(5163),l=n(6635),o=n(4746);const r={fetchHeatingDevices:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,o.Z)("GET","/devices"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},8681:(e,t,n)=>{n.d(t,{M:()=>c,X:()=>s});var a=n(5163),l=n(6635),o=n(4746);const r=e=>(0,a.mG)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,o.Z)("PUT",`/plans/${e.id}`,t)})),c={fetchPlans:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,o.Z)("GET","/plans");return(0,l.sortBy)((0,l.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){const t=yield(0,o.Z)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,o.Z)("GET","/schedule");return e.temperatures=(0,l.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:r,removePlan:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return yield(0,o.Z)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield r(e),!0}))},s={fetchMode:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){return(yield(0,o.Z)("GET","/mode")).mode})),setMode:e=>(0,a.mG)(void 0,void 0,void 0,(function*(){return yield(0,o.Z)("PUT","/mode",{mode:e})}))}},8516:(e,t,n)=>{n.d(t,{v:()=>r});var a=n(5163),l=n(6635),o=n(4746);const r={fetchHeatingZones:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,o.Z)("GET","/zones"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},5030:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(331),l=n(2511),o=n(5223),r=n(436),c=n(2784);const s=(0,l.Z)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:n,title:l,actions:s,subBar:i}=e.children||{button:null,title:null,actions:null,subBar:null};return c.createElement(c.Fragment,null,c.createElement(a.Z,{position:"absolute",color:"primary",className:t.appBar},c.createElement(o.Z,{className:t.toolbar},e.button||n,c.createElement(r.Z,{variant:"h6",color:"inherit",noWrap:!0},e.title||l),c.createElement("div",{className:t.grow}),null!=s&&c.createElement("div",{className:t.buttons},s)),null!=i&&i))}))},7606:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(5163),l=n(2511),o=n(436),r=n(2784);const c=(0,l.Z)((e=>({text:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,l=(0,a._T)(e,["classes","text"]);return r.createElement(o.Z,Object.assign({className:t.text,color:"textSecondary"},l),n)}))},3547:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(5163),l=n(7869),o=n(2784),r=n(9503);const c=e=>{var{classes:t}=e,n=(0,a._T)(e,["classes"]);return o.createElement(r.Z,null,o.createElement(l.Z,Object.assign({fullWidth:!0,margin:"normal"},n)))}},9503:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(2511),l=n(2784);const o=(0,a.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>l.createElement("div",{className:e.classes.inputContainer},e.children)))},7546:(e,t,n)=>{n.d(t,{T2:()=>b,j2:()=>f});var a=n(5163),l=n(436),o=n(5256),r=n(1776),c=n(9378),s=n(1837),i=n(2511),d=n(4190),m=n(4882),u=n(2784),p=n(7267),v=n(1810),Z=n(8402),g=n(7933);const E=e=>{const t=e.to.toString();return u.createElement(Z.Z,Object.assign({},e,{component:t.match(/https/)?"a":g.rU,href:t}),e.children)},h=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),b=e=>{const[t,n]=u.useState(!1);return u.createElement(u.Fragment,null,u.createElement(y,{open:t,onClose:()=>{n(!1)}}),u.createElement(f,{first:!0,onClick:()=>{n(!0)},icon:u.createElement(m.Z,null)}))},y=(0,p.EN)((0,i.Z)(h)((e=>{const{classes:t}=e,n=[{type:"entry",to:"/",text:(0,v.Z)("menu.plans")},{to:"/temperatures",text:(0,v.Z)("menu.temperatures")},{to:"/schedules",text:(0,v.Z)("menu.schedules")},{to:"/settings",text:(0,v.Z)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,v.Z)("menu.help")}];return u.createElement(d.ZP,{open:e.open,onClose:e.onClose},u.createElement(l.Z,{className:t.text,variant:"h5",gutterBottom:!0},(0,v.Z)("menu.title")),u.createElement(l.Z,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.4-rc20"),u.createElement(o.Z,null),u.createElement(r.Z,null,n.map((n=>"Divider"===n.type?u.createElement(o.Z,null):u.createElement(E,{key:n.to,to:n.to,disabled:e.match.url===n.to,button:!0},u.createElement(c.Z,{primary:n.text,classes:{primary:e.match.url!==n.to?t.normal:t.selected}}))))))}))),f=(0,i.Z)(h)((e=>{const{classes:t,first:n,icon:l}=e,o=(0,a._T)(e,["classes","first","icon"]);return u.createElement(s.Z,Object.assign({className:n?t.firstButton:t.otherButton,color:"inherit"},o),l)}))},638:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(5163),l=n(2511),o=n(436),r=n(2784);const c=(0,l.Z)((e=>({headline:{marginTop:e.spacing(4),paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:n}=e,l=(0,a._T)(e,["classes","text"]);return r.createElement(o.Z,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},l),n)}))},2671:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9087),l=n(2784);function o(e){return l.createElement(a.Z,Object.assign({},e))}},3589:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(2511),l=n(2784);const o=(0,a.Z)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:n,body:a,paddingTop:o,paddingBottom:r}=e.children,c=r||"auto";return l.createElement(l.Fragment,null,l.createElement("div",{className:t.root},n,l.createElement("div",{className:t.body,style:{paddingTop:o,paddingBottom:c}},a)))}))},1423:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ce});var a=n(7358),l=n(7277),o=n(6919),r=n(6487),c=n(3434),s=n(1324),i=n(5806),d=n(1776),m=n(8402),u=n(3806),p=n(9520),v=n(9378),Z=n(2511),g=n(2938),E=n(5352),h=n(9166),b=n(2983),y=n(8096),f=n(6635),x=n(3826),C=n(2784),k=n(7933),w=n(7267),T=n(3659),P=n(4481),S=n(8681),G=n(5030),D=n(7606),B=n(5163),O=n(8629),z=n(9429),N=n(8724),j=n(5999),_=n(9249),F=n(1810),M=n(2671);const Q=e=>{const{open:t,title:n,content:a,onOK:o,onCancel:r}=e,c=(0,B._T)(e,["open","title","content","onOK","onCancel"]);return C.createElement(O.Z,Object.assign({open:t,onClose:()=>{r()},TransitionComponent:M.Z},c),C.createElement(_.Z,null,n||(0,F.Z)("confirm.title")),C.createElement(N.Z,null,C.createElement(j.Z,null,a)),C.createElement(z.Z,null,C.createElement(l.Z,{onClick:()=>{r()},color:"primary"},(0,F.Z)("confirm.cancel")),C.createElement(l.Z,{onClick:()=>{o()},color:"primary"},(0,F.Z)("confirm.ok"))))};var R=n(3547),$=n(8160),U=n(5135),H=n(1866),L=n(3495),q=n(969),I=n(7408),K=n(1528);function W(e){switch(e.name){case"home":return C.createElement($.Z,null);case"bed":return C.createElement(U.Z,null);case"living":return C.createElement(H.Z,null);case"toilet":case"shower":return C.createElement(L.Z,null);case"books":case"study":return C.createElement(q.Z,null);case"kitchen":return C.createElement(I.Z,null);default:return C.createElement(K.Z,null)}}var J=n(7546),V=n(638),X=n(3589),Y=n(3834),A=n(2958);let ee=!1;var te=n(1105),ne=n(8516);let ae=!1;const le=C.lazy((()=>n.e(885).then(n.bind(n,885)))),oe=C.lazy((()=>Promise.all([n.e(786),n.e(778)]).then(n.bind(n,6778)))),re=e=>{const{children:t,id:n,activeTab:l}=e;return C.createElement(C.Suspense,{fallback:C.createElement(a.Z,{style:{margin:16},color:"secondary"})},n===l&&t)},ce=(0,x.RM)((0,w.EN)((0,Z.Z)((e=>({button:{margin:e.spacing(2)},divider:{marginTop:e.spacing(3),marginBottom:e.spacing(1)},avatar:{width:"24px",height:"24px"}})))((e=>{const{classes:t}=e,[n,a]=C.useState(0),{plan:Z,isDirty:x}=(0,te.g0)(e.match.params.id,!0===e.location.state),{setName:w,setDescription:O,toggleState:z,toggleZone:N,toggleDevice:j}=(0,te.P5)(),_=(e=>{const t=(0,A.dr)(),n=(0,A.QG)("zones");if(!e&&!ae)throw ae=!0,ne.v.fetchHeatingZones().then((e=>{t({type:"loadZones",zones:e})}));return(0,C.useEffect)((()=>()=>{ae=!1}),[e]),n})(!0===e.location.state),M=(e=>{const t=(0,A.dr)(),n=(0,A.QG)("devices");if(!e&&!ee)throw ee=!0,Y.i.fetchHeatingDevices().then((e=>{t({type:"loadDevices",devices:e})}));return(0,C.useEffect)((()=>()=>{ee=!1}),[e]),n})(!0===e.location.state);(0,C.useEffect)((()=>{U(!1),a(!0===e.location.state?1:0)}),[e.location]);const[$,U]=(0,C.useState)(!1),{dialog:H,open:L,isOpen:q}=(e=>{const{onConfirm:t}=e,n=(0,B._T)(e,["onConfirm"]),[a,l]=(0,C.useState)(!1);return{dialog:C.createElement(Q,Object.assign({open:a,onCancel:()=>{l(!1)},onOK:t},n)),isOpen:a,open:()=>{l(!0)}}})({title:(0,F.Z)("plan.confirm.title"),content:(0,F.Z)("plan.confirm.content"),onConfirm:()=>{I()}}),I=()=>{S.M.removePlan(Z.id).then((t=>{e.history.push({pathname:"/",state:!1}),e.enqueueSnackbar((0,F.Z)("plan.removed",{name:Z.name}))}))};return C.createElement(C.Fragment,null,H,C.createElement(le,{open:$,name:Z.name,onConfirm:t=>{const n=Object.assign(Object.assign({},Z),{enabled:!1,id:P(),name:t});S.M.updatePlan(n).then((t=>{e.history.push({pathname:`/plans/${n.id}`,state:!1}),e.enqueueSnackbar((0,F.Z)("plan.duplicated",{name:Z.name}))})).catch((e=>{throw e}))},onCancel:()=>{U(!1)}}),C.createElement(X.Z,null,{header:C.createElement(G.Z,null,{title:Z.name||(0,F.Z)("plan.unnamed"),button:C.createElement(J.j2,Object.assign({first:!0},{to:"/"},{component:k.rU,icon:x?C.createElement(h.Z,null):C.createElement(E.Z,null)})),actions:C.createElement(C.Fragment,null,"new"!==Z.id&&!x&&C.createElement(J.j2,{onClick:()=>{U(!0)},icon:C.createElement(y.Z,null)}),"new"!==Z.id&&C.createElement(J.j2,{onClick:L,icon:C.createElement(b.Z,null)}),x&&C.createElement(l.Z,{color:"inherit",onClick:()=>{S.M.updatePlan(Z).then((t=>{e.history.push({pathname:"/",state:!1}),e.enqueueSnackbar((0,F.Z)("plan.saved",{name:Z.name}))}))}},(0,F.Z)("plan.save"))),subBar:C.createElement(o.Z,{value:n,onChange:(e,t)=>a(t),variant:"scrollable",scrollButtons:"off"},C.createElement(r.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,F.Z)("plan.tabs.overview")}),C.createElement(r.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,F.Z)("plan.tabs.schedule")}),C.createElement(r.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,F.Z)("plan.tabs.zones",{n:Z.zones.length})}),C.createElement(r.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,F.Z)("plan.tabs.devices",{n:Z.devices.length})}))}),paddingTop:100,body:C.createElement(T.Jk,{enabled:$||q,isolation:!1},C.createElement(C.Fragment,null,C.createElement(re,{id:0,activeTab:n},C.createElement(V.Z,{text:(0,F.Z)("plan.overview.section")}),C.createElement(D.Z,{text:(0,F.Z)("plan.overview.text")}),C.createElement(R.Z,{label:(0,F.Z)("plan.overview.name.label"),placeholder:(0,F.Z)("plan.overview.name.placeholder"),value:Z.name,onChange:w}),C.createElement(D.Z,{style:{paddingTop:16},text:(0,F.Z)("plan.overview.text_enable")}),C.createElement(i.Z,{control:C.createElement(g.Z,{onChange:z,checked:Z.enabled}),label:(0,F.Z)("plan.overview.enabled.label"),labelPlacement:"start"}),C.createElement(D.Z,{style:{paddingTop:16},text:(0,F.Z)("plan.overview.text_description")}),C.createElement(R.Z,{label:(0,F.Z)("plan.overview.description.label"),placeholder:(0,F.Z)("plan.overview.description.placeholder"),multiline:!0,value:Z.description,onChange:O})),C.createElement(re,{id:1,activeTab:n},C.createElement(V.Z,{text:(0,F.Z)("plan.schedules.section")}),C.createElement(D.Z,{text:(0,F.Z)("plan.schedules.text")}),C.createElement("div",{style:{paddingTop:16,display:"flex",flexDirection:"row"}},C.createElement(k.rU,{style:{textDecoration:"none"},to:{pathname:`/plans/${Z.id}/schedule`,state:Z},replace:!0},C.createElement(l.Z,{variant:"contained",color:"primary",className:t.button},(0,F.Z)("plan.schedules.edit"))),C.createElement(k.rU,{style:{textDecoration:"none"},to:{pathname:`/plans/${Z.id}/exceptions`,state:Z},replace:!0},C.createElement(l.Z,{variant:"contained",color:"primary",className:t.button},(0,F.Z)("plan.schedules.exceptions")))),0!==Z.schedule.length&&C.createElement(V.Z,{text:(0,F.Z)("plan.schedules.section_summary")}),0!==Z.schedule.length&&C.createElement(oe,{plan:Z})),C.createElement(re,{id:2,activeTab:n},C.createElement(V.Z,{text:(0,F.Z)("plan.zones.section")}),C.createElement(D.Z,{text:(0,F.Z)("plan.zones.text")}),0===_.length?C.createElement(D.Z,{style:{paddingTop:16},text:(0,F.Z)("plan.zones.empty")}):C.createElement(d.Z,null,(0,f.map)(_,(e=>C.createElement(m.Z,{key:e.id,button:!0,onClick:()=>N(e.id)},null!=e.icon&&C.createElement(u.Z,null,C.createElement(W,{name:e.icon})),C.createElement(v.Z,{primary:e.name}),C.createElement(p.Z,null,C.createElement(s.Z,{onChange:()=>N(e.id),checked:null!=Z.zones.find((t=>t===e.id))}))))))),C.createElement(re,{id:3,activeTab:n},C.createElement(V.Z,{text:(0,F.Z)("plan.devices.section")}),C.createElement(D.Z,{text:(0,F.Z)("plan.devices.text")}),0===M.length?C.createElement(D.Z,{style:{paddingTop:16},text:(0,F.Z)("plan.devices.empty")}):C.createElement(d.Z,null,(0,f.map)(M,(e=>C.createElement(m.Z,{key:e.id,button:!0,onClick:()=>j(e.id)},null!=e.icon&&C.createElement(u.Z,null,C.createElement(c.Z,{className:t.avatar,src:`${e.icon}`})),C.createElement(v.Z,{primary:e.name}),C.createElement(p.Z,null,C.createElement(s.Z,{onChange:()=>j(e.id),checked:null!=Z.devices.find((t=>t===e.id))})))))))))}))}))))},1105:(e,t,n)=>{n.d(t,{P5:()=>s,Zk:()=>d,_b:()=>i,g0:()=>u,k6:()=>c});var a=n(2784),l=n(4481),o=n(8681),r=n(2958);const c=()=>{const e=(0,r.dr)(),t=(0,r.QG)("loaded"),n=(0,a.useCallback)((()=>e({type:"savePoint"})),[e]),l=(0,a.useCallback)((()=>e({type:"undo"})),[e]),o=(0,a.useCallback)((()=>e({type:"commit"})),[e]);return(0,a.useEffect)((()=>{n()}),[t]),{savePoint:n,undo:l,commit:o}},s=()=>{const e=(0,r.dr)();return{setName:(0,a.useCallback)((t=>e({type:"setName",name:t.target.value})),[e]),setDescription:(0,a.useCallback)((t=>e({type:"setDescription",description:t.target.value})),[e]),toggleState:(0,a.useCallback)((()=>e({type:"toggleEnabled"})),[e]),toggleZone:(0,a.useCallback)((t=>e({type:"toggleZone",zone:t})),[e]),toggleDevice:(0,a.useCallback)((t=>e({type:"toggleDevice",device:t})),[e])}},i=()=>{const e=(0,r.dr)(),[t,n]=(0,a.useState)(!1),l=(0,a.useCallback)(((t,a)=>{e({type:"setOverride",mode:t,temperature:a}),n(!0)}),[e]),o=(0,a.useCallback)((t=>{e({type:"clearOverride",mode:t}),n(!0)}),[e]),c=(0,a.useCallback)(((e,t)=>{0===t?o(e):l(e,t)}),[e]);return(0,a.useEffect)((()=>{n(!1)}),[]),{isDirty:t,setOverride:l,clearOverride:o,updateOverride:c}},d=()=>{const[e,t]=(0,a.useState)(!1),n=(0,r.dr)(),l=(0,a.useCallback)((e=>{n({type:"selectDay",day:e})}),[n]),o=(0,r.QG)("selectedDay"),c=(0,r.QG)("setPoint"),s=(0,a.useCallback)(((e,a)=>{null!=a&&a.length>0&&(t(!0),n({type:"copyDays",source:e,targets:a}))}),[n]),i=(0,a.useCallback)((e=>{t(!0),n({type:"removeSetPoint",index:e})}),[n]),d=(0,a.useCallback)((e=>{n({type:"loadSetPoint",setPoint:e})}),[n]),m=(0,a.useCallback)((e=>{n({type:"newSetPoint",day:e})}),[n]),u=(0,a.useCallback)((e=>{-1===e.index?n({type:"addSetPoint",setPoint:e}):n({type:"updateSetPoint",setPoint:e})}),[n]),p=(0,a.useCallback)((e=>n({type:"setStart",start:e})),[n]),v=(0,a.useCallback)((e=>n({type:"setTargetTemperature",temperature:parseFloat(e.target.value)})),[n]);return(0,a.useEffect)((()=>{t(!1)}),[]),{setDirty:t,isDirty:e,selectedDay:o,setPoint:c,copyDays:s,removeSetPoint:i,loadSetPoint:d,newSetPoint:m,selectDay:l,saveSetPoint:u,setStart:p,setTargetTemperature:v}};let m=!1;const u=(e,t=!0)=>{const n=(0,r.dr)(),c=(0,r.QG)("plan"),s=(0,r.QG)("loaded"),i=(0,r.QG)("dirty");if(!s||!t)if(null!=e&&"new"!==e||m){if(!m)throw o.M.fetchPlanById(e).then((e=>{m=!0,n({type:"loadPlan",plan:e})}))}else m=!0,n({type:"loadPlan",plan:{id:l(),enabled:!1,name:"",zones:[],devices:[],schedule:[],overrides:void 0}});return(0,a.useEffect)((()=>()=>{m=!1}),[e,t]),{plan:c,isDirty:i,loaded:s}}}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.4-rc20/settings/423.js.map