/*! For license information please see 17.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[17],{"../../node_modules/@material-ui/core/esm/FormControlLabel/FormControlLabel.js":(e,t,n)=>{n.d(t,{Z:()=>b});var s=n("../../node_modules/@babel/runtime/helpers/esm/extends.js"),l=n("../../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=n("../../node_modules/react/index.js"),a=n("../../node_modules/prop-types/index.js"),i=n.n(a),c=n("../../node_modules/clsx/dist/clsx.m.js"),r=n("../../node_modules/@material-ui/utils/esm/refType.js"),d=n("../../node_modules/@material-ui/core/esm/FormControl/useFormControl.js"),m=n("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),u=n("../../node_modules/@material-ui/core/esm/Typography/Typography.js"),g=n("../../node_modules/@material-ui/core/esm/utils/capitalize.js"),p=o.forwardRef((function(e,t){e.checked;var n=e.classes,a=e.className,i=e.control,r=e.disabled,m=(e.inputRef,e.label),p=e.labelPlacement,b=void 0===p?"end":p,h=(e.name,e.onChange,e.value,(0,l.Z)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),Z=(0,d.Z)(),f=r;void 0===f&&void 0!==i.props.disabled&&(f=i.props.disabled),void 0===f&&Z&&(f=Z.disabled);var x={disabled:f};return["checked","name","onChange","value","inputRef"].forEach((function(t){void 0===i.props[t]&&void 0!==e[t]&&(x[t]=e[t])})),o.createElement("label",(0,s.Z)({className:(0,c.Z)(n.root,a,"end"!==b&&n["labelPlacement".concat((0,g.Z)(b))],f&&n.disabled),ref:t},h),o.cloneElement(i,x),o.createElement(u.Z,{component:"span",className:(0,c.Z)(n.label,f&&n.disabled)},m))}));p.propTypes={checked:i().bool,classes:i().object,className:i().string,control:i().element.isRequired,disabled:i().bool,inputRef:r.Z,label:i().node,labelPlacement:i().oneOf(["bottom","end","start","top"]),name:i().string,onChange:i().func,value:i().any};const b=(0,m.Z)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(p)},"./api/devices/index.tsx":(e,t,n)=>{n.d(t,{i:()=>a});var s=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/lodash/lodash.js"),o=n("./api/callAPI.tsx");const a={fetchHeatingDevices:()=>(0,s.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,o.Z)("GET","/devices"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./api/hooks.tsx":(e,t,n)=>{n.d(t,{Ls:()=>g,yU:()=>Z,xn:()=>u,Si:()=>b,rV:()=>h,HT:()=>p});var s=n("./api/devices/index.tsx"),l=n("./api/heating/index.tsx"),o=n("./api/settings/index.tsx"),a=n("../../node_modules/tslib/tslib.es6.js"),i=n("../../node_modules/react/index.js");const c=new Map,r="Loading...";function d(e,t){return(n=!1,s=!1)=>{const l=c.get(e);let[o,d]=[null,null];n&&([o,d]=i.useState(l!==r?l:null));const[m,u]=i.useState(!1);function g(n=!1){if(null==c.get(e)||n)throw c.set(e,r),function(e,t){return(0,a.mG)(this,void 0,void 0,(function*(){try{t(yield e())}catch(e){t((()=>{throw e}))}}))}(t,(t=>{"function"==typeof t?c.set(e,t(c.get(e))):c.set(e,t)})).catch((e=>{u(!!s||(()=>{throw e}))}))}return g(),(0,i.useEffect)((()=>()=>{c.delete(e)}),[]),{[e]:n?o:l,[`set${e.charAt(0).toUpperCase()+e.slice(1)}`]:n?d:function(){},[`load${e.charAt(0).toUpperCase()+e.slice(1)}`]:g,[`load${e.charAt(0).toUpperCase()+e.slice(1)}Failed`]:m}}}var m=n("./api/zones/index.tsx");const u=d("plans",l.M.fetchPlans),g=d("devices",s.i.fetchHeatingDevices),p=d("zones",m.v.fetchHeatingZones),b=d("scheduleInformation",l.M.fetchSchedule),h=d("settings",o.w.fetchSettings),Z=d("mode",l.X.fetchMode)},"./api/settings/index.tsx":(e,t,n)=>{n.d(t,{w:()=>o});var s=n("../../node_modules/tslib/tslib.es6.js"),l=n("./api/callAPI.tsx");const o={fetchSettings:()=>(0,s.mG)(void 0,void 0,void 0,(function*(){return yield(0,l.Z)("GET","/settings")})),updateSettings:e=>(0,s.mG)(void 0,void 0,void 0,(function*(){return yield(0,l.Z)("PUT","/settings",e)}))}},"./api/zones/index.tsx":(e,t,n)=>{n.d(t,{v:()=>a});var s=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/lodash/lodash.js"),o=n("./api/callAPI.tsx");const a={fetchHeatingZones:()=>(0,s.mG)(void 0,void 0,void 0,(function*(){const e=yield(0,o.Z)("GET","/zones"),t=(0,l.sortBy)(e,"name").reduce(((e,t,n)=>(e[n]=t,e[t.id]=t,e)),{});return t.length=e.length,t}))}},"./components/FormTextField.tsx":(e,t,n)=>{n.d(t,{Z:()=>i});var s=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/@material-ui/core/esm/TextField/TextField.js"),o=n("../../node_modules/react/index.js"),a=n("./components/InputContainer.tsx");const i=e=>{var{classes:t}=e,n=(0,s._T)(e,["classes"]);return o.createElement(a.Z,null,o.createElement(l.Z,Object.assign({fullWidth:!0,margin:"normal"},n)))}},"./components/InputContainer.tsx":(e,t,n)=>{n.d(t,{Z:()=>o});var s=n("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),l=n("../../node_modules/react/index.js");const o=(0,s.Z)((e=>({inputContainer:{width:"100%",paddingLeft:e.spacing(2),paddingRight:e.spacing(3)}})))((e=>l.createElement("div",{className:e.classes.inputContainer},e.children)))},"./pages/settings.tsx":(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var s=n("../../node_modules/tslib/tslib.es6.js"),l=n("../../node_modules/@material-ui/core/esm/Button/Button.js"),o=n("../../node_modules/@material-ui/core/esm/FormControlLabel/FormControlLabel.js"),a=n("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),i=n("../../node_modules/@material-ui/core/esm/Switch/Switch.js"),c=n("../../node_modules/@material-ui/icons/Cancel.js"),r=n("../../node_modules/notistack/dist/notistack.esm.js"),d=n("../../node_modules/react/index.js"),m=n("../../node_modules/react-router/esm/react-router.js"),u=n("./api/hooks.tsx"),g=n("./api/settings/index.tsx"),p=n("./components/AppHeader.tsx"),b=n("./components/BodyText.tsx"),h=n("./components/FormTextField.tsx"),Z=n("./components/InputContainer.tsx"),f=n("./components/Menu.tsx"),x=n("./components/SubHeader.tsx"),v=n("./i18n/Translation.tsx"),E=n("./layouts/Page.tsx");const y=(0,r.RM)((0,m.EN)((0,a.Z)((e=>({})))((e=>{const{settings:t,setSettings:n,loadSettings:a}=(0,u.rV)(!0),[r,m]=d.useState(!1);function y(e,n=null){const s=t[e];return null==s?n:s}const C=(e,t="value")=>s=>{const l=s.target[t];n((t=>Object.assign(Object.assign({},t),{[e]:l}))),m(!0)};return d.createElement(E.Z,null,{header:d.createElement(p.Z,null,{title:(0,v.Z)("settings.title"),button:d.createElement(d.Fragment,null,!r&&d.createElement(f.T2,null),r&&d.createElement(f.j2,{first:!0,onClick:()=>(0,s.mG)(void 0,void 0,void 0,(function*(){yield a(),m(!1)})),icon:d.createElement(c.Z,null)})),actions:d.createElement(d.Fragment,null,r&&d.createElement(l.Z,{color:"inherit",onClick:()=>{g.w.updateSettings(t).then((t=>{e.enqueueSnackbar((0,v.Z)("settings.saved")),m(!1)}))}},"save"))}),paddingTop:50,paddingBottom:50,body:d.createElement(d.Fragment,null,d.createElement(x.Z,{text:(0,v.Z)("settings.notifications.category")}),d.createElement(b.Z,{text:(0,v.Z)("settings.notifications.text")}),d.createElement(Z.Z,null,d.createElement(o.Z,{control:d.createElement(i.Z,{checked:!0===y("NotifyModeChange",!0),onChange:C("NotifyModeChange","checked")}),label:(0,v.Z)("settings.notifications.NotifyModeChange"),labelPlacement:"end"})),d.createElement(Z.Z,null,d.createElement(o.Z,{control:d.createElement(i.Z,{checked:!0===y("NotifySetError",!0),onChange:C("NotifySetError","checked")}),label:(0,v.Z)("settings.notifications.NotifySetError"),labelPlacement:"end"})),d.createElement(Z.Z,null,d.createElement(o.Z,{control:d.createElement(i.Z,{checked:!0===y("NotifySetSuccess",!0),onChange:C("NotifySetSuccess","checked")}),label:(0,v.Z)("settings.notifications.NotifySetSuccess"),labelPlacement:"end"})),d.createElement(x.Z,{text:(0,v.Z)("settings.sentry.category")}),d.createElement(b.Z,{text:(0,v.Z)("settings.sentry.text")}),d.createElement(Z.Z,null,d.createElement(o.Z,{control:d.createElement(i.Z,{checked:!0===y("SentryEnabled",!0),onChange:C("SentryEnabled","checked")}),label:(0,v.Z)("settings.enabled.label"),labelPlacement:"end"})),d.createElement(x.Z,{text:(0,v.Z)("settings.log.category")}),d.createElement(b.Z,{text:(0,v.Z)("settings.log.text")}),d.createElement(Z.Z,null,d.createElement(o.Z,{control:d.createElement(i.Z,{checked:!0===y("ConsoleReLogEnabled"),onChange:C("ConsoleReLogEnabled","checked")}),label:(0,v.Z)("settings.enabled.label"),labelPlacement:"end"})),d.createElement(h.Z,{label:(0,v.Z)("settings.category.label"),placeholder:(0,v.Z)("settings.category.placeholder"),required:!0===y("ConsoleReLogEnabled"),value:y("ConsoleReLogCategory",""),onChange:C("ConsoleReLogCategory")}),d.createElement(x.Z,{text:(0,v.Z)("settings.backup.title")}),d.createElement(b.Z,{text:(0,v.Z)("settings.backup.text")}),d.createElement(h.Z,{label:(0,v.Z)("settings.backup.label"),placeholder:(0,v.Z)("settings.backup.placeholder"),multiline:!0,rowsMax:"10",value:y("Plans",""),onChange:C("Plans")}))})}))))}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc11/settings/17.js.map