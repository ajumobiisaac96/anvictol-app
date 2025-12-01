"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import PageLoader from "@/components/page-loader";
import ChatButton from "@/components/chat-button";
import { useNotification } from "@/hooks/use-notification";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { requestNotificationPermission } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const notificationTimer = setTimeout(() => {
        requestNotificationPermission();
      }, 1000);
      return () => clearTimeout(notificationTimer);
    }
  }, [isLoading, requestNotificationPermission]);

  return (
    <>
      {isLoading && <PageLoader />}

      <div
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Contact />
        <Footer />
      </div>

      {!isLoading && (
        <>
          <ChatButton />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}
