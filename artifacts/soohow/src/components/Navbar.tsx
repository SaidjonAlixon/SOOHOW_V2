import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onSearchClick: () => void;
  onQuoteClick: () => void;
}

export function Navbar({ onSearchClick, onQuoteClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-[#061A2E]/90 backdrop-blur-xl border-b border-[#00A8E8]/20'
            : 'bg-transparent border-b border-transparent'
        }`}
        data-testid="navbar"
      >
        <div 
          className="absolute top-0 left-0 h-[2px] bg-[#00A8E8] z-50 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('home')} data-testid="logo-block">
            <span className="font-display text-3xl leading-none text-[#00A8E8] tracking-wider">SOOHOW</span>
            <span className="font-sans text-[10px] font-light text-[#8B9BB4] tracking-[3px]">CENTRAL ASIA</span>
          </div>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center space-x-8">
            {['HOME', 'ABOUT', 'PRODUCTS', 'CONTACT'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative text-sm font-heading font-bold text-white/90 hover:text-white transition-colors group py-2"
                data-testid={`nav-link-${item.toLowerCase()}`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8E8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className="p-2 text-white/70 hover:text-[#00A8E8] transition-colors"
              aria-label="Search"
              data-testid="btn-search"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2 text-white/70 hover:text-[#00A8E8] transition-colors"
              aria-label="Toggle theme"
              data-testid="btn-theme"
            >
              <motion.div animate={{ rotate: theme === 'dark' ? 0 : 360 }} transition={{ duration: 0.5 }}>
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </button>

            <button
              onClick={onQuoteClick}
              className="hidden md:block px-6 py-2 rounded-full bg-gradient-primary text-white font-heading font-bold text-sm hover:shadow-[0_0_20px_rgba(0,168,232,0.4)] transition-shadow"
              data-testid="btn-nav-quote"
            >
              Request Quote
            </button>

            <button 
              className="md:hidden p-2 text-white/70"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="btn-mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1001] bg-[#061A2E] flex flex-col p-6"
            data-testid="mobile-menu"
          >
            <div className="flex justify-between items-center h-14 mb-8">
              <div className="flex flex-col">
                <span className="font-display text-2xl text-[#00A8E8]">SOOHOW</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                <X size={28} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-2xl font-display tracking-widest text-center mt-12">
              {['HOME', 'ABOUT', 'PRODUCTS', 'CONTACT'].map((item, i) => (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white hover:text-[#00A8E8] transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto mb-8"
            >
              <button
                onClick={() => { setMobileMenuOpen(false); onQuoteClick(); }}
                className="w-full py-4 rounded-full bg-gradient-primary text-white font-heading font-bold text-lg"
              >
                Request Quote
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
