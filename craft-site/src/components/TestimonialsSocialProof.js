import React from "react";

export default function TestimonialsSocialProof() {
  return (
    <section className="py-10 bg-[#F5E9DD]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">What Our Buyers Say</h2>
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-lg italic mb-4">“I love supporting makers here!”</p>
            <div className="font-semibold text-[#8B5C2A]">— Buyer Name</div>
          </div>
        </div>
      </div>
    </section>
  );
} 