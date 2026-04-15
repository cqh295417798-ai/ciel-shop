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
        <Link href="/collections" className="gold-line text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors mb-10 inline-block">
          ← Back
        </Link>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square overflow-hidden bg-[#F2EDE8] relative">
              {product.featuredImage ? (
                <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title}
                  fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full bg-[#F2EDE8]" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-light leading-snug tracking-wide mb-3">
                {product.title}
              </h1>
              <p className="text-[#A89060] text-lg font-playfair font-light">
                {product.priceRange.minVariantPrice.currencyCode}{" "}
                {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>

            {product.description && (
              <p className="text-sm text-[#8A8A8A] leading-relaxed">{product.description}</p>
            )}

            <AddToCartButton product={product} />

            <div className="pt-6 border-t border-[#E8E4DF] space-y-3">
              {["Free shipping on orders over $50", "30-day hassle-free returns", "Ethically sourced crystals"].map((t) => (
                <p key={t} className="text-[11px] text-[#8A8A8A] flex items-center gap-3">
                  <span className="text-[#A89060] text-xs">✦</span>{t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
