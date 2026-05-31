import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/lib/products';
import { gsap } from 'gsap';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { useLocalizedProducts } from '@/lib/i18n/useLocalizedProducts';
import { mountAnimatedTitleChars } from '@/lib/animateTitleChars';
import {
  PRODUCT_CATEGORY_FILTER_I18N_KEY,
  PRODUCT_CATEGORY_I18N_KEY,
  PRODUCT_CATEGORY_ORDER,
  type ProductCategoryKey,
} from '@/lib/productCategories';

type FilterKey = 'all' | ProductCategoryKey;

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

  const filters: { key: FilterKey; label: string; title?: string }[] = [
    { key: 'all', label: t('productsPage.filterAll') },
    ...PRODUCT_CATEGORY_ORDER.map((key) => ({
      key,
      label: t(`productsPage.${PRODUCT_CATEGORY_FILTER_I18N_KEY[key]}`),
      title: t(`productsPage.${PRODUCT_CATEGORY_I18N_KEY[key]}`),
    })),
  ];

  const countForFilter = (key: FilterKey) =>
    key === 'all' ? products.length : products.filter((p) => p.categoryKey === key).length;

  const filteredProducts =
    filter === 'all' ? products : products.filter((p) => p.categoryKey === filter);

  const groupedSections =
    filter === 'all'
      ? PRODUCT_CATEGORY_ORDER.map((categoryKey) => ({
          categoryKey,
          title: t(`productsPage.${PRODUCT_CATEGORY_I18N_KEY[categoryKey]}`),
          items: products.filter((p) => p.categoryKey === categoryKey),
        })).filter((section) => section.items.length > 0)
      : null;

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
      const cards = gridRef.current.querySelectorAll('[data-product-card]');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
      );
    }
  }, [filter]);

  const renderProductGrid = (items: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard
            product={product}
            onClick={() => onProductClick(product)}
            onQuote={() => onQuoteClick(product)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id="products" className="py-32 site-section relative" data-testid="products-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 ref={titleRef} className="site-section-title mb-6">
            {t('productsPage.title')}
          </h2>
          <p className="text-xl site-muted font-sans">{t('productsPage.subtitle')}</p>
        </div>

        <div className="mb-12 w-full">
          <div
            className="product-category-filters flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-2xl border site-border site-card"
            role="tablist"
            aria-label={t('productsPage.filterCategoriesAria')}
          >
            {filters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={filter === cat.key}
                title={cat.title ?? cat.label}
                onClick={() => setFilter(cat.key)}
                className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold transition-all ${
                  filter === cat.key
                    ? 'bg-[#00A8E8] text-white shadow-[0_0_15px_rgba(0,168,232,0.3)] dark:text-[#031018]'
                    : 'site-muted hover:site-heading hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                data-testid={`filter-${cat.key}`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 tabular-nums opacity-90">({countForFilter(cat.key)})</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef}>
          {groupedSections ? (
            <div className="space-y-20">
              {groupedSections.map((section) => (
                <div key={section.categoryKey} data-testid={`category-section-${section.categoryKey}`}>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold site-heading mb-8 pb-4 border-b site-border">
                    {section.title}
                    <span className="ml-3 text-base font-sans site-muted font-normal">
                      ({section.items.length})
                    </span>
                  </h3>
                  {renderProductGrid(section.items)}
                </div>
              ))}
            </div>
          ) : (
            renderProductGrid(filteredProducts)
          )}
        </div>
      </div>
    </section>
  );
}
