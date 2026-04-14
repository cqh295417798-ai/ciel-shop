import { getProducts, getCollections } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const [products, collections] = await Promise.all([
    getProducts(24).catch(() => []),
    getCollections().catch(() => []),
  ]);

  return (
    <div className="pt-28 pb-24 min-h-screen">
      {/* Header */}
      <div className="px-5 mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A8E8A] mb-2">Collection</p>
        <h1 className="font-playfair text-4xl md:text-5xl font-normal">All Crystals</h1>
      </div>

      {/* Filter pills */}
      {collections.length > 0 && (
        <div className="px-5 mb-10 flex flex-wrap gap-2 justify-center">
          <Link href="/collections" className="pill bg-[#2D2D2D] text-[#FDF6F0] text-[11px]">
            All
          </Link>
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.handle}`}
              className="pill border border-[#E8C5C1] text-[#9A8E8A] hover:border-[#2D2D2D] hover:text-[#2D2D2D] text-[11px]"
            >
              {col.title}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="px-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <RevealOnScroll key={i}>
                <div>
                  <div className={`aspect-[3/4] rounded-2xl mb-4 ${["bg-[#E8C5C1]/40","bg-[#D4C5E2]/40","bg-[#C5D8D1]/40"][i%3]}`} />
                  <div className="h-4 w-2/3 bg-[#E8C5C1]/40 rounded mb-2" />
                  <div className="h-3 w-1/3 bg-[#E8C5C1]/30 rounded" />
                </div>
              </RevealOnScroll>
            ))
          : products.map((product, i) => (
              <RevealOnScroll key={product.id}>
                <Link href={`/products/${product.handle}`} className="group block">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8C5C1]/20 mb-4 relative">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className={`w-full h-full ${["bg-[#E8C5C1]/40","bg-[#D4C5E2]/40","bg-[#C5D8D1]/40"][i%3]}`} />
                    )}
                  </div>
                  <p className="font-playfair text-base font-medium leading-snug">{product.title}</p>
                  <p className="text-sm text-[#C9A96E] mt-1">
                    {product.priceRange.minVariantPrice.currencyCode}{" "}
                    {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
      </div>
    </div>
  );
}
