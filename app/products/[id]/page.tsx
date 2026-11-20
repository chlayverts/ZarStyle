import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-pink-600">ZarStyle</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
                Keranjang (0)
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-pink-600 mb-6"
        >
          ← Kembali ke Beranda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-pink-600 text-xs font-medium uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="mt-4">
                <span className="text-3xl font-bold text-pink-600">
                  Rp {product.price.toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">
                Produk berkualitas tinggi dari koleksi terbaru ZarStyle. Cocok untuk berbagai aktivitas harian dengan gaya yang modern dan nyaman.
              </p>
            </div>
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ukuran yang Tersedia</h3>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-pink-600 hover:text-pink-600 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-pink-600 text-white py-4 rounded-xl hover:bg-pink-700 transition text-lg font-semibold">
                Tambah ke Keranjang
              </button>
              <button className="flex-1 px-8 py-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-semibold">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}