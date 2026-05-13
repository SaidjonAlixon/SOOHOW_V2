import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { Product } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuote: () => void;
}

export function ProductCard({ product, onClick, onQuote }: ProductCardProps) {
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
      className="bg-[#0F1923] border border-[#1E3A5F] rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 group flex flex-col h-full hover:border-[#00A8E8] hover:shadow-[0_0_24px_rgba(0,168,232,0.15)]"
      onClick={onClick}
      data-product-card="true"
      data-testid={`card-product-${product.id}`}
    >
      {/* Top badges */}
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

      {/* Image Area */}
      <div className="h-48 w-full bg-gradient-to-br from-[#0A2342] to-[#061A2E] relative flex items-center justify-center border-b border-[#1E3A5F]/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBMNDAgMTBMMzkgMzBMMjAgNDBMMCAzMEwwIDEwTDIwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDRBODAiIHN0cm9rZS1vcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] opacity-30 group-hover:opacity-60 transition-opacity"></div>
        {product.category.includes("Chemical") ? (
          <div className="w-16 h-16 border-2 border-[#00A8E8]/50 rounded-t-3xl rounded-b-xl relative group-hover:border-[#00A8E8] transition-colors">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#00D4AA]/20 rounded-b-lg"></div>
          </div>
        ) : (
          <div className="w-20 h-16 border-2 border-[#00A8E8]/50 rounded-lg relative group-hover:border-[#00A8E8] transition-colors">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#00A8E8]/50"></div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[10px] font-sans text-[#8B9BB4] uppercase tracking-widest mb-2">{product.category}</div>
        <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-[#00A8E8] transition-colors">{product.name}</h3>
        <div className="text-sm font-mono text-[#00A8E8] mb-4">{product.model}</div>
        
        <p className="text-sm font-sans text-[#8B9BB4] mb-6 flex-grow">{product.spec}</p>
        
        <div className="w-full h-px bg-[#1E3A5F] mb-6"></div>
        
        <div className="flex gap-3">
          <button 
            className="flex-1 py-2.5 rounded border border-[#1E3A5F] text-white font-heading font-semibold text-sm hover:border-[#00A8E8] hover:bg-[#00A8E8]/5 transition-colors"
            onClick={(e) => { e.stopPropagation(); onQuote(); }}
            data-testid={`btn-get-price-${product.id}`}
          >
            Get Price
          </button>
          <button 
            className="flex-1 py-2.5 rounded bg-gradient-primary text-white font-heading font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,168,232,0.3)] transition-shadow flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); onQuote(); }}
            data-testid={`btn-request-${product.id}`}
          >
            Request <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
