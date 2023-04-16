/*! For license information please see 19.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[19],{"../../node_modules/@material-ui/core/esm/Switch/Switch.js":(e,o,t)=>{t.d(o,{Z:()=>b});var a=t("../../node_modules/@babel/runtime/helpers/esm/extends.js"),n=t("../../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),s=t("../../node_modules/react/index.js"),r=t("../../node_modules/prop-types/index.js"),l=t.n(r),i=t("../../node_modules/clsx/dist/clsx.m.js"),d=t("../../node_modules/@material-ui/utils/esm/refType.js"),c=t("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),u=t("../../node_modules/@material-ui/core/esm/styles/colorManipulator.js"),m=t("../../node_modules/@material-ui/core/esm/utils/capitalize.js"),p=t("../../node_modules/@material-ui/core/esm/internal/SwitchBase.js"),h=s.forwardRef((function(e,o){var t=e.classes,r=e.className,l=e.color,d=void 0===l?"secondary":l,c=e.edge,u=void 0!==c&&c,h=e.size,b=void 0===h?"medium":h,g=(0,n.Z)(e,["classes","className","color","edge","size"]),y=s.createElement("span",{className:t.thumb});return s.createElement("span",{className:(0,i.Z)(t.root,r,{start:t.edgeStart,end:t.edgeEnd}[u],"small"===b&&t["size".concat((0,m.Z)(b))])},s.createElement(p.Z,(0,a.Z)({type:"checkbox",icon:y,checkedIcon:y,classes:{root:(0,i.Z)(t.switchBase,t["color".concat((0,m.Z)(d))]),input:t.input,checked:t.checked,disabled:t.disabled},ref:o},g)),s.createElement("span",{className:t.track}))}));h.propTypes={checked:l().bool,checkedIcon:l().node,classes:l().object,className:l().string,color:l().oneOf(["default","primary","secondary"]),defaultChecked:l().bool,disabled:l().bool,disableRipple:l().bool,edge:l().oneOf(["end","start",!1]),icon:l().node,id:l().string,inputProps:l().object,inputRef:d.Z,onChange:l().func,required:l().bool,size:l().oneOf(["medium","small"]),value:l().any};const b=(0,c.Z)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:(0,u.Fq)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:(0,u.Fq)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(h)},"../../node_modules/@material-ui/core/esm/internal/SwitchBase.js":(e,o,t)=>{t.d(o,{Z:()=>g});var a=t("../../node_modules/@babel/runtime/helpers/esm/extends.js"),n=t("../../node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),s=t("../../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),r=t("../../node_modules/react/index.js"),l=t("../../node_modules/prop-types/index.js"),i=t.n(l),d=t("../../node_modules/clsx/dist/clsx.m.js"),c=t("../../node_modules/@material-ui/utils/esm/refType.js"),u=t("../../node_modules/@material-ui/core/esm/utils/useControlled.js"),m=t("../../node_modules/@material-ui/core/esm/FormControl/useFormControl.js"),p=t("../../node_modules/@material-ui/core/esm/styles/withStyles.js"),h=t("../../node_modules/@material-ui/core/esm/IconButton/IconButton.js"),b=r.forwardRef((function(e,o){var t=e.autoFocus,l=e.checked,i=e.checkedIcon,c=e.classes,p=e.className,b=e.defaultChecked,g=e.disabled,y=e.icon,k=e.id,f=e.inputProps,j=e.inputRef,w=e.name,x=e.onBlur,v=e.onChange,C=e.onFocus,_=e.readOnly,Z=e.required,$=e.tabIndex,B=e.type,I=e.value,S=(0,s.Z)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),F=(0,u.Z)({controlled:l,default:Boolean(b),name:"SwitchBase",state:"checked"}),R=(0,n.Z)(F,2),q=R[0],z=R[1],N=(0,m.Z)(),O=g;N&&void 0===O&&(O=N.disabled);var E="checkbox"===B||"radio"===B;return r.createElement(h.Z,(0,a.Z)({component:"span",className:(0,d.Z)(c.root,p,q&&c.checked,O&&c.disabled),disabled:O,tabIndex:null,role:void 0,onFocus:function(e){C&&C(e),N&&N.onFocus&&N.onFocus(e)},onBlur:function(e){x&&x(e),N&&N.onBlur&&N.onBlur(e)},ref:o},S),r.createElement("input",(0,a.Z)({autoFocus:t,checked:l,defaultChecked:b,className:c.input,disabled:O,id:E&&k,name:w,onChange:function(e){var o=e.target.checked;z(o),v&&v(e,o)},readOnly:_,ref:j,required:Z,tabIndex:$,type:B,value:I},f)),q?i:y)}));b.propTypes={autoFocus:i().bool,checked:i().bool,checkedIcon:i().node.isRequired,classes:i().object.isRequired,className:i().string,defaultChecked:i().bool,disabled:i().bool,icon:i().node.isRequired,id:i().string,inputProps:i().object,inputRef:c.Z,name:i().string,onBlur:i().func,onChange:i().func,onFocus:i().func,readOnly:i().bool,required:i().bool,tabIndex:i().oneOfType([i().number,i().string]),type:i().string.isRequired,value:i().any};const g=(0,p.Z)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(b)}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc11/settings/19.js.map