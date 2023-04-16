(self.webpackChunk=self.webpackChunk||[]).push([[637],{3434:(e,t,n)=>{"use strict";n.d(t,{Z:()=>u});var r=n(7896),o=n(9740),l=n(2784),i=n(6277),a=n(2511);const c=(0,n(3752).Z)(l.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var s=l.forwardRef((function(e,t){var n,a=e.alt,s=e.children,u=e.classes,d=e.className,p=e.component,f=void 0===p?"div":p,h=e.imgProps,v=e.sizes,m=e.src,g=e.srcSet,y=e.variant,b=void 0===y?"circular":y,w=(0,o.Z)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),Z=function(e){var t=e.src,n=e.srcSet,r=l.useState(!1),o=r[0],i=r[1];return l.useEffect((function(){if(t||n){i(!1);var e=!0,r=new Image;return r.src=t,r.srcSet=n,r.onload=function(){e&&i("loaded")},r.onerror=function(){e&&i("error")},function(){e=!1}}}),[t,n]),o}({src:m,srcSet:g}),E=m||g,x=E&&"error"!==Z;return n=x?l.createElement("img",(0,r.Z)({alt:a,src:m,srcSet:g,sizes:v,className:u.img},h)):null!=s?s:E&&a?a[0]:l.createElement(c,{className:u.fallback}),l.createElement(f,(0,r.Z)({className:(0,i.Z)(u.root,u.system,u[b],d,!x&&u.colorDefault),ref:t},w),n)}));const u=(0,a.Z)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},circular:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(s)},9520:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(7896),o=n(9740),l=n(2784),i=n(6277),a=n(2511),c=l.forwardRef((function(e,t){var n=e.classes,a=e.className,c=(0,o.Z)(e,["classes","className"]);return l.createElement("div",(0,r.Z)({className:(0,i.Z)(n.root,a),ref:t},c))}));c.muiName="ListItemSecondaryAction";const s=(0,a.Z)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(c)},6487:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(9740),o=n(6666),l=n(7896),i=n(2784),a=n(6277),c=n(2511),s=n(3805),u=n(7580),d=i.forwardRef((function(e,t){var n=e.classes,o=e.className,c=e.disabled,d=void 0!==c&&c,p=e.disableFocusRipple,f=void 0!==p&&p,h=e.fullWidth,v=e.icon,m=e.indicator,g=e.label,y=e.onChange,b=e.onClick,w=e.onFocus,Z=e.selected,E=e.selectionFollowsFocus,x=e.textColor,C=void 0===x?"inherit":x,k=e.value,S=e.wrapped,N=void 0!==S&&S,M=(0,r.Z)(e,["classes","className","disabled","disableFocusRipple","fullWidth","icon","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"]);return i.createElement(s.Z,(0,l.Z)({focusRipple:!f,className:(0,a.Z)(n.root,n["textColor".concat((0,u.Z)(C))],o,d&&n.disabled,Z&&n.selected,g&&v&&n.labelIcon,h&&n.fullWidth,N&&n.wrapped),ref:t,role:"tab","aria-selected":Z,disabled:d,onClick:function(e){y&&y(e,k),b&&b(e)},onFocus:function(e){E&&!Z&&y&&y(e,k),w&&w(e)},tabIndex:Z?0:-1},M),i.createElement("span",{className:n.wrapper},v,g),m)}));const p=(0,c.Z)((function(e){var t;return{root:(0,l.Z)({},e.typography.button,(t={maxWidth:264,minWidth:72,position:"relative",boxSizing:"border-box",minHeight:48,flexShrink:0,padding:"6px 12px"},(0,o.Z)(t,e.breakpoints.up("sm"),{padding:"6px 24px"}),(0,o.Z)(t,"overflow","hidden"),(0,o.Z)(t,"whiteSpace","normal"),(0,o.Z)(t,"textAlign","center"),(0,o.Z)(t,e.breakpoints.up("sm"),{minWidth:160}),t)),labelIcon:{minHeight:72,paddingTop:9,"& $wrapper > *:first-child":{marginBottom:6}},textColorInherit:{color:"inherit",opacity:.7,"&$selected":{opacity:1},"&$disabled":{opacity:.5}},textColorPrimary:{color:e.palette.text.secondary,"&$selected":{color:e.palette.primary.main},"&$disabled":{color:e.palette.text.disabled}},textColorSecondary:{color:e.palette.text.secondary,"&$selected":{color:e.palette.secondary.main},"&$disabled":{color:e.palette.text.disabled}},selected:{},disabled:{},fullWidth:{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},wrapped:{fontSize:e.typography.pxToRem(12),lineHeight:1.5},wrapper:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column"}}}),{name:"MuiTab"})(d)},6919:(e,t,n)=>{"use strict";n.d(t,{Z:()=>T});var r,o=n(7896),l=n(9740),i=n(6666),a=n(2784),c=(n(8570),n(6277)),s=n(708),u=n(6982);function d(){if(r)return r;var e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),r="reverse",e.scrollLeft>0?r="default":(e.scrollLeft=1,0===e.scrollLeft&&(r="negative")),document.body.removeChild(e),r}function p(e,t){var n=e.scrollLeft;if("rtl"!==t)return n;switch(d()){case"negative":return e.scrollWidth-e.clientWidth+n;case"reverse":return e.scrollWidth-e.clientWidth-n;default:return n}}function f(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}var h={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function v(e){var t=e.onChange,n=(0,l.Z)(e,["onChange"]),r=a.useRef(),i=a.useRef(null),c=function(){r.current=i.current.offsetHeight-i.current.clientHeight};return a.useEffect((function(){var e=(0,s.Z)((function(){var e=r.current;c(),e!==r.current&&t(r.current)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}),[t]),a.useEffect((function(){c(),t(r.current)}),[t]),a.createElement("div",(0,o.Z)({style:h,ref:i},n))}var m=n(2511),g=n(7580),y=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.color,s=e.orientation,u=(0,l.Z)(e,["classes","className","color","orientation"]);return a.createElement("span",(0,o.Z)({className:(0,c.Z)(n.root,n["color".concat((0,g.Z)(i))],r,"vertical"===s&&n.vertical),ref:t},u))}));const b=(0,m.Z)((function(e){return{root:{position:"absolute",height:2,bottom:0,width:"100%",transition:e.transitions.create()},colorPrimary:{backgroundColor:e.palette.primary.main},colorSecondary:{backgroundColor:e.palette.secondary.main},vertical:{height:"100%",width:2,right:0}}}),{name:"PrivateTabIndicator"})(y);var w=n(3752);const Z=(0,w.Z)(a.createElement("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),E=(0,w.Z)(a.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight");var x=n(3805),C=a.createElement(Z,{fontSize:"small"}),k=a.createElement(E,{fontSize:"small"}),S=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.direction,s=e.orientation,u=e.disabled,d=(0,l.Z)(e,["classes","className","direction","orientation","disabled"]);return a.createElement(x.Z,(0,o.Z)({component:"div",className:(0,c.Z)(n.root,r,u&&n.disabled,"vertical"===s&&n.vertical),ref:t,role:null,tabIndex:null},d),"left"===i?C:k)}));const N=(0,m.Z)({root:{width:40,flexShrink:0,opacity:.8,"&$disabled":{opacity:0}},vertical:{width:"100%",height:40,"& svg":{transform:"rotate(90deg)"}},disabled:{}},{name:"MuiTabScrollButton"})(S);var M=n(4718),R=n(364),L=a.forwardRef((function(e,t){var n=e["aria-label"],r=e["aria-labelledby"],h=e.action,m=e.centered,g=void 0!==m&&m,y=e.children,w=e.classes,Z=e.className,E=e.component,x=void 0===E?"div":E,C=e.indicatorColor,k=void 0===C?"secondary":C,S=e.onChange,L=e.orientation,T=void 0===L?"horizontal":L,W=e.ScrollButtonComponent,z=void 0===W?N:W,B=e.scrollButtons,A=void 0===B?"auto":B,I=e.selectionFollowsFocus,D=e.TabIndicatorProps,F=void 0===D?{}:D,H=e.TabScrollButtonProps,P=e.textColor,V=void 0===P?"inherit":P,j=e.value,q=e.variant,O=void 0===q?"standard":q,$=(0,l.Z)(e,["aria-label","aria-labelledby","action","centered","children","classes","className","component","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant"]),U=(0,R.Z)(),Y="scrollable"===O,K="rtl"===U.direction,X="vertical"===T,G=X?"scrollTop":"scrollLeft",J=X?"top":"left",Q=X?"bottom":"right",_=X?"clientHeight":"clientWidth",ee=X?"height":"width",te=a.useState(!1),ne=te[0],re=te[1],oe=a.useState({}),le=oe[0],ie=oe[1],ae=a.useState({start:!1,end:!1}),ce=ae[0],se=ae[1],ue=a.useState({overflow:"hidden",marginBottom:null}),de=ue[0],pe=ue[1],fe=new Map,he=a.useRef(null),ve=a.useRef(null),me=function(){var e,t,n=he.current;if(n){var r=n.getBoundingClientRect();e={clientWidth:n.clientWidth,scrollLeft:n.scrollLeft,scrollTop:n.scrollTop,scrollLeftNormalized:p(n,U.direction),scrollWidth:n.scrollWidth,top:r.top,bottom:r.bottom,left:r.left,right:r.right}}if(n&&!1!==j){var o=ve.current.children;if(o.length>0){var l=o[fe.get(j)];t=l?l.getBoundingClientRect():null}}return{tabsMeta:e,tabMeta:t}},ge=(0,M.Z)((function(){var e,t=me(),n=t.tabsMeta,r=t.tabMeta,o=0;if(r&&n)if(X)o=r.top-n.top+n.scrollTop;else{var l=K?n.scrollLeftNormalized+n.clientWidth-n.scrollWidth:n.scrollLeft;o=r.left-n.left+l}var a=(e={},(0,i.Z)(e,J,o),(0,i.Z)(e,ee,r?r[ee]:0),e);if(isNaN(le[J])||isNaN(le[ee]))ie(a);else{var c=Math.abs(le[J]-a[J]),s=Math.abs(le[ee]-a[ee]);(c>=1||s>=1)&&ie(a)}})),ye=function(e){!function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){},l=r.ease,i=void 0===l?f:l,a=r.duration,c=void 0===a?300:a,s=null,u=t[e],d=!1;u===n?o(new Error("Element already at target position")):requestAnimationFrame((function r(l){if(d)o(new Error("Animation cancelled"));else{null===s&&(s=l);var a=Math.min(1,(l-s)/c);t[e]=i(a)*(n-u)+u,a>=1?requestAnimationFrame((function(){o(null)})):requestAnimationFrame(r)}}))}(G,he.current,e)},be=function(e){var t=he.current[G];X?t+=e:(t+=e*(K?-1:1),t*=K&&"reverse"===d()?-1:1),ye(t)},we=function(){be(-he.current[_])},Ze=function(){be(he.current[_])},Ee=a.useCallback((function(e){pe({overflow:null,marginBottom:-e})}),[]),xe=(0,M.Z)((function(){var e=me(),t=e.tabsMeta,n=e.tabMeta;if(n&&t)if(n[J]<t[J]){var r=t[G]+(n[J]-t[J]);ye(r)}else if(n[Q]>t[Q]){var o=t[G]+(n[Q]-t[Q]);ye(o)}})),Ce=(0,M.Z)((function(){if(Y&&"off"!==A){var e,t,n=he.current,r=n.scrollTop,o=n.scrollHeight,l=n.clientHeight,i=n.scrollWidth,a=n.clientWidth;if(X)e=r>1,t=r<o-l-1;else{var c=p(he.current,U.direction);e=K?c<i-a-1:c>1,t=K?c>1:c<i-a-1}e===ce.start&&t===ce.end||se({start:e,end:t})}}));a.useEffect((function(){var e=(0,s.Z)((function(){ge(),Ce()})),t=(0,u.Z)(he.current);return t.addEventListener("resize",e),function(){e.clear(),t.removeEventListener("resize",e)}}),[ge,Ce]);var ke=a.useCallback((0,s.Z)((function(){Ce()})));a.useEffect((function(){return function(){ke.clear()}}),[ke]),a.useEffect((function(){re(!0)}),[]),a.useEffect((function(){ge(),Ce()})),a.useEffect((function(){xe()}),[xe,le]),a.useImperativeHandle(h,(function(){return{updateIndicator:ge,updateScrollButtons:Ce}}),[ge,Ce]);var Se=a.createElement(b,(0,o.Z)({className:w.indicator,orientation:T,color:k},F,{style:(0,o.Z)({},le,F.style)})),Ne=0,Me=a.Children.map(y,(function(e){if(!a.isValidElement(e))return null;var t=void 0===e.props.value?Ne:e.props.value;fe.set(t,Ne);var n=t===j;return Ne+=1,a.cloneElement(e,{fullWidth:"fullWidth"===O,indicator:n&&!ne&&Se,selected:n,selectionFollowsFocus:I,onChange:S,textColor:V,value:t})})),Re=function(){var e={};e.scrollbarSizeListener=Y?a.createElement(v,{className:w.scrollable,onChange:Ee}):null;var t=ce.start||ce.end,n=Y&&("auto"===A&&t||"desktop"===A||"on"===A);return e.scrollButtonStart=n?a.createElement(z,(0,o.Z)({orientation:T,direction:K?"right":"left",onClick:we,disabled:!ce.start,className:(0,c.Z)(w.scrollButtons,"on"!==A&&w.scrollButtonsDesktop)},H)):null,e.scrollButtonEnd=n?a.createElement(z,(0,o.Z)({orientation:T,direction:K?"left":"right",onClick:Ze,disabled:!ce.end,className:(0,c.Z)(w.scrollButtons,"on"!==A&&w.scrollButtonsDesktop)},H)):null,e}();return a.createElement(x,(0,o.Z)({className:(0,c.Z)(w.root,Z,X&&w.vertical),ref:t},$),Re.scrollButtonStart,Re.scrollbarSizeListener,a.createElement("div",{className:(0,c.Z)(w.scroller,Y?w.scrollable:w.fixed),style:de,ref:he,onScroll:ke},a.createElement("div",{"aria-label":n,"aria-labelledby":r,className:(0,c.Z)(w.flexContainer,X&&w.flexContainerVertical,g&&!Y&&w.centered),onKeyDown:function(e){var t=e.target;if("tab"===t.getAttribute("role")){var n=null,r="vertical"!==T?"ArrowLeft":"ArrowUp",o="vertical"!==T?"ArrowRight":"ArrowDown";switch("vertical"!==T&&"rtl"===U.direction&&(r="ArrowRight",o="ArrowLeft"),e.key){case r:n=t.previousElementSibling||ve.current.lastChild;break;case o:n=t.nextElementSibling||ve.current.firstChild;break;case"Home":n=ve.current.firstChild;break;case"End":n=ve.current.lastChild}null!==n&&(n.focus(),e.preventDefault())}},ref:ve,role:"tablist"},Me),ne&&Se),Re.scrollButtonEnd)}));const T=(0,m.Z)((function(e){return{root:{overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},vertical:{flexDirection:"column"},flexContainer:{display:"flex"},flexContainerVertical:{flexDirection:"column"},centered:{justifyContent:"center"},scroller:{position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},fixed:{overflowX:"hidden",width:"100%"},scrollable:{overflowX:"scroll",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},scrollButtons:{},scrollButtonsDesktop:(0,i.Z)({},e.breakpoints.down("xs"),{display:"none"}),indicator:{}}}),{name:"MuiTabs"})(L)},5352:(e,t,n)=>{"use strict";var r=n(1600),o=n(4590);t.Z=void 0;var l=o(n(2784)),i=(0,r(n(175)).default)(l.createElement("path",{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");t.Z=i},2983:(e,t,n)=>{"use strict";var r=n(1600),o=n(4590);t.Z=void 0;var l=o(n(2784)),i=(0,r(n(175)).default)(l.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=i},8096:(e,t,n)=>{"use strict";var r=n(1600),o=n(4590);t.Z=void 0;var l=o(n(2784)),i=(0,r(n(175)).default)(l.createElement("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy");t.Z=i},3659:(e,t,n)=>{"use strict";n.d(t,{Jk:()=>z});var r=n(5163),o=n(2784),l=n(6981),i=n(753),a=n(6666),c=n(8316),s=function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()},u=function(e){e.preventDefault()},d=!1;try{var p=Object.defineProperty({},"passive",{get:function(){return d=!0,!0}});window.addEventListener("test",p,p),window.removeEventListener("test",p,p)}catch(e){d=!1}var f=!!d&&{capture:!0,passive:!1},h=function(e,t,n,r){return n&&{target:e,event:t,handler:(e.addEventListener(t,n,r&&f),n),capture:r&&f}},v=function(e){var t=e.target,n=e.event,r=e.handler,o=e.capture;return t.removeEventListener(n,r,o)},m=function(e){return e.changedTouches[0].clientY},g=function(e,t,n,r){void 0===r&&(r=!1);var o,l=n,i=t.target,a=!1,c=l>0,d=0,p=0;do{var f=i,h=f.scrollTop,v=f.scrollHeight-f.clientHeight-h;(h||v)&&(o=i,"hidden"!==window.getComputedStyle(o).overflowY&&(d+=v,p+=h)),i=i.parentNode}while(e.contains(i));(c&&l>d||!c&&-l>p)&&(a=!0),a&&(r?u(t):s(t))},y={click:"report",mousemove:!0,mousedown:"report",touchmove:!0,touchstart:"report",keydown:!0,change:!1,scroll:!0,wheel:!0},b="data-locky-group",w=function(e){for(var t=Array(e.length),n=0;n<e.length;++n)t[n]=e[n];return t},Z=function(e){var t=e.getAttribute(b);return t?w(document.querySelectorAll("["+b+'="'+t+'"]')):[e]},E={},x=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t=e.call.apply(e,[this].concat(r))||this,(0,a.Z)((0,i.Z)((0,i.Z)(t)),"setRef",(function(e){t.ref=e,e&&("scrollTop"in e||console.error("Locky: would not work for ",e))})),(0,a.Z)((0,i.Z)((0,i.Z)(t)),"scrollWheel",(function(e){return g(t.ref,e,e.deltaY,t.props.preventOnly)})),(0,a.Z)((0,i.Z)((0,i.Z)(t)),"scrollTouchStart",(function(e){t.touchStart=m(e)})),(0,a.Z)((0,i.Z)((0,i.Z)(t)),"scrollTouchMove",(function(e){return g(t.ref,e,t.touchStart-m(e),t.props.preventOnly)})),(0,a.Z)((0,i.Z)((0,i.Z)(t)),"isEventInLock",(function(e){return t.ref&&(n=t.ref,r=e.target,!!Z(n).find((function(e){return e.contains(r)})));var n,r})),t}(0,l.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this.props.group,t=void 0===e?"":e;E[t]||(E[t]=[]),E[t].unshift(this),this.props.headless&&this.setRef(c.findDOMNode(this)),this.props.enabled&&this.enable()},n.componentWillUnmount=function(){var e=this;this.props.enabled&&this.disable();var t=this.props.group;t&&(E[t]=E[t].filter((function(t){return t!==e})))},n.componentDidUpdate=function(e){e.enabled!==this.props.enabled&&(this.props.enabled?this.enable():this.disable())},n.enable=function(){var e,t=this,n=this.getEventHandlers();this.documentEvents=Object.keys(n).map((function(e){return h(document,e,t.getHandler(e,n[e]),!0)})).filter((function(e){return e})),this.nodeEvents=[],n.scroll&&(e=this.nodeEvents).push.apply(e,[h(this.ref,"wheel",this.scrollWheel,!0),h(this.ref,"touchstart",this.scrollTouchStart,!0),h(this.ref,"touchmove",this.scrollTouchMove,!0)])},n.disable=function(){this.documentEvents.forEach(v),this.nodeEvents.forEach(v)},n.getEventHandlers=function(){var e=this.props,t=e.noDefault,n=e.events;return Object.assign({},t?{}:y,n||{})},n.getHandler=function(e,t){var n=this,r=function(e,t,n){return t?"no-default"===t?u:"report"===t?function(e){return function(t){s(t),e&&e(t)}}(n):"report-only"===t?function(e){return function(t){e&&e(t)}}(n):s:null}(0,t,this.props.onEscape);return r?function(e){if(t=e.target,!w(document.querySelectorAll('[data-locky-transparent="true"]')).some((function(e){return e.contains(t)}))){var t,o,l,i=n.props,a=i.leaded,c=i.group,s=void 0===c?"":c;o=n.ref,l=e.target,o.contains(l)||(a&&s&&(function(e){var t=Z(e);return t[t.length-1]===e}(n.ref)||E[s][0]===n)||!n.isEventInLock(e))&&r(e)}}:null},n.render=function(){var e=this.props,t=e.component,n=e.group,r=e.className,l=t||o.createElement("div",null).type;return this.props.headless?this.props.children:o.createElement(l,{ref:this.setRef,"data-locky-group":n,className:r},this.props.children)},t}(o.Component);(0,a.Z)(x,"defaultProps",{enabled:!0,preventOnly:!1}),x.propTypes={};var C=function(e){var t=e.children,n=e.enabled,r=void 0===n||n;return o.createElement("div",{"data-locky-transparent":r},t)};C.propTypes={},C.defaultProps={enabled:!0};const k=x;var S,N,M,R=function(e){if(void 0===e&&(e="margin"),"undefined"==typeof window)return 0;var t=function(e){var t=window.getComputedStyle(document.body)["padding"===e?"paddingRight":"marginRight"];return parseInt(t||"",10)||0}(e),n=document.documentElement.clientWidth,r=window.innerWidth;return Math.max(0,r-n+t)},L=(N=0,M=null,S={add:function(e){var t,n;0==N&&(M=function(){if(!document)return null;var e=document.createElement("style");return e.type="text/css",e}())&&(n=e,(t=M).styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),function(e){(document.head||document.getElementsByTagName("head")[0]).appendChild(e)}(M)),N++},remove:function(){!--N&&M&&(M.parentNode&&M.parentNode.removeChild(M),M=null)}},function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.ZT(t,e),t.prototype.componentDidMount=function(){S.add(this.props.styles)},t.prototype.componentWillUnmount=function(){S.remove()},t.prototype.render=function(){return null},t}(o.PureComponent)),T=function(e,t,n,r){return void 0===n&&(n="margin"),"\n  body {\n    overflow: hidden "+r+";\n    "+[t&&"position: relative "+r+";","margin"==n&&"margin-right: "+e+"px "+r+";","padding"==n&&"padding-right: "+e+"px "+r+";"].filter(Boolean).join("")+"\n  }\n  \n  .react-scroll-locky-extender {\n    position: absolute;    \n    left: 0;    \n    right: -"+e+"px;\n  }\n  \n  .react-scroll-locky-edge-right {\n    right: "+e+"px;\n  }\n  \n  .react-scroll-locky-extender .react-scroll-locky-extender,\n  .react-scroll-locky-edge-right. .react-scroll-locky-edge-right {\n    right: 0;\n  }\n  \n  .react-scroll-locky {\n    -webkit-overflow-scrolling: touch;\n  }\n"},W=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={gap:R(t.props.gapMode)},t}return r.ZT(t,e),t.prototype.componentDidMount=function(){var e=R(this.props.gapMode);e!==this.state.gap&&this.setState({gap:e})},t.prototype.render=function(){var e=this.props,t=e.noRelative,n=e.noImportant,r=e.gapMode,l=this.state.gap;return l?o.createElement(L,{styles:T(l,!t,r,n?"":"!important")}):null},t}(o.Component),z=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r.ZT(t,e),t.prototype.componentDidMount=function(){this.check()},t.prototype.componentDidUpdate=function(){this.check()},t.prototype.check=function(){},t.prototype.render=function(){var e=this.props,t=e.enabled,n=void 0===t||t,l=e.hideBodyScroll,i=void 0===l||l,a=e.children,c=e.noRelative,s=e.gapMode,u=void 0===s?"margin":s,d=e.noImportant,p=e.className,f=e.headless,h=e.onEscape,v=e.isolation,m=void 0===v||v?{}:{noDefault:!0,events:{scroll:!0,wheel:!0,touchmove:!0,touchstart:"report-only",click:"report-only"}};return o.createElement(o.Fragment,null,n&&i&&o.createElement(W,{noImportant:d,noRelative:c,gapMode:u}),o.createElement(k,r.pi({enabled:!!n,className:("react-scroll-locky "+(p||"")).trim(),leaded:!0,group:"react-scroll-locky",headless:f,onEscape:h},m),a))},t}(o.Component)},8725:e=>{for(var t=[],n=0;n<256;++n)t[n]=(n+256).toString(16).substr(1);e.exports=function(e,n){var r=n||0,o=t;return[o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]]].join("")}},9157:e=>{var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(t){var n=new Uint8Array(16);e.exports=function(){return t(n),n}}else{var r=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}},4481:(e,t,n)=>{var r,o,l=n(9157),i=n(8725),a=0,c=0;e.exports=function(e,t,n){var s=t&&n||0,u=t||[],d=(e=e||{}).node||r,p=void 0!==e.clockseq?e.clockseq:o;if(null==d||null==p){var f=l();null==d&&(d=r=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==p&&(p=o=16383&(f[6]<<8|f[7]))}var h=void 0!==e.msecs?e.msecs:(new Date).getTime(),v=void 0!==e.nsecs?e.nsecs:c+1,m=h-a+(v-c)/1e4;if(m<0&&void 0===e.clockseq&&(p=p+1&16383),(m<0||h>a)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a=h,c=v,o=p;var g=(1e4*(268435455&(h+=122192928e5))+v)%4294967296;u[s++]=g>>>24&255,u[s++]=g>>>16&255,u[s++]=g>>>8&255,u[s++]=255&g;var y=h/4294967296*1e4&268435455;u[s++]=y>>>8&255,u[s++]=255&y,u[s++]=y>>>24&15|16,u[s++]=y>>>16&255,u[s++]=p>>>8|128,u[s++]=255&p;for(var b=0;b<6;++b)u[s+b]=d[b];return t||i(u)}}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.1-rc17/settings/637.js.map