import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { localeLabels, type Locale } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/LocaleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const displayOrder: Locale[] = ["en", "uz", "ru"];

function DesktopLanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <motion.div
      className={`relative z-[1002] flex items-center rounded-full border site-border bg-[hsl(var(--site-card)/0.85)] p-1 shrink-0 touch-manipulation ${className}`}
      role="tablist"
      aria-label={t("common.selectLanguage")}
      data-testid="language-switcher"
    >
      {displayOrder.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={(e) => {
              e.stopPropagation();
              setLocale(code);
            }}
            className={`relative isolate rounded-full font-heading font-bold tracking-wider transition-colors select-none min-w-[2.75rem] min-h-[2.5rem] px-3 py-2 text-[11px] ${
              active ? "text-white" : "site-muted hover:site-heading"
            }`}
            data-testid={`lang-${code}`}
          >
            {active && (
              <motion.span
                layoutId="lang-active-pill-desktop"
                className="absolute inset-0 rounded-full bg-gradient-primary shadow-[0_0_14px_rgba(0,168,232,0.4)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                aria-hidden
              />
            )}
            <span className="relative z-10 pointer-events-none">{localeLabels[code]}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

function MobileLanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`relative z-[1002] flex items-center justify-center gap-0.5 rounded-full border site-border bg-gradient-primary text-white font-heading font-bold text-[11px] tracking-wider shrink-0 touch-manipulation min-w-[2.5rem] h-8 px-2 shadow-[0_0_12px_rgba(0,168,232,0.35)] ${className}`}
          aria-label={t("common.selectLanguage")}
          data-testid="language-switcher"
        >
          {localeLabels[locale]}
          <ChevronDown
            className={`w-3 h-3 opacity-80 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="z-[1100] min-w-[4.5rem] rounded-xl border site-border bg-[hsl(var(--site-card))] p-1 shadow-xl"
      >
        {displayOrder.map((code) => {
          const active = locale === code;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => setLocale(code)}
              className={`cursor-pointer rounded-lg font-heading font-bold text-[11px] tracking-wider justify-center ${
                active ? "text-[#00A8E8] bg-[#00A8E8]/10" : "site-heading"
              }`}
              data-testid={`lang-${code}`}
            >
              {localeLabels[code]}
              {active && <Check className="ml-1 h-3.5 w-3.5 text-[#00A8E8]" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageSwitcher({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return <MobileLanguageSwitcher className={className} />;
  }
  return <DesktopLanguageSwitcher className={className} />;
}
