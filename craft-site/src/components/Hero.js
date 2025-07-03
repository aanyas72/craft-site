import React from "react";

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover will-change-transform"
        style={{
          backgroundImage: 'url("/handmaking.jpeg")',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Authentic Handmade Goods, Crafted with Care
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow-lg">
            Discover creators and watch their stories come to life
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-[#F5E9DD] transition">Browse Makers</button>
            <button className="bg-[#8B5C2A] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#6B3F16] transition">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
} 