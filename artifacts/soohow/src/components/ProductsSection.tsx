import React, { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Product, products } from '@/lib/products';
import { gsap } from 'gsap';

interface ProductsSectionProps {
  onProductClick: (p: Product) => void;
  onQuoteClick: (p: Product) => void;
}

export function ProductsSection({ onProductClick, onQuoteClick }: ProductsSectionProps) {
  const [filter, setFilter] = useState('All');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Industrial Measurement', 'Chemical Reagents'];
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.innerText.split('');
      titleRef.current.innerText = '';
      chars.forEach(char => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.className = 'inline-block opacity-0 translate-y-[-60px]';
        titleRef.current?.appendChild(span);
      });

      gsap.to(titleRef.current.children, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  }, []);

  useEffect(() => {
    // Re-animate grid items on filter change
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    }
  }, [filter]);

  return (
    <section id="products" className="py-32 bg-[#061A2E] relative" data-testid="products-section">
      <div className="absolute top-10 left-10 text-[180px] md:text-[240px] font-display text-white/[0.03] leading-none select-none z-0 pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
            INSTRUMENTS & REAGENTS
          </h2>
          <p className="text-xl text-[#8B9BB4] font-sans">
            Precision tools for demanding industrial environments. Certified reagents for critical analytical processes.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-12 overflow-x-auto hide-scrollbar">
          <div className="flex bg-[#0F1923] p-1.5 rounded-full border border-[#1E3A5F]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-heading font-bold transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'bg-[#00A8E8] text-white shadow-[0_0_15px_rgba(0,168,232,0.3)]' 
                    : 'text-[#8B9BB4] hover:text-white hover:bg-white/5'
                }`}
                data-testid={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat} {cat === 'All' ? `(${products.length})` : `(${products.filter(p => p.category === cat).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
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
