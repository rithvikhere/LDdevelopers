import { Anton, Bodoni_Moda, Great_Vibes, Instrument_Sans } from "next/font/google";

/**
 * Display fonts used only by the homepage hero headline.
 * Kept out of the root layout so they are preloaded only where the hero renders.
 *
 * - heroSerif: heavy, high-contrast didone ("Your Land. / Your Vision.")
 * - heroScript: flowing, continuous cursive ("Our Expertise.")
 * - heroCondensed: heavy, ultra-condensed caps (used by the Design Desk heading)
 * - heroSans: refined grotesk for the supporting line
 */
export const heroSerif = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const heroScript = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const heroCondensed = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const heroSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
});
