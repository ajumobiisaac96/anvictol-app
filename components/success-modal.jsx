"use client";

import { useEffect } from "react";

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full animate-scaleIn relative">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500 drop-shadow-lg"
            fill="none"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="#22c55e"
              strokeWidth="4"
              fill="#e7fbe7"
            />
            <path
              d="M20 34l10 10 14-18"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#0A1F44] mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-500 mb-8">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-[#22c55e] text-white rounded-lg font-bold shadow hover:bg-[#16a34a] transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
