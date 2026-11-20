"use client";

import ProductCard from "@/components/ProductCard";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/lib/products";
import { ArrowDown, ArrowRight, Instagram, Menu, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "Wanita", label: "Silhouettes for her", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=85", href: "#koleksi" },
  { name: "Pria", label: "Modern essentials", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&auto=format&fit=crop&q=85", href: "#koleksi" },
  { name: "Sepatu", label: "Made to move", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&auto=format&fit=crop&q=85", href: "#koleksi" },
];

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1e1e1b]">
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <div className="bg-[#292923] px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
        Complimentary shipping on orders over Rp 1.500.000 <span className="mx-2 text-white/40">·</span> Discover the new collection
      </div>
      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-[#f8f7f4]/95 backdrop-blur-md">
        <nav aria-label="Navigasi utama" className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <button aria-label="Buka menu" className="flex items-center gap-2 text-sm md:hidden"><Menu size={20} /><span className="sr-only">Menu</span></button>
          <div className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.16em] md:flex">
            <a href="#kategori" className="transition hover:text-[#9a7254]">Wanita</a>
            <a href="#kategori" className="transition hover:text-[#9a7254]">Pria</a>
            <a href="#koleksi" className="transition hover:text-[#9a7254]">Koleksi</a>
          </div>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-[27px] tracking-[0.11em] sm:text-[30px]">ZARSTYLE</Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#tentang" className="hidden text-[11px] font-medium uppercase tracking-[0.16em] transition hover:text-[#9a7254] sm:block">Cerita Kami</a>
            <CartButton onClick={() => setCartOpen(true)} />
          </div>
        </nav>
      </header>

      <main>
        <section className="relative isolate min-h-[600px] overflow-hidden bg-[#38352e] sm:min-h-[680px] lg:min-h-[min(760px,78vw)]">
          <div className="absolute inset-0 -z-10 bg-cover bg-[center_38%]" style={{ backgroundImage: "linear-gradient(90deg, rgba(22,22,19,.57) 0%, rgba(22,22,19,.21) 54%, rgba(22,22,19,.03) 100%), url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=2200&auto=format&fit=crop&q=90')" }} />
          <div className="mx-auto flex min-h-[600px] max-w-[1440px] items-center px-6 py-20 sm:min-h-[680px] sm:px-10 lg:min-h-[min(760px,78vw)] lg:px-20">
            <div className="max-w-xl text-white">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs">Koleksi musim terbaru · 2025</p>
              <h1 className="font-serif text-[58px] leading-[.98] tracking-[-0.045em] sm:text-7xl lg:text-[92px]">Berpakaian<br /><em className="font-normal">dengan rasa.</em></h1>
              <p className="mt-7 max-w-sm text-sm leading-7 text-white/80 sm:text-base">Potongan yang tenang. Material yang terasa istimewa. Gaya yang menjadi milikmu.</p>
              <a href="#koleksi" className="mt-9 inline-flex items-center gap-4 border border-white/70 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#1e1e1b]">Jelajahi koleksi <ArrowRight size={15} /></a>
            </div>
          </div>
          <a href="#kategori" aria-label="Lihat kategori" className="absolute bottom-8 right-8 hidden items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/80 md:flex">Scroll untuk menjelajah <ArrowDown size={14} /></a>
          <span className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.22em] text-white/70">01 — 03</span>
        </section>

        <section id="kategori" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
          <div className="mb-9 flex items-end justify-between sm:mb-12">
            <div><p className="eyebrow">Temukan gayamu</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Dibuat untuk setiap hari</h2></div>
            <a href="#koleksi" className="hidden items-center gap-2 pb-1 text-xs uppercase tracking-[0.13em] text-[#675d51] sm:flex">Lihat semua <ArrowRight size={14} /></a>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {categories.map((category, index) => (
              <Link key={category.name} href={category.href} className={`category-tile group relative block overflow-hidden bg-[#e4dfd7] ${index === 1 ? "sm:mt-10" : ""}`}>
                <div className="aspect-[.82] overflow-hidden sm:aspect-[.78]"><div className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-[1.04]" role="img" aria-label={`Koleksi ${category.name}`} style={{ backgroundImage: `linear-gradient(0deg, rgba(15,15,13,.43), transparent 55%), url('${category.image}')` }} /></div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-7"><div><p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/75">{category.label}</p><h3 className="font-serif text-3xl">{category.name}</h3></div><span className="grid size-10 place-items-center rounded-full border border-white/70 transition group-hover:bg-white group-hover:text-black"><MoveUpRight size={16} /></span></div>
              </Link>
            ))}
          </div>
        </section>

        <section id="koleksi" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="mb-10 flex items-end justify-between sm:mb-14"><div><p className="eyebrow">Dikurasi untukmu</p><h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Pilihan istimewa</h2></div><a href="#koleksi" className="flex items-center gap-2 pb-1 text-[10px] uppercase tracking-[0.16em] transition hover:text-[#9a7254]">Semua produk <ArrowRight size={14} /></a></div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
              {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>
          </div>
        </section>

        <section id="tentang" className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-14">
          <div className="aspect-[1.08] overflow-hidden bg-[#e7e1d8]"><div className="h-full w-full bg-cover bg-center" role="img" aria-label="Detail material dan proses berkualitas ZarStyle" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1300&auto=format&fit=crop&q=85')" }} /></div>
          <div className="max-w-lg py-4"><p className="eyebrow">Lebih dari sekadar pakaian</p><h2 className="mt-5 font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl">Keindahan ada pada hal yang sederhana.</h2><p className="mt-6 text-sm leading-7 text-[#6e6a62]">Kami percaya gaya terbaik tidak perlu berteriak. ZarStyle menghadirkan pilihan yang dibuat dengan perhatian pada detail, nyaman dikenakan, dan tetap relevan dari musim ke musim.</p><a href="#koleksi" className="mt-8 inline-flex items-center gap-3 border-b border-[#292923] pb-2 text-[10px] font-medium uppercase tracking-[0.18em]">Kenali ZarStyle <ArrowRight size={14} /></a></div>
        </section>

        <section className="bg-[#eae6df] px-5 py-16 text-center sm:py-20"><p className="eyebrow">Ikuti kisah kami</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Gaya sehari-hari, lebih bermakna.</h2><a href="#kategori" className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em]"><Instagram size={15} /> @zarstyle <ArrowRight size={14} /></a></section>
      </main>
      <footer className="bg-[#292923] px-5 py-10 text-white sm:px-8 lg:px-14"><div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left"><Link href="/" className="font-serif text-2xl tracking-[0.12em]">ZARSTYLE</Link><p className="text-[10px] uppercase tracking-[0.16em] text-white/60">Dibuat untuk menemani harimu · © 2025 ZarStyle</p><a href="#" className="text-[10px] uppercase tracking-[0.16em] text-white/70 transition hover:text-white">Kebijakan & Bantuan</a></div></footer>
    </div>
  );
}
