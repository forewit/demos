var ye=Object.defineProperty;var _e=(e,t,i)=>t in e?ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var y=(e,t,i)=>(_e(e,typeof t!="symbol"?t+"":t,i),i);import{S as V,i as G,s as K,k as w,l as b,m as P,h as _,n as k,b as E,J as x,o as ke,w as Ee,R as we,q as ce,a as R,e as Z,r as ue,c as U,E as de,u as be,Q as fe,O as L,T as H,P as A,N as Y,y as $,D as Le,z as ee,A as te,g as ne,d as ie,B as se}from"../chunks/index.513dcc03.js";const le=500,xe=300,ae=500,Ye=300;class Xe{constructor(){y(this,"isMoving",!1);y(this,"isLongclick",!1);y(this,"button",0);y(this,"lastX",0);y(this,"lastY",0);y(this,"consecutiveClicks",0);y(this,"lastMouseupTime",0);y(this,"activeElement",null);this.reset()}reset(){this.isMoving=!1,this.isLongclick=!1,this.button=0,this.lastX=0,this.lastY=0,this.consecutiveClicks=0,this.lastMouseupTime=0,this.activeElement=null}}class Ce{constructor(){y(this,"isDragging",!1);y(this,"isPinching",!1);y(this,"isLongpressed",!1);y(this,"consecutiveTaps",0);y(this,"lastTouchendTime",0);y(this,"lastCenterX",0);y(this,"lastCenterY",0);y(this,"identifier",0);y(this,"x",0);y(this,"y",0);y(this,"hypotenuse",0);y(this,"activeElement",null);this.reset()}reset(){this.isDragging=!1,this.isPinching=!1,this.isLongpressed=!1,this.consecutiveTaps=0,this.lastTouchendTime=0,this.lastCenterX=0,this.lastCenterY=0,this.identifier=0,this.x=0,this.y=0,this.hypotenuse=0,this.activeElement=null}}let B=[],s=new Xe,n=new Ce;const d=(e,t)=>{e!=null&&e.dispatchEvent(new CustomEvent("gesture",{detail:t,bubbles:!1,cancelable:!1}))},De=e=>{s.reset(),n.reset(),s.lastMouseupTime=Date.now(),window.removeEventListener("mousemove",N),window.removeEventListener("mouseup",z),window.removeEventListener("touchmove",O),window.removeEventListener("touchend",X)},Te=e=>{if(window.removeEventListener("mousemove",N),window.removeEventListener("mouseup",z),window.removeEventListener("touchmove",O),window.removeEventListener("touchend",X),s.isMoving)if(s.isMoving=!1,s.isLongclick)s.isLongclick=!1,d(s.activeElement,{name:"longclick-drag-end",x:s.lastX,y:s.lastY});else switch(s.button){case 0:d(s.activeElement,{name:"left-click-drag-end",x:s.lastX,y:s.lastY});break;case 1:d(s.activeElement,{name:"middle-click-drag-end",x:s.lastX,y:s.lastY});break;case 2:d(s.activeElement,{name:"right-click-drag-end",x:s.lastX,y:s.lastY});break}s.isLongclick&&d(s.activeElement,{name:"longclick-release",x:s.lastX,y:s.lastY}),s.reset(),n.isDragging&&(n.isDragging=!1,n.isLongpressed?(n.isLongpressed=!1,d(n.activeElement,{name:"longpress-drag-end",x:n.lastCenterX,y:n.lastCenterY})):d(n.activeElement,{name:"touch-drag-end",x:n.lastCenterX,y:n.lastCenterY})),n.isLongpressed&&d(n.activeElement,{name:"longpress-release",x:n.lastCenterX,y:n.lastCenterY}),n.reset()},Pe=e=>{d(e.target,{name:"wheel",x:e.clientX,y:e.clientY,event:e}),e.preventDefault(),e.stopPropagation()},Ie=e=>{e.preventDefault(),e.stopPropagation()},Me=e=>{document.activeElement!==e.target&&(window.addEventListener("mousemove",N),window.addEventListener("mouseup",z),s.activeElement=e.target,s.lastX=e.clientX,s.lastY=e.clientY,s.isMoving||(s.button=e.button),s.button===0&&window.setTimeout(()=>{Date.now()-s.lastMouseupTime>=ae&&!s.isMoving&&(s.isLongclick=!0,d(s.activeElement,{name:"longclick",x:e.clientX,y:e.clientY}))},ae),e.preventDefault(),e.stopPropagation())},N=e=>{if(e.movementX===0&&e.movementY===0)return;let t=e.clientX-s.lastX,i=e.clientY-s.lastY;if(!s.isMoving)if(s.isLongclick)d(s.activeElement,{name:"longclick-drag-start",x:e.clientX,y:e.clientY});else switch(s.button){case 0:d(s.activeElement,{name:"left-click-drag-start",x:e.clientX,y:e.clientY});break;case 1:d(s.activeElement,{name:"middle-click-drag-start",x:e.clientX,y:e.clientY});break;case 2:d(s.activeElement,{name:"right-click-drag-start",x:e.clientX,y:e.clientY});break}if(s.isMoving=!0,s.lastX=e.clientX,s.lastY=e.clientY,s.isLongclick)d(s.activeElement,{name:"longclick-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});else switch(s.button){case 0:d(s.activeElement,{name:"left-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});break;case 1:d(s.activeElement,{name:"middle-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});break;case 2:d(s.activeElement,{name:"right-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:i});break}},z=e=>{if(window.removeEventListener("mousemove",N),window.removeEventListener("mouseup",z),s.lastMouseupTime=Date.now(),s.isMoving)if(s.isMoving=!1,s.isLongclick)s.isLongclick=!1,d(s.activeElement,{name:"longclick-drag-end",x:s.lastX,y:s.lastY});else switch(s.button){case 0:d(s.activeElement,{name:"left-click-drag-end",x:s.lastX,y:s.lastY});break;case 1:d(s.activeElement,{name:"middle-click-drag-end",x:s.lastX,y:s.lastY});break;case 2:d(s.activeElement,{name:"right-click-drag-end",x:s.lastX,y:s.lastY});break}else s.isLongclick||(e.button===2?d(s.activeElement,{name:"right-click",x:e.clientX,y:e.clientY}):e.button===1?d(s.activeElement,{name:"middle-click",x:e.clientX,y:e.clientY}):(s.consecutiveClicks===0&&d(s.activeElement,{name:"left-click",x:e.clientX,y:e.clientY}),s.consecutiveClicks++,window.setTimeout(()=>{s.consecutiveClicks>1&&d(s.activeElement,{name:"double-click",x:e.clientX,y:e.clientY}),s.consecutiveClicks=0},Ye)));s.isLongclick&&d(s.activeElement,{name:"longclick-release",x:e.clientX,y:e.clientY}),s.isLongclick=!1},Se=e=>{if(e.touches.length>1&&(e.preventDefault(),e.stopPropagation()),document.activeElement!==e.target){if(e.preventDefault(),e.stopPropagation(),e.touches.length>1){if(e.touches[0].identifier===n.identifier)return;n.isPinching=!0}window.addEventListener("touchmove",O,{passive:!1}),window.addEventListener("touchend",X),window.addEventListener("touchcancel",X),n.identifier=e.touches[0].identifier,n.x=e.touches[0].clientX,n.y=e.touches[0].clientY,n.activeElement=e.target,window.setTimeout(()=>{n.isPinching||n.isDragging||Date.now()-n.lastTouchendTime>=le&&(n.isDragging=!1,n.isPinching=!1,n.hypotenuse=null,n.isLongpressed=!0,d(n.activeElement,{name:"longpress",x:n.x,y:n.y}))},le)}},O=e=>{if(e.preventDefault(),e.stopPropagation(),n.isDragging){let t=n.x,i=n.y;n.x=e.touches[0].clientX,n.y=e.touches[0].clientY;let l=n.x-t,r=n.y-i;n.isLongpressed?d(n.activeElement,{name:"longpress-dragging",x:n.x,y:n.y,dx:l,dy:r}):d(n.activeElement,{name:"touch-dragging",x:n.x,y:n.y,dx:l,dy:r});return}else if(!n.isLongpressed&&(n.isPinching||e.touches.length>1)){n.x=e.touches[0].clientX,n.y=e.touches[0].clientY;let t={x:e.touches[1].clientX,y:e.touches[1].clientY},i={x:(n.x+t.x)/2,y:(n.y+t.y)/2},l=Math.hypot(n.x-t.x,n.y-t.y);n.hypotenuse===null&&(n.hypotenuse=l,n.lastCenterX=i.x,n.lastCenterY=i.y,d(n.activeElement,{name:"pinch-start",x:i.x,y:i.y})),n.isPinching=!0;let r=l/n.hypotenuse,a=i.x-n.lastCenterX,c=i.y-n.lastCenterY;d(n.activeElement,{name:"pinching",x:i.x,y:i.y,zoom:r,dx:a,dy:c}),n.hypotenuse=l,n.lastCenterX=i.x,n.lastCenterY=i.y;return}else n.isDragging=!0,n.isLongpressed?(d(n.activeElement,{name:"longpress-drag-start",x:n.x,y:n.y}),n.x=e.touches[0].clientX,n.y=e.touches[0].clientY,d(n.activeElement,{name:"longpress-dragging",x:n.x,y:n.y,dx:0,dy:0})):(d(n.activeElement,{name:"touch-drag-start",x:n.x,y:n.y}),n.x=e.touches[0].clientX,n.y=e.touches[0].clientY,d(n.activeElement,{name:"touch-dragging",x:n.x,y:n.y,dx:0,dy:0}))},X=e=>{n.isDragging&&e.touches.length>0&&e.touches[0].identifier===n.identifier||(n.lastTouchendTime=Date.now(),window.removeEventListener("touchmove",O),window.removeEventListener("touchend",X),window.removeEventListener("touchcancel",X),n.isDragging?(n.isDragging=!1,n.isLongpressed?(n.isLongpressed=!1,d(n.activeElement,{name:"longpress-drag-end",x:n.x,y:n.y})):d(n.activeElement,{name:"touch-drag-end",x:n.x,y:n.y})):n.isPinching?(n.isPinching=!1,n.hypotenuse=null,d(n.activeElement,{name:"pinch-end",x:n.lastCenterX,y:n.lastCenterY})):n.isLongpressed||(n.consecutiveTaps===0&&d(n.activeElement,{name:"tap",x:n.x,y:n.y}),n.consecutiveTaps++,window.setTimeout(()=>{n.consecutiveTaps>1&&d(n.activeElement,{name:"double-tap",x:n.x,y:n.y}),n.consecutiveTaps=0},xe)),n.isLongpressed&&d(n.activeElement,{name:"longpress-release",x:n.x,y:n.y}),n.isLongpressed=!1)};function He(...e){for(let t of e)B.findIndex(i=>i===t)===-1&&(B.length==0&&(window.addEventListener("blur",Te),window.addEventListener("focus",De)),B.push(t),t.addEventListener("touchstart",Se,{passive:!1}),t.addEventListener("mousedown",Me,{passive:!1}),t.addEventListener("contextmenu",Ie,{passive:!1}),t.addEventListener("wheel",Pe,{passive:!1}))}function Ae(e){let t;return{c(){t=w("canvas"),this.h()},l(i){t=b(i,"CANVAS",{id:!0,class:!0}),P(t).forEach(_),this.h()},h(){k(t,"id","canvas"),k(t,"class","svelte-16hz5p5")},m(i,l){E(i,t,l),e[6](t)},p:x,i:x,o:x,d(i){i&&_(t),e[6](null)}}}function Ne(e,t,i){let l,{radius:r=10}=t,{stroke:a=5}=t,{lineCap:c="round"}=t,{color:u="#000000"}=t,{dashed:f=!1}=t,o,m,v={x:0,y:0},W=0,J=0,C,I=!1,M,q=[],Q=function(h,g,p,S){var D=p-h,T=S-g;return Math.sqrt(D*D+T*T)};async function he(){console.log("resizing"),await F(),C=window.devicePixelRatio;let h=o.getBoundingClientRect();W=h.height*C,J=h.width*C,i(0,o.width=J,o),i(0,o.height=W,o);for(let g=0;g<q.length;g++)me(q[g])}function me(h){m.lineWidth=h.stroke,m.lineCap=h.lineCap,m.strokeStyle=h.color,m.setLineDash(h.dash),m.beginPath(),m.moveTo(h.points[0].x,h.points[0].y);for(let g=1;g<h.points.length;g=g+2)m.quadraticCurveTo(h.points[g-1].x,h.points[g-1].y,h.points[g].x,h.points[g].y),m.stroke()}function j(h,g){let p=o.getBoundingClientRect();return{x:(h-p.left)*C,y:(g-p.top)*C}}function ge(h,g){I=!0,M={points:[],stroke:a,lineCap:c,color:u,dash:l},m.lineWidth=a,m.lineCap=c,m.strokeStyle=u,m.setLineDash(l),m.beginPath(),v=j(h,g),m.moveTo(v.x,v.y),M.points.push(v)}function pe(h,g){if(!I)return;let p=j(h,g);if(r>0){if(Q(p.x,p.y,v.x,v.y)<=r)return;let T=Math.sqrt(p.x*p.x+p.y*p.y-2*p.x*v.x+v.x*v.x-2*p.y*v.y+v.y*v.y);if(p={x:p.x+r*((v.x-p.x)/T),y:p.y+r*((v.y-p.y)/T)},Q(v.x,v.y,p.x,p.y)<=.1)return}var S=(v.x+p.x)/2,D=(v.y+p.y)/2;m.quadraticCurveTo(v.x,v.y,S,D),v=p,m.stroke(),M.points.push({x:S,y:D},p)}async function F(){I&&q.push(M),I=!1}ke(()=>{m=o.getContext("2d"),m.imageSmoothingEnabled=!1,He(o),o.addEventListener("gesture",g=>{switch(g.detail.name){case"left-click-drag-start":case"touch-drag-start":ge(g.detail.x,g.detail.y);break;case"left-click-dragging":case"touch-dragging":pe(g.detail.x,g.detail.y);break;case"left-click-drag-end":case"tough-drag-end":F();break}}),new ResizeObserver(he).observe(o)});function ve(h){Ee[h?"unshift":"push"](()=>{o=h,i(0,o)})}return e.$$set=h=>{"radius"in h&&i(1,r=h.radius),"stroke"in h&&i(2,a=h.stroke),"lineCap"in h&&i(3,c=h.lineCap),"color"in h&&i(4,u=h.color),"dashed"in h&&i(5,f=h.dashed)},e.$$.update=()=>{e.$$.dirty&36&&(l=f?[a,a*3]:[])},[o,r,a,c,u,f,ve]}class ze extends V{constructor(t){super(),G(this,t,Ne,Ae,K,{radius:1,stroke:2,lineCap:3,color:4,dashed:5})}}function oe(e,t,i){const l=e.slice();return l[5]=t[i],l[6]=t,l[7]=i,l}function Oe(e){let t,i;return{c(){t=w("div"),i=ce("Invalid input type!")},l(l){t=b(l,"DIV",{});var r=P(t);i=ue(r,"Invalid input type!"),r.forEach(_)},m(l,r){E(l,t,r),de(t,i)},p:x,d(l){l&&_(t)}}}function qe(e){let t,i,l;function r(){e[4].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(a){t=b(a,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","checkbox"),k(t,"class","svelte-12frump")},m(a,c){E(a,t,c),t.checked=e[5].value,i||(l=[L(t,"change",r),L(t,"input",function(){H(e[5].onInput(!e[5].value))&&e[5].onInput(!e[5].value).apply(this,arguments)})],i=!0)},p(a,c){e=a,c&1&&(t.checked=e[5].value)},d(a){a&&_(t),i=!1,A(l)}}}function Be(e){let t,i,l;function r(){e[3].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(a){t=b(a,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","color"),k(t,"class","svelte-12frump")},m(a,c){E(a,t,c),Y(t,e[5].value),i||(l=[L(t,"input",r),L(t,"input",function(){H(e[5].onInput(e[5].value))&&e[5].onInput(e[5].value).apply(this,arguments)})],i=!0)},p(a,c){e=a,c&1&&Y(t,e[5].value)},d(a){a&&_(t),i=!1,A(l)}}}function Re(e){let t,i,l;function r(){e[2].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(a){t=b(a,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","text"),k(t,"class","svelte-12frump")},m(a,c){E(a,t,c),Y(t,e[5].value),i||(l=[L(t,"input",r),L(t,"input",function(){H(e[5].onInput(e[5].value))&&e[5].onInput(e[5].value).apply(this,arguments)})],i=!0)},p(a,c){e=a,c&1&&t.value!==e[5].value&&Y(t,e[5].value)},d(a){a&&_(t),i=!1,A(l)}}}function Ue(e){let t,i,l;function r(){e[1].call(t,e[6],e[7])}return{c(){t=w("input"),this.h()},l(a){t=b(a,"INPUT",{id:!0,type:!0,class:!0}),this.h()},h(){k(t,"id",e[7].toString()),k(t,"type","number"),k(t,"class","svelte-12frump")},m(a,c){E(a,t,c),Y(t,e[5].value),i||(l=[L(t,"input",r),L(t,"input",function(){H(e[5].onInput(e[5].value))&&e[5].onInput(e[5].value).apply(this,arguments)})],i=!0)},p(a,c){e=a,c&1&&fe(t.value)!==e[5].value&&Y(t,e[5].value)},d(a){a&&_(t),i=!1,A(l)}}}function re(e){let t,i=e[5].title+"",l,r,a;function c(o,m){return o[5].type=="number"?Ue:o[5].type=="string"?Re:o[5].type=="color"?Be:o[5].type=="checkbox"?qe:Oe}let u=c(e),f=u(e);return{c(){t=w("label"),l=ce(i),r=R(),f.c(),a=Z(),this.h()},l(o){t=b(o,"LABEL",{for:!0,class:!0});var m=P(t);l=ue(m,i),m.forEach(_),r=U(o),f.l(o),a=Z(),this.h()},h(){k(t,"for",e[7].toString()),k(t,"class","svelte-12frump")},m(o,m){E(o,t,m),de(t,l),E(o,r,m),f.m(o,m),E(o,a,m)},p(o,m){m&1&&i!==(i=o[5].title+"")&&be(l,i),u===(u=c(o))&&f?f.p(o,m):(f.d(1),f=u(o),f&&(f.c(),f.m(a.parentNode,a)))},d(o){o&&_(t),o&&_(r),f.d(o),o&&_(a)}}}function Ve(e){let t,i=e[0],l=[];for(let r=0;r<i.length;r+=1)l[r]=re(oe(e,i,r));return{c(){t=w("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){t=b(r,"DIV",{class:!0});var a=P(t);for(let c=0;c<l.length;c+=1)l[c].l(a);a.forEach(_),this.h()},h(){k(t,"class","container svelte-12frump")},m(r,a){E(r,t,a);for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(t,null)},p(r,[a]){if(a&1){i=r[0];let c;for(c=0;c<i.length;c+=1){const u=oe(r,i,c);l[c]?l[c].p(u,a):(l[c]=re(u),l[c].c(),l[c].m(t,null))}for(;c<l.length;c+=1)l[c].d(1);l.length=i.length}},i:x,o:x,d(r){r&&_(t),we(l,r)}}}function Ge(e,t,i){let{props:l}=t;function r(f,o){f[o].value=fe(this.value),i(0,l)}function a(f,o){f[o].value=this.value,i(0,l)}function c(f,o){f[o].value=this.value,i(0,l)}function u(f,o){f[o].value=this.checked,i(0,l)}return e.$$set=f=>{"props"in f&&i(0,l=f.props)},[l,r,a,c,u]}class Ke extends V{constructor(t){super(),G(this,t,Ge,Ve,K,{props:0})}}function We(e){let t,i,l,r,a,c;return l=new Ke({props:{props:[{title:"Stroke",type:"number",onInput:e[3],value:e[0]},{title:"Color",type:"color",onInput:e[4],value:e[1]},{title:"Dashed",type:"checkbox",onInput:e[5],value:e[2]}]}}),a=new ze({props:{dashed:e[2],color:e[1],stroke:e[0]}}),{c(){t=R(),i=w("div"),$(l.$$.fragment),r=R(),$(a.$$.fragment),this.h()},l(u){Le("svelte-94kuob",document.head).forEach(_),t=U(u),i=b(u,"DIV",{class:!0});var o=P(i);ee(l.$$.fragment,o),o.forEach(_),r=U(u),ee(a.$$.fragment,u),this.h()},h(){document.title="Draw",k(i,"class","inputs-container svelte-igcq23")},m(u,f){E(u,t,f),E(u,i,f),te(l,i,null),E(u,r,f),te(a,u,f),c=!0},p(u,[f]){const o={};f&7&&(o.props=[{title:"Stroke",type:"number",onInput:u[3],value:u[0]},{title:"Color",type:"color",onInput:u[4],value:u[1]},{title:"Dashed",type:"checkbox",onInput:u[5],value:u[2]}]),l.$set(o);const m={};f&4&&(m.dashed=u[2]),f&2&&(m.color=u[1]),f&1&&(m.stroke=u[0]),a.$set(m)},i(u){c||(ne(l.$$.fragment,u),ne(a.$$.fragment,u),c=!0)},o(u){ie(l.$$.fragment,u),ie(a.$$.fragment,u),c=!1},d(u){u&&_(t),u&&_(i),se(l),u&&_(r),se(a,u)}}}function Je(e,t,i){let l=5,r="#ff0000",a=!1;return[l,r,a,o=>{o!=null&&i(0,l=o)},o=>{o!=null&&i(1,r=o)},o=>{o!=null&&i(2,a=o)}]}class Ze extends V{constructor(t){super(),G(this,t,Je,We,K,{})}}export{Ze as component};
