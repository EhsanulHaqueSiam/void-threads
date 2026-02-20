import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { AnimatedCounter } from '~/components/shared/animated-counter'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { TrustBadges } from '~/components/sections/trust-badges'

export const Route = createFileRoute('/about')({
  head() {
    return {
      meta: [
        { title: 'About Us | VOID THREADS' },
        { name: 'description', content: 'Born from the void, built for the bold. Learn the story behind VOID THREADS premium streetwear.' },
      ],
    }
  },
  component: AboutPage,
})

function AboutPage() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  const values = [
    {
      title: 'Uncompromising Quality',
      description: 'Every piece uses premium fabrics — heavyweight cotton, French terry, and technical blends. We reject anything that doesn\'t meet our standard.',
    },
    {
      title: 'Designed in LA',
      description: 'Our design studio in downtown Los Angeles is where every piece begins. Inspired by the streets, refined by obsession.',
    },
    {
      title: 'Sustainability First',
      description: 'Organic cotton, recycled packaging, carbon-neutral shipping. We\'re committed to leaving a lighter footprint.',
    },
    {
      title: 'Community Driven',
      description: 'Built by the community, for the community. Our designs are influenced by the people who wear them.',
    },
  ]

  return (
    <div className="pt-24 pb-0">
      {/* Hero */}
      <section ref={parallaxRef} className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
            alt="VOID THREADS studio"
            className="w-full h-[130%] object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/60 to-void" />
        {/* Side accent lines */}
        <div className="absolute left-8 md:left-16 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent hidden lg:block" />
        <div className="absolute right-8 md:right-16 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent hidden lg:block" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl">
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-6 font-medium">Our Story</p>
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-smoke leading-[0.95]">
                Born from the Void,
                <br />
                <span className="text-gold">Built for the Bold</span>
              </h1>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="space-y-6 text-smoke-muted leading-relaxed">
              <p className="text-xl text-smoke font-heading font-medium leading-snug">
                VOID THREADS was founded in 2023 with a singular vision: create premium streetwear without the pretension.
              </p>
              <div className="h-px w-16 bg-gold/30 my-8" />
              <p>
                We saw a market saturated with overpriced basics and logos slapped on cheap fabric. We knew there had to be a better way. So we went back to the fundamentals — the fabrics, the fits, the construction — and built something we'd actually want to wear every day.
              </p>
              <p>
                Every piece in our collection goes through 12+ iterations before it earns the VOID THREADS label. We source heavyweight organic cotton from Japan, use garment-dyed washes for unique color depth, and construct each piece with double-stitched seams and premium hardware.
              </p>
              <p>
                The void isn't absence — it's possibility. It's the blank canvas before the masterpiece. That's what our clothing represents: the space between conformity and expression, where real style lives.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-void-light relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,245,245,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { target: 10000, suffix: '+', label: 'Happy Customers' },
                { target: 45, suffix: '+', label: 'Countries' },
                { target: 18, suffix: '', label: 'Unique Pieces' },
                { target: 450, suffix: ' GSM', label: 'Max Fabric Weight' },
              ].map((stat) => (
                <div key={stat.label} className="relative">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} className="text-4xl md:text-5xl text-smoke" />
                  <p className="text-sm text-smoke-muted mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">What We Stand For</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-[-0.02em] text-smoke">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="group border border-smoke/5 p-8 md:p-10 hover:border-gold/20 transition-all duration-500 relative overflow-hidden">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
                  <span className="text-xs font-mono text-gold/70">0{i + 1}</span>
                  <h3 className="font-heading text-xl font-semibold text-smoke mt-3 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-smoke-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-void-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void-light via-void-light to-void-light" />
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6 font-medium">
              Join the Movement
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-[-0.02em] text-smoke mb-8">
              Ready to Wear the Void?
            </h2>
            <Link to="/collections">
              <Button variant="gold" size="lg" className="group gap-2 animate-pulse-glow">
                Shop Now
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <TrustBadges />
    </div>
  )
}
