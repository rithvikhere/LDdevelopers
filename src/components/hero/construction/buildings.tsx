import React from "react";
import { Box, EDGE, Front, Side, Top, Window, poly, sx, sy, url } from "./geometry";

/*
 * Two modern flat-roof blocks in the same architectural language as the brand's residence (white render,
 * dark stone, timber, large dark-framed glazing) — caught mid-construction.
 *
 *   A — 3 storeys, x 110–370, depth z 170–300 (left)
 *   B — 4 storeys, x 472–742, depth z 140–290 (right)
 *
 * Floor-to-floor 96, slab bands 8, roof slab 12. The crane stands in the screen gap between them.
 */

const A = { x0: 110, x1: 370, z0: 170, z1: 300 };
const B = { x0: 472, x1: 742, z0: 140, z1: 290 };

const concrete = { front: url("concrete"), side: url("concreteSide"), top: url("concreteTop") };

/** Concrete floor slab band around a block. */
function Slab({ b, y }: { b: typeof A; y: number }) {
  return <Box x0={b.x0 - 4} x1={b.x1 + 4} y0={y} y1={y + 8} z0={b.z0 - 4} z1={b.z1 + 2} {...concrete} />;
}

/** Rebar starter bars sticking up from an unfinished slab edge. */
function Rebar({ xs, y, z, h = 14 }: { xs: number[]; y: number; z: number; h?: number }) {
  return (
    <g stroke="#8C5E3C" strokeWidth={1.2} strokeLinecap="round">
      {xs.map((x) => (
        <line key={`${x}-${z}`} x1={sx(x, z)} y1={sy(y, z)} x2={sx(x, z)} y2={sy(y + h, z)} />
      ))}
    </g>
  );
}

/** Temporary steel props in an open bay. */
function Props({ xs, y0, y1, z }: { xs: number[]; y0: number; y1: number; z: number }) {
  return (
    <g stroke="#8F9089" strokeWidth={2.2} strokeLinecap="round">
      {xs.map((x) => (
        <line key={x} x1={sx(x, z)} y1={sy(y0, z)} x2={sx(x, z)} y2={sy(y1, z)} />
      ))}
    </g>
  );
}

function BuildingA() {
  const { x0, x1, z0, z1 } = A;
  return (
    <g id="building-a">
      {/* ground floor */}
      <g id="house-walls">
        <Box x0={x0} x1={x1} y0={0} y1={96} z0={z0} z1={z1} front={url("render")} side={url("renderSide")} top={url("roofTop")} />
        <Front x0={292} x1={x1} y0={0} y1={96} z={z0} fill={url("stone")} />
        <Front x0={292} x1={x1} y0={0} y1={96} z={z0} fill={url("stoneSpeck")} edge={false} />
      </g>
      <g id="house-windows">
        <Window x0={120} x1={232} y0={8} y1={86} z={z0} mullions={[157, 195]} sill={false} />
        {/* entrance door */}
        <Front x0={242} x1={282} y0={0} y1={86} z={z0} fill="#292929" />
        <Front x0={245} x1={279} y0={0} y1={83} z={z0} fill={url("timber")} edge={false} />
        <rect x={sx(273, z0)} y={sy(52, z0)} width={2} height={20} rx={1} fill="#D7AB58" />
        <Window x0={304} x1={358} y0={48} y1={76} z={z0} mullions={[331]} />
      </g>
      <Front x0={x0} x1={x1} y0={80} y1={96} z={z0} fill={url("aoDown")} edge={false} />
      <rect x={sx(x0, z0)} y={sy(0, z0)} width={x1 - x0} height={8} fill={url("aoDown")} />

      <Slab b={A} y={96} />

      {/* 1st floor — finished: render, two tall windows, timber cladding */}
      <Box x0={x0} x1={x1} y0={104} y1={192} z0={z0} z1={z1} front={url("render")} side={url("renderSide")} top={url("roofTop")} />
      <Window x0={132} x1={180} y0={114} y1={182} z={z0} transom={150} />
      <Window x0={194} x1={242} y0={114} y1={182} z={z0} transom={150} />
      <Front x0={262} x1={x1} y0={104} y1={192} z={z0} fill={url("timberPat")} />
      <polygon points={poly([x1, 124, 214], [x1, 124, 262], [x1, 172, 262], [x1, 172, 214])} fill={url("glassSide")} {...EDGE} />

      <Slab b={A} y={192} />

      {/* 2nd floor — under construction: bare blockwork (the plasterer's wall), concrete column, brick bay */}
      <g id="unfinished-wall">
        <Box x0={x0} x1={x1} y0={200} y1={288} z0={z0} z1={z1} front={url("blocksPat")} side={url("brickSidePat")} top={url("roofTop")} />
      </g>
      <Front x0={236} x1={x1} y0={200} y1={288} z={z0} fill={url("brickPat")} />
      <Front x0={230} x1={240} y0={200} y1={288} z={z0} fill={url("concrete")} />
      <Front x0={282} x1={340} y0={214} y1={268} z={z0} fill={url("interior")} />
      <Front x0={278} x1={344} y0={268} y1={274} z={z0} fill={url("concrete")} />
      <Front x0={x0} x1={x1} y0={276} y1={288} z={z0} fill={url("aoDown")} edge={false} />

      {/* roof slab, part of the parapet, starter bars and a column form for the next pour */}
      <g id="house-roof">
        <Box x0={x0 - 4} x1={x1 + 4} y0={288} y1={300} z0={z0 - 4} z1={z1 + 4} front={url("concrete")} side={url("concreteSide")} top={url("roofTop")} />
        <Box x0={x0 - 4} x1={240} y0={300} y1={312} z0={z0 - 4} z1={z0 + 4} front={url("render")} side={url("renderSide")} top={url("roofTop")} />
        <Rebar xs={[252, 268, 284, 300, 316, 332, 348, 364]} y={300} z={z0 - 1} />
        <Rebar xs={[120, 200, 280, 364]} y={300} z={z1} h={12} />
        <Box x0={322} x1={346} y0={300} y1={356} z0={205} z1={229} front={url("wood")} side="#9A7650" top="#C49C6C" />
        <g fill="#5A5953">
          {[316, 330, 344].map((y) => (
            <circle key={y} cx={sx(325, 205)} cy={sy(y, 205)} r={0.9} />
          ))}
        </g>
        {/* timber planks waiting on the roof */}
        <Top x0={140} x1={220} y={301} z0={240} z1={252} fill="#C9A677" />
        <Top x0={146} x1={226} y={303} z0={254} z1={266} fill="#BF9B6B" />
      </g>
    </g>
  );
}

function BuildingB() {
  const { x0, x1, z0, z1 } = B;
  return (
    <g id="building-b">
      {/* ground floor — open bay with props, stone, glazed entrance */}
      <Box x0={x0} x1={x1} y0={0} y1={96} z0={z0} z1={z1} front={url("render")} side={url("renderSide")} top={url("roofTop")} />
      <Front x0={484} x1={596} y0={0} y1={84} z={z0} fill={url("interior")} />
      <Props xs={[506, 540, 574]} y0={0} y1={83} z={z0 + 10} />
      <Front x0={480} x1={600} y0={84} y1={92} z={z0} fill={url("concrete")} />
      <Front x0={604} x1={664} y0={0} y1={96} z={z0} fill={url("stone")} />
      <Front x0={604} x1={664} y0={0} y1={96} z={z0} fill={url("stoneSpeck")} edge={false} />
      <Window x0={672} x1={734} y0={0} y1={84} z={z0} mullions={[703]} sill={false} />
      <polygon points={poly([x1, 30, 190], [x1, 30, 250], [x1, 76, 250], [x1, 76, 190])} fill={url("interior")} {...EDGE} />
      <Front x0={x0} x1={x1} y0={80} y1={96} z={z0} fill={url("aoDown")} edge={false} />
      <rect x={sx(x0, z0)} y={sy(0, z0)} width={x1 - x0} height={8} fill={url("aoDown")} />

      <Slab b={B} y={96} />

      {/* 1st floor — finished: wide window, window, recessed balcony with glass railing */}
      <Box x0={x0} x1={x1} y0={104} y1={192} z0={z0} z1={z1} front={url("render")} side={url("renderSide")} top={url("roofTop")} />
      <Window x0={486} x1={566} y0={116} y1={180} z={z0} mullions={[526]} />
      <Window x0={580} x1={632} y0={116} y1={180} z={z0} transom={156} />
      <Window x0={652} x1={730} y0={104} y1={184} z={z0} mullions={[691]} sill={false} />
      <Box x0={646} x1={736} y0={100} y1={106} z0={118} z1={z0} {...concrete} />
      <Front x0={648} x1={734} y0={106} y1={130} z={120} fill="#EAF2F2" opacity={0.3} />
      <line x1={sx(648, 120)} y1={sy(130, 120)} x2={sx(734, 120)} y2={sy(130, 120)} stroke="#292929" strokeOpacity={0.7} strokeWidth={1.6} />
      <polygon points={poly([x1, 120, 190], [x1, 120, 250], [x1, 172, 250], [x1, 172, 190])} fill={url("glassSide")} {...EDGE} />

      <Slab b={B} y={192} />

      {/* 2nd floor — windows in, timber strip, right bay still bare blockwork */}
      <Box x0={x0} x1={x1} y0={200} y1={288} z0={z0} z1={z1} front={url("render")} side={url("renderSide")} top={url("roofTop")} />
      <Window x0={486} x1={534} y0={212} y1={276} z={z0} transom={248} />
      <Window x0={548} x1={596} y0={212} y1={276} z={z0} transom={248} />
      <Front x0={608} x1={650} y0={200} y1={288} z={z0} fill={url("timberPat")} />
      <Front x0={650} x1={x1} y0={200} y1={288} z={z0} fill={url("blocksPat")} />
      <Front x0={672} x1={722} y0={214} y1={266} z={z0} fill={url("interior")} />
      <Front x0={668} x1={726} y0={266} y1={272} z={z0} fill={url("concrete")} />
      <Side x={x1} y0={200} y1={288} z0={z0} z1={z1} fill={url("blocksSidePat")} />

      <Slab b={B} y={288} />

      {/* 3rd floor — bare concrete frame, interior visible, brick infill going up */}
      <Front x0={x0} x1={x1} y0={296} y1={384} z={282} fill={url("interior")} />
      <Top x0={x0} x1={x1} y={296} z0={z0} z1={282} fill="#A8A79C" />
      <Side x={x1} y0={296} y1={384} z0={z0} z1={z1} fill={url("brickSidePat")} />
      <Props xs={[540, 668]} y0={296} y1={384} z={210} />
      {[x0, 601, x1 - 12].map((cx) => (
        <Box key={cx} x0={cx} x1={cx + 12} y0={296} y1={384} z0={z0} z1={z0 + 12} {...concrete} />
      ))}
      <Box x0={484} x1={601} y0={296} y1={320} z0={z0 + 4} z1={z0 + 10} front={url("brickPat")} side={url("brickSidePat")} top="#C98C6B" />
      <Box x0={613} x1={690} y0={296} y1={344} z0={z0 + 4} z1={z0 + 10} front={url("brickPat")} side={url("brickSidePat")} top="#C98C6B" />
      <Box x0={690} x1={730} y0={296} y1={320} z0={z0 + 4} z1={z0 + 10} front={url("brickPat")} side={url("brickSidePat")} top="#C98C6B" />

      {/* roof slab + starter bars for the next lift */}
      <Box x0={x0 - 2} x1={x1 + 4} y0={384} y1={396} z0={z0 - 4} z1={z1 + 2} {...concrete} />
      <Rebar xs={[620, 650, 680, 710, 738]} y={396} z={z1 - 2} />
      <Rebar xs={[690, 716, 740]} y={396} z={z0} />
    </g>
  );
}

/** Scaffold across the left of building A, two working lifts. The front guard rail of the upper lift is
 *  drawn in the figure layer (in front of the plasterer) — see ScaffoldFrontRail. */
function ScaffoldA() {
  const z = 150;
  const tube = { stroke: "#8B8E86", strokeWidth: 2.6, strokeLinecap: "round" as const };
  const standards = [108, 172, 236];
  return (
    <g id="scaffolding">
      {standards.map((x) => (
        <line key={x} x1={sx(x, z)} y1={sy(0, z)} x2={sx(x, z)} y2={sy(318, z)} {...tube} />
      ))}
      <line x1={sx(108, z)} y1={sy(0, z)} x2={sx(172, z)} y2={sy(96, z)} stroke="#8B8E86" strokeWidth={1.8} />
      <line x1={sx(172, z)} y1={sy(96, z)} x2={sx(236, z)} y2={sy(192, z)} stroke="#8B8E86" strokeWidth={1.8} />
      {[96, 192].map((y) => (
        <g key={y}>
          <Top x0={104} x1={240} y={y} z0={z} z1={168} fill="#CDAA7A" />
          <Front x0={104} x1={240} y0={y - 4} y1={y} z={z} fill="#B48D5E" />
        </g>
      ))}
      <line x1={sx(104, z)} y1={sy(110, z)} x2={sx(240, z)} y2={sy(110, z)} {...tube} strokeWidth={2} />
      <line x1={sx(104, z)} y1={sy(316, z)} x2={sx(240, z)} y2={sy(316, z)} {...tube} strokeWidth={2} />
      {standards.flatMap((x) =>
        [96, 192].map((y) => <circle key={`${x}-${y}`} cx={sx(x, z)} cy={sy(y, z)} r={1.8} fill="#5A5C57" />)
      )}
      {standards.map((x) => (
        <rect key={`p${x}`} x={sx(x, z) - 4} y={sy(0, z) - 1.5} width={8} height={2.5} fill="#5A5C57" />
      ))}
    </g>
  );
}

export function ScaffoldFrontRail() {
  const z = 150;
  return (
    <line
      x1={sx(104, z)}
      y1={sy(206, z)}
      x2={sx(240, z)}
      y2={sy(206, z)}
      stroke="#8B8E86"
      strokeWidth={2}
      strokeLinecap="round"
    />
  );
}

function Ladder() {
  const b = (x: number) => [sx(x, 122), sy(0, 122)];
  const t = (x: number) => [sx(x + 4, 150), sy(104, 150)];
  const [b0, b1, t0, t1] = [b(244), b(256), t(244), t(256)];
  const rungs = [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84];
  return (
    <g>
      <line x1={b0[0]} y1={b0[1]} x2={t0[0]} y2={t0[1]} stroke="#B48D5E" strokeWidth={2.4} strokeLinecap="round" />
      <line x1={b1[0]} y1={b1[1]} x2={t1[0]} y2={t1[1]} stroke="#A07A4C" strokeWidth={2.4} strokeLinecap="round" />
      {rungs.map((k) => (
        <line
          key={k}
          x1={b0[0] + (t0[0] - b0[0]) * k}
          y1={b0[1] + (t0[1] - b0[1]) * k}
          x2={b1[0] + (t1[0] - b1[0]) * k}
          y2={b1[1] + (t1[1] - b1[1]) * k}
          stroke="#B48D5E"
          strokeWidth={1.7}
        />
      ))}
    </g>
  );
}

/** Steel entrance canopy on building A. */
function Canopy() {
  const steel = { front: url("steel-dark"), side: "#262522", top: "#4A4944" };
  return (
    <g>
      <Box x0={234} x1={239} y0={0} y1={88} z0={136} z1={141} {...steel} />
      <Box x0={293} x1={298} y0={0} y1={88} z0={136} z1={141} {...steel} />
      <Box x0={232} x1={300} y0={88} y1={95} z0={136} z1={170} {...steel} />
    </g>
  );
}

/** Both buildings with their scaffold, ladder and canopy (the static layer). */
export function Buildings() {
  return (
    <g id="house-structure">
      <BuildingA />
      <BuildingB />
      <ScaffoldA />
      <Ladder />
      <Canopy />
    </g>
  );
}
