import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection({ onQuoteClick }: { onQuoteClick: () => void }) {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center bg-[#061A2E] overflow-hidden noise-bg" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-[#00A8E8]/40 bg-[#00A8E8]/5 backdrop-blur-sm w-fit mb-8"
          >
            <span className="text-[#00A8E8] mr-2">⬡</span>
            <span className="text-sm font-sans font-medium text-[#8B9BB4]">Central Asia's #1 Industrial Supplier</span>
          </motion.div>

          <h1 className="font-display text-[70px] md:text-[90px] leading-[0.9] text-white mb-6">
            <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 0.8, delay: 0.3 }}>
              PRECISION<br/>
              INSTRUMENTS.<br/>
            </motion.div>
            <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 0.8, delay: 0.6 }} className="text-gradient">
              PURE REAGENTS.
            </motion.div>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-lg font-sans text-[#8B9BB4] max-w-lg mb-10 leading-relaxed"
          >
            SOOHOW CENTRAL ASIA supplies world-class industrial measurement instruments and certified chemical reagents to laboratories and manufacturing plants across Central Asia.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-gradient-primary text-white font-heading font-bold hover:shadow-[0_0_30px_rgba(0,168,232,0.3)] hover:scale-105 transition-all flex items-center"
              data-testid="btn-explore"
            >
              Explore Instruments <ArrowRight className="ml-2" size={18} />
            </button>
            <button 
              onClick={onQuoteClick}
              className="px-8 py-4 rounded-full border border-[#00A8E8] text-[#00A8E8] font-heading font-bold hover:bg-[#00A8E8]/10 transition-colors"
              data-testid="btn-hero-quote"
            >
              Request a Quote
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="flex items-center text-sm font-mono text-[#8B9BB4] divide-x divide-[#1E3A5F]"
          >
            <span className="pr-4">500+ Products</span>
            <span className="px-4">200+ Clients</span>
            <span className="pl-4">10+ Years</span>
          </motion.div>
        </div>

        {/* RIGHT CONTENT (Three.js) */}
        <div className="hidden lg:block relative h-[600px] w-full mt-10 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ThreeCanvas />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}
            className="absolute bottom-10 right-10 z-10 glass-panel p-4 rounded-xl animate-[float_4s_ease-in-out_infinite] w-64 shadow-2xl"
          >
            <div className="text-[10px] text-[#8B9BB4] uppercase tracking-wider mb-1">Featured Instrument</div>
            <div className="font-heading font-bold text-white text-sm">Ultrasonic Flow Meter XT-500</div>
          </motion.div>
        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer" onClick={scrollToAbout}>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden mb-2">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 w-full h-1/2 bg-[#00A8E8]" 
          />
        </div>
        <span className="text-[10px] font-mono text-[#8B9BB4] uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
