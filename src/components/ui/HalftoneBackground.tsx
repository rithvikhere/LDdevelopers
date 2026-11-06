import React from "react";

interface HalftoneBackgroundProps {
  className?: string;
  opacity?: string;
  dotScale?: number;
  speed?: number;
}

/**
 * HalftoneBackground Component
 * Renders the AI Designer halftone effect tailored strictly to the new Kairos architectural palette:
 * - Emerald, muted teal, subtle violet, charcoal, and champagne gold
 * - Deep midnight background (#0B0F0D)
 * - Muted and elegant; never overpowers reading typography
 */
export const HalftoneBackground: React.FC<HalftoneBackgroundProps> = ({
  className = "",
  opacity = "opacity-35",
  dotScale = 0.85,
  speed = 0.12,
}) => {
  // Kairos Architectural Palette: Emerald, Muted Teal, Subtle Violet, Champagne Gold
  const colors = "#2E5A44,#1F4E4B,#382E47,#C5B083";
  const bg = "#0B0F0D";

  return (
    <div
      data-aifx="halftone"
      data-aifx-colors={colors}
      data-aifx-bg={bg}
      data-aifx-bg-alpha="1"
      data-aifx-dot-scale={dotScale}
      data-aifx-speed={speed}
      data-aifx-contrast="0.8"
      data-aifx-glow="0.2"
      data-aifx-duotone="0.75"
      className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-700 ${opacity} ${className}`.trim()}
      aria-hidden="true"
    />
  );
};
