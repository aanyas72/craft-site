"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiShoppingBag, FiPackage } from "react-icons/fi";
import { supabase } from "../../lib/supabase";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // Listen for Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (isMounted) {
        setUser(session?.user || null);
        if (session?.user) {
          // Check if user is a seller
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_seller')
            .eq('id', session.user.id)
            .single();
          
          if (isMounted && profile) {
            setIsSeller(profile.is_seller);
          }
        } else {
          setIsSeller(false);
        }
      }
    });
    // Set initial user
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (isMounted) {
        setUser(user);
        if (user) {
          // Check if user is a seller
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_seller')
            .eq('id', user.id)
            .single();
          
          if (isMounted && profile) {
            setIsSeller(profile.is_seller);
          }
        }
      }
      if (isMounted) setLoading(false);
    });
    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="w-full bg-[#ffffff] text-[#2d1c10] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-3 pt-3">
        {/* Logo */}
        <div className="font-bold text-2xl tracking-tight hover:cursor-pointer" onClick={() => router.push('/')}>Logo</div>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search handmade goods or makers..."
            className="w-full max-w-md px-4 py-2 border border-[#cfc8c2] rounded-full focus:outline-none focus:ring-2 focus:ring-[#cfc8c2] text-[#2d1c10] placeholder-[#cfc8c2]"
          />
        </div>
        {/* User Menu */}
        <nav className="flex items-center gap-4">
          {loading ? null : user ? (
            // Profile Icon (if logged in)
            <button aria-label="Profile" className="p-2 hover:bg-[#ece7db] rounded-full transition" onClick={() => router.push('/profile')}>
              <FiUser className="w-6 h-6" strokeWidth={2} />
            </button>
          ) : (
            // Login Button (if not logged in)
            <button 
              className="px-4 py-2 bg-[#8B5C2A] text-white rounded-full font-semibold hover:bg-[#6B3F16] transition"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
          )}
          {/* Shop Icon (only for sellers) */}
          {isSeller && (
            <button aria-label="Shop" className="p-2 hover:bg-[#ece7db] rounded-full transition" onClick={() => router.push('/shop-now')}>
              <FiPackage className="w-6 h-6" strokeWidth={2} />
            </button>
          )}
          {/* Bag Icon (react-icons Feather) */}
          <button aria-label="Bag" className="p-2 hover:bg-[#ece7db] rounded-full transition" onClick={() => router.push('/bag')}>
            <FiShoppingBag className="w-6 h-6" strokeWidth={2} />
          </button>
        </nav>
      </div>
      {/* Video Discovery & Shop Now Tabs */}
      <div className="w-full border border-[#cfc8c2] bg-[#ffffff]">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 pb-3 pt-3">
          <button className="font-medium text-[#2d1c10] hover:text-[#bfa77a] transition" onClick={() => router.push('/video-discovery')}>Video Discovery</button>
          <button className="font-medium text-[#2d1c10] hover:text-[#bfa77a] transition" onClick={() => router.push('/shop-now')}>Shop Now</button>
          <button className="font-medium text-[#2d1c10] hover:text-[#bfa77a] transition" onClick={() => router.push('/sell')}>Sell</button>
        </div>
      </div>
    </header>
  );
} 