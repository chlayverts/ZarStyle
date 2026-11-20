"use client";

import ProductCard from "@/components/ProductCard";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/lib/products";
import { useState } from "react";

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-pink-600 cursor-pointer hover:text-pink-700 transition">
                ZarStyle
              </span>
            </div>
            <div className="hidden md:flex space-x-6 font-medium text-gray-600">
              <a href="#" className="hover:text-pink-600 transition">Pria</a>
              <a href="#" className="hover:text-pink-600 transition">Wanita</a>
              <a href="#" className="hover:text-pink-600 transition">Anak-Anak</a>
              <a href="#" className="hover:text-pink-600 transition">Sepatu</a>
            </div>
            <div className="flex items-center gap-4">
              <CartButton onClick={() => setCartOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Koleksi Terbaru</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}