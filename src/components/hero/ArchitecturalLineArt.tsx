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
        {/* STAGE 3: FORMAL SUIT SLEEVES & SHIRT CUFFS                           */}
        {/* ===================================================================== */}
        <g id="stage-sleeves-and-cuffs" className="sketch-arms">
          {/* Left Suit Sleeve */}
          <path
            d="M 290.3,376.2 L 297.3,376.2 L 398.1,440.6 L 342.1,548.4 L 323.2,593.9 L 304.3,647.8 L 302.9,648.5 L 249.7,622.6 L 249.7,579.2 L 256.0,556.1 L 273.5,474.9 L 286.8,402.8 L 290.3,376.9 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Left Sleeve Tailoring Crease Lines */}
          <path
            d="M 285,580 C 315,610 338,655 352,705"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.85"
            opacity="0.75"
          />

          {/* Right Suit Sleeve */}
          <path
            d="M 811.8,439.2 L 836.3,426.6 L 863.5,410.5 L 911.9,379.0 L 923.0,411.2 L 932.1,447.6 L 944.0,509.2 L 958.0,592.5 L 958.0,620.5 L 911.1,645.7 L 901.4,650.6 L 900.0,649.9 L 882.5,582.7 L 862.1,526.0 L 850.3,499.4 L 837.0,474.2 L 825.0,456.0 L 811.8,439.9 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.8"
          />
          {/* Right Sleeve Tailoring Creases */}
          <path
            d="M 915,580 C 885,610 862,655 848,705"
            className="sketch-path"
            pathLength="1"
            strokeWidth="0.85"
            opacity="0.75"
          />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 3.5: ICONIC HANDSHAKE CONTOURS & 4 CLASPING FINGERS            */}
        {/* ===================================================================== */}
        <g id="stage-handshake-contours" className="sketch-handshake">
          {/* Left Hand: Palm, Thumb Pocket & 4 Clasping Diagonal Fingers */}
          <path
            d="M 413.5,477.0 L 412.1,483.3 L 415.6,487.5 L 450.6,507.1 L 460.4,512.0 L 469.5,514.8 L 485.6,515.5 L 508.0,512.0 L 547.9,508.5 L 539.5,526.0 L 514.3,561.7 L 511.5,569.4 L 511.5,577.1 L 512.9,580.6 L 521.3,590.4 L 528.3,594.6 L 543.7,598.8 L 557.7,598.8 L 568.2,596.7 L 582.9,590.4 L 591.3,584.1 L 601.0,572.9 L 607.4,563.1 L 624.2,569.4 L 650.8,582.7 L 665.5,593.9 L 684.4,614.9 L 761.4,690.5 L 771.9,705.9 L 777.5,717.1 L 778.9,722.0 L 778.1,735.3 L 775.4,740.2 L 768.4,745.8 L 763.5,747.2 L 754.4,745.8 L 736.9,731.8 L 673.9,666.7 L 673.2,668.8 L 678.8,680.7 L 689.3,696.8 L 700.5,710.1 L 733.4,742.3 L 736.2,746.5 L 739.0,754.2 L 738.3,766.1 L 732.0,775.9 L 723.5,780.8 L 711.7,782.2 L 701.9,778.7 L 692.0,769.6 L 666.9,740.2 L 643.8,717.1 L 643.0,718.5 L 645.2,724.1 L 653.5,739.5 L 683.0,778.7 L 685.8,787.1 L 684.4,797.6 L 677.4,806.0 L 668.3,810.2 L 658.5,810.2 L 647.3,806.7 L 631.9,781.5 L 618.5,768.9 L 603.9,759.8 L 602.5,761.9 L 624.9,786.4 L 631.9,796.2 L 636.0,807.4 L 636.0,815.1 L 634.0,820.0 L 625.5,827.0 L 611.5,831.2 L 599.0,831.2 L 610.2,821.4 L 616.5,810.9 L 617.9,801.8 L 616.5,793.4 L 613.7,787.1 L 606.0,779.4 L 599.0,776.6 L 592.7,775.9 L 582.9,778.0 L 580.8,765.4 L 578.0,759.1 L 571.0,750.7 L 566.0,747.9 L 554.2,746.5 L 538.8,751.4 L 540.9,743.0 L 540.2,733.2 L 533.9,720.6 L 526.2,713.6 L 517.8,710.1 L 508.0,709.4 L 479.3,719.2 L 479.3,702.4 L 475.1,693.3 L 468.8,686.3 L 457.6,680.7 L 447.1,680.0 L 440.1,681.4 L 424.7,687.7 L 401.6,652.0 L 389.7,638.7 L 379.2,632.4 L 350.5,621.2 L 347.7,623.3 L 340.7,638.7 L 336.5,644.3 L 330.9,648.5 L 332.3,633.8 L 366.6,551.2 L 401.6,480.5 L 408.6,473.5 L 412.1,474.2 L 412.8,476.3 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.85"
          />

          {/* Right Hand: Arching Thumb, Wrist & Feathered Muscle Creases */}
          <path
            d="M 795.6,483.3 L 795.0,472.8 L 799.9,472.1 L 805.5,473.5 L 812.5,477.7 L 823.6,491.7 L 836.3,517.6 L 846.8,543.5 L 857.3,579.2 L 861.5,601.6 L 862.1,628.9 L 860.0,640.1 L 848.1,619.1 L 844.6,616.3 L 838.4,618.4 L 828.5,628.2 L 814.5,650.6 L 804.0,663.9 L 790.8,676.5 L 776.1,687.0 L 774.0,687.0 L 744.5,655.5 L 745.3,654.1 L 761.4,647.8 L 776.1,637.3 L 773.3,636.6 L 757.2,641.5 L 745.3,641.5 L 750.2,640.1 L 764.1,632.4 L 783.0,617.0 L 781.0,616.3 L 762.8,625.4 L 747.4,629.6 L 727.8,629.6 L 715.9,626.1 L 729.2,621.2 L 733.4,618.4 L 711.7,613.5 L 701.9,608.6 L 692.0,599.5 L 659.2,565.9 L 651.5,553.3 L 647.3,542.8 L 643.8,528.8 L 641.7,534.4 L 642.4,549.8 L 643.8,554.0 L 613.0,551.9 L 613.0,537.9 L 610.2,529.5 L 606.7,544.2 L 599.7,557.5 L 586.4,572.2 L 577.3,578.5 L 560.5,584.8 L 542.3,584.8 L 529.0,579.9 L 524.0,574.3 L 525.5,567.3 L 538.8,550.5 L 563.3,510.6 L 569.5,503.6 L 575.9,500.1 L 615.0,489.6 L 641.7,478.4 L 650.8,476.3 L 658.5,476.3 L 671.8,480.5 L 717.3,507.1 L 740.4,516.2 L 743.2,514.1 L 761.4,509.2 L 781.0,499.4 L 792.9,491.0 L 795.6,486.8 L 795.6,484.0 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="1.85"
          />

          {/* 4 Curled Fingers of Right Hand Wrapping From Underneath Along Lower-Left */}
          <g id="stage-curled-fingers">
            <path
              d="M 410.0,699.6 L 411.4,697.5 L 410.0,708.7 L 411.4,712.9 L 413.5,713.6 L 436.6,695.4 L 443.6,692.6 L 452.7,692.6 L 461.1,696.1 L 467.4,702.4 L 470.2,709.4 L 468.8,717.8 L 461.1,729.7 L 452.7,738.1 L 445.7,743.0 L 442.2,744.4 L 435.2,744.4 L 423.3,741.6 L 414.9,736.0 L 410.7,731.1 L 406.5,720.6 L 406.5,709.4 L 410.0,700.3 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.75"
            />
            <path
              d="M 454.1,753.5 L 458.3,748.6 L 466.7,743.7 L 498.2,727.6 L 504.5,725.5 L 512.2,726.2 L 519.2,730.4 L 525.5,738.1 L 528.3,744.4 L 527.5,752.1 L 522.0,759.1 L 496.8,780.1 L 485.6,785.7 L 475.1,785.7 L 469.5,783.6 L 457.6,768.9 L 454.1,761.2 L 454.1,754.2 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.75"
            />
            <path
              d="M 498.9,792.0 L 521.3,774.5 L 533.2,767.5 L 549.3,760.5 L 553.5,759.8 L 563.3,764.0 L 568.9,769.6 L 571.7,776.6 L 571.7,785.7 L 568.9,791.3 L 535.3,818.6 L 527.5,822.1 L 517.8,821.4 L 508.7,815.1 L 498.9,802.5 L 497.5,799.0 L 497.5,794.8 L 498.9,792.7 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.75"
            />
            <path
              d="M 549.3,817.9 L 553.5,813.0 L 588.5,790.6 L 594.8,789.9 L 599.0,791.3 L 606.0,797.6 L 608.8,803.9 L 608.8,811.6 L 603.2,821.4 L 591.3,832.6 L 583.5,836.8 L 560.5,836.8 L 557.7,835.4 L 550.7,828.4 L 548.5,823.5 L 549.3,818.6 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.75"
            />
          </g>
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

