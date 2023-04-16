/*! For license information please see api_heating_index_tsx-components_AppHeader_tsx-components_BodyText_tsx-components_Menu_tsx-co-de1dce.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["api_heating_index_tsx-components_AppHeader_tsx-components_BodyText_tsx-components_Menu_tsx-co-de1dce"],{"./api/callAPI.tsx":(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});var s=o("../../node_modules/tslib/tslib.es6.js");function n(e,t,o=null){return(0,s.__awaiter)(this,void 0,void 0,(function*(){const s={method:e,headers:{"Content-Type":"application/json"},cache:"no-store"};null!=o&&(s.body=JSON.stringify(o));const n=yield fetch(`http://homey-pro.iot.home.arpa/api/app/app.mskg.homey-heating${t}`,s);return yield n.json()}))}},"./api/heating/index.tsx":(e,t,o)=>{o.r(t),o.d(t,{modeAPI:()=>i,planAPI:()=>r});var s=o("../../node_modules/tslib/tslib.es6.js"),n=o("../../node_modules/lodash/lodash.js"),a=o("./api/callAPI.tsx");const l=e=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){const t=Object.assign({},e);return t.zones&&0!==t.zones.length||(t.zones=void 0),t.devices&&0!==t.devices.length||(t.devices=void 0),yield(0,a.default)("PUT",`/plans/${e.id}`,t)})),r={fetchPlans:()=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){const e=yield(0,a.default)("GET","/plans");return(0,n.sortBy)((0,n.map)(e,(e=>(e.zones=e.zones||[],e.devices=e.devices||[],e))),(e=>e.name))})),fetchPlanById:e=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){const t=yield(0,a.default)("GET",`/plans/${e}`);if(null==t)throw new Error(`Plan ${e} not found.`);return t.zones=t.zones||[],t.devices=t.devices||[],t})),fetchSchedule:()=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){const e=yield(0,a.default)("GET","/schedule");return e.temperatures=(0,n.sortBy)(e.temperatures,[e=>e.device.name]),e})),updatePlan:l,removePlan:e=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){return yield(0,a.default)("DELETE",`/plans/${e}`)})),togglePlanState:e=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){return e.enabled=!e.enabled,yield l(e),!0}))},i={fetchMode:()=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){return(yield(0,a.default)("GET","/mode")).mode})),setMode:e=>(0,s.__awaiter)(void 0,void 0,void 0,(function*(){return yield(0,a.default)("PUT","/mode",{mode:e})}))}},"./components/AppHeader.tsx":(e,t,o)=>{o.r(t),o.d(t,{default:()=>i});var s=o("../../node_modules/@material-ui/core/esm/AppBar/AppBar.js"),n=o("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),a=o("../../node_modules/@material-ui/core/esm/Toolbar/Toolbar.js"),l=o("../../node_modules/@material-ui/core/esm/Typography/Typography.js"),r=o("../../node_modules/react/index.js");const i=(0,n.default)((e=>({appBar:{},grow:{flexGrow:1},buttons:{display:"flex"},toolbar:{alignItems:"center",justifyContent:"space-between"}})))((e=>{const{classes:t}=e,{button:o,title:n,actions:i,subBar:d}=e.children||{button:null,title:null,actions:null,subBar:null};return r.createElement(r.Fragment,null,r.createElement(s.default,{position:"absolute",color:"primary",className:t.appBar},r.createElement(a.default,{className:t.toolbar},e.button||o,r.createElement(l.default,{variant:"h6",color:"inherit",noWrap:!0},e.title||n),r.createElement("div",{className:t.grow}),null!=i&&r.createElement("div",{className:t.buttons},i)),null!=d&&d))}))},"./components/BodyText.tsx":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var s=o("../../node_modules/tslib/tslib.es6.js"),n=o("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),a=o("../../node_modules/@material-ui/core/esm/Typography/Typography.js"),l=o("../../node_modules/react/index.js");const r=(0,n.default)((e=>({text:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:o}=e,n=(0,s.__rest)(e,["classes","text"]);return l.createElement(a.default,Object.assign({className:t.text,color:"textSecondary"},n),o)}))},"./components/ListItemLink.tsx":(e,t,o)=>{o.r(t),o.d(t,{default:()=>i});var s=o("../../node_modules/tslib/tslib.es6.js"),n=o("../../node_modules/@material-ui/core/esm/ListItem/ListItem.js"),a=o("../../node_modules/react/index.js"),l=o("../../node_modules/react-router-dom/esm/react-router-dom.js");function r(e){var{innerRef:t}=e,o=(0,s.__rest)(e,["innerRef"]);return o.to.toString().match(/https/)?a.createElement("a",Object.assign({onClick:()=>Homey.openURL(o.to.toString())},o),o.children):a.createElement(l.Link,Object.assign({},o))}const i=e=>a.createElement(n.default,Object.assign({},e,{component:r}),e.children)},"./components/Menu.tsx":(e,t,o)=>{o.r(t),o.d(t,{AppMenuButton:()=>_,MenuButton:()=>v,default:()=>x});var s=o("../../node_modules/tslib/tslib.es6.js"),n=o("../../node_modules/@material-ui/core/esm/Typography/Typography.js"),a=o("../../node_modules/@material-ui/core/esm/Divider/Divider.js"),l=o("../../node_modules/@material-ui/core/esm/List/List.js"),r=o("../../node_modules/@material-ui/core/esm/ListItemText/ListItemText.js"),i=o("../../node_modules/@material-ui/core/esm/IconButton/IconButton.js"),d=o("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),u=o("../../node_modules/@material-ui/core/esm/Drawer/Drawer.js"),c=o("../../node_modules/@material-ui/icons/Menu.js"),m=o("../../node_modules/react/index.js"),p=o("../../node_modules/react-router/esm/react-router.js"),f=o("./i18n/Translation.tsx"),h=o("./components/ListItemLink.tsx");const y=e=>({text:{padding:e.spacing(2),paddingBottom:0},version:{padding:e.spacing(2),paddingTop:0},normal:{},selected:{color:e.palette.primary.main},otherButton:{},firstButton:{marginLeft:-12}}),_=e=>{const[t,o]=m.useState(!1);return m.createElement(m.Fragment,null,m.createElement(g,{open:t,onClose:()=>{o(!1)}}),m.createElement(v,{first:!0,onClick:()=>{o(!0)},icon:m.createElement(c.default,null)}))},g=(0,p.withRouter)((0,d.default)(y)((e=>{const{classes:t}=e,o=[{type:"entry",to:"/",text:(0,f.default)("menu.plans")},{to:"/temperatures",text:(0,f.default)("menu.temperatures")},{to:"/schedules",text:(0,f.default)("menu.schedules")},{to:"/settings",text:(0,f.default)("menu.settings")},{to:"https://homey-heating.mskg.app",text:(0,f.default)("menu.help")}];return m.createElement(u.default,{open:e.open,onClose:e.onClose},m.createElement(n.default,{className:t.text,variant:"h5",gutterBottom:!0},(0,f.default)("menu.title")),m.createElement(n.default,{className:t.version,variant:"body2",color:"textSecondary",gutterBottom:!0},"Version ","2.0.0-rc10"," (","v2.0.0-rc10",")"),m.createElement(a.default,null),m.createElement(l.default,null,o.map((o=>"Divider"===o.type?m.createElement(a.default,null):m.createElement(h.default,{key:o.to,to:o.to,disabled:e.match.url===o.to,button:!0},m.createElement(r.default,{primary:o.text,classes:{primary:e.match.url!==o.to?t.normal:t.selected}}))))))}))),v=(0,d.default)(y)((e=>{const{classes:t,first:o,icon:n}=e,a=(0,s.__rest)(e,["classes","first","icon"]);return m.createElement(i.default,Object.assign({className:o?t.firstButton:t.otherButton,color:"inherit"},a),n)})),x=g},"./components/SubHeader.tsx":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var s=o("../../node_modules/tslib/tslib.es6.js"),n=o("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),a=o("../../node_modules/@material-ui/core/esm/Typography/Typography.js"),l=o("../../node_modules/react/index.js");const r=(0,n.default)((e=>({headline:{marginTop:e.spacing(4),paddingLeft:e.spacing(2),paddingRight:e.spacing(2)}})))((e=>{const{classes:t,text:o}=e,n=(0,s.__rest)(e,["classes","text"]);return l.createElement(a.default,Object.assign({className:t.headline,variant:"h5",color:"textSecondary",gutterBottom:!0},n),o)}))},"./layouts/Page.tsx":(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});var s=o("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),n=o("../../node_modules/react/index.js");const a=(0,s.default)((e=>({root:{webkitOverflowScrolling:"touch",display:"flex",flexFlow:"column",height:"100vh",width:"100vw",backgroundColor:"#fff"},body:{flex:"1 0 100%",margin:0,maxWidth:"100%",overflowY:"scroll"}})))((e=>{const{classes:t}=e,{header:o,body:s,paddingTop:a,paddingBottom:l}=e.children,r=l||"auto";return n.createElement(n.Fragment,null,n.createElement("div",{className:t.root},o,n.createElement("div",{className:t.body,style:{paddingTop:a,paddingBottom:r}},s)))}))}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpX2hlYXRpbmdfaW5kZXhfdHN4LWNvbXBvbmVudHNfQXBwSGVhZGVyX3RzeC1jb21wb25lbnRzX0JvZHlUZXh0X3RzeC1jb21wb25lbnRzX01lbnVfdHN4LWNvLWRlMWRjZS5qcyIsIm1hcHBpbmdzIjoiO29SQUFlLFNBQWVBLEVBQVdDLEVBQWdCQyxFQUFjQyxFQUFZLDREQVMvRSxNQUFNQyxFQUFlLENBQ2pCSCxTQUNBSSxRQUFTLENBQ0wsZUFBZ0Isb0JBRXBCQyxNQUFPLFlBR0MsTUFBUkgsSUFDQUMsRUFBUUQsS0FBT0ksS0FBS0MsVUFBVUwsSUFJbEMsTUFBTU0sUUFBWUMsTUFBTSxnRUFBb0RSLElBQVFFLEdBQ3BGLGFBQWFLLEVBQUlFLE1BQ3JCLDJNQ25CQSxNQWtCTUMsRUFBb0JDLElBQWlELGlEQUN6RSxNQUFNQyxFQUFXLE9BQUgsVUFBT0QsR0FLckIsT0FIS0MsRUFBU0MsT0FBbUMsSUFBMUJELEVBQVNDLE1BQU1DLFNBQWdCRixFQUFTQyxXQUFRRSxHQUNsRUgsRUFBU0ksU0FBdUMsSUFBNUJKLEVBQVNJLFFBQVFGLFNBQWdCRixFQUFTSSxhQUFVRCxTQUVoRSxhQUFzQixNQUFPLFVBQVVKLEVBQVFNLEtBQU1MLEVBQ3BFLElBZ0NhTSxFQUFVLENBQ3JCQyxXQTFEaUIsS0FBcUMsaURBQ3RELE1BQU1aLFFBQVksYUFBd0IsTUFBTyxVQUVqRCxPQUFPLElBQUFhLFNBQU8sSUFBQUMsS0FBSWQsR0FBTWUsSUFDdEJBLEVBQUtULE1BQVFTLEVBQUtULE9BQVMsR0FDM0JTLEVBQUtOLFFBQVVNLEVBQUtOLFNBQVcsR0FFeEJNLE1BQ0pDLEdBQU1BLEVBQUVDLE1BQ2YsSUFrREVDLGNBNUIyQlIsSUFBc0MsaURBQ2pFLE1BQU1LLFFBQWEsYUFBc0IsTUFBTyxVQUFVTCxLQUMxRCxHQUFZLE1BQVJLLEVBQWdCLE1BQU0sSUFBSUksTUFBTSxRQUFRVCxnQkFLNUMsT0FIQUssRUFBS1QsTUFBUVMsRUFBS1QsT0FBUyxHQUMzQlMsRUFBS04sUUFBVU0s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TXlILE1BQU8sQ0FBQ3pDLGFBQVlGLGNBQWUwQyxJQUM1RHhILElBSWhCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBpL2NhbGxBUEkudHN4Iiwid2VicGFjazovLy8uL2FwaS9oZWF0aW5nL2luZGV4LnRzeCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FwcEhlYWRlci50c3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Cb2R5VGV4dC50c3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9MaXN0SXRlbUxpbmsudHN4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVudS50c3giLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9TdWJIZWFkZXIudHN4Iiwid2VicGFjazovLy8uL2xheW91dHMvUGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY2FsbEFQSTxUPihtZXRob2Q6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBhbnkgPSBudWxsKTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKF9fUFJPRFVDVElPTl9fKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBIb21leS5hcGkobWV0aG9kLCBwYXRoLCBib2R5LCAoZXJyOiBhbnksIHJlc3VsdDogYW55KSA9PiAge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmVqZWN0KGVycik7IH0gZWxzZSB7IHJlc29sdmUocmVzdWx0KTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIixcbiAgICB9O1xuXG4gICAgaWYgKGJvZHkgIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICB9XG5cbiAgICAvLyBsb2NhbCBkZXZlbG9wbWVudFxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke19fSE9NRVlfREVWX1VSTH0vYXBpL2FwcC9hcHAubXNrZy5ob21leS1oZWF0aW5nJHtwYXRofWAsIG9wdGlvbnMpO1xuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpIGFzIFQ7XG59XG4iLCJcbmltcG9ydCB7IG1hcCwgc29ydEJ5IH0gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgSUdyb3VwZWRDYWxjdWxhdGVkVGVtcGVyYXR1cmUsIElIZWF0aW5nUGxhbiwgSVNjaGVkdWxlSW5mb3JtYXRpb24sIE9wZXJhdGlvbk1vZGUgfSBmcm9tIFwiLi4vLi4vLi4vYXBwL21vZGVsXCI7XG5pbXBvcnQgY2FsbEFQSSBmcm9tIFwiLi4vY2FsbEFQSVwiO1xuXG5jb25zdCBmZXRjaFBsYW5zID0gYXN5bmMgKCk6IFByb21pc2U8SUhlYXRpbmdQbGFuW10+ID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgY2FsbEFQSTxJSGVhdGluZ1BsYW5bXT4oXCJHRVRcIiwgXCIvcGxhbnNcIik7XG5cbiAgcmV0dXJuIHNvcnRCeShtYXAocmVzLCAocGxhbjogSUhlYXRpbmdQbGFuKSA9PiB7XG4gICAgcGxhbi56b25lcyA9IHBsYW4uem9uZXMgfHwgW107XG4gICAgcGxhbi5kZXZpY2VzID0gcGxhbi5kZXZpY2VzIHx8IFtdO1xuXG4gICAgcmV0dXJuIHBsYW47XG4gIH0pLCAocCkgPT4gcC5uYW1lKTtcbn07XG5cbmNvbnN0IHRvZ2dsZVBsYW5TdGF0ZSA9IGFzeW5jIChwbGFuOiBJSGVhdGluZ1BsYW4pOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgcGxhbi5lbmFibGVkID0gIXBsYW4uZW5hYmxlZDtcbiAgYXdhaXQgdXBkYXRlUGxhbihwbGFuKTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IHVwZGF0ZVBsYW4gPSBhc3luYyAobmV3UGxhbjogSUhlYXRpbmdQbGFuKTogUHJvbWlzZTxJSGVhdGluZ1BsYW4+ID0+IHtcbiAgY29uc3QgcGxhbkNvcHkgPSB7Li4ubmV3UGxhbn07XG5cbiAgaWYgKCFwbGFuQ29weS56b25lcyB8fCBwbGFuQ29weS56b25lcy5sZW5ndGggPT09IDApIHsgcGxhbkNvcHkuem9uZXMgPSB1bmRlZmluZWQ7IH1cbiAgaWYgKCFwbGFuQ29weS5kZXZpY2VzIHx8IHBsYW5Db3B5LmRldmljZXMubGVuZ3RoID09PSAwKSB7IHBsYW5Db3B5LmRldmljZXMgPSB1bmRlZmluZWQ7IH1cblxuICByZXR1cm4gYXdhaXQgY2FsbEFQSTxJSGVhdGluZ1BsYW4+KFwiUFVUXCIsIGAvcGxhbnMvJHtuZXdQbGFuLmlkfWAsIHBsYW5Db3B5KTtcbn07XG5cbmNvbnN0IHJlbW92ZVBsYW4gPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8SUhlYXRpbmdQbGFuPiA9PiB7XG4gIHJldHVybiBhd2FpdCBjYWxsQVBJPElIZWF0aW5nUGxhbj4oXCJERUxFVEVcIiwgYC9wbGFucy8ke2lkfWApO1xufTtcblxuY29uc3QgZmV0Y2hQbGFuQnlJZCA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTxJSGVhdGluZ1BsYW4+ID0+IHtcbiAgY29uc3QgcGxhbiA9IGF3YWl0IGNhbGxBUEk8SUhlYXRpbmdQbGFuPihcIkdFVFwiLCBgL3BsYW5zLyR7aWR9YCk7XG4gIGlmIChwbGFuID09IG51bGwpIHsgdGhyb3cgbmV3IEVycm9yKGBQbGFuICR7aWR9IG5vdCBmb3VuZC5gKTsgfVxuXG4gIHBsYW4uem9uZXMgPSBwbGFuLnpvbmVzIHx8IFtdO1xuICBwbGFuLmRldmljZXMgPSBwbGFuLmRldmljZXMgfHwgW107XG5cbiAgcmV0dXJuIHBsYW47XG59O1xuXG5jb25zdCBmZXRjaFNjaGVkdWxlID0gYXN5bmMgKCk6IFByb21pc2U8SVNjaGVkdWxlSW5mb3JtYXRpb24+ID0+IHtcbiAgY29uc3Qgc2NoZWR1bGUgPSBhd2FpdCBjYWxsQVBJPElTY2hlZHVsZUluZm9ybWF0aW9uPihcIkdFVFwiLCBgL3NjaGVkdWxlYCk7XG4gIHNjaGVkdWxlLnRlbXBlcmF0dXJlcyA9IHNvcnRCeShzY2hlZHVsZS50ZW1wZXJhdHVyZXMsIFsoczogSUdyb3VwZWRDYWxjdWxhdGVkVGVtcGVyYXR1cmUpID0+IHMuZGV2aWNlLm5hbWVdKTtcblxuICByZXR1cm4gc2NoZWR1bGU7XG59O1xuXG5jb25zdCBmZXRjaE1vZGUgPSBhc3luYyAoKTogUHJvbWlzZTxPcGVyYXRpb25Nb2RlPiA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGNhbGxBUEk8e21vZGU6IE9wZXJhdGlvbk1vZGV9PihcIkdFVFwiLCBcIi9tb2RlXCIpO1xuICByZXR1cm4gcmVzLm1vZGU7XG59O1xuXG5jb25zdCBzZXRNb2RlID0gYXN5bmMgKG1vZGU6IE9wZXJhdGlvbk1vZGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgIHJldHVybiBhd2FpdCBjYWxsQVBJPHZvaWQ+KFwiUFVUXCIsIGAvbW9kZWAsIHttb2RlfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGxhbkFQSSA9IHtcbiAgZmV0Y2hQbGFucyxcbiAgZmV0Y2hQbGFuQnlJZCxcbiAgZmV0Y2hTY2hlZHVsZSxcbiAgdXBkYXRlUGxhbixcbiAgcmVtb3ZlUGxhbixcbiAgdG9nZ2xlUGxhblN0YXRlLFxufTtcblxuZXhwb3J0IGNvbnN0IG1vZGVBUEkgPSB7XG4gIGZldGNoTW9kZSxcbiAgc2V0TW9kZSxcbn07XG4iLCJpbXBvcnQgQXBwQmFyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXJcIjtcbmltcG9ydCB7IFN0eWxlUnVsZXNDYWxsYmFjaywgd2l0aFN0eWxlcywgV2l0aFN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBUb29sYmFyIGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCI7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiO1xuaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBSZWFjdENoaWxkIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IHN0eWxlczogU3R5bGVSdWxlc0NhbGxiYWNrPGFueSwgYW55PiA9IChfdGhlbWUpID0+ICh7XG4gICAgYXBwQmFyOiB7XG4gICAgfSxcblxuICAgIGdyb3c6IHtcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgfSxcblxuICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIgYXMgXCJmbGV4XCIsXG4gICAgfSxcblxuICAgIHRvb2xiYXI6IHtcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLFxuICAgIH0sXG59KTtcblxudHlwZSBOYW1lZFNsb3RzID0ge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIGJ1dHRvbj86IFJlYWN0Q2hpbGQsXG4gICAgYWN0aW9ucz86IFJlYWN0Q2hpbGQsXG4gICAgc3ViQmFyPzogUmVhY3RDaGlsZCxcbn07XG5cbnR5cGUgUHJvcHMgPSBXaXRoU3R5bGVzPHR5cGVvZiBzdHlsZXM+ICYge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIGJ1dHRvbj86IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+LFxuICAgIGNoaWxkcmVuPzogTmFtZWRTbG90cyxcbn07XG5cbmNvbnN0IEFwcEhlYWRlckNvbXBvbmVudDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjbGFzc2VzIH0gPSBwcm9wcztcbiAgICBjb25zdCB7IGJ1dHRvbiwgdGl0bGUsIGFjdGlvbnMsIHN1YkJhciB9ID0gcHJvcHMuY2hpbGRyZW4gfHwge1xuICAgICAgICBidXR0b246IG51bGwsXG4gICAgICAgIHRpdGxlOiBudWxsLFxuICAgICAgICBhY3Rpb25zOiBudWxsLFxuICAgICAgICBzdWJCYXI6IG51bGwsXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgIDxBcHBCYXIgcG9zaXRpb249XCJhYnNvbHV0ZVwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzTmFtZT17Y2xhc3Nlcy5hcHBCYXJ9PlxuICAgICAgICAgICAgICAgIDxUb29sYmFyIGNsYXNzTmFtZT17Y2xhc3Nlcy50b29sYmFyfT5cbiAgICAgICAgICAgICAgICAgICAge3Byb3BzLmJ1dHRvbiB8fCBidXR0b259XG5cbiAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgY29sb3I9XCJpbmhlcml0XCIgbm9XcmFwPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy50aXRsZSB8fCB0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5ncm93fSAvPlxuICAgICAgICAgICAgICAgICAgICB7YWN0aW9ucyAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5idXR0b25zfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9Ub29sYmFyPlxuXG4gICAgICAgICAgICAgICAge3N1YkJhciAhPSBudWxsICYmIHN1YkJhcn1cbiAgICAgICAgICAgIDwvQXBwQmFyPlxuICAgICAgICA8L0ZyYWdtZW50PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcykoQXBwSGVhZGVyQ29tcG9uZW50KTtcbiIsImltcG9ydCB7IFN0eWxlUnVsZXNDYWxsYmFjaywgd2l0aFN0eWxlcywgV2l0aFN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBUeXBvZ3JhcGh5LCB7IFR5cG9ncmFwaHlQcm9wcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IHN0eWxlczogU3R5bGVSdWxlc0NhbGxiYWNrPGFueSwgYW55PiA9ICh0aGVtZSkgPT4gKHtcbiAgICB0ZXh0OiB7XG4gICAgICAgIC8vIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZyg0KSxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgICAgIHBhZGRpbmdSaWdodDogdGhlbWUuc3BhY2luZygyKSxcbiAgICB9LFxufSk7XG5cbnR5cGUgUHJvcHMgPSB7XG4gICAgdGV4dDogc3RyaW5nLFxufSAmIFdpdGhTdHlsZXM8dHlwZW9mIHN0eWxlcz4gJiBUeXBvZ3JhcGh5UHJvcHM7XG5cbmNvbnN0IEJvZHlUZXh0OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7Y2xhc3NlcywgdGV4dCwgLi4ub3RoZXJQcm9wc30gPSBwcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxUeXBvZ3JhcGh5IGNsYXNzTmFtZT17Y2xhc3Nlcy50ZXh0fSBjb2xvcj1cInRleHRTZWNvbmRhcnlcIiAgey4uLm90aGVyUHJvcHN9PlxuICAgICAgICAgICAge3RleHR9XG4gICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMpKEJvZHlUZXh0KTtcbiIsImltcG9ydCB7IExpc3RJdGVtIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlXCI7XG5pbXBvcnQgeyBMaXN0SXRlbVByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0xpc3RJdGVtXCI7XG5pbXBvcnQgeyBMb2NhdGlvbkRlc2NyaXB0b3IgfSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbnR5cGUgUHJvcHMgPSAge1xuICAgIC8vIExpc3RJdGVtUHJvcHMgYW5kIExpbmtQcm9wcyBib3RoIGRlZmluZSBhbiAnaW5uZXJSZWYnIHByb3BlcnR5IHdoaWNoIGFyZSBpbmNvbXBhdGlibGUuXG5cbiAgICB0bzogTG9jYXRpb25EZXNjcmlwdG9yXG4gICAgcmVwbGFjZT86IGJvb2xlYW4sXG59ICYgTGlzdEl0ZW1Qcm9wcztcblxuZnVuY3Rpb24gY3JlYXRlTGluayh7aW5uZXJSZWYsIC4uLnByb3BzfTogUHJvcHMpIHtcbiAgICAvLyBSZW1vdmUgYGlubmVyUmVmYCBmcm9tIHByb3BlcnRpZXMgYXMgdGhlIGludGVyZmFjZSBpcyBpbmNvbXBhdGlibGUuXG5cbiAgICBpZiAocHJvcHMudG8udG9TdHJpbmcoKS5tYXRjaCgvaHR0cHMvKSkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiA8YSBvbkNsaWNrPXsoKSA9PiBIb21leS5vcGVuVVJMKHByb3BzLnRvLnRvU3RyaW5nKCkpfSB7Li4ucHJvcHN9Pntwcm9wcy5jaGlsZHJlbn08L2E+O1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gPExpbmsgey4uLnByb3BzfSAvPjtcbn1cblxuY29uc3QgTGlzdEl0ZW1MaW5rOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIDxMaXN0SXRlbSB7Li4ucHJvcHN9IGNvbXBvbmVudD17Y3JlYXRlTGluayBhcyB1bmtub3duIGFzIFwiYVwifT5cbiAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9MaXN0SXRlbT5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlzdEl0ZW1MaW5rO1xuIiwiaW1wb3J0IHsgRGl2aWRlciwgSWNvbkJ1dHRvbiwgTGlzdCwgTGlzdEl0ZW1UZXh0LCBTdHlsZVJ1bGVzQ2FsbGJhY2ssIFR5cG9ncmFwaHksIFdpdGhTdHlsZXMsIHdpdGhTdHlsZXMgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIjtcbmltcG9ydCBEcmF3ZXIgZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0RyYXdlclwiO1xuaW1wb3J0IHsgSWNvbkJ1dHRvblByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL0ljb25CdXR0b25cIjtcbmltcG9ydCBNZW51SWNvbiBmcm9tIFwiQG1hdGVyaWFsLXVpL2ljb25zL01lbnVcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMsIHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IHRyYW5zbGF0ZSBmcm9tIFwiLi4vaTE4bi9UcmFuc2xhdGlvblwiO1xuaW1wb3J0IExpc3RJdGVtTGluayBmcm9tIFwiLi9MaXN0SXRlbUxpbmtcIjtcblxuY29uc3Qgc3R5bGVzOiBTdHlsZVJ1bGVzQ2FsbGJhY2s8YW55LCBhbnk+ID0gKHRoZW1lKSA9PiAoe1xuICAgIHRleHQ6IHtcbiAgICAgICAgcGFkZGluZzogdGhlbWUuc3BhY2luZygyKSxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogMCxcbiAgICB9LFxuXG4gICAgdmVyc2lvbjoge1xuICAgICAgICBwYWRkaW5nOiB0aGVtZS5zcGFjaW5nKDIpLFxuICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgIH0sXG5cbiAgICBub3JtYWw6IHtcbiAgICB9LFxuXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5tYWluLFxuICAgIH0sXG5cbiAgICBvdGhlckJ1dHRvbjoge1xuXG4gICAgfSxcblxuICAgIGZpcnN0QnV0dG9uOiB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IC0xMixcbiAgICAgICAgLy8gbWFyZ2luUmlnaHQ6IDIwLFxuICAgIH0sXG59KTtcblxudHlwZSBQcm9wcyA9IHtcbiAgICBvcGVuOiBib29sZWFuO1xuICAgIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG59ICYgV2l0aFN0eWxlczx0eXBlb2Ygc3R5bGVzPiAmIFJvdXRlQ29tcG9uZW50UHJvcHM7XG5cbmNvbnN0IEFwcE1lbnVCYXNlOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7Y2xhc3Nlc30gPSBwcm9wcztcblxuICAgIGNvbnN0IGVsZW1lbnRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImVudHJ5XCIsXG4gICAgICAgICAgICB0bzogXCIvXCIsXG4gICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGUoXCJtZW51LnBsYW5zXCIpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0bzogXCIvdGVtcGVyYXR1cmVzXCIsXG4gICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGUoXCJtZW51LnRlbXBlcmF0dXJlc1wiKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG86IFwiL3NjaGVkdWxlc1wiLFxuICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRlKFwibWVudS5zY2hlZHVsZXNcIiksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRvOiBcIi9zZXR0aW5nc1wiLFxuICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRlKFwibWVudS5zZXR0aW5nc1wiKSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdHlwZTogXCJEaXZpZGVyXCJcbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG86IFwiaHR0cHM6Ly9ob21leS1oZWF0aW5nLm1za2cuYXBwXCIsXG4gICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGUoXCJtZW51LmhlbHBcIiksXG4gICAgICAgIH0sXG4gICAgXTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxEcmF3ZXIgb3Blbj17cHJvcHMub3Blbn0gb25DbG9zZT17cHJvcHMub25DbG9zZX0+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeSBjbGFzc05hbWU9e2NsYXNzZXMudGV4dH0gdmFyaWFudD1cImg1XCIgZ3V0dGVyQm90dG9tPXt0cnVlfT5cbiAgICAgICAgICAgICAgICB7dHJhbnNsYXRlKFwibWVudS50aXRsZVwiKX1cbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IGNsYXNzTmFtZT17Y2xhc3Nlcy52ZXJzaW9ufSB2YXJpYW50PVwiYm9keTJcIiBjb2xvcj1cInRleHRTZWNvbmRhcnlcIiBndXR0ZXJCb3R0b209e3RydWV9PlxuICAgICAgICAgICAgICAgIFZlcnNpb24ge19fVkVSU0lPTn0gKHtfX0JVSUxEfSlcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cblxuICAgICAgICAgICAgPERpdmlkZXIgLz5cbiAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLm1hcCgoZSkgPT4gKGUudHlwZSA9PT0gXCJEaXZpZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPyA8RGl2aWRlciAvPlxuICAgICAgICAgICAgICAgICAgICA6IDxMaXN0SXRlbUxpbmsga2V5PXtlLnRvfSB0bz17ZS50b30gZGlzYWJsZWQ9e3Byb3BzLm1hdGNoLnVybCA9PT0gZS50b30gYnV0dG9uPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtlLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcz17e3ByaW1hcnk6IHByb3BzLm1hdGNoLnVybCAhPT0gZS50byA/IGNsYXNzZXMubm9ybWFsIDogY2xhc3Nlcy5zZWxlY3RlZH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L0xpc3RJdGVtTGluaz5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICA8L0RyYXdlcj5cbiAgICApO1xufTtcblxudHlwZSBNZW51QnV0dG9uUHJvcHMgPSB7XG4gICAgaWNvbjogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4sXG4gICAgZmlyc3Q/OiBib29sZWFuLFxufSAmIFdpdGhTdHlsZXM8dHlwZW9mIHN0eWxlcz4gJiBJY29uQnV0dG9uUHJvcHM7XG5cbmNvbnN0IE1lbnVCdXR0b25CYXNlOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxNZW51QnV0dG9uUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjbGFzc2VzLCBmaXJzdCwgaWNvbiwgLi4ub3RoZXJQcm9wcyB9ID0gcHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8SWNvbkJ1dHRvbiBjbGFzc05hbWU9e2ZpcnN0ID8gY2xhc3Nlcy5maXJzdEJ1dHRvbiA6IGNsYXNzZXMub3RoZXJCdXR0b259IGNvbG9yPVwiaW5oZXJpdFwiIHsuLi5vdGhlclByb3BzfT5cbiAgICAgICAgICAgIHtpY29ufVxuICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBBcHBNZW51QnV0dG9uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudCA9IChfcHJvcHMpID0+IHtcbiAgICBjb25zdCBbb3Blbk1lbnUsIHNldE9wZW5NZW51XSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgIDxBcHBNZW51IG9wZW49e29wZW5NZW51fSBvbkNsb3NlPXsoKSA9PiB7IHNldE9wZW5NZW51KGZhbHNlKTsgfX0gLz5cbiAgICAgICAgICAgIDxNZW51QnV0dG9uIGZpcnN0PXt0cnVlfSBvbkNsaWNrPXsoKSA9PiB7IHNldE9wZW5NZW51KHRydWUpOyB9fSBpY29uPXs8TWVudUljb24gLz59IC8+XG4gICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbn07XG5cbmNvbnN0IEFwcE1lbnUgPSB3aXRoUm91dGVyKHdpdGhTdHlsZXMoc3R5bGVzKShBcHBNZW51QmFzZSkpO1xuZXhwb3J0IGNvbnN0IE1lbnVCdXR0b24gPSB3aXRoU3R5bGVzKHN0eWxlcykoTWVudUJ1dHRvbkJhc2UpO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBNZW51O1xuIiwiaW1wb3J0IHsgU3R5bGVSdWxlc0NhbGxiYWNrLCB3aXRoU3R5bGVzLCBXaXRoU3R5bGVzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiO1xuaW1wb3J0IFR5cG9ncmFwaHksIHsgVHlwb2dyYXBoeVByb3BzIH0gZnJvbSBcIkBtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHlcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuY29uc3Qgc3R5bGVzOiBTdHlsZVJ1bGVzQ2FsbGJhY2s8YW55LCBhbnk+ID0gKHRoZW1lKSA9PiAoe1xuICAgIGhlYWRsaW5lOiB7XG4gICAgICAgIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZyg0KSxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IHRoZW1lLnNwYWNpbmcoMiksXG4gICAgICAgIHBhZGRpbmdSaWdodDogdGhlbWUuc3BhY2luZygyKSxcbiAgICB9LFxufSk7XG5cbnR5cGUgU3ViSGVhZGVyUHJvcHMgPSB7XG4gICAgdGV4dDogc3RyaW5nIHwgdW5kZWZpbmVkLFxufSAmIFdpdGhTdHlsZXM8dHlwZW9mIHN0eWxlcz4gJiBUeXBvZ3JhcGh5UHJvcHM7XG5cbmNvbnN0IFN1YkhlYWRlcjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8U3ViSGVhZGVyUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjbGFzc2VzLCB0ZXh0LCAuLi5vdGhlclByb3BzIH0gPSBwcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxUeXBvZ3JhcGh5IGNsYXNzTmFtZT17Y2xhc3Nlcy5oZWFkbGluZX0gdmFyaWFudD1cImg1XCIgY29sb3I9XCJ0ZXh0U2Vjb25kYXJ5XCIgZ3V0dGVyQm90dG9tPXt0cnVlfSB7Li4ub3RoZXJQcm9wc30+XG4gICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcykoU3ViSGVhZGVyKTtcbiIsImltcG9ydCB7IFN0eWxlUnVsZXNDYWxsYmFjaywgd2l0aFN0eWxlcywgV2l0aFN0eWxlcyB9IGZyb20gXCJAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXNcIjtcbmltcG9ydCBSZWFjdCwgeyBSZWFjdENoaWxkIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IHN0eWxlczogU3R5bGVSdWxlc0NhbGxiYWNrPGFueSwgYW55PiA9IChfdGhlbWUpID0+ICh7XG4gICAgcm9vdDoge1xuICAgICAgICB3ZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgZmxleEZsb3c6IFwiY29sdW1uXCIsXG4gICAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgICB3aWR0aDogXCIxMDB2d1wiLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxuICAgIH0sXG5cbiAgICBib2R5OiB7XG4gICAgICAgIGZsZXggOiBcIjEgMCAxMDAlXCIsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgbWF4V2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICBvdmVyZmxvd1k6IFwic2Nyb2xsXCIsXG4gICAgfSxcbn0pO1xuXG50eXBlIE5hbWVkU2xvdHMgPSB7XG4gICAgaGVhZGVyOiBSZWFjdENoaWxkLFxuICAgIGJvZHk6IFJlYWN0Q2hpbGQsXG4gICAgcGFkZGluZ1RvcDogbnVtYmVyIHwgc3RyaW5nLFxuICAgIHBhZGRpbmdCb3R0b20/OiBudW1iZXIgfCBzdHJpbmcsXG59O1xuXG50eXBlIFByb3BzID0gV2l0aFN0eWxlczx0eXBlb2Ygc3R5bGVzPiAmIHtcbiAgICBjaGlsZHJlbjogTmFtZWRTbG90cyxcbn07XG5cbmNvbnN0IFBhZ2VDb21wb25lbnQ6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PFByb3BzPiA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgY2xhc3NlcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgeyBoZWFkZXIsIGJvZHksIHBhZGRpbmdUb3AsIHBhZGRpbmdCb3R0b20gfSA9IHByb3BzLmNoaWxkcmVuO1xuXG4gICAgY29uc3QgbmV3UGFkZGluZyA9IHBhZGRpbmdCb3R0b20gfHwgXCJhdXRvXCI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yb290fT5cbiAgICAgICAgICAgICAgICB7aGVhZGVyfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmJvZHl9IHN0eWxlPXt7cGFkZGluZ1RvcCwgcGFkZGluZ0JvdHRvbTogbmV3UGFkZGluZ319PlxuICAgICAgICAgICAgICAgICAgICB7Ym9keX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcykoUGFnZUNvbXBvbmVudCk7XG4iXSwibmFtZXMiOlsiY2FsbEFQSSIsIm1ldGhvZCIsInBhdGgiLCJib2R5Iiwib3B0aW9ucyIsImhlYWRlcnMiLCJjYWNoZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXMiLCJmZXRjaCIsImpzb24iLCJ1cGRhdGVQbGFuIiwibmV3UGxhbiIsInBsYW5Db3B5Iiwiem9uZXMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJkZXZpY2VzIiwiaWQiLCJwbGFuQVBJIiwiZmV0Y2hQbGFucyIsInNvcnRCeSIsIm1hcCIsInBsYW4iLCJwIiwibmFtZSIsImZldGNoUGxhbkJ5SWQiLCJFcnJvciIsImZldGNoU2NoZWR1bGUiLCJzY2hlZHVsZSIsInRlbXBlcmF0dXJlcyIsInMiLCJkZXZpY2UiLCJyZW1vdmVQbGFuIiwidG9nZ2xlUGxhblN0YXRlIiwiZW5hYmxlZCIsIm1vZGVBUEkiLCJmZXRjaE1vZGUiLCJtb2RlIiwic2V0TW9kZSIsIl90aGVtZSIsImFwcEJhciIsImdyb3ciLCJmbGV4R3JvdyIsImJ1dHRvbnMiLCJkaXNwbGF5IiwidG9vbGJhciIsImFsaWduSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsInByb3BzIiwiY2xhc3NlcyIsImJ1dHRvbiIsInRpdGxlIiwiYWN0aW9ucyIsInN1YkJhciIsImNoaWxkcmVuIiwiRnJhZ21lbnQiLCJwb3NpdGlvbiIsImNvbG9yIiwiY2xhc3NOYW1lIiwidmFyaWFudCIsIm5vV3JhcCIsInRoZW1lIiwidGV4dCIsInBhZGRpbmdMZWZ0Iiwic3BhY2luZyIsInBhZGRpbmdSaWdodCIsIm90aGVyUHJvcHMiLCJjcmVhdGVMaW5rIiwiaW5uZXJSZWYiLCJ0byIsInRvU3RyaW5nIiwibWF0Y2giLCJvbkNsaWNrIiwiSG9tZXkiLCJvcGVuVVJMIiwiTGluayIsImNvbXBvbmVudCIsInN0eWxlcyIsInBhZGRpbmciLCJwYWRkaW5nQm90dG9tIiwidmVyc2lvbiIsInBhZGRpbmdUb3AiLCJub3JtYWwiLCJzZWxlY3RlZCIsInBhbGV0dGUiLCJwcmltYXJ5IiwibWFpbiIsIm90aGVyQnV0dG9uIiwiZmlyc3RCdXR0b24iLCJtYXJnaW5MZWZ0IiwiQXBwTWVudUJ1dHRvbiIsIl9wcm9wcyIsIm9wZW5NZW51Iiwic2V0T3Blbk1lbnUiLCJBcHBNZW51Iiwib3BlbiIsIm9uQ2xvc2UiLCJNZW51QnV0dG9uIiwiZmlyc3QiLCJpY29uIiwid2l0aFJvdXRlciIsImVsZW1lbnRzIiwidHlwZSIsImd1dHRlckJvdHRvbSIsImUiLCJrZXkiLCJkaXNhYmxlZCIsInVybCIsImhlYWRsaW5lIiwibWFyZ2luVG9wIiwicm9vdCIsIndlYmtpdE92ZXJmbG93U2Nyb2xsaW5nIiwiZmxleEZsb3ciLCJoZWlnaHQiLCJ3aWR0aCIsImJhY2tncm91bmRDb2xvciIsImZsZXgiLCJtYXJnaW4iLCJtYXhXaWR0aCIsIm92ZXJmbG93WSIsImhlYWRlciIsIm5ld1BhZGRpbmciLCJzdHlsZSJdLCJzb3VyY2VSb290IjoiIn0=