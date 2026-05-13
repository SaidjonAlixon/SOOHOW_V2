import React, { useEffect, useRef, useState } from 'react';
import { sendTelegramMessage } from '@/lib/telegram';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Linkedin, Youtube, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(9, "Phone required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  subject: z.string(),
  message: z.string().min(5, "Message required")
});

const faqs = [
  { q: "Do you provide product certifications and datasheets?", a: "Yes. All instruments come with manufacturer certificates, calibration records, and full technical documentation in Uzbek, Russian, or English." },
  { q: "Can you supply reagents in bulk quantities?", a: "Absolutely. We work with industrial-scale orders. Contact us for volume pricing and customized packaging." },
  { q: "Do you deliver outside Tashkent?", a: "We deliver across all regions of Uzbekistan and export to Kazakhstan, Kyrgyzstan, and Tajikistan." },
  { q: "What is your calibration and service policy?", a: "We offer on-site calibration, installation supervision, and warranty service for all instruments. Training for operators is included." },
  { q: "How quickly can I get a price quote?", a: "Send a request through the website or Telegram — we respond within 30 minutes during working hours." }
];

export function ContactSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "", phone: "", email: "", subject: "General Inquiry", message: ""
    }
  });

  useEffect(() => {
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
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        y: 0, opacity: 1, stagger: 0.03, duration: 0.6, ease: "power3.out"
      });
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setStatus('loading');
    try {
      await sendTelegramMessage({
        ...values,
        product: values.subject // repurpose product field for subject in template
      });
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#0A2342] relative border-t border-[#1E3A5F]" data-testid="contact-section">
      <div className="absolute top-10 right-10 text-[180px] md:text-[240px] font-display text-white/[0.03] leading-none select-none z-0 pointer-events-none">
        03
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-[#8B9BB4] font-sans max-w-2xl">
            Ready to supply your facility. Reach us through any channel or request a callback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* LEFT: Info */}
          <div className="space-y-6">
            <div className="bg-[#0F1923] p-8 border-l-4 border-[#00A8E8] rounded-r-xl border-y border-r border-y-[#1E3A5F] border-r-[#1E3A5F] hover:shadow-[0_0_30px_rgba(0,168,232,0.1)] transition-shadow">
              <div className="flex items-start mb-6">
                <MapPin className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold text-white mb-1">Headquarters</div>
                  <div className="font-sans text-[#8B9BB4]">Amir Temur Street 108, 4th Floor, Office 401<br/>Tashkent, Uzbekistan</div>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Phone className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold text-white mb-1">Direct Lines</div>
                  <div className="font-sans text-[#8B9BB4]">+998 71 234-56-78<br/>+998 90 123-45-67</div>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Mail className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold text-white mb-1">Email</div>
                  <div className="font-sans text-[#8B9BB4]">info@soohowasia.uz<br/>sales@soohowasia.uz</div>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-[#00A8E8] mt-1 mr-4 shrink-0" size={24} />
                <div>
                  <div className="font-heading font-bold text-white mb-1">Working Hours</div>
                  <div className="font-sans text-[#8B9BB4]">Mon–Fri: 09:00–18:00<br/>Sat: 09:00–14:00, Sun: Closed</div>
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
                <a key={i} href="#" className="w-14 h-14 rounded-full border border-[#1E3A5F] flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00A8E8] hover:border-[#00A8E8] transition-all hover:scale-110" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="bg-[#0F1923] p-8 border border-[#1E3A5F] rounded-2xl relative overflow-hidden">
            {status === 'success' && (
              <div className="absolute inset-0 bg-[#0F1923] z-10 flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle size={48} className="text-[#00D4AA] mb-4" />
                <h3 className="font-heading text-2xl text-white mb-2">Message Sent</h3>
                <p className="text-[#8B9BB4] font-sans">We've received your inquiry and will respond shortly.</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="Name *" className="bg-[#061A2E] border-[#1E3A5F] text-white py-6" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="Phone *" className="bg-[#061A2E] border-[#1E3A5F] text-white py-6" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="Email" className="bg-[#061A2E] border-[#1E3A5F] text-white py-6" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select className="flex h-[50px] w-full rounded-md border border-[#1E3A5F] bg-[#061A2E] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" {...field}>
                          <option>General Inquiry</option>
                          <option>Price Quote</option>
                          <option>Technical Support</option>
                          <option>Partnership</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormControl><Textarea placeholder="Your message *" className="bg-[#061A2E] border-[#1E3A5F] text-white resize-none h-32" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                {status === 'error' && (
                  <div className="text-red-400 text-sm flex items-center"><AlertCircle size={16} className="mr-2"/> Failed to send.</div>
                )}

                <button type="submit" disabled={status === 'loading'} className="w-full py-4 rounded bg-[#00A8E8] text-white font-heading font-bold hover:bg-[#00A8E8]/90 transition-colors flex justify-center mt-2">
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : "Send Message"}
                </button>
              </form>
            </Form>
          </div>
        </div>

        {/* MAP & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="h-[400px] bg-[#1E3A5F] rounded-2xl overflow-hidden relative border border-[#1E3A5F]">
            <div className="absolute inset-0 flex items-center justify-center bg-[#061A2E]">
              {/* Static representation of map for mockup */}
              <div className="text-center opacity-50">
                <MapPin size={48} className="mx-auto mb-4 text-[#00A8E8]" />
                <div className="font-mono text-xs">TASHKENT 41°18'25.4"N 69°16'44.2"E</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-8">FREQUENTLY ASKED QUESTIONS</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#1E3A5F] rounded-lg overflow-hidden bg-[#0F1923]">
                  <button 
                    className="w-full text-left p-5 flex justify-between items-center hover:bg-white/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-heading font-semibold text-white/90 pr-4">{faq.q}</span>
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
                        <div className="p-5 pt-0 text-[#8B9BB4] font-sans leading-relaxed border-t border-[#1E3A5F] mt-1 bg-[#061A2E]/50">
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
