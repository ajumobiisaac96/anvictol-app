"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fadeInUp");
    }

    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="w-full h-screen pt-20 relative overflow-hidden flex items-center bg-gradient-to-br from-[#0A1F44] via-[#1a3a5e] to-[#0d1b2a]"
    >
      {/* Mobile: background image + overlay, Desktop: two columns */}
      <div className="w-full h-full flex flex-col md:flex-row items-center relative">
        {/* Mobile background image and overlay */}
        <div className="absolute inset-0 w-full h-full md:hidden">
          <div
            ref={imageContainerRef}
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('/hero-image.jpg')`,
              clipPath: "ellipse(70% 55% at 50% 40%)",
              WebkitClipPath: "ellipse(70% 55% at 50% 40%)",
            }}
          />
          <div className="absolute inset-0 w-full h-full bg-[#0A1F44E5]" />
        </div>
        {/* Left Content - always left aligned */}
        <div className="flex-1 flex items-center justify-start max-w-2xl pl-4 md:pl-8 z-10">
          <div ref={heroRef} className="animate-fadeInUp">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance max-w-lg md:max-w-xl">
              Keeping Industries Running, Safely and Efficiently
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-lg md:max-w-xl line-clamp-3">
              Expert maintenance, line operations, and conveyor cleaning for
              sustainable factory performance.
            </p>
            <Link href="#services">
              <button className="px-8 py-3 bg-white text-[#0A1F44] rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
        {/* Desktop Right Image */}
        <div className="flex-1 h-full relative hidden md:block">
          <div
            ref={imageContainerRef}
            className="absolute right-0 top-0 h-full w-full bg-center bg-cover"
            style={{
              backgroundImage: `url('/hero-image.jpg')`,
              clipPath: "ellipse(95% 100% at 100% 50%)",
              WebkitClipPath: "ellipse(95% 100% at 100% 50%)",
            }}
          />
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
