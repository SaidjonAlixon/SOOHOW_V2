import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { mountAnimatedTitleChars } from "@/lib/animateTitleChars";

gsap.registerPlugin(ScrollTrigger);

const base = import.meta.env.BASE_URL;
const facilityImage = `${base}bino.jpg`;

export function AboutSection() {
  const { t, messages, locale } = useLocale();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const isIntroInView = useInView(introRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (titleRef.current) {
      const charSpans = mountAnimatedTitleChars(
        titleRef.current,
        t("about.title"),
        "inline-block opacity-0 translate-y-[-60px]",
      );

      gsap.to(charSpans, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (timelineRef.current) {
      const line = timelineRef.current.querySelector(".timeline-line");
      const items = timelineRef.current.querySelectorAll(".timeline-item");

      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
        },
      );

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          },
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [locale, t]);

  const { statCards, facilityCard, achievements } = messages.about;

  return (
    <section
      id="about"
      ref={introRef}
      className="py-24 md:py-32 site-section relative overflow-hidden"
      data-testid="about-section"
    >
      <motion.div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isIntroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h2
              ref={titleRef}
              className="site-section-title mb-6"
            >
              {t("about.title")}
            </h2>
            <motion.div className="space-y-5 site-muted font-sans text-base md:text-lg leading-relaxed">
              <p className="text-[hsl(var(--site-fg)/0.88)]">{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isIntroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl site-card border site-border p-6 md:p-8 shadow-lg shadow-slate-200/40 dark:shadow-none"
          >
            <motion.div className="flex items-center gap-3 mb-6 pb-5 border-b site-border">
              <motion.div className="w-11 h-11 rounded-xl border border-[#00A8E8]/35 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 flex items-center justify-center text-[#00A8E8]">
                <Award size={22} strokeWidth={1.75} />
              </motion.div>
              <h3 className="font-heading font-bold text-lg md:text-xl site-heading uppercase tracking-wide">
                {t("about.achievementsTitle")}
              </h3>
            </motion.div>
            <ul className="space-y-3.5">
              {achievements.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={isIntroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm md:text-[15px] site-muted leading-relaxed"
                >
                  <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" aria-hidden />
                  <span className="text-[hsl(var(--site-fg)/0.85)]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-24 md:mb-32"
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
              className="rounded-2xl site-card border site-border p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[180px] hover:border-[#00A8E8]/40 transition-colors"
            >
              <p className="site-stat-highlight text-5xl md:text-6xl text-[#00A8E8]">
                {stat.value}
              </p>
              <p className="mt-3 text-[11px] md:text-xs font-mono font-semibold site-muted uppercase tracking-[0.18em]">
                {stat.label}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl site-card border site-border overflow-hidden hover:border-[#00A8E8]/40 transition-colors flex flex-col"
          >
            <motion.div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src={facilityImage}
                alt={facilityCard.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <motion.div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--site-card))] via-transparent to-transparent opacity-80" />
            </motion.div>
            <motion.div className="grid grid-cols-2 divide-x site-border">
              {facilityCard.stats.map((stat) => (
                <motion.div key={stat.label} className="p-6 md:p-8 text-center">
                  <p className="site-stat-highlight text-3xl md:text-4xl text-[#00A8E8]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] md:text-[11px] font-mono font-semibold site-muted uppercase tracking-[0.16em]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="mb-32">
          <h3 className="text-3xl font-heading font-bold site-heading mb-12 text-center">
            {t("about.timelineTitle")}
          </h3>
          <motion.div ref={timelineRef} className="relative max-w-4xl mx-auto py-10">
            <motion.div className="timeline-line absolute left-1/2 top-0 bottom-0 w-[2px] bg-[hsl(var(--site-border))] -translate-x-1/2" />

            {messages.about.milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  className={`timeline-item flex w-full items-center justify-between mb-8 md:mb-10 ${isLeft ? "flex-row-reverse" : ""}`}
                >
                  <motion.div className="w-5/12 hidden sm:block" />
                  <motion.div className="w-4 h-4 shrink-0 rounded-full bg-[#00A8E8] border-4 border-[hsl(var(--site-bg))] z-10 relative shadow-[0_0_10px_rgba(0,168,232,0.5)]" />
                  <motion.div
                    className={`w-full sm:w-5/12 p-5 md:p-6 rounded-xl site-card border site-border hover:border-[#00A8E8]/50 transition-colors ${isLeft ? "sm:text-right" : "sm:text-left"}`}
                  >
                    <p className="site-stat-highlight text-3xl text-[#00A8E8] mb-2">{milestone.year}</p>
                    <p className="font-heading font-bold site-heading mb-2 text-sm md:text-base uppercase tracking-wide">
                      {milestone.title}
                    </p>
                    <p className="font-sans text-sm site-muted leading-relaxed">{milestone.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
