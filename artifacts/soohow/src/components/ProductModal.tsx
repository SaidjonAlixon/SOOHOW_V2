import React, { useEffect, useRef } from 'react';
import { Product } from '@/lib/products';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { X, ChevronRight, Share2, Send, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onQuote: (p: Product) => void;
  relatedProducts: Product[];
  onProductSelect: (p: Product) => void;
}

export function ProductModal({ product, onClose, onQuote, relatedProducts, onProductSelect }: ProductModalProps) {
  const { t } = useLocale();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={modalRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[2000] bg-[hsl(var(--site-bg)/0.95)] backdrop-blur-md overflow-y-auto pt-20 pb-20"
        data-testid="product-modal-overlay"
      >
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 p-3 rounded-full site-card border site-border text-[hsl(var(--site-fg)/0.7)] hover:site-heading hover:border-[#00A8E8] transition-all z-50"
          data-testid="btn-close-modal"
        >
          <X size={24} />
        </button>

        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="site-card border site-border rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* LEFT: Image Gallery */}
              <div className="p-8 border-b md:border-b-0 md:border-r site-border site-section-alt/30 flex flex-col">
                <div className="flex items-center text-xs font-sans site-muted mb-8 uppercase tracking-wider">
                  <span className="cursor-pointer hover:site-heading transition-colors" onClick={onClose}>{t('productModal.productsBreadcrumb')}</span>
                  <ChevronRight size={14} className="mx-2" />
                  <span>{product.category}</span>
                </div>

                <div className="flex-grow flex items-center justify-center mb-8 relative">
                  {/* Decorative backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00A8E8]/10 to-transparent rounded-full blur-3xl"></div>
                  
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 max-h-64 w-full object-contain"
                    />
                  ) : product.categoryKey === 'chemical' ? (
                    <div className="w-48 h-48 border-4 border-[#00A8E8]/30 rounded-t-[4rem] rounded-b-2xl relative shadow-[0_0_50px_rgba(0,168,232,0.1)]">
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#00D4AA]/20 rounded-b-xl border-t border-[#00D4AA]/30"></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/20 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-64 h-48 border-4 border-[#00A8E8]/30 rounded-xl relative shadow-[0_0_50px_rgba(0,168,232,0.1)]">
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 border-[#00A8E8]/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-[#00A8E8]/20 flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#00A8E8] rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 flex gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thumbnails strip */}
                <div className="flex gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`w-20 h-20 rounded-lg border flex items-center justify-center bg-[hsl(var(--site-bg)/0.5)] cursor-pointer transition-colors ${i === 1 ? 'border-[#00A8E8]' : 'site-border hover:border-[hsl(var(--site-fg)/0.3)]'}`}>
                      <div className="w-8 h-8 border border-white/10 rounded-sm"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Product Info */}
              <div className="p-8 md:p-12">
                <div className="flex gap-2 mb-4">
                  {product.badges.map(badge => (
                    <span 
                      key={badge} 
                      className={`text-xs font-heading font-bold px-2.5 py-1 rounded-sm ${
                        badge === 'NEW' ? 'bg-[#F5A623] text-black' : 'bg-[#00D4AA] text-black'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="font-sans text-xl site-muted mb-2">{product.brand}</div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold site-heading mb-4 leading-tight">{product.name}</h2>
                <div className="inline-block px-3 py-1.5 bg-[#00A8E8]/10 border border-[#00A8E8]/30 rounded text-sm font-mono text-[#00A8E8] mb-8">
                  {t('productsPage.modelLabel')}: {product.model}
                </div>

                <p className="text-lg font-sans site-muted leading-relaxed mb-8">
                  {product.desc}
                </p>

                <div className="mb-8">
                  <h4 className="font-heading text-lg site-heading mb-4">{t('productModal.techSpecs')}</h4>
                  <div className="border site-border rounded-lg overflow-hidden">
                    {product.specs.map(([key, value], i) => (
                      <div key={key} className={`flex p-3 ${i !== product.specs.length - 1 ? 'border-b site-border' : ''} ${i % 2 === 0 ? 'bg-[hsl(var(--site-bg)/0.3)]' : ''}`}>
                        <div className="w-1/3 text-sm font-sans site-muted">{key}</div>
                        <div className="w-2/3 text-sm font-mono text-[hsl(var(--site-fg)/0.9)]">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 site-section-alt rounded-lg border site-border mb-8 flex items-center">
                  <div className="w-2 h-2 bg-[#00D4AA] rounded-full mr-3"></div>
                  <span className="text-sm font-sans text-[hsl(var(--site-fg)/0.8)]">{t('productModal.pricingNote')}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button 
                    onClick={() => onQuote(product)}
                    className="flex-1 py-4 rounded-full bg-gradient-primary site-heading font-heading font-bold text-lg hover:shadow-[0_0_20px_rgba(0,168,232,0.4)] transition-shadow flex items-center justify-center"
                    data-testid="btn-modal-quote"
                  >
                    {t('productModal.getQuote')} <ArrowRight className="ml-2" size={18} />
                  </button>
                  <div className="flex gap-2">
                    <button className="w-14 h-14 rounded-full border site-border flex items-center justify-center text-[hsl(var(--site-fg)/0.7)] hover:site-heading hover:border-white/50 transition-colors" aria-label={t('productModal.share')}>
                      <Share2 size={20} />
                    </button>
                    <button className="w-14 h-14 rounded-full border site-border flex items-center justify-center text-[#00A8E8] hover:bg-[#00A8E8]/10 hover:border-[#00A8E8] transition-colors" aria-label={t('productModal.telegram')}>
                      <Send size={20} className="-ml-0.5 mt-0.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-16"
            >
              <h3 className="font-heading text-2xl site-heading mb-8">{t('productModal.related')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(rp => (
                  <div 
                    key={rp.id}
                    onClick={() => onProductSelect(rp)}
                    className="site-card border site-border p-4 rounded-xl cursor-pointer hover:border-[#00A8E8] transition-colors group"
                  >
                    <div className="text-[10px] site-muted mb-1">{rp.brand}</div>
                    <div className="font-heading site-heading text-sm truncate group-hover:text-[#00A8E8] transition-colors">{rp.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
