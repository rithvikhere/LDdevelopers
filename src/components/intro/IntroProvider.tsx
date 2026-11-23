"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { SiteIntro } from "@/components/intro/SiteIntro";

/**
 * Intro stages
 *   0 — intro playing (black screen, LD mark drawing)
 *   1 — site revealing (curtain lifting, hero content starts entering)
 *   2 — mark has landed in the hero's top-left brand slot
 *   3 — done (intro removed)
 */
export type IntroPhase = 0 | 1 | 2 | 3;

// Lives at module scope: it survives client-side navigation (e.g. returning from /about)
// but resets on a full page load — so the intro plays once per visit/load.
const introMemory = { played: false };

type IntroContextValue = { phase: IntroPhase; advance: (next: IntroPhase) => void };

const IntroContext = createContext<IntroContextValue>({ phase: 3, advance: () => {} });

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (introMemory.played) return 3;
    // Only play when the homepage itself is the page being loaded. On a full load the server-rendered
    // intro stage is already in the document; on client-side navigation into the homepage (e.g. the
    // visitor started on /about and clicked "Back to Explore") it is not, so skip the intro.
    if (typeof document !== "undefined" && !document.querySelector(".site-intro")) return 3;
    return 0;
  });

  const advance = useCallback((next: IntroPhase) => {
    if (next === 3) introMemory.played = true;
    setPhase((prev) => (next > prev ? next : prev));
  }, []);

  const value = useMemo(() => ({ phase, advance }), [phase, advance]);

  return (
    <IntroContext.Provider value={value}>
      {phase < 3 && <SiteIntro />}
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);
export const useIntroPhase = () => useContext(IntroContext).phase;
