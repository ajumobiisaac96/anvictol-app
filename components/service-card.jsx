"use client";

export default function ServiceCard({ service }) {
  return (
    <div className="service-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group h-full flex flex-col">
      <div
        className="w-full h-48 md:h-56 bg-center bg-cover"
        style={{
          backgroundImage: `url('${service.image}')`,
        }}
      />
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-[#0A1F44] mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {service.description}
        </p>
        <button className="px-6 py-2 bg-[#0A1F44] text-white rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95 w-fit mt-auto">
          Learn More
        </button>
      </div>
    </div>
  );
}
