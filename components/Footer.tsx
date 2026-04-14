import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white/60 mt-0">
      <div className="max-w-screen-xl mx-auto px-5 py-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div>
          <p className="font-playfair text-white text-2xl tracking-[0.2em] uppercase mb-3">Ciel</p>
          <p className="text-xs leading-relaxed text-white/40">
            Handcrafted crystal bracelets for the modern woman. Wear your energy.
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Shop</p>
          <ul className="space-y-3 text-sm">
            {[["Shop All", "/collections"], ["About", "/about"], ["FAQ", "/faq"]].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-[#E8C5C1] transition-colors duration-300">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Support</p>
          <ul className="space-y-3 text-sm">
            {[["Shipping Policy", "/faq#shipping"], ["Returns", "/faq#returns"], ["Contact", "mailto:hello@ciel.com"]].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-[#E8C5C1] transition-colors duration-300">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-[11px] text-white/20">
        © {new Date().getFullYear()} Ciel. All rights reserved.
      </div>
    </footer>
  );
}
