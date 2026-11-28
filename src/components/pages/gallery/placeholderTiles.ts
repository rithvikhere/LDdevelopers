/**
 * Placeholder tiles for the gallery while the client's project photos are on their way.
 * Each tile is an inline SVG (data URI) in one of the brand's "material" colours — the same material-board idea
 * as the Explore cards — with a single, simple architectural shape. Replace them by adding real photos to
 * siteAssets.gallery; the page switches over automatically.
 */

type Palette = { bg: string; shape: string; accent: string };
type Motif = "arch" | "gable" | "towers" | "steps" | "colonnade" | "window" | "sun";

const PALETTES: Record<string, Palette> = {
  sage: { bg: "#CADCAE", shape: "#2F4E26", accent: "#E67514" },
  forest: { bg: "#1F4D2B", shape: "#D3ECCD", accent: "#E6B24A" },
  terracotta: { bg: "#B65A34", shape: "#F3E6D8", accent: "#2B1A12" },
  charcoal: { bg: "#262626", shape: "#E9E4DA", accent: "#E67514" },
  brass: { bg: "#C9A24D", shape: "#2A2418", accent: "#F5F0E1" },
  mint: { bg: "#D3ECCD", shape: "#14532D", accent: "#B65A34" },
  azure: { bg: "#7DB6EC", shape: "#0F2A47", accent: "#F5F7F0" },
  stone: { bg: "#E4DFD3", shape: "#212121", accent: "#06923E" },
};

/** Draw one motif inside a w×h box (all shapes sized from the box so every aspect ratio works). */
const drawMotif = (motif: Motif, w: number, h: number, p: Palette): string => {
  const cx = w / 2;
  const ground = h * 0.86;
  switch (motif) {
    case "arch": {
      const aw = w * 0.5;
      const top = h * 0.3;
      const x = cx - aw / 2;
      return `<path d="M${x} ${ground} V${top + aw / 2} A${aw / 2} ${aw / 2} 0 0 1 ${x + aw} ${top + aw / 2} V${ground} Z" fill="${p.shape}"/>
        <circle cx="${cx}" cy="${top + w * 0.035}" r="${w * 0.03}" fill="${p.accent}"/>
        <rect x="${w * 0.12}" y="${ground}" width="${w * 0.76}" height="${h * 0.012}" fill="${p.shape}"/>`;
    }
    case "gable": {
      const bw = w * 0.56;
      const x = cx - bw / 2;
      const eaves = h * 0.5;
      return `<circle cx="${w * 0.74}" cy="${h * 0.22}" r="${w * 0.08}" fill="${p.accent}"/>
        <path d="M${x - w * 0.04} ${eaves} L${cx} ${eaves - bw * 0.42} L${x + bw + w * 0.04} ${eaves} Z" fill="${p.shape}"/>
        <rect x="${x}" y="${eaves}" width="${bw}" height="${ground - eaves}" fill="${p.shape}"/>
        <rect x="${cx - w * 0.06}" y="${ground - h * 0.16}" width="${w * 0.12}" height="${h * 0.16}" fill="${p.bg}"/>`;
    }
    case "towers": {
      const cols = [
        { x: 0.16, w: 0.2, h: 0.38 },
        { x: 0.38, w: 0.22, h: 0.62 },
        { x: 0.62, w: 0.2, h: 0.48 },
      ];
      return cols
        .map((c, i) => {
          const tx = w * c.x;
          const tw = w * c.w;
          const th = h * c.h;
          const rows = Math.floor((th - h * 0.06) / (h * 0.05));
          const lines = Array.from({ length: rows }, (_, r) => {
            const y = ground - th + h * 0.05 + r * h * 0.05;
            return `<rect x="${tx + tw * 0.18}" y="${y}" width="${tw * 0.64}" height="${h * 0.012}" fill="${p.bg}" opacity="0.55"/>`;
          }).join("");
          return `<rect x="${tx}" y="${ground - th}" width="${tw}" height="${th}" fill="${p.shape}" opacity="${i === 1 ? 1 : 0.82}"/>${lines}`;
        })
        .join("") + `<rect x="${w * 0.08}" y="${ground}" width="${w * 0.84}" height="${h * 0.012}" fill="${p.shape}"/><circle cx="${w * 0.49}" cy="${ground - h * 0.66}" r="${w * 0.022}" fill="${p.accent}"/>`;
    }
    case "steps": {
      const n = 5;
      const sw = (w * 0.72) / n;
      const sh = (h * 0.5) / n;
      let d = `M${w * 0.14} ${ground}`;
      for (let i = 0; i < n; i++) d += ` V${ground - sh * (i + 1)} H${w * 0.14 + sw * (i + 1)}`;
      d += ` V${ground} Z`;
      return `<path d="${d}" fill="${p.shape}"/><circle cx="${w * 0.3}" cy="${h * 0.24}" r="${w * 0.07}" fill="${p.accent}"/>`;
    }
    case "colonnade": {
      const n = 4;
      const span = w * 0.66;
      const x0 = cx - span / 2;
      const colW = w * 0.07;
      const top = h * 0.36;
      const cols = Array.from({ length: n }, (_, i) => {
        const x = x0 + (i * (span - colW)) / (n - 1);
        return `<rect x="${x}" y="${top}" width="${colW}" height="${ground - top}" fill="${p.shape}"/>`;
      }).join("");
      return `<rect x="${x0 - w * 0.04}" y="${top - h * 0.06}" width="${span + w * 0.08}" height="${h * 0.06}" fill="${p.shape}"/>
        <path d="M${x0 - w * 0.04} ${top - h * 0.06} L${cx} ${top - h * 0.17} L${x0 + span + w * 0.04} ${top - h * 0.06} Z" fill="${p.accent}"/>
        ${cols}<rect x="${x0 - w * 0.06}" y="${ground}" width="${span + w * 0.12}" height="${h * 0.02}" fill="${p.shape}"/>`;
    }
    case "window": {
      const fw = w * 0.56;
      const fh = h * 0.56;
      const x = cx - fw / 2;
      const y = h * 0.2;
      const bar = w * 0.022;
      return `<rect x="${x}" y="${y}" width="${fw}" height="${fh}" fill="${p.shape}"/>
        <rect x="${x + bar}" y="${y + bar}" width="${fw - bar * 2}" height="${fh - bar * 2}" fill="${p.accent}" opacity="0.9"/>
        <rect x="${cx - bar / 2}" y="${y}" width="${bar}" height="${fh}" fill="${p.shape}"/>
        <rect x="${x}" y="${y + fh * 0.38 - bar / 2}" width="${fw}" height="${bar}" fill="${p.shape}"/>
        <rect x="${x - w * 0.04}" y="${y + fh}" width="${fw + w * 0.08}" height="${h * 0.025}" fill="${p.shape}"/>`;
    }
    case "sun":
    default: {
      const r = w * 0.26;
      const plinth = h * 0.62;
      // a half sun resting on a plinth
      return `<path d="M${cx - r} ${plinth} A${r} ${r} 0 0 1 ${cx + r} ${plinth} Z" fill="${p.accent}"/>
        <rect x="${w * 0.1}" y="${plinth}" width="${w * 0.8}" height="${h * 0.09}" fill="${p.shape}"/>
        <rect x="${w * 0.18}" y="${plinth + h * 0.09}" width="${w * 0.64}" height="${ground - plinth - h * 0.09}" fill="${p.shape}" opacity="0.72"/>`;
    }
  }
};

const tileSvg = (motif: Motif, palette: Palette, w: number, h: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${palette.bg}"/>${drawMotif(motif, w, h, palette)}</svg>`
  )}`;

const SPECS: { motif: Motif; palette: keyof typeof PALETTES; h: number; title: string }[] = [
  { motif: "gable", palette: "sage", h: 900, title: "Residences" },
  { motif: "towers", palette: "charcoal", h: 750, title: "Commercial" },
  { motif: "arch", palette: "terracotta", h: 1000, title: "Facades" },
  { motif: "window", palette: "azure", h: 640, title: "Interiors" },
  { motif: "colonnade", palette: "stone", h: 820, title: "Villas" },
  { motif: "steps", palette: "forest", h: 700, title: "On site" },
  { motif: "sun", palette: "brass", h: 880, title: "Landscapes" },
  { motif: "gable", palette: "mint", h: 660, title: "Duplexes" },
  { motif: "arch", palette: "charcoal", h: 960, title: "Entrances" },
  { motif: "towers", palette: "sage", h: 800, title: "Apartments" },
  { motif: "window", palette: "terracotta", h: 720, title: "Details" },
  { motif: "colonnade", palette: "forest", h: 900, title: "Courtyards" },
  { motif: "sun", palette: "azure", h: 620, title: "Terraces" },
  { motif: "steps", palette: "stone", h: 860, title: "Staircases" },
  { motif: "arch", palette: "brass", h: 740, title: "Gateways" },
  { motif: "gable", palette: "charcoal", h: 940, title: "Homes" },
];

export type GalleryTile = {
  id: string;
  img: string;
  width: number;
  height: number;
  title: string;
  description: string;
  alt: string;
};

/** The placeholder set: 16 tiles, 600px wide, varied heights so the masonry interlocks. */
export const placeholderTiles = (note: string): GalleryTile[] =>
  SPECS.map((s, i) => ({
    id: `placeholder-${i + 1}`,
    img: tileSvg(s.motif, PALETTES[s.palette], 600, s.h),
    width: 600,
    height: s.h,
    title: s.title,
    description: note,
    alt: `${s.title} — placeholder tile`,
  }));
