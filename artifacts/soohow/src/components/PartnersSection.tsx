import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

const base = import.meta.env.BASE_URL;

/** Har bir izda necha marta takrorlash — keng ekranda bo'sh joy qolmasin */
const REPEATS_PER_TRACK = 4;

type PartnerLogo = { src: string; alt: string };

function partnerLogoSrc(n: number) {
  return `${base}hamkor_log/${n}.png`;
}

function PartnerLogoCard({ logo }: { logo: PartnerLogo }) {
  return (
    <div
      className="mx-2 sm:mx-3 shrink-0 rounded-xl border border-[hsl(211_27%_88%)] bg-white px-6 sm:px-8 py-4 sm:py-5 min-w-[10rem] sm:min-w-[12rem] h-[5.5rem] sm:h-[6rem] flex items-center justify-center shadow-sm hover:border-[#00A8E8]/45 dark:border-white/20 dark:bg-white dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-colors"
    >
      <img
        src={logo.src}
        alt={logo.alt}
        className="max-h-10 sm:max-h-12 w-auto max-w-[8rem] sm:max-w-[9.5rem] object-contain object-center select-none"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

function PartnerTrack({
  logos,
  trackId,
}: {
  logos: readonly PartnerLogo[];
  trackId: string;
}) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={trackId.endsWith("-b") ? true : undefined}>
      {Array.from({ length: REPEATS_PER_TRACK }, (_, copy) =>
        logos.map((logo, i) => (
          <PartnerLogoCard key={`${trackId}-${copy}-${i}`} logo={logo} />
        )),
      )}
    </div>
  );
}

function PartnerMarquee({
  logos,
  direction,
}: {
  logos: readonly PartnerLogo[];
  direction: "left" | "right";
}) {
  const trackKey = logos[0]?.src ?? "track";

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex w-max will-change-transform ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"} group-hover:[animation-play-state:paused]`}
      >
        <PartnerTrack logos={logos} trackId={`${trackKey}-a`} />
        <PartnerTrack logos={logos} trackId={`${trackKey}-b`} />
      </div>
    </div>
  );
}

export function PartnersSection() {
  const { t, messages } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const names = messages.partners.names;

  const topLogos: PartnerLogo[] = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    src: partnerLogoSrc(n),
    alt: names[i] ?? `Partner ${n}`,
  }));

  const bottomLogos: PartnerLogo[] = [7, 8, 9, 10, 11, 12].map((n, i) => ({
    src: partnerLogoSrc(n),
    alt: names[i + 6] ?? `Partner ${n}`,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden border-t site-border site-home-section"
      data-testid="partners-section"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] site-muted mb-4">
            <Shield size={14} className="text-[#00A8E8]" strokeWidth={2} />
            {t("partners.badge")}
          </span>
          <h2 className="site-section-title">
            {t("partners.title")}
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative w-full overflow-hidden group"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-[hsl(var(--site-bg))] to-transparent"
          aria-hidden
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-[hsl(var(--site-bg))] to-transparent"
          aria-hidden
        />

        <div className="space-y-4 sm:space-y-5 py-2">
          <PartnerMarquee logos={topLogos} direction="left" />
          <PartnerMarquee logos={bottomLogos} direction="right" />
        </div>
      </motion.div>
    </section>
  );
}
