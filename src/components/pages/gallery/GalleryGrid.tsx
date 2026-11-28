"use client";

import React, { useSyncExternalStore } from "react";
import Masonry, { type MasonryItem } from "@/components/ui/Masonry";

const PHONE = "(max-width: 639px)";
const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(PHONE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * The gallery's masonry with the requested settings. On phones it uses two columns (a 240px column width
 * would leave a single, very long column there); the server render and first paint use the desktop setting.
 */
export const GalleryGrid: React.FC<{ items: MasonryItem[] }> = ({ items }) => {
  const phone = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE).matches,
    () => false
  );
  return (
    <Masonry
      items={items}
      columns={phone ? 2 : "auto"}
      columnWidth={240}
      gap={12}
      radius={12}
      animateFrom="bottom"
      hoverEffect="zoom"
      captions="hover"
      lightbox
      draggable
    />
  );
};
