import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/shopify";
import RevealOnScroll from "@/components/RevealOnScroll";

export const dynamic = "force-dynamic";

const VALUES = [
  { icon: "✦", label: "Ethically Sourced", desc: "Every crystal is responsibly chosen." },
  { icon: "✦", label: "Free Shipping", desc: "On all US orders over $50." },
  { icon: "✦", label: "30-Day Returns", desc: "Love it or return it, no questions." },
];

export default async function HomePage() {
  const products = await getProducts(6).catch(() => []);

  return (
    <>
      {/* ── Hero (full-screen video placeholder) ── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#2D2D2D] flex items-end">
        {/* VIDEO PLACEHOLDER — replace <div> with <video> when ready */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C5C1]/40 via-[#D4C5E2]/30 to-[#C5D8D1]/40 animate-pulse" />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/70 via-transparent to-transparent" />

        {/* Hero text */}
        <div className="relative z-10 w-full px-6 pb-16 md:pb-24 md:px-12">
          <p className="text-[#E8C5C1] text-[11px] tracking-[0.35em] uppercase mb-3">
            Crystal Bracelets
          </p>
          <h1 className="font-playfair text-[clamp(3rem,12vw,7rem)] font-normal text-white leading-none mb-6">
            Ciel
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xs mb-8 leading-relaxed">
            Wear your energy. Handcrafted crystal bracelets for the modern you.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 pill border border-white/60 text-white hover:bg-white hover:text-[#2D2D2D] transition-all duration-300"
          >
            Shop Now <span className="text-base">→</span>
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-6 flex flex-col items-center gap-1 breathe">
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Tagline ── */}
      <section className="px-6 py-20 text-center">
        <RevealOnScroll>
          <p className="font-playfair text-[clamp(1.6rem,5vw,3rem)] font-normal text-[#2D2D2D] leading-snug max-w-xl mx-auto">
            Crystals that move with you.<br />
            <span className="shimmer">Energy you can feel.</span>
          </p>
        </RevealOnScroll>
      </section>

      {/* ── Featured Products ── */}
      <section className="px-5 pb-20">
        <RevealOnScroll className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-2xl md:text-3xl">Featured</h2>
            <Link href="/collections" className="gold-hover text-xs uppercase tracking-widest text-[#9A8E8A] hover:text-[#C9A96E] transition-colors">
              View all →
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <RevealOnScroll key={i}>
                  <ProductCardPlaceholder index={i} />
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
                        <PlaceholderImg index={i} />
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
      </section>

      {/* ── Brand story strip ── */}
      <section className="mx-5 rounded-3xl overflow-hidden bg-[#D4C5E2]/40 mb-20">
        <RevealOnScroll className="flex flex-col md:flex-row">
          {/* Image side */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto min-h-[280px] bg-[#D4C5E2]/60 relative">
            <div className="absolute inset-0 flex items-center justify-center text-[#9A8E8A]/40">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          {/* Text side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A8E8A] mb-3">Our Story</p>
            <h2 className="font-playfair text-2xl md:text-3xl mb-4 leading-snug">
              Born from intention,<br />worn with purpose.
            </h2>
            <p className="text-sm text-[#9A8E8A] leading-relaxed mb-6">
              Ciel was created for women who live intentionally. Every bracelet is handpicked for its energy, crafted for your everyday ritual.
            </p>
            <Link
              href="/about"
              className="gold-hover self-start text-xs uppercase tracking-widest text-[#2D2D2D] hover:text-[#C9A96E] transition-colors"
            >
              Read more →
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── Values ── */}
      <section className="px-5 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <RevealOnScroll key={v.label}>
              <div className="rounded-2xl bg-[#C5D8D1]/25 p-6 text-center">
                <span className="text-[#C9A96E] text-lg block mb-3">{v.icon}</span>
                <h3 className="font-playfair text-lg mb-1">{v.label}</h3>
                <p className="text-xs text-[#9A8E8A] leading-relaxed">{v.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── Mood grid (Instagram-style) ── */}
      <section className="px-5 pb-24">
        <RevealOnScroll className="mb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A8E8A]">The Ciel Edit</p>
          <h2 className="font-playfair text-2xl mt-1">Made for your moment</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            "aspect-square",
            "aspect-[3/4]",
            "aspect-[4/3]",
            "aspect-square",
            "aspect-[4/3]",
            "aspect-square",
            "aspect-square",
            "aspect-[3/4]",
          ].map((aspect, i) => (
            <div
              key={i}
              className={`${aspect} rounded-xl overflow-hidden ${
                ["bg-[#E8C5C1]/40", "bg-[#D4C5E2]/40", "bg-[#C5D8D1]/40", "bg-[#F5E6D3]/60"][i % 4]
              } flex items-center justify-center`}
            >
              <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function PlaceholderImg({ index }: { index: number }) {
  const colors = ["bg-[#E8C5C1]/40", "bg-[#D4C5E2]/40", "bg-[#C5D8D1]/40"];
  return (
    <div className={`w-full h-full ${colors[index % 3]} flex items-center justify-center`}>
      <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

function ProductCardPlaceholder({ index }: { index: number }) {
  const colors = ["bg-[#E8C5C1]/40", "bg-[#D4C5E2]/40", "bg-[#C5D8D1]/40"];
  return (
    <div>
      <div className={`aspect-[3/4] rounded-2xl ${colors[index % 3]} mb-4`} />
      <div className="h-4 w-2/3 bg-[#E8C5C1]/40 rounded mb-2" />
      <div className="h-3 w-1/3 bg-[#E8C5C1]/30 rounded" />
    </div>
  );
}
