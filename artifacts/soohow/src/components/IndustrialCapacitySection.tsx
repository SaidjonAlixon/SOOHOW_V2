import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BadgeCheck,
  Droplets,
  Factory,
  FlaskConical,
  Focus,
  LineChart,
  ScanLine,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const CARD_ICONS: readonly LucideIcon[] = [
  ScanLine,
  Focus,
  BadgeCheck,
  Droplets,
  LineChart,
  FlaskConical,
];

export function IndustrialCapacitySection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const cards = messages.industrial.cards;
  const highlights = messages.industrial.highlights ?? [];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden border-t site-border site-home-section"
      data-testid="industrial-capacity-section"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-[#00A8E8]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F59E0B]/12 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00A8E8]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8E8]/35 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.18em] mb-6">
              <Factory size={14} className="shrink-0" strokeWidth={2} />
              {t("industrial.badge")}
            </span>

            <h2 className="site-section-title max-w-4xl">
              <span className="site-heading">{t("industrial.titleLead")} </span>
              <span className="text-[#E8952B] dark:text-[#F59E0B]">{t("industrial.titleAccent")}</span>
            </h2>

            <p className="mt-5 md:mt-6 text-base md:text-lg site-muted leading-relaxed max-w-2xl">
              {t("industrial.intro")}
            </p>

            {highlights.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2.5" role="list">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border site-border bg-[hsl(var(--site-card)/0.7)] px-3.5 py-2 text-xs font-heading font-semibold site-heading uppercase tracking-wide"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border site-border site-card p-8 md:p-10 shadow-lg shadow-slate-200/40 dark:shadow-[0_12px_48px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/10 via-transparent to-[#F59E0B]/10 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] site-muted mb-3">
                  {t("industrial.statCaption")}
                </p>
                <p className="site-stat-highlight text-5xl md:text-6xl text-[#F59E0B] dark:text-[#FBBF24]">
                  {t("industrial.statValue")}
                </p>
                <p className="mt-2 font-heading font-bold text-sm uppercase tracking-[0.12em] site-heading">
                  {t("industrial.statUnit")}
                </p>
                <p className="mt-4 text-sm site-muted leading-relaxed border-t site-border pt-4">
                  {t("industrial.statNote")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          role="list"
        >
          {cards.map((card, i) => {
            const Icon = CARD_ICONS[i] ?? ScanLine;
            const tag = "tag" in card && typeof card.tag === "string" ? card.tag : undefined;

            return (
              <motion.article
                key={`${card.title}-${i}`}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.06, ease: "easeOut" }}
                className="group relative flex flex-col rounded-2xl border site-border site-card p-6 md:p-7 overflow-hidden transition-all duration-300 hover:border-[#00A8E8]/45 hover:shadow-[0_8px_32px_rgba(0,168,232,0.12)] dark:hover:shadow-[0_8px_40px_rgba(0,168,232,0.15)] hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/0 via-transparent to-[#F59E0B]/0 group-hover:from-[#00A8E8]/6 group-hover:to-[#F59E0B]/5 transition-colors duration-300 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-3 mb-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00A8E8]/15 to-[#00D4AA]/10 border border-[#00A8E8]/25 text-[#00A8E8] group-hover:scale-105 group-hover:border-[#00A8E8]/50 transition-all duration-300">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  {tag && (
                    <span className="rounded-md bg-[#F59E0B]/12 border border-[#F59E0B]/25 px-2 py-1 text-[9px] font-mono font-semibold uppercase tracking-[0.14em] text-[#B45309] dark:text-[#FBBF24]">
                      {tag}
                    </span>
                  )}
                </div>

                <h3 className="relative z-10 font-heading font-bold text-base md:text-[17px] site-heading uppercase tracking-wide leading-snug mb-2.5">
                  {card.title}
                </h3>
                <p className="relative z-10 text-sm site-muted leading-relaxed flex-1">
                  {card.description}
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00A8E8] to-[#F59E0B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
