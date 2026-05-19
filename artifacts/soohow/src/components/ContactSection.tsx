import React, { useEffect, useMemo, useRef, useState } from 'react';
import { sendTelegramMessage } from '@/lib/telegram';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { mountAnimatedTitleChars } from '@/lib/animateTitleChars';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Linkedin, Youtube, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/PhoneInput';

export function ContactSection() {
  const { t, messages, locale } = useLocale();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameRequired')),
        phone: z
          .string()
          .min(12, t('validation.phoneRequired'))
          .regex(/^\+\d{10,15}$/, t('validation.phoneRequired')),
        email: z.string().email(t('validation.emailInvalid')).optional().or(z.literal('')),
        subject: z.string(),
        message: z.string().min(5, t('validation.messageRequired')),
      }),
    [t],
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '', phone: '', email: '', subject: messages.contact.subjects[0], message: '',
    },
  });

  useEffect(() => {
    form.setValue('subject', messages.contact.subjects[0]);
  }, [locale, messages.contact.subjects, form]);

  useEffect(() => {
    if (titleRef.current) {
      const charSpans = mountAnimatedTitleChars(
        titleRef.current,
        t('contact.title'),
        'inline-block opacity-0 translate-y-[-60px]',
      );

      gsap.to(charSpans, {
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        y: 0, opacity: 1, stagger: 0.03, duration: 0.6, ease: "power3.out"
      });
    }
  }, [locale, t]);

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setStatus('loading');
    setErrorDetail(null);
    try {
      await sendTelegramMessage(
        { ...values, subject: values.subject },
        "contact",
      );
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : t('contact.sendFailed'));
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 relative" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-heading font-bold site-heading mb-6 uppercase tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-xl site-muted font-sans max-w-2xl">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* LEFT: Info */}
          <div className="space-y-6">
            <div className="site-card p-8 border-l-4 border-[#00A8E8] rounded-r-xl border-y border-r border-y-[#1E3A5F] border-r-[#1E3A5F] hover:shadow-[0_0_30px_rgba(0,168,232,0.1)] transition-shadow">
              <div className="flex items-start mb-6">
                <MapPin className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold site-heading mb-1">{t('contact.headquarters')}</div>
                  <div className="font-sans site-muted">{t('contact.address')}<br/>{t('contact.city')}</div>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Phone className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold site-heading mb-1">{t('contact.directLines')}</div>
                  <div className="font-sans site-muted">+998 71 234-56-78<br/>+998 90 123-45-67</div>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Mail className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold site-heading mb-1">{t('contact.email')}</div>
                  <div className="font-sans site-muted">info@soohowasia.uz<br/>sales@soohowasia.uz</div>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold site-heading mb-1">{t('contact.workingHours')}</div>
                  <div className="font-sans site-muted">{t('contact.hoursWeek')}<br/>{t('contact.hoursSat')}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: <Send size={20} className="-ml-0.5 mt-0.5" />, label: "Telegram" },
                { icon: <Instagram size={20} />, label: "Instagram" },
                { icon: <Linkedin size={20} />, label: "LinkedIn" },
                { icon: <Youtube size={20} />, label: "YouTube" }
              ].map((social, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-full border site-border flex items-center justify-center text-[hsl(var(--site-fg)/0.7)] hover:site-heading hover:bg-[#00A8E8] hover:border-[#00A8E8] transition-all hover:scale-110" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="site-card p-8 border site-border rounded-2xl relative overflow-hidden">
            {status === 'success' && (
              <div className="absolute inset-0 site-card z-10 flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle size={48} className="text-[#00D4AA] mb-4" />
                <h3 className="font-heading text-2xl site-heading mb-2">{t('contact.messageSent')}</h3>
                <p className="site-muted font-sans">{t('contact.messageSentDesc')}</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder={t('contact.formName')} className="site-section site-border site-heading py-6" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          className="py-0 h-auto min-h-[50px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder={t('contact.formEmail')} className="site-section site-border site-heading py-6" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select className="flex h-[50px] w-full rounded-md border site-border site-section px-3 py-2 text-sm site-heading placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" {...field}>
                          {messages.contact.subjects.map((subject) => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormControl><Textarea placeholder={t('contact.formMessage')} className="site-section site-border site-heading resize-none h-32" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                {status === 'error' && (
                  <div className="text-red-400 text-sm flex items-start gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <p>{t('contact.sendFailed')}</p>
                      {errorDetail && <p className="mt-1 text-xs text-red-300/90">{errorDetail}</p>}
                    </div></div>
                )}

                <button type="submit" disabled={status === 'loading'} className="w-full py-4 rounded bg-[#00A8E8] site-heading font-heading font-bold hover:bg-[#00A8E8]/90 transition-colors flex justify-center mt-2">
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : t('contact.sendMessage')}
                </button>
              </form>
            </Form>
          </div>
        </div>

        {/* MAP & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="h-[400px] bg-[#1E3A5F] rounded-2xl overflow-hidden relative border site-border">
            <div className="absolute inset-0 flex items-center justify-center site-section">
              {/* Static representation of map for mockup */}
              <div className="text-center opacity-50">
                <MapPin size={48} className="mx-auto mb-4 text-[#00A8E8]" />
                <div className="font-mono text-xs">{t('contact.mapCoords')}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-heading font-bold site-heading mb-8">{t('contact.faqTitle')}</h3>
            <div className="space-y-4">
              {messages.contact.faqs.map((faq, i) => (
                <div key={i} className="border site-border rounded-lg overflow-hidden site-card">
                  <button 
                    className="w-full text-left p-5 flex justify-between items-center hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-heading font-semibold text-[hsl(var(--site-fg)/0.9)] pr-4">{faq.q}</span>
                    <ChevronDown className={`shrink-0 text-[#00A8E8] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: 'auto' }} 
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 site-muted font-sans leading-relaxed border-t site-border mt-1 bg-[hsl(var(--site-bg)/0.5)]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
