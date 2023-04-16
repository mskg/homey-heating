/*! For license information please see 24.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[24],{"./api/devices/index.tsx":(e,t,n)=>{n.d(t,{i:()=>o});var a=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/lodash/lodash.js"),s=n("./api/callAPI.tsx");const o={fetchHeatingDevices:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/devices"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./api/zones/index.tsx":(e,t,n)=>{n.d(t,{v:()=>o});var a=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/lodash/lodash.js"),s=n("./api/callAPI.tsx");const o={fetchHeatingZones:()=>(0,a.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,s.Z)("GET","/zones"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./components/FormTextField.tsx":(e,t,n)=>{n.d(t,{Z:()=>i});var a=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/@material-ui/core/esm/TextField/TextField.js"),s=n("../../node_modules/react/index.js"),o=n("./components/InputContainer.tsx");const i=e=>{var{classes:t}=e,n=(0,a._T)(e,["classes"]);return s.createElement(o.Z,null,s.createElement(l.Z,Object.assign({fullWidth:!0,margin:"normal"},n)))}},"./components/InputContainer.tsx":(e,t,n)=>{n.d(t,{Z:()=>s});var a=n("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),l=n("../../node_modules/react/index.js");const s=(0,a.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>l.createElement("div",{className:e.classes.inputContainer},e.children)))},"./components/Transition.tsx":(e,t,n)=>{n.d(t,{Z:()=>s});var a=n("../../node_modules/@material-ui/core/esm/Zoom/Zoom.js"),l=n("../../node_modules/react/index.js");function s(e){return l.createElement(a.Z,Object.assign({},e))}},"./pages/plan.tsx":(e,t,n)=>{n.r(t),n.d(t,{default:()=>ie});var a=n("../../node_modules/@material-ui/core/esm/LinearProgress/LinearProgress.js"),l=n("../../node_modules/@material-ui/core/esm/Button/Button.js"),s=n("../../node_modules/@material-ui/core/esm/Tabs/Tabs.js"),o=n("../../node_modules/@material-ui/core/esm/Tab/Tab.js"),i=n("../../node_modules/@material-ui/core/esm/Avatar/Avatar.js"),r=n("../../node_modules/@material-ui/core/esm/Checkbox/Checkbox.js"),c=n("../../node_modules/@material-ui/core/esm/FormControlLabel/FormControlLabel.js"),m=n("../../node_modules/@material-ui/core/esm/List/List.js"),d=n("../../node_modules/@material-ui/core/esm/ListItem/ListItem.js"),u=n("../../node_modules/@material-ui/core/esm/ListItemAvatar/ListItemAvatar.js"),p=n("../../node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js"),Z=n("../../node_modules/@material-ui/core/esm/ListItemText/ListItemText.js"),v=n("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),b=n("../../node_modules/@material-ui/core/esm/Switch/Switch.js"),g=n("../../node_modules/@material-ui/icons/ArrowBackIos.js"),h=n("../../node_modules/@material-ui/icons/Cancel.js"),E=n("../../node_modules/@material-ui/icons/Delete.js"),y=n("../../node_modules/@material-ui/icons/FileCopy.js"),x=n("../../node_modules/lodash/lodash.js"),j=n("../../node_modules/notistack/dist/notistack.esm.js"),C=n("../../node_modules/react/index.js"),_=n("../../node_modules/react-router-dom/esm/react-router-dom.js"),k=n("../../node_modules/react-router/esm/react-router.js"),f=n("../../node_modules/react-scroll-locky/dist/es2015/component.js"),T=n("../../node_modules/uuid/v1.js"),D=n("./api/heating/index.tsx"),P=n("./components/AppHeader.tsx"),w=n("./components/BodyText.tsx"),S=n("../../node_modules/tslib/tslib.es6.js"),O=n("../../node_modules/@material-ui/core/esm/Dialog/Dialog.js"),z=n("../../node_modules/@material-ui/core/esm/DialogActions/DialogActions.js"),L=n("../../node_modules/@material-ui/core/esm/DialogContent/DialogContent.js"),F=n("../../node_modules/@material-ui/core/esm/DialogContentText/DialogContentText.js"),I=n("../../node_modules/@material-ui/core/esm/DialogTitle/DialogTitle.js"),A=n("./i18n/Translation.tsx"),B=n("./components/Transition.tsx");const G=e=>{const{open:t,title:n,content:a,onOK:s,onCancel:o}=e,i=(0,S._T)(e,["open","title","content","onOK","onCancel"]);return C.createElement(O.Z,Object.assign({open:t,onClose:()=>{o()},TransitionComponent:B.Z},i),C.createElement(I.Z,null,n||(0,A.Z)("confirm.title")),C.createElement(L.Z,null,C.createElement(F.Z,null,a)),C.createElement(z.Z,null,C.createElement(l.Z,{onClick:()=>{o()},color:"primary"},(0,A.Z)("confirm.cancel")),C.createElement(l.Z,{onClick:()=>{s()},color:"primary"},(0,A.Z)("confirm.ok"))))};var H=n("./components/FormTextField.tsx"),N=n("../../node_modules/@material-ui/icons/esm/Home.js"),Q=n("../../node_modules/@material-ui/icons/esm/Hotel.js"),M=n("../../node_modules/@material-ui/icons/esm/People.js"),R=n("../../node_modules/@material-ui/icons/esm/HotTub.js"),$=n("../../node_modules/@material-ui/icons/esm/BusinessCenter.js"),q=n("../../node_modules/@material-ui/icons/esm/FreeBreakfast.js"),K=n("../../node_modules/@material-ui/icons/esm/DirectionsWalk.js");function U(e){switch(e.name){case"home":return C.createElement(N.Z,null);case"bed":return C.createElement(Q.Z,null);case"living":return C.createElement(M.Z,null);case"toilet":case"shower":return C.createElement(R.Z,null);case"books":case"study":return C.createElement($.Z,null);case"kitchen":return C.createElement(q.Z,null);default:return C.createElement(K.Z,null)}}var W=n("./components/Menu.tsx"),J=n("./components/SubHeader.tsx"),V=n("./layouts/Page.tsx"),X=n("./api/devices/index.tsx"),Y=n("./state/PlanProvider.tsx");let ee=!1;var te=n("./state/planHooks.tsx"),ne=n("./api/zones/index.tsx");let ae=!1;const le=C.lazy((()=>n.e(26).then(n.bind(n,"./dialogs/CloneDialog.tsx")))),se=C.lazy((()=>Promise.all([n.e(6),n.e(25)]).then(n.bind(n,"./components/TemperatureChart/index.tsx")))),oe=e=>{const{children:t,id:n,activeTab:l}=e;return C.createElement(C.Suspense,{fallback:C.createElement(a.Z,{style:{margin:16},color:"secondary"})},n===l&&t)},ie=(0,j.RM)((0,k.EN)((0,v.Z)((e=>({button:{margin:e.spacing(2)},divider:{marginTop:e.spacing(3),marginBottom:e.spacing(1)},avatar:{width:"24px",height:"24px"}})))((e=>{const{classes:t}=e,[n,a]=C.useState(0),{plan:v,isDirty:j}=(0,te.g0)(e.match.params.id,!0===e.location.state),{setName:k,setDescription:O,toggleState:z,toggleZone:L,toggleDevice:F}=(0,te.P5)(),I=(e=>{const t=(0,Y.dr)(),n=(0,Y.QG)("zones");if(!e&&!ae)throw ae=!0,ne.v.fetchHeatingZones().then((e=>{t({type:"loadZones",zones:e})}));return(0,C.useEffect)((()=>()=>{ae=!1}),[e]),n})(!0===e.location.state),B=(e=>{const t=(0,Y.dr)(),n=(0,Y.QG)("devices");if(!e&&!ee)throw ee=!0,X.i.fetchHeatingDevices().then((e=>{t({type:"loadDevices",devices:e})}));return(0,C.useEffect)((()=>()=>{ee=!1}),[e]),n})(!0===e.location.state);(0,C.useEffect)((()=>{Q(!1),a(!0===e.location.state?1:0)}),[e.location]);const[N,Q]=(0,C.useState)(!1),{dialog:M,open:R,isOpen:$}=(e=>{const{onConfirm:t}=e,n=(0,S._T)(e,["onConfirm"]),[a,l]=(0,C.useState)(!1);return{dialog:C.createElement(G,Object.assign({open:a,onCancel:()=>{l(!1)},onOK:t},n)),isOpen:a,open:()=>{l(!0)}}})({title:(0,A.Z)("plan.confirm.title"),content:(0,A.Z)("plan.confirm.content"),onConfirm:()=>{q()}}),q=()=>{D.M.removePlan(v.id).then((t=>{e.history.push({pathname:"/",state:!1}),e.enqueueSnackbar((0,A.Z)("plan.removed",{name:v.name}))}))};return C.createElement(C.Fragment,null,M,C.createElement(le,{open:N,name:v.name,onConfirm:t=>{const n=Object.assign(Object.assign({},v),{enabled:!1,id:T(),name:t});D.M.updatePlan(n).then((t=>{e.history.push({pathname:`/plans/${n.id}`,state:!1}),e.enqueueSnackbar((0,A.Z)("plan.duplicated",{name:v.name}))})).catch((e=>{throw e}))},onCancel:()=>{Q(!1)}}),C.createElement(V.Z,null,{header:C.createElement(P.Z,null,{title:v.name||(0,A.Z)("plan.unnamed"),button:C.createElement(W.j2,Object.assign({first:!0},{to:"/"},{component:_.rU,icon:j?C.createElement(h.Z,null):C.createElement(g.Z,null)})),actions:C.createElement(C.Fragment,null,"new"!==v.id&&!j&&C.createElement(W.j2,{onClick:()=>{Q(!0)},icon:C.createElement(y.Z,null)}),"new"!==v.id&&C.createElement(W.j2,{onClick:R,icon:C.createElement(E.Z,null)}),j&&C.createElement(l.Z,{color:"inherit",onClick:()=>{D.M.updatePlan(v).then((t=>{e.history.push({pathname:"/",state:!1}),e.enqueueSnackbar((0,A.Z)("plan.saved",{name:v.name}))}))}},(0,A.Z)("plan.save"))),subBar:C.createElement(s.Z,{value:n,onChange:(e,t)=>a(t),variant:"scrollable",scrollButtons:"off"},C.createElement(o.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,A.Z)("plan.tabs.overview")}),C.createElement(o.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,A.Z)("plan.tabs.schedule")}),C.createElement(o.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,A.Z)("plan.tabs.zones",{n:v.zones.length})}),C.createElement(o.Z,{classes:{root:e.classes.tab},disableRipple:!0,label:(0,A.Z)("plan.tabs.devices",{n:v.devices.length})}))}),paddingTop:100,body:C.createElement(f.Jk,{enabled:N||$,isolation:!1},C.createElement(C.Fragment,null,C.createElement(oe,{id:0,activeTab:n},C.createElement(J.Z,{text:(0,A.Z)("plan.overview.section")}),C.createElement(w.Z,{text:(0,A.Z)("plan.overview.text")}),C.createElement(H.Z,{label:(0,A.Z)("plan.overview.name.label"),placeholder:(0,A.Z)("plan.overview.name.placeholder"),value:v.name,onChange:k}),C.createElement(w.Z,{style:{paddingTop:16},text:(0,A.Z)("plan.overview.text_enable")}),C.createElement(c.Z,{control:C.createElement(b.Z,{onChange:z,checked:v.enabled}),label:(0,A.Z)("plan.overview.enabled.label"),labelPlacement:"start"}),C.createElement(w.Z,{style:{paddingTop:16},text:(0,A.Z)("plan.overview.text_description")}),C.createElement(H.Z,{label:(0,A.Z)("plan.overview.description.label"),placeholder:(0,A.Z)("plan.overview.description.placeholder"),multiline:!0,value:v.description,onChange:O})),C.createElement(oe,{id:1,activeTab:n},C.createElement(J.Z,{text:(0,A.Z)("plan.schedules.section")}),C.createElement(w.Z,{text:(0,A.Z)("plan.schedules.text")}),C.createElement("div",{style:{paddingTop:16,display:"flex",flexDirection:"row"}},C.createElement(_.rU,{style:{textDecoration:"none"},to:{pathname:`/plans/${v.id}/schedule`,state:v},replace:!0},C.createElement(l.Z,{variant:"contained",color:"primary",className:t.button},(0,A.Z)("plan.schedules.edit"))),C.createElement(_.rU,{style:{textDecoration:"none"},to:{pathname:`/plans/${v.id}/exceptions`,state:v},replace:!0},C.createElement(l.Z,{variant:"contained",color:"primary",className:t.button},(0,A.Z)("plan.schedules.exceptions")))),0!==v.schedule.length&&C.createElement(J.Z,{text:(0,A.Z)("plan.schedules.section_summary")}),0!==v.schedule.length&&C.createElement(se,{plan:v})),C.createElement(oe,{id:2,activeTab:n},C.createElement(J.Z,{text:(0,A.Z)("plan.zones.section")}),C.createElement(w.Z,{text:(0,A.Z)("plan.zones.text")}),0===I.length?C.createElement(w.Z,{style:{paddingTop:16},text:(0,A.Z)("plan.zones.empty")}):C.createElement(m.Z,null,(0,x.map)(I,(e=>C.createElement(d.Z,{key:e.id,button:!0,onClick:()=>L(e.id)},null!=e.icon&&C.createElement(u.Z,null,C.createElement(U,{name:e.icon})),C.createElement(Z.Z,{primary:e.name}),C.createElement(p.Z,null,C.createElement(r.Z,{onChange:()=>L(e.id),checked:null!=v.zones.find((t=>t===e.id))}))))))),C.createElement(oe,{id:3,activeTab:n},C.createElement(J.Z,{text:(0,A.Z)("plan.devices.section")}),C.createElement(w.Z,{text:(0,A.Z)("plan.devices.text")}),0===B.length?C.createElement(w.Z,{style:{paddingTop:16},text:(0,A.Z)("plan.devices.empty")}):C.createElement(m.Z,null,(0,x.map)(B,(e=>C.createElement(d.Z,{key:e.id,button:!0,onClick:()=>F(e.id)},null!=e.icon&&C.createElement(u.Z,null,C.createElement(i.Z,{className:t.avatar,src:`${e.icon}`})),C.createElement(Z.Z,{primary:e.name}),C.createElement(p.Z,null,C.createElement(r.Z,{onChange:()=>F(e.id),checked:null!=v.devices.find((t=>t===e.id))})))))))))}))}))))},"./state/planHooks.tsx":(e,t,n)=>{n.d(t,{P5:()=>r,Zk:()=>m,_b:()=>c,g0:()=>u,k6:()=>i});var a=n("../../node_modules/react/index.js"),l=n("../../node_modules/uuid/v1.js"),s=n("./api/heating/index.tsx"),o=n("./state/PlanProvider.tsx");const i=()=>{const e=(0,o.dr)(),t=(0,o.QG)("loaded"),n=(0,a.useCallback)((()=>e({type:"savePoint"})),[e]),l=(0,a.useCallback)((()=>e({type:"undo"})),[e]),s=(0,a.useCallback)((()=>e({type:"commit"})),[e]);return(0,a.useEffect)((()=>{n()}),[t]),{savePoint:n,undo:l,commit:s}},r=()=>{const e=(0,o.dr)();return{setName:(0,a.useCallback)((t=>e({type:"setName",name:t.target.value})),[e]),setDescription:(0,a.useCallback)((t=>e({type:"setDescription",description:t.target.value})),[e]),toggleState:(0,a.useCallback)((()=>e({type:"toggleEnabled"})),[e]),toggleZone:(0,a.useCallback)((t=>e({type:"toggleZone",zone:t})),[e]),toggleDevice:(0,a.useCallback)((t=>e({type:"toggleDevice",device:t})),[e])}},c=()=>{const e=(0,o.dr)(),[t,n]=(0,a.useState)(!1),l=(0,a.useCallback)(((t,a)=>{e({type:"setOverride",mode:t,temperature:a}),n(!0)}),[e]),s=(0,a.useCallback)((t=>{e({type:"clearOverride",mode:t}),n(!0)}),[e]),i=(0,a.useCallback)(((e,t)=>{0===t?s(e):l(e,t)}),[e]);return(0,a.useEffect)((()=>{n(!1)}),[]),{isDirty:t,setOverride:l,clearOverride:s,updateOverride:i}},m=()=>{const[e,t]=(0,a.useState)(!1),n=(0,o.dr)(),l=(0,a.useCallback)((e=>{n({type:"selectDay",day:e})}),[n]),s=(0,o.QG)("selectedDay"),i=(0,o.QG)("setPoint"),r=(0,a.useCallback)(((e,a)=>{null!=a&&a.length>0&&(t(!0),n({type:"copyDays",source:e,targets:a}))}),[n]),c=(0,a.useCallback)((e=>{t(!0),n({type:"removeSetPoint",index:e})}),[n]),m=(0,a.useCallback)((e=>{n({type:"loadSetPoint",setPoint:e})}),[n]),d=(0,a.useCallback)((e=>{n({type:"newSetPoint",day:e})}),[n]),u=(0,a.useCallback)((e=>{-1===e.index?n({type:"addSetPoint",setPoint:e}):n({type:"updateSetPoint",setPoint:e})}),[n]),p=(0,a.useCallback)((e=>n({type:"setStart",start:e})),[n]),Z=(0,a.useCallback)((e=>n({type:"setTargetTemperature",temperature:parseFloat(e.target.value)})),[n]);return(0,a.useEffect)((()=>{t(!1)}),[]),{setDirty:t,isDirty:e,selectedDay:s,setPoint:i,copyDays:r,removeSetPoint:c,loadSetPoint:m,newSetPoint:d,selectDay:l,saveSetPoint:u,setStart:p,setTargetTemperature:Z}};let d=!1;const u=(e,t=!0)=>{const n=(0,o.dr)(),i=(0,o.QG)("plan"),r=(0,o.QG)("loaded"),c=(0,o.QG)("dirty");if(!r||!t)if(null!=e&&"new"!==e||d){if(!d)throw s.M.fetchPlanById(e).then((e=>{d=!0,n({type:"loadPlan",plan:e})}))}else d=!0,n({type:"loadPlan",plan:{id:l(),enabled:!1,name:"",zones:[],devices:[],schedule:[],overrides:void 0}});return(0,a.useEffect)((()=>()=>{d=!1}),[e,t]),{plan:i,isDirty:c,loaded:r}}}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc11/settings/24.js.map