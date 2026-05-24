import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, Layers, Wrench } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { routes } from "@/lib/routes";
import { EquipmentPromoCarousel } from "@/components/EquipmentPromoCarousel";

const pillarIcons = [Award, Layers, Wrench] as const;

export function HomeIntroSection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const pillars = messages.homeIntro.pillars;

  return (
    <section
      ref={sectionRef}
      className="site-home-section border-t site-border"
      data-testid="home-intro-section"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#0096c7] dark:text-[#5dd4ff] mb-4">
            {t("homeIntro.badge")}
          </span>
          <h2 className="font-heading font-bold site-heading uppercase tracking-tight text-balance text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl leading-[1.15] mb-5">
            {t("homeIntro.title")}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed site-muted text-balance">
            {t("homeIntro.lead")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch mb-10 md:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? Award;
              return (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="site-card border site-border rounded-2xl p-6 md:p-7 h-full flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl border border-[#00A8E8]/25 bg-[#00A8E8]/8 dark:bg-[#00A8E8]/12 flex items-center justify-center text-[#00A8E8] mb-5">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg site-heading uppercase tracking-wide mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed site-muted flex-1">{pillar.description}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="min-h-[380px] lg:min-h-0"
          >
            <EquipmentPromoCarousel className="h-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href={routes.about}
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(213_74%_15%/0.2)] bg-white/70 px-5 py-3 text-sm font-heading font-bold uppercase tracking-wide text-[hsl(213_74%_15%)] shadow-sm backdrop-blur-sm transition-colors hover:border-[#00A8E8] hover:text-[#00A8E8] dark:border-white/40 dark:bg-transparent dark:text-white dark:hover:border-[#00E5FF] dark:hover:text-[#00E5FF]"
          >
            {t("homeIntro.ctaAbout")}
          </Link>
          <Link
            href={routes.products}
            className="inline-flex items-center gap-2 rounded-md bg-[#00A8E8] px-5 py-3 text-sm font-heading font-bold uppercase tracking-wide text-white shadow-[0_4px_18px_rgba(0,168,232,0.3)] transition-all hover:bg-[#0096c7] dark:bg-[#00D4FF] dark:text-[#031018] dark:hover:bg-[#00D4FF]"
          >
            {t("homeIntro.ctaProducts")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
