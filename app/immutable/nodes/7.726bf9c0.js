import{S as x,i as ee,s as te,k as p,y as ne,a as U,q as L,l as _,m as j,z as ae,c as C,r as R,h as I,n as r,p as le,b as A,A as ie,E as o,N as P,O as z,P as F,u as se,g as re,d as oe,B as ue,Q as Z,o as he,R as ce,w as de}from"../chunks/index.38a6999c.js";import{F as fe}from"../chunks/Fireworks.dd749715.js";function K(t,a,s){const l=t.slice();return l[15]=a[s],l[16]=a,l[17]=s,l}function X(t){let a,s=t[2],l=[];for(let i=0;i<s.length;i+=1)l[i]=Y(K(t,s,i));return{c(){a=p("div");for(let i=0;i<l.length;i+=1)l[i].c();this.h()},l(i){a=_(i,"DIV",{id:!0,class:!0});var n=j(a);for(let e=0;e<l.length;e+=1)l[e].l(n);n.forEach(I),this.h()},h(){r(a,"id","formContainer"),r(a,"class","svelte-h2e5th")},m(i,n){A(i,a,n);for(let e=0;e<l.length;e+=1)l[e]&&l[e].m(a,null)},p(i,n){if(n&4){s=i[2];let e;for(e=0;e<s.length;e+=1){const c=K(i,s,e);l[e]?l[e].p(c,n):(l[e]=Y(c),l[e].c(),l[e].m(a,null))}for(;e<l.length;e+=1)l[e].d(1);l.length=s.length}},d(i){i&&I(a),ce(l,i)}}}function Y(t){let a,s,l,i,n,e,c,m,v,w,E,g,h,N,d,O,$,u;function T(){t[8].call(l,t[16],t[17])}function D(){t[9].call(e,t[16],t[17])}function W(){t[10].call(v,t[16],t[17])}function M(){t[11].call(g,t[16],t[17])}function B(){t[12].call(d,t[16],t[17])}return{c(){a=p("div"),s=p("div"),l=p("input"),i=U(),n=p("div"),e=p("input"),c=U(),m=p("div"),v=p("input"),w=U(),E=p("div"),g=p("input"),h=U(),N=p("div"),d=p("input"),O=U(),this.h()},l(S){a=_(S,"DIV",{class:!0});var f=j(a);s=_(f,"DIV",{class:!0,"data-emoji":!0});var k=j(s);l=_(k,"INPUT",{type:!0,class:!0,name:!0}),k.forEach(I),i=C(f),n=_(f,"DIV",{class:!0,"data-emoji":!0});var b=j(n);e=_(b,"INPUT",{type:!0,class:!0,name:!0}),b.forEach(I),c=C(f),m=_(f,"DIV",{class:!0,"data-emoji":!0});var y=j(m);v=_(y,"INPUT",{type:!0,class:!0,name:!0}),y.forEach(I),w=C(f),E=_(f,"DIV",{class:!0,"data-emoji":!0});var q=j(E);g=_(q,"INPUT",{type:!0,class:!0,name:!0}),q.forEach(I),h=C(f),N=_(f,"DIV",{class:!0,"data-emoji":!0});var V=j(N);d=_(V,"INPUT",{type:!0,class:!0,name:!0}),V.forEach(I),O=C(f),f.forEach(I),this.h()},h(){r(l,"type","text"),r(l,"class","name svelte-h2e5th"),r(l,"name","name"),r(s,"class","inputWrapper svelte-h2e5th"),r(s,"data-emoji","👤"),r(e,"type","number"),r(e,"class","hp svelte-h2e5th"),r(e,"name","hp"),r(n,"class","inputWrapper svelte-h2e5th"),r(n,"data-emoji","❤️‍🩹"),r(v,"type","number"),r(v,"class","attack svelte-h2e5th"),r(v,"name","attack"),r(m,"class","inputWrapper svelte-h2e5th"),r(m,"data-emoji","⚔️"),r(g,"type","number"),r(g,"class","heal svelte-h2e5th"),r(g,"name","heal"),r(E,"class","inputWrapper svelte-h2e5th"),r(E,"data-emoji","💖"),r(d,"type","number"),r(d,"class","defense svelte-h2e5th"),r(d,"name","defense"),r(N,"class","inputWrapper svelte-h2e5th"),r(N,"data-emoji","🛡️"),r(a,"class","characterForm svelte-h2e5th")},m(S,f){A(S,a,f),o(a,s),o(s,l),P(l,t[15].id),o(a,i),o(a,n),o(n,e),P(e,t[15].hp),o(a,c),o(a,m),o(m,v),P(v,t[15].attack),o(a,w),o(a,E),o(E,g),P(g,t[15].heal),o(a,h),o(a,N),o(N,d),P(d,t[15].defense_attack),o(a,O),$||(u=[z(l,"input",T),z(e,"input",D),z(v,"input",W),z(g,"input",M),z(d,"input",B)],$=!0)},p(S,f){t=S,f&4&&l.value!==t[15].id&&P(l,t[15].id),f&4&&F(e.value)!==t[15].hp&&P(e,t[15].hp),f&4&&F(v.value)!==t[15].attack&&P(v,t[15].attack),f&4&&F(g.value)!==t[15].heal&&P(g,t[15].heal),f&4&&F(d.value)!==t[15].defense_attack&&P(d,t[15].defense_attack)},d(S){S&&I(a),$=!1,Z(u)}}}function pe(t){let a,s,l,i,n,e,c,m,v,w,E,g,h,N,d,O,$,u,T,D,W,M,B,S,f={};s=new fe({props:f}),t[7](s);let k=t[2].length>0&&X(t);return{c(){a=p("div"),ne(s.$$.fragment),l=U(),k&&k.c(),i=U(),n=p("div"),e=p("div"),c=p("button"),m=L("-"),v=U(),w=p("button"),E=L("+"),g=U(),h=p("div"),N=U(),d=p("button"),O=L("▶"),$=U(),u=p("input"),T=U(),D=p("pre"),W=L(t[1]),this.h()},l(b){a=_(b,"DIV",{id:!0,class:!0});var y=j(a);ae(s.$$.fragment,y),l=C(y),k&&k.l(y),i=C(y),n=_(y,"DIV",{id:!0,class:!0});var q=j(n);e=_(q,"DIV",{id:!0,class:!0});var V=j(e);c=_(V,"BUTTON",{class:!0});var J=j(c);m=R(J,"-"),J.forEach(I),v=C(V),w=_(V,"BUTTON",{class:!0});var G=j(w);E=R(G,"+"),G.forEach(I),g=C(V),h=_(V,"DIV",{style:!0}),j(h).forEach(I),N=C(V),d=_(V,"BUTTON",{class:!0});var Q=j(d);O=R(Q,"▶"),Q.forEach(I),$=C(V),u=_(V,"INPUT",{id:!0,type:!0,name:!0,class:!0}),V.forEach(I),T=C(q),D=_(q,"PRE",{id:!0,class:!0});var H=j(D);W=R(H,t[1]),H.forEach(I),q.forEach(I),y.forEach(I),this.h()},h(){r(c,"class","svelte-h2e5th"),r(w,"class","svelte-h2e5th"),le(h,"width","20px"),r(d,"class","svelte-h2e5th"),r(u,"id","iterations"),r(u,"type","number"),r(u,"name","iterations"),r(u,"class","svelte-h2e5th"),r(e,"id","buttonContainer"),r(e,"class","svelte-h2e5th"),r(D,"id","results"),r(D,"class","svelte-h2e5th"),r(n,"id","overlayContainer"),r(n,"class","svelte-h2e5th"),r(a,"id","mainContainer"),r(a,"class","svelte-h2e5th")},m(b,y){A(b,a,y),ie(s,a,null),o(a,l),k&&k.m(a,null),o(a,i),o(a,n),o(n,e),o(e,c),o(c,m),o(e,v),o(e,w),o(w,E),o(e,g),o(e,h),o(e,N),o(e,d),o(d,O),o(e,$),o(e,u),P(u,t[3]),o(n,T),o(n,D),o(D,W),M=!0,B||(S=[z(c,"click",t[5]),z(w,"click",t[4]),z(d,"click",t[6]),z(u,"input",t[13])],B=!0)},p(b,[y]){const q={};s.$set(q),b[2].length>0?k?k.p(b,y):(k=X(b),k.c(),k.m(a,i)):k&&(k.d(1),k=null),y&8&&F(u.value)!==b[3]&&P(u,b[3]),(!M||y&2)&&se(W,b[1])},i(b){M||(re(s.$$.fragment,b),M=!0)},o(b){oe(s.$$.fragment,b),M=!1},d(b){b&&I(a),t[7](null),ue(s),k&&k.d(),B=!1,Z(S)}}}async function _e(t,a,s){s=s||{},t.forEach(i=>i.wins=0),console.log("%cStarting simulation...","color:green; font-size:16px; font-weight: bold;");for(let i=0;i<a;i++){let n=JSON.parse(JSON.stringify(t)),e=Math.floor(Math.random()*t.length),c=`%cGame ${i+1}... ${t[e].id} starts, `;for(;;){if(n.every(h=>h.hp<=0)){c+="Tie!";break}if(n.filter(h=>h.hp>0).length===1){t[n.findIndex(h=>h.hp>0)].wins++,c+=`${n[n.findIndex(h=>h.hp>0)].id} wins!`;break}for(;n[e].hp<=0;)e=(e+1)%n.length;let m=n.filter(h=>h.hp>0&&h.id!==n[e].id),v=m[Math.floor(Math.random()*m.length)].id,w=n.findIndex(h=>h.id===v),E=0,g=0;n[e].heal>0&&m.length>1?(n[e].hp+=n[e].heal,E+=n[e].heal):(n[w].hp-=n[e].attack,n[e].hp-=n[w].defense_attack,E-=n[w].defense_attack,g-=n[e].attack),s.log_turns&&console.log(`${n[e].id} ${n[e].hp}(${E}) ⚔️ ${v} ${n[w].hp}(${g})`),e=(e+1)%n.length}s.log_games&&console.log(c,"font-weight: bold;")}let l=t.reduce((i,n)=>i.wins>n.wins?i:n).id;return console.log("%cResults...","color:green; font-size:16px; font-weight: bold;"),console.log(t.map(i=>`${i.id===l?"🏆":""}${i.id}:${i.wins}`).join(" | ")),t.map(i=>`${i.id===l?"🏆":""}${i.id}: ${i.wins}`).join(` 
 `)}function me(t,a,s){let l;function i(){l.launch(3,{color:"lightgreen",left:50,top:50,initialLeft:45,initialTop:100,size:30},{color:"red",left:50,top:50,initialLeft:50,initialTop:100,delay:.25},{color:"yellow",left:50,top:40,initialLeft:55,initialTop:100,delay:.5,size:60})}let n="Press  ▶  to simulate",e=[];he(()=>{m(),m(),m()});let c=1e5;async function m(){let D=(await(await fetch("https://randomuser.me/api/")).json()).results[0].name.first;s(2,e=[...e,{id:D,hp:50,attack:9,heal:0,defense_attack:1,wins:0}])}function v(){e.length>1&&s(2,e=e.slice(0,-1))}async function w(){let u=e.map(D=>D.id);if([...new Set(u)].length!==e.length||u.includes("")){alert("All character names must be unique and not blank.");return}s(1,n="Simulating..."),setTimeout(async()=>{s(1,n=await _e(e,c,{log_turns:!1,log_games:!1})),i()},0)}function E(u){de[u?"unshift":"push"](()=>{l=u,s(0,l)})}function g(u,T){u[T].id=this.value,s(2,e)}function h(u,T){u[T].hp=F(this.value),s(2,e)}function N(u,T){u[T].attack=F(this.value),s(2,e)}function d(u,T){u[T].heal=F(this.value),s(2,e)}function O(u,T){u[T].defense_attack=F(this.value),s(2,e)}function $(){c=F(this.value),s(3,c)}return[l,n,e,c,m,v,w,E,g,h,N,d,O,$]}class ke extends x{constructor(a){super(),ee(this,a,me,pe,te,{})}}export{ke as component};
