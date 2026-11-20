import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-pink-600">ZarStyle</span>
            </div>
            <div className="hidden md:flex space-x-6 font-medium text-gray-600">
              <a href="#" className="hover:text-pink-600 transition">Pria</a>
              <a href="#" className="hover:text-pink-600 transition">Wanita</a>
              <a href="#" className="hover:text-pink-600 transition">Anak-Anak</a>
              <a href="#" className="hover:text-pink-600 transition">Sepatu</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
                Keranjang (0)
              </button>
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