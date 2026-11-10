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
        {/* STAGE 2: CITY SKYLINE — MAJOR SILHOUETTES & STRUCTURES (ENHANCED LINE WEIGHT) */}
        {/* ===================================================================== */}
        <g id="stage-skyline-silhouettes" className="sketch-skyline">
          {/* TOWER 1: SIGNATURE SKYSCRAPER (Far Right, Iconic Apex) */}
          {/* Silhouette Outlines */}
          <path
            d="M 800,492 L 800,240 L 812,240 L 812,175 L 824,175 L 824,135 L 865,95 L 865,75 M 865,95 L 882,135 L 882,215 L 874,215 L 874,492"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.5"
          />
          {/* Crown Chiseled Chamfer & Spire Antenna */}
          <line x1="865" y1="75" x2="865" y2="55" className="sketch-path" pathLength="1" strokeWidth="2.0" />
          <path d="M 824,135 L 882,135" className="sketch-path" pathLength="1" strokeWidth="1.8" />
          <path d="M 812,175 L 874,215" className="sketch-path" pathLength="1" strokeWidth="1.6" />

          {/* TOWER 2: STEPPED HIGH-RISE TOWER (Adjacent to Signature Tower) */}
          <path
            d="M 742,492 L 742,320 L 756,320 L 756,270 L 782,270 L 782,310 L 794,310 L 794,492"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.3"
          />
          {/* Mechanical Penthouse & Mast */}
          <rect x="760" y="254" width="18" height="16" className="sketch-path" pathLength="1" strokeWidth="1.5" />
          <line x1="769" y1="254" x2="769" y2="230" className="sketch-path" pathLength="1" strokeWidth="1.4" />

          {/* TOWER 3: CENTRAL MID-RISE RESIDENTIAL / COMMERCIAL BLOCK */}
          <path
            d="M 640,492 L 640,375 L 685,375 L 685,358 L 716,358 L 716,375 L 736,375 L 736,492"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.3"
          />

          {/* TOWER 4: STEPPED CENTRAL-LEFT MODERN COMPLEX */}
          <path
            d="M 536,492 L 536,345 L 568,345 L 568,308 L 606,308 L 606,352 L 634,352 L 634,492"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.3"
          />
          {/* Cantilever Box Highlight */}
          <path d="M 568,308 L 606,308 L 606,326 L 568,326 Z" className="sketch-path" pathLength="1" strokeWidth="1.8" />

          {/* TOWER 5: LEFT CORNER HIGH-RISE */}
          <path
            d="M 445,492 L 445,365 L 482,365 L 482,338 L 512,338 L 512,365 L 530,365 L 530,492"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.3"
          />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 2.5: SKYLINE DETAILS — WINDOW MULLIONS, FLOORS & FACADES       */}
        {/* ===================================================================== */}
        <g id="stage-skyline-facades" className="sketch-building-detail opacity-90">
          {/* TOWER 1 VERTICAL MULLIONS */}
          <g className="sketch-path" strokeWidth="1.3">
            <line x1="816" y1="175" x2="816" y2="492" pathLength="1" />
            <line x1="828" y1="140" x2="828" y2="492" pathLength="1" />
            <line x1="840" y1="120" x2="840" y2="492" pathLength="1" />
            <line x1="852" y1="110" x2="852" y2="492" pathLength="1" />
            <line x1="864" y1="105" x2="864" y2="492" pathLength="1" />
            <line x1="874" y1="145" x2="874" y2="492" pathLength="1" />
          </g>

          {/* TOWER 1 HORIZONTAL FLOOR SLABS (Spandrels) */}
          <g className="sketch-path" strokeWidth="1.1">
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
          </g>

          {/* TOWER 2 STRUCTURAL CROSS BRACING & FACADES */}
          <g className="sketch-path" strokeWidth="1.2">
            <line x1="756" y1="290" x2="782" y2="290" pathLength="1" />
            <line x1="742" y1="340" x2="794" y2="340" pathLength="1" />
            <line x1="742" y1="365" x2="794" y2="365" pathLength="1" />
            <line x1="742" y1="390" x2="794" y2="390" pathLength="1" />
            <line x1="742" y1="415" x2="794" y2="415" pathLength="1" />
            <line x1="742" y1="440" x2="794" y2="440" pathLength="1" />
            <line x1="742" y1="465" x2="794" y2="465" pathLength="1" />
            <line x1="742" y1="490" x2="794" y2="490" pathLength="1" />
            {/* Diagonal Trusses */}
            <line x1="742" y1="390" x2="794" y2="440" pathLength="1" strokeDasharray="3 2" />
            <line x1="794" y1="390" x2="742" y2="440" pathLength="1" strokeDasharray="3 2" />
          </g>

          {/* TOWER 3 RIBBON WINDOWS (Horizontal Architectural Slits) */}
          <g className="sketch-path" strokeWidth="1.3">
            <line x1="645" y1="390" x2="730" y2="390" pathLength="1" />
            <line x1="645" y1="400" x2="730" y2="400" pathLength="1" />
            <line x1="645" y1="416" x2="730" y2="416" pathLength="1" />
            <line x1="645" y1="426" x2="730" y2="426" pathLength="1" />
            <line x1="645" y1="442" x2="730" y2="442" pathLength="1" />
            <line x1="645" y1="452" x2="730" y2="452" pathLength="1" />
            <line x1="645" y1="468" x2="730" y2="468" pathLength="1" />
            <line x1="645" y1="478" x2="730" y2="478" pathLength="1" />
            {/* Vertical Mullion Ties */}
            <line x1="662" y1="375" x2="662" y2="492" pathLength="1" strokeWidth="1.0" />
            <line x1="684" y1="375" x2="684" y2="492" pathLength="1" strokeWidth="1.0" />
            <line x1="706" y1="375" x2="706" y2="492" pathLength="1" strokeWidth="1.0" />
          </g>

          {/* TOWER 4 & 5 GEOMETRIC GRID WINDOWS */}
          <g className="sketch-path" strokeWidth="1.1">
            <line x1="536" y1="370" x2="634" y2="370" pathLength="1" />
            <line x1="536" y1="395" x2="634" y2="395" pathLength="1" />
            <line x1="536" y1="420" x2="634" y2="420" pathLength="1" />
            <line x1="536" y1="445" x2="634" y2="445" pathLength="1" />
            <line x1="536" y1="470" x2="634" y2="470" pathLength="1" />
            <line x1="554" y1="345" x2="554" y2="492" pathLength="1" />
            <line x1="586" y1="308" x2="586" y2="492" pathLength="1" />
            <line x1="616" y1="352" x2="616" y2="492" pathLength="1" />

            {/* Left Tower 5 Grid */}
            <line x1="445" y1="390" x2="530" y2="390" pathLength="1" />
            <line x1="445" y1="415" x2="530" y2="415" pathLength="1" />
            <line x1="445" y1="440" x2="530" y2="440" pathLength="1" />
            <line x1="445" y1="465" x2="530" y2="465" pathLength="1" />
            <line x1="472" y1="365" x2="472" y2="492" pathLength="1" />
            <line x1="500" y1="338" x2="500" y2="492" pathLength="1" />
          </g>

          {/* Podium Level Baseline — Connecting Directly with the Handshake Top */}
          <line x1="420" y1="492" x2="900" y2="492" className="sketch-path" pathLength="1" strokeWidth="2.0" />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 3: FORMAL SUIT SLEEVES & SHIRT CUFFS                           */}
        {/* ===================================================================== */}
        <g id="stage-sleeves-and-cuffs" className="sketch-arms">
          {/* Left Suit Sleeve */}
          <path
            d="M 319.0,401.2 L 325.4,401.2 L 416.8,459.6 L 366.0,557.4 L 348.9,598.7 L 331.7,647.6 L 330.4,648.2 L 282.2,624.7 L 282.2,585.3 L 287.9,564.4 L 303.8,490.7 L 315.8,425.3 L 319.0,401.8 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.0"
          />

          {/* Right Suit Sleeve */}
          <path
            d="M 792.1,458.3 L 814.3,446.9 L 839.1,432.3 L 882.9,403.7 L 893.1,432.9 L 901.3,466.0 L 912.1,521.8 L 924.8,597.4 L 924.8,622.8 L 882.3,645.7 L 873.4,650.1 L 872.1,649.5 L 856.2,588.5 L 837.8,537.1 L 827.0,513.0 L 814.9,490.1 L 804.2,473.6 L 792.1,459.0 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.0"
          />
        </g>

        {/* ===================================================================== */}
        {/* STAGE 3.5: ICONIC HANDSHAKE CONTOURS (MEETING BASELINE DIRECTLY)      */}
        {/* ===================================================================== */}
        <g id="stage-handshake-contours" className="sketch-handshake">
          {/* Left Hand: Palm, Thumb Pocket & 4 Clasping Diagonal Fingers */}
          <path
            d="M 430.8,492.6 L 429.5,498.4 L 432.7,502.2 L 464.4,519.9 L 473.3,524.4 L 481.6,526.9 L 496.2,527.6 L 516.5,524.4 L 552.7,521.2 L 545.1,537.1 L 522.2,569.5 L 519.7,576.5 L 519.7,583.4 L 520.9,586.6 L 528.6,595.5 L 534.9,599.3 L 548.9,603.1 L 561.6,603.1 L 571.1,601.2 L 584.4,595.5 L 592.1,589.8 L 601.0,579.6 L 606.7,570.7 L 621.9,576.5 L 646.0,588.5 L 659.4,598.7 L 676.5,617.7 L 746.4,686.3 L 755.9,700.3 L 761.0,710.4 L 762.2,714.9 L 761.6,727.0 L 759.1,731.4 L 752.7,736.5 L 748.3,737.7 L 740.0,736.5 L 724.1,723.8 L 667.0,664.7 L 666.4,666.6 L 671.4,677.4 L 681.0,692.0 L 691.1,704.1 L 721.0,733.3 L 723.5,737.1 L 726.0,744.1 L 725.4,754.9 L 719.7,763.8 L 712.1,768.2 L 701.3,769.5 L 692.4,766.3 L 683.5,758.1 L 660.6,731.4 L 639.7,710.4 L 639.1,711.7 L 641.0,716.8 L 648.6,730.8 L 675.2,766.3 L 677.8,773.9 L 676.5,783.5 L 670.2,791.1 L 661.9,794.9 L 653.0,794.9 L 642.9,791.7 L 628.9,768.9 L 616.8,757.4 L 603.5,749.2 L 602.2,751.1 L 622.5,773.3 L 628.9,782.2 L 632.7,792.4 L 632.7,799.3 L 630.8,803.8 L 623.2,810.1 L 610.5,813.9 L 599.0,813.9 L 609.2,805.1 L 614.9,795.5 L 616.2,787.3 L 614.9,779.7 L 612.4,773.9 L 605.4,767.0 L 599.0,764.4 L 593.3,763.8 L 584.4,765.7 L 582.5,754.3 L 580.0,748.5 L 573.6,740.9 L 569.2,738.4 L 558.4,737.1 L 544.4,741.6 L 546.3,733.9 L 545.7,725.0 L 540.0,713.6 L 533.0,707.3 L 525.4,704.1 L 516.5,703.5 L 490.5,712.3 L 490.5,697.1 L 486.7,688.9 L 480.9,682.5 L 470.8,677.4 L 461.3,676.8 L 454.9,678.1 L 440.9,683.8 L 420.0,651.4 L 409.2,639.3 L 399.7,633.6 L 373.6,623.4 L 371.1,625.4 L 364.7,639.3 L 360.9,644.4 L 355.8,648.2 L 357.1,634.9 L 388.2,559.9 L 420.0,495.8 L 426.3,489.5 L 429.5,490.1 L 430.1,492.0 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.0"
          />

          {/* Right Hand: Arching Thumb, Wrist & Feathered Muscle Creases */}
          <path
            d="M 777.5,498.4 L 776.8,488.8 L 781.3,488.2 L 786.4,489.5 L 792.7,493.3 L 802.9,506.0 L 814.3,529.5 L 823.8,553.0 L 833.4,585.3 L 837.2,605.7 L 837.8,630.4 L 835.9,640.6 L 825.1,621.5 L 821.9,619.0 L 816.2,620.9 L 807.3,629.8 L 794.6,650.1 L 785.1,662.2 L 773.0,673.6 L 759.7,683.1 L 757.8,683.1 L 731.1,654.6 L 731.8,653.3 L 746.4,647.6 L 759.7,638.0 L 757.2,637.4 L 742.6,641.9 L 731.8,641.9 L 736.2,640.6 L 748.9,633.6 L 766.1,619.6 L 764.1,619.0 L 747.6,627.3 L 733.7,631.1 L 715.9,631.1 L 705.1,627.9 L 717.2,623.4 L 721.0,620.9 L 701.3,616.5 L 692.4,612.0 L 683.5,603.8 L 653.7,573.3 L 646.7,561.9 L 642.9,552.3 L 639.7,539.6 L 637.8,544.7 L 638.4,558.7 L 639.7,562.5 L 611.7,560.6 L 611.7,547.9 L 609.2,540.3 L 606.0,553.6 L 599.7,565.7 L 587.6,579.0 L 579.4,584.7 L 564.1,590.4 L 547.6,590.4 L 535.5,586.0 L 531.1,580.9 L 532.4,574.5 L 544.4,559.3 L 566.7,523.1 L 572.4,516.8 L 578.1,513.6 L 613.7,504.1 L 637.8,493.9 L 646.0,492.0 L 653.0,492.0 L 665.1,495.8 L 706.4,519.9 L 727.3,528.2 L 729.9,526.3 L 746.4,521.8 L 764.1,513.0 L 774.9,505.3 L 777.5,501.5 L 777.5,499.0 Z"
            className="sketch-path"
            pathLength="1"
            strokeWidth="2.0"
          />

          {/* 4 Curled Fingers of Right Hand Wrapping From Underneath Along Lower-Left */}
          <g id="stage-curled-fingers">
            <path
              d="M 427.6,694.6 L 428.9,692.7 L 427.6,702.8 L 428.9,706.6 L 430.8,707.3 L 451.7,690.8 L 458.1,688.2 L 466.3,688.2 L 474.0,691.4 L 479.7,697.1 L 482.2,703.5 L 480.9,711.1 L 474.0,721.9 L 466.3,729.5 L 460.0,733.9 L 456.8,735.2 L 450.5,735.2 L 439.7,732.7 L 432.0,727.6 L 428.2,723.1 L 424.4,713.6 L 424.4,703.5 L 427.6,695.2 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.8"
            />
            <path
              d="M 467.6,743.5 L 471.4,739.0 L 479.0,734.6 L 507.6,720.0 L 513.3,718.1 L 520.3,718.7 L 526.7,722.5 L 532.4,729.5 L 534.9,735.2 L 534.3,742.2 L 529.2,748.5 L 506.3,767.6 L 496.2,772.7 L 486.7,772.7 L 481.6,770.8 L 470.8,757.4 L 467.6,750.4 L 467.6,744.1 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.8"
            />
            <path
              d="M 508.2,778.4 L 528.6,762.5 L 539.4,756.2 L 554.0,749.8 L 557.8,749.2 L 566.7,753.0 L 571.7,758.1 L 574.3,764.4 L 574.3,772.7 L 571.7,777.8 L 541.3,802.5 L 534.3,805.7 L 525.4,805.1 L 517.1,799.3 L 508.2,787.9 L 507.0,784.7 L 507.0,780.9 L 508.2,779.0 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.8"
            />
            <path
              d="M 554.0,801.9 L 557.8,797.4 L 589.5,777.1 L 595.2,776.5 L 599.0,777.8 L 605.4,783.5 L 607.9,789.2 L 607.9,796.2 L 602.9,805.1 L 592.1,815.2 L 585.1,819.0 L 564.1,819.0 L 561.6,817.8 L 555.2,811.4 L 553.3,807.0 L 554.0,802.5 Z"
              className="sketch-path"
              pathLength="1"
              strokeWidth="1.8"
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

