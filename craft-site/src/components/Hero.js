import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-[#FCFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-12">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#111827] leading-tight">
            Discover Unique <br /> Handmade <br /> Treasures
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#6B7280]">
            Support independent artisans and find one-of-a-kind pieces that tell
            a story.
            <br />
            Each handcrafted item represents hours of passion, skill, and
            creativity from talented makers around the world.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#B97A56] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#a06a48] transition">
              Start Shopping
            </button>
            <button className="text-[#111827] font-semibold px-4 py-2 hover:underline flex items-center gap-1">
              View Collections <span aria-hidden>→</span>
            </button>
          </div>
        </div>
        {/* Right: Staggered Image Collage */}
        <div className="flex-1 flex justify-center items-center relative min-h-[400px] max-w-[400px] w-full mt-12 md:mt-0">
          {/* Top Left */}
          <div className="absolute left-0 top-0 z-20 rounded-2xl shadow-lg overflow-hidden w-32 h-40 md:w-36 md:h-48">
            <Image
              src="/handmaking.jpeg"
              alt="Handmaking"
              width={200}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Top Right */}
          <div className="absolute right-0 top-4 z-10 rounded-2xl shadow-lg overflow-hidden w-28 h-36 md:w-32 md:h-40">
            <Image
              src="/window.svg"
              alt="Window"
              width={180}
              height={200}
              className="object-cover w-full h-full bg-white"
            />
          </div>
          {/* Center Left */}
          <div className="absolute left-4 top-32 z-30 rounded-2xl shadow-lg overflow-hidden w-28 h-28 md:w-32 md:h-32">
            <Image
              src="/globe.svg"
              alt="Globe"
              width={180}
              height={180}
              className="object-cover w-full h-full bg-white"
            />
          </div>
          {/* Center Right */}
          <div className="absolute right-2 top-44 z-20 rounded-2xl shadow-lg overflow-hidden w-32 h-40 md:w-36 md:h-48">
            <Image
              src="/file.svg"
              alt="File"
              width={200}
              height={250}
              className="object-cover w-full h-full bg-white"
            />
          </div>
          {/* Bottom Center */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-30 rounded-2xl shadow-lg overflow-hidden w-40 h-24 md:w-48 md:h-28">
            <Image
              src="/next.svg"
              alt="Next"
              width={250}
              height={120}
              className="object-cover w-full h-full bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
