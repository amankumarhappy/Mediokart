const CACHE_NAME = 'mediokart-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon-16x16.png',
  '/Logo.png',
  '/MEDIOBOTFLOAT.png'
];

// Install service worker and cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Network-first strategy with cache fallback
self.addEventListener('fetch', event => {
  // Only cache GET requests with http/https scheme
  if (
    event.request.method === 'GET' &&
    (event.request.url.startsWith('http://') || event.request.url.startsWith('https://'))
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
