var Ee=Object.defineProperty;var we=(e,t,i)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var _=(e,t,i)=>(we(e,typeof t!="symbol"?t+"":t,i),i);import{S as W,i as j,s as J,k as w,a as A,l as b,m as X,h as p,c as N,n as k,b as E,J as D,o as be,w as $,R as Le,q as de,e as ee,r as fe,E as he,u as xe,Q as me,O as C,T as q,P as B,N as T,y as te,D as Ye,z as ne,A as ie,g as se,d as le,B as ae}from"../chunks/index.513dcc03.js";const oe=500,Ce=300,ce=500,Xe=300;class De{constructor(){_(this,"isMoving",!1);_(this,"isLongclick",!1);_(this,"button",0);_(this,"lastX",0);_(this,"lastY",0);_(this,"consecutiveClicks",0);_(this,"lastMouseupTime",0);_(this,"activeElement",null);this.reset()}reset(){this.isMoving=!1,this.isLongclick=!1,this.button=0,this.lastX=0,this.lastY=0,this.consecutiveClicks=0,this.lastMouseupTime=0,this.activeElement=null}}class Te{constructor(){_(this,"isDragging",!1);_(this,"isPinching",!1);_(this,"isLongpressed",!1);_(this,"consecutiveTaps",0);_(this,"lastTouchendTime",0);_(this,"lastCenterX",0);_(this,"lastCenterY",0);_(this,"identifier",0);_(this,"x",0);_(this,"y",0);_(this,"hypotenuse",0);_(this,"activeElement",null);this.reset()}reset(){this.isDragging=!1,this.isPinching=!1,this.isLongpressed=!1,this.consecutiveTaps=0,this.lastTouchendTime=0,this.lastCenterX=0,this.lastCenterY=0,this.identifier=0,this.x=0,this.y=0,this.hypotenuse=0,this.activeElement=null}}let K=[],a=new De,n=new Te;const u=(e,t)=>{e!=null&&e.dispatchEvent(new CustomEvent("gesture",{detail:t,bubbles:!1,cancelable:!1}))},Pe=e=>{a.reset(),n.reset(),a.lastMouseupTime=Date.now(),window.removeEventListener("mousemove",U),window.removeEventListener("mouseup",V),window.removeEventListener("touchmove",G),window.removeEventListener("touchend",P)},Ie=e=>{if(window.removeEventListener("mousemove",U),window.removeEventListener("mouseup",V),window.removeEventListener("touchmove",G),window.removeEventListener("touchend",P),a.isMoving)if(a.isMoving=!1,a.isLongclick)a.isLongclick=!1,u(a.activeElement,{name:"longclick-drag-end",x:a.lastX,y:a.lastY});else switch(a.button){case 0:u(a.activeElement,{name:"left-click-drag-end",x:a.lastX,y:a.lastY});break;case 1:u(a.activeElement,{name:"middle-click-drag-end",x:a.lastX,y:a.lastY});break;case 2:u(a.activeElement,{name:"right-click-drag-end",x:a.lastX,y:a.lastY});break}a.isLongclick&&u(a.activeElement,{name:"longclick-release",x:a.lastX,y:a.lastY}),a.reset(),n.isDragging&&(n.isDragging=!1,n.isLongpressed?(n.isLongpressed=!1,u(n.activeElement,{name:"longpress-drag-end",x:n.lastCenterX,y:n.lastCenterY})):u(n.activeElement,{name:"touch-drag-end",x:n.lastCenterX,y:n.lastCenterY})),n.isLongpressed&&u(n.activeElement,{name:"longpress-release",x:n.lastCenterX,y:n.lastCenterY}),n.reset()},Me=e=>{u(e.target,{name:"wheel",x:e.clientX,y:e.clientY,event:e}),e.preventDefault(),e.stopPropagation()},Se=e=>{e.preventDefault(),e.stopPropagation()},He=e=>{document.activeElement!==e.target&&(window.addEventListener("mousemove",U),window.addEventListener("mouseup",V),a.activeElement=e.target,a.lastX=e.clientX,a.lastY=e.clientY,a.isMoving||(a.button=e.button),a.button===0&&window.setTimeout(()=>{Date.now()-a.lastMouseupTime>=ce&&!a.isMoving&&(a.isLongclick=!0,u(a.activeElement,{name:"longclick",x:e.clientX,y:e.clientY}))},ce),e.preventDefault(),e.stopPropagation())},U=e=>{if(e.movementX===0&&e.movementY===0)return;let t=e.clientX-a.lastX,i=e.clientY-a.lastY;if(!a.isMoving)if(a.isLongclick)u(a.activeElement,{name:"longclick-drag-start",x:e.clientX,y:e.clientY});else switch(a.button){case 0:u(a.activeElement,{name:"left-click-drag-start",x:e.clientX,y:e.clientY});break;case 1:u(a.activeElement,{name:"middle-click-drag-start",x:e.clientX,y:e.clientY});break;case 2:u(a.activeElement,{name:"right-click-drag-start",x:e.clientX,y:e.clientY});break}if(a.isMoving=!0,a.lastX=e.clientX,a.lastY=e.clientY,a.isLongclick)u(a.activeElement,{name:"longclick-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});else switch(a.button){case 0:u(a.activeElement,{name:"left-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});break;case 1:u(a.activeElement,{name:"middle-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});break;case 2:u(a.activeElement,{name:"right-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});break}},V=e=>{if(window.removeEventListener("mousemove",U),window.removeEventListener("mouseup",V),a.lastMouseupTime=Date.now(),a.isMoving)if(a.isMoving=!1,a.isLongclick)a.isLongclick=!1,u(a.activeElement,{name:"longclick-drag-end",x:a.lastX,y:a.lastY});else switch(a.button){case 0:u(a.activeElement,{name:"left-click-drag-end",x:a.lastX,y:a.lastY});break;case 1:u(a.activeElement,{name:"middle-click-drag-end",x:a.lastX,y:a.lastY});break;case 2:u(a.activeElement,{name:"right-click-drag-end",x:a.lastX,y:a.lastY});break}else a.isLongclick||(e.button===2?u(a.activeElement,{name:"right-click",x:e.clientX,y:e.clientY}):e.button===1?u(a.activeElement,{name:"middle-click",x:e.clientX,y:e.clientY}):(a.consecutiveClicks===0&&u(a.activeElement,{name:"left-click",x:e.clientX,y:e.clientY}),a.consecutiveClicks++,window.setTimeout(()=>{a.consecutiveClicks>1&&u(a.activeElement,{name:"double-click",x:e.clientX,y:e.clientY}),a.consecutiveClicks=0},Xe)));a.isLongclick&&u(a.activeElement,{name:"longclick-release",x:e.clientX,y:e.clientY}),a.isLongclick=!1},ze=e=>{if(e.touches.length>1&&(e.preventDefault(),e.stopPropagation()),document.activeElement!==e.target){if(e.preventDefault(),e.stopPropagation(),e.touches.length>1){if(e.touches[0].identifier===n.identifier)return;n.isPinching=!0}window.addEventListener("touchmove",G,{passive:!1}),window.addEventListener("touchend",P),window.addEventListener("touchcancel",P),n.identifier=e.touches[0].identifier,n.x=e.touches[0].clientX,n.y=e.touches[0].clientY,n.activeElement=e.target,window.setTimeout(()=>{n.isPinching||n.isDragging||Date.now()-n.lastTouchendTime>=oe&&(n.isDragging=!1,n.isPinching=!1,n.hypotenuse=null,n.isLongpressed=!0,u(n.activeElement,{name:"longpress",x:n.x,y:n.y}))},oe)}},G=e=>{if(e.preventDefault(),e.stopPropagation(),n.isDragging){let t=n.x,i=n.y;n.x=e.touches[0].clientX,n.y=e.touches[0].clientY;let l=n.x-t,c=n.y-i;n.isLongpressed?u(n.activeElement,{name:"longpress-dragging",x:n.x,y:n.y,dx:l,dy:c}):u(n.activeElement,{name:"touch-dragging",x:n.x,y:n.y,dx:l,dy:c});return}else if(!n.isLongpressed&&(n.isPinching||e.touches.length>1)){n.x=e.touches[0].clientX,n.y=e.touches[0].clientY;let t={x:e.touches[1].clientX,y:e.touches[1].clientY},i={x:(n.x+t.x)/2,y:(n.y+t.y)/2},l=Math.hypot(n.x-t.x,n.y-t.y);n.hypotenuse===null&&(n.hypotenuse=l,n.lastCenterX=i.x,n.lastCenterY=i.y,u(n.activeElement,{name:"pinch-start",x:i.x,y:i.y})),n.isPinching=!0;let c=l/n.hypotenuse,o=i.x-n.lastCenterX,r=i.y-n.lastCenterY;u(n.activeElement,{name:"pinching",x:i.x,y:i.y,zoom:c,dx:o,dy:r}),n.hypotenuse=l,n.lastCenterX=i.x,n.lastCenterY=i.y;return}else n.isDragging=!0,n.isLongpressed?(u(n.activeElement,{name:"longpress-drag-start",x:n.x,y:n.y}),n.x=e.touches[0].clientX,n.y=e.touches[0].clientY,u(n.activeElement,{name:"longpress-dragging",x:n.x,y:n.y,dx:0,dy:0})):(u(n.activeElement,{name:"touch-drag-start",x:n.x,y:n.y}),n.x=e.touches[0].clientX,n.y=e.touches[0].clientY,u(n.activeElement,{name:"touch-dragging",x:n.x,y:n.y,dx:0,dy:0}))},P=e=>{n.isDragging&&e.touches.length>0&&e.touches[0].identifier===n.identifier||(n.lastTouchendTime=Date.now(),window.removeEventListener("touchmove",G),window.removeEventListener("touchend",P),window.removeEventListener("touchcancel",P),n.isDragging?(n.isDragging=!1,n.isLongpressed?(n.isLongpressed=!1,u(n.activeElement,{name:"longpress-drag-end",x:n.x,y:n.y})):u(n.activeElement,{name:"touch-drag-end",x:n.x,y:n.y})):n.isPinching?(n.isPinching=!1,n.hypotenuse=null,u(n.activeElement,{name:"pinch-end",x:n.lastCenterX,y:n.lastCenterY})):n.isLongpressed||(n.consecutiveTaps===0&&u(n.activeElement,{name:"tap",x:n.x,y:n.y}),n.consecutiveTaps++,window.setTimeout(()=>{n.consecutiveTaps>1&&u(n.activeElement,{name:"double-tap",x:n.x,y:n.y}),n.consecutiveTaps=0},Ce)),n.isLongpressed&&u(n.activeElement,{name:"longpress-release",x:n.x,y:n.y}),n.isLongpressed=!1)};function Ae(...e){for(let t of e)K.findIndex(i=>i===t)===-1&&(K.length==0&&(window.addEventListener("blur",Ie),window.addEventListener("focus",Pe)),K.push(t),t.addEventListener("touchstart",ze,{passive:!1}),t.addEventListener("mousedown",He,{passive:!1}),t.addEventListener("contextmenu",Se,{passive:!1}),t.addEventListener("wheel",Me,{passive:!1}))}function Ne(e){let t,i,l;return{c(){t=w("canvas"),i=A(),l=w("canvas"),this.h()},l(c){t=b(c,"CANVAS",{id:!0,class:!0}),X(t).forEach(p),i=N(c),l=b(c,"CANVAS",{id:!0,class:!0}),X(l).forEach(p),this.h()},h(){k(t,"id","savedPaths"),k(t,"class","svelte-16hz5p5"),k(l,"id","canvas"),k(l,"class","svelte-16hz5p5")},m(c,o){E(c,t,o),e[7](t),E(c,i,o),E(c,l,o),e[8](l)},p:D,i:D,o:D,d(c){c&&p(t),e[7](null),c&&p(i),c&&p(l),e[8](null)}}}function Oe(e,t,i){let l,{radius:c=10}=t,{stroke:o=5}=t,{lineCap:r="round"}=t,{color:v="#000000"}=t,{dashed:h=!1}=t,s,f,m={x:0,y:0},L=0,I=0,M,O,S=[],Y,x,Q=function(d,g,y,R){var H=y-d,z=R-g;return Math.sqrt(H*H+z*z)};function ge(){console.log("resizing"),M=window.devicePixelRatio;let d=s.getBoundingClientRect();L=d.height*M,I=d.width*M,i(0,s.width=I,s),i(0,s.height=L,s),i(1,Y.width=I,Y),i(1,Y.height=L,Y);for(let g=0;g<S.length;g++)Z(S[g])}function F(d,g){let y=s.getBoundingClientRect();return{x:(d-y.left)*M,y:(g-y.top)*M}}function pe(d,g){O={points:[],stroke:o,lineCap:r,color:v,dash:l},f.clearRect(0,0,I,L),f.lineWidth=o,f.lineCap=r,f.strokeStyle=v,f.setLineDash(l),f.beginPath(),m=F(d,g),f.moveTo(m.x,m.y),O.points.push(m)}function ve(d,g){let y=F(d,g);if(c>0){if(Q(y.x,y.y,m.x,m.y)<=c)return;let z=Math.sqrt(y.x*y.x+y.y*y.y-2*y.x*m.x+m.x*m.x-2*y.y*m.y+m.y*m.y);if(y={x:y.x+c*((m.x-y.x)/z),y:y.y+c*((m.y-y.y)/z)},Q(m.x,m.y,y.x,y.y)<=.1)return}var R=(m.x+y.x)/2,H=(m.y+y.y)/2;f.quadraticCurveTo(m.x,m.y,R,H),m=y,f.stroke(),O.points.push({x:R,y:H},y)}function ye(){f.clearRect(0,0,I,L),S.push(O),Z(S[S.length-1])}function Z(d){x.lineWidth=d.stroke,x.lineCap=d.lineCap,x.strokeStyle="#00ff00",x.setLineDash(d.dash),x.beginPath(),x.moveTo(d.points[0].x,d.points[0].y);for(let g=1;g<d.points.length;g=g+2)x.quadraticCurveTo(d.points[g-1].x,d.points[g-1].y,d.points[g].x,d.points[g].y),x.stroke()}be(()=>{f=s.getContext("2d"),x=Y.getContext("2d"),Ae(s),s.addEventListener("gesture",g=>{switch(g.detail.name){case"left-click-drag-start":case"touch-drag-start":pe(g.detail.x,g.detail.y);break;case"left-click-dragging":case"touch-dragging":ve(g.detail.x,g.detail.y);break;case"left-click-drag-end":case"tough-drag-end":ye();break}}),new ResizeObserver(ge).observe(s)});function _e(d){$[d?"unshift":"push"](()=>{Y=d,i(1,Y)})}function ke(d){$[d?"unshift":"push"](()=>{s=d,i(0,s)})}return e.$$set=d=>{"radius"in d&&i(2,c=d.radius),"stroke"in d&&i(3,o=d.stroke),"lineCap"in d&&i(4,r=d.lineCap),"color"in d&&i(5,v=d.color),"dashed"in d&&i(6,h=d.dashed)},e.$$.update=()=>{e.$$.dirty&72&&(l=h?[o,o*3]:[])},[s,Y,c,o,r,v,h,_e,ke]}class Re extends W{constructor(t){super(),j(this,t,Oe,Ne,J,{radius:2,stroke:3,lineCap:4,color:5,dashed:6})}}function re(e,t,i){const l=e.slice();return l[5]=t[i],l[6]=t,l[7]=i,l}function qe(e){let t,i;return{c(){t=w("div"),i=de("Invalid input type!")},l(l){t=b(l,"DIV",{});var c=X(t);i=fe(c,"Invalid input type!"),c.forEach(p)},m(l,c){E(l,t,c),he(t,i)},p:D,d(l){l&&p(t)}}}function Be(e){let t,i,l;function c(){e[4].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(o){t=b(o,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","checkbox"),k(t,"class","svelte-12frump")},m(o,r){E(o,t,r),t.checked=e[5].value,i||(l=[C(t,"change",c),C(t,"input",function(){q(e[5].onInput(!e[5].value))&&e[5].onInput(!e[5].value).apply(this,arguments)})],i=!0)},p(o,r){e=o,r&1&&(t.checked=e[5].value)},d(o){o&&p(t),i=!1,B(l)}}}function Ue(e){let t,i,l;function c(){e[3].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(o){t=b(o,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","color"),k(t,"class","svelte-12frump")},m(o,r){E(o,t,r),T(t,e[5].value),i||(l=[C(t,"input",c),C(t,"input",function(){q(e[5].onInput(e[5].value))&&e[5].onInput(e[5].value).apply(this,arguments)})],i=!0)},p(o,r){e=o,r&1&&T(t,e[5].value)},d(o){o&&p(t),i=!1,B(l)}}}function Ve(e){let t,i,l;function c(){e[2].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(o){t=b(o,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","text"),k(t,"class","svelte-12frump")},m(o,r){E(o,t,r),T(t,e[5].value),i||(l=[C(t,"input",c),C(t,"input",function(){q(e[5].onInput(e[5].value))&&e[5].onInput(e[5].value).apply(this,arguments)})],i=!0)},p(o,r){e=o,r&1&&t.value!==e[5].value&&T(t,e[5].value)},d(o){o&&p(t),i=!1,B(l)}}}function Ge(e){let t,i,l;function c(){e[1].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(o){t=b(o,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","number"),k(t,"class","svelte-12frump")},m(o,r){E(o,t,r),T(t,e[5].value),i||(l=[C(t,"input",c),C(t,"input",function(){q(e[5].onInput(e[5].value))&&e[5].onInput(e[5].value).apply(this,arguments)})],i=!0)},p(o,r){e=o,r&1&&me(t.value)!==e[5].value&&T(t,e[5].value)},d(o){o&&p(t),i=!1,B(l)}}}function ue(e){let t,i=e[5].title+"",l,c,o;function r(s,f){return s[5].type=="number"?Ge:s[5].type=="string"?Ve:s[5].type=="color"?Ue:s[5].type=="checkbox"?Be:qe}let v=r(e),h=v(e);return{c(){t=w("label"),l=de(i),c=A(),h.c(),o=ee(),this.h()},l(s){t=b(s,"LABEL",{for:!0,class:!0});var f=X(t);l=fe(f,i),f.forEach(p),c=N(s),h.l(s),o=ee(),this.h()},h(){k(t,"for",e[7].toString()),k(t,"class","svelte-12frump")},m(s,f){E(s,t,f),he(t,l),E(s,c,f),h.m(s,f),E(s,o,f)},p(s,f){f&1&&i!==(i=s[5].title+"")&&xe(l,i),v===(v=r(s))&&h?h.p(s,f):(h.d(1),h=v(s),h&&(h.c(),h.m(o.parentNode,o)))},d(s){s&&p(t),s&&p(c),h.d(s),s&&p(o)}}}function Ke(e){let t,i=e[0],l=[];for(let c=0;c<i.length;c+=1)l[c]=ue(re(e,i,c));return{c(){t=w("div");for(let c=0;c<l.length;c+=1)l[c].c();this.h()},l(c){t=b(c,"DIV",{class:!0});var o=X(t);for(let r=0;r<l.length;r+=1)l[r].l(o);o.forEach(p),this.h()},h(){k(t,"class","container svelte-12frump")},m(c,o){E(c,t,o);for(let r=0;r<l.length;r+=1)l[r]&&l[r].m(t,null)},p(c,[o]){if(o&1){i=c[0];let r;for(r=0;r<i.length;r+=1){const v=re(c,i,r);l[r]?l[r].p(v,o):(l[r]=ue(v),l[r].c(),l[r].m(t,null))}for(;r<l.length;r+=1)l[r].d(1);l.length=i.length}},i:D,o:D,d(c){c&&p(t),Le(l,c)}}}function We(e,t,i){let{props:l}=t;function c(h,s){h[s].value=me(this.value),i(0,l)}function o(h,s){h[s].value=this.value,i(0,l)}function r(h,s){h[s].value=this.value,i(0,l)}function v(h,s){h[s].value=this.checked,i(0,l)}return e.$$set=h=>{"props"in h&&i(0,l=h.props)},[l,c,o,r,v]}class je extends W{constructor(t){super(),j(this,t,We,Ke,J,{props:0})}}function Je(e){let t,i,l,c,o,r,v,h;return l=new je({props:{props:[{title:"Stroke",type:"number",onInput:e[3],value:e[0]},{title:"Color",type:"color",onInput:e[4],value:e[1]},{title:"Dashed",type:"checkbox",onInput:e[5],value:e[2]}]}}),v=new Re({props:{dashed:e[2],color:e[1],stroke:e[0]}}),{c(){t=A(),i=w("div"),te(l.$$.fragment),c=A(),o=w("div"),r=A(),te(v.$$.fragment),this.h()},l(s){Ye("svelte-94kuob",document.head).forEach(p),t=N(s),i=b(s,"DIV",{class:!0});var m=X(i);ne(l.$$.fragment,m),m.forEach(p),c=N(s),o=b(s,"DIV",{class:!0}),X(o).forEach(p),r=N(s),ne(v.$$.fragment,s),this.h()},h(){document.title="Draw",k(i,"class","inputs-container svelte-tkspzd"),k(o,"class","test svelte-tkspzd")},m(s,f){E(s,t,f),E(s,i,f),ie(l,i,null),E(s,c,f),E(s,o,f),E(s,r,f),ie(v,s,f),h=!0},p(s,[f]){const m={};f&7&&(m.props=[{title:"Stroke",type:"number",onInput:s[3],value:s[0]},{title:"Color",type:"color",onInput:s[4],value:s[1]},{title:"Dashed",type:"checkbox",onInput:s[5],value:s[2]}]),l.$set(m);const L={};f&4&&(L.dashed=s[2]),f&2&&(L.color=s[1]),f&1&&(L.stroke=s[0]),v.$set(L)},i(s){h||(se(l.$$.fragment,s),se(v.$$.fragment,s),h=!0)},o(s){le(l.$$.fragment,s),le(v.$$.fragment,s),h=!1},d(s){s&&p(t),s&&p(i),ae(l),s&&p(c),s&&p(o),s&&p(r),ae(v,s)}}}function Qe(e,t,i){let l=5,c="#ff0000",o=!1;return[l,c,o,s=>{s!=null&&i(0,l=s)},s=>{s!=null&&i(1,c=s)},s=>{s!=null&&i(2,o=s)}]}class et extends W{constructor(t){super(),j(this,t,Qe,Je,J,{})}}export{et as component};
