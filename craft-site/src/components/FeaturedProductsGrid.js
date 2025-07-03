import React from "react";

const products = [
  {
    id: 1,
    name: "Handmade Silver Ring",
    price: "$45.00",
    image: "/placeholder-product1.jpg",
  },
  {
    id: 2,
    name: "Ceramic Vase",
    price: "$60.00",
    image: "/placeholder-product2.jpg",
  },
  {
    id: 3,
    name: "Knitted Scarf",
    price: "$30.00",
    image: "/placeholder-product3.jpg",
  },
  {
    id: 4,
    name: "Wooden Bowl",
    price: "$38.00",
    image: "/placeholder-product4.jpg",
  },
];

export default function FeaturedProductsGrid() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5a3c20]">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="font-semibold text-lg mb-1 text-center">{product.name}</div>
              <div className="text-[#8B5C2A] font-bold text-md">{product.price}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-[#8B5C2A] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#6B3F16] transition">See all products</button>
        </div>
      </div>
    </section>
  );
} 