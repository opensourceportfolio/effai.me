const assets = [
  '/',
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
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== ficache) {
          return caches.delete(key);
        }

        return Promise.resolve();
      }));
    })
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
