import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { productLocaleMap } from "@/lib/i18n/productLocales";
import {
  EQUIPMENT_PROMO_INTERVAL_MS,
  equipmentPromoSlides,
} from "@/lib/equipmentPromo";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function EquipmentPromoCarousel({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const [index, setIndex] = useState(0);
  const count = equipmentPromoSlides.length;

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, EQUIPMENT_PROMO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count]);

  const slide = equipmentPromoSlides[index];
  const product = productLocaleMap[locale][slide.productId];

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[380px] md:min-h-[480px] flex-col overflow-hidden rounded-2xl border site-border site-card shadow-lg shadow-slate-200/50 dark:shadow-[0_0_40px_rgba(0,168,232,0.08)]",
        className,
      )}
      data-testid="equipment-promo-carousel"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00A8E8]/8 via-transparent to-[#00D4AA]/10 pointer-events-none z-[1]" />

      <div className="relative z-10 flex items-center justify-between gap-3 border-b site-border/60 px-4 py-3 md:px-5">
        <span className="inline-flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-[#00A8E8]">
          <Sparkles size={14} className="shrink-0" />
          {t("equipmentPromo.badge")}
        </span>
        <span className="text-[10px] font-mono site-muted tabular-nums">
          {index + 1} / {count}
        </span>
      </div>

      <div className="relative z-0 flex-1 min-h-[260px] bg-white dark:bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt={product.name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        <motion.div
          key={`progress-${index}`}
          className="absolute bottom-0 left-0 h-1 bg-[#00A8E8]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: EQUIPMENT_PROMO_INTERVAL_MS / 1000, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 border-t site-border/60 bg-[hsl(var(--site-card)/0.95)] backdrop-blur-sm p-4 md:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[10px] font-sans uppercase tracking-widest site-muted mb-1">
              {product.category}
            </p>
            <h3 className="font-heading font-bold text-lg md:text-xl site-heading leading-snug mb-1">
              {product.name}
            </h3>
            <p className="text-sm site-muted mb-4 line-clamp-2">{product.spec}</p>
            <Link
              href={routes.products}
              className="inline-flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-wide text-[#00A8E8] hover:text-[#00D4AA] transition-colors"
            >
              {t("equipmentPromo.cta")}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border site-border bg-[hsl(var(--site-card)/0.9)] p-2 site-heading shadow-md backdrop-blur-sm transition-colors hover:border-[#00A8E8] hover:text-[#00A8E8]"
            aria-label={t("equipmentPromo.prev")}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border site-border bg-[hsl(var(--site-card)/0.9)] p-2 site-heading shadow-md backdrop-blur-sm transition-colors hover:border-[#00A8E8] hover:text-[#00A8E8]"
            aria-label={t("equipmentPromo.next")}
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-[7.5rem] left-0 right-0 z-20 flex justify-center gap-2">
            {equipmentPromoSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-[#00A8E8]" : "w-2 bg-[hsl(var(--site-fg)/0.25)] hover:bg-[#00A8E8]/60",
                )}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
