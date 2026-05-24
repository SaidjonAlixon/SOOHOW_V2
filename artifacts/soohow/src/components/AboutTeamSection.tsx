import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Users } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const base = import.meta.env.BASE_URL;
const teamImage = `${base}jamoa.jpg`;

export function AboutTeamSection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const stats = messages.aboutTeam.stats;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden border-t site-border site-page-plain"
      data-testid="about-team-section"
    >

      <motion.div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <motion.span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] site-muted mb-4">
            <Users size={14} className="text-[#00A8E8]" strokeWidth={2} />
            {t("aboutTeam.badge")}
          </motion.span>
          <h2 className="site-section-title">
            {t("aboutTeam.title")}
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden border site-border site-card shadow-md shadow-slate-200/30 dark:shadow-none"
          >
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
              <img
                src={teamImage}
                alt={t("aboutTeam.imageAlt")}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-5 text-base md:text-lg site-muted leading-relaxed"
          >
            <p className="text-[hsl(var(--site-fg)/0.88)]">{t("aboutTeam.p1")}</p>
            <p>{t("aboutTeam.p2")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="rounded-2xl site-card border site-border p-5 md:p-6 lg:p-8"
          >
            <div className="flex items-start gap-4">
              <motion.div className="shrink-0 w-11 h-11 rounded-xl border border-[#00A8E8]/35 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 flex items-center justify-center text-[#00A8E8]">
                <GraduationCap size={22} strokeWidth={1.75} />
              </motion.div>
              <div>
                <p className="font-heading font-bold text-base md:text-lg site-heading uppercase tracking-wide mb-2">
                  {t("aboutTeam.graduateTitle")}
                </p>
                <p className="text-sm md:text-[15px] site-muted leading-relaxed">
                  {t("aboutTeam.graduateDesc")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 md:gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className="rounded-xl site-card border site-border p-5 md:p-6 text-center hover:border-[#00A8E8]/35 transition-colors"
              >
                <p className="site-stat-highlight text-4xl md:text-5xl text-[#00A8E8]">
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
    </section>
  );
}
