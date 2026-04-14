"use client";

import { useCart } from "@/lib/cart-context";
import { createCheckout } from "@/lib/shopify";
import Image from "next/image";
import { useState } from "react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (!items.length) return;
    setLoading(true);
    try {
      const url = await createCheckout(
        items.map((i) => ({ variantId: i.variantId, quantity: i.quantity }))
      );
      clearCart();
      window.location.href = url;
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-[#2D2D2D]/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#FDF6F0] z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8C5C1]/40">
          <h2 className="font-playfair text-lg tracking-wide">Your Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8C5C1]/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8C5C1]/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#9A8E8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-[#9A8E8A] text-sm">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-4 items-start">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#E8C5C1]/20 flex-shrink-0">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#E8C5C1]/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-sm font-medium leading-snug">{item.title}</p>
                  {item.variantTitle !== "Default Title" && (
                    <p className="text-[10px] text-[#9A8E8A] mt-0.5 uppercase tracking-wider">{item.variantTitle}</p>
                  )}
                  <p className="text-sm text-[#C9A96E] mt-1 font-medium">
                    {item.currencyCode} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="w-6 h-6 rounded-full border border-[#E8C5C1] flex items-center justify-center text-xs hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                      onClick={() => item.quantity > 1 ? updateQty(item.variantId, item.quantity - 1) : removeItem(item.variantId)}
                    >−</button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      className="w-6 h-6 rounded-full border border-[#E8C5C1] flex items-center justify-center text-xs hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                      onClick={() => updateQty(item.variantId, item.quantity + 1)}
                    >+</button>
                    <button
                      className="ml-auto text-[10px] text-[#9A8E8A] hover:text-red-400 transition-colors uppercase tracking-wider"
                      onClick={() => removeItem(item.variantId)}
                    >Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8C5C1]/40 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-[#9A8E8A]">Subtotal</span>
              <span className="font-playfair text-lg">USD {totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#9A8E8A]">Shipping & taxes calculated at checkout.</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#2D2D2D] text-[#FDF6F0] py-4 text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#E8C5C1] hover:text-[#2D2D2D] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Redirecting…" : "Checkout →"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
