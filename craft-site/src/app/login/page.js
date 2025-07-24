"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { useUser } from '../../context/UserContext';
import { supabase } from "../../../lib/supabase";
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading, refreshUser } = useUser();
  const searchParams = useSearchParams();
  const fromBag = searchParams.get('from') === 'bag';
  const fromSell = searchParams.get('from') === 'sell';

  useEffect(() => {
    if (!loading && user) {
      router.push("/video-discovery");
    }
  }, [user, router, loading]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Supabase login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }
    // Refresh user state in context
    if (refreshUser) {
      await refreshUser();
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">Login</h1>
          {/* Banner for redirected from bag */}
          {fromBag && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded text-center font-semibold">
              You must login to checkout.
            </div>
          )}
          {/* Banner for redirected from sell */}
          {fromSell && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded text-center font-semibold">
              You must be logged in to start selling.
            </div>
          )}
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none placeholder-gray-600 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded focus:outline-none placeholder-gray-600 text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-[#8B5C2A] text-white py-2 rounded font-semibold hover:bg-[#6B3F16] transition">Login</button>
          <div className="mt-4 text-center">
            <a href="/signup" className="text-[#8B5C2A] hover:underline">Don't have an account? Sign up</a>
          </div>
        </form>
      </main>
    </div>
  );
} 