import React from "react";

const categories = [
  { name: "Jewelry" },
  { name: "Ceramics" },
  { name: "Knitting" },
  { name: "Woodwork" },
];

export default function CategoriesFilters() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="px-6 py-3 bg-[#F5E9DD] text-[#8B5C2A] rounded-full font-semibold shadow hover:bg-[#E9D3C0] transition text-lg"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 