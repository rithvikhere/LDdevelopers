import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#CADCAE",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "[COMPANY NAME] — Architectural Excellence & Property Development",
  description:
    "Distinguished architectural design, construction, and property development. Crafting timeless spaces, luxury villas, duplexes, and commercial landmarks.",
  keywords: [
    "architecture",
    "property development",
    "bespoke villas",
    "luxury duplex",
    "commercial construction",
    "land investment",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#CADCAE] text-[#212121] font-sans antialiased selection:bg-[#E67514] selection:text-[#212121]">
        {children}
      </body>
    </html>
  );
}
