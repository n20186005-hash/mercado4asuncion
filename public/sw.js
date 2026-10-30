/* Mercado 4 independent guide — offline service worker.
   Strategy: precache the app shell, network-first for navigations with an
   offline fallback, stale-while-revalidate for same-origin static assets.
   Cross-origin requests (Google Analytics, Google Maps) always go to the
   network so they keep working normally. */

const VERSION = 'mercado4-guide-2026-10-29';

const PRECACHE = ['/', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (['/'].includes(url.pathname) && response.status === 200) {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put(url.pathname, copy));
          }
          return response;
        })
        .catch(async () => (['/'].includes(url.pathname) && await caches.match(url.pathname)) || new Response('Page unavailable offline',{status:503,headers:{'X-Robots-Tag':'noindex'}}))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
