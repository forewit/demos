const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/app/immutable/entry/app.4f036f8a.js",s+"/app/immutable/assets/0.f05bdba3.css",s+"/app/immutable/nodes/0.36871bcd.js",s+"/app/immutable/nodes/1.5a0d2ae6.js",s+"/app/immutable/assets/10.98fccc1f.css",s+"/app/immutable/nodes/10.793b4123.js",s+"/app/immutable/assets/11.8b3d67ec.css",s+"/app/immutable/nodes/11.a5c13ab2.js",s+"/app/immutable/assets/12.789c6171.css",s+"/app/immutable/nodes/12.fe52d443.js",s+"/app/immutable/assets/2.b6e8cff1.css",s+"/app/immutable/nodes/2.6e08ee01.js",s+"/app/immutable/nodes/3.e3ea81c5.js",s+"/app/immutable/nodes/4.f7d071b9.js",s+"/app/immutable/nodes/5.f0355407.js",s+"/app/immutable/assets/6.493b836e.css",s+"/app/immutable/nodes/6.266c853f.js",s+"/app/immutable/assets/7.f6a87da4.css",s+"/app/immutable/nodes/7.2f2c5d7e.js",s+"/app/immutable/assets/8.66c3e924.css",s+"/app/immutable/nodes/8.ae3edff1.js",s+"/app/immutable/assets/9.165c63bf.css",s+"/app/immutable/nodes/9.5a942ef8.js",s+"/app/immutable/assets/Fireworks.c8075173.css",s+"/app/immutable/chunks/Fireworks.26377ac4.js",s+"/app/immutable/chunks/authStore.1279f193.js",s+"/app/immutable/chunks/index.37c1c042.js",s+"/app/immutable/chunks/index.c2e617d6.js",s+"/app/immutable/chunks/paths.91db99cb.js",s+"/app/immutable/chunks/singletons.9dff3eb4.js",s+"/app/immutable/chunks/stores.f8d0845c.js",s+"/app/immutable/entry/start.d699e615.js"],u=[s+"/fonts/PoltawskiNowy.ttf",s+"/images/clear-icon.svg",s+"/images/copy-icon.svg",s+"/images/leaf.svg",s+"/images/moon.svg",s+"/images/pen-square.svg",s+"/images/pen-square_512.png",s+"/images/pen.svg",s+"/images/solar-system-animation.svg",s+"/images/sun.svg",s+"/manifest.json",s+"/markdown/test.md",s+"/markdown/the-seasons.md"],l="1715022406743",c=`cache-${l}`,p=[...o,...u];self.addEventListener("install",e=>{async function n(){await(await caches.open(c)).addAll(p)}e.waitUntil(n())});self.addEventListener("activate",e=>{async function n(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}e.waitUntil(n())});self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;async function n(){const t=new URL(e.request.url),i=await caches.open(c);if(p.includes(t.pathname)){const a=await i.match(t.pathname);if(a)return a}try{const a=await fetch(e.request);if(!(a instanceof Response))throw new Error("invalid response from fetch");return a.status===200&&i.put(e.request,a.clone()),a}catch(a){const m=await i.match(e.request);if(m)return m;throw a}}e.respondWith(n())});
