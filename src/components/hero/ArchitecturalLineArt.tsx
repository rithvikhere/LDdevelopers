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
            d="M 370,545 C 400,550 430,570 460,595"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Lower sleeve contour */}
          <path
            d="M 445,772 C 415,765 385,748 365,726"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Sleeve Cuff Seam */}
          <path
            d="M 460,595 C 455,640 450,710 445,772"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Sleeve Fabric Creases & Tailoring Folds */}
          <path
            d="M 390,565 C 415,580 435,620 445,670"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 380,720 C 405,715 425,700 440,685"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 425,605 C 430,645 428,680 422,720"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* LEFT SHIRT CUFF (Crisp French Double Cuff) */}
          <path
            d="M 460,595 L 478,610 C 474,650 468,715 460,782 L 445,772"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.5"
          />
          {/* Cuff Stitching Detail */}
          <path
            d="M 473,615 C 469,655 463,715 455,777"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
            strokeDasharray="3 2"
            opacity="0.8"
          />
          {/* Cufflink Oval Outline */}
          <ellipse cx="468" cy="742" rx="3.5" ry="5.5" className="sketch-path" pathLength="1" strokeWidth="0.9" />

          {/* RIGHT SUIT SLEEVE */}
          {/* Upper sleeve contour */}
          <path
            d="M 990,535 C 950,545 915,570 875,600"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Lower sleeve contour */}
          <path
            d="M 850,766 C 890,755 940,735 985,715"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Sleeve Cuff Seam */}
          <path
            d="M 875,600 C 868,645 860,715 850,766"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Right Sleeve Fabric Folds */}
          <path
            d="M 960,555 C 930,575 905,620 890,665"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 965,705 C 935,695 905,685 885,675"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 905,605 C 895,645 892,680 885,720"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* RIGHT SHIRT CUFF */}
          <path
            d="M 875,600 L 858,612 C 850,650 842,720 832,776 L 850,766"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.5"
          />
          {/* Cuff Stitching Detail */}
          <path
            d="M 862,618 C 854,655 846,720 837,771"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
            strokeDasharray="3 2"
            opacity="0.8"
          />
          {/* Cufflink Detail */}
          <ellipse cx="848" cy="736" rx="3.5" ry="5.5" className="sketch-path" pathLength="1" strokeWidth="0.9" />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 3.5: THE ANATOMICAL HANDSHAKE — CLASP, FINGERS & WRISTS         */}
        {/* ===================================================================== */}
        <g id="stage-handshake-contours" className="sketch-handshake">
          {/* --- RIGHT HAND (TOP OF HANDSHAKE & THUMB) --- */}
          {/* Wrist ridge from right cuff to thumb base */}
          <path
            d="M 858,612 C 830,605 795,595 760,590"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.7"
          />
          {/* Thumb outer curve spanning gracefully across the clasp */}
          <path
            d="M 760,590 C 730,590 705,605 680,630 C 660,650 635,665 615,660 C 598,655 593,638 604,626 C 615,615 630,610 650,608"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Thumb nail & cuticle outline */}
          <path
            d="M 605,645 C 603,637 608,631 617,629"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.1"
          />
          {/* Thumb interphalangeal joint crease */}
          <path
            d="M 645,622 C 648,632 645,642 638,648"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.8"
          />
          {/* Thenar eminence pad curve (base of thumb muscle) */}
          <path
            d="M 700,620 C 685,645 665,665 640,675"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.1"
            opacity="0.85"
          />

          {/* --- LEFT HAND (TOP CREST, WEB & WRIST) --- */}
          {/* Left wrist ridge from left cuff to dorsal web */}
          <path
            d="M 478,610 C 510,618 540,630 570,650"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.7"
          />
          {/* Left hand dorsal ridge entering clasp under right thumb */}
          <path
            d="M 570,650 C 595,665 625,675 660,675"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.7"
          />
          {/* Dorsal tendon shading & knuckle lines on left hand */}
          <path
            d="M 515,630 C 545,642 575,660 600,680"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.9"
            opacity="0.75"
          />
          <path
            d="M 535,648 C 560,658 580,672 598,690"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.8"
            opacity="0.65"
          />

          {/* --- THE FOUR CLASPING FINGERS (WRAPPING UNDERNEATH) --- */}
          {/* FINGER 1: INDEX FINGER */}
          <path
            d="M 660,675 C 680,685 700,698 715,715 C 725,728 720,745 705,752 C 690,755 675,745 665,732"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Index nail */}
          <path
            d="M 718,728 C 720,735 715,742 708,745"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.0"
          />
          {/* Index knuckle crease */}
          <path
            d="M 690,705 C 695,715 692,725 685,730"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.85"
            opacity="0.8"
          />

          {/* FINGER 2: MIDDLE FINGER (Longest, Main Firm Grip) */}
          <path
            d="M 655,730 C 665,748 678,770 690,785 C 698,795 688,808 672,808 C 655,808 642,795 632,775"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Middle finger nail */}
          <path
            d="M 686,792 C 688,798 682,804 675,805"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.0"
          />
          {/* Middle finger joint creases */}
          <path
            d="M 658,750 C 665,760 662,770 655,775"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.85"
            opacity="0.8"
          />

          {/* FINGER 3: RING FINGER */}
          <path
            d="M 632,775 C 640,792 650,810 660,820 C 668,828 658,836 644,836 C 630,836 618,822 610,802"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.75"
          />
          {/* Ring finger nail */}
          <path
            d="M 656,822 C 658,828 652,833 646,834"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.95"
          />
          {/* Ring finger joint creases */}
          <path
            d="M 630,785 C 636,794 632,802 626,806"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.8"
            opacity="0.8"
          />

          {/* FINGER 4: PINKY FINGER (Tucked Firmly Inside) */}
          <path
            d="M 610,802 C 616,818 624,832 632,840 C 638,846 630,852 618,850 C 606,848 596,836 590,818"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Pinky joint crease */}
          <path
            d="M 606,812 C 612,818 608,826 602,828"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.75"
            opacity="0.75"
          />

          {/* --- PALM INTERLOCKING PRESSURE & WRIST EMBEDMENT --- */}
          {/* Interlocking palm boundary */}
          <path
            d="M 630,665 C 635,685 640,710 645,735"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.4"
            opacity="0.8"
          />
          {/* Right hand thenar/hypothenar ridge */}
          <path
            d="M 710,645 C 730,665 745,690 755,720"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.3"
            opacity="0.75"
          />
          {/* Right hand dorsal tendon contours (Extensor tendons) */}
          <g className="sketch-path" strokeWidth="0.85" opacity="0.6">
            <path d="M 820,620 C 785,625 750,640 720,665" pathLength="1" />
            <path d="M 830,640 C 800,650 770,668 745,690" pathLength="1" />
            <path d="M 840,665 C 815,675 790,695 770,720" pathLength="1" />
          </g>

          {/* Lower wrist edge of right hand connecting to cuff */}
          <path
            d="M 832,776 C 810,772 780,755 755,720"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
          />
          {/* Lower wrist edge of left hand connecting to cuff */}
          <path
            d="M 460,782 C 485,790 515,800 550,808 C 570,812 585,815 590,818"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.6"
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
