import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { routes } from "@/lib/routes";

type LegalKind = "privacy" | "terms";

export function LegalDocumentSection({ kind }: { kind: LegalKind }) {
  const { messages, t } = useLocale();
  const doc = kind === "privacy" ? messages.legal.privacy : messages.legal.terms;

  useEffect(() => {
    document.title = `${doc.title} — OOO FALCON TRADE LINES`;
    return () => {
      document.title = "OOO FALCON TRADE LINES";
    };
  }, [doc.title]);

  return (
    <article className="max-w-3xl mx-auto px-6 py-24 md:py-28" data-testid={`legal-${kind}`}>
      <Link
        href={routes.home}
        className="inline-flex items-center gap-2 text-sm site-muted hover:text-[#00A8E8] transition-colors mb-8"
      >
        <ArrowLeft size={16} aria-hidden />
        {t("legal.backHome")}
      </Link>

      <h1 className="site-section-title mb-3">{doc.title}</h1>
      <p className="text-sm site-muted font-sans mb-10">{doc.updated}</p>

      <div className="space-y-5 text-sm md:text-base site-muted font-sans leading-relaxed">
        {doc.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
