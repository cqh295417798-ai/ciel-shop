"use client";

import { useCart, CartItem } from "@/lib/cart-context";
import { ShopifyProduct } from "@/lib/shopify";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCart();
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");
  const [added, setAdded] = useState(false);

  const selected = variants.find((v) => v.id === selectedId) ?? variants[0];

  function handleAdd() {
    if (!selected) return;
    addItem({
      variantId: selected.id,
      productId: product.id,
      title: product.title,
      variantTitle: selected.title,
      price: selected.price.amount,
      currencyCode: selected.price.currencyCode,
      image: product.featuredImage?.url ?? null,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-5">
      {variants.length > 1 && (
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A] mb-3">Option</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button key={v.id} onClick={() => setSelectedId(v.id)} disabled={!v.availableForSale}
                className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${
                  selectedId === v.id
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#FAFAF8]"
                    : "border-[#E8E4DF] text-[#8A8A8A] hover:border-[#A89060] hover:text-[#A89060]"
                } disabled:opacity-30 disabled:cursor-not-allowed`}>
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleAdd} disabled={!selected?.availableForSale}
        className="w-full border border-[#1A1A1A] text-[#1A1A1A] py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
        {!selected?.availableForSale ? "Out of Stock" : added ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  );
}
