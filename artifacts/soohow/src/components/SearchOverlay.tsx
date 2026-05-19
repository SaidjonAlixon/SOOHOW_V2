import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/products';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { useLocalizedProducts } from '@/lib/i18n/useLocalizedProducts';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
  onClose: () => void;
  onProductSelect: (p: Product) => void;
}

export function SearchOverlay({ onClose, onProductSelect }: SearchOverlayProps) {
  const { t, messages } = useLocale();
  const products = useLocalizedProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    setTimeout(() => inputRef.current?.focus(), 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // If Enter is pressed and there's exactly one clear best match or top result, could select it
      // Simple implementation: select first result on Enter
      if (e.key === 'Enter' && results.length > 0) {
        onProductSelect(results[0]);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, results, onProductSelect]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.model.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
      setResults(matches);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] bg-[hsl(var(--site-bg)/0.95)] backdrop-blur-xl flex flex-col"
        data-testid="search-overlay"
      >
        <div className="flex-none p-6 md:p-10 border-b site-border">
          <div className="max-w-4xl mx-auto flex items-center relative">
            <Search className="absolute left-0 text-[#00A8E8]" size={32} />
            <input 
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full bg-transparent border-none outline-none text-2xl md:text-4xl font-heading site-heading pl-14 pr-14 placeholder:site-muted/50"
            />
            <button 
              onClick={onClose}
              className="absolute right-0 p-2 site-muted hover:site-heading transition-colors"
            >
              <X size={32} />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {!query ? (
              <div className="pt-10">
                <h4 className="text-sm font-sans site-muted uppercase tracking-widest mb-6">{t('searchExt.popularCategories')}</h4>
                <div className="flex flex-wrap gap-3">
                  {messages.searchExt.tags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 rounded-full border site-border site-muted hover:site-heading hover:border-[#00A8E8] transition-colors font-sans text-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4 pt-6">
                <div className="text-sm font-mono text-[#00A8E8] mb-6">{results.length} {t('searchExt.resultsFound')}</div>
                {results.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => { onProductSelect(product); onClose(); }}
                    className="group site-card border site-border p-4 md:p-6 rounded-xl cursor-pointer hover:border-[#00A8E8] transition-all flex items-center gap-6"
                  >
                    <div className="w-16 h-16 rounded site-section border site-border hidden sm:flex items-center justify-center shrink-0">
                      {product.categoryKey === 'chemical' ? (
                        <div className="w-6 h-6 border-b-2 border-[#00D4AA] rounded-b-md relative"><div className="absolute bottom-0 w-full h-3 bg-[#00D4AA]/20"></div></div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-[#00A8E8] rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-sans site-muted mb-1">{product.category} • {product.brand}</div>
                      <div className="font-heading text-lg site-heading truncate group-hover:text-[#00A8E8] transition-colors">{product.name}</div>
                      <div className="text-sm font-mono site-muted truncate mt-1">{t('productsPage.modelLabel')}: {product.model}</div>
                    </div>

                    <div className="shrink-0 text-[#00A8E8] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                      <ArrowRight />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pt-20 text-center site-muted">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <div className="font-heading text-xl site-heading mb-2">{t('search.noResults')}</div>
                <p>{t('searchExt.tryTypos')}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
