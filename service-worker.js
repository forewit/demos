const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/app/immutable/entry/app.bbf280d8.js",s+"/app/immutable/assets/0.f05bdba3.css",s+"/app/immutable/nodes/0.d174d4cc.js",s+"/app/immutable/nodes/1.d647a160.js",s+"/app/immutable/assets/10.98fccc1f.css",s+"/app/immutable/nodes/10.36516933.js",s+"/app/immutable/assets/11.08e64b70.css",s+"/app/immutable/nodes/11.1f5ba9f8.js",s+"/app/immutable/assets/12.789c6171.css",s+"/app/immutable/nodes/12.c7e72535.js",s+"/app/immutable/assets/2.43088521.css",s+"/app/immutable/nodes/2.853c4998.js",s+"/app/immutable/nodes/3.46a82032.js",s+"/app/immutable/nodes/4.87fa1b95.js",s+"/app/immutable/nodes/5.cc5d0ad2.js",s+"/app/immutable/assets/6.493b836e.css",s+"/app/immutable/nodes/6.25fe441b.js",s+"/app/immutable/assets/7.f6a87da4.css",s+"/app/immutable/nodes/7.bf379f1e.js",s+"/app/immutable/assets/8.66c3e924.css",s+"/app/immutable/nodes/8.bab8d854.js",s+"/app/immutable/assets/9.165c63bf.css",s+"/app/immutable/nodes/9.da6c3ccb.js",s+"/app/immutable/assets/Fireworks.c8075173.css",s+"/app/immutable/chunks/Fireworks.ec6a0941.js",s+"/app/immutable/chunks/authStore.3fa3193b.js",s+"/app/immutable/chunks/index.7220d4ff.js",s+"/app/immutable/chunks/index.da2e7d86.js",s+"/app/immutable/chunks/paths.f52c6bc4.js",s+"/app/immutable/chunks/singletons.246e04f2.js",s+"/app/immutable/chunks/stores.17d591c7.js",s+"/app/immutable/entry/start.45f7a6c1.js"],u=[s+"/fonts/PoltawskiNowy.ttf",s+"/images/clear-icon.svg",s+"/images/copy-icon.svg",s+"/images/leaf.svg",s+"/images/moon.svg",s+"/images/pen-square.svg",s+"/images/pen-square_512.png",s+"/images/pen.svg",s+"/images/solar-system-animation.svg",s+"/images/sun.svg",s+"/manifest.json",s+"/markdown/test.md",s+"/markdown/the-seasons.md"],l="1715017295784",i=`cache-${l}`,p=[...o,...u];self.addEventListener("install",a=>{async function n(){await(await caches.open(i)).addAll(p)}a.waitUntil(n())});self.addEventListener("activate",a=>{async function n(){for(const t of await caches.keys())t!==i&&await caches.delete(t)}a.waitUntil(n())});self.addEventListener("fetch",a=>{if(a.request.method!=="GET")return;async function n(){const t=new URL(a.request.url),c=await caches.open(i);if(p.includes(t.pathname)){const e=await c.match(t.pathname);if(e)return e}try{const e=await fetch(a.request);if(!(e instanceof Response))throw new Error("invalid response from fetch");return e.status===200&&c.put(a.request,e.clone()),e}catch(e){const m=await c.match(a.request);if(m)return m;throw e}}a.respondWith(n())});
