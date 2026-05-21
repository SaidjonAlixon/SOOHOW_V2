import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const highlightIcons = [ShieldCheck, PackageCheck, Cpu] as const;

export function WarrantyServiceSection() {
  const { t, tList } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const highlights = tList("warranty.highlights");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden border-t site-border site-home-section"
      data-testid="warranty-service-section"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-8 flex justify-center opacity-70 dark:opacity-90"
        aria-hidden
      >
        <div className="relative h-16 w-48">
          <span className="absolute left-2 top-6 h-2.5 w-2.5 rounded-full bg-[#00D4AA] shadow-[0_0_18px_#00D4AA]" />
          <span className="absolute left-10 top-4 h-1.5 w-1.5 rounded-full bg-[#00A8E8]/80" />
          <span className="absolute left-[4.5rem] top-3 h-1 w-1 rounded-full bg-[#00A8E8]/50" />
          <span className="absolute left-[6.5rem] top-2.5 h-1 w-1 rounded-full bg-[#00A8E8]/35" />
          <span className="absolute right-10 top-4 h-1.5 w-1.5 rounded-full bg-[#00A8E8]/60" />
          <span className="absolute right-4 top-5 h-2 w-2 rounded-full bg-[#00A8E8]/40" />
          <span className="absolute left-0 top-4 h-9 w-9 rounded-full border border-[#00A8E8]/25" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] site-muted mb-4">
            <Wrench size={14} className="text-[#00A8E8]" strokeWidth={2} />
            {t("warranty.badge")}
          </span>
          <h2 className="font-heading font-extrabold text-[clamp(1.5rem,3.8vw,2.75rem)] leading-[1.12] site-heading uppercase tracking-[0.03em] max-w-4xl mx-auto text-balance">
            {t("warranty.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative max-w-5xl mx-auto rounded-2xl border site-border site-card overflow-hidden shadow-lg shadow-slate-200/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/8 via-transparent to-[#00D4AA]/6 pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A8E8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x site-border">
            <div className="p-7 md:p-9 lg:p-10">
              <p className="text-sm md:text-[15px] site-muted leading-relaxed md:leading-[1.75]">
                {t("warranty.paragraph1")}
              </p>
            </div>
            <div className="p-7 md:p-9 lg:p-10">
              <p className="text-sm md:text-[15px] site-muted leading-relaxed md:leading-[1.75]">
                {t("warranty.paragraph2")}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.ul
          className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto"
          role="list"
        >
          {highlights.map((label, i) => {
            const Icon = highlightIcons[i] ?? Wrench;
            return (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border site-border bg-[hsl(var(--site-bg-alt)/0.5)] dark:bg-white/[0.03] px-4 py-3.5"
              >
                <span className="shrink-0 w-9 h-9 rounded-lg bg-[#00A8E8]/12 border border-[#00A8E8]/25 flex items-center justify-center text-[#00A8E8]">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className="text-xs sm:text-[13px] font-heading font-semibold site-heading uppercase tracking-wide leading-snug">
                  {label}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
