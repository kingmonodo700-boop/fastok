// Nom de la version (tu peux changer le chiffre v1 en v2, v3... lors de grosses mises à jour)
const CACHE_NAME = 'fasotok-cache-v2';

// 1. Installation immédiate sans attendre
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. Prise de contrôle immédiate de toutes les pages ouvertes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Supprime les anciennes versions
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Réseau en priorité pour les fichiers de l'application, cache en secours hors ligne.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request).then((response) => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request).then(cached => cached || Response.error()))
  );
});
