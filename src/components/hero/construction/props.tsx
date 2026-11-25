import React from "react";
import s from "../ConstructionScene.module.css";
import { Box, Contact, EDGE, FIGURE_SCALE, KX, KY, Top, VIEW_H, VIEW_W, poly, r1, sx, sy, url } from "./geometry";

/**
 * The site floor — the Explore panel's own dark surface (#212121) rising into a raised platform the
 * buildings stand on (it echoes the panel's raised "Explore" tab on the left).
 * It is deliberately oversized: it runs off past the right edge and well below the SVG's bottom edge, so it
 * fills the panel's rounded corner and (on phones/tablets) the gap above the panel — nothing floats.
 */
export function Pad() {
  const backY = sy(0, 360); // the floor's back edge (horizon)
  const backLeftX = sx(20, 360);
  const bottom = VIEW_H + 200; // hidden behind the Explore panel
  const run = (bottom - backY) * (KX / KY); // the left edge keeps the projection's 30° slope
  return (
    <g>
      <polygon
        points={`${backLeftX},${backY} ${VIEW_W + 400},${backY} ${VIEW_W + 400},${bottom} ${r1(backLeftX - run)},${bottom}`}
        fill={url("floor")}
      />
      {/* faint setting-out lines, in the hero grid's mint */}
      <g stroke="#D3ECCD" strokeOpacity={0.14} strokeWidth={0.8} strokeDasharray="5 5">
        <line x1={sx(20, 20)} y1={sy(0, 20)} x2={sx(800, 20)} y2={sy(0, 20)} />
        <line x1={sx(436, 0)} y1={sy(0, 0)} x2={sx(436, 360)} y2={sy(0, 360)} />
      </g>
    </g>
  );
}

function BrickPallet({ x, z }: { x: number; z: number }) {
  return (
    <g>
      <Contact x={x + 25} z={z + 15} rx={36} ry={4.5} />
      <Box x0={x} x1={x + 52} y0={0} y1={5} z0={z} z1={z + 32} front="#B48D5E" side="#9A7650" top="#C49C6C" />
      <Box x0={x + 2} x1={x + 50} y0={5} y1={32} z0={z + 2} z1={z + 30} front={url("brickPat")} side={url("brickSidePat")} top="#C98C6B" />
    </g>
  );
}

function CementBags({ x, z }: { x: number; z: number }) {
  return (
    <g>
      <Contact x={x + 24} z={z + 12} rx={30} ry={4} />
      <rect x={sx(x, z)} y={sy(12, z)} width={50} height={12} rx={5} fill="#DCD5C2" {...EDGE} />
      <polygon points={poly([x + 2, 12, z], [x + 48, 12, z], [x + 54, 12, z + 24], [x + 8, 12, z + 24])} fill="#E6E0CF" {...EDGE} />
      <rect x={sx(x + 5, z + 6)} y={sy(23, z + 6)} width={46} height={11} rx={5} fill="#D6CFBB" {...EDGE} />
      <polygon points={poly([x + 7, 23, z + 6], [x + 49, 23, z + 6], [x + 54, 23, z + 26], [x + 12, 23, z + 26])} fill="#E4DECC" {...EDGE} />
      <rect x={sx(x + 17, z + 6)} y={sy(21, z + 6)} width={14} height={7} rx={1} fill="#B77B5B" opacity={0.7} />
      <rect x={sx(x + 13, z)} y={sy(10, z)} width={14} height={7} rx={1} fill="#B77B5B" opacity={0.6} />
    </g>
  );
}

function RebarBundle() {
  const bars = [
    [4, 132],
    [4, 136],
    [4, 140],
    [7.5, 134],
    [7.5, 138],
    [11, 136],
  ];
  return (
    <g>
      <Contact x={64} z={137} rx={46} ry={4} />
      <Box x0={34} x1={42} y0={0} y1={4} z0={126} z1={148} front="#B48D5E" side="#9A7650" top="#C49C6C" />
      <Box x0={86} x1={94} y0={0} y1={4} z0={126} z1={148} front="#B48D5E" side="#9A7650" top="#C49C6C" />
      {bars.map(([y, z]) => (
        <line key={`${y}-${z}`} x1={sx(24, z)} y1={sy(y, z)} x2={sx(108, z)} y2={sy(y, z)} stroke="#8C5E3C" strokeWidth={2} strokeLinecap="round" />
      ))}
      <line x1={sx(24, 132)} y1={sy(12.2, 132)} x2={sx(108, 132)} y2={sy(12.2, 132)} stroke="#B98463" strokeWidth={0.8} strokeOpacity={0.7} />
    </g>
  );
}

function SandPile({ x, z }: { x: number; z: number }) {
  const cx = sx(x, z);
  const cy = sy(0, z);
  return (
    <g>
      <ellipse cx={cx} cy={cy + 1} rx={38} ry={6} fill={url("contact")} />
      <path d={`M${cx - 36},${cy} Q${cx - 20},${cy - 28} ${cx - 2},${cy - 30} Q${cx + 18},${cy - 26} ${cx + 36},${cy} Z`} fill={url("sand")} {...EDGE} />
      <path d={`M${cx - 12},${cy - 22} Q${cx - 2},${cy - 27} ${cx + 8},${cy - 23}`} stroke="#fff" strokeOpacity={0.3} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <g fill="#A88F60" opacity={0.6}>
        <circle cx={cx + 10} cy={cy - 8} r={0.8} />
        <circle cx={cx - 16} cy={cy - 6} r={0.7} />
        <circle cx={cx + 22} cy={cy - 4} r={0.7} />
      </g>
    </g>
  );
}

function Wheelbarrow({ x, z }: { x: number; z: number }) {
  const ox = sx(x, z);
  const oy = sy(0, z);
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <ellipse cx={20} cy={1} rx={32} ry={4} fill={url("contact")} />
      {/* legs + handles */}
      <path d="M30,0 L34,-14 M44,-1 L42,-14" stroke="#3A3935" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M8,-20 L62,-26" stroke="#3A3935" strokeWidth={2.4} strokeLinecap="round" />
      {/* tray with sand */}
      <path d="M-4,-30 L46,-32 L40,-14 L6,-12 Z" fill="#5E7A72" {...EDGE} />
      <path d="M-4,-30 Q20,-40 46,-32 L44,-29 Q20,-34 -2,-27 Z" fill={url("sand")} />
      <path d="M2,-24 L40,-25" stroke="#fff" strokeOpacity={0.18} strokeWidth={1} />
      {/* wheel */}
      <circle cx={2} cy={-6} r={6} fill="#2E2D2A" {...EDGE} />
      <circle cx={2} cy={-6} r={2} fill="#8F9089" />
    </g>
  );
}

/** The half-built boundary wall the mason is laying (stepped courses, fresh mortar bed). */
function MasonWall() {
  const steps: [number, number, number][] = [
    [740, 764, 48],
    [764, 784, 40],
    [784, 800, 24],
  ];
  return (
    <g>
      <Contact x={770} z={108} rx={44} ry={4.6} />
      {steps.map(([x0, x1, h]) => (
        <Box key={x0} x0={x0} x1={x1} y0={0} y1={h} z0={100} z1={114} front={url("brickPat")} side={url("brickSidePat")} top="#C9A88A" />
      ))}
      <Top x0={740} x1={764} y={48} z0={100} z1={114} fill="#D9D2C2" />
      {/* mortar tub */}
      <Contact x={724} z={118} rx={14} ry={3.2} />
      <path d={`M${sx(714, 118)},${sy(13, 118)} L${sx(716, 118) + 2},${sy(0, 118)} L${sx(734, 118) - 2},${sy(0, 118)} L${sx(736, 118)},${sy(13, 118)} Z`} fill="#3A3935" {...EDGE} />
      <ellipse cx={(sx(714, 118) + sx(736, 118)) / 2} cy={sy(13, 118)} rx={11} ry={3.2} fill="#BDB8AA" {...EDGE} />
    </g>
  );
}

/** Static ground props (drawn in the building layer). */
export function GroundProps() {
  return (
    <g id="construction-materials">
      <RebarBundle />
      <MasonWall />
      <CementBags x={356} z={96} />
      <BrickPallet x={296} z={70} />
      <SandPile x={520} z={86} />
      <Wheelbarrow x={604} z={96} />
    </g>
  );
}

/** Surveyor's level on a tripod (drawn just before the surveyor so his hand rests on the knob). */
export function Tripod({ x, z }: { x: number; z: number }) {
  const ox = sx(x, z);
  const oy = sy(0, z);
  return (
    <g transform={`translate(${ox} ${oy}) scale(${FIGURE_SCALE})`}>
      <ellipse cx={0} cy={1} rx={16} ry={3} fill={url("contact")} />
      <path d="M1,-92 L-12,0 M1,-92 L13,0 M1,-92 L3,-2" stroke="#B48D5E" strokeWidth={2} strokeLinecap="round" />
      <rect x={-5} y={-96} width={12} height={4} rx={1} fill="#3A3935" />
      <rect x={-11} y={-110} width={22} height={13} rx={3} fill={url("craneCab")} {...EDGE} />
      <rect x={10} y={-107} width={8} height={7} rx={1.4} fill="#3A3935" />
      <circle cx={18.4} cy={-103.5} r={2.2} fill={url("glass")} stroke="#292929" strokeWidth={0.8} />
      <rect x={-14} y={-106} width={4} height={5} rx={1} fill="#3A3935" />
      <circle cx={-2} cy={-98.5} r={1.6} fill="#5A5953" />
    </g>
  );
}

/** Drum mixer — the drum's spiral fins travel along it so it reads as turning. */
export function Mixer({ x, z }: { x: number; z: number }) {
  const ox = sx(x, z);
  const oy = sy(0, z);
  const drum = "M-24,-10 Q-26,2 -24,13 L12,17 Q22,11 24,1 Q22,-9 12,-15 Z";
  return (
    <g transform={`translate(${ox} ${oy})`}>
      <ellipse cx={4} cy={1} rx={30} ry={4.4} fill={url("contact")} />
      {/* stand + wheels */}
      <path d="M-14,-2 L-6,-22 M14,-2 L8,-22 M-10,-22 L12,-22" stroke="#3A3935" strokeWidth={2.4} strokeLinecap="round" fill="none" />
      <circle cx={-16} cy={-5} r={5.4} fill="#2E2D2A" {...EDGE} />
      <circle cx={-16} cy={-5} r={1.8} fill="#8F9089" />
      <rect x={-30} y={-30} width={11} height={12} rx={2} fill="#3A3935" {...EDGE} />
      {/* drum, tilted towards the viewer */}
      <g transform="translate(2 -36) rotate(-24)">
        <defs>
          <clipPath id="lcs-mixer-clip">
            <path d={drum} />
          </clipPath>
        </defs>
        <path d={drum} fill={url("mixerDrum")} {...EDGE} />
        <g clipPath="url(#lcs-mixer-clip)">
          <g className={s.mixerFins}>
            {[-56, -42, -28, -14, 0, 14, 28].map((fx) => (
              <path key={fx} d={`M${fx},-20 L${fx + 6},20`} stroke="#8F5530" strokeOpacity={0.55} strokeWidth={3} />
            ))}
          </g>
          <path d="M-22,-8 Q0,-14 20,-8" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} fill="none" />
        </g>
        <ellipse cx={22} cy={1} rx={3.6} ry={9} fill="#2E2D2A" {...EDGE} />
        <ellipse cx={22.6} cy={1} rx={2} ry={6.4} fill="#7A7A72" />
      </g>
    </g>
  );
}

/** A couple of muted traffic cones at the front edge. */
export function Cones() {
  const cone = (x: number, z: number) => {
    const ox = sx(x, z);
    const oy = sy(0, z);
    return (
      <g key={`${x}-${z}`} transform={`translate(${ox} ${oy})`}>
        <ellipse cx={0} cy={1} rx={10} ry={2.6} fill={url("contact")} />
        <path d="M-8,0 L8,0 L9,-2.6 L-9,-2.6 Z" fill="#3A3935" />
        <path d="M-6,-2.6 L-1.4,-22 L1.4,-22 L6,-2.6 Z" fill={url("cone")} {...EDGE} />
        <path d="M-4.4,-9 L4.4,-9 L3.6,-13 L-3.6,-13 Z" fill="#F1ECE0" />
      </g>
    );
  };
  return <g>{[cone(460, 10), cone(790, 14)]}</g>;
}

