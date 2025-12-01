"use client";

import { useEffect, useRef } from "react";
import ServiceCard from "./service-card";

const servicesData = [
  {
    id: 1,
    title: "Conveyor Cleaning & Maintenance",
    description:
      "We offer advanced conveyor cleaning and maintenance services that help extend equipment lifespan and maintain safe, efficient operations. From belt scrapers to alignment and debris removal, our approach ensures your conveyors run smoothly without unnecessary downtime.",
    image: "/card-1.jpg",
  },
  {
    id: 2,
    title: "Factory Maintenance",
    description:
      "We provide comprehensive preventive and corrective maintenance services to ensure your factory equipment operates at peak performance. Our technicians handle everything from routine inspections and part replacements to emergency breakdown repairs.",
    image: "/card-2.jpg",
  },
  {
    id: 3,
    title: "Line Operations Support",
    description:
      "Our team provides skilled operators and technical support personnel to help manage and optimize your production lines. We ensure consistent output, adherence to quality standards, and maximum operational efficiency.",
    image: "/card-3.jpg",
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === titleRef.current) {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.classList.remove("opacity-0");
          } else {
            const cards = entry.target.querySelectorAll(".service-card");
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-slideUp");
                card.classList.remove("opacity-0");
              }, index * 100);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4 text-center">
            Our Core Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg text-center">
            Reliable solutions that keep your production running efficiently.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mt-16"
        >
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
