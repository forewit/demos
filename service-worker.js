const s=location.pathname.split("/").slice(0,-1).join("/"),o=[s+"/app/immutable/entry/app.19430a50.js",s+"/app/immutable/assets/0.f05bdba3.css",s+"/app/immutable/nodes/0.4c458de5.js",s+"/app/immutable/nodes/1.7655e557.js",s+"/app/immutable/assets/10.98fccc1f.css",s+"/app/immutable/nodes/10.00127391.js",s+"/app/immutable/assets/11.8b3d67ec.css",s+"/app/immutable/nodes/11.6c4e77f7.js",s+"/app/immutable/assets/12.aad2ac10.css",s+"/app/immutable/nodes/12.39c7c42c.js",s+"/app/immutable/assets/13.789c6171.css",s+"/app/immutable/nodes/13.5bbce7f2.js",s+"/app/immutable/assets/2.b6e8cff1.css",s+"/app/immutable/nodes/2.06aec2a6.js",s+"/app/immutable/nodes/3.57334410.js",s+"/app/immutable/nodes/4.f6efdd99.js",s+"/app/immutable/nodes/5.6766f5cc.js",s+"/app/immutable/assets/6.493b836e.css",s+"/app/immutable/nodes/6.c271f9f2.js",s+"/app/immutable/assets/7.f6a87da4.css",s+"/app/immutable/nodes/7.b5b05fca.js",s+"/app/immutable/assets/8.66c3e924.css",s+"/app/immutable/nodes/8.55bdc2b6.js",s+"/app/immutable/assets/9.893b6632.css",s+"/app/immutable/nodes/9.873a9929.js",s+"/app/immutable/assets/Fireworks.c8075173.css",s+"/app/immutable/chunks/Fireworks.dae54fb6.js",s+"/app/immutable/chunks/authStore.6d02c68c.js",s+"/app/immutable/chunks/index.10c26882.js",s+"/app/immutable/chunks/index.a7b0db33.js",s+"/app/immutable/chunks/paths.f9589b27.js",s+"/app/immutable/chunks/singletons.2667b067.js",s+"/app/immutable/chunks/stores.6d82f320.js",s+"/app/immutable/entry/start.d79d2b51.js"],l=[s+"/fonts/PoltawskiNowy.ttf",s+"/images/clear-icon.svg",s+"/images/close-icon.svg",s+"/images/copy-icon.svg",s+"/images/down-icon.svg",s+"/images/leaf.svg",s+"/images/moon.svg",s+"/images/pen-square.svg",s+"/images/pen-square_512.png",s+"/images/pen.svg",s+"/images/settings-icon.svg",s+"/images/solar-system-animation.svg",s+"/images/sun.svg",s+"/images/svg/cancel.svg",s+"/images/svg/down-triangle.svg",s+"/images/svg/left-triangle.svg",s+"/images/svg/plus.svg",s+"/images/svg/right-triangle.svg",s+"/images/svg/up-triangle.svg",s+"/images/up-icon.svg",s+"/manifest.json",s+"/markdown/test.md",s+"/markdown/the-seasons.md"],u="1715977629698",c=`cache-${u}`,p=[...o,...l];self.addEventListener("install",a=>{async function i(){await(await caches.open(c)).addAll(p)}a.waitUntil(i())});self.addEventListener("activate",a=>{async function i(){for(const t of await caches.keys())t!==c&&await caches.delete(t)}a.waitUntil(i())});self.addEventListener("fetch",a=>{if(a.request.method!=="GET")return;async function i(){const t=new URL(a.request.url),n=await caches.open(c);if(p.includes(t.pathname)){const e=await n.match(t.pathname);if(e)return e}try{const e=await fetch(a.request);if(!(e instanceof Response))throw new Error("invalid response from fetch");return e.status===200&&n.put(a.request,e.clone()),e}catch(e){const m=await n.match(a.request);if(m)return m;throw e}}a.respondWith(i())});
