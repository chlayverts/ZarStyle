"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
export default function CartPage() {
  const { items } = useCart();
  return <div>Cart page: {items.length} items</div>;
}