import React from "react";

interface HalftoneBackgroundProps {
  variant?: "ivory" | "dark" | "soft";
  className?: string;
  opacity?: string;
  dotScale?: number;
  speed?: number;
}

/**
 * HalftoneBackground Component
 * Renders the AI Designer halftone effect tailored strictly to the architectural brand palette:
 * - Eliminates orange and violet completely
 * - Uses Muted Sage (#536957) on Warm Ivory (#F4F1E8)
 * - Uses Champagne Gold (#B89A62) on Forest Green (#1F2924)
 * - Configures background color, contrast, glow, and dot-scale via official data-aifx-* API
 */
export const HalftoneBackground: React.FC<HalftoneBackgroundProps> = ({
  variant = "ivory",
  className = "",
  opacity = "",
  dotScale,
  speed = 0.15,
}) => {
  const isDark = variant === "dark";
  const isSoft = variant === "soft";

  // Strict Brand Colors — Zero Orange or Violet
  const colors = isDark
    ? "#B89A62,#B89A62" // Champagne Gold on Dark Forest Green
    : "#536957,#536957"; // Muted Sage on Warm Ivory

  const bg = isDark ? "#1F2924" : "#F4F1E8";
  const defaultDotScale = isDark ? 0.85 : 0.9;
  const effectiveDotScale = dotScale ?? defaultDotScale;
  const contrast = isDark ? 0.9 : 0.8;
  const glow = isDark ? 0.25 : 0.15;

  // Visual density / opacity based on variant
  const defaultOpacity = isDark ? "opacity-35" : isSoft ? "opacity-20" : "opacity-25";
  const effectiveOpacity = opacity || defaultOpacity;

  return (
    <div
      data-aifx="halftone"
      data-aifx-colors={colors}
      data-aifx-bg={bg}
      data-aifx-bg-alpha="1"
      data-aifx-dot-scale={effectiveDotScale}
      data-aifx-speed={speed}
      data-aifx-contrast={contrast}
      data-aifx-glow={glow}
      data-aifx-duotone="0.85"
      className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-500 ${effectiveOpacity} ${className}`.trim()}
      aria-hidden="true"
    />
  );
};
