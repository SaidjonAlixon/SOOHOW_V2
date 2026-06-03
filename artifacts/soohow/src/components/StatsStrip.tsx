import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/lib/i18n/LocaleContext';

const statKeys = [
  { key: 'stats.products', value: 40, suffix: '+' },
  { key: 'stats.clients', value: 200, suffix: '+' },
  { key: 'stats.partners', value: 15, suffix: '+' },
  { key: 'stats.years', value: 10, suffix: '+' },
] as const;

export function StatsStrip() {
  const { t } = useLocale();
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
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="stats-strip"
      ref={containerRef}
      className="stats-strip w-full border-y"
      data-testid="stats-strip"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4">
          {statKeys.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center lg:px-4 lg:border-l lg:first:border-l-0 border-[hsl(196_60%_45%/0.12)] dark:border-[hsl(196_100%_50%/0.1)]"
            >
              <div className="font-heading font-extrabold text-4xl sm:text-5xl md:text-[3.25rem] text-[#0096c7] dark:text-[#00C8F0] mb-2 flex items-baseline tracking-tight tabular-nums">
                {isVisible ? <Counter end={stat.value} duration={2000} /> : '0'}
                <span className="text-2xl sm:text-3xl ml-0.5 font-bold">{stat.suffix}</span>
              </div>
              <div className="font-heading text-[11px] sm:text-xs site-muted uppercase tracking-[0.14em] font-semibold max-w-[9rem] leading-snug">
                {t(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Counter({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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
