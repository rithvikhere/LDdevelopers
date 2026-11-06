import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  themeColor: "#202622",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "[COMPANY NAME] — Architectural Excellence & Property Development",
  description:
    "Distinguished architectural design, construction, and property development. Crafting bespoke independent houses, luxury duplexes, villas, and commercial spaces.",
  keywords: [
    "construction",
    "property development",
    "villas",
    "duplex",
    "independent houses",
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
      <body className="min-h-screen bg-[#F3F0E8] text-[#202622] font-sans antialiased selection:bg-[#B49A68]/30 selection:text-[#202622]">
        {children}
        <Script
          src="https://cdn.aidesigner.ai/effects/runtime/v1.js"
          strategy="afterInteractive"
          data-aifx-key="aifx_pk_dfa803a90d2e42acbb073c8474b14bba"
        />
      </body>
    </html>
  );
}
