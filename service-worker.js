const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/app/immutable/entry/app.5a541d2a.js",s+"/app/immutable/assets/0.8806c214.css",s+"/app/immutable/nodes/0.03c7267d.js",s+"/app/immutable/nodes/1.88c66159.js",s+"/app/immutable/assets/10.08e64b70.css",s+"/app/immutable/nodes/10.def43947.js",s+"/app/immutable/assets/11.789c6171.css",s+"/app/immutable/nodes/11.51b99f26.js",s+"/app/immutable/assets/2.9e6d6b38.css",s+"/app/immutable/nodes/2.385b746e.js",s+"/app/immutable/nodes/3.ce87f1ec.js",s+"/app/immutable/nodes/4.1c5e8725.js",s+"/app/immutable/nodes/5.3856337d.js",s+"/app/immutable/assets/6.a003a65c.css",s+"/app/immutable/nodes/6.5784c602.js",s+"/app/immutable/assets/7.66c3e924.css",s+"/app/immutable/nodes/7.726bf9c0.js",s+"/app/immutable/assets/8.8a817676.css",s+"/app/immutable/nodes/8.ed3fd99f.js",s+"/app/immutable/assets/9.98fccc1f.css",s+"/app/immutable/nodes/9.7a333273.js",s+"/app/immutable/assets/Fireworks.c8075173.css",s+"/app/immutable/chunks/Fireworks.dd749715.js",s+"/app/immutable/chunks/authStore.478422a7.js",s+"/app/immutable/chunks/index.38a6999c.js",s+"/app/immutable/chunks/index.5b11db5e.js",s+"/app/immutable/chunks/paths.37cd2c9e.js",s+"/app/immutable/chunks/singletons.4c46f0f7.js",s+"/app/immutable/chunks/stores.5190fa50.js",s+"/app/immutable/entry/start.38a3dd86.js"],u=[s+"/fonts/PoltawskiNowy.ttf",s+"/images/feathers_512.png",s+"/images/leaf.svg",s+"/images/moon.svg",s+"/images/pen-square.svg",s+"/images/pen.svg",s+"/images/solar-system-animation.svg",s+"/images/sun.svg",s+"/manifest.json",s+"/markdown/test.md",s+"/markdown/the-seasons.md"],l="1711648028045",c=`cache-${l}`,p=[...o,...u];self.addEventListener("install",e=>{async function n(){await(await caches.open(c)).addAll(p)}e.waitUntil(n())});self.addEventListener("activate",e=>{async function n(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}e.waitUntil(n())});self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;async function n(){const t=new URL(e.request.url),i=await caches.open(c);if(p.includes(t.pathname)){const a=await i.match(t.pathname);if(a)return a}try{const a=await fetch(e.request);if(!(a instanceof Response))throw new Error("invalid response from fetch");return a.status===200&&i.put(e.request,a.clone()),a}catch(a){const m=await i.match(e.request);if(m)return m;throw a}}e.respondWith(n())});
