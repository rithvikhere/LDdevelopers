import type { Metadata } from "next";
import { PageShell } from "@/components/pages/PageShell";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact — [COMPANY NAME]",
  description: "Connect with the company's architectural and development team.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactPageContent />
    </PageShell>
  );
}
