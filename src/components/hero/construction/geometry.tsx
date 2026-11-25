import React from "react";

/**
 * 2.5D projection for the construction scene — cabinet oblique (depth recedes up-right at 30°, half scale).
 * World units: x along the façades, y up, z depth (0 = front edge of the site base).
 */
export const KX = 0.433; // cos 30° × ½
export const KY = 0.25; // sin 30° × ½
export const GROUND = 712; // screen y of the site base's front edge

export const VIEW_W = 1000;
export const VIEW_H = 726; // the base's front face ends exactly on the bottom edge

/** Figures are drawn ~124 units tall; at 0.8 they stand a little over one storey (96) — figurine scale. */
export const FIGURE_SCALE = 0.8;

export const r1 = (n: number) => Math.round(n * 10) / 10;
export const sx = (x: number, z: number) => r1(x + KX * z);
export const sy = (y: number, z: number) => r1(GROUND - y - KY * z);
export type V3 = [number, number, number];
export const poly = (...pts: V3[]) => pts.map(([x, y, z]) => `${sx(x, z)},${sy(y, z)}`).join(" ");
export const url = (id: string) => `url(#lcs-${id})`;

export const EDGE = {
  stroke: "#292929",
  strokeOpacity: 0.26,
  strokeWidth: 0.8,
  strokeLinejoin: "round" as const,
};

type Fill = { fill: string; edge?: boolean; opacity?: number };

/** A face on a plane of constant depth z (faces the viewer). */
export function Front({
  x0,
  x1,
  y0,
  y1,
  z,
  fill,
  edge = true,
  opacity,
  rx,
}: Fill & { x0: number; x1: number; y0: number; y1: number; z: number; rx?: number }) {
  return (
    <rect
      x={sx(x0, z)}
      y={sy(y1, z)}
      width={r1(x1 - x0)}
      height={r1(y1 - y0)}
      rx={rx}
      fill={fill}
      opacity={opacity}
      {...(edge ? EDGE : {})}
    />
  );
}

/** A face on a plane of constant x (the visible right-hand side). */
export function Side({
  x,
  y0,
  y1,
  z0,
  z1,
  fill,
  edge = true,
  opacity,
}: Fill & { x: number; y0: number; y1: number; z0: number; z1: number }) {
  return (
    <polygon
      points={poly([x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0])}
      fill={fill}
      opacity={opacity}
      {...(edge ? EDGE : {})}
    />
  );
}

/** A face on a plane of constant height y (seen from above). */
export function Top({
  x0,
  x1,
  y,
  z0,
  z1,
  fill,
  edge = true,
  opacity,
}: Fill & { x0: number; x1: number; y: number; z0: number; z1: number }) {
  return (
    <polygon
      points={poly([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1])}
      fill={fill}
      opacity={opacity}
      {...(edge ? EDGE : {})}
    />
  );
}

export type BoxProps = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
  front: string;
  side: string;
  top: string;
  id?: string;
};

/** A solid block: right side, top and front faces (painter's order). */
export function Box({ x0, x1, y0, y1, z0, z1, front, side, top, id }: BoxProps) {
  return (
    <g id={id}>
      <Side x={x1} y0={y0} y1={y1} z0={z0} z1={z1} fill={side} />
      <Top x0={x0} x1={x1} y={y1} z0={z0} z1={z1} fill={top} />
      <Front x0={x0} x1={x1} y0={y0} y1={y1} z={z0} fill={front} />
    </g>
  );
}

/** A soft contact shadow on a horizontal surface. */
export function Contact({ x, y = 0, z, rx, ry = 4.5 }: { x: number; y?: number; z: number; rx: number; ry?: number }) {
  return <ellipse cx={sx(x, z)} cy={sy(y, z)} rx={rx} ry={ry} fill={url("contact")} />;
}

/** Places a figure/prop drawn in local coordinates (origin on the ground) at a world position. */
export function Place({
  x,
  y = 0,
  z,
  mirror,
  scale = FIGURE_SCALE,
  children,
}: {
  x: number;
  y?: number;
  z: number;
  mirror?: boolean;
  scale?: number;
  children: React.ReactNode;
}) {
  const k = scale;
  return <g transform={`translate(${sx(x, z)} ${sy(y, z)}) scale(${mirror ? -k : k} ${k})`}>{children}</g>;
}

/** A framed window on a front plane, with a soft reflection. */
export function Window({
  x0,
  x1,
  y0,
  y1,
  z,
  transom,
  mullions = [],
  sill = true,
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z: number;
  transom?: number;
  mullions?: number[];
  sill?: boolean;
}) {
  const w = x1 - x0;
  return (
    <g>
      <Front x0={x0} x1={x1} y0={y0} y1={y1} z={z} fill="#292929" />
      <Front x0={x0 + 3} x1={x1 - 3} y0={y0 + 3} y1={y1 - 3} z={z} fill={url("glass")} edge={false} />
      <polygon
        points={poly([x0 + 6, y0 + 8, z], [x0 + 6 + w * 0.12, y0 + 8, z], [x0 + w * 0.62, y1 - 6, z], [x0 + w * 0.5, y1 - 6, z])}
        fill="#fff"
        opacity={0.13}
      />
      {transom !== undefined && (
        <line x1={sx(x0 + 3, z)} y1={sy(transom, z)} x2={sx(x1 - 3, z)} y2={sy(transom, z)} stroke="#292929" strokeWidth={2} />
      )}
      {mullions.map((m) => (
        <line key={m} x1={sx(m, z)} y1={sy(y0 + 3, z)} x2={sx(m, z)} y2={sy(y1 - 3, z)} stroke="#292929" strokeWidth={2} />
      ))}
      {sill && <Front x0={x0 - 3} x1={x1 + 3} y0={y0 - 4} y1={y0} z={z} fill={url("concrete")} />}
    </g>
  );
}
