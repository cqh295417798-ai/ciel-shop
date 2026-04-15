import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorController from "@/components/CursorController";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CIELGEM — Crystal Bracelets",
  description: "Cosmic · Intuition · Essence · Lucky. Handcrafted crystal bracelets.",
  openGraph: {
    title: "CIELGEM",
    description: "Cosmic · Intuition · Essence · Lucky.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F2F0ED] text-[#1A1A1A]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <CartProvider>
          <CursorController />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
