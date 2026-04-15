import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const MARQUEE = [
  "ETHICALLY SOURCED",
  "FREE SHIPPING $50+",
  "30-DAY RETURNS",
  "HANDCRAFTED",
  "GENUINE GEMSTONES",
];

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(8).catch(() => []),
    getCollections().catch(() => []),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#FAFAF8] flex items-end">
        {/* Video placeholder */}
        <div className="absolute inset-0 bg-[#F0EDEA]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-20 uppercase">
              Video · Placeholder
            </span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="relative z-10 w-full px-6 pb-12 md:pb-20">
          <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-40 uppercase mb-3">
            SS 2025 — Crystal Archive
          </p>
          <h2 className="text-[clamp(2.5rem,10vw,6rem)] tracking-[0.15em] font-extralight uppercase leading-none mb-6">
            Wear Your<br />Energy
          </h2>
          <Link href="/collections"
            className="inline-block border border-[#1A1A1A] font-mono-ciel text-[9px] tracking-[0.4em] uppercase px-6 py-3 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-500">
            EXPLORE ARCHIVE →
          </Link>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="border-y border-[#E5E5E5] py-3 overflow-hidden bg-[#FAFAF8]">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-40 uppercase px-8 whitespace-nowrap">
              {t} <span className="mx-4 opacity-30">—</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Products ── */}
      <section className="px-6 py-20">
        <RevealOnScroll>
          <div className="flex items-baseline justify-between mb-12 border-b border-[#E5E5E5] pb-4">
            <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-40 uppercase">
              Archive — Featured
            </p>
            <Link href="/collections"
              className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-40 hover:opacity-100 uppercase transition-opacity">
              View All →
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {products.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <RevealOnScroll key={i} delay={i * 80}>
                  <ProductCardSkeleton />
                </RevealOnScroll>
              ))
            : products.slice(0, 4).map((product, i) => (
                <RevealOnScroll key={product.id} delay={i * 80}>
                  <ProductCard product={product} index={i} />
                </RevealOnScroll>
              ))}
        </div>
      </section>

      {/* ── Collections ── */}
      {collections.length > 0 && (
        <section className="border-t border-[#E5E5E5] px-6 py-20">
          <RevealOnScroll>
            <div className="flex items-baseline justify-between mb-12 border-b border-[#E5E5E5] pb-4">
              <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-40 uppercase">
                Collections
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-px border border-[#E5E5E5] md:grid-cols-3">
            {collections.slice(0, 3).map((col, i) => (
              <RevealOnScroll key={col.id} delay={i * 100}>
                <Link href={`/collections/${col.handle}`}
                  className="group block p-8 border-b border-[#E5E5E5] md:border-b-0 md:border-r last:border-0 hover:bg-[#F0EDEA] transition-colors duration-500">
                  <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-30 uppercase mb-3">
                    COL_Nº{String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm tracking-[0.2em] uppercase font-light mb-2">{col.title}</p>
                  <p className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-40 uppercase group-hover:opacity-100 transition-opacity">
                    Shop →
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* ── Brand statement ── */}
      <section className="border-t border-[#E5E5E5] px-6 py-24 text-center">
        <RevealOnScroll>
          <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-30 uppercase mb-8">
            Manifesto
          </p>
          <h2 className="text-[clamp(1.8rem,6vw,4rem)] tracking-[0.2em] font-extralight uppercase leading-tight max-w-3xl mx-auto mb-10">
            Born from intention.<br />Worn with purpose.
          </h2>
          <Link href="/about"
            className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-40 hover:opacity-100 uppercase transition-opacity">
            Read the Archive →
          </Link>
        </RevealOnScroll>
      </section>

      {/* ── Values grid ── */}
      <section className="border-t border-[#E5E5E5]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
          {[
            ["01", "Ethically Sourced", "Every crystal is responsibly chosen and verified."],
            ["02", "Free Shipping", "Complimentary on all US orders over $50."],
            ["03", "30-Day Returns", "Love it or return it, no questions asked."],
          ].map(([num, title, desc]) => (
            <RevealOnScroll key={num}>
              <div className="px-8 py-12">
                <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-30 mb-4">{num}</p>
                <p className="text-xs tracking-[0.2em] uppercase font-light mb-3">{title}</p>
                <p className="font-mono-ciel text-[10px] opacity-40 leading-relaxed">{desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
