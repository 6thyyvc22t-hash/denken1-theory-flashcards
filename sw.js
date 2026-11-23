const CACHE='denken1-theory-static-v1';
const SHELL=['./','./index.html','./styles.css','./app.js','./questions.json','./cloud-sync.js','./memo-sync.js','./images/den1-001-y-delta.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('denken1-theory-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
if(new URL(event.request.url).pathname.endsWith('/firebase-config.json'))return;
event.respondWith(fetch(event.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return res;}).catch(()=>caches.match(event.request).then(r=>r||Response.error())))});
