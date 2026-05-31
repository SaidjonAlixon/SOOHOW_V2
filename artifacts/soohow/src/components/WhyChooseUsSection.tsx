import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  Factory,
  FlaskConical,
  Globe2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { SectionTitle } from "@/components/SectionTitle";
import { scrollToSection, sectionIdFromHref } from "@/lib/scrollToSection";

const whyChooseBg = `${import.meta.env.BASE_URL}yangili/soohow_kare.png`;

type PillarCard = {
  tag: string;
  title: string;
  teaser: string;
  description: string;
  chip?: string;
  highlights: readonly string[];
};

const pillarIcons: readonly LucideIcon[] = [ShieldCheck, FlaskConical, Factory, Globe2];

const pillarDetailLinks = [
  "/#oem-service",
  "/#scientific-capability",
  "/#industrial-capacity",
  "/#certificates",
] as const;

const pillarThemes = [
  {
    border: "border-l-[#00A8E8]",
    ring: "group-hover:ring-[#00A8E8]/30",
    iconWrap: "from-[#00A8E8]/20 via-[#00A8E8]/8 to-transparent",
    icon: "text-[#00A8E8]",
    chip: "bg-[#00A8E8]/12 text-[#0077a8] border-[#00A8E8]/25 dark:text-[#5dd4ff]",
    dot: "bg-[#00A8E8]",
    glow: "from-[#00A8E8]/12",
  },
  {
    border: "border-l-[#00D4AA]",
    ring: "group-hover:ring-[#00D4AA]/30",
    iconWrap: "from-[#00D4AA]/20 via-[#00D4AA]/8 to-transparent",
    icon: "text-[#00D4AA]",
    chip: "bg-[#00D4AA]/12 text-[#047857] border-[#00D4AA]/25 dark:text-[#6ee7b7]",
    dot: "bg-[#00D4AA]",
    glow: "from-[#00D4AA]/12",
  },
  {
    border: "border-l-[#6366F1]",
    ring: "group-hover:ring-[#6366F1]/30",
    iconWrap: "from-[#6366F1]/20 via-[#6366F1]/8 to-transparent",
    icon: "text-[#6366F1]",
    chip: "bg-[#6366F1]/12 text-[#4338ca] border-[#6366F1]/25 dark:text-[#a5b4fc]",
    dot: "bg-[#6366F1]",
    glow: "from-[#6366F1]/12",
  },
  {
    border: "border-l-[#F59E0B]",
    ring: "group-hover:ring-[#F59E0B]/30",
    iconWrap: "from-[#F59E0B]/20 via-[#F59E0B]/8 to-transparent",
    icon: "text-[#F59E0B]",
    chip: "bg-[#F59E0B]/12 text-[#b45309] border-[#F59E0B]/25 dark:text-[#FBBF24]",
    dot: "bg-[#F59E0B]",
    glow: "from-[#F59E0B]/12",
  },
] as const;

export function WhyChooseUsSection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const pillars = (messages.whyChoose?.pillars ?? []) as PillarCard[];

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 md:pt-32 pb-10 md:pb-14 site-home-section border-t site-border overflow-hidden why-choose-section"
      data-testid="why-choose-us-section"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={whyChooseBg}
          alt=""
          className="why-choose-section__bg-img absolute inset-0 h-full w-full"
          loading="lazy"
          decoding="async"
        />
        <div className="why-choose-section__wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--site-bg)/0.55)] via-[hsl(var(--site-bg)/0.25)] to-[hsl(var(--site-bg)/0.4)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-4xl xl:max-w-5xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8E8]/35 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.18em] mb-5">
            <Award size={14} />
            {t("whyChoose.badge")}
          </span>
          <SectionTitle className="mb-4 text-center [&_.site-section-title__line]:text-center">
            {t("whyChoose.title")}
          </SectionTitle>
          <p className="text-sm md:text-base site-muted leading-relaxed text-balance">
            {t("whyChoose.lead")}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? ShieldCheck;
            const theme = pillarThemes[i] ?? pillarThemes[0];
            const detailHref = pillarDetailLinks[i] ?? "/#certificates";
            const sectionId = sectionIdFromHref(detailHref);
            const teaser = pillar.teaser;

            return (
              <motion.a
                key={pillar.title}
                href={detailHref}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(sectionId);
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`group relative flex flex-col rounded-2xl border border-l-4 ${theme.border} site-border backdrop-blur-md bg-[hsl(var(--site-card)/0.95)] dark:bg-[hsl(var(--site-card)/0.92)] shadow-lg overflow-hidden ring-1 ring-transparent ${theme.ring} hover:shadow-2xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--site-bg))]`}
                data-testid={`why-choose-pillar-card-${i}`}
                aria-label={`${pillar.title} — ${t("whyChoose.readMore")}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme.glow} to-transparent opacity-60 pointer-events-none`}
                  aria-hidden
                />

                <div className="relative z-10 p-6 md:p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.iconWrap} border site-border ${theme.icon} shadow-sm group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon size={26} strokeWidth={1.65} />
                    </div>
                    {pillar.chip && (
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-heading font-bold uppercase tracking-wider ${theme.chip}`}
                        >
                          {pillar.chip}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg md:text-xl site-heading leading-snug mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm md:text-[15px] site-muted leading-relaxed line-clamp-3 mb-4">
                    {teaser}
                  </p>

                  <span
                    className={`mt-auto inline-flex items-center gap-1.5 text-sm font-heading font-semibold ${theme.icon} group-hover:opacity-90`}
                  >
                    <span aria-hidden>—</span>
                    {t("whyChoose.readMore")}
                    <ArrowRight
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
