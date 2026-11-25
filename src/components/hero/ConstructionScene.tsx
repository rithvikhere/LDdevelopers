"use client";

import React, { useEffect, useRef } from "react";
import s from "./ConstructionScene.module.css";
import { VIEW_H, VIEW_W, sx, sy } from "./construction/geometry";
import { Defs } from "./construction/defs";
import { Crane } from "./construction/crane";
import { Buildings, ScaffoldFrontRail } from "./construction/buildings";
import { Cones, GroundProps, Mixer, Pad, Tripod } from "./construction/props";
import {
  Banksman,
  Carpenter,
  Handler,
  Labourer,
  Mason,
  Plasterer,
  Supervisor,
  Surveyor,
} from "./construction/workers";

/**
 * ConstructionScene — the hero's ambient illustration: a 3-storey and a 4-storey block mid-construction,
 * a tower crane running a pick-and-place lift behind them, and an eight-strong crew of miniature
 * figurine workers. Inline SVG + CSS keyframes (ConstructionScene.module.css), seamless 12s loop,
 * transparent background, no raster images.
 *
 * Rendered as three stacked SVG layers sharing one viewBox, so only what moves repaints each frame:
 *   1. back   — site floor (merges into the Explore panel) + crane (animated lift), hidden behind the buildings when lowered
 *   2. middle — the buildings, scaffold and ground materials (static, painted once)
 *   3. front  — the crew, the glass glint, mixer and cones (animated)
 *
 * The buildings never change during the loop (nothing built is ever taken away) — only the crew works.
 *
 * The loop pauses while the scene is off-screen; prefers-reduced-motion shows the static scene.
 */

/** A soft glint crossing building A's first-floor glazing once per loop. */
function GlassSweep() {
  const z = 170;
  return (
    <g>
      <defs>
        <clipPath id="lcs-glass-clip">
          <rect x={sx(135, z)} y={sy(179, z)} width={42} height={62} />
          <rect x={sx(197, z)} y={sy(179, z)} width={42} height={62} />
        </clipPath>
      </defs>
      <g clipPath="url(#lcs-glass-clip)">
        <polygon className={s.glassSweep} points="200,482 222,482 192,560 170,560" fill="#fff" opacity={0.34} />
      </g>
    </g>
  );
}

export function ConstructionScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Pause the loop while the scene is off-screen (no per-frame React work — CSS does the animating).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const viewBox = `0 0 ${VIEW_W} ${VIEW_H}`;

  return (
    <div ref={ref} id="construction-scene" className={`${s.root} ${className}`} aria-hidden="true">
      {/* 1 — back: site floor + crane */}
      <svg viewBox={viewBox} className={s.layer} focusable="false">
        <Defs />
        <Pad />
        <Crane />
      </svg>

      {/* 2 — middle: buildings + materials (static) */}
      <svg viewBox={viewBox} className={`${s.layer} ${s.overlay}`} focusable="false">
        <Buildings />
        <GroundProps />
      </svg>

      {/* 3 — front: the crew and everything else that moves, back to front */}
      <svg viewBox={viewBox} className={`${s.layer} ${s.overlay}`} focusable="false">
        <GlassSweep />
        <Plasterer />
        <ScaffoldFrontRail />
        <Carpenter />
        <Banksman />
        <Mason />
        <Supervisor />
        <Labourer />
        <Mixer x={430} z={60} />
        <Tripod x={150} z={54} />
        <Surveyor />
        <Handler />
        <Cones />
      </svg>
    </div>
  );
}
