import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/lib/products';
import { gsap } from 'gsap';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { useLocalizedProducts } from '@/lib/i18n/useLocalizedProducts';
import { mountAnimatedTitleChars } from '@/lib/animateTitleChars';

type FilterKey = 'all' | 'industrial';

interface ProductsSectionProps {
  onProductClick: (p: Product) => void;
  onQuoteClick: (p: Product) => void;
}

export function ProductsSection({ onProductClick, onQuoteClick }: ProductsSectionProps) {
  const { t } = useLocale();
  const products = useLocalizedProducts();
  const [filter, setFilter] = useState<FilterKey>('all');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('productsPage.filterAll') },
    { key: 'industrial', label: t('productsPage.catIndustrial') },
  ];

  const filteredProducts =
    filter === 'all' ? products : products.filter((p) => p.categoryKey === filter);

  useEffect(() => {
    if (titleRef.current) {
      const charSpans = mountAnimatedTitleChars(
        titleRef.current,
        t('productsPage.title'),
        'inline-block opacity-0 translate-y-[-60px]',
      );

      gsap.to(charSpans, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [t]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
      );
    }
  }, [filter]);

  return (
    <section id="products" className="py-32 site-section relative" data-testid="products-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 ref={titleRef} className="site-section-title mb-6">
            {t('productsPage.title')}
          </h2>
          <p className="text-xl site-muted font-sans">{t('productsPage.subtitle')}</p>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto hide-scrollbar">
          <div className="flex site-card p-1.5 rounded-full border site-border">
            {filters.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-heading font-bold transition-all whitespace-nowrap ${
                  filter === cat.key
                    ? 'bg-[#00A8E8] site-heading shadow-[0_0_15px_rgba(0,168,232,0.3)]'
                    : 'site-muted hover:site-heading hover:bg-white/5'
                }`}
                data-testid={`filter-${cat.key}`}
              >
                {cat.label}{' '}
                {cat.key === 'all'
                  ? `(${products.length})`
                  : `(${products.filter((p) => p.categoryKey === cat.key).length})`}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard
                product={product}
                onClick={() => onProductClick(product)}
                onQuote={() => onQuoteClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
