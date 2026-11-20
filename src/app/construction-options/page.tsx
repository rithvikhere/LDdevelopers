import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ConstructionOptionsSection } from "@/components/landing/ConstructionOptionsSection";

export const metadata: Metadata = {
  title: "Construction Options — [COMPANY NAME]",
  description: "Explore plot dimensions, building formats, and construction possibilities.",
};

export default function ConstructionOptionsPage() {
  return (
    <PageShell>
      <ConstructionOptionsSection compact />
    </PageShell>
  );
}
