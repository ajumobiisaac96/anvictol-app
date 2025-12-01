"use client";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center animate-fadeOut">
      {/* Horizontal loading bar */}
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden shadow-md">
        <div className="h-full bg-gradient-to-r from-[#0A1F44] via-[#F4A300] to-[#0A1F44] animate-loading-bar rounded-full"></div>
      </div>
    </div>
  );
}
