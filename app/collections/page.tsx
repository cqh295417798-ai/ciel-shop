import { getProducts, getCollections } from "@/lib/shopify";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const [products, collections] = await Promise.all([
    getProducts(24).catch(() => []),
    getCollections().catch(() => []),
  ]);

  return (
    <div className="pt-48 pb-24 min-h-screen">
      {/* Header */}
      <div className="px-6 mb-12 border-b border-[#E5E5E5] pb-8">
        <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-40 uppercase mb-3">
          Archive — All Objects
        </p>
        <h1 className="text-3xl md:text-4xl tracking-[0.3em] font-extralight uppercase">
          Crystal Collection
        </h1>
      </div>

      {/* Filter */}
      {collections.length > 0 && (
        <div className="px-6 mb-10 flex flex-wrap gap-2">
          <Link href="/collections"
            className="font-mono-ciel text-[9px] tracking-[0.3em] uppercase border border-[#1A1A1A] px-4 py-2 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-300">
            ALL
          </Link>
          {collections.map((col) => (
            <Link key={col.id} href={`/collections/${col.handle}`}
              className="font-mono-ciel text-[9px] tracking-[0.3em] uppercase border border-[#E5E5E5] px-4 py-2 hover:border-[#1A1A1A] transition-all duration-300 opacity-60 hover:opacity-100">
              {col.title.toUpperCase()}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="px-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {products.length === 0
          ? Array.from({ length: 8 }).map((_, i) => (
              <RevealOnScroll key={i} delay={i * 50}>
                <ProductCardSkeleton />
              </RevealOnScroll>
            ))
          : products.map((product, i) => (
              <RevealOnScroll key={product.id} delay={(i % 4) * 60}>
                <ProductCard product={product} index={i} />
              </RevealOnScroll>
            ))}
      </div>
    </div>
  );
}
