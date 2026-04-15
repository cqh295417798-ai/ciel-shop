import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#F2F0ED] flex items-end">

      {/* Video placeholder */}
      <div className="absolute inset-0 bg-[#EAE7E2]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-15 uppercase">
            Video · Placeholder
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F2F0ED] via-[#F2F0ED]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-16 md:pb-24">
        <RevealOnScroll>
          <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-40 uppercase mb-4">
            SS 2025 — Archive Nº001
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <h1
            className="font-extralight uppercase leading-none mb-8"
            style={{
              fontSize: "clamp(3rem, 12vw, 8rem)",
              letterSpacing: "0.12em",
            }}
          >
            Crystal<br />Bracelets
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <Link
            href="/collections"
            className="inline-block border border-[#D9D4CC] font-mono-ciel text-[9px] tracking-[0.5em] uppercase px-8 py-3.5 hover:border-[#1A1A1A] gold-link"
            style={{ transition: "all 800ms cubic-bezier(0.4,0,0.2,1)" }}
          >
            ENTER ARCHIVE →
          </Link>
        </RevealOnScroll>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-6 flex flex-col items-center gap-2 opacity-30">
        <span className="font-mono-ciel text-[8px] tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-[#1A1A1A]" />
      </div>
    </section>
  );
}
