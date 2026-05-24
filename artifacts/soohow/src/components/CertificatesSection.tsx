import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Globe2, ZoomIn } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CertificateLightbox } from "@/components/CertificateLightbox";
import {
  certificatePaths,
  certificateSlideCount,
  getCertificateSlideIndices,
} from "@/lib/certificates";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { mountAnimatedTitleChars } from "@/lib/animateTitleChars";

gsap.registerPlugin(ScrollTrigger);

const CAROUSEL_INTERVAL_MS = 10_000;
const certificatesBg = `${import.meta.env.BASE_URL}yangili/FON3.png`;

type CertificateItem = {
  title: string;
  subtitle: string;
  standard: string;
};

const certAccents = [
  "border-t-[#22C55E]",
  "border-t-[#F97316]",
  "border-t-[#00A8E8]",
  "border-t-[#00D4AA]",
  "border-t-[#6366F1]",
  "border-t-[#EC4899]",
  "border-t-[#14B8A6]",
  "border-t-[#8B5CF6]",
  "border-t-[#F59E0B]",
  "border-t-[#3B82F6]",
] as const;

export function CertificatesSection() {
  const { t, messages, locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [slide, setSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const items = (messages.certificates?.items ?? []) as CertificateItem[];
  const standards = (messages.certificates?.standards ?? []) as readonly string[];
  const visibleIndices = getCertificateSlideIndices(slide);

  const goNext = useCallback(() => {
    setSlide((s) => (s + 1) % certificateSlideCount);
  }, []);

  const goPrev = useCallback(() => {
    setSlide((s) => (s - 1 + certificateSlideCount) % certificateSlideCount);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const charSpans = mountAnimatedTitleChars(titleRef.current, t("certificates.title"));

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
  }, [locale, t]);

  useEffect(() => {
    if (paused || !isInView) return;

    const id = window.setInterval(goNext, CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, isInView, goNext]);

  const getAlt = (index: number) => {
    const meta = items[index];
    return meta
      ? `${meta.title} — ${t("certificates.company")}`
      : `${t("certificates.certificateAlt")} ${index + 1}`;
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative py-20 md:py-28 site-home-section border-t site-border overflow-hidden certificates-section scroll-mt-24 md:scroll-mt-28"
      data-testid="certificates-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={certificatesBg}
          alt=""
          className="certificates-section__bg-img absolute inset-0 h-full w-full"
          loading="lazy"
          decoding="async"
        />
        <div className="certificates-section__wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--site-bg)/0.6)] via-[hsl(var(--site-bg)/0.4)] to-[hsl(var(--site-bg)/0.55)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28"
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8E8]/35 bg-[#00A8E8]/10 text-[#0077a8] dark:text-[#5dd4ff] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.16em]">
                <Globe2 size={14} />
                {t("certificates.badge")}
              </span>
            </div>

            <h2
              ref={titleRef}
              className="site-section-title text-left mb-4 !text-[clamp(1.5rem,4vw,2.75rem)]"
            >
              {t("certificates.title")}
            </h2>

            <p className="text-sm md:text-base site-muted leading-relaxed mb-4">{t("certificates.lead")}</p>
            <p className="text-sm site-muted/90 leading-relaxed mb-6 border-l-2 border-[#00A8E8]/50 pl-4">
              {t("certificates.sublead")}
            </p>

            {standards.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-8" role="list">
                {standards.map((label) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-lg border site-border bg-[hsl(var(--site-card)/0.9)] px-3 py-2 text-[11px] font-heading font-semibold site-heading"
                  >
                    <CheckCircle2 size={13} className="text-[#00D4AA] shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            )}

            <div className="rounded-2xl border site-border bg-[hsl(var(--site-card)/0.95)] p-6 shadow-lg">
              <p className="site-stat-highlight text-3xl md:text-4xl text-[#00A8E8] mb-1">
                {t("whyChoose.years")}
              </p>
              <p className="text-[10px] md:text-xs font-heading font-bold site-muted uppercase tracking-[0.2em] mb-3">
                {t("whyChoose.excellence")}
              </p>
              <p className="text-xs site-muted leading-relaxed">{t("certificates.company")}</p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <div className="rounded-2xl border site-border bg-[hsl(var(--site-card)/0.6)] backdrop-blur-sm p-4 md:p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] site-muted">
                  {t("certificates.galleryLabel")}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono site-muted tabular-nums">
                    {slide + 1} / {certificateSlideCount}
                  </span>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border site-border bg-[hsl(var(--site-card)/0.9)] text-site-heading hover:border-[#00A8E8]/50 transition-colors"
                    aria-label={t("certificates.prev")}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border site-border bg-[hsl(var(--site-card)/0.9)] text-site-heading hover:border-[#00A8E8]/50 transition-colors"
                    aria-label={t("certificates.next")}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="relative min-h-[320px] sm:min-h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {visibleIndices.map((certIndex) => {
                      const src = certificatePaths[certIndex];
                      const meta = items[certIndex];
                      const accent = certAccents[certIndex % certAccents.length];
                      const alt = getAlt(certIndex);

                      return (
                        <article
                          key={`${slide}-${certIndex}`}
                          className={`group flex flex-col rounded-xl border site-border border-t-4 ${accent} bg-[hsl(var(--site-card)/0.98)] overflow-hidden shadow-md hover:shadow-xl hover:border-[#00A8E8]/40 transition-all duration-300`}
                        >
                          {meta && (
                            <div className="px-3 pt-3 pb-2 border-b site-border/60">
                              <p className="font-mono text-[9px] font-bold text-[#00A8E8] uppercase tracking-wider mb-0.5">
                                {meta.standard}
                              </p>
                              <h3 className="font-heading font-bold text-[11px] md:text-xs site-heading leading-snug">
                                {meta.title}
                              </h3>
                              <p className="mt-0.5 text-[10px] site-muted leading-snug line-clamp-2">
                                {meta.subtitle}
                              </p>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => setLightboxIndex(certIndex)}
                            className="certificate-thumb group/btn relative flex-1 w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A8E8]"
                            aria-label={`${alt} — ${t("whyChoose.openCertificate")}`}
                            data-testid={`certificate-thumb-${certIndex + 1}`}
                          >
                            <img
                              src={src}
                              alt={alt}
                              className="certificate-thumb__img w-full h-full object-contain object-center bg-white p-1 transition-transform duration-300 group-hover/btn:scale-[1.02]"
                              loading="lazy"
                              decoding="async"
                            />
                            <span
                              className="absolute inset-0 bg-[#00A8E8]/0 group-hover/btn:bg-[#00A8E8]/5 transition-colors"
                              aria-hidden
                            />
                            <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/95 dark:bg-[hsl(var(--site-card)/0.95)] border site-border px-2 py-1 text-[10px] font-heading font-semibold site-heading opacity-0 group-hover/btn:opacity-100 transition-opacity shadow-sm">
                              <ZoomIn size={12} className="text-[#00A8E8]" />
                              {t("certificates.enlarge")}
                            </span>
                          </button>
                        </article>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label={t("certificates.galleryLabel")}>
                {Array.from({ length: certificateSlideCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={slide === i}
                    aria-label={`${t("certificates.slide")} ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      slide === i ? "w-8 bg-[#00A8E8]" : "w-2 bg-[hsl(var(--site-fg)/0.2)] hover:bg-[#00A8E8]/50"
                    }`}
                  />
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <CertificateLightbox
          src={certificatePaths[lightboxIndex]}
          alt={getAlt(lightboxIndex)}
          onClose={() => setLightboxIndex(null)}
          variant="a4"
        />
      )}
    </section>
  );
}
