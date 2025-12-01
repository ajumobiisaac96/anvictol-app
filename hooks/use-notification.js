"use client";

import { useCallback } from "react";

export function useNotification() {
  const requestNotificationPermission = useCallback(async () => {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
      console.log("[v0] This browser does not support notifications");
      return false;
    }

    // Check if permission already granted
    if (Notification.permission === "granted") {
      showWelcomeNotification();
      return true;
    }

    // Request permission if not denied
    if (Notification.permission !== "denied") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          showWelcomeNotification();
          // Register service worker for background notifications
          if ("serviceWorker" in navigator) {
            try {
              await navigator.serviceWorker.register("/sw.js");
              console.log(
                "[v0] Service Worker registered for push notifications"
              );
            } catch (error) {
              console.log("[v0] Service Worker registration failed:", error);
            }
          }
          return true;
        }
      } catch (error) {
        console.error("[v0] Notification permission error:", error);
        return false;
      }
    }
    return false;
  }, []);

  return { requestNotificationPermission };
}

function showWelcomeNotification() {
  if (Notification.permission === "granted") {
    new Notification("Welcome to Anvictol!", {
      icon: "/logo.jpg",
      badge: "/logo.jpg",
      body: "Stay updated with our industrial maintenance services and special offers.",
      tag: "welcome-notification",
      requireInteraction: false,
      actions: [
        {
          action: "open",
          title: "Learn More",
        },
      ],
    });

    // Handle notification click
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.action === "notification-click") {
          window.focus();
        }
      });
    }
  }
}
