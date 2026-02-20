import { createFileRoute } from '@tanstack/react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '~/components/forms/contact-form'
import { Accordion } from '~/components/ui/accordion'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { siteConfig } from '~/data/site-config'

export const Route = createFileRoute('/contact')({
  head() {
    return {
      meta: [
        { title: 'Contact Us | VOID THREADS' },
        { name: 'description', content: 'Get in touch with VOID THREADS. We\'re here to help with orders, sizing, returns, and more.' },
      ],
    }
  },
  component: ContactPage,
})

const faqItems = [
  {
    id: 'shipping',
    title: 'How long does shipping take?',
    content: 'Standard shipping takes 3-7 business days within the US. International orders take 7-14 business days. Express shipping (1-3 business days) is available at checkout.',
  },
  {
    id: 'returns',
    title: 'What is your return policy?',
    content: 'We offer a hassle-free 30-day return policy. Items must be unworn, unwashed, and in original packaging. Contact us to initiate a return and we\'ll provide a prepaid shipping label.',
  },
  {
    id: 'sizing',
    title: 'How do your sizes run?',
    content: 'Our pieces are designed with a relaxed, oversized fit. If you prefer a more fitted look, we recommend sizing down. Check our size guide on each product page for detailed measurements.',
  },
  {
    id: 'quality',
    title: 'What fabrics do you use?',
    content: 'We use premium heavyweight cotton (240-450 GSM), organic French terry, ripstop nylon, and 4-way stretch technical fabrics. All materials are sourced from trusted mills with ethical practices.',
  },
  {
    id: 'tracking',
    title: 'How can I track my order?',
    content: 'Once your order ships, you\'ll receive an email with tracking information. You can also check your order status by contacting our support team.',
  },
  {
    id: 'wholesale',
    title: 'Do you offer wholesale or bulk orders?',
    content: 'Yes! We work with select retailers and stylists. Email hello@voidthreads.com with your inquiry and we\'ll get back to you within 48 hours.',
  },
]

function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Get In Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-smoke mb-4">
              Contact Us
            </h1>
            <p className="text-smoke-muted max-w-lg mx-auto">
              Have a question, feedback, or just want to say hi? We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <h2 className="font-heading text-xl font-semibold text-smoke mb-6">Send us a message</h2>
              <ContactForm />
            </ScrollReveal>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <h2 className="font-heading text-xl font-semibold text-smoke mb-6">Contact Info</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-smoke/10 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-smoke">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm text-smoke-muted hover:text-gold transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-smoke/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-smoke">Phone</p>
                    <p className="text-sm text-smoke-muted">{siteConfig.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-smoke/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-smoke">Location</p>
                    <p className="text-sm text-smoke-muted">{siteConfig.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-void-light border border-smoke/5">
                <p className="text-sm text-smoke font-medium mb-1">Response Time</p>
                <p className="text-xs text-smoke-muted">
                  We typically respond within 24 hours during business days (Mon-Fri, 9am-6pm PST).
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-20">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-smoke">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-smoke-muted mt-2">
                Find quick answers to common questions
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </section>
      </div>
    </div>
  )
}
