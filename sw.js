const CACHE = 'socialhub-v1';
// Only cache the shell — don't cache Firebase/Agora calls
const STATIC = ['/social-hub/', '/social-hub/index.html'];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  // Network-first for API/Firebase calls, cache fallback for the shell
  if (e.request.url.includes('firestore') || 
      e.request.url.includes('firebase') ||
      e.request.url.includes('firebasestorage') ||
      e.request.url.includes('googleapis') ||
      e.request.url.includes('agora')) {
    return; // Let these go straight to network
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});