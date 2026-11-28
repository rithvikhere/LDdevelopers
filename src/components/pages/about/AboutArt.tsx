import React from "react";

/**
 * Line drawings for the About page (decorative, hidden from screen readers). They draw in currentColor,
 * so the colour and opacity come from the parent's text classes.
 */

type Building = { x: number; w: number; h: number };

const ROW = 6; // floor-line spacing in the low-rise skyline

/** A wide, low skyline of small blocks with floor lines (used along the bottom of the goal card). */
export const LowSkyline: React.FC<{ className?: string }> = ({ className = "" }) => {
  const ground = 68;
  const blocks: Building[] = [
    { x: 6, w: 18, h: 26 },
    { x: 26, w: 14, h: 40 },
    { x: 42, w: 22, h: 22 },
    { x: 66, w: 16, h: 52 },
    { x: 84, w: 24, h: 32 },
    { x: 110, w: 12, h: 60 },
    { x: 124, w: 20, h: 36 },
    { x: 146, w: 26, h: 26 },
    { x: 174, w: 14, h: 46 },
    { x: 190, w: 22, h: 30 },
    { x: 214, w: 18, h: 20 },
  ];
  return (
    <svg viewBox="0 0 240 72" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden="true" className={className}>
      {blocks.map(({ x, w, h }) => (
        <g key={x}>
          <rect x={x} y={ground - h} width={w} height={h} vectorEffect="non-scaling-stroke" />
          {Array.from({ length: Math.floor((h - 6) / ROW) }, (_, i) => (
            <line
              key={i}
              x1={x + 3}
              x2={x + w - 3}
              y1={ground - h + 6 + i * ROW}
              y2={ground - h + 6 + i * ROW}
              strokeOpacity={0.55}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      ))}
      <line x1={0} x2={240} y1={ground} y2={ground} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

/** Three glass towers, a low block and two trees (the vision & mission band). */
export const TowerSkyline: React.FC<{ className?: string }> = ({ className = "" }) => {
  const g = 196; // ground line
  const tower = (x: number, w: number, h: number, cols: number) => {
    const top = g - h;
    const floors = Math.floor((h - 10) / 11);
    return (
      <g key={x}>
        <rect x={x} y={top} width={w} height={h} vectorEffect="non-scaling-stroke" />
        {/* mullions */}
        {Array.from({ length: cols - 1 }, (_, i) => (
          <line
            key={`c${i}`}
            x1={x + ((i + 1) * w) / cols}
            x2={x + ((i + 1) * w) / cols}
            y1={top + 6}
            y2={g}
            strokeOpacity={0.6}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* floor lines */}
        {Array.from({ length: floors }, (_, i) => (
          <line
            key={`f${i}`}
            x1={x}
            x2={x + w}
            y1={top + 10 + i * 11}
            y2={top + 10 + i * 11}
            strokeOpacity={0.45}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    );
  };
  const tree = (cx: number, r: number) => (
    <g key={cx}>
      <line x1={cx} x2={cx} y1={g} y2={g - r * 1.4} vectorEffect="non-scaling-stroke" />
      <circle cx={cx} cy={g - r * 2.2} r={r} vectorEffect="non-scaling-stroke" />
      <path d={`M${cx} ${g - r * 1.2} l${-r * 0.45} ${-r * 0.55} M${cx} ${g - r * 1.55} l${r * 0.4} ${-r * 0.45}`} vectorEffect="non-scaling-stroke" />
    </g>
  );
  return (
    <svg viewBox="0 0 270 200" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" aria-hidden="true" className={className}>
      {tower(22, 44, 72, 3)}
      {tower(70, 48, 150, 4)}
      {/* stepped crown on the tallest tower */}
      <path d="M126 32 v-8 h28 v8" vectorEffect="non-scaling-stroke" />
      {tower(122, 36, 164, 3)}
      {tower(162, 50, 118, 4)}
      {tree(10, 9)}
      {tree(232, 12)}
      {tree(254, 8)}
      <line x1={0} x2={270} y1={g} y2={g} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

/**
 * Stand-in for the founder's portrait until the real photo is supplied: a quiet head-and-shoulders figure in a
 * suit, drawn in the same 400×500 box as the portrait frame so the head rises above the drawing sheet.
 */
export const PortraitPlaceholder: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 400 500" aria-hidden="true" className={className}>
    <defs>
      <linearGradient id="about-bust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B4C59B" />
        <stop offset="1" stopColor="#9DB183" />
      </linearGradient>
    </defs>
    {/* neck (runs down under the collar) */}
    <path d="M178 190 V266 H222 V190 Z" fill="#A9BC8F" />
    {/* head */}
    <ellipse cx={200} cy={140} rx={57} ry={70} fill="url(#about-bust)" />
    {/* jacket */}
    <path d="M28 500 C32 350 88 282 172 260 L200 296 L228 260 C312 282 368 350 372 500 Z" fill="url(#about-bust)" />
    {/* shirt */}
    <path d="M172 260 L200 296 L228 260 L214 252 L200 270 L186 252 Z" fill="#EDF2E5" />
    {/* lapels */}
    <path d="M172 260 L200 296 L182 392 L136 282 Z" fill="#C3D1AD" />
    <path d="M228 260 L200 296 L218 392 L264 282 Z" fill="#C3D1AD" />
  </svg>
);
