import { locales, localeLabels, type Locale } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`flex items-center rounded-full border site-border bg-[hsl(var(--site-card)/0.6)] p-0.5 ${className}`}
      role="group"
      aria-label={t("common.selectLanguage")}
      data-testid="language-switcher"
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            className={`min-w-[2.25rem] px-2.5 py-1.5 rounded-full text-[11px] font-heading font-bold tracking-wider transition-all ${
              active
                ? "bg-gradient-primary text-white shadow-[0_0_12px_rgba(0,168,232,0.35)]"
                : "site-muted hover:site-heading hover:bg-[hsl(var(--site-fg)/0.06)]"
            }`}
            aria-pressed={active}
            data-testid={`lang-${code}`}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
