"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

const videos = [
  {
    id: 1,
    src: "/placeholder-video.mp4",
    creator: "Creator 1",
    craft: "Making Jewelry",
    description: "Watch the beautiful process of handcrafting silver jewelry."
  },
  {
    id: 2,
    src: "/placeholder-video.mp4",
    creator: "Creator 2",
    craft: "Pottery",
    description: "Discover the art of pottery making from clay to finished piece."
  },
  {
    id: 3,
    src: "/placeholder-video.mp4",
    creator: "Creator 3",
    craft: "Knitting",
    description: "Learn the intricate patterns of hand knitting."
  },
  {
    id: 4,
    src: "/placeholder-video.mp4",
    creator: "Creator 4",
    craft: "Woodwork",
    description: "See the transformation of raw wood into beautiful furniture."
  },
  {
    id: 5,
    src: "/placeholder-video.mp4",
    creator: "Creator 5",
    craft: "Glass Blowing",
    description: "Witness the mesmerizing art of glass blowing."
  },
  {
    id: 6,
    src: "/placeholder-video.mp4",
    creator: "Creator 6",
    craft: "Leather Craft",
    description: "Explore the traditional craft of leather working."
  }
];

export default function VideoDiscoveryPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

//   useEffect(() => {
    // Check if user is signed in
    // const userData = localStorage.getItem("user");
    // if (userData) {
    //   setUser(JSON.parse(userData));
    // } else {
    //   // Redirect to login if not signed in
    //   router.push("/login");
    //   return;
    // }
//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col bg-gray-50">
//         <Header />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">Loading...</div>
//         </main>
//       </div>
//     );
//   }

//   if (!user) {
//     return null; // Will redirect to login
//   }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#5a3c20]">Video Discovery</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <video
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="font-semibold text-lg text-gray-800 mb-2">{video.creator}</div>
                  <div className="text-sm text-gray-600 mb-3">{video.craft}</div>
                  <p className="text-gray-700">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 