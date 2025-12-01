// Service Worker for handling push notifications and background sync
const CACHE_NAME = "anvictol-v1";
const NOTIFICATION_TAG = "anvictol-notification";

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[v0] Service Worker installing");
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[v0] Service Worker activating");
  event.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    icon: "/logo.jpg",
    badge: "/logo.jpg",
    body: data.body || "Stay connected with Anvictol Integrated Services",
    tag: NOTIFICATION_TAG,
    requireInteraction: false,
    actions: [
      {
        action: "open",
        title: "Open Site",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Anvictol Services",
      options
    )
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});

// Background sync for offline functionality
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-notifications") {
    event.waitUntil(syncNotifications());
  }
});

async function syncNotifications() {
  console.log("[v0] Background sync triggered");
}

// Message handling for communication from client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
