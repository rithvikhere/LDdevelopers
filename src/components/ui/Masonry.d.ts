import type { CSSProperties, FC, MouseEvent } from "react";

/** Types for the vendored React Bits Masonry (Masonry.jsx, JS-CSS variant). */
export interface MasonryItem {
  id: string | number;
  img: string;
  width?: number;
  height?: number;
  /** Columns the tile spans (default 1). */
  span?: number;
  title?: string;
  description?: string;
  alt?: string;
  url?: string;
}

export interface MasonryProps {
  items?: MasonryItem[];
  columns?: number | "auto";
  columnWidth?: number;
  gap?: number;
  radius?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random" | "none";
  stagger?: number;
  duration?: number;
  bounce?: number;
  blurToFocus?: boolean;
  revealOnScroll?: boolean;
  hoverEffect?: "zoom" | "lift" | "tilt" | "none";
  focusOnHover?: boolean;
  captions?: "hover" | "always" | "none";
  parallax?: number;
  lightbox?: boolean;
  draggable?: boolean;
  onItemClick?: (item: MasonryItem, index: number, event: MouseEvent) => void;
  onReorder?: (items: MasonryItem[]) => void;
  className?: string;
  style?: CSSProperties;
}

declare const Masonry: FC<MasonryProps>;
export default Masonry;
