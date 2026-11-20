import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-pink-600">ZarStyle</span>
          </Link>
        </div>
      </nav>
      <div className="max-w-xl mx-auto px-4 text-center py-20 bg-white rounded-xl border shadow-sm">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
        <p className="text-gray-500 mb-6">Terima kasih telah berbelanja di ZarStyle.</p>
        <Link href="/" className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition font-semibold">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}