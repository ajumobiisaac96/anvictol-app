"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/2347065810784"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl z-40 animate-slideUp hover:rotate-12 active:scale-95"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7 text-white" />
    </Link>
  );
}
