import { motion } from 'framer-motion'
import { Sparkles, ShoppingBag } from 'lucide-react'
import { products } from '~/data/products'
import { ProductCard } from './product-card'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'
import { useCart } from '~/context/cart-context'
import { useToast } from '~/components/ui/toast'
import { formatPrice } from '~/utils/format'
import { Button } from '~/components/ui/button'
import type { Product } from '~/types/product'

interface CrossSellSectionProps {
  currentProduct: Product
}

export function CrossSellSection({ currentProduct }: CrossSellSectionProps) {
  const { addItem } = useCart()
  const { addToast } = useToast()

  // Build a "complete the look" outfit: pick one from each OTHER category
  const categories = ['hoodies', 'pants', 'tees'] as const
  const otherCategories = categories.filter((c) => c !== currentProduct.category)

  const outfitPieces = otherCategories
    .map((cat) => {
      // Prefer featured/bestselling items from each category
      return products
        .filter((p) => p.category === cat && p.id !== currentProduct.id)
        .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))[0]
    })
    .filter(Boolean) as Product[]

  // Fill remaining slots with other popular products
  const remainingProducts = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        !outfitPieces.find((op) => op.id === p.id) &&
        p.category !== currentProduct.category
    )
    .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))
    .slice(0, 4 - outfitPieces.length)

  const crossSellProducts = [...outfitPieces, ...remainingProducts].slice(0, 4)

  if (crossSellProducts.length === 0) return null

  const outfitTotal = crossSellProducts.reduce((sum, p) => sum + p.price, 0) + currentProduct.price
  const outfitSaving = Math.round(outfitTotal * 0.1) // 10% bundle discount hint

  const handleAddAllToCart = () => {
    crossSellProducts.forEach((product) => {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
        color: product.colors[0].name,
        size: 'M',
        quantity: 1,
      })
    })
    addToast(`${crossSellProducts.length} items added to cart`)
  }

  return (
    <section className="py-20 mt-16 border-t border-smoke/5">
      <ScrollReveal>
        <SectionHeading
          eyebrow="Curated for you"
          title="Complete the Look"
          subtitle="Build the perfect outfit. These pieces pair perfectly together."
        />
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {crossSellProducts.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.1}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>

      {/* Bundle CTA */}
      <ScrollReveal>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 border border-gold/15 bg-gold/[0.03]"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Sparkles size={20} className="text-gold shrink-0" />
            <div>
              <p className="text-sm font-medium text-smoke">
                Add all {crossSellProducts.length} pieces to cart
              </p>
              <p className="text-xs text-smoke-muted">
                Complete outfit for {formatPrice(outfitTotal)} — Save up to {formatPrice(outfitSaving)} with bundle
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddAllToCart}
            variant="gold"
            size="sm"
            className="gap-2 shrink-0"
          >
            <ShoppingBag size={14} />
            Add All to Cart
          </Button>
        </motion.div>
      </ScrollReveal>
    </section>
  )
}
