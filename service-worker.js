const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/app/immutable/entry/app.2f3f9c80.js",s+"/app/immutable/assets/0.f05bdba3.css",s+"/app/immutable/nodes/0.2c117ba7.js",s+"/app/immutable/nodes/1.521d26f3.js",s+"/app/immutable/assets/10.98fccc1f.css",s+"/app/immutable/nodes/10.4927c9e4.js",s+"/app/immutable/assets/11.08e64b70.css",s+"/app/immutable/nodes/11.c60ba58b.js",s+"/app/immutable/assets/12.789c6171.css",s+"/app/immutable/nodes/12.06d7be82.js",s+"/app/immutable/assets/2.0ffd49a5.css",s+"/app/immutable/nodes/2.3b3b5c3e.js",s+"/app/immutable/nodes/3.563b278b.js",s+"/app/immutable/nodes/4.2b70ba61.js",s+"/app/immutable/nodes/5.4aab6e93.js",s+"/app/immutable/assets/6.493b836e.css",s+"/app/immutable/nodes/6.556e2a9b.js",s+"/app/immutable/assets/7.f6a87da4.css",s+"/app/immutable/nodes/7.0847eb45.js",s+"/app/immutable/assets/8.66c3e924.css",s+"/app/immutable/nodes/8.817ab5b0.js",s+"/app/immutable/assets/9.186b6907.css",s+"/app/immutable/nodes/9.c5a1b3ec.js",s+"/app/immutable/assets/Fireworks.c8075173.css",s+"/app/immutable/chunks/Fireworks.9c9b7bf2.js",s+"/app/immutable/chunks/authStore.13647653.js",s+"/app/immutable/chunks/index.513dcc03.js",s+"/app/immutable/chunks/index.965e08d6.js",s+"/app/immutable/chunks/paths.73de431b.js",s+"/app/immutable/chunks/singletons.784df6f1.js",s+"/app/immutable/chunks/stores.37fc943a.js",s+"/app/immutable/entry/start.2fd01816.js"],u=[s+"/fonts/PoltawskiNowy.ttf",s+"/images/clear-icon.svg",s+"/images/copy-icon.svg",s+"/images/leaf.svg",s+"/images/moon.svg",s+"/images/pen-square.svg",s+"/images/pen-square_512.png",s+"/images/pen.svg",s+"/images/solar-system-animation.svg",s+"/images/sun.svg",s+"/manifest.json",s+"/markdown/test.md",s+"/markdown/the-seasons.md"],l="1713973058481",c=`cache-${l}`,p=[...o,...u];self.addEventListener("install",a=>{async function n(){await(await caches.open(c)).addAll(p)}a.waitUntil(n())});self.addEventListener("activate",a=>{async function n(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}a.waitUntil(n())});self.addEventListener("fetch",a=>{if(a.request.method!=="GET")return;async function n(){const t=new URL(a.request.url),i=await caches.open(c);if(p.includes(t.pathname)){const e=await i.match(t.pathname);if(e)return e}try{const e=await fetch(a.request);if(!(e instanceof Response))throw new Error("invalid response from fetch");return e.status===200&&i.put(a.request,e.clone()),e}catch(e){const m=await i.match(a.request);if(m)return m;throw e}}a.respondWith(n())});
