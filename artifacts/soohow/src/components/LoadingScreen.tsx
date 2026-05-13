import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400); // SOOHOW drops
    const t2 = setTimeout(() => setStage(2), 800); // CENTRAL ASIA drops
    const t3 = setTimeout(() => setStage(3), 1200); // Line grows + progress
    const t4 = setTimeout(() => setStage(4), 1800); // Tagline fades
    const t5 = setTimeout(() => {
      setStage(5);
      setTimeout(onComplete, 600); // Wait for split animation
    }, 2400); // Split

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (stage === 5) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#061A2E] overflow-hidden" data-testid="loading-screen">
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: stage >= 1 ? 0 : -100, opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-display text-[#00A8E8] tracking-wider mb-2"
          >
            SOOHOW
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: stage >= 2 ? 0 : 50, opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-sans font-light text-[#8B9BB4] tracking-[4px]"
          >
            CENTRAL ASIA
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: stage >= 3 ? 1 : 0, opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-64 h-[1px] bg-white/20 relative overflow-hidden mb-6"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: stage >= 3 ? "0%" : "-100%" }}
            transition={{ duration: 0.8, ease: "linear", delay: 0.2 }}
            className="absolute inset-0 bg-[#00A8E8]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-sans text-white/70"
        >
          Industrial Precision. Chemical Excellence.
        </motion.p>
      </div>

      <AnimatePresence>
        {stage >= 5 && (
          <>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#061A2E] z-20 border-r border-[#00A8E8]/20"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#061A2E] z-20 border-l border-[#00A8E8]/20"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
