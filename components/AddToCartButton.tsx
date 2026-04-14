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
    <div className="space-y-4">
      {/* Variant selector */}
      {variants.length > 1 && (
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#9A8E8A] mb-2">Option</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                disabled={!v.availableForSale}
                className={`pill border text-[11px] transition-all ${
                  selectedId === v.id
                    ? "bg-[#2D2D2D] border-[#2D2D2D] text-white"
                    : "border-[#E8C5C1] text-[#9A8E8A] hover:border-[#2D2D2D] hover:text-[#2D2D2D]"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!selected?.availableForSale}
        className="w-full rounded-full bg-[#2D2D2D] text-[#FDF6F0] py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#E8C5C1] hover:text-[#2D2D2D] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {!selected?.availableForSale
          ? "Out of Stock"
          : added
          ? "✓ Added to Cart"
          : "Add to Cart"}
      </button>
    </div>
  );
}
