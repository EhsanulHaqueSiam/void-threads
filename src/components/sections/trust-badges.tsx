import { Truck, Shield, RotateCcw, Award } from 'lucide-react'
import { ScrollReveal, StaggerContainer, staggerChildVariants } from '~/components/shared/scroll-reveal'
import { motion } from 'framer-motion'

const badges = [
  { icon: Truck, label: 'Free Shipping', description: 'On orders over $150', accent: 'Complimentary' },
  { icon: Shield, label: 'Secure Payment', description: '256-bit SSL encryption', accent: 'Protected' },
  { icon: RotateCcw, label: '30-Day Returns', description: 'No questions asked', accent: 'Guaranteed' },
  { icon: Award, label: 'Premium Quality', description: 'Heavyweight fabrics', accent: 'Certified' },
]

export function TrustBadges() {
  return (
    <section className="py-20 md:py-24 border-t border-smoke/5">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={staggerChildVariants}
              className="group relative flex flex-col items-center text-center p-6 border border-transparent hover:border-smoke/5 transition-all duration-300"
            >
              {/* Icon container with border animation */}
              <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                <div className="absolute inset-0 border border-smoke/10 transition-all duration-500 group-hover:border-gold/30" />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                <badge.icon size={24} className="text-smoke-muted group-hover:text-gold transition-colors duration-300" />
              </div>

              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/60 mb-1.5 font-medium">
                {badge.accent}
              </p>
              <h3 className="text-sm font-semibold text-smoke tracking-wide">
                {badge.label}
              </h3>
              <p className="text-xs text-smoke-faint mt-1.5">{badge.description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
