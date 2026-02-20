import { Users, Star, Globe, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from '~/components/shared/animated-counter'
import { ScrollReveal } from '~/components/shared/scroll-reveal'

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Happy Customers',
    sublabel: 'and counting',
  },
  {
    icon: Star,
    value: 4.8,
    suffix: '★',
    label: 'Average Rating',
    sublabel: 'from 2,400+ reviews',
    decimals: 1,
  },
  {
    icon: Globe,
    value: 45,
    suffix: '+',
    label: 'Countries Shipped',
    sublabel: 'worldwide delivery',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    sublabel: 'would buy again',
  },
]

export function SocialProof() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-void-light" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,245,245,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">
              Trusted Worldwide
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-smoke">
              Numbers Don't Lie
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center text-center px-4 md:px-8"
              >
                {/* Divider line between items (not on first) */}
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-smoke/10 to-transparent" />
                )}

                {/* Icon with gold ring */}
                <div className="relative w-14 h-14 flex items-center justify-center mb-5">
                  <div className="absolute inset-0 border border-gold/20" />
                  <stat.icon size={22} className="text-gold" />
                </div>

                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  className="text-4xl md:text-5xl text-smoke"
                />
                <p className="mt-2 text-sm font-medium text-smoke tracking-wide uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 text-[11px] text-smoke-faint">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
