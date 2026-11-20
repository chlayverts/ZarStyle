"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartButtonProps {
  onClick?: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      onClick={onClick}
      className="relative"
      prefetch={false}
    >
      <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition flex items-center gap-2">
        <ShoppingCart size={18} />
        <span>Keranjang</span>
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </Link>
  );
}