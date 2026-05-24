import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  Cpu,
  Factory,
  FlaskConical,
  Focus,
  GraduationCap,
  LineChart,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { routes } from "@/lib/routes";
import { useSiteActions } from "@/layouts/SiteLayout";

type PillarContent = {
  chip?: string;
  title: string;
  description: string;
  highlights: readonly string[];
};

type PillarShowcaseConfig = {
  sectionId: string;
  backgroundImage: string;
  borderClass: string;
  icon: LucideIcon;
  highlightIcons: readonly LucideIcon[];
  trustNoteKey: "trustNote0" | "trustNote1" | "trustNote2";
};

const PILLAR_SHOWCASES: readonly PillarShowcaseConfig[] = [
  {
    sectionId: "oem-service",
    backgroundImage: "yangili/soohow_kare.png",
    borderClass: "border-l-[#00A8E8]",
    icon: ShieldCheck,
    highlightIcons: [ShieldCheck, Users, GraduationCap],
    trustNoteKey: "trustNote0",
  },
  {
    sectionId: "scientific-detail",
    backgroundImage: "yangili/FON4.png",
    borderClass: "border-l-[#00D4AA]",
    icon: FlaskConical,
    highlightIcons: [Sparkles, Cpu, Award],
    trustNoteKey: "trustNote1",
  },
  {
    sectionId: "industrial-detail",
    backgroundImage: "yangili/fon2.png",
    borderClass: "border-l-[#6366F1]",
    icon: Factory,
    highlightIcons: [ScanLine, Focus, LineChart],
    trustNoteKey: "trustNote2",
  },
] as const;

type Props = {
  pillarIndex: 0 | 1 | 2;
};

export function WhyChoosePillarShowcaseSection({ pillarIndex }: Props) {
  const { t, messages } = useLocale();
  const { openQuoteModal } = useSiteActions();
  const config = PILLAR_SHOWCASES[pillarIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const pillar = messages.whyChoose?.pillars?.[pillarIndex] as PillarContent | undefined;
  if (!pillar || !config) return null;

  const bgUrl = `${import.meta.env.BASE_URL}${config.backgroundImage}`;
  const Icon = config.icon;
  const accent =
    pillarIndex === 0 ? "#00A8E8" : pillarIndex === 1 ? "#00D4AA" : "#6366F1";

  return (
    <section
      ref={sectionRef}
      id={config.sectionId}
      className="relative py-20 md:py-28 lg:py-32 border-t site-border overflow-hidden site-home-section pillar-showcase-section scroll-mt-24 md:scroll-mt-28"
      data-testid={`pillar-showcase-${config.sectionId}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={bgUrl}
          alt=""
          className="pillar-showcase-section__bg-img absolute inset-0 h-full w-full"
          loading="lazy"
          decoding="async"
        />
        <div className="pillar-showcase-section__wash absolute inset-0" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(95deg, hsl(var(--site-bg) / 0.5) 0%, transparent 45%, hsl(var(--site-bg) / 0.35) 100%)`,
          }}
        />
      </div>

      <div className="max-w-[min(100%,96rem)] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-14 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="xl:col-span-7 flex flex-col"
          >
            <div
              className={`relative flex-1 rounded-3xl border border-l-4 ${config.borderClass} site-border bg-[hsl(var(--site-card)/0.94)] dark:bg-[hsl(var(--site-card)/0.9)] backdrop-blur-md shadow-lg overflow-hidden p-8 md:p-10 lg:p-12`}
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                  <div
                    className="flex h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-2xl border shadow-lg"
                    style={{
                      borderColor: `${accent}40`,
                      background: `linear-gradient(135deg, ${accent}22, transparent)`,
                      color: accent,
                    }}
                  >
                    <Icon size={32} strokeWidth={1.6} />
                  </div>
                  {pillar.chip && (
                    <span
                      className="inline-flex rounded-full border px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-wider"
                      style={{ borderColor: `${accent}40`, color: accent }}
                    >
                      {pillar.chip}
                    </span>
                  )}
                </div>

                <h2 className="font-heading font-bold site-heading uppercase tracking-tight text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.12] mb-5 max-w-3xl">
                  {pillar.title}
                </h2>

                <p className="text-base md:text-lg lg:text-xl site-muted leading-relaxed md:leading-[1.8] max-w-3xl mb-8">
                  {pillar.description}
                </p>

                {pillar.highlights.length > 0 && (
                  <ul className="space-y-4 pt-6 border-t site-border/80" role="list">
                    {pillar.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm md:text-base site-muted leading-relaxed"
                      >
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_rgba(0,168,232,0.4)]"
                          style={{ backgroundColor: accent }}
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="xl:col-span-5 flex flex-col gap-4 md:gap-5"
          >
            {pillar.highlights.map((point, i) => {
              const HighlightIcon = config.highlightIcons[i] ?? Icon;
              return (
                <article
                  key={point}
                  className="group flex flex-1 min-h-[7.5rem] items-start gap-5 rounded-2xl border site-border bg-[hsl(var(--site-card)/0.88)] backdrop-blur-md p-6 md:p-7 transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: undefined }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border group-hover:scale-105 transition-transform"
                    style={{ borderColor: `${accent}35`, backgroundColor: `${accent}14`, color: accent }}
                  >
                    <HighlightIcon size={22} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm md:text-[15px] site-heading font-heading font-semibold leading-snug pt-1">
                    {point}
                  </p>
                </article>
              );
            })}

            <div
              className="rounded-2xl border p-6 md:p-7 flex items-center gap-4"
              style={{ borderColor: `${accent}35`, background: `linear-gradient(135deg, ${accent}14, transparent)` }}
            >
              <PackageCheck className="shrink-0" size={28} strokeWidth={1.75} style={{ color: accent }} />
              <p className="text-sm md:text-base site-muted leading-relaxed">
                {t(`pillarShowcase.${config.trustNoteKey}`)}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4"
        >
          <Link
            href={routes.contact}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A8E8] px-8 py-4 text-sm font-heading font-bold uppercase tracking-wide text-white shadow-[0_8px_28px_rgba(0,168,232,0.35)] transition-all hover:bg-[#0096c7] dark:bg-[#00D4FF] dark:text-[#031018]"
          >
            {t("pillarShowcase.ctaContact")}
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00A8E8]/40 bg-[hsl(var(--site-card)/0.9)] px-8 py-4 text-sm font-heading font-bold uppercase tracking-wide text-[#00A8E8] backdrop-blur-sm transition-colors hover:bg-[#00A8E8]/10 dark:text-[#5dd4ff]"
          >
            {t("pillarShowcase.ctaQuote")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
