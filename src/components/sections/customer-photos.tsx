import { motion } from 'framer-motion'
import { Instagram, Heart } from 'lucide-react'
import { ScrollReveal, StaggerContainer, staggerChildVariants } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'

const customerPhotos = [
  { id: '1', src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', customer: '@marcus.j', product: 'Obsidian Oversized Hoodie', likes: 234 },
  { id: '2', src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80', customer: '@sarah.k', product: 'Void Essential Tee', likes: 189 },
  { id: '3', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80', customer: '@devon.r', product: 'Stealth Cargo Pants', likes: 312 },
  { id: '4', src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80', customer: '@kai.w', product: 'Phantom Wash Hoodie', likes: 178 },
  { id: '5', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', customer: '@aiden.m', product: 'Eclipse Heavyweight Tee', likes: 256 },
  { id: '6', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', customer: '@taylor.p', product: 'Phantom Tech Joggers', likes: 145 },
]

export function CustomerPhotos() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <ScrollReveal>
          <SectionHeading
            title="Styled by You"
            subtitle="Our community rocks VOID THREADS. Tag @voidthreads to be featured."
          />
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {customerPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={staggerChildVariants}
              className="group relative aspect-square overflow-hidden bg-void-light cursor-pointer"
            >
              <img
                src={photo.src}
                alt={`${photo.customer} wearing ${photo.product}`}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-void/0 group-hover:bg-void/50 transition-all duration-400 flex flex-col items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400 text-center">
                  <Instagram size={24} className="text-gold mx-auto mb-3" />
                  <p className="text-sm font-semibold text-smoke">{photo.customer}</p>
                  <p className="text-xs text-smoke-muted mt-1">{photo.product}</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <Heart size={12} className="text-danger fill-danger" />
                    <span className="text-[11px] text-smoke-muted font-mono">{photo.likes}</span>
                  </div>
                </div>
              </div>

              {/* Corner accent on hover */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
