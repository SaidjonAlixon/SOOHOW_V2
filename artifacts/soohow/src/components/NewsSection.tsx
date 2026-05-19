import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Newspaper } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const base = import.meta.env.BASE_URL;
const newsImages = ["HOME_P1.jpeg", "HOME_P2.jpeg", "HOME_P3.jpeg"] as const;

export function NewsSection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const items = messages.news.items;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden border-t site-border site-home-section"
      data-testid="news-section"
    >
      <motion.div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8E8]/40 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-5">
            <Newspaper size={14} className="shrink-0" />
            {t("news.badge")}
          </motion.span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] site-heading tracking-wide uppercase">
            {t("news.title")}
          </h2>
          <p className="mt-4 text-base md:text-lg site-muted max-w-2xl mx-auto leading-relaxed">
            {t("news.subtitle")}
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={`${item.date}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              className="group flex flex-col rounded-2xl border site-border site-card overflow-hidden shadow-lg shadow-slate-200/40 dark:shadow-none hover:border-[#00A8E8]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <motion.div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={`${base}HOME/${newsImages[i]}`}
                  alt={item.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--site-card))] via-transparent to-[hsl(var(--site-bg)/0.35)] dark:from-[#061A2E]/90" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[hsl(var(--site-bg)/0.85)] dark:bg-[#061A2E]/80 backdrop-blur-sm border site-border text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider text-[#00A8E8]">
                  {item.category}
                </span>
              </motion.div>

              <motion.div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-mono site-muted mb-3">
                  <Calendar size={12} className="shrink-0 opacity-70" />
                  {item.date}
                </p>
                <h3 className="font-heading font-bold text-sm md:text-[15px] site-heading leading-snug line-clamp-3 group-hover:text-[#00A8E8] dark:group-hover:text-[#5dd4ff] transition-colors">
                  {item.title}
                </h3>
                <span className="mt-4 text-xs font-mono font-semibold uppercase tracking-wider text-[#00A8E8] opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("news.readMore")} →
                </span>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
