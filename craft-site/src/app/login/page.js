"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Fake login: set user in localStorage
    localStorage.setItem("user", JSON.stringify({ email }));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">Login</h1>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none placeholder-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border rounded focus:outline-none placeholder-gray-600"
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