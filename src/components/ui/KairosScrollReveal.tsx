"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface KairosDepthRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  highlight?: boolean;
  withFrame?: boolean;
}

/**
 * KairosDepthReveal Component
 * Inspired by the Kairos architectural reference:
 * - Content begins in subtle depth (scaled down slightly, translating in from z-depth)
 * - Moves forward smoothly toward the user as it enters the viewport
 * - Emerges with a masked opacity & translateY transition
 * - Settles into position with an optional soft champagne highlight
 */
export const KairosDepthReveal: React.FC<KairosDepthRevealProps> = ({
  children,
  className = "",
  delay = 0,
  highlight = false,
  withFrame = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 32,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cinematic editorial curve
      }}
      className={`relative ${
        withFrame
          ? "border border-[#24322A]/20 bg-white/90 backdrop-blur-md p-6 sm:p-8 shadow-xl text-[#0B0F0D] hover:border-[#2E5A44]/40 transition-colors duration-500"
          : ""
      } ${className}`.trim()}
    >
      {highlight && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.15, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.3 }}
          className="absolute inset-0 bg-radial from-[#C5B083]/20 via-transparent to-transparent pointer-events-none"
        />
      )}
      {children}
    </motion.div>
  );
};

interface KairosMaskedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * KairosMaskedText Component
 * Masked reveal animation where text emerges smoothly from an invisible container boundary
 * with forward visual momentum.
 */
export const KairosMaskedText: React.FC<KairosMaskedTextProps> = ({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", opacity: 0, scale: 0.98 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface KairosStaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * KairosStaggerContainer Component
 * Coordinates sequential, staggered reveals for lists, features, or triptych cards.
 */
export const KairosStaggerContainer: React.FC<KairosStaggerContainerProps> = ({
  children,
  className = "",
  staggerDelay = 0.12,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const kairosChildVariant: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};
