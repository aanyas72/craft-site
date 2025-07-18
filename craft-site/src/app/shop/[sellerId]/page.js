"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Header from "../../components/Header";
import { useUser } from '../../context/UserContext';

export default function SellerShopPage() {
  const { sellerId } = useParams();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sellerId) return;
    const fetchSellerAndProducts = async () => {
      // Fetch seller profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", sellerId)
        .single();
      if (!profileError) setSeller(profile);

      // Fetch seller's products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });
      if (!productsError) setProducts(productsData || []);
      setLoading(false);
    };
    fetchSellerAndProducts();
  }, [sellerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading seller's shop...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mb-6">
          <h1 className="text-2xl font-bold mb-2 text-center text-[#5a3c20]">
            {seller ? `${seller.email}'s Shop` : "Seller's Shop"}
          </h1>
          {user && user.id === sellerId && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded text-center font-semibold">
              This is your shop page. You can manage your products in <a href="/my-shop" className="underline text-green-900">My Shop</a>.
            </div>
          )}
        </div>
        <div className="w-full max-w-2xl">
          {products.length === 0 ? (
            <div className="text-center text-gray-600">No products found for this seller.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded shadow">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded mb-2" />
                  )}
                  <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                  <p className="text-gray-700 mb-1">{product.description}</p>
                  <p className="text-gray-900 font-bold mb-1">${product.price}</p>
                  <p className="text-xs text-gray-500">Category: {product.category}</p>
                  {product.video_url && (
                    <div className="mt-2">
                      <video 
                        controls 
                        className="w-full h-48 object-cover rounded"
                        preload="metadata"
                      >
                        <source src={product.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 