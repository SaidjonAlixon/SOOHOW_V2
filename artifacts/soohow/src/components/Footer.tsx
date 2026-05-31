import { Link } from 'wouter';
import { Send, Instagram, Linkedin, ArrowUpRight, Clock } from 'lucide-react';
import { routes, navItems } from '@/lib/routes';
import { Logo } from '@/components/Logo';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function Footer() {
  const { t, messages } = useLocale();

  return (
    <footer className="site-section border-t site-border pt-20 pb-10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href={routes.home} className="inline-block mb-6 cursor-pointer">
              <Logo size="md" />
            </Link>
            <p className="text-sm site-muted font-sans leading-relaxed mb-6">{t('footer.tagline')}</p>
            <div className="flex gap-3">
              {[
                { icon: <Send size={16} className="-ml-0.5 mt-0.5" />, link: '#' },
                { icon: <Instagram size={16} />, link: '#' },
                { icon: <Linkedin size={16} />, link: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  className="w-10 h-10 rounded-full border site-border flex items-center justify-center text-[hsl(var(--site-fg)/0.5)] hover:site-heading hover:border-[#00A8E8] hover:bg-[#00A8E8]/10 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold site-heading mb-6 uppercase">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.path}
                    className="text-sm site-muted hover:text-[#00A8E8] transition-colors flex items-center group"
                  >
                    <ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-1" />
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold site-heading mb-6 uppercase">{t('footer.categories')}</h4>
            <ul className="space-y-3">
              {messages.footerCategories.map((cat) => (
                <li key={cat}>
                  <Link href={routes.products} className="text-sm site-muted hover:site-heading transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold site-heading mb-6 uppercase">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 text-sm site-muted font-sans">
              <li>{t('contact.address')}</li>
              <li className="pt-2">
                <a href="tel:+998777444048" className="hover:text-[#00A8E8] transition-colors">
                  {t('contact.phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('contact.emailAddress')}`}
                  className="hover:text-[#00A8E8] transition-colors"
                >
                  {t('contact.emailAddress')}
                </a>
              </li>
              <li className="pt-4">
                <div className="flex items-start gap-3">
                  <Clock className="text-[#00A8E8] mt-0.5 shrink-0" size={18} />
                  <div>
                    <div className="font-heading font-bold site-heading text-sm mb-1">
                      {t('contact.workingHours')}
                    </div>
                    <div className="text-sm site-muted leading-relaxed">
                      {t('contact.hoursWeek')}
                      <br />
                      {t('contact.hoursSat')}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t site-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans site-muted">
          <div>&copy; {new Date().getFullYear()} OOO FALCON TRADE LINES. {t('footer.rights')}</div>
          <div className="flex gap-4">
            <Link href={routes.privacy} className="hover:site-heading transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href={routes.terms} className="hover:site-heading transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
