"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const videos = [
  {
    id: 1,
    src: "/placeholder-video.mp4",
    creator: "Creator 1",
    craft: "Making Jewelry",
  },
  {
    id: 2,
    src: "/placeholder-video.mp4",
    creator: "Creator 2",
    craft: "Pottery",
  },
  {
    id: 3,
    src: "/placeholder-video.mp4",
    creator: "Creator 3",
    craft: "Knitting",
  },
  {
    id: 4,
    src: "/placeholder-video.mp4",
    creator: "Creator 4",
    craft: "Woodwork",
  },
  {
    id: 5,
    src: "/placeholder-video.mp4",
    creator: "Creator 5",
    craft: "Glass Blowing",
  },
  {
    id: 6,
    src: "/placeholder-video.mp4",
    creator: "Creator 6",
    craft: "Leather Craft",
  },
  {
    id: 7,
    src: "/placeholder-video.mp4",
    creator: "Creator 7",
    craft: "Painting",
  },
  {
    id: 8,
    src: "/placeholder-video.mp4",
    creator: "Creator 8",
    craft: "Basket Weaving",
  },
];

export default function FeaturedVideoCarousel() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">
          Featured Video Stories
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 32 },
          }}
          className="!pb-8"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
                <video
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 w-full">
                  <div className="font-semibold text-lg text-gray-800">
                    {video.creator}
                  </div>
                  <div className="text-sm text-gray-600">{video.craft}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
