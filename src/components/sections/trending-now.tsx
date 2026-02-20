import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { products } from '~/data/products'
import { ProductCard } from '~/components/product/product-card'
import { ScrollReveal } from '~/components/shared/scroll-reveal'

export function TrendingNow() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const trendingProducts = products
    .filter((p) => p.soldToday && p.soldToday > 10)
    .slice(0, 8)

  return (
    <section className="py-24 md:py-32 bg-void-light relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,245,245,0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-2 h-2 bg-danger animate-pulse" />
                <Flame size={16} className="text-danger" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-danger font-semibold">
                  Trending
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-smoke">
                Trending Now
              </h2>
              <p className="mt-3 text-sm text-smoke-muted">
                The most popular pieces this week. Moving fast.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-11 h-11 border border-smoke/15 flex items-center justify-center text-smoke-muted hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-11 h-11 border border-smoke/15 flex items-center justify-center text-smoke-muted hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[280px] md:w-[300px]"
              >
                <ProductCard product={product} showSoldToday />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
