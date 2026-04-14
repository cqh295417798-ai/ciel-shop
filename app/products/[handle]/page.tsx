import { getProduct } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle).catch(() => null);
  if (!product) notFound();

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-screen-lg mx-auto px-5">
        {/* Breadcrumb */}
        <Link
          href="/collections"
          className="text-[11px] uppercase tracking-widest text-[#9A8E8A] hover:text-[#C9A96E] transition-colors mb-8 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#E8C5C1]/20 relative">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#E8C5C1]/30 flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#9A8E8A]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-normal leading-tight mb-3">
                {product.title}
              </h1>
              <p className="text-2xl text-[#C9A96E] font-playfair">
                {product.priceRange.minVariantPrice.currencyCode}{" "}
                {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>

            {product.description && (
              <p className="text-sm text-[#9A8E8A] leading-relaxed">{product.description}</p>
            )}

            <AddToCartButton product={product} />

            <div className="pt-4 border-t border-[#E8C5C1]/40 space-y-2">
              {["Free shipping on orders over $50", "30-day hassle-free returns", "Ethically sourced crystals"].map((t) => (
                <p key={t} className="text-[11px] text-[#9A8E8A] flex items-center gap-2">
                  <span className="text-[#C9A96E]">✦</span> {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
