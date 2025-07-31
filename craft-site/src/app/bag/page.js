"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { useUser } from "../../context/UserContext";

const cartItems = [
  {
    id: 1,
    name: "Handmade Silver Ring",
    price: "$45.00",
    image: "/placeholder-product1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Ceramic Vase",
    price: "$60.00",
    image: "/placeholder-product2.jpg",
    quantity: 2,
  },
];

export default function BagPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?from=bag");
    }
  }, [user, loading, router]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
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
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#5a3c20]">
            Shopping Bag
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Your bag is empty</p>
              <button
                onClick={() => router.push("/shop-now")}
                className="mt-4 bg-[#8B5C2A] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#6B3F16] transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Items ({cartItems.length})
                  </h2>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => (e.target.src = "/handmaking.jpeg")}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-[#8B5C2A] font-bold">{item.price}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Order Summary
                  </h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total:</span>
                      <span>${(calculateTotal() + 5).toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#8B5C2A] text-white py-3 rounded font-semibold shadow hover:bg-[#6B3F16] transition">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
