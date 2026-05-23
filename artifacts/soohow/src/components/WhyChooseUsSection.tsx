import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CertificateLightbox } from "@/components/CertificateLightbox";
import { Award, Rocket, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { mountAnimatedTitleChars } from "@/lib/animateTitleChars";

gsap.registerPlugin(ScrollTrigger);

const base = import.meta.env.BASE_URL;
const whyChooseBg = `${base}yangili/soohow_kare.png`;

export function WhyChooseUsSection() {
  const { t, tList, locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const collageImages = [
    { src: `${base}sertifikat/1.jpg`, alt: t("whyChooseImages.alt1") },
    { src: `${base}sertifikat/2.jpg`, alt: t("whyChooseImages.alt2") },
    { src: `${base}sertifikat/3.jpg`, alt: t("whyChooseImages.alt3") },
  ];
  const advantages = tList("whyChoose.items");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const charSpans = mountAnimatedTitleChars(titleRef.current, t("whyChoose.title"));

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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 site-home-section border-t site-border overflow-hidden why-choose-section"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--site-bg)/0.4)] via-transparent to-[hsl(var(--site-bg)/0.22)]" />
      </div>

      <motion.div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold site-heading uppercase tracking-tight mb-12 md:mb-16 max-w-4xl leading-[1.1] [text-wrap:balance]"
        >
          {t("whyChoose.title")}
        </motion.h2>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative site-card border site-border rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden backdrop-blur-sm bg-[hsl(var(--site-card)/0.94)] dark:bg-[hsl(var(--site-card)/0.9)]"
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/5 via-transparent to-[#00D4AA]/5 dark:from-[#00A8E8]/8 dark:to-transparent pointer-events-none" />

            <motion.div className="relative z-10 flex justify-end mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A8E8]/30 bg-[#00A8E8]/10 dark:bg-[#00A8E8]/15 text-[#00A8E8] text-xs font-heading font-bold uppercase tracking-widest">
                <Award size={14} />
                {t("whyChoose.badge")}
              </span>
            </motion.div>

            <motion.div className="relative z-10 flex items-start gap-3 mb-6">
              <motion.div className="shrink-0 w-10 h-10 rounded-xl bg-[#00A8E8]/15 border border-[#00A8E8]/25 flex items-center justify-center text-[#00A8E8]">
                <Rocket size={20} />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-heading font-bold site-heading leading-snug pt-1">
                {t("whyChoose.cardTitle")}
              </h3>
            </motion.div>

            <ul className="relative z-10 space-y-3.5">
              {advantages.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm md:text-[15px] site-muted leading-relaxed"
                >
                  <Zap size={16} className="shrink-0 mt-0.5 text-[#00A8E8] fill-[#00A8E8]/20" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative rounded-2xl border site-border overflow-hidden min-h-[420px] lg:min-h-full shadow-lg shadow-slate-200/60 dark:shadow-none"
          >
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-[hsl(var(--site-border)/0.4)] h-full min-h-[inherit]">
              {collageImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden rounded-lg h-full min-h-0 ${
                    index === 0 ? "col-span-1 row-span-2" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--site-bg))]"
                    aria-label={`${image.alt} — ${t("whyChoose.openCertificate")}`}
                    data-testid={`certificate-thumb-${index + 1}`}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" aria-hidden />
                  </button>
                </div>
              ))}
            </div>

            {lightboxIndex !== null && (
              <CertificateLightbox
                src={collageImages[lightboxIndex].src}
                alt={collageImages[lightboxIndex].alt}
                onClose={() => setLightboxIndex(null)}
              />
            )}

            <div className="absolute bottom-0 right-0 left-0 p-6 md:p-8 flex justify-end pointer-events-none z-10">
              <div className="text-right backdrop-blur-sm bg-[hsl(var(--site-card)/0.85)] dark:bg-[hsl(var(--site-card)/0.75)] border site-border rounded-xl px-5 py-4 shadow-lg pointer-events-auto">
                <p className="font-display text-4xl md:text-5xl text-[#00A8E8] leading-none mb-1">{t("whyChoose.years")}</p>
                <p className="text-[10px] md:text-xs font-heading font-bold site-muted uppercase tracking-[0.2em]">
                  {t("whyChoose.excellence")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
