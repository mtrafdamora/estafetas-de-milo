// Milo PWA v25: recursos de la aplicación, no datos personales.
const CACHE_NAME = 'milo-pwa-v25-1';
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/milo-180.png", "./icons/milo-192.png", "./icons/milo-512.png", "./icons/milo-maskable-512.png", "./recursos/milo_maestro.webp", "./insignias/insignia_01.webp", "./insignias/insignia_02.webp", "./insignias/insignia_03.webp", "./insignias/insignia_04.webp", "./insignias/insignia_05.webp", "./insignias/insignia_06.webp", "./insignias/insignia_07.webp", "./insignias/insignia_08.webp", "./insignias/insignia_09.webp", "./insignias/insignia_10.webp", "./insignias/insignia_11.webp", "./insignias/insignia_12.webp", "./insignias/insignia_13.webp", "./insignias/insignia_14.webp", "./insignias/insignia_15.webp", "./insignias/insignia_16.webp", "./insignias/insignia_17.webp", "./insignias/insignia_18.webp", "./insignias/insignia_19.webp", "./insignias/insignia_20.webp", "./insignias/insignia_21.webp", "./insignias/insignia_22.webp", "./insignias/insignia_23.webp", "./insignias/insignia_24.webp", "./insignias/insignia_25.webp", "./insignias/insignia_26.webp", "./insignias/insignia_27.webp", "./insignias/insignia_28.webp", "./insignias/insignia_29.webp", "./insignias/insignia_30.webp"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('milo-pwa-') && k !== CACHE_NAME).map(k => caches.delete(k)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)).catch(() => {});
      }
      return response;
    }).catch(async () => (await caches.match('./index.html')) || Response.error()));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
    }
    return response;
  })));
});
