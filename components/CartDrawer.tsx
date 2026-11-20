"use client";

import { useCart } from "@/context/CartContext";
import { X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            <ShoppingCart size={20} className="mr-2 text-pink-600" />
            Keranjang Belanja
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-gray-300 text-4xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">Keranjang masih kosong</p>
              <button
                onClick={onClose}
                className="mt-4 text-pink-600 font-medium hover:underline"
              >
                Lanjutkan Belanja
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-pink-600 font-bold mt-1">
                        Rp {item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6">
          {items.length > 0 && (
            <>
              <div className="flex justify-between mb-4 text-gray-900 font-medium">
                <span>Total ({totalItems} item)</span>
                <span className="font-bold text-pink-600">
                  Rp {totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={clearCart}
                className="w-full py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition mb-3"
              >
                Kosongkan Keranjang
              </button>
              <button
                onClick={() => { window.location.href = "/checkout"; }}
                className="w-full py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
              >
                Lanjutkan Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}