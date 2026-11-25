import React from "react";
import s from "../ConstructionScene.module.css";
import { EDGE, url } from "./geometry";

/**
 * Tower crane standing in the gap between the two buildings (behind them).
 *
 * Pick-and-place loop (12s, see .trolley / .hoist / .hoistLoad / .loadVisible in the CSS):
 * the hook lifts a brick pallet from behind the 4-storey block, the trolley carries it a little to the left,
 * lowers it out of sight behind the building, releases it, and the empty hook returns for the next one.
 * Hand-overs happen while the hook is hidden behind the building, so the loop has no visible reset.
 *
 * Geometry (screen units): mast rails x 504 / 526, pivot x 515; jib chords y 100 / 112 to x 900;
 * trolley at x 800 (pick-up), travels −120 to x 680 (drop). Cable 119 → 246 (lowered), 31 long when hoisted.
 */
export function Crane() {
  const mastBracing: string[] = [];
  for (let y = 124; y < 616; y += 22) mastBracing.push(`M504,${y} L526,${y + 11} L504,${y + 22}`);
  const jibBracing: string[] = [];
  for (let x = 528; x < 892; x += 16) jibBracing.push(`M${x},112 L${x + 8},100 L${x + 16},112`);

  return (
    <g>
      <g id="crane-tower">
        {/* footing */}
        <polygon points="494,623 536,623 548,616 506,616" fill="#C4C2B5" {...EDGE} />
        <rect x={494} y={623} width={42} height={7} fill="#A9A79A" {...EDGE} />
        {/* lattice mast */}
        <path d={mastBracing.join(" ")} stroke="#C99A45" strokeWidth={1.4} fill="none" />
        <line x1={504} y1={122} x2={504} y2={624} stroke="#D4A752" strokeWidth={3.2} />
        <line x1={526} y1={122} x2={526} y2={624} stroke="#D4A752" strokeWidth={3.2} />
        {/* tower head */}
        <path d="M504,116 L515,48 L526,116" stroke="#C99A45" strokeWidth={2.6} fill="none" strokeLinejoin="round" />
        <path d="M508,94 L522,94 M511,74 L519,74" stroke="#C99A45" strokeWidth={1.4} />
        {/* slewing ring + operator cab */}
        <rect x={494} y={114} width={42} height={9} rx={2} fill="#3A3935" />
        <rect x={527} y={120} width={25} height={22} rx={3.2} fill={url("craneCab")} {...EDGE} />
        <rect x={534} y={124} width={14} height={10} rx={1.6} fill={url("glass")} />
        <path d="M535,132.5 L546,125" stroke="#fff" strokeOpacity={0.35} strokeWidth={1} />
      </g>

      <g id="crane-arm">
        {/* tie bars */}
        <path d="M515,48 L690,100 M515,48 L860,100 M515,48 L436,102" stroke="#4A4944" strokeWidth={1} fill="none" />
        {/* jib */}
        <path d={jibBracing.join(" ")} stroke="#C99A45" strokeWidth={1.3} fill="none" />
        <line x1={518} y1={100} x2={900} y2={100} stroke="#D4A752" strokeWidth={3} />
        <line x1={518} y1={112} x2={900} y2={112} stroke="#D4A752" strokeWidth={3} />
        <path d="M900,99 L906,106 L900,113" stroke="#C99A45" strokeWidth={2.4} fill="none" strokeLinejoin="round" />
        {/* counter-jib + concrete counterweights */}
        <rect x={432} y={101} width={72} height={11} fill="none" stroke="#C99A45" strokeWidth={2.4} />
        <path d="M480,101 L480,112 M492,101 L492,112 M468,101 L468,112" stroke="#C99A45" strokeWidth={1.2} />
        <rect x={434} y={112} width={11} height={27} rx={1.2} fill="#A4A398" {...EDGE} />
        <rect x={446} y={112} width={11} height={27} rx={1.2} fill="#B1B0A5" {...EDGE} />
        <rect x={458} y={112} width={11} height={27} rx={1.2} fill="#9A998E" {...EDGE} />
      </g>

      {/* trolley → cable → hook → load (each nested so they can never come apart) */}
      <g className={s.trolley}>
        <rect id="crane-trolley" x={789} y={112} width={22} height={7} rx={1.6} fill="#3A3935" />
        <circle cx={794} cy={112} r={2} fill="#5A5953" />
        <circle cx={806} cy={112} r={2} fill="#5A5953" />
        <g id="crane-cable" className={s.hoist}>
          <line x1={800} y1={119} x2={800} y2={246} stroke="#34332F" strokeWidth={1.4} />
        </g>
        <g className={s.hoistLoad}>
          <g className={s.swing}>
            <rect id="crane-hook" x={794} y={245} width={12} height={10} rx={2} fill="#D7AB58" {...EDGE} />
            <path d="M800,255 L800,258 Q800,262 803.4,261.4" stroke="#34332F" strokeWidth={1.6} fill="none" strokeLinecap="round" />
            <g id="crane-load" className={s.loadVisible}>
              <path d="M800,259 L772,277 M800,259 L828,277 M800,259 L812,273" stroke="#4A4944" strokeWidth={0.9} />
              <polygon points="772,277 828,277 836,272 780,272" fill="#C98C6B" {...EDGE} />
              <polygon points="828,277 836,272 836,298 828,303" fill={url("brickSidePat")} {...EDGE} />
              <rect x={772} y={277} width={56} height={26} fill={url("brickPat")} {...EDGE} />
              <rect x={769} y={303} width={62} height={5} rx={1} fill="#B48D5E" {...EDGE} />
              <path d="M776,308 L776,303 M800,308 L800,303 M824,308 L824,303" stroke="#8A6A43" strokeWidth={1.2} />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}
