import React from "react";

interface HalftoneBackgroundProps {
  className?: string;
  opacity?: string;
}

/**
 * HalftoneBackground Component
 * Renders the AI Designer halftone effect inside a `relative isolate` container.
 * - Stays strictly behind all section content (-z-10, pointer-events-none)
 * - aria-hidden for accessibility
 * - Allows fine-tuned opacity and density control across different section materials
 */
export const HalftoneBackground: React.FC<HalftoneBackgroundProps> = ({
  className = "",
  opacity = "",
}) => {
  return (
    <div
      data-aifx="halftone"
      className={`absolute inset-0 -z-10 pointer-events-none ${opacity} ${className}`.trim()}
      aria-hidden="true"
    />
  );
};
