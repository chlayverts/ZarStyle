"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartButtonProps {
  onClick?: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { totalItems } = useCart();

  const className = "relative inline-flex items-center gap-2 bg-[#292923] px-4 py-2 text-sm text-white transition-colors hover:bg-[#514a40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a7254]";
  const contents = (
    <>
      <ShoppingCart size={17} aria-hidden="true" />
      <span className="hidden sm:inline">Keranjang</span>
      {totalItems > 0 && <span aria-label={`${totalItems} produk`} className="grid size-5 place-items-center rounded-full bg-[#9a7254] text-[10px] tabular-nums text-white">{totalItems}</span>}
    </>
  );

  if (onClick) {
    return <button type="button" onClick={onClick} aria-label={`Buka keranjang${totalItems > 0 ? `, ${totalItems} produk` : ""}`} className={className}>{contents}</button>;
  }

  return <Link href="/cart" aria-label={`Lihat keranjang${totalItems > 0 ? `, ${totalItems} produk` : ""}`} className={className} prefetch={false}>{contents}</Link>;
}
