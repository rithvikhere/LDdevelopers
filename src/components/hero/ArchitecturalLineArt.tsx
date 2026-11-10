"use client";

import React from "react";

export interface ArchitecturalLineArtProps {
  className?: string;
  strokeColor?: string;
  animate?: boolean;
}

/**
 * ArchitecturalLineArt Component
 *
 * Monochromatic, animated SVG architectural line art illustration depicting two business partners
 * shaking hands before a rising modern city skyline, inscribed within a geometric compass arc.
 *
 * Recreates the visual composition of "Architectural Partnership in Progress"
 * completely in code via vector strokes, Bézier curves, and progressive technical drawing animations.
 *
 * Line Weight Hierarchy:
 * - Primary outlines: 1.6px - 2.0px (handshake contours, signature building silhouettes)
 * - Secondary details: 0.9px - 1.1px (window grids, cuffs, suit creases, floor spandrels)
 * - Construction lines: 0.5px - 0.7px (compass arc, axes, perspective lines, pixel-to-vector squares)
 */
export const ArchitecturalLineArt: React.FC<ArchitecturalLineArtProps> = ({
  className = "w-full h-auto",
  strokeColor = "currentColor",
  animate = true,
}) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ color: strokeColor }}
    >
      {/* Scoped CSS Keyframe & Sketch Animation System */}
      <style>{`
        @keyframes sketchDraw {
          0% {
            stroke-dashoffset: 1;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .sketch-path {
          fill: none;
          stroke: currentColor;
          vector-effect: non-scaling-stroke;
        }

        ${
          animate
            ? `
        .sketch-construction {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sketchDraw 1.5s cubic-bezier(0.25, 1, 0.5, 1) 0.1s forwards;
        }

        .sketch-skyline {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sketchDraw 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s forwards;
        }

        .sketch-building-detail {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sketchDraw 2.0s ease-out 1.8s forwards;
        }

        .sketch-arms {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sketchDraw 2.0s cubic-bezier(0.2, 0.8, 0.2, 1) 2.9s forwards;
        }

        .sketch-handshake {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sketchDraw 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) 3.6s forwards;
        }

        .sketch-fine-details {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: sketchDraw 1.4s ease-out 5.4s forwards;
        }
        `
            : `
        .sketch-construction,
        .sketch-skyline,
        .sketch-building-detail,
        .sketch-arms,
        .sketch-handshake,
        .sketch-fine-details {
          stroke-dashoffset: 0 !important;
          animation: none !important;
        }
        `
        }

        @media (prefers-reduced-motion: reduce) {
          .sketch-construction,
          .sketch-skyline,
          .sketch-building-detail,
          .sketch-arms,
          .sketch-handshake,
          .sketch-fine-details {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 1200 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        aria-labelledby="architectural-handshake-title architectural-handshake-desc"
        role="img"
      >
        <title id="architectural-handshake-title">Architectural Partnership in Progress</title>
        <desc id="architectural-handshake-desc">
          An animated architectural technical line-art drawing showing two business partners shaking
          hands with a modern city skyline and compass guide arc emerging in the background.
        </desc>

        {/* ===================================================================== */}
        {/* STAGE 1: ARCHITECTURAL CONSTRUCTION GUIDELINES & COMPASS ARC         */}
        {/* ===================================================================== */}
        <g id="stage-construction-guidelines" className="sketch-construction opacity-40">
          {/* Main Architectural Compass Arc (R=330, center ~680, 520) */}
          <path
            d="M 380,390 A 330,330 0 0,1 980,390"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.85"
            strokeDasharray="4 4"
          />
          {/* Inner concentric drafting arc */}
          <path
            d="M 430,425 A 280,280 0 0,1 930,425"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />

          {/* Vertical Central Drafting Axis */}
          <line
            x1="680"
            y1="40"
            x2="680"
            y2="580"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
          />
          {/* Top Target Geometric Square & Crosshair */}
          <rect
            x="674"
            y="34"
            width="12"
            height="12"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
          />
          <line x1="666" y1="40" x2="694" y2="40" className="sketch-path" pathLength="1" strokeWidth="0.6" />
          <line x1="680" y1="26" x2="680" y2="54" className="sketch-path" pathLength="1" strokeWidth="0.6" />

          {/* Horizontal Datum Alignment Lines */}
          <line x1="260" y1="565" x2="1080" y2="565" className="sketch-path" pathLength="1" strokeWidth="0.65" strokeDasharray="6 3" />
          <line x1="360" y1="460" x2="1010" y2="460" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="410" y1="330" x2="940" y2="330" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="470" y1="210" x2="910" y2="210" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="630" y1="105" x2="900" y2="105" className="sketch-path" pathLength="1" strokeWidth="0.5" />

          {/* Perspective & Extension Guidelines */}
          <line x1="280" y1="730" x2="520" y2="480" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="1040" y1="720" x2="820" y2="490" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="560" y1="240" x2="680" y2="105" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="680" y1="105" x2="800" y2="240" className="sketch-path" pathLength="1" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Architectural Alignment Crosshairs */}
          <g className="sketch-path" strokeWidth="0.6">
            <line x1="380" y1="560" x2="380" y2="570" pathLength="1" />
            <line x1="375" y1="565" x2="385" y2="565" pathLength="1" />
            <line x1="970" y1="560" x2="970" y2="570" pathLength="1" />
            <line x1="965" y1="565" x2="975" y2="565" pathLength="1" />
            <line x1="440" y1="325" x2="440" y2="335" pathLength="1" />
            <line x1="435" y1="330" x2="445" y2="330" pathLength="1" />
            <line x1="865" y1="100" x2="865" y2="110" pathLength="1" />
            <line x1="860" y1="105" x2="870" y2="105" pathLength="1" />
          </g>

          {/* Left Pixel-to-Sketch Transition Squares (Around Left Sleeve Entry) */}
          <g className="sketch-path" strokeWidth="0.55">
            <rect x="290" y="555" width="26" height="26" pathLength="1" />
            <rect x="316" y="555" width="26" height="26" pathLength="1" />
            <rect x="342" y="535" width="22" height="22" pathLength="1" />
            <rect x="364" y="535" width="22" height="22" pathLength="1" />
            <rect x="300" y="581" width="34" height="34" pathLength="1" />
            <rect x="334" y="577" width="30" height="30" pathLength="1" />
            <rect x="306" y="615" width="28" height="28" pathLength="1" />
            <rect x="334" y="607" width="34" height="34" pathLength="1" />
            <rect x="368" y="611" width="26" height="26" pathLength="1" />
            <rect x="312" y="643" width="30" height="30" pathLength="1" />
            <rect x="342" y="641" width="32" height="32" pathLength="1" />
            <rect x="374" y="637" width="28" height="28" pathLength="1" />
            <rect x="322" y="673" width="26" height="26" pathLength="1" />
            <rect x="348" y="673" width="30" height="30" pathLength="1" />
            <rect x="378" y="665" width="24" height="24" pathLength="1" />
            <rect x="332" y="699" width="28" height="28" pathLength="1" />
            <rect x="360" y="703" width="24" height="24" pathLength="1" />
          </g>

          {/* Right Pixel-to-Sketch Transition Squares (Around Right Sleeve Entry) */}
          <g className="sketch-path" strokeWidth="0.55">
            <rect x="978" y="542" width="28" height="28" pathLength="1" />
            <rect x="950" y="538" width="28" height="28" pathLength="1" />
            <rect x="926" y="534" width="24" height="24" pathLength="1" />
            <rect x="902" y="538" width="24" height="24" pathLength="1" />
            <rect x="964" y="570" width="32" height="32" pathLength="1" />
            <rect x="932" y="562" width="32" height="32" pathLength="1" />
            <rect x="900" y="560" width="32" height="32" pathLength="1" />
            <rect x="958" y="602" width="34" height="34" pathLength="1" />
            <rect x="924" y="594" width="34" height="34" pathLength="1" />
            <rect x="890" y="592" width="34" height="34" pathLength="1" />
            <rect x="948" y="636" width="30" height="30" pathLength="1" />
            <rect x="918" y="628" width="30" height="30" pathLength="1" />
            <rect x="888" y="626" width="30" height="30" pathLength="1" />
            <rect x="938" y="666" width="26" height="26" pathLength="1" />
            <rect x="912" y="658" width="26" height="26" pathLength="1" />
            <rect x="928" y="692" width="24" height="24" pathLength="1" />
            <rect x="904" y="684" width="24" height="24" pathLength="1" />
          </g>
        </g>

        {/* ===================================================================== */}
        {/* STAGE 2: CITY SKYLINE — MAJOR SILHOUETTES & STRUCTURES               */}
        {/* ===================================================================== */}
        <g id="stage-skyline-silhouettes" className="sketch-skyline">
          {/* TOWER 1: SIGNATURE SKYSCRAPER (Far Right, Iconic Apex) */}
          {/* Silhouette Outlines */}
          <path
            d="M 800,565 L 800,240 L 812,240 L 812,175 L 824,175 L 824,135 L 865,95 L 865,75 M 865,95 L 882,135 L 882,215 L 874,215 L 874,565"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Crown Chiseled Chamfer & Spire Antenna */}
          <line x1="865" y1="75" x2="865" y2="55" className="sketch-path" pathLength="1" strokeWidth="1.2" />
          <path d="M 824,135 L 882,135" className="sketch-path" pathLength="1" strokeWidth="1.1" />
          <path d="M 812,175 L 874,215" className="sketch-path" pathLength="1" strokeWidth="0.9" />

          {/* TOWER 2: STEPPED HIGH-RISE TOWER (Adjacent to Signature Tower) */}
          <path
            d="M 742,565 L 742,320 L 756,320 L 756,270 L 782,270 L 782,310 L 794,310 L 794,565"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.45"
          />
          {/* Mechanical Penthouse & Mast */}
          <rect x="760" y="254" width="18" height="16" className="sketch-path" pathLength="1" strokeWidth="0.9" />
          <line x1="769" y1="254" x2="769" y2="230" className="sketch-path" pathLength="1" strokeWidth="0.8" />

          {/* TOWER 3: CENTRAL MID-RISE RESIDENTIAL / COMMERCIAL BLOCK */}
          <path
            d="M 640,565 L 640,375 L 685,375 L 685,358 L 716,358 L 716,375 L 736,375 L 736,565"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.4"
          />

          {/* TOWER 4: STEPPED CENTRAL-LEFT MODERN COMPLEX */}
          <path
            d="M 536,565 L 536,345 L 568,345 L 568,308 L 606,308 L 606,352 L 634,352 L 634,565"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.4"
          />
          {/* Cantilever Box Highlight */}
          <path d="M 568,308 L 606,308 L 606,326 L 568,326 Z" className="sketch-path" pathLength="1" strokeWidth="1.0" />

          {/* TOWER 5: LEFT CORNER HIGH-RISE */}
          <path
            d="M 445,565 L 445,365 L 482,365 L 482,338 L 512,338 L 512,365 L 530,365 L 530,565"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.4"
          />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 2.5: SKYLINE DETAILS — WINDOW MULLIONS, FLOORS & FACADES       */}
        {/* ===================================================================== */}
        <g id="stage-skyline-facades" className="sketch-building-detail opacity-65">
          {/* TOWER 1 VERTICAL MULLIONS */}
          <g className="sketch-path" strokeWidth="0.75">
            <line x1="816" y1="175" x2="816" y2="565" pathLength="1" />
            <line x1="828" y1="140" x2="828" y2="565" pathLength="1" />
            <line x1="840" y1="120" x2="840" y2="565" pathLength="1" />
            <line x1="852" y1="110" x2="852" y2="565" pathLength="1" />
            <line x1="864" y1="105" x2="864" y2="565" pathLength="1" />
            <line x1="874" y1="145" x2="874" y2="565" pathLength="1" />
          </g>

          {/* TOWER 1 HORIZONTAL FLOOR SLABS (Spandrels) */}
          <g className="sketch-path" strokeWidth="0.6">
            <line x1="824" y1="150" x2="880" y2="150" pathLength="1" />
            <line x1="818" y1="170" x2="880" y2="170" pathLength="1" />
            <line x1="812" y1="190" x2="880" y2="190" pathLength="1" />
            <line x1="812" y1="210" x2="874" y2="210" pathLength="1" />
            <line x1="812" y1="230" x2="874" y2="230" pathLength="1" />
            <line x1="800" y1="250" x2="874" y2="250" pathLength="1" />
            <line x1="800" y1="270" x2="874" y2="270" pathLength="1" />
            <line x1="800" y1="290" x2="874" y2="290" pathLength="1" />
            <line x1="800" y1="310" x2="874" y2="310" pathLength="1" />
            <line x1="800" y1="330" x2="874" y2="330" pathLength="1" />
            <line x1="800" y1="350" x2="874" y2="350" pathLength="1" />
            <line x1="800" y1="370" x2="874" y2="370" pathLength="1" />
            <line x1="800" y1="390" x2="874" y2="390" pathLength="1" />
            <line x1="800" y1="410" x2="874" y2="410" pathLength="1" />
            <line x1="800" y1="430" x2="874" y2="430" pathLength="1" />
            <line x1="800" y1="450" x2="874" y2="450" pathLength="1" />
            <line x1="800" y1="470" x2="874" y2="470" pathLength="1" />
            <line x1="800" y1="490" x2="874" y2="490" pathLength="1" />
            <line x1="800" y1="510" x2="874" y2="510" pathLength="1" />
            <line x1="800" y1="530" x2="874" y2="530" pathLength="1" />
            <line x1="800" y1="550" x2="874" y2="550" pathLength="1" />
          </g>

          {/* TOWER 2 STRUCTURAL CROSS BRACING & FACADES */}
          <g className="sketch-path" strokeWidth="0.65">
            <line x1="756" y1="290" x2="782" y2="290" pathLength="1" />
            <line x1="742" y1="340" x2="794" y2="340" pathLength="1" />
            <line x1="742" y1="365" x2="794" y2="365" pathLength="1" />
            <line x1="742" y1="390" x2="794" y2="390" pathLength="1" />
            <line x1="742" y1="415" x2="794" y2="415" pathLength="1" />
            <line x1="742" y1="440" x2="794" y2="440" pathLength="1" />
            <line x1="742" y1="465" x2="794" y2="465" pathLength="1" />
            <line x1="742" y1="490" x2="794" y2="490" pathLength="1" />
            <line x1="742" y1="515" x2="794" y2="515" pathLength="1" />
            <line x1="742" y1="540" x2="794" y2="540" pathLength="1" />
            {/* Diagonal Trusses */}
            <line x1="742" y1="390" x2="794" y2="440" pathLength="1" strokeDasharray="3 2" />
            <line x1="794" y1="390" x2="742" y2="440" pathLength="1" strokeDasharray="3 2" />
            <line x1="742" y1="490" x2="794" y2="540" pathLength="1" strokeDasharray="3 2" />
            <line x1="794" y1="490" x2="742" y2="540" pathLength="1" strokeDasharray="3 2" />
          </g>

          {/* TOWER 3 RIBBON WINDOWS (Horizontal Architectural Slits) */}
          <g className="sketch-path" strokeWidth="0.75">
            <line x1="645" y1="390" x2="730" y2="390" pathLength="1" />
            <line x1="645" y1="400" x2="730" y2="400" pathLength="1" />
            <line x1="645" y1="416" x2="730" y2="416" pathLength="1" />
            <line x1="645" y1="426" x2="730" y2="426" pathLength="1" />
            <line x1="645" y1="442" x2="730" y2="442" pathLength="1" />
            <line x1="645" y1="452" x2="730" y2="452" pathLength="1" />
            <line x1="645" y1="468" x2="730" y2="468" pathLength="1" />
            <line x1="645" y1="478" x2="730" y2="478" pathLength="1" />
            <line x1="645" y1="494" x2="730" y2="494" pathLength="1" />
            <line x1="645" y1="504" x2="730" y2="504" pathLength="1" />
            <line x1="645" y1="520" x2="730" y2="520" pathLength="1" />
            <line x1="645" y1="530" x2="730" y2="530" pathLength="1" />
            <line x1="645" y1="546" x2="730" y2="546" pathLength="1" />
            <line x1="645" y1="556" x2="730" y2="556" pathLength="1" />
            {/* Vertical Mullion Ties */}
            <line x1="662" y1="375" x2="662" y2="565" pathLength="1" strokeWidth="0.55" />
            <line x1="684" y1="375" x2="684" y2="565" pathLength="1" strokeWidth="0.55" />
            <line x1="706" y1="375" x2="706" y2="565" pathLength="1" strokeWidth="0.55" />
          </g>

          {/* TOWER 4 & 5 GEOMETRIC GRID WINDOWS */}
          <g className="sketch-path" strokeWidth="0.6">
            <line x1="536" y1="370" x2="634" y2="370" pathLength="1" />
            <line x1="536" y1="395" x2="634" y2="395" pathLength="1" />
            <line x1="536" y1="420" x2="634" y2="420" pathLength="1" />
            <line x1="536" y1="445" x2="634" y2="445" pathLength="1" />
            <line x1="536" y1="470" x2="634" y2="470" pathLength="1" />
            <line x1="536" y1="495" x2="634" y2="495" pathLength="1" />
            <line x1="536" y1="520" x2="634" y2="520" pathLength="1" />
            <line x1="536" y1="545" x2="634" y2="545" pathLength="1" />
            <line x1="554" y1="345" x2="554" y2="565" pathLength="1" />
            <line x1="586" y1="308" x2="586" y2="565" pathLength="1" />
            <line x1="616" y1="352" x2="616" y2="565" pathLength="1" />

            {/* Left Tower 5 Grid */}
            <line x1="445" y1="390" x2="530" y2="390" pathLength="1" />
            <line x1="445" y1="415" x2="530" y2="415" pathLength="1" />
            <line x1="445" y1="440" x2="530" y2="440" pathLength="1" />
            <line x1="445" y1="465" x2="530" y2="465" pathLength="1" />
            <line x1="445" y1="490" x2="530" y2="490" pathLength="1" />
            <line x1="445" y1="515" x2="530" y2="515" pathLength="1" />
            <line x1="445" y1="540" x2="530" y2="540" pathLength="1" />
            <line x1="472" y1="365" x2="472" y2="565" pathLength="1" />
            <line x1="500" y1="338" x2="500" y2="565" pathLength="1" />
          </g>

          {/* Podium Level Colonnade & Stylized Landscape Base */}
          <line x1="420" y1="565" x2="910" y2="565" className="sketch-path" pathLength="1" strokeWidth="1.2" />
          <path
            d="M 430,565 C 460,555 490,560 520,552 C 550,562 580,555 610,560 C 640,550 670,558 700,552 C 730,562 760,554 790,558 C 820,550 850,562 880,555 L 900,565"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.8"
          />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 3: FORMAL SUIT SLEEVES, CUFFS & WRISTS                         */}
        {/* ===================================================================== */}
        <g id="stage-sleeves-and-cuffs" className="sketch-arms">
          {/* LEFT SUIT SLEEVE */}
          {/* Upper sleeve contour */}
          <path
            d="M 260,570 C 320,580 380,595 440,610"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Lower sleeve contour */}
          <path
            d="M 260,740 C 310,750 365,765 425,780"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Sleeve Cuff Seam */}
          <path
            d="M 440,610 L 425,780"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Sleeve Fabric Creases & Tailoring Folds */}
          <path
            d="M 350,590 C 380,610 405,650 420,700"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 360,745 C 390,735 415,715 430,695"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />

          {/* LEFT SHIRT CUFF (Crisp French Double Cuff) */}
          <path
            d="M 440,610 L 458,614 L 442,782 L 425,780"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.5"
          />
          {/* Cuff Stitching Detail */}
          <path
            d="M 452,618 L 436,778"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
            strokeDasharray="3 2"
            opacity="0.8"
          />
          {/* Cufflink Oval Outline */}
          <ellipse cx="448" cy="745" rx="3.5" ry="5.5" className="sketch-path" pathLength="1" strokeWidth="0.9" />

          {/* RIGHT SUIT SLEEVE */}
          {/* Upper sleeve contour */}
          <path
            d="M 1000,570 C 940,580 880,595 820,610"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Lower sleeve contour */}
          <path
            d="M 1000,740 C 950,750 895,765 835,780"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Sleeve Cuff Seam */}
          <path
            d="M 820,610 L 835,780"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Right Sleeve Fabric Folds */}
          <path
            d="M 910,590 C 880,610 855,650 840,700"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 900,745 C 870,735 845,715 830,695"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />

          {/* RIGHT SHIRT CUFF */}
          <path
            d="M 820,610 L 802,614 L 818,782 L 835,780"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.5"
          />
          {/* Cuff Stitching Detail */}
          <path
            d="M 808,618 L 824,778"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
            strokeDasharray="3 2"
            opacity="0.8"
          />
          {/* Cufflink Detail */}
          <ellipse cx="812" cy="745" rx="3.5" ry="5.5" className="sketch-path" pathLength="1" strokeWidth="0.9" />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 3.5: THE ANATOMICAL HANDSHAKE — CLASP, FINGERS & WRISTS         */}
        {/* ===================================================================== */}
        <g id="stage-handshake-contours" className="sketch-handshake">
          {/* --- LEFT HAND: TOP RIDGE & INTERLOCKING THUMB --- */}
          {/* Hand dorsal contour from left cuff forward */}
          <path
            d="M 458,614 C 490,620 525,628 560,638"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Left Thumb curving up and forward to meet the clasp */}
          <path
            d="M 545,634 C 565,620 585,605 605,602 C 618,600 626,608 622,620 C 618,632 602,642 585,648"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.7"
          />
          {/* Left thumb nail & joint crease */}
          <path d="M 618,606 C 622,610 620,616 614,618" className="sketch-path" pathLength="1" strokeWidth="0.9" />
          <path d="M 588,612 C 592,620 588,628 582,634" className="sketch-path" pathLength="1" strokeWidth="0.8" opacity="0.75" />

          {/* Left Hand lower heel contour returning to cuff */}
          <path
            d="M 585,772 C 545,776 498,778 442,782"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Left dorsal metacarpal tendon lines */}
          <g className="sketch-path" strokeWidth="0.8" opacity="0.55">
            <path d="M 490,626 C 520,638 548,654 570,672" pathLength="1" />
            <path d="M 480,650 C 510,665 535,684 560,705" pathLength="1" />
            <path d="M 470,680 C 500,700 525,722 550,745" pathLength="1" />
          </g>

          {/* --- RIGHT HAND: TOP RIDGE, EXTENSOR TENDONS & ARCHING THUMB --- */}
          {/* Right wrist ridge from right cuff to thumb base */}
          <path
            d="M 802,614 C 770,618 735,622 705,618"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Right Thumb arching OVER the left hand to lock the handshake */}
          <path
            d="M 705,618 C 680,612 650,608 624,616 C 606,622 596,634 590,646 C 586,654 592,662 602,664 C 616,666 636,662 656,656"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.85"
          />
          {/* Right thumb nail and joint crease */}
          <path d="M 592,642 C 596,638 602,640 604,646" className="sketch-path" pathLength="1" strokeWidth="0.9" />
          <path d="M 626,624 C 629,633 625,642 619,648" className="sketch-path" pathLength="1" strokeWidth="0.8" opacity="0.75" />
          {/* Inner pad contour of right thumb */}
          <path d="M 656,656 C 680,648 705,648 724,655" className="sketch-path" pathLength="1" strokeWidth="1.1" opacity="0.8" />

          {/* Back of Right Hand outer contour connecting to knuckles */}
          <path
            d="M 802,614 C 775,625 750,645 726,670"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.7"
          />
          {/* Lower wrist edge of right hand connecting to cuff */}
          <path
            d="M 738,758 C 764,766 790,774 818,778"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Right dorsal tendon lines */}
          <g className="sketch-path" strokeWidth="0.8" opacity="0.55">
            <path d="M 770,630 C 750,650 735,675 725,700" pathLength="1" />
            <path d="M 780,655 C 765,678 750,705 738,730" pathLength="1" />
          </g>

          {/* --- THE 4 CLASPING FINGERS OF THE RIGHT HAND (CLEAR, FIRM GRIP) --- */}
          {/* FINGER 1: INDEX FINGER */}
          <g className="sketch-path">
            <path
              d="M 718,654 C 682,658 648,662 612,666 C 592,669 575,672 562,680 C 554,685 556,695 566,698 C 588,700 622,696 658,691 C 682,687 708,684 726,680"
              pathLength="1"
              strokeWidth="1.8"
            />
            {/* Index nail */}
            <path d="M 564,681 C 568,678 574,680 576,686" pathLength="1" strokeWidth="0.85" />
            {/* Joint crease */}
            <path d="M 638,662 C 641,672 638,682 632,688" pathLength="1" strokeWidth="0.75" opacity="0.8" />
          </g>

          {/* FINGER 2: MIDDLE FINGER (Longest, prominent grip) */}
          <g className="sketch-path">
            <path
              d="M 726,680 C 690,684 656,687 622,692 C 598,695 575,699 558,706 C 550,711 552,721 562,725 C 586,727 620,722 656,717 C 682,714 710,710 732,708"
              pathLength="1"
              strokeWidth="1.8"
            />
            {/* Middle finger nail */}
            <path d="M 560,707 C 564,704 570,706 572,712" pathLength="1" strokeWidth="0.85" />
            {/* Joint crease */}
            <path d="M 630,690 C 633,700 630,710 624,716" pathLength="1" strokeWidth="0.75" opacity="0.8" />
          </g>

          {/* FINGER 3: RING FINGER */}
          <g className="sketch-path">
            <path
              d="M 732,708 C 698,712 666,715 632,720 C 610,724 588,728 572,736 C 564,741 566,750 576,754 C 598,755 630,750 666,745 C 690,742 716,738 736,734"
              pathLength="1"
              strokeWidth="1.75"
            />
            {/* Ring finger nail */}
            <path d="M 574,737 C 578,734 584,736 586,742" pathLength="1" strokeWidth="0.85" />
            {/* Joint crease */}
            <path d="M 636,718 C 639,728 636,738 630,744" pathLength="1" strokeWidth="0.75" opacity="0.8" />
          </g>

          {/* FINGER 4: PINKY FINGER */}
          <g className="sketch-path">
            <path
              d="M 736,734 C 704,738 674,741 644,746 C 624,750 604,754 588,762 C 580,767 582,776 592,779 C 614,780 644,775 676,770 C 700,766 722,762 738,758"
              pathLength="1"
              strokeWidth="1.65"
            />
            {/* Pinky nail */}
            <path d="M 590,763 C 594,760 600,762 602,768" pathLength="1" strokeWidth="0.85" />
            {/* Joint crease */}
            <path d="M 646,746 C 649,754 646,762 640,768" pathLength="1" strokeWidth="0.75" opacity="0.8" />
          </g>

          {/* Palm compression & interlocking contact lines */}
          <path
            d="M 565,658 C 568,685 572,715 578,745"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <path
            d="M 695,650 C 710,670 722,695 730,720"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.1"
            opacity="0.65"
          />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 4: FLYING BIRDS & FINAL TECHNICAL DETAILS                      */}
        {/* ===================================================================== */}
        <g id="stage-flying-birds" className="sketch-fine-details opacity-85">
          {/* Flock of 6 Architectural Silhouette Birds Soaring Across the Open Sky */}
          {/* Bird 1 */}
          <path
            d="M 640,270 Q 646,263 652,268 Q 658,263 664,270"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.4"
          />
          {/* Bird 2 */}
          <path
            d="M 668,282 Q 673,276 678,280 Q 683,276 688,282"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.3"
          />
          {/* Bird 3 (Apex lead bird) */}
          <path
            d="M 692,264 Q 698,257 704,262 Q 710,257 716,264"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.5"
          />
          {/* Bird 4 */}
          <path
            d="M 714,292 Q 719,286 724,290 Q 729,286 734,292"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.2"
          />
          {/* Bird 5 */}
          <path
            d="M 738,276 Q 743,270 748,274 Q 753,270 758,276"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.3"
          />
          {/* Bird 6 */}
          <path
            d="M 680,306 Q 685,300 690,304 Q 695,300 700,306"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.2"
          />

          {/* Micro-scale technical crosshairs at the horizon line */}
          <g className="sketch-path" strokeWidth="0.5" opacity="0.6">
            <line x1="510" y1="562" x2="510" y2="568" pathLength="1" />
            <line x1="507" y1="565" x2="513" y2="565" pathLength="1" />
            <line x1="840" y1="562" x2="840" y2="568" pathLength="1" />
            <line x1="837" y1="565" x2="843" y2="565" pathLength="1" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ArchitecturalLineArt;

