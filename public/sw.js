// Empty service worker to prevent 404 overhead in Next.js routing
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  return self.clients.claim();
});
