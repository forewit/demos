const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/app/immutable/entry/app.58d8baa3.js",s+"/app/immutable/assets/0.c50aaa28.css",s+"/app/immutable/nodes/0.938f5d68.js",s+"/app/immutable/nodes/1.138fa704.js",s+"/app/immutable/assets/10.08e64b70.css",s+"/app/immutable/nodes/10.def43947.js",s+"/app/immutable/assets/11.789c6171.css",s+"/app/immutable/nodes/11.51b99f26.js",s+"/app/immutable/assets/2.234832d2.css",s+"/app/immutable/nodes/2.380c11fc.js",s+"/app/immutable/nodes/3.ce87f1ec.js",s+"/app/immutable/nodes/4.1c5e8725.js",s+"/app/immutable/nodes/5.d29dfe9d.js",s+"/app/immutable/assets/6.a003a65c.css",s+"/app/immutable/nodes/6.eae9cefb.js",s+"/app/immutable/assets/7.66c3e924.css",s+"/app/immutable/nodes/7.726bf9c0.js",s+"/app/immutable/assets/8.8a817676.css",s+"/app/immutable/nodes/8.ed3fd99f.js",s+"/app/immutable/assets/9.98fccc1f.css",s+"/app/immutable/nodes/9.94c4d54a.js",s+"/app/immutable/assets/Fireworks.c8075173.css",s+"/app/immutable/chunks/Fireworks.dd749715.js",s+"/app/immutable/chunks/authStore.478422a7.js",s+"/app/immutable/chunks/index.38a6999c.js",s+"/app/immutable/chunks/index.5b11db5e.js",s+"/app/immutable/chunks/paths.71d5c769.js",s+"/app/immutable/chunks/singletons.43b4f3bb.js",s+"/app/immutable/chunks/stores.75c7b3d8.js",s+"/app/immutable/entry/start.a694325c.js"],u=[s+"/fonts/PoltawskiNowy.ttf",s+"/images/leaf.svg",s+"/images/moon.svg",s+"/images/pen-square.svg",s+"/images/pen-square_512.png",s+"/images/pen.svg",s+"/images/solar-system-animation.svg",s+"/images/sun.svg",s+"/manifest.json",s+"/markdown/test.md",s+"/markdown/the-seasons.md"],l="1711655670319",i=`cache-${l}`,p=[...o,...u];self.addEventListener("install",a=>{async function n(){await(await caches.open(i)).addAll(p)}a.waitUntil(n())});self.addEventListener("activate",a=>{async function n(){for(const t of await caches.keys())t!==i&&await caches.delete(t)}a.waitUntil(n())});self.addEventListener("fetch",a=>{if(a.request.method!=="GET")return;async function n(){const t=new URL(a.request.url),c=await caches.open(i);if(p.includes(t.pathname)){const e=await c.match(t.pathname);if(e)return e}try{const e=await fetch(a.request);if(!(e instanceof Response))throw new Error("invalid response from fetch");return e.status===200&&c.put(a.request,e.clone()),e}catch(e){const m=await c.match(a.request);if(m)return m;throw e}}a.respondWith(n())});
