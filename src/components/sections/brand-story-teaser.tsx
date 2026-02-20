import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { ScrollReveal } from '~/components/shared/scroll-reveal'

export function BrandStoryTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.65, 0.8])

  return (
    <section ref={ref} className="relative py-36 md:py-52 overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80"
          alt=""
          className="w-full h-[130%] object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-void"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/40" />

      {/* Decorative side lines */}
      <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />
      <div className="absolute right-8 md:right-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 text-center">
        <ScrollReveal>
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-8 font-medium">
            Our Story
          </p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-smoke mb-8 max-w-4xl mx-auto leading-[0.95]">
            Born from the Void,{' '}
            <span className="text-gold">Built for the Bold</span>
          </h2>
          <p className="text-smoke-muted max-w-xl mx-auto mb-10 leading-relaxed text-base md:text-lg">
            We started with a simple belief: premium quality shouldn't come with premium pretension. Every piece is designed in LA, crafted from the finest fabrics, and made for those who refuse to blend in.
          </p>
          <Link to="/about">
            <Button variant="secondary" size="lg" className="group gap-2 border-smoke/20 hover:border-gold/40">
              Read Our Story
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
