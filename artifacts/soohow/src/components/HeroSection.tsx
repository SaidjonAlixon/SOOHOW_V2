import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { routes } from "@/lib/routes";
import { useLocale } from "@/lib/i18n/LocaleContext";

const base = import.meta.env.BASE_URL;
const heroBackground = `${base}HOME/HOME_P1.jpeg`;

export function HeroSection({ onQuoteClick }: { onQuoteClick: () => void }) {
  const { t } = useLocale();

  return (
    <section
      id="home"
      className="hero-section relative isolate min-h-screen pt-20 flex items-stretch overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={heroBackground}
          alt=""
          className="hero-section__image absolute inset-0 h-full w-full object-cover object-[72%_center] lg:object-[88%_center]"
        />

        <div className="hero-section__wash absolute inset-0" />
        <div className="hero-section__fade-left absolute inset-0" />
        <div className="hero-section__fade-right absolute inset-0 hidden sm:block" />
        <div className="hero-section__glow absolute inset-0" />
      </motion.div>

      <div className="relative z-10 flex w-full min-h-[calc(100vh-5rem)] flex-col">
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-[min(100%,42rem)] px-5 sm:px-8 lg:pl-12 xl:pl-20 2xl:pl-28 lg:pr-6 py-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-md border border-[#00A8E8]/30 bg-white/70 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-[#0c5a7a] shadow-sm backdrop-blur-sm mb-7 dark:border-[#00D4FF]/35 dark:bg-[#00D4FF]/5 dark:text-[#9ae6ff] dark:shadow-none"
            >
              <span className="text-[#00A8E8] dark:text-[#00D4FF]">⬡</span>
              {t("hero.badge")}
            </motion.div>

            <h1 className="hero-title font-heading font-extrabold text-[clamp(2.15rem,6.8vw,4rem)] uppercase mb-6 space-y-1.5 sm:space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-[hsl(213_74%_15%)] dark:text-white [text-wrap:balance]"
              >
                {t("hero.title1")} {t("hero.title2")}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-[#0096c7] dark:text-[#00E5FF] [text-wrap:balance]"
              >
                {t("hero.title3")}
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="max-w-lg text-sm sm:text-base leading-relaxed site-muted mb-9 dark:text-white/75"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
            >
              <Link
                href={routes.products}
                className="inline-flex items-center gap-2 rounded-md bg-[#00A8E8] px-6 py-3.5 text-sm font-heading font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(0,168,232,0.35)] transition-all hover:scale-[1.02] hover:bg-[#0096c7] hover:shadow-[0_6px_28px_rgba(0,168,232,0.45)] dark:bg-[#00D4FF] dark:text-[#031018] dark:shadow-[0_0_24px_rgba(0,229,255,0.35)] dark:hover:bg-[#00D4FF] dark:hover:shadow-[0_0_32px_rgba(0,229,255,0.45)]"
                data-testid="btn-explore"
              >
                {t("hero.primaryCta")}
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <button
                type="button"
                onClick={onQuoteClick}
                className="rounded-md border border-[hsl(213_74%_15%/0.2)] bg-white/60 px-6 py-3.5 text-sm font-heading font-bold uppercase tracking-wide text-[hsl(213_74%_15%)] shadow-sm backdrop-blur-sm transition-colors hover:border-[#00A8E8] hover:text-[#00A8E8] dark:border-white/50 dark:bg-transparent dark:text-white dark:shadow-none dark:hover:border-[#00E5FF] dark:hover:text-[#00E5FF]"
                data-testid="btn-hero-quote"
              >
                {t("common.requestQuote")}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[hsl(216_18%_42%)] dark:text-white/55"
            >
              <span>{t("hero.statProducts")}</span>
              <span className="hidden sm:inline text-[hsl(211_27%_84%)] dark:text-white/25">|</span>
              <span>{t("hero.statClients")}</span>
              <span className="hidden sm:inline text-[hsl(211_27%_84%)] dark:text-white/25">|</span>
              <span>{t("hero.statYears")}</span>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#stats-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-1 pb-8 text-[10px] font-mono uppercase tracking-[0.22em] site-muted transition-colors hover:text-[#00A8E8] dark:text-white/45 dark:hover:text-[#00E5FF]"
        >
          <ChevronDown size={18} className="animate-bounce" />
          {t("hero.scrollDown")}
        </motion.a>
      </div>
    </section>
  );
}
