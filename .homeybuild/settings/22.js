/*! For license information please see 22.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[22],{"./api/devices/index.tsx":(e,t,s)=>{s.d(t,{i:()=>i});var n=s("../../node_modules/tslib/tslib.es6.js"),o=s("../../node_modules/lodash/lodash.js"),a=s("./api/callAPI.tsx");const i={fetchHeatingDevices:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,a.Z)("GET","/devices"),t=(0,o.sortBy)(e,"name").reduce(((e,t,s)=>(e[s]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./api/hooks.tsx":(e,t,s)=>{s.d(t,{Ls:()=>p,yU:()=>x,xn:()=>u,Si:()=>g,rV:()=>v,HT:()=>h});var n=s("./api/devices/index.tsx"),o=s("./api/heating/index.tsx"),a=s("./api/settings/index.tsx"),i=s("../../node_modules/tslib/tslib.es6.js"),l=s("../../node_modules/react/index.js");const d=new Map,c="Loading...";function r(e,t){return(s=!1,n=!1)=>{const o=d.get(e);let[a,r]=[null,null];s&&([a,r]=l.useState(o!==c?o:null));const[m,u]=l.useState(!1);function p(s=!1){if(null==d.get(e)||s)throw d.set(e,c),function(e,t){return(0,i.mG)(this,void 0,void 0,(function*(){try{t(yield e())}catch(e){t((()=>{throw e}))}}))}(t,(t=>{"function"==typeof t?d.set(e,t(d.get(e))):d.set(e,t)})).catch((e=>{u(!!n||(()=>{throw e}))}))}return p(),(0,l.useEffect)((()=>()=>{d.delete(e)}),[]),{[e]:s?a:o,[`set${e.charAt(0).toUpperCase()+e.slice(1)}`]:s?r:function(){},[`load${e.charAt(0).toUpperCase()+e.slice(1)}`]:p,[`load${e.charAt(0).toUpperCase()+e.slice(1)}Failed`]:m}}}var m=s("./api/zones/index.tsx");const u=r("plans",o.M.fetchPlans),p=r("devices",n.i.fetchHeatingDevices),h=r("zones",m.v.fetchHeatingZones),g=r("scheduleInformation",o.M.fetchSchedule),v=r("settings",a.w.fetchSettings),x=r("mode",o.X.fetchMode)},"./api/settings/index.tsx":(e,t,s)=>{s.d(t,{w:()=>a});var n=s("../../node_modules/tslib/tslib.es6.js"),o=s("./api/callAPI.tsx");const a={fetchSettings:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){return yield(0,o.Z)("GET","/settings")})),updateSettings:e=>(0,n.mG)(void 0,void 0,void 0,(function*(){return yield(0,o.Z)("PUT","/settings",e)}))}},"./api/zones/index.tsx":(e,t,s)=>{s.d(t,{v:()=>i});var n=s("../../node_modules/tslib/tslib.es6.js"),o=s("../../node_modules/lodash/lodash.js"),a=s("./api/callAPI.tsx");const i={fetchHeatingZones:()=>(0,n.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,a.Z)("GET","/zones"),t=(0,o.sortBy)(e,"name").reduce(((e,t,s)=>(e[s]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./components/AddFab.tsx":(e,t,s)=>{s.d(t,{Z:()=>l});var n=s("../../node_modules/@material-ui/core/esm/Fab/Fab.js"),o=s("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),a=s("../../node_modules/@material-ui/icons/Add.js"),i=s("../../node_modules/react/index.js");const l=(0,o.Z)((e=>({fabButton:{zIndex:1,margin:"0 auto",position:"absolute",bottom:e.spacing(2),right:e.spacing(2)}})))((e=>{const{classes:t}=e;return i.createElement(n.Z,{color:"secondary","aria-label":"Add",className:t.fabButton,onClick:()=>e.onClick()},i.createElement(a.Z,null))}))},"./components/InputContainer.tsx":(e,t,s)=>{s.d(t,{Z:()=>a});var n=s("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),o=s("../../node_modules/react/index.js");const a=(0,n.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>o.createElement("div",{className:e.classes.inputContainer},e.children)))},"./pages/overview.tsx":(e,t,s)=>{s.r(t),s.d(t,{default:()=>I});var n=s("../../node_modules/tslib/tslib.es6.js"),o=s("../../node_modules/@material-ui/core/esm/Select/Select.js"),a=s("../../node_modules/@material-ui/core/esm/MenuItem/MenuItem.js"),i=s("../../node_modules/@material-ui/core/esm/Divider/Divider.js"),l=s("../../node_modules/@material-ui/core/esm/List/List.js"),d=s("../../node_modules/@material-ui/core/esm/ListItem/ListItem.js"),c=s("../../node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js"),r=s("../../node_modules/@material-ui/core/esm/ListItemText/ListItemText.js"),m=s("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),u=s("../../node_modules/@material-ui/core/esm/Switch/Switch.js"),p=s("../../node_modules/lodash/lodash.js"),h=s("../../node_modules/notistack/dist/notistack.esm.js"),g=s("../../node_modules/react/index.js"),v=s("../../node_modules/react-router-dom/esm/react-router-dom.js"),x=s("../../node_modules/react-router/esm/react-router.js"),Z=s("./api/heating/index.tsx"),f=s("./api/hooks.tsx"),y=s("./components/AddFab.tsx"),b=s("./components/AppHeader.tsx"),j=s("./components/BodyText.tsx"),E=s("./components/InputContainer.tsx"),_=s("./components/Menu.tsx"),S=s("./components/SubHeader.tsx"),k=s("./i18n/Translation.tsx"),w=s("./layouts/Page.tsx");const I=(0,h.RM)((0,x.EN)((0,m.Z)((e=>({list:{marginTop:0,marginBottom:e.spacing(2)}})))((e=>{const{classes:t}=e,{plans:s,loadPlans:m}=(0,f.xn)(),{zones:h}=(0,f.HT)(),{devices:x}=(0,f.Ls)(),{mode:I,setMode:C}=(0,f.yU)(!0),[T,A]=g.useState(!1);function M(e){const t=[];return(0,p.forEach)(e.devices,(e=>{const s=x[e];null!=s&&t.push(s.name)})),(0,p.forEach)(e.zones,(e=>{const s=h[e];null!=s&&t.push(s.name)})),(0,p.sortBy)(t,(e=>e)).join(", ")}return g.createElement(w.Z,null,{header:g.createElement(b.Z,{title:(0,k.Z)("plans.title"),button:g.createElement(_.T2,null)}),paddingTop:50,paddingBottom:50,body:g.createElement(g.Fragment,null,g.createElement(S.Z,{text:(0,k.Z)("plans.heatingmode.section")}),g.createElement(E.Z,null,g.createElement(o.Z,{fullWidth:!0,disabled:T,onChange:t=>{return s=t.target.value,void(0,n.mG)(void 0,void 0,void 0,(function*(){const t=parseInt(s,10);A(!0),yield Z.X.setMode(t),C(t),e.enqueueSnackbar((0,k.Z)("plans.modechanged",{name:(0,k.Z)(`Modes.${s}`)})),A(!1)}));var s},value:I},[0,1,2,3,4,5].map((e=>g.createElement(a.Z,{key:e,value:e},(0,k.Z)(`Modes.${e}`)))))),g.createElement(S.Z,{text:(0,k.Z)("plans.plans.section")}),0===s.length?g.createElement(j.Z,{style:{paddingTop:16},text:(0,k.Z)("plans.plans.empty")}):g.createElement(l.Z,{className:t.list},s.length>0&&g.createElement(i.Z,{key:"0"}),s.map((t=>g.createElement(g.Fragment,{key:t.id},g.createElement(d.Z,Object.assign({},{to:`/plans/${t.id}`},{component:v.rU,button:!0}),g.createElement(r.Z,{primary:t.name,secondary:M(t)}),g.createElement(c.Z,null,g.createElement(u.Z,{onChange:()=>{return s=t,void(0,n.mG)(void 0,void 0,void 0,(function*(){A(!0),yield Z.M.togglePlanState(s),yield m(),e.enqueueSnackbar((0,k.Z)("plans.toggled",{name:s.name})),A(!1)}));var s},checked:t.enabled}))),g.createElement(i.Z,null))))),g.createElement(y.Z,{onClick:()=>{e.history.push("/plans/new")}}))})}))))}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc11/settings/22.js.map