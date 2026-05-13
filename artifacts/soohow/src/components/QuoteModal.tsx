import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { sendTelegramMessage } from '@/lib/telegram';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(9, "Valid phone number required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  product: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional()
});

interface QuoteModalProps {
  product?: Product | null;
  onClose: () => void;
}

export function QuoteModal({ product, onClose }: QuoteModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
    try {
      await sendTelegramMessage(values);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[3000] bg-[#061A2E]/95 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          className="bg-[#0F1923] border border-[#1E3A5F] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#8B9BB4] hover:text-white transition-colors"
            data-testid="btn-close-quote"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">Request a Quote</h2>
            <p className="text-sm font-sans text-[#8B9BB4] mb-8">
              Fill out the form below and our specialists will contact you within 30 minutes during working hours.
            </p>

            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#00D4AA]/20 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-[#00D4AA]" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Request Received</h3>
                <p className="text-[#8B9BB4] font-sans">
                  Thank you for your interest. A specialist will be in touch with you shortly.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-8 px-8 py-3 rounded border border-[#1E3A5F] text-white hover:border-[#00A8E8] transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded flex items-start gap-3">
                      <AlertCircle className="text-red-500 shrink-0" size={20} />
                      <div className="text-sm text-red-200">
                        Failed to send request. Please try again or contact us directly via email.
                      </div>
                    </div>
                  )}

                  {product && (
                    <div className="p-3 bg-[#061A2E] border border-[#1E3A5F] rounded flex flex-col">
                      <span className="text-[10px] text-[#8B9BB4] uppercase mb-1">Selected Product</span>
                      <span className="font-heading text-sm text-white">{product.name}</span>
                      <span className="font-mono text-xs text-[#00A8E8]">{product.model}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#8B9BB4]">Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-[#061A2E] border-[#1E3A5F] text-white" {...field} />
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
                          <FormLabel className="text-[#8B9BB4]">Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="+998 90 123 45 67" className="bg-[#061A2E] border-[#1E3A5F] text-white" {...field} />
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
                          <FormLabel className="text-[#8B9BB4]">Company / Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Industrial" className="bg-[#061A2E] border-[#1E3A5F] text-white" {...field} />
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
                          <FormLabel className="text-[#8B9BB4]">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-[#061A2E] border-[#1E3A5F] text-white" {...field} />
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
                          <FormLabel className="text-[#8B9BB4]">Interested Product / Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Ultrasonic Flow Meters" className="bg-[#061A2E] border-[#1E3A5F] text-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#8B9BB4]">Special Requirements</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific technical requirements, certifications needed, or delivery timeline?" 
                            className="bg-[#061A2E] border-[#1E3A5F] text-white resize-none h-24" 
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
                    className="w-full py-4 rounded bg-gradient-primary text-white font-heading font-bold flex items-center justify-center hover:shadow-[0_0_20px_rgba(0,168,232,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    data-testid="btn-submit-quote"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : "Send Request →"}
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
