const assets = [
  '/',
  '/information',
  '/chart',
  '/dist/bundle.js',
  '/manifest.json',
  '/favicon.ico',
];
const ficache = 'ficalculator-static-v1';

self.addEventListener('install', (event) => {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open(ficache).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => {
        return key !== ficache;
      }).map((keys) => {
        return caches.delete();
      }));
    });
  );

  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
