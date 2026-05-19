import { LegalDocumentSection } from "@/components/LegalDocumentSection";

export default function TermsPage() {
  return (
    <main className="site-page-plain min-h-[calc(100vh-5rem)] pt-20">
      <LegalDocumentSection kind="terms" />
    </main>
  );
}
