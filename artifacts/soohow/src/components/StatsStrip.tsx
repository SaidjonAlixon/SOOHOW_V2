import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { label: "Products Listed", value: 500, suffix: "+" },
  { label: "Clients Served", value: 200, suffix: "+" },
  { label: "Brand Partners", value: 15, suffix: "+" },
  { label: "Years Active", value: 10, suffix: "+" },
  { label: "Reagents Supplied", value: 50, suffix: "K+" }
];

export function StatsStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#0A2342] border-y border-[#1E3A5F]" data-testid="stats-strip">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:divide-x divide-[#1E3A5F]">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center lg:px-4">
              <div className="font-display text-5xl md:text-6xl text-[#00A8E8] mb-2 flex items-baseline">
                {isVisible ? <Counter end={stat.value} duration={2000} /> : "0"}
                <span className="text-3xl ml-1">{stat.suffix}</span>
              </div>
              <div className="font-sans text-sm text-[#8B9BB4] uppercase tracking-wide font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Counter({ end, duration }: { end: number, duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
}
