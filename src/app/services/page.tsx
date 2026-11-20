import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { EnquiryCta } from "@/components/pages/EnquiryCta";

export const metadata: Metadata = {
  title: "Services — [COMPANY NAME]",
  description: "Our residential, commercial, and property development capabilities.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesSection compact />
      <EnquiryCta
        eyebrow="Next step"
        title="Planning a residence or commercial building?"
        description="Share your plot details and requirements through the enquiry form, and our team will get back to you."
        label="Request a Proposal"
      />
    </PageShell>
  );
}
