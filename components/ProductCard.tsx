import Link from "next/link";
import Image from "next/image";
import { ShopifyProduct } from "@/lib/shopify";

function toSKU(title: string, index: number): string {
  const prefix = title.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase();
  return `OBJ_${prefix}_Nº${String(index + 1).padStart(3, "0")}`;
}

export default function ProductCard({ product, index }: { product: ShopifyProduct; index: number }) {
  return (
    <Link href={`/products/${product.handle}`} className="product-card group block p-0">
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-[#F2EDE8] relative mb-3">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#F0EDEA] flex items-center justify-center">
            <span className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-20">NO IMAGE</span>
          </div>
        )}
      </div>

      {/* SKU */}
      <p className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-40 mb-1">
        {toSKU(product.title, index)}
      </p>

      {/* Title */}
      <p className="text-[11px] tracking-[0.15em] uppercase font-light leading-snug mb-1">
        {product.title}
      </p>

      {/* Price */}
      <p className="font-mono-ciel text-[10px] tracking-[0.2em] opacity-60">
        {product.priceRange.minVariantPrice.currencyCode}{" "}
        {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
      </p>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card p-0">
      <div className="aspect-[3/4] bg-[#F0EDEA] mb-3" />
      <div className="h-2 w-1/3 bg-[#E5E5E5] mb-2" />
      <div className="h-2 w-2/3 bg-[#E5E5E5] mb-2" />
      <div className="h-2 w-1/4 bg-[#E5E5E5]" />
    </div>
  );
}
