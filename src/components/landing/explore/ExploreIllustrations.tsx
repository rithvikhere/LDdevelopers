"use client";

import React, { useId } from "react";
import Image from "next/image";
import { motion, type Transition, type Variants } from "framer-motion";

/**
 * Hand-drawn illustrations for the Explore bento cards.
 *
 * Every illustration listens to the card's "rest" / "hover" variants (inherited from the card link),
 * so hovering, focusing or tapping a card makes its object do one small, meaningful bounce:
 *   About        → the keystone drops into its arch
 *   Services     → a house, a villa and a tower rise one after another
 *   Construction → a block drops onto the plot
 *   Gallery      → the prints fan out
 *   Achievements → the medal swings on its ribbon
 * All purely decorative (aria-hidden); reduced motion is handled by the surrounding MotionConfig.
 */

// One shared bounce rhythm: up, land, small rebound, settle.
const bounce = (delay = 0, duration = 0.8): Transition => ({
  duration,
  delay,
  ease: "easeOut",
  times: [0, 0.3, 0.56, 0.78, 1],
});

const hop = (height: number, delay = 0): Variants => ({
  rest: { y: 0 },
  hover: { y: [0, -height, 0, -height * 0.3, 0], transition: bounce(delay) },
});

// Ground shadow that shrinks while its object is in the air.
const shadow = (delay = 0): Variants => ({
  rest: { scaleX: 1, opacity: 1 },
  hover: { scaleX: [1, 0.78, 1, 0.93, 1], opacity: [1, 0.55, 1, 0.85, 1], transition: bounce(delay) },
});

// The whole object grows a touch inside its card.
const lift: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

/** SVG ids must be unique per instance and safe inside url(#…). */
const useSvgId = (name: string) => `${name}-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Path for one arch stone (voussoir) between two angles (degrees; 180 = left, 0 = right). */
const voussoir = (a0: number, a1: number, inner: number, outer: number, cx: number, cy: number) => {
  const pt = (a: number, r: number) => [r2(cx + r * Math.cos((a * Math.PI) / 180)), r2(cy - r * Math.sin((a * Math.PI) / 180))];
  const [x0, y0] = pt(a0, outer);
  const [x1, y1] = pt(a1, outer);
  const [x2, y2] = pt(a1, inner);
  const [x3, y3] = pt(a0, inner);
  return `M${x0} ${y0} A${outer} ${outer} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${inner} ${inner} 0 0 0 ${x3} ${y3} Z`;
};

/* ───────────────────────────── About: stone arch + keystone ───────────────────────────── */

export const KeystoneArch: React.FC<{ className?: string }> = ({ className }) => {
  const stone = useSvgId("stone");
  const pillar = useSvgId("pillar");
  const gold = useSvgId("gold");
  const cx = 130;
  const cy = 122;
  const inner = 48;
  const outer = 88;
  const count = 7;
  const gap = 1.8;
  const span = (180 - gap * (count - 1)) / count;
  const stones = Array.from({ length: count }, (_, i) => {
    const a0 = 180 - i * (span + gap);
    return { i, a0, a1: a0 - span };
  });
  const key = stones[3];

  return (
    <motion.svg viewBox="0 0 260 236" className={className} variants={lift} aria-hidden="true">
      <defs>
        <linearGradient id={stone} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E2DED2" />
        </linearGradient>
        <linearGradient id={pillar} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.65" stopColor="#ECE8DE" />
          <stop offset="1" stopColor="#D5D0C2" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4DA93" />
          <stop offset="1" stopColor="#BF8F2E" />
        </linearGradient>
      </defs>

      <motion.ellipse cx="130" cy="224" rx="100" ry="8" fill="#212121" fillOpacity="0.16" variants={shadow(0.05)} />

      <motion.g variants={hop(5)}>
        {/* Piers: capital, shaft, plinth */}
        {[42, 178].map((x) => (
          <g key={x}>
            <rect x={x - 6} y={122} width={52} height={10} rx={2} fill={`url(#${stone})`} stroke="#212121" strokeOpacity="0.1" />
            <rect x={x} y={132} width={40} height={74} fill={`url(#${pillar})`} stroke="#212121" strokeOpacity="0.1" />
            <rect x={x - 8} y={206} width={56} height={12} rx={2} fill="#DCD7CA" stroke="#212121" strokeOpacity="0.1" />
          </g>
        ))}

        {/* Arch stones (the keystone is drawn separately so it can drop in) */}
        {stones
          .filter((s) => s.i !== key.i)
          .map((s) => (
            <path
              key={s.i}
              d={voussoir(s.a0, s.a1, inner, outer, cx, cy)}
              fill={`url(#${stone})`}
              stroke="#212121"
              strokeOpacity="0.12"
            />
          ))}
      </motion.g>

      {/* Keystone — gold, slightly proud of the arch */}
      <motion.g variants={hop(22, 0.04)}>
        <path
          d={voussoir(key.a0 + 0.6, key.a1 - 0.6, inner - 5, outer + 12, cx, cy)}
          fill={`url(#${gold})`}
          stroke="#7A5A17"
          strokeOpacity="0.35"
        />
        <path d={`M${cx - 7} ${cy - outer + 2} L${cx + 7} ${cy - outer + 2}`} stroke="#7A5A17" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
};

/** Large faint drafting ring behind the About card's arch — turns a little on hover. */
export const DraftingRing: React.FC<{ className?: string }> = ({ className }) => (
  <motion.svg
    viewBox="0 0 400 400"
    className={className}
    aria-hidden="true"
    variants={{
      rest: { rotate: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
      hover: { rotate: 30, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } },
    }}
  >
    <g fill="none" stroke="#212121" strokeOpacity="0.09">
      <circle cx="200" cy="200" r="196" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="150" strokeWidth="1" />
      <circle cx="200" cy="200" r="70" strokeWidth="1" strokeDasharray="3 6" />
      {Array.from({ length: 72 }, (_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const long = i % 6 === 0;
        const r0 = long ? 170 : 182;
        return (
          <line
            key={i}
            x1={r2(200 + r0 * Math.cos(a))}
            y1={r2(200 + r0 * Math.sin(a))}
            x2={r2(200 + 196 * Math.cos(a))}
            y2={r2(200 + 196 * Math.sin(a))}
            strokeWidth={long ? 1.5 : 1}
          />
        );
      })}
      <line x1="4" y1="200" x2="396" y2="200" strokeWidth="1" />
      <line x1="200" y1="4" x2="200" y2="396" strokeWidth="1" />
    </g>
  </motion.svg>
);

/* ───────────────────────────── Services: house · villa · tower ───────────────────────────── */

export const BuildingTrio: React.FC<{ className?: string }> = ({ className }) => {
  const front = useSvgId("front");
  const side = useSvgId("side");
  const lit = "#F2C14E";
  const dark = "#1E4A31";
  const d = { x: 18, y: -10 }; // depth offset for side and roof faces

  const windowsGrid = (x0: number, y0: number, cols: number, rows: number, w: number, h: number, gx: number, gy: number, litMap: string) =>
    Array.from({ length: cols * rows }, (_, k) => {
      const c = k % cols;
      const r = Math.floor(k / cols);
      return (
        <rect
          key={k}
          x={x0 + c * (w + gx)}
          y={y0 + r * (h + gy)}
          width={w}
          height={h}
          rx={1.5}
          fill={litMap[k % litMap.length] === "1" ? lit : dark}
        />
      );
    });

  return (
    <motion.svg viewBox="0 0 320 206" className={className} variants={lift} aria-hidden="true">
      <defs>
        <linearGradient id={front} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5FBF2" />
          <stop offset="1" stopColor="#D3ECCD" />
        </linearGradient>
        <linearGradient id={side} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9CBA0" />
          <stop offset="1" stopColor="#87B07C" />
        </linearGradient>
      </defs>

      <motion.ellipse cx="164" cy="194" rx="150" ry="8" fill="#000000" fillOpacity="0.3" variants={shadow(0.07)} />

      {/* House — gabled */}
      <motion.g variants={hop(12, 0)}>
        <polygon points={`98,118 ${98 + d.x},${118 + d.y} ${98 + d.x},${188 + d.y} 98,188`} fill={`url(#${side})`} />
        <polygon points={`58,80 ${58 + d.x},${80 + d.y} ${104 + d.x},${120 + d.y} 104,120`} fill="#9DBF93" />
        <rect x="18" y="118" width="80" height="70" fill={`url(#${front})`} />
        <polygon points="12,120 58,80 104,120" fill="#CADCAE" stroke="#14532D" strokeOpacity="0.15" />
        <rect x="50" y="150" width="16" height="38" rx="2" fill={dark} />
        <rect x="28" y="134" width="14" height="14" rx="1.5" fill={lit} />
        <rect x="74" y="134" width="14" height="14" rx="1.5" fill={lit} />
      </motion.g>

      {/* Villa — two storeys, flat roof */}
      <motion.g variants={hop(12, 0.07)}>
        <polygon points={`214,106 ${214 + d.x},${106 + d.y} ${214 + d.x},${188 + d.y} 214,188`} fill={`url(#${side})`} />
        <polygon points={`116,100 ${116 + d.x},${100 + d.y} ${218 + d.x},${100 + d.y} 218,100`} fill="#BBD6B2" />
        <rect x="116" y="100" width="102" height="8" fill="#E3F2DE" />
        <rect x="120" y="108" width="94" height="80" fill={`url(#${front})`} />
        {windowsGrid(130, 118, 3, 2, 18, 16, 10, 12, "101110")}
        <rect x="158" y="164" width="18" height="24" rx="2" fill={dark} />
      </motion.g>

      {/* Tower */}
      <motion.g variants={hop(12, 0.14)}>
        <polygon points={`290,42 ${290 + d.x * 0.9},${42 + d.y * 0.9} ${290 + d.x * 0.9},${188 + d.y * 0.9} 290,188`} fill={`url(#${side})`} />
        <polygon points={`236,42 ${236 + d.x * 0.9},${42 + d.y * 0.9} ${290 + d.x * 0.9},${42 + d.y * 0.9} 290,42`} fill="#BBD6B2" />
        <rect x="236" y="42" width="54" height="146" fill={`url(#${front})`} />
        {windowsGrid(245, 54, 3, 8, 9, 10, 5, 6, "110101011")}
      </motion.g>
    </motion.svg>
  );
};

/* ───────────────────────────── Construction Options: plot + blocks ───────────────────────────── */

type Iso = { x: number; y: number; w: number; h: number; H: number };
const isoFaces = ({ x, y, w, h, H }: Iso) => ({
  top: `${x},${y - h} ${x + w},${y} ${x},${y + h} ${x - w},${y}`,
  left: `${x - w},${y} ${x},${y + h} ${x},${y + h + H} ${x - w},${y + H}`,
  right: `${x},${y + h} ${x + w},${y} ${x + w},${y + H} ${x},${y + h + H}`,
});

const Block: React.FC<{ at: Iso; tone: "cream" | "ink" }> = ({ at, tone }) => {
  const f = isoFaces(at);
  const c = tone === "cream" ? ["#FFFDF9", "#F5E2CE", "#E9C9A6"] : ["#3D3D3D", "#2B2B2B", "#1C1C1C"];
  return (
    <g stroke={tone === "cream" ? "#7A3F0A" : "#000000"} strokeOpacity="0.18" strokeLinejoin="round">
      <polygon points={f.left} fill={c[1]} />
      <polygon points={f.right} fill={c[2]} />
      <polygon points={f.top} fill={c[0]} />
    </g>
  );
};

export const PlotBlocks: React.FC<{ className?: string }> = ({ className }) => {
  const tile = useSvgId("tile");
  const L = [24, 150];
  const T = [120, 102];
  const R = [216, 150];
  const B = [120, 198];
  const lerp = (p: number[], q: number[], t: number) => [r2(p[0] + (q[0] - p[0]) * t), r2(p[1] + (q[1] - p[1]) * t)];
  const grid = [1, 2, 3].flatMap((i) => {
    const t = i / 4;
    const a1 = lerp(L, B, t);
    const a2 = lerp(T, R, t);
    const b1 = lerp(L, T, t);
    const b2 = lerp(B, R, t);
    return [
      <line key={`a${i}`} x1={a1[0]} y1={a1[1]} x2={a2[0]} y2={a2[1]} />,
      <line key={`b${i}`} x1={b1[0]} y1={b1[1]} x2={b2[0]} y2={b2[1]} />,
    ];
  });

  const base = { w: 24, h: 12, H: 28 };

  return (
    <motion.svg viewBox="0 0 240 214" className={className} variants={lift} aria-hidden="true">
      <defs>
        <linearGradient id={tile} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF5EA" />
          <stop offset="1" stopColor="#FBE2C8" />
        </linearGradient>
      </defs>

      {/* Plot slab */}
      <polygon points={`${L} ${B} ${B[0]},${B[1] + 10} ${L[0]},${L[1] + 10}`} fill="#C9600D" />
      <polygon points={`${B} ${R} ${R[0]},${R[1] + 10} ${B[0]},${B[1] + 10}`} fill="#B5560B" />
      <polygon points={`${L} ${T} ${R} ${B}`} fill={`url(#${tile})`} />
      <g stroke="#212121" strokeOpacity="0.14" strokeDasharray="3 4">
        {grid}
      </g>

      {/* A small tree that sways */}
      <motion.g
        style={{ transformOrigin: "176px 140px" }}
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: [0, -7, 5, -2, 0], transition: bounce(0.12, 0.9) },
        }}
      >
        <rect x="174" y="118" width="4" height="22" rx="2" fill="#5B3A1A" />
        <circle cx="176" cy="110" r="15" fill="#14532D" />
        <circle cx="170" cy="105" r="6" fill="#1F6B3D" />
      </motion.g>

      {/* Blocks (painted back to front) */}
      <motion.g variants={hop(6, 0.1)}>
        <Block at={{ x: 100, y: 140, ...base }} tone="cream" />
      </motion.g>
      <motion.g variants={hop(32, 0)}>
        <Block at={{ x: 100, y: 112, ...base }} tone="cream" />
      </motion.g>
      <motion.g variants={hop(8, 0.16)}>
        <Block at={{ x: 146, y: 158, ...base, H: 22 }} tone="ink" />
      </motion.g>
    </motion.svg>
  );
};

/* ───────────────────────────── Gallery: three prints of the house ───────────────────────────── */

const prints = [
  // dawn — left, behind
  { sky: "linear-gradient(180deg,#F6DCB6 0%,#EDB487 100%)", rest: { rotate: -11, x: -56 }, hover: { rotate: -17, x: -74 }, zoom: 1.9, focus: "18% 72%", tint: "saturate(1.05)", delay: 0.06 },
  // dusk — right, behind
  { sky: "linear-gradient(180deg,#2E3A48 0%,#5B6C80 100%)", rest: { rotate: 10, x: 56 }, hover: { rotate: 16, x: 74 }, zoom: 1.75, focus: "86% 70%", tint: "brightness(0.8) saturate(0.85)", delay: 0.1 },
  // daylight — centre, in front
  { sky: "linear-gradient(180deg,#E6F0DF 0%,#BDD7E3 100%)", rest: { rotate: -1.5, x: 0 }, hover: { rotate: 0, x: 0 }, zoom: 1.08, focus: "50% 100%", tint: "none", delay: 0 },
];

export const GalleryPrints: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} aria-hidden="true">
    {prints.map((p, i) => (
      <motion.div
        key={i}
        className="absolute top-[4%] left-1/2 w-[min(46%,168px)] ml-[calc(min(46%,168px)*-0.5)]"
        variants={{
          rest: { ...p.rest, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
          hover: {
            ...p.hover,
            y: [0, -14, 0, -4, 0],
            transition: { rotate: { type: "spring", stiffness: 260, damping: 16 }, x: { type: "spring", stiffness: 260, damping: 16 }, y: bounce(p.delay) },
          },
        }}
      >
        <div className="rounded-[6px] bg-[#FBFBF8] p-2 pb-7 shadow-[0_22px_40px_-14px_rgba(0,0,0,0.65)]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]" style={{ background: p.sky }}>
            <Image
              src="/assets/images/hero-house.webp"
              alt=""
              fill
              sizes="170px"
              className="object-contain object-bottom"
              style={{ transform: `scale(${p.zoom})`, transformOrigin: p.focus, filter: p.tint }}
            />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ───────────────────────────── Achievements: medal on a ribbon ───────────────────────────── */

export const Rosette: React.FC<{ className?: string }> = ({ className }) => {
  const gold = useSvgId("medal");
  const star = Array.from({ length: 10 }, (_, k) => {
    const r = k % 2 === 0 ? 16 : 7;
    const a = (-90 + k * 36) * (Math.PI / 180);
    return `${r2(100 + r * Math.cos(a))},${r2(150 + r * Math.sin(a))}`;
  }).join(" ");
  // Laurel: leaves along the lower-left arc, mirrored to the right, each tilted along the arc
  const leaves = [100, 118, 136, 154, 172, 190, 208].flatMap((deg) => {
    const a = (deg * Math.PI) / 180;
    const lx = 100 + 29 * Math.cos(a);
    const ly = 150 + 29 * Math.sin(a);
    return [
      { x: r2(lx), y: r2(ly), rot: r2(deg + 25) },
      { x: r2(200 - lx), y: r2(ly), rot: r2(-(deg + 25)) },
    ];
  });

  return (
    <motion.svg viewBox="0 0 200 232" className={className} variants={lift} aria-hidden="true">
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6DE9A" />
          <stop offset="0.55" stopColor="#D9AE4C" />
          <stop offset="1" stopColor="#A87A22" />
        </linearGradient>
      </defs>

      <motion.ellipse cx="100" cy="220" rx="48" ry="6" fill="#212121" fillOpacity="0.2" variants={shadow(0.02)} />

      <motion.g
        style={{ transformOrigin: "100px 0px" }}
        variants={{
          rest: { rotate: 0, y: 0 },
          hover: { rotate: [0, -9, 7, -3, 0], y: [0, -6, 0, -2, 0], transition: bounce(0, 1) },
        }}
      >
        {/* Ribbon straps, hanging from the card's top edge */}
        <polygon points="56,-4 92,-4 114,112 86,118" fill="#14532D" />
        <polygon points="70,-4 78,-4 101,114 93,115" fill="#D3ECCD" opacity="0.85" />
        <polygon points="108,-4 144,-4 114,118 86,112" fill="#0F4426" />
        <polygon points="122,-4 130,-4 107,115 99,114" fill="#D3ECCD" opacity="0.7" />

        {/* Medal */}
        <circle cx="100" cy="150" r="50" fill="#14532D" />
        <circle cx="100" cy="150" r="43" fill={`url(#${gold})`} />
        <circle cx="100" cy="150" r="35" fill="none" stroke="#7A5A17" strokeOpacity="0.45" strokeWidth="1.5" />
        {leaves.map((l, k) => (
          <ellipse key={k} cx={l.x} cy={l.y} rx="3" ry="6.5" transform={`rotate(${l.rot} ${l.x} ${l.y})`} fill="#7A5A17" opacity="0.5" />
        ))}
        <polygon points={star} fill="#14532D" />
        <ellipse cx="86" cy="128" rx="12" ry="5" transform="rotate(-30 86 128)" fill="#FFFFFF" opacity="0.35" />
      </motion.g>
    </motion.svg>
  );
};
