import Link from "next/link";
import Image from "next/image";
import { getProducts, getCollections } from "@/lib/shopify";
import RevealOnScroll from "@/components/RevealOnScroll";

export const dynamic = "force-dynamic";

const PROMISES = [
  "Ethically Sourced Crystals",
  "Free Shipping on Orders $50+",
  "30-Day Returns",
  "Handcrafted with Intention",
  "Genuine Gemstones Guaranteed",
];

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(6).catch(() => []),
    getCollections().catch(() => []),
  ]);

  return (
    <>
      {/* ── 1. Hero (full-screen video placeholder) ── */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#1A1A1A]">
        {/* Replace this div with <video> when ready */}
        <div className="absolute inset-0 bg-[#1A1A1A]">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(ellipse at 60% 40%, #A89060 0%, transparent 60%)" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]/60" />

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#A89060] mb-6">Crystal Bracelets</p>
          <h1 className="font-playfair font-light text-white leading-none mb-8"
            style={{ fontSize: "clamp(4rem, 18vw, 10rem)", letterSpacing: "0.15em" }}>
            Ciel
          </h1>
          <p className="text-white/50 text-xs tracking-[0.15em] uppercase mb-10">Wear your energy</p>
          <Link href="/collections"
            className="border border-white/30 text-white text-[10px] tracking-[0.3em] uppercase px-8 py-3 hover:border-[#A89060] hover:text-[#A89060] transition-all duration-500">
            Explore
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 breathe flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-white/20" />
        </div>
      </section>

      {/* ── 2. Marquee ── */}
      <div className="bg-[#F2EDE8] border-y border-[#E8E4DF] py-3 overflow-hidden">
        <div className="marquee-track">
          {[...PROMISES, ...PROMISES].map((p, i) => (
            <span key={i} className="text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A] px-8 whitespace-nowrap">
              {p} <span className="text-[#A89060] mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. Collections ── */}
      {collections.length > 0 && (
        <section className="px-5 py-20">
          <RevealOnScroll>
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-playfair text-2xl font-light tracking-wide">Collections</h2>
              <Link href="/collections" className="gold-line text-[10px] tracking-[0.25em] uppercase text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
                View all
              </Link>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {collections.slice(0, 3).map((col, i) => (
              <RevealOnScroll key={col.id}>
                <Link href={`/collections/${col.handle}`} className="group block relative overflow-hidden aspect-[4/5] bg-[#F2EDE8]">
                  {col.image && (
                    <Image src={col.image.url} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A]/30 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-playfair text-white text-lg font-light tracking-wide">{col.title}</p>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#A89060] mt-1">Shop →</p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* ── 4. Featured Products ── */}
      <section className="bg-[#F2EDE8] px-5 py-20">
        <RevealOnScroll>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-playfair text-2xl font-light tracking-wide">Featured</h2>
            <Link href="/collections" className="gold-line text-[10px] tracking-[0.25em] uppercase text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
              View all
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <RevealOnScroll key={i}>
                  <div>
                    <div className="aspect-[3/4] bg-[#E8E4DF] mb-4" />
                    <div className="h-3 w-2/3 bg-[#E8E4DF] mb-2" />
                    <div className="h-3 w-1/4 bg-[#E8E4DF]" />
                  </div>
                </RevealOnScroll>
              ))
            : products.map((product, i) => (
                <RevealOnScroll key={product.id}>
                  <Link href={`/products/${product.handle}`} className="group block">
                    <div className="aspect-[3/4] overflow-hidden bg-[#E8E4DF] mb-4 relative">
                      {product.featuredImage ? (
                        <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title}
                          fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-[#E8E4DF]" />
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
      </section>

      {/* ── 5. Brand story ── */}
      <section className="px-5 py-20">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
            <div className="w-full md:w-1/2 aspect-[4/5] bg-[#F2EDE8] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-[#E8E4DF]">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#A89060] mb-4">Our Story</p>
              <h2 className="font-playfair text-3xl md:text-4xl font-light leading-snug mb-6">
                Born from intention,<br />worn with purpose.
              </h2>
              <p className="text-sm text-[#8A8A8A] leading-relaxed mb-8 max-w-sm">
                Ciel was created for women who live with intention. Every bracelet is handpicked for its energy, crafted for your everyday ritual.
              </p>
              <Link href="/about" className="gold-line text-[10px] tracking-[0.3em] uppercase hover:text-[#A89060] transition-colors">
                Read more
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── 6. Values ── */}
      <section className="bg-[#F2EDE8] px-5 py-16">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          {[
            ["✦", "Ethically Sourced", "Every crystal is responsibly chosen and verified."],
            ["✦", "Free Shipping", "Complimentary on all US orders over $50."],
            ["✦", "30-Day Returns", "Love it or return it, no questions asked."],
          ].map(([icon, title, desc]) => (
            <RevealOnScroll key={title}>
              <div className="py-4">
                <span className="text-[#A89060] text-sm block mb-3">{icon}</span>
                <p className="font-playfair text-base font-light tracking-wide mb-2">{title}</p>
                <p className="text-[11px] text-[#8A8A8A] leading-relaxed">{desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
