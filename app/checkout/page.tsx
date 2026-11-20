"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRef, useState } from "react";
interface FD { name: string; email: string; phone: string; address: string; city: string; pc: string; }
export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [fd, setFd] = useState<FD>({ name: "", email: "", phone: "", address: "", city: "", pc: "" });
  const [loading, setLoading] = useState(false);
  const checkoutRequestId = useRef<string | null>(null);
  if (items.length === 0) return (<div className="min-h-screen bg-gray-50 py-12"><nav className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center"><Link href="/" className="flex items-center gap-2"><span className="text-2xl font-bold text-pink-600">ZarStyle</span></Link><Link href="/" className="text-gray-600 hover:text-pink-600">← Beranda</Link></div></nav><div className="max-w-xl mx-auto px-4 text-center py-20"><div className="text-gray-300 text-6xl mb-4">🛒</div><h2 className="text-xl font-semibold text-gray-900 mb-2">Keranjang kosong</h2><p className="text-gray-500 mb-6">Tambah produk dulu.</p><Link href="/" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">Mulai Belanja</Link></div></div>);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ id, quantity }) => ({ id, quantity })),
          requestId: (checkoutRequestId.current ??= crypto.randomUUID()),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Gagal membuat sesi pembayaran");
        setLoading(false);
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
      setLoading(false);
    }
  };
  return (<div className="min-h-screen bg-gray-50 py-12"><nav className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center"><Link href="/" className="flex items-center gap-2"><span className="text-2xl font-bold text-pink-600">ZarStyle</span></Link><Link href="/cart" className="text-gray-600 hover:text-pink-600">← Keranjang</Link></div></nav><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="bg-white p-6 rounded-xl border shadow-sm"><h2 className="text-lg font-bold text-gray-900 mb-6">Detail Pengiriman</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label><input type="text" value={fd.name} onChange={(e) => setFd({ ...fd, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={fd.email} onChange={(e) => setFd({ ...fd, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label><input type="tel" value={fd.phone} onChange={(e) => setFd({ ...fd, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label><textarea value={fd.address} onChange={(e) => setFd({ ...fd, address: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required /></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Kota</label><input type="text" value={fd.city} onChange={(e) => setFd({ ...fd, city: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label><input type="text" value={fd.pc} onChange={(e) => setFd({ ...fd, pc: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" required /></div></div><button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition mt-2 disabled:opacity-50">{loading ? "Memproses..." : "Pesan Sekarang dengan Stripe"}</button></form></div><div className="bg-white p-6 rounded-xl border shadow-sm"><h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan</h2><div className="space-y-4">{items.map((it: any) => (<div key={it.id} className="flex justify-between items-center border-b pb-2"><div><p className="text-sm font-medium text-gray-900">{it.name}</p><p className="text-xs text-gray-500">x{it.quantity}</p></div><span className="text-sm font-bold text-pink-600">Rp {(it.price*it.quantity).toLocaleString()}</span></div>))}</div><div className="pt-4 border-t flex justify-between text-lg font-bold"><span>Total</span><span className="text-pink-600">Rp {totalPrice.toLocaleString()}</span></div><div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600"><p className="mb-2">Pembayaran: Stripe (Kartu Kredit / Debit)</p><p>Anda akan diarahkan ke halaman Stripe untuk menyelesaikan pembayaran.</p></div></div></div></div></div>);
}
