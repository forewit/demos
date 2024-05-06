var De=Object.defineProperty;var Me=(e,t,n)=>t in e?De(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var E=(e,t,n)=>(Me(e,typeof t!="symbol"?t+"":t,n),n);import{S as ne,i as ie,s as se,k as Y,a as R,q as Q,l as X,m as I,h as _,c as q,r as j,n as g,b as w,E as U,I as M,o as xe,w as ee,L as ue,K as Ee,O as T,Q as te,e as K,M as Se,u as we,N as x,R as A,P as z,y as fe,D as He,z as de,A as he,g as me,d as ge,B as pe}from"../chunks/index.c2e617d6.js";import{b as Le}from"../chunks/paths.32e58d78.js";const ve=500,Ne=300,_e=500,Oe=300;class Ue{constructor(){E(this,"isMoving",!1);E(this,"isLongclick",!1);E(this,"button",0);E(this,"lastX",0);E(this,"lastY",0);E(this,"consecutiveClicks",0);E(this,"lastMouseupTime",0);E(this,"activeElement",null);this.reset()}reset(){this.isMoving=!1,this.isLongclick=!1,this.button=0,this.lastX=0,this.lastY=0,this.consecutiveClicks=0,this.lastMouseupTime=0,this.activeElement=null}}class Ae{constructor(){E(this,"isDragging",!1);E(this,"isPinching",!1);E(this,"isLongpressed",!1);E(this,"consecutiveTaps",0);E(this,"lastTouchendTime",0);E(this,"lastCenterX",0);E(this,"lastCenterY",0);E(this,"identifier",0);E(this,"x",0);E(this,"y",0);E(this,"hypotenuse",0);E(this,"activeElement",null);this.reset()}reset(){this.isDragging=!1,this.isPinching=!1,this.isLongpressed=!1,this.consecutiveTaps=0,this.lastTouchendTime=0,this.lastCenterX=0,this.lastCenterY=0,this.identifier=0,this.x=0,this.y=0,this.hypotenuse=0,this.activeElement=null}}let $=[],r=new Ue,s=new Ae;const h=(e,t)=>{e!=null&&e.dispatchEvent(new CustomEvent("gesture",{detail:t,bubbles:!1,cancelable:!1}))},We=e=>{r.reset(),s.reset(),r.lastMouseupTime=Date.now(),window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",J),window.removeEventListener("touchmove",Z),window.removeEventListener("touchend",O)},Be=e=>{if(window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",J),window.removeEventListener("touchmove",Z),window.removeEventListener("touchend",O),r.isMoving)if(r.isMoving=!1,r.isLongclick)r.isLongclick=!1,h(r.activeElement,{name:"longclick-drag-end",x:r.lastX,y:r.lastY});else switch(r.button){case 0:h(r.activeElement,{name:"left-click-drag-end",x:r.lastX,y:r.lastY});break;case 1:h(r.activeElement,{name:"middle-click-drag-end",x:r.lastX,y:r.lastY});break;case 2:h(r.activeElement,{name:"right-click-drag-end",x:r.lastX,y:r.lastY});break}r.isLongclick&&h(r.activeElement,{name:"longclick-release",x:r.lastX,y:r.lastY}),r.reset(),s.isDragging&&(s.isDragging=!1,s.isLongpressed?(s.isLongpressed=!1,h(s.activeElement,{name:"longpress-drag-end",x:s.lastCenterX,y:s.lastCenterY})):h(s.activeElement,{name:"touch-drag-end",x:s.lastCenterX,y:s.lastCenterY})),s.isLongpressed&&h(s.activeElement,{name:"longpress-release",x:s.lastCenterX,y:s.lastCenterY}),s.reset()},Re=e=>{h(e.target,{name:"wheel",x:e.clientX,y:e.clientY,event:e}),e.preventDefault(),e.stopPropagation()},qe=e=>{e.preventDefault(),e.stopPropagation()},ze=e=>{document.activeElement!==e.target&&(window.addEventListener("mousemove",F),window.addEventListener("mouseup",J),r.activeElement=e.target,r.lastX=e.clientX,r.lastY=e.clientY,r.isMoving||(r.button=e.button),r.button===0&&window.setTimeout(()=>{Date.now()-r.lastMouseupTime>=_e&&!r.isMoving&&(r.isLongclick=!0,h(r.activeElement,{name:"longclick",x:e.clientX,y:e.clientY}))},_e),e.preventDefault(),e.stopPropagation())},F=e=>{if(e.movementX===0&&e.movementY===0)return;let t=e.clientX-r.lastX,n=e.clientY-r.lastY;if(!r.isMoving)if(r.isLongclick)h(r.activeElement,{name:"longclick-drag-start",x:e.clientX,y:e.clientY});else switch(r.button){case 0:h(r.activeElement,{name:"left-click-drag-start",x:e.clientX,y:e.clientY});break;case 1:h(r.activeElement,{name:"middle-click-drag-start",x:e.clientX,y:e.clientY});break;case 2:h(r.activeElement,{name:"right-click-drag-start",x:e.clientX,y:e.clientY});break}if(r.isMoving=!0,r.lastX=e.clientX,r.lastY=e.clientY,r.isLongclick)h(r.activeElement,{name:"longclick-dragging",x:e.clientX,y:e.clientY,dx:t,dy:n});else switch(r.button){case 0:h(r.activeElement,{name:"left-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:n});break;case 1:h(r.activeElement,{name:"middle-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:n});break;case 2:h(r.activeElement,{name:"right-click-dragging",x:e.clientX,y:e.clientY,dx:t,dy:n});break}},J=e=>{if(window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",J),r.lastMouseupTime=Date.now(),r.isMoving)if(r.isMoving=!1,r.isLongclick)r.isLongclick=!1,h(r.activeElement,{name:"longclick-drag-end",x:r.lastX,y:r.lastY});else switch(r.button){case 0:h(r.activeElement,{name:"left-click-drag-end",x:r.lastX,y:r.lastY});break;case 1:h(r.activeElement,{name:"middle-click-drag-end",x:r.lastX,y:r.lastY});break;case 2:h(r.activeElement,{name:"right-click-drag-end",x:r.lastX,y:r.lastY});break}else r.isLongclick||(e.button===2?h(r.activeElement,{name:"right-click",x:e.clientX,y:e.clientY}):e.button===1?h(r.activeElement,{name:"middle-click",x:e.clientX,y:e.clientY}):(r.consecutiveClicks===0&&h(r.activeElement,{name:"left-click",x:e.clientX,y:e.clientY}),r.consecutiveClicks++,window.setTimeout(()=>{r.consecutiveClicks>1&&h(r.activeElement,{name:"double-click",x:e.clientX,y:e.clientY}),r.consecutiveClicks=0},Oe)));r.isLongclick&&h(r.activeElement,{name:"longclick-release",x:e.clientX,y:e.clientY}),r.isLongclick=!1},Ge=e=>{if(e.touches.length>1&&(e.preventDefault(),e.stopPropagation()),document.activeElement!==e.target){if(e.preventDefault(),e.stopPropagation(),e.touches.length>1){if(e.touches[0].identifier===s.identifier)return;s.isPinching=!0}window.addEventListener("touchmove",Z,{passive:!1}),window.addEventListener("touchend",O),window.addEventListener("touchcancel",O),s.identifier=e.touches[0].identifier,s.x=e.touches[0].clientX,s.y=e.touches[0].clientY,s.activeElement=e.target,window.setTimeout(()=>{s.isPinching||s.isDragging||Date.now()-s.lastTouchendTime>=ve&&(s.isDragging=!1,s.isPinching=!1,s.hypotenuse=null,s.isLongpressed=!0,h(s.activeElement,{name:"longpress",x:s.x,y:s.y}))},ve)}},Z=e=>{if(e.preventDefault(),e.stopPropagation(),s.isDragging){let t=s.x,n=s.y;s.x=e.touches[0].clientX,s.y=e.touches[0].clientY;let i=s.x-t,o=s.y-n;s.isLongpressed?h(s.activeElement,{name:"longpress-dragging",x:s.x,y:s.y,dx:i,dy:o,force:e.touches[0].force}):h(s.activeElement,{name:"touch-dragging",x:s.x,y:s.y,dx:i,dy:o,force:e.touches[0].force});return}else if(!s.isLongpressed&&(s.isPinching||e.touches.length>1)){s.x=e.touches[0].clientX,s.y=e.touches[0].clientY;let t={x:e.touches[1].clientX,y:e.touches[1].clientY},n={x:(s.x+t.x)/2,y:(s.y+t.y)/2},i=Math.hypot(s.x-t.x,s.y-t.y);s.hypotenuse===null&&(s.hypotenuse=i,s.lastCenterX=n.x,s.lastCenterY=n.y,h(s.activeElement,{name:"pinch-start",x:n.x,y:n.y})),s.isPinching=!0;let o=i/s.hypotenuse,l=n.x-s.lastCenterX,a=n.y-s.lastCenterY;h(s.activeElement,{name:"pinching",x:n.x,y:n.y,zoom:o,dx:l,dy:a}),s.hypotenuse=i,s.lastCenterX=n.x,s.lastCenterY=n.y;return}else s.isDragging=!0,s.isLongpressed?(h(s.activeElement,{name:"longpress-drag-start",x:s.x,y:s.y,force:e.touches[0].force}),s.x=e.touches[0].clientX,s.y=e.touches[0].clientY,h(s.activeElement,{name:"longpress-dragging",x:s.x,y:s.y,dx:0,dy:0,force:e.touches[0].force})):(h(s.activeElement,{name:"touch-drag-start",x:s.x,y:s.y,force:e.touches[0].force}),s.x=e.touches[0].clientX,s.y=e.touches[0].clientY,h(s.activeElement,{name:"touch-dragging",x:s.x,y:s.y,dx:0,dy:0,force:e.touches[0].force}))},O=e=>{s.isDragging&&e.touches.length>0&&e.touches[0].identifier===s.identifier||(s.lastTouchendTime=Date.now(),window.removeEventListener("touchmove",Z),window.removeEventListener("touchend",O),window.removeEventListener("touchcancel",O),s.isDragging?(s.isDragging=!1,s.isLongpressed?(s.isLongpressed=!1,h(s.activeElement,{name:"longpress-drag-end",x:s.x,y:s.y})):h(s.activeElement,{name:"touch-drag-end",x:s.x,y:s.y})):s.isPinching?(s.isPinching=!1,s.hypotenuse=null,h(s.activeElement,{name:"pinch-end",x:s.lastCenterX,y:s.lastCenterY})):s.isLongpressed||(s.consecutiveTaps===0&&h(s.activeElement,{name:"tap",x:s.x,y:s.y}),s.consecutiveTaps++,window.setTimeout(()=>{s.consecutiveTaps>1&&h(s.activeElement,{name:"double-tap",x:s.x,y:s.y}),s.consecutiveTaps=0},Ne)),s.isLongpressed&&h(s.activeElement,{name:"longpress-release",x:s.x,y:s.y}),s.isLongpressed=!1)};function Ve(...e){for(let t of e)$.findIndex(n=>n===t)===-1&&($.length==0&&(window.addEventListener("blur",Be),window.addEventListener("focus",We)),$.push(t),t.addEventListener("touchstart",Ge,{passive:!1}),t.addEventListener("mousedown",ze,{passive:!1}),t.addEventListener("contextmenu",qe,{passive:!1}),t.addEventListener("wheel",Re,{passive:!1}))}function Ke(e){let t,n,i,o;return{c(){t=Y("canvas"),n=R(),i=Y("div"),o=Q("LOG"),this.h()},l(l){t=X(l,"CANVAS",{id:!0,class:!0}),I(t).forEach(_),n=q(l),i=X(l,"DIV",{class:!0});var a=I(i);o=j(a,"LOG"),a.forEach(_),this.h()},h(){g(t,"id","canvas"),g(t,"class","svelte-18vcmku"),g(i,"class","log svelte-18vcmku")},m(l,a){w(l,t,a),e[9](t),w(l,n,a),w(l,i,a),U(i,o),e[10](i)},p:M,i:M,o:M,d(l){l&&_(t),e[9](null),l&&_(n),l&&_(i),e[10](null)}}}function Qe(e,t,n){let i,{radius:o=3}=t,{smoothness:l=2}=t,{stroke:a=5}=t,{pressureScaler:u=5}=t,{color:c="#000000"}=t;function f(){m.clearRect(0,0,G,L),D=[]}function y(){if(D.length!=0){n(1,S.innerHTML="Undo",S),D.pop(),m.clearRect(0,0,G,L);for(let d=0;d<D.length;d++)oe(D[d])}}let k,m,p={x:0,y:0},P=0,L=0,G=0,W,V=!1,S,B,D=[];const le=(d,v,C,b)=>{var H=C-d,N=b-v;return Math.sqrt(H*H+N*N)},Ye=(d,v=300)=>{let C;return(...b)=>{clearTimeout(C),C=setTimeout(()=>{d.apply(void 0,b)},v)}};function ae(d,v){let C=k.getBoundingClientRect();return{x:(d-C.left)*W,y:(v-C.top)*W}}function Xe(){console.log("resizing"),re(),W=window.devicePixelRatio;let d=k.getBoundingClientRect();L=d.height*W,G=d.width*W,n(0,k.width=G,k),n(0,k.height=L,k);for(let v=0;v<D.length;v++)oe(D[v])}function oe(d){m.lineWidth=d.lineWidths[0],m.lineCap="round",m.strokeStyle=d.color,m.beginPath(),m.moveTo(d.points[0].x,d.points[0].y),m.stroke();for(let v=0;v<d.points.length;v++)m.lineWidth=d.lineWidths[v],m.quadraticCurveTo(d.points[v].x,d.points[v].y,d.ctrlPoints[v].x,d.ctrlPoints[v].y),m.stroke(),m.beginPath(),m.moveTo(d.ctrlPoints[v].x,d.ctrlPoints[v].y)}function Ce(d,v,C){V=!0,p=ae(d,v),C!==void 0&&C>0?P=Math.log(C+1)*u*i:P=i,m.lineWidth=P,m.lineCap="round",m.strokeStyle=c,m.beginPath(),m.moveTo(p.x,p.y),m.stroke(),B={points:[],ctrlPoints:[],lineWidths:[],color:c}}function Te(d,v,C){if(!V)return;let b=ae(d,v);if(o>0){if(le(b.x,b.y,p.x,p.y)<=o)return;let ce=Math.sqrt(b.x*b.x+b.y*b.y-2*b.x*p.x+p.x*p.x-2*b.y*p.y+p.y*p.y);if(b={x:b.x+o*((p.x-b.x)/ce),y:b.y+o*((p.y-b.y)/ce)},le(p.x,p.y,b.x,b.y)<=l)return}let H=(p.x+b.x)/2,N=(p.y+b.y)/2;C!==void 0&&C>0&&(P=Math.log(C+1)*u*i*.2+P*.8),m.lineWidth=P,m.quadraticCurveTo(p.x,p.y,H,N),m.stroke(),m.beginPath(),m.moveTo(H,N),B.points.push(p),B.ctrlPoints.push({x:H,y:N}),B.lineWidths.push(P),p=b}function re(){V&&D.push(B),V=!1}xe(()=>{m=k.getContext("2d"),m.imageSmoothingEnabled=!1,Ve(k),k.addEventListener("gesture",v=>{switch(v.detail.name){case"left-click-drag-start":case"touch-drag-start":Ce(v.detail.x,v.detail.y,v.detail.force);break;case"left-click-dragging":case"touch-dragging":v.detail.force>0&&n(1,S.innerHTML=v.detail.force,S),Te(v.detail.x,v.detail.y,v.detail.force);break;case"left-click-drag-end":case"touch-drag-end":re();break}}),new ResizeObserver(Ye(Xe,0)).observe(k)});function Pe(d){ee[d?"unshift":"push"](()=>{k=d,n(0,k)})}function Ie(d){ee[d?"unshift":"push"](()=>{S=d,n(1,S)})}return e.$$set=d=>{"radius"in d&&n(2,o=d.radius),"smoothness"in d&&n(3,l=d.smoothness),"stroke"in d&&n(4,a=d.stroke),"pressureScaler"in d&&n(5,u=d.pressureScaler),"color"in d&&n(6,c=d.color)},e.$$.update=()=>{e.$$.dirty&16&&(i=Math.max(a,1))},[k,S,o,l,a,u,c,f,y,Pe,Ie]}class je extends ne{constructor(t){super(),ie(this,t,Qe,Ke,se,{radius:2,smoothness:3,stroke:4,pressureScaler:5,color:6,clear:7,undo:8})}get clear(){return this.$$.ctx[7]}get undo(){return this.$$.ctx[8]}}function ye(e,t,n){const i=e.slice();return i[9]=t[n],i[10]=t,i[11]=n,i}function ke(e){let t,n,i,o,l;return{c(){t=Y("button"),n=Y("img"),this.h()},l(a){t=X(a,"BUTTON",{class:!0});var u=I(t);n=X(u,"IMG",{src:!0,alt:!0,class:!0}),u.forEach(_),this.h()},h(){Ee(n.src,i=Le+"/images/close-icon.svg")||g(n,"src",i),g(n,"alt",""),g(n,"class","svelte-l4ogrk"),g(t,"class","close-btn svelte-l4ogrk")},m(a,u){w(a,t,u),U(t,n),o||(l=T(t,"click",e[2]),o=!0)},p:M,d(a){a&&_(t),o=!1,l()}}}function Fe(e){let t,n,i,o,l;return{c(){t=Y("button"),n=Y("img"),this.h()},l(a){t=X(a,"BUTTON",{class:!0});var u=I(t);n=X(u,"IMG",{src:!0,alt:!0,class:!0}),u.forEach(_),this.h()},h(){Ee(n.src,i=Le+"/images/settings-icon.svg")||g(n,"src",i),g(n,"alt","Open"),g(n,"class","svelte-l4ogrk"),g(t,"class","open-btn svelte-l4ogrk")},m(a,u){w(a,t,u),U(t,n),o||(l=T(t,"click",e[8]),o=!0)},p:M,d(a){a&&_(t),o=!1,l()}}}function Je(e){let t,n=e[0],i=[];for(let o=0;o<n.length;o+=1)i[o]=be(ye(e,n,o));return{c(){for(let o=0;o<i.length;o+=1)i[o].c();t=K()},l(o){for(let l=0;l<i.length;l+=1)i[l].l(o);t=K()},m(o,l){for(let a=0;a<i.length;a+=1)i[a]&&i[a].m(o,l);w(o,t,l)},p(o,l){if(l&1){n=o[0];let a;for(a=0;a<n.length;a+=1){const u=ye(o,n,a);i[a]?i[a].p(u,l):(i[a]=be(u),i[a].c(),i[a].m(t.parentNode,t))}for(;a<i.length;a+=1)i[a].d(1);i.length=n.length}},d(o){Se(i,o),o&&_(t)}}}function Ze(e){let t,n;return{c(){t=Y("div"),n=Q("Invalid input type!")},l(i){t=X(i,"DIV",{});var o=I(t);n=j(o,"Invalid input type!"),o.forEach(_)},m(i,o){w(i,t,o),U(t,n)},p:M,d(i){i&&_(t)}}}function $e(e){let t,n,i,o,l,a;function u(){e[7].call(t,e[10],e[11])}return{c(){t=Y("input"),this.h()},l(c){t=X(c,"INPUT",{id:!0,type:!0,min:!0,max:!0,step:!0}),this.h()},h(){g(t,"id",e[11].toString()),g(t,"type","range"),g(t,"min",n=e[9].min||0),g(t,"max",i=e[9].max||100),g(t,"step",o=e[9].step||1)},m(c,f){w(c,t,f),x(t,e[9].value),l||(a=[T(t,"change",u),T(t,"input",u),T(t,"input",function(){A(e[9].onInput(e[9].value||e[9].min||0))&&e[9].onInput(e[9].value||e[9].min||0).apply(this,arguments)})],l=!0)},p(c,f){e=c,f&1&&n!==(n=e[9].min||0)&&g(t,"min",n),f&1&&i!==(i=e[9].max||100)&&g(t,"max",i),f&1&&o!==(o=e[9].step||1)&&g(t,"step",o),f&1&&x(t,e[9].value)},d(c){c&&_(t),l=!1,z(a)}}}function et(e){let t,n=e[9].label+"",i,o,l;return{c(){t=Y("button"),i=Q(n),this.h()},l(a){t=X(a,"BUTTON",{class:!0,id:!0});var u=I(t);i=j(u,n),u.forEach(_),this.h()},h(){g(t,"class","btn svelte-l4ogrk"),g(t,"id",e[11].toString())},m(a,u){w(a,t,u),U(t,i),o||(l=T(t,"click",function(){A(e[9].onClick())&&e[9].onClick().apply(this,arguments)}),o=!0)},p(a,u){e=a,u&1&&n!==(n=e[9].label+"")&&we(i,n)},d(a){a&&_(t),o=!1,l()}}}function tt(e){let t,n,i;function o(){e[6].call(t,e[10],e[11])}return{c(){t=Y("input"),this.h()},l(l){t=X(l,"INPUT",{class:!0,id:!0,type:!0}),this.h()},h(){g(t,"class","input svelte-l4ogrk"),g(t,"id",e[11].toString()),g(t,"type","checkbox")},m(l,a){w(l,t,a),t.checked=e[9].value,n||(i=[T(t,"change",o),T(t,"input",function(){A(e[9].onInput(!e[9].value))&&e[9].onInput(!e[9].value).apply(this,arguments)})],n=!0)},p(l,a){e=l,a&1&&(t.checked=e[9].value)},d(l){l&&_(t),n=!1,z(i)}}}function nt(e){let t,n,i;function o(){e[5].call(t,e[10],e[11])}return{c(){t=Y("input"),this.h()},l(l){t=X(l,"INPUT",{class:!0,id:!0,type:!0}),this.h()},h(){g(t,"class","input svelte-l4ogrk"),g(t,"id",e[11].toString()),g(t,"type","color")},m(l,a){w(l,t,a),x(t,e[9].value),n||(i=[T(t,"input",o),T(t,"input",function(){A(e[9].onInput(e[9].value||"#000000"))&&e[9].onInput(e[9].value||"#000000").apply(this,arguments)})],n=!0)},p(l,a){e=l,a&1&&x(t,e[9].value)},d(l){l&&_(t),n=!1,z(i)}}}function it(e){let t,n,i;function o(){e[4].call(t,e[10],e[11])}return{c(){t=Y("input"),this.h()},l(l){t=X(l,"INPUT",{class:!0,id:!0,type:!0}),this.h()},h(){g(t,"class","input svelte-l4ogrk"),g(t,"id",e[11].toString()),g(t,"type","text")},m(l,a){w(l,t,a),x(t,e[9].value),n||(i=[T(t,"input",o),T(t,"input",function(){A(e[9].onInput(e[9].value||""))&&e[9].onInput(e[9].value||"").apply(this,arguments)})],n=!0)},p(l,a){e=l,a&1&&t.value!==e[9].value&&x(t,e[9].value)},d(l){l&&_(t),n=!1,z(i)}}}function st(e){let t,n,i;function o(){e[3].call(t,e[10],e[11])}return{c(){t=Y("input"),this.h()},l(l){t=X(l,"INPUT",{class:!0,id:!0,type:!0}),this.h()},h(){g(t,"class","input svelte-l4ogrk"),g(t,"id",e[11].toString()),g(t,"type","number")},m(l,a){w(l,t,a),x(t,e[9].value),n||(i=[T(t,"input",o),T(t,"input",function(){A(e[9].onInput(e[9].value||0))&&e[9].onInput(e[9].value||0).apply(this,arguments)})],n=!0)},p(l,a){e=l,a&1&&te(t.value)!==e[9].value&&x(t,e[9].value)},d(l){l&&_(t),n=!1,z(i)}}}function be(e){let t,n=e[9].title+"",i,o,l;function a(f,y){return f[9].type=="number"?st:f[9].type=="text"?it:f[9].type=="color"?nt:f[9].type=="checkbox"?tt:f[9].type=="button"?et:f[9].type=="slider"?$e:Ze}let u=a(e),c=u(e);return{c(){t=Y("label"),i=Q(n),o=R(),c.c(),l=K(),this.h()},l(f){t=X(f,"LABEL",{class:!0,for:!0});var y=I(t);i=j(y,n),y.forEach(_),o=q(f),c.l(f),l=K(),this.h()},h(){g(t,"class","label svelte-l4ogrk"),g(t,"for",e[11].toString())},m(f,y){w(f,t,y),U(t,i),w(f,o,y),c.m(f,y),w(f,l,y)},p(f,y){y&1&&n!==(n=f[9].title+"")&&we(i,n),u===(u=a(f))&&c?c.p(f,y):(c.d(1),c=u(f),c&&(c.c(),c.m(l.parentNode,l)))},d(f){f&&_(t),f&&_(o),c.d(f),f&&_(l)}}}function lt(e){let t,n,i=e[1]&&ke(e);function o(u,c){return u[1]?Je:Fe}let l=o(e),a=l(e);return{c(){i&&i.c(),t=R(),n=Y("div"),a.c(),this.h()},l(u){i&&i.l(u),t=q(u),n=X(u,"DIV",{class:!0});var c=I(n);a.l(c),c.forEach(_),this.h()},h(){g(n,"class","container glass svelte-l4ogrk"),ue(n,"closed",!e[1])},m(u,c){i&&i.m(u,c),w(u,t,c),w(u,n,c),a.m(n,null)},p(u,[c]){u[1]?i?i.p(u,c):(i=ke(u),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null),l===(l=o(u))&&a?a.p(u,c):(a.d(1),a=l(u),a&&(a.c(),a.m(n,null))),c&2&&ue(n,"closed",!u[1])},i:M,o:M,d(u){i&&i.d(u),u&&_(t),u&&_(n),a.d()}}}function at(e,t,n){let{props:i}=t,o=!1;const l=()=>n(1,o=!1);function a(m,p){m[p].value=te(this.value),n(0,i)}function u(m,p){m[p].value=this.value,n(0,i)}function c(m,p){m[p].value=this.value,n(0,i)}function f(m,p){m[p].value=this.checked,n(0,i)}function y(m,p){m[p].value=te(this.value),n(0,i)}const k=()=>{n(1,o=!0)};return e.$$set=m=>{"props"in m&&n(0,i=m.props)},[i,o,l,a,u,c,f,y,k]}class ot extends ne{constructor(t){super(),ie(this,t,at,lt,se,{props:0})}}function rt(e){let t,n,i,o,l,a;i=new ot({props:{props:[{title:"Stroke",type:"slider",max:50,onInput:e[5],value:e[1]},{title:"Radius",type:"slider",max:50,onInput:e[6],value:e[2]},{title:"Smoothness",type:"slider",max:50,onInput:e[7],value:e[3]},{title:"Color",type:"color",onInput:e[8],value:e[4]},{title:"Clear",type:"button",onClick:e[9],label:"🧹"},{title:"Undo",type:"button",onClick:e[10],label:"🔙"}]}});let u={color:e[4],stroke:e[1],radius:e[2],smoothness:e[3]};return l=new je({props:u}),e[11](l),{c(){t=R(),n=Y("div"),fe(i.$$.fragment),o=R(),fe(l.$$.fragment),this.h()},l(c){He("svelte-94kuob",document.head).forEach(_),t=q(c),n=X(c,"DIV",{class:!0});var y=I(n);de(i.$$.fragment,y),y.forEach(_),o=q(c),de(l.$$.fragment,c),this.h()},h(){document.title="Draw",g(n,"class","inputs-container svelte-igcq23")},m(c,f){w(c,t,f),w(c,n,f),he(i,n,null),w(c,o,f),he(l,c,f),a=!0},p(c,[f]){const y={};f&31&&(y.props=[{title:"Stroke",type:"slider",max:50,onInput:c[5],value:c[1]},{title:"Radius",type:"slider",max:50,onInput:c[6],value:c[2]},{title:"Smoothness",type:"slider",max:50,onInput:c[7],value:c[3]},{title:"Color",type:"color",onInput:c[8],value:c[4]},{title:"Clear",type:"button",onClick:c[9],label:"🧹"},{title:"Undo",type:"button",onClick:c[10],label:"🔙"}]),i.$set(y);const k={};f&16&&(k.color=c[4]),f&2&&(k.stroke=c[1]),f&4&&(k.radius=c[2]),f&8&&(k.smoothness=c[3]),l.$set(k)},i(c){a||(me(i.$$.fragment,c),me(l.$$.fragment,c),a=!0)},o(c){ge(i.$$.fragment,c),ge(l.$$.fragment,c),a=!1},d(c){c&&_(t),c&&_(n),pe(i),c&&_(o),e[11](null),pe(l,c)}}}function ct(e,t,n){let i,o=10,l=3,a=2,u="#429A53";const c=L=>{L!=null&&n(1,o=L)},f=L=>{L!=null&&n(2,l=L)},y=L=>{L!=null&&n(3,a=L)},k=L=>{L!=null&&n(4,u=L)},m=()=>{i.clear()},p=()=>{i.undo()};function P(L){ee[L?"unshift":"push"](()=>{i=L,n(0,i)})}return[i,o,l,a,u,c,f,y,k,m,p,P]}class mt extends ne{constructor(t){super(),ie(this,t,ct,rt,se,{})}}export{mt as component};
