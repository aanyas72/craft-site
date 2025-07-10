"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { supabase } from "../../../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If user is already signed in, redirect to profile
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        router.push("/profile");
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Supabase signup
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }
    // Show success message
    if (data.user && !data.user.confirmed_at) {
      setSuccess("Signup successful! Please check your email to confirm your account.");
    } else {
      setSuccess("Signup successful! Redirecting to your profile...");
      setTimeout(() => {
        setUser(data.user);
        router.push("/profile");
      }, 2000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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

  if (user) {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">Sign Up</h1>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
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
          <button type="submit" className="w-full bg-[#8B5C2A] text-white py-2 rounded font-semibold hover:bg-[#6B3F16] transition">Sign Up</button>
          <div className="mt-4 text-center">
            <a href="/login" className="text-[#8B5C2A] hover:underline">Already have an account? Login</a>
          </div>
        </form>
      </main>
    </div>
  );
} 