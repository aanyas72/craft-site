"use client";
import React from "react";
import Header from "../../components/Header";

// Mock data for products with video and seller info
const mockProducts = [
  {
    id: 1,
    name: "Handcrafted Silver Ring",
    description: "A beautiful handmade silver ring, crafted with care.",
    price: 45.00,
    category: "Jewelry",
    image_url: "/handmaking.jpeg",
    video_url: "/placeholder-video.mp4",
    seller: {
      email: "seller1@example.com",
      shop_name: "SilverWorks",
      shop_description: "Unique handcrafted silver jewelry from local artisans."
    }
  },
  {
    id: 2,
    name: "Ceramic Vase",
    description: "Elegant ceramic vase, perfect for home decor.",
    price: 60.00,
    category: "Ceramics",
    image_url: "/placeholder-product2.jpg",
    video_url: "/placeholder-video.mp4",
    seller: {
      email: "potter@example.com",
      shop_name: "Clay Creations",
      shop_description: "Hand-thrown pottery and ceramics."
    }
  }
];

export default function VideoDiscoveryPage() {
  const product = mockProducts[0];
  const seller = product.seller;
  const loading = false;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Video Player (Left) */}
          <div className="md:w-2/3 w-full bg-black flex items-center justify-center">
            {loading ? (
              <div className="text-white text-center w-full py-32">Loading video...</div>
            ) : product && product.video_url ? (
              <video
                src={product.video_url}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-[60vh] object-contain bg-black"
              />
            ) : (
              <div className="text-white text-center w-full py-32">No video found.</div>
            )}
          </div>
          {/* Details (Right) */}
          <div className="md:w-1/3 w-full p-8 flex flex-col justify-center">
            {loading ? (
              <div className="text-gray-500">Loading details...</div>
            ) : product ? (
              <>
                <h2 className="text-2xl font-bold mb-2 text-[#5a3c20]">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Category: {product.category}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800">Price: ${product.price} </span>
                </div>
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
                )}
                <hr className="my-4" />
                <div>
                  <div className="font-semibold text-lg text-gray-800 mb-1">Seller Info</div>
                  {seller ? (
                    <>
                      <div className="text-gray-700 mb-1">Email: {seller.email}</div>
                      {seller.shop_name && <div className="text-gray-700 mb-1">Shop: {seller.shop_name}</div>}
                      {seller.shop_description && <div className="text-gray-600 text-sm mb-1">{seller.shop_description}</div>}
                    </>
                  ) : (
                    <div className="text-gray-500">Seller info not found.</div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-gray-500">No product details found.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 