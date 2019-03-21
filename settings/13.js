(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{370:function(e,t,a){"use strict";a.d(t,"a",function(){return c});var n=a(369);function c(e,t,a=null){return n.b(this,void 0,void 0,function*(){return yield new Promise((n,c)=>{Homey.api(e,t,a,(e,t)=>{e?c(e):n(t)})})})}},372:function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"a",function(){return i});var n=a(369),c=a(17),l=a(370);const o=e=>n.b(void 0,void 0,void 0,function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield Object(l.a)("PUT",`/plans/${e.id}`,t)}),r={fetchPlans:()=>n.b(void 0,void 0,void 0,function*(){const e=yield Object(l.a)("GET","/plans");return Object(c.sortBy)(Object(c.map)(e,e=>(e.zones=e.zones||[],e.devices=e.devices||[],e)),e=>e.name)}),fetchPlanById:e=>n.b(void 0,void 0,void 0,function*(){const t=yield Object(l.a)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t}),fetchSchedule:()=>n.b(void 0,void 0,void 0,function*(){const e=yield Object(l.a)("GET","/schedule");return e.temperatures=Object(c.sortBy)(e.temperatures,[e=>e.device.name]),e}),updatePlan:o,removePlan:e=>n.b(void 0,void 0,void 0,function*(){return yield Object(l.a)("DELETE",`/plans/${e}`)}),togglePlanState:e=>n.b(void 0,void 0,void 0,function*(){return e.enabled=!e.enabled,yield o(e),!0})},i={fetchMode:()=>n.b(void 0,void 0,void 0,function*(){return(yield Object(l.a)("GET","/mode")).mode}),setMode:e=>n.b(void 0,void 0,void 0,function*(){return yield Object(l.a)("PUT","/mode",{mode:e})})}},373:function(e,t,a){"use strict";var n=a(139),c=a.n(n),l=a(19),o=a(140),r=a.n(o),i=a(34),s=a.n(i),u=a(1),d=a.n(u);t.a=Object(l.withStyles)(e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}}))(e=>{const{classes:t}=e,{button:a,title:n,actions:l,subBar:o}=e.children||{button:null,title:null,actions:null,subBar:null};return d.a.createElement(u.Fragment,null,d.a.createElement(c.a,{position:"absolute",color:"primary",className:t.appBar},d.a.createElement(r.a,{className:t.toolbar},e.button||a,d.a.createElement(s.a,{variant:"h6",color:"inherit",noWrap:!0},e.title||n),d.a.createElement("div",{className:t.grow}),null!=l&&d.a.createElement("div",{className:t.buttons},l)),null!=o&&o))})},374:function(e,t,a){"use strict";var n=a(19),c=a(1),l=a.n(c);t.a=Object(n.withStyles)(e=>({inputContainer:{width:"100%",paddingLeft:2*e.spacing.unit,paddingRight:3*e.spacing.unit}}))(e=>l.a.createElement("div",{className:e.classes.inputContainer},e.children))},375:function(e,t,a){"use strict";var n=a(369),c=a(43),l=a(19),o=a(141),r=a.n(o),i=a(380),s=a.n(i),u=a(1),d=a.n(u),m=a(5648),b=a(80),p=a(5638);function v(e){var{innerRef:t}=e,a=n.d(e,["innerRef"]);return a.to.toString().match(/https/)?d.a.createElement("a",Object.assign({onClick:()=>Homey.openURL(a.to.toString())},a),a.children):d.a.createElement(p.a,Object.assign({},a))}var O=e=>d.a.createElement(c.n,Object.assign({},e,{component:v}),e.children);a.d(t,"a",function(){return g}),a.d(t,"b",function(){return E});const h=e=>({text:{padding:2*e.spacing.unit,paddingBottom:0},version:{padding:2*e.spacing.unit,paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),g=e=>{const[t,a]=d.a.useState(!1);return d.a.createElement(d.a.Fragment,null,d.a.createElement(j,{open:t,onClose:()=>{a(!1)}}),d.a.createElement(E,{first:!0,onClick:()=>{a(!0)},icon:d.a.createElement(s.a,null)}))},j=Object(m.a)(Object(l.withStyles)(h)(e=>{const{classes:t}=e,a=[{type:"entry",to:"/",text:Object(b.a)("menu.plans")},{to:"/temperatures",text:Object(b.a)("menu.temperatures")},{to:"/schedules",text:Object(b.a)("menu.schedules")},{to:"/settings",text:Object(b.a)("menu.settings")},{to:"https://homey-heating.mskg.app",text:Object(b.a)("menu.help")}];return d.a.createElement(r.a,{open:e.open,onClose:e.onClose},d.a.createElement(c.v,{className:t.text,variant:"h5",gutterBottom:!0},Object(b.a)("menu.title")),d.a.createElement(c.v,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","1.2.1-rc1"," (","309",")"),d.a.createElement(c.h,null),d.a.createElement(c.m,null,a.map(a=>"Divider"===a.type?d.a.createElement(c.h,null):d.a.createElement(O,{key:a.to,to:a.to,disabled:e.match.url===a.to,button:!0},d.a.createElement(c.q,{primary:a.text,classes:{primary:e.match.url!==a.to?t.normal:t.selected}})))))})),E=Object(l.withStyles)(h)(e=>{const{classes:t,first:a,icon:l}=e,o=n.d(e,["classes","first","icon"]);return d.a.createElement(c.j,Object.assign({className:a?t.firstButton:t.otherButton,color:"inherit"},o),l)})},376:function(e,t,a){"use strict";var n=a(19),c=a(1),l=a.n(c);t.a=Object(n.withStyles)(e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}}))(e=>{const{classes:t}=e,{header:a,body:n,paddingTop:c,paddingBottom:o}=e.children,r=o||"auto";return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:t.root},a,l.a.createElement("div",{className:t.body,style:{paddingTop:c,paddingBottom:r}},n)))})},377:function(e,t,a){"use strict";var n=a(369),c=a(19),l=a(34),o=a.n(l),r=a(1),i=a.n(r);t.a=Object(c.withStyles)(e=>({text:{paddingLeft:2*e.spacing.unit,paddingRight:2*e.spacing.unit}}))(e=>{const{classes:t,text:a}=e,c=n.d(e,["classes","text"]);return i.a.createElement(o.a,Object.assign({className:t.text,color:"textSecondary"},c),a)})},378:function(e,t,a){"use strict";var n=a(369),c=a(19),l=a(34),o=a.n(l),r=a(1),i=a.n(r);t.a=Object(c.withStyles)(e=>({headline:{marginTop:4*e.spacing.unit,paddingLeft:2*e.spacing.unit,paddingRight:2*e.spacing.unit}}))(e=>{const{classes:t,text:a}=e,c=n.d(e,["classes","text"]);return i.a.createElement(o.a,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},c),a)})},379:function(e,t,a){"use strict";var n=a(369),c=a(143),l=a.n(c),o=a(1),r=a.n(o),i=a(374);t.a=(e=>{var{classes:t}=e,a=n.d(e,["classes"]);return r.a.createElement(i.a,null,r.a.createElement(l.a,Object.assign({fullWidth:!0,margin:"normal"},a)))})},381:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(369),c=a(17),l=a(370);const o={fetchHeatingDevices:()=>n.b(void 0,void 0,void 0,function*(){const e=yield Object(l.a)("GET","/devices"),t=Object(c.sortBy)(e,"name").reduce((e,t,a)=>(e[a]=t,e[t.id]=t,e),{});return t.length=e.length,t})}},382:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(369),c=a(17),l=a(370);const o={fetchHeatingZones:()=>n.b(void 0,void 0,void 0,function*(){const e=yield Object(l.a)("GET","/zones"),t=Object(c.sortBy)(e,"name").reduce((e,t,a)=>(e[a]=t,e[t.id]=t,e),{});return t.length=e.length,t})}},387:function(e,t,a){"use strict";a.d(t,"a",function(){return o});var n=a(43),c=a(1),l=a.n(c);function o(e){return l.a.createElement(n.w,Object.assign({},e))}},388:function(e,t,a){"use strict";a.d(t,"a",function(){return r}),a.d(t,"c",function(){return i}),a.d(t,"b",function(){return s}),a.d(t,"d",function(){return u}),a.d(t,"e",function(){return m});var n=a(1),c=a(390),l=a(372),o=a(82);const r=()=>{const e=Object(o.b)(),t=Object(o.c)("loaded"),a=Object(n.useCallback)(()=>e({type:"savePoint"}),[e]),c=Object(n.useCallback)(()=>e({type:"undo"}),[e]),l=Object(n.useCallback)(()=>e({type:"commit"}),[e]);return Object(n.useEffect)(()=>{a()},[t]),{savePoint:a,undo:c,commit:l}},i=()=>{const e=Object(o.b)();return{setName:Object(n.useCallback)(t=>e({type:"setName",name:t.target.value}),[e]),setDescription:Object(n.useCallback)(t=>e({type:"setDescription",description:t.target.value}),[e]),toggleState:Object(n.useCallback)(()=>e({type:"toggleEnabled"}),[e]),toggleZone:Object(n.useCallback)(t=>e({type:"toggleZone",zone:t}),[e]),toggleDevice:Object(n.useCallback)(t=>e({type:"toggleDevice",device:t}),[e])}},s=()=>{const e=Object(o.b)(),[t,a]=Object(n.useState)(!1),c=Object(n.useCallback)((t,n)=>{e({type:"setOverride",mode:t,temperature:n}),a(!0)},[e]),l=Object(n.useCallback)(t=>{e({type:"clearOverride",mode:t}),a(!0)},[e]),r=Object(n.useCallback)((e,t)=>{0===t?l(e):c(e,t)},[e]);return Object(n.useEffect)(()=>{a(!1)},[]),{isDirty:t,setOverride:c,clearOverride:l,updateOverride:r}},u=()=>{const[e,t]=Object(n.useState)(!1),a=Object(o.b)(),c=Object(n.useCallback)(e=>{a({type:"selectDay",day:e})},[a]),l=Object(o.c)("selectedDay"),r=Object(o.c)("setPoint"),i=Object(n.useCallback)((e,n)=>{null!=n&&n.length>0&&(t(!0),a({type:"copyDays",source:e,targets:n}))},[a]),s=Object(n.useCallback)(e=>{t(!0),a({type:"removeSetPoint",index:e})},[a]),u=Object(n.useCallback)(e=>{a({type:"loadSetPoint",setPoint:e})},[a]),d=Object(n.useCallback)(e=>{a({type:"newSetPoint",day:e})},[a]),m=Object(n.useCallback)(e=>{-1===e.index?a({type:"addSetPoint",setPoint:e}):a({type:"updateSetPoint",setPoint:e})},[a]),b=Object(n.useCallback)(e=>a({type:"setStart",start:e}),[a]),p=Object(n.useCallback)(e=>a({type:"setTargetTemperature",temperature:parseFloat(e.target.value)}),[a]);return Object(n.useEffect)(()=>{t(!1)},[]),{setDirty:t,isDirty:e,selectedDay:l,setPoint:r,copyDays:i,removeSetPoint:s,loadSetPoint:u,newSetPoint:d,selectDay:c,saveSetPoint:m,setStart:b,setTargetTemperature:p}};let d=!1;const m=(e,t=!0)=>{const a=Object(o.b)(),r=Object(o.c)("plan"),i=Object(o.c)("loaded"),s=Object(o.c)("dirty");if(!i||!t)if(null!=e&&"new"!==e||d){if(!d)throw l.b.fetchPlanById(e).then(e=>{d=!0,a({type:"loadPlan",plan:e})})}else d=!0,a({type:"loadPlan",plan:{id:c(),enabled:!1,name:"",zones:[],devices:[],schedule:[],overrides:void 0}});return Object(n.useEffect)(()=>()=>{d=!1},[e,t]),{plan:r,isDirty:s,loaded:i}}},5646:function(e,t,a){"use strict";a.r(t);var n=a(43),c=a(147),l=a.n(c),o=a(92),r=a.n(o),i=a(144),s=a.n(i),u=a(58),d=a.n(u),m=a(59),b=a.n(m),p=a(95),v=a.n(p),O=a(90),h=a.n(O),g=a(83),j=a.n(g),E=a(19),f=a(142),y=a.n(f),w=a(389),x=a.n(w),C=a(383),k=a.n(C),S=a(395),P=a.n(S),T=a(394),D=a.n(T),B=a(17),z=a(85),N=a(1),R=a.n(N),F=a(5638),$=a(5648),G=a(5645),H=a(390),L=a(372),Z=a(373),q=a(377),I=a(369),K=a(81),U=a.n(K),W=a(86),_=a.n(W),J=a(146),M=a.n(J),V=a(87),Y=a.n(V),A=a(145),Q=a.n(A),X=a(88),ee=a.n(X),te=a(80),ae=a(387);const ne=e=>{const{open:t,title:a,content:n,onOK:c,onCancel:l}=e,o=I.d(e,["open","title","content","onOK","onCancel"]);return R.a.createElement(_.a,Object.assign({open:t,onClose:()=>{l()},TransitionComponent:ae.a},o),R.a.createElement(ee.a,null,a||Object(te.a)("confirm.title")),R.a.createElement(Y.a,null,R.a.createElement(Q.a,null,n)),R.a.createElement(M.a,null,R.a.createElement(U.a,{onClick:()=>{l()},color:"primary"},Object(te.a)("confirm.cancel")),R.a.createElement(U.a,{onClick:()=>{c()},color:"primary"},Object(te.a)("confirm.ok"))))};var ce=a(379),le=a(5628);function oe(e){switch(e.name){case"home":return R.a.createElement(le.d,null);case"bed":return R.a.createElement(le.f,null);case"living":return R.a.createElement(le.g,null);case"toilet":case"shower":return R.a.createElement(le.e,null);case"books":case"study":return R.a.createElement(le.a,null);case"kitchen":return R.a.createElement(le.c,null);default:return R.a.createElement(le.b,null)}}var re=a(375),ie=a(378),se=a(376),ue=a(381),de=a(82);let me=!1;var be=a(388),pe=a(382);let ve=!1;const Oe=R.a.lazy(()=>a.e(17).then(a.bind(null,5644))),he=R.a.lazy(()=>Promise.all([a.e(4),a.e(3)]).then(a.bind(null,5637))),ge=e=>{const{children:t,id:a,activeTab:c}=e;return R.a.createElement(R.a.Suspense,{fallback:R.a.createElement(n.l,{style:{margin:16},color:"secondary"})},a===c&&t)};t.default=Object(z.withSnackbar)(Object($.a)(Object(E.withStyles)(e=>({button:{margin:2*e.spacing.unit},divider:{marginTop:3*e.spacing.unit,marginBottom:1*e.spacing.unit},avatar:{width:"24px",height:"24px"}}))(e=>{const{classes:t}=e,[a,c]=R.a.useState(0),{plan:o,isDirty:i}=Object(be.e)(e.match.params.id,!0===e.location.state),{setName:u,setDescription:m,toggleState:p,toggleZone:O,toggleDevice:g}=Object(be.c)(),E=(e=>{const t=Object(de.b)(),a=Object(de.c)("zones");if(!e&&!ve)throw ve=!0,pe.a.fetchHeatingZones().then(e=>{t({type:"loadZones",zones:e})});return Object(N.useEffect)(()=>()=>{ve=!1},[e]),a})(!0===e.location.state),f=(e=>{const t=Object(de.b)(),a=Object(de.c)("devices");if(!e&&!me)throw me=!0,ue.a.fetchHeatingDevices().then(e=>{t({type:"loadDevices",devices:e})});return Object(N.useEffect)(()=>()=>{me=!1},[e]),a})(!0===e.location.state);Object(N.useEffect)(()=>{C(!1),c(!0===e.location.state?1:0)},[e.location]);const[w,C]=Object(N.useState)(!1),{dialog:S,open:T,isOpen:z}=(e=>{const{onConfirm:t}=e,a=I.d(e,["onConfirm"]),[n,c]=Object(N.useState)(!1);return{dialog:R.a.createElement(ne,Object.assign({open:n,onCancel:()=>{c(!1)},onOK:t},a)),isOpen:n,open:()=>{c(!0)}}})({title:Object(te.a)("plan.confirm.title"),content:Object(te.a)("plan.confirm.content"),onConfirm:()=>{$()}}),$=()=>{L.b.removePlan(o.id).then(t=>{e.history.push({pathname:"/",state:!1}),e.enqueueSnackbar(Object(te.a)("plan.removed",{name:o.name}))})};return R.a.createElement(N.Fragment,null,S,R.a.createElement(Oe,{open:w,name:o.name,onConfirm:t=>{const a=Object.assign({},o,{enabled:!1,id:H(),name:t});L.b.updatePlan(a).then(t=>{e.history.push({pathname:`/plans/${a.id}`,state:!1}),e.enqueueSnackbar(Object(te.a)("plan.duplicated",{name:o.name}))}).catch(e=>{throw e})},onCancel:()=>{C(!1)}}),R.a.createElement(se.a,null,{header:R.a.createElement(Z.a,null,{title:o.name||Object(te.a)("plan.unnamed"),button:R.a.createElement(re.b,Object.assign({first:!0},{to:"/"},{component:F.a,icon:i?R.a.createElement(k.a,null):R.a.createElement(x.a,null)})),actions:R.a.createElement(N.Fragment,null,"new"!==o.id&&!i&&R.a.createElement(re.b,{onClick:()=>{C(!0)},icon:R.a.createElement(D.a,null)}),"new"!==o.id&&R.a.createElement(re.b,{onClick:T,icon:R.a.createElement(P.a,null)}),i&&R.a.createElement(n.a,{color:"inherit",onClick:()=>{L.b.updatePlan(o).then(t=>{e.history.push({pathname:"/",state:!1}),e.enqueueSnackbar(Object(te.a)("plan.saved",{name:o.name}))})}},Object(te.a)("plan.save"))),subBar:R.a.createElement(n.u,{value:a,onChange:(e,t)=>c(t),variant:"scrollable",scrollButtons:"off"},R.a.createElement(n.t,{classes:{root:e.classes.tab},disableRipple:!0,label:Object(te.a)("plan.tabs.overview")}),R.a.createElement(n.t,{classes:{root:e.classes.tab},disableRipple:!0,label:Object(te.a)("plan.tabs.schedule")}),R.a.createElement(n.t,{classes:{root:e.classes.tab},disableRipple:!0,label:Object(te.a)("plan.tabs.zones",{n:o.zones.length})}),R.a.createElement(n.t,{classes:{root:e.classes.tab},disableRipple:!0,label:Object(te.a)("plan.tabs.devices",{n:o.devices.length})}))}),paddingTop:100,body:R.a.createElement(G.a,{enabled:w||z,isolation:!1},R.a.createElement(N.Fragment,null,R.a.createElement(ge,{id:0,activeTab:a},R.a.createElement(ie.a,{text:Object(te.a)("plan.overview.section")}),R.a.createElement(q.a,{text:Object(te.a)("plan.overview.text")}),R.a.createElement(ce.a,{label:Object(te.a)("plan.overview.name.label"),placeholder:Object(te.a)("plan.overview.name.placeholder"),value:o.name,onChange:u}),R.a.createElement(q.a,{style:{paddingTop:16},text:Object(te.a)("plan.overview.text_enable")}),R.a.createElement(s.a,{control:R.a.createElement(y.a,{onChange:p,checked:o.enabled}),label:Object(te.a)("plan.overview.enabled.label"),labelPlacement:"start"}),R.a.createElement(q.a,{style:{paddingTop:16},text:Object(te.a)("plan.overview.text_description")}),R.a.createElement(ce.a,{label:Object(te.a)("plan.overview.description.label"),placeholder:Object(te.a)("plan.overview.description.placeholder"),multiline:!0,value:o.description,onChange:m})),R.a.createElement(ge,{id:1,activeTab:a},R.a.createElement(ie.a,{text:Object(te.a)("plan.schedules.section")}),R.a.createElement(q.a,{text:Object(te.a)("plan.schedules.text")}),R.a.createElement("div",{style:{paddingTop:16,display:"flex",flexDirection:"row"}},R.a.createElement(F.a,{style:{textDecoration:"none"},to:{pathname:`/plans/${o.id}/schedule`,state:o},replace:!0},R.a.createElement(n.a,{variant:"contained",color:"primary",className:t.button},Object(te.a)("plan.schedules.edit"))),R.a.createElement(F.a,{style:{textDecoration:"none"},to:{pathname:`/plans/${o.id}/exceptions`,state:o},replace:!0},R.a.createElement(n.a,{variant:"contained",color:"primary",className:t.button},Object(te.a)("plan.schedules.exceptions")))),0!==o.schedule.length&&R.a.createElement(ie.a,{text:Object(te.a)("plan.schedules.section_summary")}),0!==o.schedule.length&&R.a.createElement(he,{plan:o})),R.a.createElement(ge,{id:2,activeTab:a},R.a.createElement(ie.a,{text:Object(te.a)("plan.zones.section")}),R.a.createElement(q.a,{text:Object(te.a)("plan.zones.text")}),0===E.length?R.a.createElement(q.a,{style:{paddingTop:16},text:Object(te.a)("plan.zones.empty")}):R.a.createElement(d.a,null,Object(B.map)(E,e=>R.a.createElement(b.a,{key:e.id,button:!0,onClick:()=>O(e.id)},null!=e.icon&&R.a.createElement(v.a,null,R.a.createElement(oe,{name:e.icon})),R.a.createElement(j.a,{primary:e.name}),R.a.createElement(h.a,null,R.a.createElement(r.a,{onChange:()=>O(e.id),checked:null!=o.zones.find(t=>t===e.id)})))))),R.a.createElement(ge,{id:3,activeTab:a},R.a.createElement(ie.a,{text:Object(te.a)("plan.devices.section")}),R.a.createElement(q.a,{text:Object(te.a)("plan.devices.text")}),0===f.length?R.a.createElement(q.a,{style:{paddingTop:16},text:Object(te.a)("plan.devices.empty")}):R.a.createElement(d.a,null,Object(B.map)(f,e=>R.a.createElement(b.a,{key:e.id,button:!0,onClick:()=>g(e.id)},null!=e.icon&&R.a.createElement(v.a,null,R.a.createElement(l.a,{className:t.avatar,src:`${e.icon}`})),R.a.createElement(j.a,{primary:e.name}),R.a.createElement(h.a,null,R.a.createElement(r.a,{onChange:()=>g(e.id),checked:null!=o.devices.find(t=>t===e.id)}))))))))}))})))}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v1.2.1-rc1/settings/13.js.map