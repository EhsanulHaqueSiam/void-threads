import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Gift, Zap } from 'lucide-react'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { Button } from '~/components/ui/button'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-24 md:py-32 bg-void-light relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(-45deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
                alt="VOID THREADS collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-void-light/50" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />
            </div>
          </ScrollReveal>

          {/* Form side */}
          <ScrollReveal direction="right">
            <div className="max-w-md mx-auto lg:mx-0">
              {/* Perks */}
              <div className="flex gap-6 mb-8">
                {[
                  { icon: Gift, label: '10% Off' },
                  { icon: Zap, label: 'Early Access' },
                  { icon: Mail, label: 'Exclusive Drops' },
                ].map((perk) => (
                  <div key={perk.label} className="flex items-center gap-2">
                    <perk.icon size={14} className="text-gold" />
                    <span className="text-[11px] tracking-wide uppercase text-smoke-muted font-medium">
                      {perk.label}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-smoke mb-4 leading-tight">
                Get <span className="text-gold">10% Off</span> Your First Order
              </h2>

              <p className="text-sm text-smoke-muted mb-8 leading-relaxed">
                Join the void. Be the first to know about new drops, exclusive offers, and limited releases delivered straight to your inbox.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success/10 border border-success/20 p-5"
                >
                  <p className="text-sm text-success font-medium">
                    Welcome to the void. Check your email for your 10% off code.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-void border border-smoke/10 border-r-0 px-4 py-3.5 text-sm text-smoke placeholder:text-smoke-faint focus:outline-none focus:border-gold transition-colors"
                  />
                  <Button type="submit" variant="gold" className="shrink-0 px-6">
                    <ArrowRight size={18} />
                  </Button>
                </form>
              )}

              <p className="text-[11px] text-smoke-faint mt-3">
                No spam, ever. Unsubscribe anytime. By subscribing you agree to our privacy policy.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
