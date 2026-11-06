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
  themeColor: "#1F2924",
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
      <body className="min-h-screen bg-[#F4F1E8] text-[#252B27] font-sans antialiased selection:bg-[#B89A62]/30 selection:text-[#252B27]">
        {children}

        {/* AI Designer Halftone Runtime Script — Loaded once in app root */}
        <Script
          src="https://cdn.aidesigner.ai/effects/runtime/v1.js"
          strategy="afterInteractive"
          data-aifx-key="aifx_pk_dfa803a90d2e42acbb073c8474b14bba"
        />

        {/* Branding & Watermark Disabler */}
        <Script id="aifx-branding-remover" strategy="afterInteractive">
          {`
            (function() {
              function purgeBranding() {
                var badges = document.querySelectorAll('[data-aifx-wm]');
                for (var i = 0; i < badges.length; i++) {
                  badges[i].remove();
                }
              }
              purgeBranding();
              if (typeof MutationObserver !== 'undefined' && document.body) {
                var obs = new MutationObserver(function() { purgeBranding(); });
                obs.observe(document.body, { childList: true, subtree: true });
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
