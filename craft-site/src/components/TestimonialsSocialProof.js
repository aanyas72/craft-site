import React from "react";

const testimonials = [
  {
    quote: "I love supporting makers here!",
    name: "— Buyer Name",
  },
  {
    quote: "The quality of handmade goods is unmatched.",
    name: "— Sarah L.",
  },
  {
    quote: "Fast shipping and beautiful packaging!",
    name: "— Mike D.",
  },
  {
    quote: "I found the perfect gift for my friend.",
    name: "— Priya S.",
  },
];

export default function TestimonialsSocialProof() {
  return (
    <section className="py-10 bg-[#F5E9DD]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">What Our Buyers Say</h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-8 justify-center flex-wrap">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 text-center flex-1 min-w-[250px] max-w-xs">
              <p className="text-lg italic mb-4 text-gray-800">{`"${t.quote}"`}</p>
              <div className="font-semibold text-[#8B5C2A]">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 