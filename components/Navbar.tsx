"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-[#E8E4DF] py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-screen-xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="font-playfair text-lg font-light tracking-[0.4em] uppercase hover:text-[#A89060] transition-colors duration-300">
            Ciel
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[["Shop", "/collections"], ["About", "/about"], ["FAQ", "/faq"]].map(([label, href]) => (
              <Link key={href} href={href} className="gold-line text-[11px] tracking-[0.2em] uppercase text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors duration-300">
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-1.5 hover:text-[#A89060] transition-colors duration-300" aria-label="Cart">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#A89060] text-white text-[9px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button className="md:hidden p-1.5 flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-48" : "max-h-0"}`}>
          <nav className="glass border-t border-[#E8E4DF] px-5 py-6 flex flex-col gap-6">
            {[["Shop", "/collections"], ["About", "/about"], ["FAQ", "/faq"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="text-[11px] tracking-[0.25em] uppercase text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
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
