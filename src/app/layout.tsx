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
  themeColor: "#0B0F0D",
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
      <head>
        {/* Guard script to eliminate any external runtime watermark overlays */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var observer = new MutationObserver(function(mutations) {
                  var wm = document.querySelector('[data-aifx-wm], a[href*="aidesigner.ai"]');
                  if (wm) wm.remove();
                });
                observer.observe(document.documentElement, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0B0F0D] text-[#F5F3EF] font-sans antialiased selection:bg-[#C5B083] selection:text-[#0B0F0D]">
        {children}

        {/* Load AI Designer Runtime Once at Root */}
        <Script
          src="https://cdn.aidesigner.ai/effects/runtime/v1.js"
          strategy="afterInteractive"
          data-aifx-key="aifx_pk_dfa803a90d2e42acbb073c8474b14bba"
        />
      </body>
    </html>
  );
}
