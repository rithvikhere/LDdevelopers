import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteAssets } from "@/config/site-assets";

interface CompanyLogoProps {
  theme?: "light" | "dark";
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * CompanyLogo Component
 * Centralized, reusable architectural brand logo.
 * Supports both light (dark text/mark) and dark (ivory text/champagne mark) backgrounds.
 * When the real client logo is provided, replace `logo-light.svg` and `logo-dark.svg`
 * in `public/assets/brand/` or update `siteAssets.brand` in `src/config/site-assets.ts`.
 */
export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  theme = "light",
  className = "",
  showSubtitle = true,
  size = "md",
}) => {
  const isDark = theme === "dark";

  // Size configurations
  const isLg = size === "lg";
  const isSm = size === "sm";

  const markSize = isLg
    ? "w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 xl:w-14 xl:h-14"
    : isSm
    ? "w-7 h-7"
    : "w-9 h-9";

  const titleSize = isLg
    ? "text-lg sm:text-xl lg:text-[22px] xl:text-[24px] tracking-[0.16em]"
    : isSm
    ? "text-base tracking-[0.16em]"
    : "text-lg sm:text-xl tracking-[0.18em]";

  const subtitleSize = isLg
    ? "text-[9.5px] sm:text-[10px] lg:text-[11px] xl:text-[11.5px] tracking-[0.28em]"
    : isSm
    ? "text-[8px] tracking-[0.24em]"
    : "text-[9px] tracking-[0.28em]";

  const gapSize = isLg ? "gap-3 sm:gap-4" : "gap-3";

  return (
    <Link
      href="#home"
      className={`inline-flex items-center ${gapSize} group transition-opacity hover:opacity-90 ${className}`}
      aria-label="[COMPANY NAME] - Home"
    >
      {/* Geometric Architectural Mark */}
      <div className={`relative ${markSize} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          {/* Base foundation line */}
          <rect
            x="4"
            y="40"
            width="40"
            height="3"
            rx="1.5"
            fill={isDark ? "#C5B083" : "#2E5A44"}
          />
          {/* Architectural structural arch */}
          <path
            d="M8 38V14L24 6L40 14V38"
            stroke={isDark ? "#F5F3EF" : "#121815"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner sanctum lines */}
          <path
            d="M16 38V20L24 16L32 20V38"
            stroke="#C5B083"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Keystone apex */}
          <circle
            cx="24"
            cy="6"
            r="2.5"
            fill={isDark ? "#C5B083" : "#2E5A44"}
          />
        </svg>
      </div>

      {/* Brand Name & Architectural Subtitle */}
      <div className="flex flex-col">
        <span
          className={`font-display ${titleSize} font-medium leading-tight transition-colors ${
            isDark ? "text-[#F5F3EF]" : "text-[#0B0F0D]"
          }`}
        >
          [COMPANY NAME]
        </span>
        {showSubtitle && (
          <span
            className={`${subtitleSize} font-medium uppercase leading-tight mt-0.5 ${
              isDark ? "text-[#C5B083]" : "text-[#2E5A44]"
            }`}
          >
            ARCHITECTURE &amp; DEVELOPMENTS
          </span>
        )}
      </div>
    </Link>
  );
};

