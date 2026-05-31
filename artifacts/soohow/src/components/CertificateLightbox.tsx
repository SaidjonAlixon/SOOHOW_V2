import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";

interface CertificateLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  /** Full A4 portrait preview (210×297 mm) */
  variant?: "thumb" | "a4";
}

export function CertificateLightbox({
  src,
  alt,
  onClose,
  variant = "thumb",
}: CertificateLightboxProps) {
  const { t } = useLocale();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-[hsl(var(--site-bg)/0.92)] backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        data-testid="certificate-lightbox"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={
            variant === "a4"
              ? "relative w-[min(95vw,210mm)] max-h-[95vh] flex flex-col rounded-xl border site-border bg-white shadow-2xl overflow-hidden"
              : "relative max-w-[min(92vw,22rem)] sm:max-w-[min(88vw,26rem)] md:max-w-md rounded-xl border site-border bg-[hsl(var(--site-card))] shadow-2xl overflow-hidden"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#00A8E8] text-white shadow-lg hover:bg-[#0096c7] transition-colors"
            aria-label={t("whyChoose.closeLightbox")}
            data-testid="certificate-lightbox-close"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <img
            src={src}
            alt={alt}
            className={
              variant === "a4"
                ? "block w-full h-auto max-h-[calc(95vh-3rem)] object-contain bg-white"
                : "block w-full max-h-[min(58vh,28rem)] object-contain bg-white"
            }
            style={variant === "a4" ? { aspectRatio: "210 / 297" } : undefined}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
