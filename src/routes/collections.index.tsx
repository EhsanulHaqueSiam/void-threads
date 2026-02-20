import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { collections } from '~/data/collections'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'
import { TrustBadges } from '~/components/sections/trust-badges'

export const Route = createFileRoute('/collections/')({
  head() {
    return {
      meta: [
        { title: 'Collections | VOID THREADS' },
        { name: 'description', content: 'Browse all VOID THREADS collections. Premium hoodies, technical pants, and essential tees.' },
      ],
    }
  },
  component: CollectionsIndex,
})

function CollectionsIndex() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <ScrollReveal>
          <SectionHeading
            title="All Collections"
            subtitle="Every piece, every silhouette. Find your void."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, i) => (
            <ScrollReveal key={collection.slug} delay={i * 0.1}>
              <Link
                to="/collections/$slug"
                params={{ slug: collection.slug }}
                className="group relative block overflow-hidden aspect-[3/4]"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
                        {collection.productCount} Pieces
                      </p>
                      <h3 className="font-heading text-3xl font-bold text-smoke">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-smoke-muted mt-2">{collection.description}</p>
                    </div>
                    <div className="shrink-0 w-10 h-10 border border-smoke/20 flex items-center justify-center transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-void text-smoke">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <TrustBadges />
      </div>
    </div>
  )
}
