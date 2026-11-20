"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden bg-[#eeece8]">
        <Link href={`/products/${product.id}`} aria-label={`Lihat ${product.name}`} className="relative block aspect-[.76] overflow-hidden">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
        </Link>
        <span className="absolute left-3 top-3 bg-[#f8f7f4]/90 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.15em] text-[#514a40] sm:left-4 sm:top-4">{index < 2 ? "Pilihan Editor" : product.category}</span>
        <button type="button" aria-label={`Tambah ${product.name} ke keranjang`} onClick={() => addItem(product.id)} className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#f8f7f4] text-[#292923] transition hover:bg-[#292923] hover:text-white sm:bottom-4 sm:right-4 sm:size-11"><ShoppingBag size={16} /></button>
      </div>
      <div className="flex items-start justify-between gap-2 pt-4 sm:pt-5"><div className="min-w-0"><p className="mb-1.5 text-[9px] uppercase tracking-[0.17em] text-[#8b8378]">{product.category}</p><Link href={`/products/${product.id}`} className="line-clamp-2 font-serif text-base leading-snug transition hover:text-[#9a7254] sm:text-lg">{product.name}</Link></div><ArrowUpRight className="mt-1 shrink-0 text-[#958d82]" size={15} /></div>
      <p className="mt-2 text-xs text-[#514a40] sm:text-sm">Rp {product.price.toLocaleString("id-ID")}</p>
    </article>
  );
}
