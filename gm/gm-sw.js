const CACHE='kraken-gm-v5';
const CORE=['./','./gilded_kraken_gm_v5.html','./gm.webmanifest','./gm-icon-192.png','./gm-icon-512.png','./gm-icon-180.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(hit=>hit||fetch(e.request).then(resp=>{
      const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy).catch(()=>{}));return resp;
    }).catch(()=>caches.match('./gilded_kraken_gm_v5.html')))
  );
});
