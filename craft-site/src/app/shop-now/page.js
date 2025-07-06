"use client";
import React, { useState } from "react";
import Header from "../../components/Header";

const categories = [
  { name: "Jewelry", icon: "💍" },
  { name: "Ceramics", icon: "🏺" },
  { name: "Knitting", icon: "🧶" },
  { name: "Woodwork", icon: "🪵" },
  { name: "Leather Goods", icon: "👜" },
  { name: "Textiles", icon: "🧵" },
  { name: "Glass Art", icon: "🪟" },
  { name: "Metalwork", icon: "⚒️" },
  { name: "Paper Crafts", icon: "📄" },
  { name: "Candles", icon: "🕯️" },
  { name: "Soaps", icon: "🧼" },
  { name: "Pottery", icon: "🏺" },
  { name: "Basketry", icon: "🧺" },
  { name: "Quilting", icon: "🛏️" },
  { name: "Embroidery", icon: "🪡" },
];

const products = [
  {
    id: 1,
    name: "Handmade Silver Ring",
    price: "$45.00",
    image: "/placeholder-product1.jpg",
    category: "Jewelry",
  },
  {
    id: 2,
    name: "Ceramic Vase",
    price: "$60.00",
    image: "/placeholder-product2.jpg",
    category: "Ceramics",
  },
  {
    id: 3,
    name: "Knitted Scarf",
    price: "$30.00",
    image: "/placeholder-product3.jpg",
    category: "Knitting",
  },
  {
    id: 4,
    name: "Wooden Bowl",
    price: "$38.00",
    image: "/placeholder-product4.jpg",
    category: "Woodwork",
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: "$55.00",
    image: "/placeholder-product1.jpg",
    category: "Leather Goods",
  },
  {
    id: 6,
    name: "Handwoven Tapestry",
    price: "$120.00",
    image: "/placeholder-product2.jpg",
    category: "Textiles",
  },
  {
    id: 7,
    name: "Stained Glass Ornament",
    price: "$75.00",
    image: "/placeholder-product3.jpg",
    category: "Glass Art",
  },
  {
    id: 8,
    name: "Copper Wind Chime",
    price: "$85.00",
    image: "/placeholder-product4.jpg",
    category: "Metalwork",
  },
  {
    id: 9,
    name: "Handmade Journal",
    price: "$25.00",
    image: "/placeholder-product1.jpg",
    category: "Paper Crafts",
  },
  {
    id: 10,
    name: "Lavender Candle",
    price: "$18.00",
    image: "/placeholder-product2.jpg",
    category: "Candles",
  },
  {
    id: 11,
    name: "Natural Soap Bar",
    price: "$12.00",
    image: "/placeholder-product3.jpg",
    category: "Soaps",
  },
  {
    id: 12,
    name: "Stoneware Mug",
    price: "$28.00",
    image: "/placeholder-product4.jpg",
    category: "Pottery",
  },
];

export default function ShopNow() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center space-x-2 text-[#8B5C2A] font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Categories</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'block' : 'hidden'} 
          lg:block lg:w-64 lg:flex-shrink-0 
          bg-white border-r border-gray-200
          lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto
        `}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#5a3c20] mb-6 lg:mb-8">Categories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#F5E9DD] transition-colors duration-200 flex items-center space-x-3 group"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-gray-700 group-hover:text-[#8B5C2A]">
                    {category.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="py-8 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#5a3c20] mb-2">Recommended for You</h1>
                <p className="text-gray-600">Curated products based on your preferences and purchase history</p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={e => e.target.src = '/handmaking.jpeg'}
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</div>
                      <div className="text-[#8B5C2A] font-bold text-lg mb-3">{product.price}</div>
                      <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="flex justify-center mt-12">
                <button className="bg-[#8B5C2A] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#6B3F16] transition-colors duration-200">
                  Load More Products
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
