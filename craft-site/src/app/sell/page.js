"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Header from "../../components/Header";
import { useUser } from '../../context/UserContext';

export default function SellPage() {
  const { user, loading, isSeller, isSellerLoading, refreshSellerStatus } = useUser();
  const [upgrading, setUpgrading] = useState(false);
  const router = useRouter();

  const handleUpgradeToSeller = async () => {
    if (!user) return;
    
    setUpgrading(true);
    try {
      // First check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected for new users
        console.error('Error checking profile:', checkError);
        alert('Failed to check profile. Please try again.');
        return;
      }

      let result;
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update({ 
            is_seller: true, 
            updated_at: new Date() 
          })
          .eq('id', user.id);
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            is_seller: true,
            created_at: new Date(),
            updated_at: new Date()
          });
      }

      if (result.error) {
        console.error('Error upgrading to seller:', result.error);
        alert('Failed to upgrade to seller account. Please try again.');
      } else {
        // Refresh global seller status in context
        if (refreshSellerStatus) {
          await refreshSellerStatus();
        }
        alert('Congratulations! Your account has been upgraded to a seller account.');
      }
    } catch (error) {
      console.error('Error upgrading to seller:', error);
      alert('Failed to upgrade to seller account. Please try again.');
    } finally {
      setUpgrading(false);
    }
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
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6 text-[#5a3c20]">Start Creating Today</h1>
          
          {isSeller ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-2">You're Already a Seller!</h2>
                <p className="text-green-700">Your account is set up to sell on our platform.</p>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => router.push('/shop-now')}
                  className="w-full bg-[#8B5C2A] text-white py-3 rounded-lg font-semibold hover:bg-[#6B3F16] transition"
                >
                  View Your Shop
                </button>
                <button 
                  onClick={() => router.push('/profile')}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Manage Your Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-gray-600">
                  Ready to share your handmade creations with the world?<br />
                  Start selling today!<br />
                  <span className="text-sm text-gray-500">
                    (No fees, no commissions, no hidden costs)
                  </span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Seller Benefits:</h3>
                  <ul className="text-blue-700 text-left space-y-2">
                    <li>• Create your own shop page</li>
                    <li>• Upload and manage your products</li>
                    <li>• Connect with customers worldwide</li>
                    <li>• Track your sales and analytics</li>
                    <li>• Access to seller tools and resources</li>
                  </ul>
                </div>
                <button 
                  onClick={handleUpgradeToSeller}
                  disabled={upgrading}
                  className="w-full bg-[#8B5C2A] text-white py-4 rounded-lg font-semibold hover:bg-[#6B3F16] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {upgrading ? 'Upgrading...' : 'Become a Seller'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
