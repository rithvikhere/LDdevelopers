import React from "react";

type Stop = [number, string, number?];

function Lin({ id, stops, x2 = 1, y2 = 0 }: { id: string; stops: Stop[]; x2?: number; y2?: number }) {
  return (
    <linearGradient id={`lcs-${id}`} x1={0} y1={0} x2={x2} y2={y2}>
      {stops.map(([o, c, a], i) => (
        <stop key={i} offset={o} stopColor={c} stopOpacity={a ?? 1} />
      ))}
    </linearGradient>
  );
}

/** A rounded-limb gradient: light on the left, base, darker on the right (soft matte figurine finish). */
const cyl = (id: string, light: string, base: string, dark: string) => (
  <Lin key={id} id={id} stops={[[0, light], [0.42, base], [1, dark]]} />
);

/** Shared paint for the whole scene (ids are prefixed lcs- and referenced across the stacked layers). */
export function Defs() {
  return (
    <defs>
      {/* figure materials */}
      {cyl("skinA", "#CE9670", "#B07A55", "#8A5A3A")}
      {cyl("skinAShade", "#A87452", "#93623F", "#734A2E")}
      {cyl("skinB", "#B5825E", "#9A6847", "#74492F")}
      {cyl("skinBShade", "#8D5E3F", "#7C5034", "#5F3C25")}
      {cyl("skinC", "#DDA67E", "#C68B62", "#9C6641")}
      {cyl("skinCShade", "#B57D57", "#A06E4C", "#7F5435")}
      {cyl("skinD", "#C08A63", "#A5724F", "#7E5336")}
      {cyl("skinDShade", "#9A6C4B", "#87603F", "#684830")}
      {cyl("sage", "#C6D4AE", "#A9BB8E", "#82946A")}
      {cyl("sageShade", "#9CAD82", "#8A9B70", "#6A7A54")}
      {cyl("olive", "#94A27F", "#748363", "#566348")}
      {cyl("oliveShade", "#6F7D5D", "#5F6C4F", "#47513A")}
      {cyl("shirtWhite", "#F3F1EA", "#E2DED2", "#BDB8AA")}
      {cyl("shirtWhiteShade", "#CFCBBF", "#BFBAAD", "#9E998C")}
      {cyl("beige", "#E0CDA8", "#C7AE84", "#9E865E")}
      {cyl("beigeShade", "#BBA37A", "#A8916A", "#86704C")}
      {cyl("denim", "#859FB8", "#5E7A96", "#435C74")}
      {cyl("denimShade", "#5C7690", "#4C657E", "#394E63")}
      {cyl("jeans", "#7590AA", "#56718C", "#3E556C")}
      {cyl("jeansShade", "#526C85", "#455C72", "#33465A")}
      {cyl("charcoal", "#62615C", "#454440", "#2E2D2A")}
      {cyl("charcoalShade", "#4B4A46", "#3A3936", "#272624")}
      {cyl("khaki", "#D6C193", "#BCA273", "#93794E")}
      {cyl("khakiShade", "#AE9668", "#9C8459", "#7B6641")}
      {cyl("vest", "#DB9864", "#C98552", "#A2633A")}
      {cyl("tan", "#D9AA72", "#B88550", "#8C5F33")}
      {cyl("tanShade", "#A57A4A", "#93693E", "#704E2C")}
      {cyl("darkBoot", "#71594A", "#4E3D32", "#33271F")}
      {cyl("darkBootShade", "#4F3E33", "#3F3129", "#2A201A")}
      {cyl("glove", "#5B5954", "#43413D", "#2E2C29")}
      {cyl("leather", "#A8774A", "#8A5E37", "#674327")}
      {cyl("terracotta", "#C98F6E", "#B77B5B", "#925C40")}
      {cyl("wood", "#C79B69", "#B48D5E", "#8E6A41")}
      {cyl("mixerDrum", "#E0A26E", "#C98552", "#9A5F36")}
      {cyl("cone", "#E3A070", "#D08A50", "#A6683A")}
      <Lin id="steel" stops={[[0, "#E2E6E3"], [0.5, "#B3B9B6"], [1, "#7E8582"]]} x2={1} y2={1} />
      <Lin id="steel-dark" stops={[[0, "#4A4944"], [1, "#2E2D2A"]]} />
      <Lin id="blueprint" stops={[[0, "#9CBAD0"], [1, "#7397B2"]]} x2={0.4} y2={1} />
      <radialGradient id="lcs-helmet" cx={0.34} cy={0.3} r={0.85}>
        <stop offset={0} stopColor="#F4DA9C" />
        <stop offset={0.45} stopColor="#D7AB58" />
        <stop offset={1} stopColor="#A47A33" />
      </radialGradient>
      <Lin id="helmetBrim" stops={[[0, "#E1BA6C"], [1, "#B08739"]]} x2={0} y2={1} />
      <radialGradient id="lcs-contact">
        <stop offset={0} stopColor="#0E0E0C" stopOpacity={0.42} />
        <stop offset={1} stopColor="#0E0E0C" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="lcs-sand" cx={0.45} cy={0.25} r={0.9}>
        <stop offset={0} stopColor="#E6D3A6" />
        <stop offset={0.6} stopColor="#CDB483" />
        <stop offset={1} stopColor="#AD9465" />
      </radialGradient>

      {/* architecture */}
      <Lin id="render" stops={[[0, "#F7F4EC"], [1, "#E8E4D7"]]} x2={0} y2={1} />
      <Lin id="renderSide" stops={[[0, "#DBD6C7"], [1, "#C9C3B1"]]} x2={0} y2={1} />
      <Lin id="roofTop" stops={[[0, "#E2DFD3"], [1, "#EFECE2"]]} x2={0} y2={1} />
      <Lin id="concrete" stops={[[0, "#D3D3C7"], [1, "#BCBCAE"]]} x2={0} y2={1} />
      <Lin id="concreteSide" stops={[[0, "#B8B8AA"], [1, "#A7A799"]]} x2={0} y2={1} />
      <Lin id="concreteTop" stops={[[0, "#D2D1C5"], [1, "#DFDED3"]]} x2={0} y2={1} />
      <Lin id="stone" stops={[[0, "#706C63"], [1, "#56524A"]]} x2={0} y2={1} />
      <Lin id="interior" stops={[[0, "#33322E"], [1, "#46453F"]]} x2={0} y2={1} />
      <Lin id="glass" stops={[[0, "#B6C6C4"], [0.55, "#7D9293"], [1, "#5D7173"]]} x2={0.5} y2={1} />
      <Lin id="glassSide" stops={[[0, "#93A6A6"], [1, "#56696B"]]} x2={0.5} y2={1} />
      <Lin id="timber" stops={[[0, "#B98A5A"], [1, "#94693F"]]} x2={1} y2={1} />
      <Lin id="aoDown" stops={[[0, "#1E1E1A", 0.2], [1, "#1E1E1A", 0]]} x2={0} y2={1} />
      {/* site floor: a touch lighter at the back for depth, exactly the Explore panel's #212121 at the front
          edge (and everything below it), so the two surfaces join without a seam */}
      <linearGradient id="lcs-floor" gradientUnits="userSpaceOnUse" x1={0} y1={622} x2={0} y2={726}>
        <stop offset={0} stopColor="#353532" />
        <stop offset={1} stopColor="#212121" />
      </linearGradient>
      <Lin id="craneCab" stops={[[0, "#E0B866"], [1, "#B98C3E"]]} x2={0} y2={1} />

      {/* textures — front faces use the plain patterns, side faces the oblique-sheared ones */}
      <pattern id="lcs-brickPat" width={14} height={12} patternUnits="userSpaceOnUse">
        <rect width={14} height={12} fill="#B77B5B" />
        <path d="M0,5.6 H14 M0,11.6 H14 M0.4,0 V5.6 M7.4,6 V11.6" stroke="#DCCBB2" strokeWidth={0.9} />
        <rect x={1} y={0.6} width={6} height={1.2} fill="#fff" opacity={0.1} />
      </pattern>
      <pattern
        id="lcs-brickSidePat"
        width={14}
        height={12}
        patternUnits="userSpaceOnUse"
        patternTransform="matrix(0.433 -0.25 0 1 0 0)"
      >
        <rect width={14} height={12} fill="#9C6649" />
        <path d="M0,5.6 H14 M0,11.6 H14 M0.4,0 V5.6 M7.4,6 V11.6" stroke="#C3B199" strokeWidth={0.9} />
      </pattern>
      <pattern id="lcs-blocksPat" width={22} height={20} patternUnits="userSpaceOnUse">
        <rect width={22} height={20} fill="#C4C2B6" />
        <path d="M0,9.5 H22 M0,19.5 H22 M0.5,0 V9.5 M11.5,10 V19.5" stroke="#D9D7CC" strokeWidth={1} />
      </pattern>
      <pattern
        id="lcs-blocksSidePat"
        width={22}
        height={20}
        patternUnits="userSpaceOnUse"
        patternTransform="matrix(0.433 -0.25 0 1 0 0)"
      >
        <rect width={22} height={20} fill="#A9A79C" />
        <path d="M0,9.5 H22 M0,19.5 H22 M0.5,0 V9.5 M11.5,10 V19.5" stroke="#BDBBB0" strokeWidth={1} />
      </pattern>
      <pattern id="lcs-timberPat" width={6} height={10} patternUnits="userSpaceOnUse">
        <rect width={6} height={10} fill="#B5865A" />
        <rect x={0} width={1} height={10} fill="#8E6440" opacity={0.7} />
        <rect x={2.4} width={1.2} height={10} fill="#fff" opacity={0.08} />
      </pattern>
      <pattern id="lcs-stoneSpeck" width={9} height={9} patternUnits="userSpaceOnUse">
        <circle cx={2} cy={2} r={0.6} fill="#fff" opacity={0.08} />
        <circle cx={6.5} cy={5} r={0.5} fill="#000" opacity={0.12} />
        <circle cx={3.6} cy={7.4} r={0.45} fill="#fff" opacity={0.06} />
      </pattern>

      {/* clip for the safety-vest reflective bands (resolved in each figure's local space) */}
      <clipPath id="lcs-vest-clip">
        <path d="M-13.8,-84 Q-13.8,-90.6 -6.6,-92.2 L-1.6,-92.2 L2.6,-79.6 L6.6,-92.2 L9.2,-92.2 Q16.4,-91.2 16.8,-84 L16,-61 L-13,-61 Z" />
      </clipPath>
    </defs>
  );
}
