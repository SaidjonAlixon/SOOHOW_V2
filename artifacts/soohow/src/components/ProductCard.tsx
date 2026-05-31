import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { Product } from '@/lib/products';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuote: () => void;
}

export function ProductCard({ product, onClick, onQuote }: ProductCardProps) {
  const { t } = useLocale();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // @ts-ignore
      VanillaTilt.init(cardRef.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.03
      });
    }
    return () => {
      if (cardRef.current && (cardRef.current as any).vanillaTilt) {
        (cardRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative site-card border site-border rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 group flex flex-col h-full hover:border-[#00A8E8] hover:shadow-[0_0_24px_rgba(0,168,232,0.15)]"
      onClick={onClick}
      data-product-card="true"
      data-testid={`card-product-${product.id}`}
    >
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        {product.badges.map(badge => (
          <span
            key={badge}
            className={`text-xs font-heading font-bold px-2 py-1 rounded-sm ${
              badge === 'NEW' ? 'bg-[#F5A623] text-black' : 'bg-[#00D4AA] text-black'
            }`}
          >
            {badge}
          </span>
        ))}
      </div>

      <div
        className={cn(
          "relative h-52 w-full shrink-0 overflow-hidden border-b site-border/50",
          product.image
            ? "bg-white dark:bg-slate-100"
            : "bg-gradient-to-br from-[hsl(var(--site-bg-alt))] to-[hsl(var(--site-bg))]",
        )}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBMNDAgMTBMMzkgMzBMMjAgNDBMMCAzMEwwIDEwTDIwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDRBODAiIHN0cm9rZS1vcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative h-16 w-20 rounded-lg border-2 border-[#00A8E8]/50 group-hover:border-[#00A8E8] transition-colors">
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00A8E8]/50" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="relative z-[1] mb-2 text-[10px] font-sans site-muted uppercase tracking-widest leading-relaxed">
          {product.category}
        </p>
        <h3 className="text-xl font-heading font-bold site-heading mb-1 group-hover:text-[#00A8E8] transition-colors">{product.name}</h3>
        <div className="text-sm font-mono text-[#00A8E8] mb-4">{product.model}</div>

        <p className="text-sm font-sans site-muted mb-6 flex-grow">{product.spec}</p>

        <div className="w-full h-px bg-[#1E3A5F] mb-6"></div>

        <div className="flex gap-3">
          <button
            className="flex-1 py-2.5 rounded border site-border site-heading font-heading font-semibold text-sm hover:border-[#00A8E8] hover:bg-[#00A8E8]/5 transition-colors"
            onClick={(e) => { e.stopPropagation(); onQuote(); }}
            data-testid={`btn-get-price-${product.id}`}
          >
            {t('common.getPrice')}
          </button>
          <button
            className="flex-1 py-2.5 rounded bg-gradient-primary site-heading font-heading font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,168,232,0.3)] transition-shadow flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); onQuote(); }}
            data-testid={`btn-request-${product.id}`}
          >
            {t('common.request')} <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

