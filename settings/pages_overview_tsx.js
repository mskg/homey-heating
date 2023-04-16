/*! For license information please see pages_overview_tsx.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["pages_overview_tsx"],{"./api/devices/index.tsx":(e,t,s)=>{s.r(t),s.d(t,{deviceAPI:()=>l});var n=s("../../node_modules/tslib/tslib.es6.js"),a=s("../../node_modules/lodash/lodash.js"),o=s("./api/callAPI.tsx");const l={fetchHeatingDevices:()=>(0,n.__awaiter)(void 0,void 0,void 0,(function*(){const e=yield(0,o.default)("GET","/devices"),t=(0,a.sortBy)(e,"name").reduce(((e,t,s)=>(e[s]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./api/hooks.tsx":(e,t,s)=>{s.r(t),s.d(t,{useDevices:()=>u,useMode:()=>p,usePlans:()=>i,useScheduleInformation:()=>c,useSettings:()=>m,useZones:()=>r});var n=s("./api/devices/index.tsx"),a=s("./api/heating/index.tsx"),o=s("./api/settings/index.tsx"),l=s("./api/suspendableState.tsx"),d=s("./api/zones/index.tsx");const i=(0,l.useSuspendableState)("plans",a.planAPI.fetchPlans),u=(0,l.useSuspendableState)("devices",n.deviceAPI.fetchHeatingDevices),r=(0,l.useSuspendableState)("zones",d.zoneAPI.fetchHeatingZones),c=(0,l.useSuspendableState)("scheduleInformation",a.planAPI.fetchSchedule),m=(0,l.useSuspendableState)("settings",o.settingsAPI.fetchSettings),p=(0,l.useSuspendableState)("mode",a.modeAPI.fetchMode)},"./api/settings/index.tsx":(e,t,s)=>{s.r(t),s.d(t,{settingsAPI:()=>o});var n=s("../../node_modules/tslib/tslib.es6.js"),a=s("./api/callAPI.tsx");const o={fetchSettings:()=>(0,n.__awaiter)(void 0,void 0,void 0,(function*(){return yield(0,a.default)("GET","/settings")})),updateSettings:e=>(0,n.__awaiter)(void 0,void 0,void 0,(function*(){return yield(0,a.default)("PUT","/settings",e)}))}},"./api/suspendableState.tsx":(e,t,s)=>{s.r(t),s.d(t,{useSuspendableState:()=>d});var n=s("../../node_modules/tslib/tslib.es6.js"),a=s("../../node_modules/react/index.js");const o=new Map,l="Loading...";function d(e,t){return(s=!1,d=!1)=>{const i=o.get(e);let[u,r]=[null,null];s&&([u,r]=a.useState(i!==l?i:null));const[c,m]=a.useState(!1);function p(s=!1){if(null==o.get(e)||s)throw o.set(e,l),function(e,t){return(0,n.__awaiter)(this,void 0,void 0,(function*(){try{t(yield e())}catch(e){t((()=>{throw e}))}}))}(t,(t=>{"function"==typeof t?o.set(e,t(o.get(e))):o.set(e,t)})).catch((e=>{m(!!d||(()=>{throw e}))}))}return p(),(0,a.useEffect)((()=>()=>{o.delete(e)}),[]),{[e]:s?u:i,[`set${e.charAt(0).toUpperCase()+e.slice(1)}`]:s?r:function(){throw new Error(`You must use hooks to save the value ${e}`)},[`load${e.charAt(0).toUpperCase()+e.slice(1)}`]:p,[`load${e.charAt(0).toUpperCase()+e.slice(1)}Failed`]:c}}}},"./api/zones/index.tsx":(e,t,s)=>{s.r(t),s.d(t,{zoneAPI:()=>l});var n=s("../../node_modules/tslib/tslib.es6.js"),a=s("../../node_modules/lodash/lodash.js"),o=s("./api/callAPI.tsx");const l={fetchHeatingZones:()=>(0,n.__awaiter)(void 0,void 0,void 0,(function*(){const e=yield(0,o.default)("GET","/zones"),t=(0,a.sortBy)(e,"name").reduce(((e,t,s)=>(e[s]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./components/AddFab.tsx":(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var n=s("../../node_modules/@material-ui/core/esm/Fab/Fab.js"),a=s("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),o=s("../../node_modules/@material-ui/icons/Add.js"),l=s("../../node_modules/react/index.js");const d=(0,a.default)((e=>({fabButton:{zIndex:1,margin:"0 auto",position:"absolute",bottom:e.spacing(2),right:e.spacing(2)}})))((e=>{const{classes:t}=e;return l.createElement(n.default,{color:"secondary","aria-label":"Add",className:t.fabButton,onClick:()=>e.onClick()},l.createElement(o.default,null))}))},"./components/InputContainer.tsx":(e,t,s)=>{s.r(t),s.d(t,{default:()=>o});var n=s("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),a=s("../../node_modules/react/index.js");const o=(0,n.default)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>a.createElement("div",{className:e.classes.inputContainer},e.children)))},"./pages/overview.tsx":(e,t,s)=>{s.r(t),s.d(t,{default:()=>P});var n=s("../../node_modules/tslib/tslib.es6.js"),a=s("../../node_modules/@material-ui/core/esm/Select/Select.js"),o=s("../../node_modules/@material-ui/core/esm/MenuItem/MenuItem.js"),l=s("../../node_modules/@material-ui/core/esm/Divider/Divider.js"),d=s("../../node_modules/@material-ui/core/esm/List/List.js"),i=s("../../node_modules/@material-ui/core/esm/ListItem/ListItem.js"),u=s("../../node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js"),r=s("../../node_modules/@material-ui/core/esm/ListItemText/ListItemText.js"),c=s("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),m=s("../../node_modules/@material-ui/core/esm/Switch/Switch.js"),p=s("../../node_modules/lodash/lodash.js"),f=s("../../node_modules/notistack/dist/notistack.esm.js"),h=s("../../node_modules/react/index.js"),g=s("../../node_modules/react-router-dom/esm/react-router-dom.js"),v=s("../../node_modules/react-router/esm/react-router.js"),x=s("./api/heating/index.tsx"),_=s("./api/hooks.tsx"),b=s("./components/AddFab.tsx"),S=s("./components/AppHeader.tsx"),y=s("./components/BodyText.tsx"),j=s("./components/InputContainer.tsx"),E=s("./components/Menu.tsx"),I=s("./components/SubHeader.tsx"),w=s("./i18n/Translation.tsx"),A=s("./layouts/Page.tsx");const P=(0,f.withSnackbar)((0,v.withRouter)((0,c.default)((e=>({list:{marginTop:0,marginBottom:e.spacing(2)}})))((e=>{const{classes:t}=e,{plans:s,loadPlans:c}=(0,_.usePlans)(),{zones:f}=(0,_.useZones)(),{devices:v}=(0,_.useDevices)(),{mode:P,setMode:k}=(0,_.useMode)(!0),[C,M]=h.useState(!1);function L(e){const t=[];return(0,p.forEach)(e.devices,(e=>{const s=v[e];null!=s&&t.push(s.name)})),(0,p.forEach)(e.zones,(e=>{const s=f[e];null!=s&&t.push(s.name)})),(0,p.sortBy)(t,(e=>e)).join(", ")}return h.createElement(A.default,null,{header:h.createElement(S.default,{title:(0,w.default)("plans.title"),button:h.createElement(E.AppMenuButton,null)}),paddingTop:50,paddingBottom:50,body:h.createElement(h.Fragment,null,h.createElement(I.default,{text:(0,w.default)("plans.heatingmode.section")}),h.createElement(j.default,null,h.createElement(a.default,{fullWidth:!0,disabled:C,onChange:t=>{return s=t.target.value,void(0,n.__awaiter)(void 0,void 0,void 0,(function*(){const t=parseInt(s,10);M(!0),yield x.modeAPI.setMode(t),k(t),e.enqueueSnackbar((0,w.default)("plans.modechanged",{name:(0,w.default)(`Modes.${s}`)})),M(!1)}));var s},value:P},[0,1,2,3,4,5].map((e=>h.createElement(o.default,{key:e,value:e},(0,w.default)(`Modes.${e}`)))))),h.createElement(I.default,{text:(0,w.default)("plans.plans.section")}),0===s.length?h.createElement(y.default,{style:{paddingTop:16},text:(0,w.default)("plans.plans.empty")}):h.createElement(d.default,{className:t.list},s.length>0&&h.createElement(l.default,{key:"0"}),s.map((t=>h.createElement(h.Fragment,{key:t.id},h.createElement(i.default,Object.assign({},{to:`/plans/${t.id}`},{component:g.Link,button:!0}),h.createElement(r.default,{primary:t.name,secondary:L(t)}),h.createElement(u.default,null,h.createElement(m.default,{onChange:()=>{return s=t,void(0,n.__awaiter)(void 0,void 0,void 0,(function*(){M(!0),yield x.planAPI.togglePlanState(s),yield c(),e.enqueueSnackbar((0,w.default)("plans.toggled",{name:s.name})),M(!1)}));var s},checked:t.enabled}))),h.createElement(l.default,null))))),h.createElement(b.default,{onClick:()=>{e.history.push("/plans/new")}}))})}))))}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFdBQWMsQ0FBQzRCLElBQUs1QixFQUFLNUUsSUFDdEIsZ0JBQUMsVUFBUSxpQkFBSyxDQUFFMEcsR0FBSSxVQUFVOUIsRUFBSzVFLE1BQU0sQ0FBRTJHLFVBQVcsRUFBQUMsS0FBd0J0QixRQUFRLElBQ2xGLGdCQUFDLFVBQVksQ0FDVHVCLFFBQVNqQyxFQUFLekQsS0FDZDJGLFVBQVduQyxFQUFrQkMsS0FTakMsZ0JBQUMsVUFBdUIsS0FDcEIsZ0JBQUMsVUFBTSxDQUNIa0IsU0FBVSxLQUFNaUIsT0FsRTNDQyxFQWtFdURwQyxPQWpFM0QsaURBRVRGLEdBQVksU0FFTixFQUFBdEUsUUFBQSxnQkFBd0I0RyxTQUN4QjFDLElBRU5oQixFQUFNZ0QsaUJBQWdCLGFBQVUsZ0JBQWlCLENBQzdDbkYsS0FBTTZGLEVBQVE3RixRQUdsQnVELEdBQVksRUFDaEIsSUFiZ0IsSUFBQ3NDLENBa0U0RCxFQUNqQ0MsUUFBU3JDLEVBQUtzQyxZQUkxQixnQkFBQyxVQUFPLFVBS3hCLGdCQUFDLFVBQU0sQ0FBQ3hELFFBNURWLEtBQ2RKLEVBQU02RCxRQUFRbEMsS0FBSyxhQUFhLE1BZ0VuQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwaS9kZXZpY2VzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9hcGkvaG9va3MudHN4Iiwid2VicGFjazovLy8uL2FwaS9zZXR0aW5ncy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vYXBpL3N1c3BlbmRhYmxlU3RhdGUudHN4Iiwid2VicGFjazovLy8uL2FwaS96b25lcy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BZGRGYWIudHN4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSW5wdXRDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL3BhZ2VzL292ZXJ2aWV3LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IHNvcnRCeSB9IGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IElIZWF0aW5nRGV2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2FwcC9tb2RlbFwiO1xuaW1wb3J0IGNhbGxBUEkgZnJvbSBcIi4uL2NhbGxBUElcIjtcblxuZXhwb3J0IHR5cGUgSGFzaFR5cGUgPSB7XG4gIFtrZXk6IHN0cmluZ106IElIZWF0aW5nRGV2aWNlO1xufSAmIEFycmF5TGlrZTxJSGVhdGluZ0RldmljZT47XG5cbi8vIEhvbWV5LmFwaSggU3RyaW5nIG1ldGhvZCwgU3RyaW5nIHBhdGgsIE1peGVkIGJvZHksIEZ1bmN0aW9uIGNhbGxiYWNrIClcbmNvbnN0IGZldGNoSGVhdGluZ0RldmljZXMgPSBhc3luYyAoKTogUHJvbWlzZTxIYXNoVHlwZT4gPT4ge1xuICBjb25zdCBkZXZpY2VzID0gYXdhaXQgY2FsbEFQSTxhbnlbXT4oXCJHRVRcIiwgXCIvZGV2aWNlc1wiKTtcblxuICBjb25zdCByZXN1bHQgPSBzb3J0QnkoZGV2aWNlcywgXCJuYW1lXCIpLnJlZHVjZSgobWFwLCBvYmosIGlkeCkgPT4ge1xuICAgIG1hcFtpZHhdID0gb2JqO1xuICAgIG1hcFtvYmouaWRdID0gb2JqO1xuICAgIHJldHVybiBtYXA7XG4gIH0sIHt9KTtcbiAgcmVzdWx0Lmxlbmd0aCA9IGRldmljZXMubGVuZ3RoO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgZGV2aWNlQVBJID0ge1xuICBmZXRjaEhlYXRpbmdEZXZpY2VzLFxufTtcbiIsImltcG9ydCB7IElIZWF0aW5nRGV2aWNlLCBJSGVhdGluZ1BsYW4sIElIZWF0aW5nWm9uZSwgSVNjaGVkdWxlSW5mb3JtYXRpb24sIE9wZXJhdGlvbk1vZGUgfSBmcm9tIFwiLi4vLi4vYXBwL21vZGVsXCI7XG5pbXBvcnQgeyBkZXZpY2VBUEkgfSBmcm9tIFwiLi9kZXZpY2VzXCI7XG5pbXBvcnQgeyBtb2RlQVBJLCBwbGFuQVBJIH0gZnJvbSBcIi4vaGVhdGluZ1wiO1xuaW1wb3J0IHsgc2V0dGluZ3NBUEksIFNldHRpbmdzSGFzaE1hcCB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQgeyBIb29rUmV0dXJuVHlwZSwgSG9va1NldFR5cGUsIHVzZVN1c3BlbmRhYmxlU3RhdGUgfSBmcm9tIFwiLi9zdXNwZW5kYWJsZVN0YXRlXCI7XG5pbXBvcnQgeyB6b25lQVBJIH0gZnJvbSBcIi4vem9uZXNcIjtcblxudHlwZSBQbGFuc1R5cGUgPSB7XG4gICAgcGxhbnM6IElIZWF0aW5nUGxhbltdLFxuICAgIHNldFBsYW5zOiBIb29rU2V0VHlwZTxJSGVhdGluZ1BsYW5bXT4sXG4gICAgbG9hZFBsYW5zKGZvcmNlPzogYm9vbGVhbik6IEhvb2tSZXR1cm5UeXBlLFxufTtcblxudHlwZSBEZXZpY2VzVHlwZSA9IHtcbiAgICBkZXZpY2VzOiBJSGVhdGluZ0RldmljZVtdLFxuICAgIHNldERldmljZXM6IEhvb2tTZXRUeXBlPElIZWF0aW5nRGV2aWNlW10+LFxuICAgIGxvYWREZXZpY2VzOiBIb29rUmV0dXJuVHlwZSxcbn07XG5cbnR5cGUgWm9uZXNUeXBlID0ge1xuICAgIHpvbmVzOiBJSGVhdGluZ1pvbmVbXSxcbiAgICBzZXRab25lczogSG9va1NldFR5cGU8SUhlYXRpbmdab25lW10+LFxuICAgIGxvYWRab25lczogSG9va1JldHVyblR5cGUsXG59O1xuXG50eXBlIFNjaGVkdWxlSW5mb3JtYXRpb25UeXBlID0ge1xuICAgIHNjaGVkdWxlSW5mb3JtYXRpb246IElTY2hlZHVsZUluZm9ybWF0aW9uLFxuICAgIHNldFNjaGVkdWxlSW5mb3JtYXRpb246IEhvb2tTZXRUeXBlPElTY2hlZHVsZUluZm9ybWF0aW9uPixcbiAgICBsb2FkU2NoZWR1bGVJbmZvcm1hdGlvbjogSG9va1JldHVyblR5cGUsXG59O1xuXG50eXBlIFNldHRpbmdzVHlwZSA9IHtcbiAgICBzZXR0aW5nczogU2V0dGluZ3NIYXNoTWFwLFxuICAgIHNldFNldHRpbmdzOiBIb29rU2V0VHlwZTxTZXR0aW5nc0hhc2hNYXA+LFxuICAgIGxvYWRTZXR0aW5nczogSG9va1JldHVyblR5cGUsXG59O1xuXG50eXBlIE1vZGVUeXBlID0ge1xuICAgIG1vZGU6IE9wZXJhdGlvbk1vZGUsXG4gICAgc2V0TW9kZTogSG9va1NldFR5cGU8T3BlcmF0aW9uTW9kZT4sXG4gICAgbG9hZE1vZGU6IEhvb2tSZXR1cm5UeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZVBsYW5zID0gdXNlU3VzcGVuZGFibGVTdGF0ZTxQbGFuc1R5cGU+KFwicGxhbnNcIiwgcGxhbkFQSS5mZXRjaFBsYW5zKTtcbmV4cG9ydCBjb25zdCB1c2VEZXZpY2VzID0gdXNlU3VzcGVuZGFibGVTdGF0ZTxEZXZpY2VzVHlwZT4oXCJkZXZpY2VzXCIsIGRldmljZUFQSS5mZXRjaEhlYXRpbmdEZXZpY2VzKTtcbmV4cG9ydCBjb25zdCB1c2Vab25lcyA9IHVzZVN1c3BlbmRhYmxlU3RhdGU8Wm9uZXNUeXBlPihcInpvbmVzXCIsIHpvbmVBUEkuZmV0Y2hIZWF0aW5nWm9uZXMpO1xuZXhwb3J0IGNvbnN0IHVzZVNjaGVkdWxlSW5mb3JtYXRpb24gPSB1c2VTdXNwZW5kYWJsZVN0YXRlPFNjaGVkdWxlSW5mb3JtYXRpb25UeXBlPihcInNjaGVkdWxlSW5mb3JtYXRpb25cIiwgcGxhbkFQSS5mZXRjaFNjaGVkdWxlKTtcbmV4cG9ydCBjb25zdCB1c2VTZXR0aW5ncyA9IHVzZVN1c3BlbmRhYmxlU3RhdGU8U2V0dGluZ3NUeXBlPihcInNldHRpbmdzXCIsIHNldHRpbmdzQVBJLmZldGNoU2V0dGluZ3MpO1xuZXhwb3J0IGNvbnN0IHVzZU1vZGUgPSB1c2VTdXNwZW5kYWJsZVN0YXRlPE1vZGVUeXBlPihcIm1vZGVcIiwgbW9kZUFQSS5mZXRjaE1vZGUpO1xuIiwiaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL3NlcnZpY2VzL3NldHRpbmdzLW1hbmFnZXIvdHlwZXNcIjtcbmltcG9ydCBjYWxsQVBJIGZyb20gXCIuLi9jYWxsQVBJXCI7XG5cbmV4cG9ydCB0eXBlIFNldHRpbmdzSGFzaE1hcCA9IHtcbiAgW2tleSBpbiBrZXlvZiB0eXBlb2YgU2V0dGluZ3NdPzogc3RyaW5nIHwgYm9vbGVhbjtcbn07XG5cbmNvbnN0IGZldGNoU2V0dGluZ3MgPSBhc3luYyAoKTogUHJvbWlzZTxTZXR0aW5nc0hhc2hNYXA+ID0+IHtcbiAgcmV0dXJuIGF3YWl0IGNhbGxBUEk8U2V0dGluZ3NIYXNoTWFwPihcIkdFVFwiLCBcIi9zZXR0aW5nc1wiKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVNldHRpbmdzID0gYXN5bmMgKHNldHRpbmdzOiB7fSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICByZXR1cm4gYXdhaXQgY2FsbEFQSTxhbnk+KFwiUFVUXCIsIGAvc2V0dGluZ3NgLCBzZXR0aW5ncyk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0dGluZ3NBUEkgPSB7XG4gIGZldGNoU2V0dGluZ3MsXG4gIHVwZGF0ZVNldHRpbmdzLFxufTtcbiIsImltcG9ydCBSZWFjdCwgeyBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24sIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgdHlwZSBNYXBUeXBlID0ge1trZXk6IHN0cmluZ106IGFueX07XG5cbmV4cG9ydCB0eXBlIEhvb2tTZXRUeXBlPFQ+ID0gRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VD4+O1xuZXhwb3J0IHR5cGUgSG9va1JldHVyblR5cGUgPSAoKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgUHJvdmlkZVN0YXRlPFQgZXh0ZW5kcyBNYXBUeXBlPiA9IChwcm92aWRlU3RhdGU/OiBib29sZWFuLCBwcm92aWRlRmFpbGVkPzogYm9vbGVhbikgPT4gVDtcblxudHlwZSBBc3luYzxUPiA9ICgpID0+IFByb21pc2U8VD47XG5cbi8qKipcbiAqIENhbGwgdGhlIGFwaU1ldGhvZCBhc3luY2hyb25vdXNseS5cbiAqXG4gKiBJZiB0aGUgbWV0aG9kIGZhaWxzLCB0aHJvdyB0aGUgZXhjZXB0aW9uIGluc2lkZSBzZXQgU2V0U3RhdGVBY3Rpb24gb2YgdGhlIGhvb2suXG4gKiBUaGlzIGFsbG93cyB0byBjYXRjaCB0aGUgZXJyb3IgXCJpbiB0aGUgRXJyb3JCb3VuZGFyeS5cIlxuICovXG5hc3luYyBmdW5jdGlvbiB0cnlNZXRob2Q8VD4oYXBpTWV0aG9kOiAoKSA9PiBQcm9taXNlPFQ+LCBzZXRTdGF0ZUFjdGlvbjogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VD4+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgc2V0U3RhdGVBY3Rpb24oYXdhaXQgYXBpTWV0aG9kKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gcmVxdWlyZWQgZm9yIHRoZSBlcnJvciB0byBwb3B1cCB0aGUgaGllcmFyY2h5XG4gICAgICAgIHNldFN0YXRlQWN0aW9uKCgpID0+IHsgdGhyb3cgZTsgfSk7XG4gICAgfVxufVxuXG5jb25zdCBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5jb25zdCBMT0FESU5HOiBhbnkgPSBcIkxvYWRpbmcuLi5cIjtcblxuLyoqXG4gKiBDcmVhdGUgYSBcImhvb2tcIiB0aGF0IGlzIGFibGUgdG8gc3VzcGVuZC5cbiAqXG4gKiBAcGFyYW0gbmFtZSBNdXN0IGJlIHVuaXF1ZVxuICogQHBhcmFtIG1ldGhvZCBUaGUgYXN5bmMgbWV0aG9kIHRvIHdhaXQgZm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdXNwZW5kYWJsZVN0YXRlPFQgZXh0ZW5kcyBNYXBUeXBlPihuYW1lOiBzdHJpbmcsIG1ldGhvZDogQXN5bmM8YW55Pik6IFByb3ZpZGVTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIChwcm92aWRlU3RhdGUgPSBmYWxzZSwgcHJvdmlkZUZhaWxlZCA9IGZhbHNlKSA9PiB7XG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3JhbnQgYXMgaXQgc2V0cyB0aGUgc3RhdGUgYWZ0ZXIgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgY29uc3QgdmFsID0gY2FjaGUuZ2V0KG5hbWUpO1xuICAgICAgICBsZXQgW3N0YXRlLCBzZXRTdGF0ZV0gPSBbbnVsbCwgbnVsbF07XG4gICAgICAgIGlmIChwcm92aWRlU3RhdGUpIHtcbiAgICAgICAgICAgIC8vIHdlIHVzZSBpbnN0YW5jZSBjb21wYXJlIG9uIExPQURJTkcgdG8gZGV0ZXJtaW5lIG5vbiBleGlzdGluZyB2YWx1ZVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgW3N0YXRlLCBzZXRTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZTxhbnk+KHZhbCAhPT0gTE9BRElORyA/IHZhbCA6IG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW2ZhaWxlZCwgc2V0RmFpbGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICAgICAgICBmdW5jdGlvbiBsb2FkVmFsdWUoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKGNhY2hlLmdldChuYW1lKSA9PSBudWxsIHx8IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgY2FjaGUuc2V0KG5hbWUsIExPQURJTkcpO1xuXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB1bmxvYWRzIHRoZSBjb21wb25lbnQgYW5kIHdhaXRzIGZvciB0aGUgcHJvbWlzZSB0byByZXNvbHZlXG4gICAgICAgICAgICAgICAgdGhyb3cgdHJ5TWV0aG9kKG1ldGhvZCwgKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnNldChuYW1lLCAociBhcyBhbnkpKGNhY2hlLmdldChuYW1lKSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUuc2V0KG5hbWUsIHIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm92aWRlRmFpbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgbWUgLSB0aGlzIGRvZXNuJ3Qgd29ya1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmFpbGVkKCgpID0+IHsgdGhyb3cgZTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGYWlsZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRWYWx1ZSgpO1xuXG4gICAgICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImtpbGxlZCB2YWx1ZVwiKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IGNhY2hlLmRlbGV0ZShuYW1lKTsgfTtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIC8vIHdlIHRlbGwgdGhlIERFViB0aGF0IHRoaXMgaXMgbm90IHRoZSB3YXkgdG8gZ29cbiAgICAgICAgZnVuY3Rpb24gZmFpbE9uTm9TdGF0ZSgpIHtcbiAgICAgICAgICAgIGlmICghX19QUk9EVUNUSU9OX18pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBtdXN0IHVzZSBob29rcyB0byBzYXZlIHRoZSB2YWx1ZSAke25hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW25hbWVdOiBwcm92aWRlU3RhdGUgPyBzdGF0ZSA6IHZhbCxcbiAgICAgICAgICAgIFtgc2V0JHtuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX1gXTogcHJvdmlkZVN0YXRlID8gc2V0U3RhdGUgOiBmYWlsT25Ob1N0YXRlLFxuICAgICAgICAgICAgW2Bsb2FkJHtuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX1gXTogbG9hZFZhbHVlLFxuICAgICAgICAgICAgW2Bsb2FkJHtuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKX1GYWlsZWRgXTogZmFpbGVkLFxuICAgICAgICB9IGFzIFQ7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IHNvcnRCeSB9IGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IElIZWF0aW5nWm9uZSB9IGZyb20gXCIuLi8uLi8uLi9hcHAvbW9kZWxcIjtcbmltcG9ydCBjYWxsQVBJIGZyb20gXCIuLi9jYWxsQVBJXCI7XG5cbmV4cG9ydCB0eXBlIEhhc2hUeXBlID0ge1xuICBba2V5OiBzdHJpbmddOiBJSGVhdGluZ1pvbmU7XG59ICYgQXJyYXlMaWtlPElIZWF0aW5nWm9uZT47XG5cbmNvbnN0IGZldGNoSGVhdGluZ1pvbmVzID0gYXN5bmMgKCk6IFByb21pc2U8SGFzaFR5cGU+ID0+IHtcbiAgY29uc3Qgem9uZXMgPSBhd2FpdCBjYWxsQVBJPGFueVtdPihcIkdFVFwiLCBcIi96b25lc1wiKTtcblxuICBjb25zdCByZXN1bHQgPSBzb3J0Qnkoem9uZXMsIFwibmFtZVwiKS5yZWR1Y2UoKG1hcCwgb2JqLCBpZHgpID0+IHtcbiAgICBtYXBbaWR4XSA9IG9iajtcbiAgICBtYXBbb2JqLmlkXSA9IG9iajtcbiAgICByZXR1cm4gbWFwO1xuICB9LCB7fSk7XG5cbiAgcmVzdWx0Lmxlbmd0aCA9IHpvbmVzLmxlbmd0aDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBjb25zdCB6b25lQVBJID0ge1xuICBmZXRjaEhlYXRpbmdab25lcyxcbn07XG4iLCJpbXBvcnQgRmFiIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9GYWJcIjtcbmltcG9ydCB7IFN0eWxlUnVsZXNDYWxsYmFjaywgd2l0aFN0eWxlcywgV2l0aFN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBBZGRJY29uIGZyb20gXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQWRkXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IHN0eWxlczogU3R5bGVSdWxlc0NhbGxiYWNrPGFueSwgYW55PiA9ICh0aGVtZSkgPT4gKHtcbiAgICBmYWJCdXR0b246IHtcbiAgICAgICAgekluZGV4OiAxLFxuICAgICAgICBtYXJnaW46IFwiMCBhdXRvXCIsXG5cbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIiBhcyBcImFic29sdXRlXCIsXG4gICAgICAgIGJvdHRvbTogdGhlbWUuc3BhY2luZygyKSxcbiAgICAgICAgcmlnaHQ6IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgfSxcbn0pO1xuXG50eXBlIFByb3BzID0gV2l0aFN0eWxlczx0eXBlb2Ygc3R5bGVzPiAmIHtcbiAgICBvbkNsaWNrOiAoKSA9PiB2b2lkLFxufTtcblxuY29uc3QgQWRkRmFiQ29tcG9uZW50OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGNsYXNzZXMgfSA9IHByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEZhYiBjb2xvcj1cInNlY29uZGFyeVwiIGFyaWEtbGFiZWw9XCJBZGRcIiBjbGFzc05hbWU9e2NsYXNzZXMuZmFiQnV0dG9ufSBvbkNsaWNrPXsoKSA9PiBwcm9wcy5vbkNsaWNrKCl9PlxuICAgICAgICAgICAgPEFkZEljb24gLz5cbiAgICAgICAgPC9GYWI+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzKShBZGRGYWJDb21wb25lbnQpO1xuIiwiaW1wb3J0IHsgU3R5bGVSdWxlc0NhbGxiYWNrLCB3aXRoU3R5bGVzLCBXaXRoU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBzdHlsZXM6IFN0eWxlUnVsZXNDYWxsYmFjazxhbnksIGFueT4gPSAodGhlbWUpID0+ICh7XG4gICAgaW5wdXRDb250YWluZXI6IHtcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBwYWRkaW5nTGVmdDogdGhlbWUuc3BhY2luZygyKSxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiB0aGVtZS5zcGFjaW5nKDMpLFxuICAgIH0sXG59KTtcblxudHlwZSBQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4sXG59ICYgV2l0aFN0eWxlczx0eXBlb2Ygc3R5bGVzPjtcblxuY29uc3QgSW5wdXRDb250YWluZXI6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PFByb3BzPiA9IChwcm9wcykgPT4ge1xuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e3Byb3BzLmNsYXNzZXMuaW5wdXRDb250YWluZXJ9Pntwcm9wcy5jaGlsZHJlbn08L2Rpdj4pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMpKElucHV0Q29udGFpbmVyKTtcbiIsImltcG9ydCB7IE1lbnVJdGVtLCBTZWxlY3QgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIjtcbmltcG9ydCBEaXZpZGVyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9EaXZpZGVyXCI7XG5pbXBvcnQgTGlzdCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdFwiO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVwiO1xuaW1wb3J0IExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9MaXN0SXRlbVNlY29uZGFyeUFjdGlvblwiO1xuaW1wb3J0IExpc3RJdGVtVGV4dCBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvTGlzdEl0ZW1UZXh0XCI7XG5pbXBvcnQgeyBTdHlsZVJ1bGVzQ2FsbGJhY2ssIHdpdGhTdHlsZXMsIFdpdGhTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCI7XG5pbXBvcnQgU3dpdGNoIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Td2l0Y2hcIjtcbmltcG9ydCB7IGZvckVhY2gsIHNvcnRCeSB9IGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IHdpdGhTbmFja2JhciwgV2l0aFNuYWNrYmFyUHJvcHMgfSBmcm9tIFwibm90aXN0YWNrXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xuaW1wb3J0IHsgTGluaywgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBJSGVhdGluZ1BsYW4sIE9wZXJhdGlvbk1vZGUgfSBmcm9tIFwiLi4vLi4vYXBwL21vZGVsXCI7XG5pbXBvcnQgeyBtb2RlQVBJLCBwbGFuQVBJIH0gZnJvbSBcIi4uL2FwaS9oZWF0aW5nXCI7XG5pbXBvcnQgeyB1c2VEZXZpY2VzLCB1c2VNb2RlLCB1c2VQbGFucywgdXNlWm9uZXMgfSBmcm9tIFwiLi4vYXBpL2hvb2tzXCI7XG5pbXBvcnQgQWRkRmFiIGZyb20gXCIuLi9jb21wb25lbnRzL0FkZEZhYlwiO1xuaW1wb3J0IEFwcEhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9BcHBIZWFkZXJcIjtcbmltcG9ydCBCb2R5VGV4dCBmcm9tIFwiLi4vY29tcG9uZW50cy9Cb2R5VGV4dFwiO1xuaW1wb3J0IElucHV0Q29udGFpbmVyIGZyb20gXCIuLi9jb21wb25lbnRzL0lucHV0Q29udGFpbmVyXCI7XG5pbXBvcnQgeyBBcHBNZW51QnV0dG9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTWVudVwiO1xuaW1wb3J0IFN1YkhlYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9TdWJIZWFkZXJcIjtcbmltcG9ydCB0cmFuc2xhdGUgZnJvbSBcIi4uL2kxOG4vVHJhbnNsYXRpb25cIjtcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9sYXlvdXRzL1BhZ2VcIjtcblxuY29uc3Qgc3R5bGVzOiBTdHlsZVJ1bGVzQ2FsbGJhY2s8YW55LCBhbnk+ID0gKHRoZW1lKSA9PiAoe1xuICAgIGxpc3Q6IHtcbiAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgfSxcbn0pO1xuXG50eXBlIFByb3BzID0gV2l0aFN0eWxlczx0eXBlb2Ygc3R5bGVzPiAmIFJvdXRlQ29tcG9uZW50UHJvcHMgJiBXaXRoU25hY2tiYXJQcm9wcztcblxuY29uc3QgT3ZlcnZpZXdQYWdlOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9wcz4gPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjbGFzc2VzIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHBsYW5zLCBsb2FkUGxhbnMgfSA9IHVzZVBsYW5zKCk7XG4gICAgY29uc3QgeyB6b25lcyB9ID0gdXNlWm9uZXMoKTtcbiAgICBjb25zdCB7IGRldmljZXMgfSA9IHVzZURldmljZXMoKTtcbiAgICBjb25zdCB7IG1vZGUsIHNldE1vZGUgfSA9IHVzZU1vZGUodHJ1ZSk7XG4gICAgY29uc3QgWyB1cGRhdGVVSSwgc2V0VXBkYXRlVUkgXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdEF0dGFjaG1lbnRzKHBsYW46IElIZWF0aW5nUGxhbik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvckVhY2gocGxhbi5kZXZpY2VzLCAoZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXZpY2UgPSBkZXZpY2VzW2RdO1xuICAgICAgICAgICAgaWYgKGRldmljZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChkZXZpY2UubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvckVhY2gocGxhbi56b25lcywgKGQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgem9uZSA9IHpvbmVzW2RdO1xuICAgICAgICAgICAgaWYgKHpvbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goem9uZS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNvcnRCeShlbGVtZW50cywgKGUpID0+IGUpLmpvaW4oXCIsIFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWF0aW5nTW9kZSA9IChuZXdNb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld01vZGVJbnQ6IE9wZXJhdGlvbk1vZGUgPSBwYXJzZUludChuZXdNb2RlLCAxMCk7XG5cbiAgICAgICAgICAgIHNldFVwZGF0ZVVJKHRydWUpO1xuXG4gICAgICAgICAgICBhd2FpdCBtb2RlQVBJLnNldE1vZGUobmV3TW9kZUludCk7XG4gICAgICAgICAgICAvLyBjaGFuZ2UgaXMgYXN5bmMsIHdlIGRvbid0IHdhaXRmb3IgaXQgYXMgcmVsb2FkaW5nIGRvZXMgbm90XG4gICAgICAgICAgICAvLyBwcm92aWRlIHRoZSBjdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBzZXRNb2RlKG5ld01vZGVJbnQpO1xuXG4gICAgICAgICAgICBwcm9wcy5lbnF1ZXVlU25hY2tiYXIodHJhbnNsYXRlKFwicGxhbnMubW9kZWNoYW5nZWRcIiwge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRyYW5zbGF0ZShgTW9kZXMuJHtuZXdNb2RlfWApLFxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBzZXRVcGRhdGVVSShmYWxzZSk7XG4gICAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKHRoZVBsYW46IElIZWF0aW5nUGxhbikgPT4ge1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB0cmlnZ2VyIHVwZGF0ZXNcbiAgICAgICAgICAgIHNldFVwZGF0ZVVJKHRydWUpO1xuXG4gICAgICAgICAgICBhd2FpdCBwbGFuQVBJLnRvZ2dsZVBsYW5TdGF0ZSh0aGVQbGFuKTtcbiAgICAgICAgICAgIGF3YWl0IGxvYWRQbGFucygpO1xuXG4gICAgICAgICAgICBwcm9wcy5lbnF1ZXVlU25hY2tiYXIodHJhbnNsYXRlKFwicGxhbnMudG9nZ2xlZFwiLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhlUGxhbi5uYW1lLFxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBzZXRVcGRhdGVVSShmYWxzZSk7XG4gICAgICAgIH0pKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ldyA9ICgpID0+IHtcbiAgICAgICAgcHJvcHMuaGlzdG9yeS5wdXNoKGAvcGxhbnMvbmV3YCk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxQYWdlPlxuICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICg8QXBwSGVhZGVyIHRpdGxlPXt0cmFuc2xhdGUoXCJwbGFucy50aXRsZVwiKX0gYnV0dG9uPXs8QXBwTWVudUJ1dHRvbiAvPn0gLz4pLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IDUwLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IDUwLFxuXG4gICAgICAgICAgICAgICAgYm9keTogKFxuICAgICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3ViSGVhZGVyIHRleHQ9e3RyYW5zbGF0ZShcInBsYW5zLmhlYXRpbmdtb2RlLnNlY3Rpb25cIil9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRDb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt1cGRhdGVVSX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldnQpID0+IHNldEhlYXRpbmdNb2RlKGV2dC50YXJnZXQudmFsdWUgYXMgc3RyaW5nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsIDEsIDIsIDMsIDQsIDVdLm1hcCgobSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8TWVudUl0ZW0ga2V5PXttfSB2YWx1ZT17bX0+e3RyYW5zbGF0ZShgTW9kZXMuJHttfWApfTwvTWVudUl0ZW0+KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5wdXRDb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdWJIZWFkZXIgdGV4dD17dHJhbnNsYXRlKFwicGxhbnMucGxhbnMuc2VjdGlvblwiKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcGxhbnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyA8Qm9keVRleHQgc3R5bGU9e3twYWRkaW5nVG9wOiAxNn19IHRleHQ9e3RyYW5zbGF0ZShcInBsYW5zLnBsYW5zLmVtcHR5XCIpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPExpc3QgY2xhc3NOYW1lPXtjbGFzc2VzLmxpc3R9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGxhbnMubGVuZ3RoID4gMCAmJiA8RGl2aWRlciBrZXk9XCIwXCIgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwbGFucy5tYXAoKHBsYW4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e3BsYW4uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbSB7Li4ueyB0bzogYC9wbGFucy8ke3BsYW4uaWR9YCB9fSBjb21wb25lbnQ9e0xpbmsgYXMgdW5rbm93biBhcyBcImFcIn0gYnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cGxhbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5PXtmb3JtYXRBdHRhY2htZW50cyhwbGFuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlY29uZGFyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHtmb3JtYXRBdHRhY2htZW50cyhwbGFuKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgPENoYXJ0IGhlaWdodD17MzB9IGxlZ2VuZD17ZmFsc2V9IHBsYW49e3BsYW59IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRvZ2dsZVN0YXRlKHBsYW4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3BsYW4uZW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPEFkZEZhYiBvbkNsaWNrPXtjcmVhdGVOZXd9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH19XG4gICAgICAgIDwvUGFnZT5cbiAgICApO1xufTtcblxuLy8gQHRzLWlnbm9yZVxuZXhwb3J0IGRlZmF1bHQgd2l0aFNuYWNrYmFyKHdpdGhSb3V0ZXIod2l0aFN0eWxlcyhzdHlsZXMpKE92ZXJ2aWV3UGFnZSkpKTtcbiJdLCJuYW1lcyI6WyJkZXZpY2VBUEkiLCJmZXRjaEhlYXRpbmdEZXZpY2VzIiwiZGV2aWNlcyIsInJlc3VsdCIsInNvcnRCeSIsInJlZHVjZSIsIm1hcCIsIm9iaiIsImlkeCIsImlkIiwibGVuZ3RoIiwidXNlUGxhbnMiLCJ1c2VTdXNwZW5kYWJsZVN0YXRlIiwicGxhbkFQSSIsInVzZURldmljZXMiLCJ1c2Vab25lcyIsInpvbmVBUEkiLCJ1c2VTY2hlZHVsZUluZm9ybWF0aW9uIiwidXNlU2V0dGluZ3MiLCJzZXR0aW5nc0FQSSIsInVzZU1vZGUiLCJtb2RlQVBJIiwiZmV0Y2hTZXR0aW5ncyIsInVwZGF0ZVNldHRpbmdzIiwic2V0dGluZ3MiLCJjYWNoZSIsIk1hcCIsIkxPQURJTkciLCJuYW1lIiwibWV0aG9kIiwicHJvdmlkZVN0YXRlIiwicHJvdmlkZUZhaWxlZCIsInZhbCIsImdldCIsInN0YXRlIiwic2V0U3RhdGUiLCJmYWlsZWQiLCJzZXRGYWlsZWQiLCJsb2FkVmFsdWUiLCJmb3JjZSIsInNldCIsImFwaU1ldGhvZCIsInNldFN0YXRlQWN0aW9uIiwiZSIsInRyeU1ldGhvZCIsInIiLCJjYXRjaCIsInVzZUVmZmVjdCIsImRlbGV0ZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJFcnJvciIsImZldGNoSGVhdGluZ1pvbmVzIiwiem9uZXMiLCJ0aGVtZSIsImZhYkJ1dHRvbiIsInpJbmRleCIsIm1hcmdpbiIsInBvc2l0aW9uIiwiYm90dG9tIiwic3BhY2luZyIsInJpZ2h0IiwicHJvcHMiLCJjbGFzc2VzIiwiY29sb3IiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiaW5wdXRDb250YWluZXIiLCJ3aWR0aCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiY2hpbGRyZW4iLCJ3aXRoU25hY2tiYXIiLCJ3aXRoUm91dGVyIiwibGlzdCIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsInBsYW5zIiwibG9hZFBsYW5zIiwibW9kZSIsInNldE1vZGUiLCJ1cGRhdGVVSSIsInNldFVwZGF0ZVVJIiwiZm9ybWF0QXR0YWNobWVudHMiLCJwbGFuIiwiZWxlbWVudHMiLCJmb3JFYWNoIiwiZCIsImRldmljZSIsInB1c2giLCJ6b25lIiwiam9pbiIsImhlYWRlciIsInRpdGxlIiwiYnV0dG9uIiwiQXBwTWVudUJ1dHRvbiIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiYm9keSIsInRleHQiLCJmdWxsV2lkdGgiLCJkaXNhYmxlZCIsIm9uQ2hhbmdlIiwiZXZ0Iiwic2V0SGVhdGluZ01vZGUiLCJuZXdNb2RlIiwidGFyZ2V0IiwidmFsdWUiLCJuZXdNb2RlSW50IiwicGFyc2VJbnQiLCJlbnF1ZXVlU25hY2tiYXIiLCJtIiwia2V5Iiwic3R5bGUiLCJ0byIsImNvbXBvbmVudCIsIkxpbmsiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwidG9nZ2xlU3RhdGUiLCJ0aGVQbGFuIiwiY2hlY2tlZCIsImVuYWJsZWQiLCJoaXN0b3J5Il0sInNvdXJjZVJvb3QiOiIifQ==