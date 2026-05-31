import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '@/lib/products';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { sendTelegramMessage } from '@/lib/telegram';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/PhoneInput';

interface QuoteModalProps {
  product?: Product | null;
  onClose: () => void;
}

export function QuoteModal({ product, onClose }: QuoteModalProps) {
  const { t } = useLocale();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const quoteSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameMin')),
        phone: z
          .string()
          .min(12, t('validation.phoneMin'))
          .regex(/^\+\d{10,15}$/, t('validation.phoneMin')),
        company: z.string().trim().min(2, t('validation.companyMin')),
        email: z.string().email(t('validation.emailInvalid')).optional().or(z.literal('')),
        product: z.string().optional(),
        quantity: z.string().optional(),
        message: z.string().optional(),
      }),
    [t],
  );

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      company: "",
      email: "",
      product: product ? `${product.name} (${product.model})` : "",
      quantity: "1",
      message: ""
    }
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const onSubmit = async (values: z.infer<typeof quoteSchema>) => {
    setStatus('loading');
    setErrorDetail(null);
    try {
      await sendTelegramMessage(values, "quote");
      setStatus('success');
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : t('quote.sendFailed'));
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[3000] bg-[hsl(var(--site-bg)/0.95)] backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          className="site-card border site-border w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 site-muted hover:site-heading transition-colors"
            data-testid="btn-close-quote"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-heading font-bold site-heading mb-2">{t('quote.title')}</h2>
            <p className="text-sm font-sans site-muted mb-8">{t('quote.subtitle')}</p>

            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#00D4AA]/20 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-[#00D4AA]" />
                </div>
                <h3 className="text-2xl font-heading font-bold site-heading mb-2">{t('quote.received')}</h3>
                <p className="site-muted font-sans">{t('quote.receivedDesc')}</p>
                <button 
                  onClick={onClose}
                  className="mt-8 px-8 py-3 rounded border site-border site-heading hover:border-[#00A8E8] transition-colors"
                >
                  {t('quote.close')}
                </button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded flex items-start gap-3">
                      <AlertCircle className="text-red-500 shrink-0" size={20} />
                      <div className="text-sm text-red-200">
                        <p>{t('quote.sendFailed')}</p>
                        {errorDetail && (
                          <p className="mt-2 text-red-300/90 text-xs">{errorDetail}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {product && (
                    <div className="p-3 site-section border site-border rounded flex flex-col">
                      <span className="text-[10px] site-muted uppercase mb-1">{t('quote.selectedProduct')}</span>
                      <span className="font-heading text-sm site-heading">{product.name}</span>
                      <span className="font-mono text-xs text-[#00A8E8]">{product.model}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="site-muted">{t('quote.fullName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('quote.placeholders.name')} className="site-form-control" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="site-muted">{t('quote.phone')}</FormLabel>
                          <FormControl>
                            <PhoneInput
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="site-muted">{t('quote.company')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('quote.placeholders.company')}
                              className="site-form-control"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="site-muted">{t('quote.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('quote.placeholders.email')} className="site-form-control" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {!product && (
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="site-muted">{t('quote.interestedProduct')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('quote.placeholders.product')} className="site-form-control" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="site-muted">{t('quote.quantity')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('quote.placeholders.quantity')} className="site-form-control" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="site-muted">{t('quote.requirements')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('quote.placeholders.message')}
                            className="site-section site-border site-heading resize-none h-24" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded bg-gradient-primary site-heading font-heading font-bold flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,168,232,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    data-testid="btn-submit-quote"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : t('quote.send')}
                  </button>
                </form>
              </Form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
