/* Offline-Speicher für die Scan-App (GitHub Pages) */
const CACHE = 'zeiterfassung-v1';
const DATEIEN = ['./zeiterfassung.html'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(DATEIEN)).catch(()=>{})); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x))))); self.clients.claim(); });
// Netz zuerst (immer neueste Version), ohne Netz aus dem Speicher
self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r=>{ const k = r.clone(); caches.open(CACHE).then(c=>c.put(e.request, k)); return r; })
    .catch(()=> caches.match(e.request, {ignoreSearch:true})));
});
