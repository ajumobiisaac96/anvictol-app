"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-12">
          <div className="flex flex-col">
            <div className="mb-6 flex items-start">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.jpg"
                  alt="Anvictol Logo"
                  fill
                  sizes="64px"
                  className="object-contain rounded"
                  priority
                />
              </div>
              <div className="ml-2">
                <h3 className="font-bold text-[#0A1F44] text-sm">Anvictol</h3>
                <p className="text-[#0A1F44] text-xs">
                  Integrated Services Ltd
                </p>
              </div>
            </div>
            <p className="text-[#0A1F44] text-sm leading-relaxed max-w-xs mb-6">
              We help industries minimize downtime through expert maintenance,
              conveyor cleaning, and efficient line operations. Our focus is
              reliability, safety, and performance.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#0A1F44] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.26 1.155 2.427 2.1 3.372a6.5 6.5 0 003.372 2.1l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.59a7.5 7.5 0 01-7.41-8.412A6.5 6.5 0 012 3z" />
                </svg>
                <p className="text-[#0A1F44] text-sm">
                  <span className="font-semibold">Call Us:</span> +2347065810784
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#0A1F44] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="text-[#0A1F44] text-sm">
                  <span className="font-semibold">Email Us:</span>{" "}
                  faithawe11@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#0A1F44] mb-4 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Projects", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-[#0A1F44] text-sm hover:text-opacity-70 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0A1F44] mb-4 text-base">
              Our Services
            </h4>
            <ul className="space-y-2">
              {[
                "Factory Maintenance",
                "Conveyor Cleaning",
                "Line Operations Support",
                "Equipment Repairs",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="#"
                    className="text-[#0A1F44] text-sm hover:text-opacity-70 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#0A1F44] mb-4 text-base">
              Follow Us
            </h4>
            <p className="text-[#0A1F44] text-sm">
              LinkedIn | Facebook | Instagram
            </p>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-300">
          <p className="text-[#0A1F44] text-sm">
            &copy; {currentYear} Anvictol Integrated Services. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
