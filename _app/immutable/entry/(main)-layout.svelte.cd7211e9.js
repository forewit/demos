import{S as N,i as V,s as j,C as z,k as v,q as E,a as w,l as b,m as g,r as A,h as p,c as $,n as _,K as h,b as L,E as n,F as B,G as D,H as I,g as M,d as O,J as P}from"../chunks/index.fce9d48b.js";import{p as Q}from"../chunks/stores.162607d0.js";function R(o){let l,s,m,d,r,i,H,f,q,y,c,C,k,u;const S=o[2].default,t=z(S,o,o[1],null);return{c(){l=v("nav"),s=v("a"),m=E("Home"),d=w(),r=v("a"),i=E("trello"),H=w(),f=v("a"),q=E("board"),y=w(),c=v("a"),C=E("blog"),k=w(),t&&t.c(),this.h()},l(e){l=b(e,"NAV",{class:!0});var a=g(l);s=b(a,"A",{href:!0,class:!0});var F=g(s);m=A(F,"Home"),F.forEach(p),d=$(a),r=b(a,"A",{href:!0,class:!0});var G=g(r);i=A(G,"trello"),G.forEach(p),H=$(a),f=b(a,"A",{href:!0,class:!0});var J=g(f);q=A(J,"board"),J.forEach(p),y=$(a),c=b(a,"A",{href:!0,class:!0});var K=g(c);C=A(K,"blog"),K.forEach(p),a.forEach(p),k=$(e),t&&t.l(e),this.h()},h(){_(s,"href","/"),_(s,"class","svelte-87wlnk"),h(s,"selected",o[0].url.pathname==="/"),_(r,"href","/trello"),_(r,"class","svelte-87wlnk"),h(r,"selected",o[0].url.pathname==="/trello"),_(f,"href","/board"),_(f,"class","svelte-87wlnk"),h(f,"selected",o[0].url.pathname==="/board"),_(c,"href","/blog"),_(c,"class","svelte-87wlnk"),h(c,"selected",o[0].url.pathname==="/blog"),_(l,"class","svelte-87wlnk")},m(e,a){L(e,l,a),n(l,s),n(s,m),n(l,d),n(l,r),n(r,i),n(l,H),n(l,f),n(f,q),n(l,y),n(l,c),n(c,C),L(e,k,a),t&&t.m(e,a),u=!0},p(e,[a]){(!u||a&1)&&h(s,"selected",e[0].url.pathname==="/"),(!u||a&1)&&h(r,"selected",e[0].url.pathname==="/trello"),(!u||a&1)&&h(f,"selected",e[0].url.pathname==="/board"),(!u||a&1)&&h(c,"selected",e[0].url.pathname==="/blog"),t&&t.p&&(!u||a&2)&&B(t,S,e,e[1],u?I(S,e[1],a,null):D(e[1]),null)},i(e){u||(M(t,e),u=!0)},o(e){O(t,e),u=!1},d(e){e&&p(l),e&&p(k),t&&t.d(e)}}}function T(o,l,s){let m;P(o,Q,i=>s(0,m=i));let{$$slots:d={},$$scope:r}=l;return o.$$set=i=>{"$$scope"in i&&s(1,r=i.$$scope)},[m,r,d]}class X extends N{constructor(l){super(),V(this,l,T,R,j,{})}}export{X as default};