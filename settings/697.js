(self.webpackChunk=self.webpackChunk||[]).push([[697],{4087:(e,t,a)=>{e.exports=a.p+"icon_black.svg?5136879a03a13f9fb18f241b081f38cb"},4746:(e,t,a)=>{"use strict";a.d(t,{Z:()=>l});var n=a(5163);function l(e,t,a=null){return(0,n.mG)(this,void 0,void 0,(function*(){return yield new Promise(((n,l)=>{Homey.api(e,t,a,((e,t)=>{e?l(e):n(t)}))}))}))}},8681:(e,t,a)=>{"use strict";a.d(t,{M:()=>r,X:()=>c});var n=a(5163),l=a(6635),s=a(4746);const o=e=>(0,n.mG)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,s.Z)("PUT",`/plans/${e.id}`,t)})),r={fetchPlans:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/plans");return(0,l.sortBy)((0,l.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){const t=yield(0,s.Z)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/schedule");return e.temperatures=(0,l.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:o,removePlan:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield o(e),!0}))},c={fetchMode:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){return(yield(0,s.Z)("GET","/mode")).mode})),setMode:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return yield(0,s.Z)("PUT","/mode",{mode:e})}))}},1583:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var n=a(1585),l=a(2511),s=a(5549),o=a(2784);const r=(0,l.Z)((e=>({fabButton:{zIndex:1,margin:"0 auto",position:"absolute",bottom:e.spacing(2),right:e.spacing(2)}})))((e=>{const{classes:t}=e;return o.createElement(n.Z,{color:"secondary","aria-label":"Add",className:t.fabButton,onClick:()=>e.onClick()},o.createElement(s.Z,null))}))},5030:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var n=a(331),l=a(2511),s=a(5223),o=a(436),r=a(2784);const c=(0,l.Z)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:a,title:l,actions:c,subBar:i}=e.children||{button:null,title:null,actions:null,subBar:null};return r.createElement(r.Fragment,null,r.createElement(n.Z,{position:"absolute",color:"primary",className:t.appBar},r.createElement(s.Z,{className:t.toolbar},e.button||a,r.createElement(o.Z,{variant:"h6",color:"inherit",noWrap:!0},e.title||l),r.createElement("div",{className:t.grow}),null!=c&&r.createElement("div",{className:t.buttons},c)),null!=i&&i))}))},7546:(e,t,a)=>{"use strict";a.d(t,{T2:()=>Z,j2:()=>f});var n=a(5163),l=a(436),s=a(5256),o=a(1776),r=a(9378),c=a(1837),i=a(2511),d=a(4190),u=a(4882),m=a(2784),p=a(7267),v=a(1810),y=a(8402),b=a(7933);const h=e=>{const t=e.to.toString();return m.createElement(y.Z,Object.assign({},e,{component:t.match(/https/)?"a":b.rU,href:t}),e.children)},g=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),Z=e=>{const[t,a]=m.useState(!1);return m.createElement(m.Fragment,null,m.createElement(E,{open:t,onClose:()=>{a(!1)}}),m.createElement(f,{first:!0,onClick:()=>{a(!0)},icon:m.createElement(u.Z,null)}))},E=(0,p.EN)((0,i.Z)(g)((e=>{const{classes:t}=e,a=[{type:"entry",to:"/",text:(0,v.Z)("menu.plans")},{to:"/temperatures",text:(0,v.Z)("menu.temperatures")},{to:"/schedules",text:(0,v.Z)("menu.schedules")},{to:"/settings",text:(0,v.Z)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,v.Z)("menu.help")}];return m.createElement(d.ZP,{open:e.open,onClose:e.onClose},m.createElement(l.Z,{className:t.text,variant:"h5",gutterBottom:!0},(0,v.Z)("menu.title")),m.createElement(l.Z,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.3-rc19"),m.createElement(s.Z,null),m.createElement(o.Z,null,a.map((a=>"Divider"===a.type?m.createElement(s.Z,null):m.createElement(h,{key:a.to,to:a.to,disabled:e.match.url===a.to,button:!0},m.createElement(r.Z,{primary:a.text,classes:{primary:e.match.url!==a.to?t.normal:t.selected}}))))))}))),f=(0,i.Z)(g)((e=>{const{classes:t,first:a,icon:l}=e,s=(0,n._T)(e,["classes","first","icon"]);return m.createElement(c.Z,Object.assign({className:a?t.firstButton:t.otherButton,color:"inherit"},s),l)}))},4397:(e,t,a)=>{"use strict";a.d(t,{lt:()=>y,xj:()=>v});var n=a(436),l=a(2511),s=a(3434),o=a(3660),r=a(5126),c=a(2784),i=a(4901);const d=a(4087),u=35,m=e=>({root:{fontSize:"1em",float:"left",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",width:45},avatar:{width:u,height:u,lineHeight:u,position:"relative",overflow:"hidden"},img:{width:u,height:u,zIndex:2,position:"absolute",left:0,bottom:0},fill:{display:"block",width:u,height:33,zIndex:1,position:"absolute",left:0,bottom:1}});function p(e,t){return(Math.round(e*Math.pow(10,t))/Math.pow(10,t)).toFixed(t)}const v=(0,l.Z)(m)((e=>{const{value:t,classes:a,fill:l}=e;let{digits:s}=e;const i=(100===l?r.Z:o.Z)[500];return null==s&&(s=2),c.createElement("div",{className:a.root},c.createElement("div",{className:a.avatar},c.createElement("object",{className:a.img,data:d,type:"image/svg+xml"}),c.createElement("span",{style:{height:`calc(${l}% - 5px)`,background:i},className:a.fill})),c.createElement(n.Z,{variant:"body1",color:"textSecondary",component:"div"},p(t,s),"°"))})),y=(0,l.Z)(m)((e=>{const{value:t}=e;return c.createElement(s.Z,{style:{padding:"25px",background:(0,i.h)(t),fontSize:"1em"}},p(t,1),"°")}))},4901:(e,t,a)=>{"use strict";a.d(t,{h:()=>r});var n=a(1634),l=a(6144),s=a(3660),o=a(9406);const r=e=>{const t=Math.round(100*(a=Math.min(Math.max(16,e),24),16,24,1,8,Math.floor(7*(a-16)/8+1))+100);var a;return e<=16?l.Z[t]:e<=18.5?o.Z[t]:e<=20.5?n.Z[t]:s.Z[t]}},3589:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var n=a(2511),l=a(2784);const s=(0,n.Z)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:a,body:n,paddingTop:s,paddingBottom:o}=e.children,r=o||"auto";return l.createElement(l.Fragment,null,l.createElement("div",{className:t.root},a,l.createElement("div",{className:t.body,style:{paddingTop:s,paddingBottom:r}},n)))}))},697:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>z});var n=a(7277),l=a(9520),s=a(5256),o=a(1837),r=a(1776),c=a(8402),i=a(9378),d=a(2511),u=a(6487),m=a(6919),p=a(5352),v=a(9166),y=a(2983),b=a(8096),h=a(2784),g=a(7267),Z=a(3659),E=a(3314),f=a(1583),k=a(5030),C=a(7546),x=a(4397),P=a(1810),S=a(3589),w=a(1105),B=a(2958);const D=h.lazy((()=>Promise.all([a.e(387),a.e(250)]).then(a.bind(a,9250)))),T=h.lazy((()=>Promise.all([a.e(940),a.e(869),a.e(387),a.e(91)]).then(a.bind(a,9091))));function G(e){return e>9?e.toString():"0"+e}function N(e){return e+1>6?0:e+1}const z=(0,g.EN)((0,d.Z)((e=>({list:{marginTop:0,marginBottom:e.spacing(2)},tab:{minWidth:"50px"},avatar:{}})))((e=>{const{classes:t,location:a,history:d}=e,g=(0,B.dr)(),[z,F]=h.useState(!1),[M,$]=h.useState(!1),[j,O]=h.useState(0),{plan:I,loaded:R}=(0,w.g0)(e.match.params.id),{undo:Q,commit:W}=(0,w.k6)();h.useEffect((()=>{Y(0),F(!1),$(!1)}),[a,R]);const{isDirty:U,setDirty:_,selectedDay:A,copyDays:H,loadSetPoint:J,newSetPoint:L,selectDay:V,removeSetPoint:X}=(0,w.Zk)(),Y=(0,h.useCallback)((e=>{O(e),V(N(e))}),[g]);return h.createElement(h.Fragment,null,h.createElement(D,{open:M,onConfirm:e=>{H(N(j),e),Y(j),$(!1)},onCancel:()=>{$(!1)}}),h.createElement(T,{open:z,onClose:e=>{e&&(_(!0),Y(j)),F(!1)}}),h.createElement(S.Z,null,{header:h.createElement(k.Z,null,{title:(0,P.Z)("schedule.title"),button:h.createElement(C.j2,{first:!0,onClick:function(){Q(),d.replace({pathname:`/plans/${I.id}`,state:!0})},icon:U?h.createElement(v.Z,null):h.createElement(p.Z,null)}),actions:h.createElement(h.Fragment,null,h.createElement(C.j2,{onClick:()=>{$(!0)},icon:h.createElement(b.Z,null)}),U&&h.createElement(n.Z,{color:"inherit",onClick:function(){W(),d.replace({pathname:`/plans/${I.id}`,state:!0})}},(0,P.Z)("schedule.save"))),subBar:h.createElement(m.Z,{value:j,onChange:(e,t)=>Y(t),variant:"fullWidth"},h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Monday")}),h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Tuesday")}),h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Wednesday")}),h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Thursday")}),h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Friday")}),h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Saturday")}),h.createElement(u.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,P.Z)("schedule.Sunday")}))}),paddingTop:100,paddingBottom:60,body:h.createElement(h.Fragment,null,h.createElement(Z.Jk,{enabled:z||M,isolation:!1},h.createElement(r.Z,{className:t.list},A.last&&h.createElement(h.Fragment,{key:"-1"},h.createElement(c.Z,{button:!0,onClick:()=>{return Y(0===(e=A.last&&A.last.day||0)?6:e-1);var e}},h.createElement(x.lt,{value:A.last.targetTemperature}),h.createElement(i.Z,{primary:`${E.Jc[A.last.day]}`,secondary:`${G(A.last.hour)}:${G(A.last.minute)}`})),h.createElement(s.Z,null)),A.schedules.map((e=>h.createElement(h.Fragment,{key:e.index},h.createElement(c.Z,{button:!0,onClick:()=>{return t=e,a=e.index,J(Object.assign(Object.assign({},t),{index:a})),void F(!0);var t,a}},h.createElement(x.lt,{value:e.targetTemperature}),h.createElement(i.Z,{primary:`${G(e.hour)}:${G(e.minute)}`}),h.createElement(l.Z,null,h.createElement(o.Z,{className:t.menuButton,onClick:()=>{return t=e.index,X(t),void Y(j);var t}},h.createElement(y.Z,null)))),h.createElement(s.Z,null)))))),h.createElement(f.Z,{onClick:function(){L(N(j)),F(!0)}}))}))})))},1105:(e,t,a)=>{"use strict";a.d(t,{P5:()=>c,Zk:()=>d,_b:()=>i,g0:()=>m,k6:()=>r});var n=a(2784),l=a(4481),s=a(8681),o=a(2958);const r=()=>{const e=(0,o.dr)(),t=(0,o.QG)("loaded"),a=(0,n.useCallback)((()=>e({type:"savePoint"})),[e]),l=(0,n.useCallback)((()=>e({type:"undo"})),[e]),s=(0,n.useCallback)((()=>e({type:"commit"})),[e]);return(0,n.useEffect)((()=>{a()}),[t]),{savePoint:a,undo:l,commit:s}},c=()=>{const e=(0,o.dr)();return{setName:(0,n.useCallback)((t=>e({type:"setName",name:t.target.value})),[e]),setDescription:(0,n.useCallback)((t=>e({type:"setDescription",description:t.target.value})),[e]),toggleState:(0,n.useCallback)((()=>e({type:"toggleEnabled"})),[e]),toggleZone:(0,n.useCallback)((t=>e({type:"toggleZone",zone:t})),[e]),toggleDevice:(0,n.useCallback)((t=>e({type:"toggleDevice",device:t})),[e])}},i=()=>{const e=(0,o.dr)(),[t,a]=(0,n.useState)(!1),l=(0,n.useCallback)(((t,n)=>{e({type:"setOverride",mode:t,temperature:n}),a(!0)}),[e]),s=(0,n.useCallback)((t=>{e({type:"clearOverride",mode:t}),a(!0)}),[e]),r=(0,n.useCallback)(((e,t)=>{0===t?s(e):l(e,t)}),[e]);return(0,n.useEffect)((()=>{a(!1)}),[]),{isDirty:t,setOverride:l,clearOverride:s,updateOverride:r}},d=()=>{const[e,t]=(0,n.useState)(!1),a=(0,o.dr)(),l=(0,n.useCallback)((e=>{a({type:"selectDay",day:e})}),[a]),s=(0,o.QG)("selectedDay"),r=(0,o.QG)("setPoint"),c=(0,n.useCallback)(((e,n)=>{null!=n&&n.length>0&&(t(!0),a({type:"copyDays",source:e,targets:n}))}),[a]),i=(0,n.useCallback)((e=>{t(!0),a({type:"removeSetPoint",index:e})}),[a]),d=(0,n.useCallback)((e=>{a({type:"loadSetPoint",setPoint:e})}),[a]),u=(0,n.useCallback)((e=>{a({type:"newSetPoint",day:e})}),[a]),m=(0,n.useCallback)((e=>{-1===e.index?a({type:"addSetPoint",setPoint:e}):a({type:"updateSetPoint",setPoint:e})}),[a]),p=(0,n.useCallback)((e=>a({type:"setStart",start:e})),[a]),v=(0,n.useCallback)((e=>a({type:"setTargetTemperature",temperature:parseFloat(e.target.value)})),[a]);return(0,n.useEffect)((()=>{t(!1)}),[]),{setDirty:t,isDirty:e,selectedDay:s,setPoint:r,copyDays:c,removeSetPoint:i,loadSetPoint:d,newSetPoint:u,selectDay:l,saveSetPoint:m,setStart:p,setTargetTemperature:v}};let u=!1;const m=(e,t=!0)=>{const a=(0,o.dr)(),r=(0,o.QG)("plan"),c=(0,o.QG)("loaded"),i=(0,o.QG)("dirty");if(!c||!t)if(null!=e&&"new"!==e||u){if(!u)throw s.M.fetchPlanById(e).then((e=>{u=!0,a({type:"loadPlan",plan:e})}))}else u=!0,a({type:"loadPlan",plan:{id:l(),enabled:!1,name:"",zones:[],devices:[],schedule:[],overrides:void 0}});return(0,n.useEffect)((()=>()=>{u=!1}),[e,t]),{plan:r,isDirty:i,loaded:c}}}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.3-rc19/settings/697.js.map