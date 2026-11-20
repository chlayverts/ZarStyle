import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition">
        <div className="h-48 bg-gray-100 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <span className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
            {product.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-pink-600">Rp {product.price.toLocaleString()}</span>
          </div>
          <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition text-sm font-medium">
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </Link>
  );
}