"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";

const Sigil = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.3"
    width="24"
    height="24"
    className="sigil-pulse"
    aria-hidden="true"
  >
    <path d="M50 10 L70 30 L50 90 L30 30 Z" />
    <ellipse cx="50" cy="40" rx="35" ry="12" transform="rotate(-15 50 40)" />
    <ellipse cx="50" cy="40" rx="28" ry="8" transform="rotate(20 50 40)" />
    <circle cx="50" cy="18" r="1" fill="currentColor" />
  </svg>
);

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E5E5E5] py-4"
          : "bg-transparent py-8"
      }`}>
        <div className="max-w-screen-xl mx-auto px-6">

          {/* Center: Sigil + Logo + Subtitle */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <Sigil />
            <Link href="/" className="text-2xl tracking-[0.6em] font-extralight uppercase hover:opacity-60 transition-opacity duration-500">
              CIELGEM
            </Link>
            <p className="font-mono-ciel text-[9px] tracking-[0.8em] opacity-60 uppercase">
              Cosmic · Intuition · Essence · Lucky
            </p>
          </div>

          {/* Nav row */}
          <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4">
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[["SHOP", "/collections"], ["ABOUT", "/about"], ["FAQ", "/faq"]].map(([label, href]) => (
                <Link key={href} href={href}
                  className="font-mono-ciel text-[10px] tracking-[0.3em] opacity-50 hover:opacity-100 transition-opacity duration-300">
                  {label}
                </Link>
              ))}
            </nav>

            {/* Spacer on mobile */}
            <div className="md:hidden" />

            {/* Cart */}
            <button onClick={() => setCartOpen(true)}
              className="relative font-mono-ciel text-[10px] tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
              aria-label="Cart">
              <span>CART</span>
              {totalItems > 0 && (
                <span className="font-mono-ciel text-[9px] border border-[#1A1A1A] w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button className="md:hidden font-mono-ciel text-[10px] tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-40" : "max-h-0"}`}>
          <nav className="border-t border-[#E5E5E5] px-6 py-6 flex flex-col gap-5 bg-[#FAFAF8]">
            {[["SHOP", "/collections"], ["ABOUT", "/about"], ["FAQ", "/faq"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="font-mono-ciel text-[10px] tracking-[0.3em] opacity-50 hover:opacity-100 transition-opacity">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
