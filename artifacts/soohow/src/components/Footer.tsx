import React from 'react';
import { Send, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#061A2E] border-t border-[#1E3A5F] pt-20 pb-10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1 */}
          <div>
            <div className="flex flex-col mb-6 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <span className="font-display text-3xl leading-none text-[#00A8E8] tracking-wider">SOOHOW</span>
              <span className="font-sans text-[10px] font-light text-[#8B9BB4] tracking-[3px]">CENTRAL ASIA</span>
            </div>
            <p className="text-sm text-[#8B9BB4] font-sans leading-relaxed mb-6">
              The premier supplier of industrial measurement instruments and certified chemical reagents in Central Asia. Precision you can trust.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Send size={16} className="-ml-0.5 mt-0.5" />, link: "#" },
                { icon: <Instagram size={16} />, link: "#" },
                { icon: <Linkedin size={16} />, link: "#" }
              ].map((s, i) => (
                <a key={i} href={s.link} className="w-10 h-10 rounded-full border border-[#1E3A5F] flex items-center justify-center text-white/50 hover:text-white hover:border-[#00A8E8] hover:bg-[#00A8E8]/10 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Products', 'Contact'].map(link => (
                <li key={link}>
                  <button 
                    onClick={() => scrollTo(link.toLowerCase())}
                    className="text-sm text-[#8B9BB4] hover:text-[#00A8E8] transition-colors flex items-center group"
                  >
                    <ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-1" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase">Categories</h4>
            <ul className="space-y-3">
              {[
                "Industrial Measurement", 
                "Chemical Reagents", 
                "Laboratory Instruments", 
                "Process Control", 
                "Safety & Monitoring"
              ].map(cat => (
                <li key={cat}>
                  <a href="#" className="text-sm text-[#8B9BB4] hover:text-white transition-colors">{cat}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm text-[#8B9BB4] font-sans">
              <li>Amir Temur Street 108, 4th Floor</li>
              <li>Tashkent, Uzbekistan</li>
              <li className="pt-2">
                <a href="tel:+998712345678" className="hover:text-[#00A8E8] transition-colors">+998 71 234-56-78</a>
              </li>
              <li>
                <a href="mailto:info@soohowasia.uz" className="hover:text-[#00A8E8] transition-colors">info@soohowasia.uz</a>
              </li>
              <li className="pt-2 text-xs">Mon–Fri: 09:00–18:00</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#1E3A5F] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-[#8B9BB4]">
          <div>&copy; {new Date().getFullYear()} SOOHOW CENTRAL ASIA. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
