import React from "react";
import { FiUser, FiShoppingBag } from "react-icons/fi";

export default function Header() {
  return (
    <header className="w-full bg-[#fcfbf7] text-[#2d1c10] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-3 pt-3">
        {/* Logo */}
        <div className="font-bold text-2xl tracking-tight">Logo</div>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search handmade goods or makers..."
            className="w-full max-w-md px-4 py-2 border border-[#e0d6c3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#bfa77a] bg-[#f9f6f1] text-[#2d1c10] placeholder-[#bfa77a]"
          />
        </div>
        {/* User Menu */}
        <nav className="flex items-center gap-4">
          {/* Profile Icon (react-icons Feather) */}
          <button aria-label="Profile" className="p-2 hover:bg-[#ece7db] rounded-full transition">
            <FiUser className="w-6 h-6" strokeWidth={2} />
          </button>
          {/* Bag Icon (react-icons Feather) */}
          <button aria-label="Bag" className="p-2 hover:bg-[#ece7db] rounded-full transition">
            <FiShoppingBag className="w-6 h-6" strokeWidth={2} />
          </button>
        </nav>
      </div>
      {/* Video Discovery & Shop Now Tabs */}
      <div className="w-full border-t border-[#e0d6c3] bg-[#fcfbf7]">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 pb-3 pt-3">
          <button className="font-medium text-[#2d1c10] hover:text-[#bfa77a] transition">Video Discovery</button>
          <button className="font-medium text-[#2d1c10] hover:text-[#bfa77a] transition">Shop Now</button>
        </div>
      </div>
    </header>
  );
} 