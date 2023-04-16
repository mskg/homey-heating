"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[778],{6778:(t,e,a)=>{a.r(e),a.d(e,{calculateDay:()=>n.u,default:()=>y});var i=a(2511),s=a(6635),r=a(2784),h=a(3314),n=a(4452),c=a(1810),d=a(4901),l=a(216);const u=new Date(1979,1,29,0,0,0,0),o=new Date(1979,1,30,0,0,0,0);class m{constructor(t,e=!0,a,i){this.rootElement=t,this.showLegend=e,this.tickFormat="%H:%M",this.margin={top:0,right:16,bottom:16,left:28},this.series=[],this.minTime=u,this.maxTime=o,this.showLegend||(this.margin={top:0,right:0,bottom:0,left:0}),this.height=(i||t.clientHeight)-this.margin.top-this.margin.bottom,this.width=(a||t.clientWidth)-32-this.margin.right-this.margin.left,this.series=[(0,c.Z)("schedule.Monday"),(0,c.Z)("schedule.Tuesday"),(0,c.Z)("schedule.Wednesday"),(0,c.Z)("schedule.Thursday"),(0,c.Z)("schedule.Friday"),(0,c.Z)("schedule.Saturday"),(0,c.Z)("schedule.Sunday")],this.initAxis(),this.createChart(!0)}data(t){const e=this.createChart(!1).select(".chart").selectAll("g").data(t,(t=>t.start+t.taskName+t.end)),a=e.enter().insert("g").attr("fill",(t=>t.color)).attr("transform",(t=>"translate("+this.xScale(t.start)+","+this.yScale(t.taskName)+")"));if(a.insert("rect").attr("height",this.yScale.bandwidth).attr("width",(t=>Math.max(1,(this.xScale(t.end)||0)-(this.xScale(t.start)||0)))),this.showLegend){const t=a.insert("text").attr("text-anchor","start").attr("x",6).attr("y",20).attr("width",(t=>Math.max(1,(this.xScale(t.end)||0)-(this.xScale(t.start)||0)-6))).text((t=>this.fixedDigits(t.temperature,1)));this.dotme(t)}e.exit().remove()}initAxis(){this.xScale=l.Xf().domain([this.minTime,this.maxTime]).range([0,this.width]).clamp(!0),this.yScale=l.tiA().domain(this.series).rangeRound([0,this.height-this.margin.top-this.margin.bottom]).padding(this.showLegend?.1:0),this.xAxis=l.LLu(this.xScale).tickFormat(l.i$Z(this.tickFormat)).tickSize(this.showLegend?8:0).tickPadding(this.showLegend?8:0),this.yAxis=l.y4O(this.yScale).tickPadding(this.showLegend?8:0).tickSize(0)}dotme(t){t.each((function(){const t=l.Ys(this),e=parseInt(t.attr("width"),10);6.75*t.text().length>e&&t.text("")}))}fixedDigits(t,e){return(Math.round(t*Math.pow(10,e))/Math.pow(10,e)).toFixed(e)}createChart(t){let e=l.Ys(this.rootElement).select("svg");return t&&e.remove(),e.empty()&&(e=l.Ys(this.rootElement).append("svg").attr("width",this.width+this.margin.left+this.margin.right).attr("height",this.height+this.margin.top+this.margin.bottom),e.append("g").attr("class","chart").attr("width",this.width+this.margin.left+this.margin.right).attr("height",this.height+this.margin.top+this.margin.bottom).attr("transform","translate("+this.margin.left+", "+this.margin.top+")"),this.showLegend&&(e.append("g").attr("class","x axis").attr("transform","translate("+this.margin.left+", "+(this.height-this.margin.top-this.margin.bottom)+")").call(this.xAxis),e.append("g").attr("class","y axis").attr("transform","translate("+this.margin.left+", 0)").call(this.yAxis))),e}}class g{static fullDay(t,e){return new g({hour:0,minute:0,targetTemperature:e,index:-1,day:t})}static firstHalf(t,e){return new g({hour:0,minute:0,targetTemperature:t?t.targetTemperature:e.targetTemperature,index:-1,day:e.day},e)}constructor(t,e){this.start=new Date(u),this.end=new Date(u),this.temperature=t?t.targetTemperature:e?e.targetTemperature:0,this.start.setHours(t?t.hour:0,t?t.minute:0),this.end.setHours(e?e.hour:24,e?e.minute:0),this.taskName=(t=>{switch(t){case h.Jc.Sunday:return(0,c.Z)("schedule.Sunday");case h.Jc.Monday:return(0,c.Z)("schedule.Monday");case h.Jc.Tuesday:return(0,c.Z)("schedule.Tuesday");case h.Jc.Wednesday:return(0,c.Z)("schedule.Wednesday");case h.Jc.Thursday:return(0,c.Z)("schedule.Thursday");case h.Jc.Friday:return(0,c.Z)("schedule.Friday");case h.Jc.Saturday:return(0,c.Z)("schedule.Saturday");default:return"XX"}})(t?t.day:e?e.day:0),this.color=(0,d.h)(this.temperature)}}const y=(0,i.Z)((t=>({chart:{padding:t.spacing(2),width:"100%","& .axis domain":{fill:t.palette.text.primary},"& text":{fill:t.palette.text.primary,fontSize:"12px"}}})))((t=>{const{classes:e,plan:a,height:i,legend:c}=t,d=r.createRef(),[l,u]=(()=>{const[t,e]=r.useState(null),[a,i]=r.useState({width:t?t.clientWidth:0,height:t?t.clientHeight:0});function h(t){i({width:t?t.clientWidth:0,height:t?t.clientHeight:0})}return r.useEffect((()=>{if(null!=t){h(t);const a=(e=t,(0,s.debounce)((()=>{h(e)}),300));return window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}}var e}),[t]),[e,a]})();return r.useEffect((()=>{if(null!=d.current){const t=new m(d.current,c,u.width,u.height),e=[];[h.Jc.Monday,h.Jc.Tuesday,h.Jc.Wednesday,h.Jc.Thursday,h.Jc.Friday,h.Jc.Saturday,h.Jc.Sunday].forEach((t=>{const{schedules:i,last:s}=(0,n.u)(Object.assign(Object.assign({},a),{schedule:(0,n.M)(a.schedule)}),t);if(0===i.length){if(null==s)return;return void e.push(g.fullDay(t,s.targetTemperature))}if(1===i.length&&null==s)return void e.push(g.fullDay(t,i[0].targetTemperature));let r=null;i.forEach((t=>{null==r?e.push(g.firstHalf(s,t)):e.push(new g(r,t)),r=t})),null!=r&&e.push(new g(r))})),t.data(e)}}),[a,u]),r.useEffect((()=>{l(d.current)}),[d]),r.createElement("div",{style:{height:i||300},className:e.chart,ref:d})}))},4901:(t,e,a)=>{a.d(e,{h:()=>n});var i=a(1634),s=a(6144),r=a(3660),h=a(9406);const n=t=>{const e=Math.round(100*(a=Math.min(Math.max(16,t),24),16,24,1,8,Math.floor(7*(a-16)/8+1))+100);var a;return t<=16?s.Z[e]:t<=18.5?h.Z[e]:t<=20.5?i.Z[e]:r.Z[e]}}}]);
//# sourceMappingURL=https://raw.githubusercontent.com/mskg/homey-heating/release/v2.0.0-rc15/settings/778.js.map