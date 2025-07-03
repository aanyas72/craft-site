import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedVideoCarousel from "../components/FeaturedVideoCarousel";
import FeaturedProductsGrid from "../components/FeaturedProductsGrid";
import CategoriesFilters from "../components/CategoriesFilters";
import TestimonialsSocialProof from "../components/TestimonialsSocialProof";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <FeaturedVideoCarousel />
        <FeaturedProductsGrid />
        <CategoriesFilters />
        <TestimonialsSocialProof />
      </main>
      {/* TODO: Footer */}
      <Footer />
    </div>
  );
}
