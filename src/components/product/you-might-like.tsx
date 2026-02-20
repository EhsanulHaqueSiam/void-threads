import { products } from '~/data/products'
import { ProductCard } from './product-card'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'
import type { Product } from '~/types/product'

interface YouMightLikeProps {
  currentProduct: Product
}

export function YouMightLike({ currentProduct }: YouMightLikeProps) {
  // Get products from the SAME category (similar items)
  const similarProducts = products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))
    .slice(0, 4)

  if (similarProducts.length === 0) return null

  return (
    <section className="py-20 mt-8 border-t border-smoke/5">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Similar styles"
          title="You Might Also Like"
          subtitle="More from the same collection. Picked based on what you're viewing."
        />
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {similarProducts.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.1}>
            <ProductCard product={product} showSoldToday />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
