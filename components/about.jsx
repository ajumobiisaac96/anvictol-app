"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === imageRef.current) {
            entry.target.classList.add("animate-slideInLeft");
            entry.target.classList.remove("opacity-0");
          } else if (entry.target === contentRef.current) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.classList.remove("opacity-0");
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen bg-white relative overflow-hidden"
    >
      <div className="w-full h-full flex flex-col md:flex-row items-stretch">
        {/* Left Image - ensure visible with min height */}
        <div className="hidden md:flex flex-1 h-screen relative">
          <div
            ref={imageRef}
            className="absolute left-0 top-0 h-screen w-full bg-center bg-cover"
            style={{
              backgroundImage: `url('/about-image.jpg')`,
              clipPath: "ellipse(80% 100% at 0% 50%)",
              WebkitClipPath: "ellipse(80% 100% at 0% 50%)",
            }}
          />
        </div>

        {/* Right Content - vertical padding, center aligned */}
        <div className="flex-1 max-w-2xl pr-8 ml-auto flex items-center">
          <div ref={contentRef} className="w-full py-20 md:py-28 px-6 md:px-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-6 text-balance">
              At Anvictol Integrated Services, we specialize in factory
              maintenance, line operations, and conveyor cleaning
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Our expertise ensures your operations stay efficient, safe, and
              productive. We help industries maintain peak performance while
              adhering to the highest safety and quality standards.
            </p>
            <button className="px-8 py-3 bg-[#0A1F44] text-white rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
