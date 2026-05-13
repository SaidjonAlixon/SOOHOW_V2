import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  "Bronkhorst", "WIKA", "Dräger", "Fluke", "Olympus", 
  "Brookfield", "Honeywell", "Sigma-Aldrich", "Merck", 
  "AppliChem", "VWR", "Certipur", "Mettler Toledo", "Endress+Hauser"
];

export function AboutSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
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

    // Timeline animation
    if (timelineRef.current) {
      const line = timelineRef.current.querySelector('.timeline-line');
      const items = timelineRef.current.querySelectorAll('.timeline-item');

      gsap.fromTo(line, 
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1
          },
          scaleY: 1,
          transformOrigin: "top",
          ease: "none"
        }
      );

      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" className="py-32 bg-[#061A2E] relative overflow-hidden" data-testid="about-section">
      <div className="absolute top-10 right-10 text-[180px] md:text-[240px] font-display text-white/[0.03] leading-none select-none z-0 pointer-events-none">
        01
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
            WHO WE ARE
          </h2>
          <p className="text-xl text-[#8B9BB4] font-sans leading-relaxed">
            Engineering trust in every measurement. Building partnerships across Central Asia's most demanding industries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-6 text-[#8B9BB4] font-sans text-lg">
            <p>
              Founded with a commitment to absolute precision, SOOHOW CENTRAL ASIA has grown to become the region's definitive source for critical industrial measurement and chemical analysis.
            </p>
            <p>
              We don't just supply equipment; we deliver the foundational accuracy that manufacturing plants, research laboratories, and extraction facilities rely on to operate safely and efficiently.
            </p>
            <ul className="space-y-3 mt-8">
              {[
                "Precision measurement equipment for manufacturing",
                "Certified chemical reagents for labs & industry",
                "Oil & gas sector instrumentation",
                "Pharmaceutical-grade chemicals",
                "Environmental monitoring solutions"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#00A8E8] mr-3 mt-1 text-xl">▸</span>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl bg-[#0F1923] border border-[#1E3A5F] p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBMNDAgMTBMMzkgMzBMMjAgNDBMMCAzMEwwIDEwTDIwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDRBODAiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-50"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="font-heading text-2xl text-white mb-8">Our Impact</h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { l: "Products", v: "500+" },
                  { l: "Clients", v: "200+" },
                  { l: "Partners", v: "15+" },
                  { l: "Years", v: "10+" }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl font-display text-[#00A8E8] mb-1">{s.v}</div>
                    <div className="text-sm font-sans text-[#8B9BB4] uppercase tracking-wider">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="mb-32">
          <h3 className="text-3xl font-heading font-bold text-white mb-12 text-center">INDUSTRIAL TIMELINE</h3>
          <div ref={timelineRef} className="relative max-w-4xl mx-auto py-10">
            {/* Center Line */}
            <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#1E3A5F] -translate-x-1/2"></div>
            
            {[
              { year: "2014", title: "Founded in Tashkent", desc: "Focus established on high-purity laboratory chemicals." },
              { year: "2016", title: "European Partnerships", desc: "Secured distribution for major EU instrument manufacturers." },
              { year: "2018", title: "Industrial Expansion", desc: "Expanded into heavy industrial measurement sector." },
              { year: "2020", title: "Oil & Gas Division", desc: "Launched specialized division for energy sector instrumentation." },
              { year: "2022", title: "Market Leadership", desc: "Reached milestone of 200+ active enterprise clients." },
              { year: "2024", title: "Comprehensive Catalog", desc: "Surpassed 500+ products and 15+ exclusive brand partners." }
            ].map((milestone, i) => (
              <div key={i} className={`timeline-item flex w-full items-center justify-between mb-8 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-5/12"></div>
                
                {/* Center Dot */}
                <div className="w-4 h-4 rounded-full bg-[#00A8E8] border-4 border-[#061A2E] z-10 relative shadow-[0_0_10px_rgba(0,168,232,0.5)]"></div>
                
                <div className={`w-5/12 p-6 rounded-xl bg-[#0F1923] border border-[#1E3A5F] hover:border-[#00A8E8]/50 transition-colors ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="font-display text-3xl text-[#00A8E8] mb-2">{milestone.year}</div>
                  <div className="font-heading font-bold text-white mb-2">{milestone.title}</div>
                  <div className="font-sans text-sm text-[#8B9BB4]">{milestone.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mb-24">
          <div className="text-center text-sm font-sans text-[#8B9BB4] uppercase tracking-widest mb-8">Certified To The Highest Standards</div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {["ISO 9001", "CE", "Rostest", "ISO 17025", "GMP"].map(cert => (
              <div key={cert} className="font-heading font-black text-2xl md:text-3xl text-white grayscale hover:grayscale-0 transition-all hover:text-[#00A8E8] cursor-default">
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* PARTNERS CAROUSEL */}
        <div className="relative w-[100vw] left-1/2 -translate-x-1/2 bg-[#0A2342] py-12 border-y border-[#1E3A5F] overflow-hidden group">
          <div className="flex w-max animate-scroll-left group-hover:[animation-play-state:paused] mb-6">
            {[...partners, ...partners].map((partner, i) => (
              <div key={i} className="px-12 py-4 font-display text-4xl text-white/40 hover:text-white transition-colors cursor-default whitespace-nowrap">
                {partner}
              </div>
            ))}
          </div>
          <div className="flex w-max animate-scroll-right group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].reverse().map((partner, i) => (
              <div key={i} className="px-12 py-4 font-display text-4xl text-white/40 hover:text-white transition-colors cursor-default whitespace-nowrap">
                {partner}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
