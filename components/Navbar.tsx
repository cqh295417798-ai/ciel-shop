"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";

/* ── Sigil SVG ── */
const Sigil = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.3"
    width="20"
    height="20"
    className="sigil-breathe"
    aria-hidden="true"
  >
    <path d="M50 10 L70 30 L50 90 L30 30 Z" />
    <ellipse cx="50" cy="40" rx="35" ry="12" transform="rotate(-15 50 40)" />
    <ellipse cx="50" cy="40" rx="28" ry="8" transform="rotate(20 50 40)" />
    {/* 4-point star in gold */}
    <path
      d="M50 14 L51.2 17.2 L54.5 17.2 L51.9 19.2 L52.9 22.5 L50 20.5 L47.1 22.5 L48.1 19.2 L45.5 17.2 L48.8 17.2 Z"
      fill="#C5B358"
      stroke="none"
    />
  </svg>
);

/* ── Mega menu data ── */
const MEGA = {
  categories: ["Bracelets", "Necklaces", "Rings", "Earrings", "Sets"],
  series: ["Lucky Star", "Cosmic Orbit", "Bone Archive", "Intuition", "Void"],
};

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Main Header ── */}
      <header
        style={{ height: "80px", transition: "background 800ms cubic-bezier(0.4,0,0.2,1), border-color 800ms cubic-bezier(0.4,0,0.2,1)" }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled
            ? "bg-[#F2F0ED]/92 backdrop-blur-md border-b border-[#D9D4CC]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* SHOP with mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="font-mono-ciel text-[11px] tracking-[0.4em] font-light uppercase gold-link opacity-60 hover:opacity-100"
                style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
                SHOP
              </button>
            </div>
            {["THE ARCHIVE", "INTUITION"].map((label) => (
              <Link key={label} href="/collections"
                className="font-mono-ciel text-[11px] tracking-[0.4em] font-light uppercase gold-link opacity-60 hover:opacity-100"
                style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Center: Sigil + Wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px]">
            <div className="mb-[2px]"><Sigil /></div>
            <Link href="/"
              className="text-[15px] tracking-[0.6em] font-extralight uppercase hover:opacity-50"
              style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
              CIELGEM
            </Link>
            <p className="font-mono-ciel text-[9px] tracking-[0.8em] opacity-40 uppercase whitespace-nowrap">
              Cosmic · Intuition · Essence · Lucky
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <button onClick={() => setCartOpen(true)}
              className="relative font-mono-ciel text-[11px] tracking-[0.3em] uppercase opacity-50 hover:opacity-100 hidden md:flex items-center gap-2"
              style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
              CART
              {totalItems > 0 && (
                <span className="font-mono-ciel text-[9px] border border-[#1A1A1A] w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile */}
            <button className="md:hidden font-mono-ciel text-[10px] tracking-[0.3em] uppercase opacity-50 hover:opacity-100"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
            <button onClick={() => setCartOpen(true)} className="md:hidden relative opacity-50 hover:opacity-100">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 border border-[#1A1A1A] font-mono-ciel text-[8px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden bg-[#F2F0ED] border-t border-[#D9D4CC]`}
          style={{ maxHeight: menuOpen ? "200px" : "0", transition: "max-height 800ms cubic-bezier(0.4,0,0.2,1)" }}>
          <nav className="px-6 py-6 flex flex-col gap-5">
            {[["SHOP", "/collections"], ["THE ARCHIVE", "/collections"], ["INTUITION", "/about"]].map(([l, h]) => (
              <Link key={l} href={h} onClick={() => setMenuOpen(false)}
                className="font-mono-ciel text-[10px] tracking-[0.4em] uppercase opacity-50 hover:opacity-100 gold-link"
                style={{ transition: "opacity 800ms cubic-bezier(0.4,0,0.2,1)" }}>
                {l}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Mega Menu ── */}
      <div
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
        className="mega-menu fixed top-[80px] left-0 right-0 z-40 bg-[#F2F0ED]/95 backdrop-blur-md border-b border-[#D9D4CC]"
        style={{
          opacity: megaOpen ? 1 : 0,
          transform: megaOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: megaOpen ? "auto" : "none",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-3 gap-12">
          {/* Col 1: Categories */}
          <div>
            <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-30 uppercase mb-5">Categories</p>
            <ul className="space-y-3">
              {MEGA.categories.map((item) => (
                <li key={item}>
                  <Link href="/collections"
                    className="font-mono-ciel text-[10px] tracking-[0.3em] uppercase opacity-50 hover:opacity-100 gold-link"
                    style={{ transition: "color 800ms cubic-bezier(0.4,0,0.2,1)" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Series */}
          <div>
            <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-30 uppercase mb-5">Series</p>
            <ul className="space-y-3">
              {MEGA.series.map((item) => (
                <li key={item}>
                  <Link href="/collections"
                    className="font-mono-ciel text-[10px] tracking-[0.3em] uppercase opacity-50 hover:opacity-100 gold-link"
                    style={{ transition: "color 800ms cubic-bezier(0.4,0,0.2,1)" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Featured image placeholder */}
          <div>
            <p className="font-mono-ciel text-[9px] tracking-[0.5em] opacity-30 uppercase mb-5">Featured</p>
            <div className="aspect-[4/5] bg-[#E8E4DE] flex items-center justify-center">
              <span className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-20 uppercase">Image</span>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
