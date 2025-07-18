"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Header from "../../components/Header";
import { useUser } from '../../context/UserContext';

export default function ProfilePage() {
  const { user, loading, isSeller, isSellerLoading, refreshSellerStatus } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Clear all session and local storage
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
    }
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">Profile</h1>
          <div className="mb-6">
            <p className="text-lg mb-2">Welcome back!</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
} 