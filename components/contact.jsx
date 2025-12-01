"use client";

import { useState, useRef, useEffect } from "react";
import ContactForm from "./contact-form";
import SuccessModal from "./success-modal";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    if (contactRef.current) {
      contactRef.current.classList.add("animate-slideUp");
    }
  }, []);

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0A1F44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contactRef}
          className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        >
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Let's Keep Your Operations Running Smoothly
            </h2>
            <p className="text-gray-200 text-base mb-6 max-w-xl">
              From preventive maintenance to conveyor cleaning and full line
              operations — our experts are ready to support your factory's
              needs.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-white text-base flex items-center gap-2">
                <span className="inline-block align-middle">
                  <svg
                    className="w-5 h-5 text-[#F4A300] mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.26 1.155 2.427 2.1 3.372a6.5 6.5 0 003.372 2.1l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.59a7.5 7.5 0 01-7.41-8.412A6.5 6.5 0 012 3z" />
                  </svg>
                </span>
                Call Us:{" "}
                <span className="font-medium text-gray-200">
                  +2347065810784
                </span>
              </p>
              <p className="text-white text-base flex items-center gap-2">
                <span className="inline-block align-middle">
                  <svg
                    className="w-5 h-5 text-[#F4A300] mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                Email Us:{" "}
                <span className="font-medium text-gray-200">
                  faithawe11@gmail.com
                </span>
              </p>
              <p className="text-white text-base flex items-center gap-2">
                <span className="inline-block align-middle">
                  <svg
                    className="w-5 h-5 text-[#F4A300] mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Have a question? Fill out the quick form below, we'll respond
                within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div>
            {showSuccess ? (
              <SuccessModal onClose={() => setShowSuccess(false)} />
            ) : (
              <ContactForm onSuccess={() => setShowSuccess(true)} />
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <div className="text-center">
            <p className="text-white font-semibold text-lg mb-2">
              Looking for a reliable maintenance partner?
            </p>
            <p className="text-gray-300 mb-6">
              Let's build efficiency together.
            </p>
            <button
              onClick={() => toast({ title: "Feature coming soon" })}
              className="inline-block bg-[#F4A300] text-[#0A1F44] font-bold px-5 py-2 rounded-full shadow-md hover:opacity-95 transition"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
