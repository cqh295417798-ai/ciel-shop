import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/40">
      <div className="max-w-screen-xl mx-auto px-5 py-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
        <div>
          <p className="font-playfair text-white text-xl font-light tracking-[0.4em] uppercase mb-4">Ciel</p>
          <p className="text-[11px] leading-relaxed text-white/30">
            Handcrafted crystal bracelets.<br />Wear your energy.
          </p>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#A89060] mb-5">Shop</p>
          <ul className="space-y-3">
            {[["All Products", "/collections"], ["About", "/about"], ["FAQ", "/faq"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-[11px] tracking-wide hover:text-white transition-colors duration-300">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#A89060] mb-5">Support</p>
          <ul className="space-y-3">
            {[["Shipping", "/faq#shipping"], ["Returns", "/faq#returns"], ["Contact", "mailto:hello@cielgem.com"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="text-[11px] tracking-wide hover:text-white transition-colors duration-300">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 text-center py-5 text-[10px] text-white/20 tracking-widest">
        © {new Date().getFullYear()} Ciel. All rights reserved.
      </div>
    </footer>
  );
}
