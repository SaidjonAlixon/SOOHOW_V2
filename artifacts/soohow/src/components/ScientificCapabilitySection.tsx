import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Cpu,
  FlaskConical,
  Lightbulb,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { mountAnimatedTitleChars } from "@/lib/animateTitleChars";

gsap.registerPlugin(ScrollTrigger);

const scientificImage = `${import.meta.env.BASE_URL}ish5.png`;
const scientificBg = `${import.meta.env.BASE_URL}yangili/FON4.png`;

type Metric = { value: string; label: string };

const itemIcons: readonly LucideIcon[] = [Lightbulb, Cpu, Sparkles, Award, Zap];

export function ScientificCapabilitySection() {
  const { t, messages, tList, locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const items = tList("scientific.items");
  const metrics = (messages.scientific?.metrics ?? []) as Metric[];

  useEffect(() => {
    if (!titleRef.current) return;

    const charSpans = mountAnimatedTitleChars(titleRef.current, t("scientific.title"));

    gsap.to(charSpans, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
      },
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 0.5,
      ease: "power3.out",
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [t, locale]);

  return (
    <section
      ref={sectionRef}
      id="scientific-capability"
      className="scientific-section relative py-24 md:py-32 overflow-hidden border-t site-border scroll-mt-24 md:scroll-mt-28"
      data-testid="scientific-capability-section"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={scientificBg}
          alt=""
          className="scientific-section__bg-img absolute inset-0 h-full w-full"
          loading="lazy"
          decoding="async"
        />
        <div className="scientific-section__wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--site-bg)/0.55)] via-[hsl(var(--site-bg)/0.35)] to-[hsl(var(--site-bg)/0.5)]" />
      </div>

      <div className="max-w-[min(100%,90rem)] mx-auto px-6 lg:px-10 xl:px-12 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-10 md:mb-14"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8E8]/35 bg-[#00A8E8]/10 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.16em]">
                <Cpu size={14} />
                {t("scientific.badge")}
              </span>
            </div>

            <div className="relative">
              <span
                className="absolute -left-1 top-2 h-3 w-3 rounded-full bg-[#00D4AA] shadow-[0_0_20px_#00D4AA]"
                aria-hidden
              />
              <span
                className="absolute left-2 top-5 h-px w-16 bg-gradient-to-r from-[#00D4AA] to-transparent rotate-[25deg] origin-left opacity-70"
                aria-hidden
              />
              <h2 ref={titleRef} className="site-section-title text-left pl-6 mb-4">
                {t("scientific.title")}
              </h2>
            </div>

            <p className="text-sm md:text-base site-muted leading-relaxed max-w-2xl pl-6">
              {t("scientific.lead")}
            </p>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="xl:col-span-5 flex flex-col gap-6"
          >
            {metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="rounded-xl border site-border bg-[hsl(var(--site-card)/0.95)] p-4 shadow-md hover:border-[#00A8E8]/40 hover:shadow-lg transition-all"
                  >
                    <p className="site-stat-highlight text-2xl md:text-3xl text-[#00A8E8] leading-none mb-1.5">
                      {metric.value}
                    </p>
                    <p className="text-[11px] md:text-xs font-heading font-semibold site-muted uppercase tracking-wide leading-snug">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex-1 rounded-2xl border site-border bg-[hsl(var(--site-card)/0.96)] backdrop-blur-sm p-6 md:p-8 shadow-xl">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b site-border">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A8E8]/20 to-[#00D4AA]/10 border border-[#00A8E8]/30 flex items-center justify-center text-[#00A8E8]">
                  <FlaskConical size={24} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold site-heading leading-snug pt-1">
                  {t("scientific.cardTitle")}
                </h3>
              </div>

              <ul className="space-y-3" role="list">
                {items.map((item, i) => {
                  const Icon = itemIcons[i] ?? Zap;
                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                      className="group flex items-start gap-3 rounded-lg border border-transparent hover:border-[#00A8E8]/20 hover:bg-[#00A8E8]/[0.04] px-2 py-2.5 -mx-2 transition-colors"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00A8E8]/10 text-[#00A8E8] group-hover:bg-[#00A8E8]/15">
                        <Icon size={15} strokeWidth={2} />
                      </span>
                      <span className="text-sm md:text-[15px] site-muted leading-relaxed pt-1 border-l-2 border-[#00A8E8]/40 pl-3 group-hover:border-[#00D4AA] transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="xl:col-span-7 relative min-h-[400px] md:min-h-[480px] xl:min-h-[560px]"
          >
            <div className="absolute inset-0 rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border site-border shadow-2xl">
              <img
                src={scientificImage}
                alt={t("scientific.imageAlt")}
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a192f]/50 via-transparent to-[#00A8E8]/10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent pointer-events-none" />

              <div className="absolute top-5 left-5 right-5 flex justify-between items-start gap-3 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 dark:bg-[hsl(var(--site-card)/0.92)] backdrop-blur-md border border-white/50 px-3 py-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0077a8] dark:text-[#5dd4ff] shadow-lg">
                  <Sparkles size={12} />
                  SOOHOW
                </span>
              </div>

              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-10 max-w-[min(100%,18rem)]">
                <div className="rounded-2xl border border-white/20 bg-white/95 dark:bg-[hsl(var(--site-card)/0.95)] backdrop-blur-md px-5 py-4 shadow-xl text-right">
                  <p className="font-heading font-bold text-xs md:text-sm text-[#00A8E8] uppercase tracking-wide leading-snug">
                    {t("scientific.overlayTitle")}
                  </p>
                  <p className="mt-2 text-[9px] md:text-[10px] font-mono font-semibold site-muted uppercase tracking-[0.2em]">
                    {t("scientific.overlaySubtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="absolute -z-10 -inset-3 rounded-[2rem] bg-gradient-to-br from-[#00A8E8]/20 to-[#00D4AA]/10 blur-sm"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
