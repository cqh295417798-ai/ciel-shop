import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import Hero from "@/components/Hero";

export const dynamic = "force-dynamic";

const MARQUEE = [
  "ETHICAL SOURCING", "FREE SHIPPING $50+", "30-DAY RETURNS",
  "GENUINE GEMSTONES", "HANDCRAFTED", "COSMIC ENERGY", "INTELLECTUAL LUXURY",
];

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(8).catch(() => []),
    getCollections().catch(() => []),
  ]);

  return (
    <>
      <Hero />

      {/* ── Marquee ── */}
      <div className="border-y border-[#D9D4CC] py-3 overflow-hidden">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-35 px-8 whitespace-nowrap uppercase">
              {item} <span className="mx-4 opacity-30" style={{ color: "#C5B358" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Products ── */}
      <section className="px-6 py-20">
        <RevealOnScroll>
          <div className="flex items-baseline justify-between pb-4 mb-10" style={{ borderBottom: "0.5px solid #D9D4CC" }}>
            <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-40 uppercase">Selected Objects</p>
            <Link href="/collections" className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-35 hover:opacity-100 uppercase gold-link"
              style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
              FULL ARCHIVE →
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

        {/* Museum divider after every 3rd row */}
        <div className="museum-divider mt-10" />
      </section>

      {/* ── Collections ── */}
      {collections.length > 0 && (
        <section className="px-6 pb-20" style={{ borderTop: "0.5px solid #D9D4CC" }}>
          <RevealOnScroll>
            <div className="flex items-baseline justify-between py-4 mb-8" style={{ borderBottom: "0.5px solid #D9D4CC" }}>
              <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-40 uppercase">Collections</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "0.5px solid #D9D4CC" }}>
            {collections.slice(0, 3).map((col, i) => (
              <RevealOnScroll key={col.id} delay={i * 100}>
                <Link href={`/collections/${col.handle}`}
                  className="group block p-8 hover:bg-[#EAE7E2]"
                  style={{
                    borderRight: i < 2 ? "0.5px solid #D9D4CC" : "none",
                    transition: "background 800ms cubic-bezier(0.4,0,0.2,1)",
                  }}>
                  <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-30 uppercase mb-3">
                    COL_Nº{String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[11px] tracking-[0.3em] uppercase font-light mb-4">{col.title}</p>
                  <p className="font-mono-ciel text-[9px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-60 gold-link"
                    style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
                    ENTER →
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <div className="museum-divider mt-0" />
        </section>
      )}

      {/* ── Manifesto ── */}
      <section className="px-6 py-24 text-center" style={{ borderTop: "0.5px solid #D9D4CC" }}>
        <RevealOnScroll>
          <p className="font-mono-ciel text-[9px] tracking-[0.6em] opacity-30 uppercase mb-10">Manifesto</p>
          <h2 className="font-extralight uppercase leading-loose max-w-2xl mx-auto mb-12"
            style={{ fontSize: "clamp(1.4rem,4vw,2.8rem)", letterSpacing: "0.15em" }}>
            Wear your energy.<br />
            Trust your intuition.<br />
            Let the stone speak.
          </h2>
          <div className="w-px h-10 mx-auto" style={{ background: "#D9D4CC" }} />
        </RevealOnScroll>
      </section>

      {/* ── Values ── */}
      <section style={{ borderTop: "0.5px solid #D9D4CC" }}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            ["ETH_001", "Ethically Sourced", "Every crystal verified and responsibly obtained."],
            ["SHP_002", "Free Shipping", "Complimentary on all US orders over $50."],
            ["RTN_003", "30-Day Returns", "No questions. Full refund or exchange."],
          ].map(([sku, title, desc], i) => (
            <RevealOnScroll key={sku} delay={i * 100}>
              <div className="px-8 py-12"
                style={{ borderRight: i < 2 ? "0.5px solid #D9D4CC" : "none" }}>
                <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-25 mb-4">{sku}</p>
                <p className="text-[11px] tracking-[0.3em] uppercase font-light mb-3">{title}</p>
                <p className="font-mono-ciel text-[9px] opacity-40 leading-relaxed">{desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
