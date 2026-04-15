import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-[#FAFAF8]">
      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <p className="text-lg tracking-[0.6em] font-extralight uppercase mb-2">CIELGEM</p>
          <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-40 uppercase">
            Cosmic · Intuition · Essence · Lucky
          </p>
        </div>
        <div>
          <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-30 uppercase mb-5">Navigation</p>
          <ul className="space-y-3">
            {[["SHOP", "/collections"], ["ABOUT", "/about"], ["FAQ", "/faq"]].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="font-mono-ciel text-[10px] tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono-ciel text-[9px] tracking-[0.4em] opacity-30 uppercase mb-5">Support</p>
          <ul className="space-y-3">
            {[["SHIPPING", "/faq#shipping"], ["RETURNS", "/faq#returns"], ["CONTACT", "mailto:hello@cielgem.com"]].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="font-mono-ciel text-[10px] tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E5E5E5] px-6 py-4 flex items-center justify-between">
        <p className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-30 uppercase">
          © {new Date().getFullYear()} CIELGEM
        </p>
        <p className="font-mono-ciel text-[9px] tracking-[0.3em] opacity-20 uppercase">
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
