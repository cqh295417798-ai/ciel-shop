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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-playfair text-xl tracking-[0.25em] uppercase text-[#2D2D2D] hover:text-[#C9A96E] transition-colors duration-300"
          >
            Ciel
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/collections", label: "Shop" },
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="gold-hover text-xs tracking-[0.15em] uppercase text-[#2D2D2D] hover:text-[#C9A96E] transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:text-[#C9A96E] transition-colors duration-300"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E8C5C1] text-[#2D2D2D] text-[10px] font-medium flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden p-2 hover:text-[#C9A96E] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
              <span className={`block w-5 h-px bg-current mt-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-current mt-1.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="glass px-5 py-4 flex flex-col gap-5 border-t border-[#E8C5C1]/30">
            {[
              { href: "/collections", label: "Shop" },
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-[#2D2D2D] hover:text-[#C9A96E] transition-colors"
              >
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
