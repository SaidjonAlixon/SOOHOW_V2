import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Factory } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function IndustrialCapacitySection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const cards = messages.industrial.cards;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden border-t site-border site-home-section"
      data-testid="industrial-capacity-section"
    >
      <motion.div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <motion.span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-[#00A8E8]/45 bg-[#00A8E8]/8 dark:bg-[#00A8E8]/12 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.18em] mb-6 md:mb-8">
            <Factory size={13} className="shrink-0" strokeWidth={2} />
            {t("industrial.badge")}
          </motion.span>

          <h2 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.92] tracking-wide uppercase">
            <span className="site-heading">{t("industrial.titleLead")} </span>
            <span className="text-[#E8952B] dark:text-[#F59E0B]">{t("industrial.titleAccent")}</span>
          </h2>

          <p className="mt-5 md:mt-6 text-base md:text-lg site-muted leading-relaxed max-w-2xl">
            {t("industrial.intro")}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 inline-flex items-baseline gap-2 text-sm font-mono"
          >
            <span className="font-display text-2xl md:text-3xl font-bold text-[#F59E0B]">
              {t("industrial.statValue")}
            </span>
            <span className="site-muted uppercase tracking-[0.15em] text-[11px]">
              {t("industrial.statUnit")}
            </span>
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-12 md:mt-16 space-y-8 md:space-y-10"
          role="list"
        >
          {cards.map((card, i) => (
            <motion.li
              key={`${card.title}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: "easeOut" }}
              className="group flex gap-4 md:gap-5"
            >
              <motion.span
                className="shrink-0 mt-2 w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.55)] group-hover:scale-125 transition-transform duration-300"
                aria-hidden
              />
              <motion.div className="min-w-0 flex-1 border-l border-transparent group-hover:border-[#00A8E8]/25 pl-0 group-hover:pl-4 transition-all duration-300">
                <h3 className="font-heading font-bold text-sm md:text-base text-[#00A8E8] dark:text-[#38bdf8] uppercase tracking-wide leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm md:text-[15px] site-muted leading-relaxed text-[hsl(var(--site-fg)/0.78)] dark:text-[hsl(var(--site-fg)/0.72)]">
                  {card.description}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
