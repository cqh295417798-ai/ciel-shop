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
      <div className="px-5 mb-12 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#A89060] mb-3">Collection</p>
        <h1 className="font-playfair text-4xl md:text-5xl font-light tracking-wide">All Crystals</h1>
      </div>

      {/* Filter pills */}
      {collections.length > 0 && (
        <div className="px-5 mb-12 flex flex-wrap gap-2 justify-center">
          <Link href="/collections"
            className="text-[10px] tracking-[0.2em] uppercase px-5 py-2 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-300">
            All
          </Link>
          {collections.map((col) => (
            <Link key={col.id} href={`/collections/${col.handle}`}
              className="text-[10px] tracking-[0.2em] uppercase px-5 py-2 border border-[#E8E4DF] text-[#8A8A8A] hover:border-[#A89060] hover:text-[#A89060] transition-all duration-300">
              {col.title}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="px-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {products.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <RevealOnScroll key={i}>
                <div>
                  <div className="aspect-[3/4] bg-[#F2EDE8] mb-4" />
                  <div className="h-3 w-2/3 bg-[#E8E4DF] mb-2" />
                  <div className="h-3 w-1/4 bg-[#E8E4DF]" />
                </div>
              </RevealOnScroll>
            ))
          : products.map((product, i) => (
              <RevealOnScroll key={product.id}>
                <Link href={`/products/${product.handle}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-[#F2EDE8] mb-4 relative">
                    {product.featuredImage ? (
                      <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title}
                        fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-[#F2EDE8]" />
                    )}
                  </div>
                  <p className="font-playfair text-sm font-light tracking-wide">{product.title}</p>
                  <p className="text-[#A89060] text-xs mt-1 tracking-wide">
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
