import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { GallerySection } from "@/components/landing/GallerySection";

export const metadata: Metadata = {
  title: "Gallery — [COMPANY NAME]",
  description: "A visual collection of architectural and construction imagery.",
};

export default function GalleryPage() {
  return (
    <PageShell>
      <GallerySection compact />
    </PageShell>
  );
}
