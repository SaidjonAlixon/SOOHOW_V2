import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, isNavActive, routes } from '@/lib/routes';
import { Logo } from '@/components/Logo';
import { initTheme, toggleTheme as switchTheme, type Theme } from '@/lib/theme';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLocale } from '@/lib/i18n/LocaleContext';

interface NavbarProps {
  onSearchClick: () => void;
  onQuoteClick: () => void;
}

export function Navbar({ onSearchClick, onQuoteClick }: NavbarProps) {
  const { t } = useLocale();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => initTheme());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);

  const toggleTheme = () => {
    setTheme(switchTheme(theme));
  };

  const NavLink = ({ path, label, className = '' }: { path: string; label: string; className?: string }) => {
    const active = isNavActive(location, path);
    return (
      <Link
        href={path}
        className={`relative text-sm font-heading font-bold transition-colors group py-2 ${
          active ? 'site-nav-link-active' : 'site-nav-link'
        } ${className}`}
        data-testid={`nav-link-${label.toLowerCase()}`}
      >
        {label}
        <span
          className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8E8] origin-left transition-transform duration-300 ease-out ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'site-nav-scrolled backdrop-blur-xl border-b border-[#00A8E8]/20'
            : 'bg-transparent border-b border-transparent'
        }`}
        data-testid="navbar"
      >
        <div
          className="absolute top-0 left-0 h-[2px] bg-[#00A8E8] z-50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href={routes.home} className="cursor-pointer" data-testid="logo-block">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.key} path={item.path} label={t(item.key)} />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={onSearchClick}
              className="p-2 site-icon-btn transition-colors shrink-0"
              aria-label={t("common.search")}
              data-testid="btn-search"
            >
              <Search size={20} />
            </button>

            <LanguageSwitcher compact className="flex md:hidden" />
            <LanguageSwitcher className="hidden md:flex" />

            <button
              onClick={toggleTheme}
              className="p-2 site-icon-btn transition-colors"
              aria-label={t("common.toggleTheme")}
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
              {t("common.requestQuote")}
            </button>

            <button
              className="md:hidden p-2 site-icon-btn"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="btn-mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1001] site-shell flex flex-col p-6"
            data-testid="mobile-menu"
          >
            <div className="flex justify-between items-center h-14 mb-8">
              <Logo size="sm" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 site-heading">
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-2xl font-display tracking-widest text-center mt-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={item.path}
                    className={`block transition-colors ${
                      isNavActive(location, item.path) ? 'text-[#00A8E8]' : 'site-heading hover:text-[#00A8E8]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto mb-8"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-4 rounded-full bg-gradient-primary text-white font-heading font-bold text-lg"
              >
                {t("common.requestQuote")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
