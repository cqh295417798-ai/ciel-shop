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
      {open && <div className="fixed inset-0 bg-[#1A1A1A]/10 backdrop-blur-sm z-40" onClick={onClose} />}

      <aside className={`fixed top-0 right-0 h-full w-full max-w-[340px] bg-[#FAFAF8] z-50 flex flex-col border-l border-[#E5E5E5] transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
          <p className="font-mono-ciel text-[9px] tracking-[0.4em] uppercase opacity-60">Cart Archive</p>
          <button onClick={onClose} className="font-mono-ciel text-[9px] tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity">
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-30 uppercase">Empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-4 border-b border-[#E5E5E5] pb-6">
                <div className="relative w-16 h-16 flex-shrink-0 bg-[#F0EDEA] overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.15em] uppercase font-light leading-snug mb-1">{item.title}</p>
                  {item.variantTitle !== "Default Title" && (
                    <p className="font-mono-ciel text-[9px] opacity-40 mb-1">{item.variantTitle}</p>
                  )}
                  <p className="font-mono-ciel text-[10px] opacity-60 mb-2">
                    {item.currencyCode} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="font-mono-ciel text-[10px] w-5 h-5 border border-[#E5E5E5] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                      onClick={() => item.quantity > 1 ? updateQty(item.variantId, item.quantity - 1) : removeItem(item.variantId)}>−</button>
                    <span className="font-mono-ciel text-[10px] w-4 text-center">{item.quantity}</span>
                    <button className="font-mono-ciel text-[10px] w-5 h-5 border border-[#E5E5E5] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                      onClick={() => updateQty(item.variantId, item.quantity + 1)}>+</button>
                    <button className="ml-auto font-mono-ciel text-[9px] tracking-[0.2em] uppercase opacity-30 hover:opacity-100 transition-opacity"
                      onClick={() => removeItem(item.variantId)}>REMOVE</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E5E5E5] px-6 py-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="font-mono-ciel text-[9px] tracking-[0.3em] uppercase opacity-40">Total</span>
              <span className="text-sm tracking-[0.1em] font-light">USD {totalPrice.toFixed(2)}</span>
            </div>
            <p className="font-mono-ciel text-[9px] opacity-30">Shipping calculated at checkout.</p>
            <button onClick={handleCheckout} disabled={loading}
              className="w-full border border-[#1A1A1A] font-mono-ciel text-[9px] tracking-[0.4em] uppercase py-4 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-300 disabled:opacity-30">
              {loading ? "REDIRECTING..." : "PROCEED TO CHECKOUT →"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
