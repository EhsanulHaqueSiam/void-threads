import { useState, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { collections } from '~/data/collections'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'

function CollectionCard({ collection, index }: { collection: (typeof collections)[number]; index: number }) {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <ScrollReveal delay={index * 0.15}>
      <div ref={cardRef} onMouseMove={handleMouseMove}>
        <Link
          to="/collections/$slug"
          params={{ slug: collection.slug }}
          className="group relative block overflow-hidden aspect-[3/4]"
        >
          {/* Image with zoom on hover */}
          <img
            src={collection.image}
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10 transition-all duration-500 group-hover:via-void/60" />

          {/* Spotlight follow cursor */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(500px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(201, 168, 76, 0.12), transparent 45%)`,
            }}
          />

          {/* Top corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-4 right-4 w-8 h-px bg-gold/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold/70" />
            <div className="absolute top-4 right-4 w-px h-8 bg-gold/40 transition-all duration-500 group-hover:h-12 group-hover:bg-gold/70" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between">
              <div>
                <motion.p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-2 font-medium">
                  {collection.productCount} Pieces
                </motion.p>
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-smoke tracking-tight">
                  {collection.name}
                </h3>
                <p className="text-sm text-smoke-muted mt-2 max-w-xs leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {collection.description}
                </p>
              </div>
              <div className="shrink-0 w-11 h-11 border border-smoke/20 flex items-center justify-center transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-void text-smoke">
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          {/* Bottom gold accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/50 transition-colors duration-500" />
        </Link>
      </div>
    </ScrollReveal>
  )
}

export function FeaturedCollections() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <ScrollReveal>
            <SectionHeading
              title="Collections"
              subtitle="Three pillars of the void. Each collection, a statement."
            />
          </ScrollReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {collections.map((collection, i) => (
            <CollectionCard key={collection.slug} collection={collection} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
