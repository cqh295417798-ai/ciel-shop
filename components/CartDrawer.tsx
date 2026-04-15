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
      const url = await createCheckout(items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })));
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
      {open && <div className="fixed inset-0 bg-[#1A1A1A]/15 backdrop-blur-sm z-40" onClick={onClose} />}

      <aside className={`fixed top-0 right-0 h-full w-full max-w-[360px] bg-[#FAFAF8] z-50 flex flex-col transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DF]">
          <p className="font-playfair text-base font-light tracking-[0.2em] uppercase">Cart</p>
          <button onClick={onClose} className="p-1 hover:text-[#A89060] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <svg className="w-8 h-8 text-[#E8E4DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#8A8A8A]">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-4">
                <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-[#F2EDE8] overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-sm font-light leading-snug">{item.title}</p>
                  {item.variantTitle !== "Default Title" && (
                    <p className="text-[10px] tracking-widest uppercase text-[#8A8A8A] mt-0.5">{item.variantTitle}</p>
                  )}
                  <p className="text-[#A89060] text-sm mt-1">
                    {item.currencyCode} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="w-5 h-5 border border-[#E8E4DF] flex items-center justify-center text-xs hover:border-[#A89060] transition-colors"
                      onClick={() => item.quantity > 1 ? updateQty(item.variantId, item.quantity - 1) : removeItem(item.variantId)}>−</button>
                    <span className="text-xs w-4 text-center">{item.quantity}</span>
                    <button className="w-5 h-5 border border-[#E8E4DF] flex items-center justify-center text-xs hover:border-[#A89060] transition-colors"
                      onClick={() => updateQty(item.variantId, item.quantity + 1)}>+</button>
                    <button className="ml-auto text-[10px] tracking-widest uppercase text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors"
                      onClick={() => removeItem(item.variantId)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E4DF] px-6 py-6 space-y-5">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A8A8A]">Subtotal</span>
              <span className="font-playfair text-lg font-light">USD {totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-[#8A8A8A]">Shipping & taxes calculated at checkout.</p>
            <button onClick={handleCheckout} disabled={loading}
              className="w-full border border-[#1A1A1A] text-[#1A1A1A] py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-300 disabled:opacity-40">
              {loading ? "Redirecting…" : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
