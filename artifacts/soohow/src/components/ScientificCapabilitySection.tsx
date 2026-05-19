import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, FlaskConical, Zap } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const base = import.meta.env.BASE_URL;
const scientificImage = `${base}ish5.png`;

export function ScientificCapabilitySection() {
  const { t, tList } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const items = tList("scientific.items");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden border-t site-border site-home-section"
      data-testid="scientific-capability-section"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95] site-heading tracking-wide uppercase mb-8 md:mb-10 text-balance">
              {t("scientific.title")}
            </h2>

            <div className="flex justify-end mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8E8]/40 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                <Cpu size={14} className="shrink-0" />
                <span className="whitespace-nowrap">{t("scientific.badge")}</span>
              </span>
            </div>

            <motion.div className="flex-1 rounded-2xl border site-border site-card backdrop-blur-sm p-6 md:p-8 shadow-lg shadow-slate-200/40 dark:shadow-none">
              <div className="flex items-start gap-3 mb-7 pb-6 border-b site-border">
                <div className="shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-[#00A8E8]/15 to-[#00D4AA]/10 dark:from-[#00A8E8]/30 dark:to-[#00D4AA]/20 border border-[#00A8E8]/30 flex items-center justify-center text-[#00A8E8]">
                  <FlaskConical size={22} />
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold site-heading leading-snug pt-1.5">
                  {t("scientific.cardTitle")}
                </h3>
              </div>

              <ul className="space-y-4">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
                    className="group flex items-start gap-3 pl-3 border-l-2 border-[#00A8E8]/50 hover:border-[#00D4AA] transition-colors"
                  >
                    <Zap
                      size={15}
                      className="shrink-0 mt-1 text-[#00A8E8] dark:text-[#00D4AA] opacity-90 group-hover:opacity-100"
                    />
                    <span className="text-sm md:text-[15px] site-muted leading-relaxed font-sans text-[hsl(var(--site-fg)/0.88)]">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative lg:min-h-full"
          >
            <div className="relative h-full min-h-[360px] lg:min-h-[420px] rounded-[1.75rem] overflow-hidden border site-border shadow-sm dark:shadow-md dark:shadow-black/20">
              <img
                src={scientificImage}
                alt={t("scientific.imageAlt")}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 max-w-[min(100%,16rem)] md:bottom-6 md:right-6 md:max-w-[14.5rem] z-10">
                <div className="rounded-xl border site-border bg-[hsl(var(--site-card))] px-3.5 py-3 sm:px-4 sm:py-3.5 shadow-sm text-right">
                  <p className="font-heading font-bold text-[10px] sm:text-[11px] md:text-xs text-[#00A8E8] uppercase leading-snug tracking-wide break-words">
                    {t("scientific.overlayTitle")}
                  </p>
                  <p className="mt-1.5 text-[8px] sm:text-[9px] font-mono font-semibold site-muted uppercase tracking-[0.18em] leading-relaxed break-words">
                    {t("scientific.overlaySubtitle")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
