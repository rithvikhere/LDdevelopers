import React from "react";
import Link from "next/link";

/**
 * BackToExplore — returns visitors to the Explore hub on the homepage (/#explore).
 * Always targets the hub, so visitors who open a route directly are never stranded.
 * Browser back navigation continues to work normally because each page is a real route.
 */
export const BackToExplore: React.FC = () => (
  <Link
    href="/#explore"
    className="group inline-flex items-center gap-3 py-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#9EA8A1] hover:text-[#C5B083] focus-visible:text-[#C5B083] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#C5B083] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B0F0D]"
  >
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
    >
      &larr;
    </span>
    <span>Back to Explore</span>
  </Link>
);
