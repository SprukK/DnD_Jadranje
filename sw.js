// ☠ Gilded Kraken — Service Worker
// Caches the player app for offline use on the boat.
// Update CACHE_VERSION when you deploy a new version of the player file.

const CACHE_VERSION = 'gk-player-v4';
const CACHE_NAME = CACHE_VERSION;

// Everything the app needs to run offline
const PRECACHE_URLS = [
  './',
  './index.html',
  './gilded_kraken_player_v4.html',
  // Google Fonts — cached on first load, served from cache offline
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap',
];

// ── Install: pre-cache everything we can ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local files first (guaranteed to work)
      return cache.addAll(['./', './gilded_kraken_player_v4.html'])
        .then(() => {
          // Try to cache Google Fonts — fails gracefully if offline during install
          return cache.add(
            'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap'
          ).catch(() => {
            console.log('GK SW: Fonts not cached (no network during install — will cache on first online use)');
          });
        });
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old cache versions ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('GK SW: Deleting old cache', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for app files, network-first for fonts ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts: try network first (fresh), fall back to cache
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else: cache-first (works fully offline)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      // Not in cache — fetch and cache it
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
