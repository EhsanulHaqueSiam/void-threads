import { createFileRoute, Link } from '@tanstack/react-router'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { CartItem } from '~/components/cart/cart-item'
import { FreeShippingBar } from '~/components/cart/free-shipping-bar'
import { useCart } from '~/context/cart-context'
import { formatPrice } from '~/utils/format'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'
import { TrustBadges } from '~/components/sections/trust-badges'
import { products } from '~/data/products'
import { ProductCard } from '~/components/product/product-card'
import { useState } from 'react'

export const Route = createFileRoute('/cart')({
  head() {
    return {
      meta: [
        { title: 'Your Cart | VOID THREADS' },
        { name: 'description', content: 'Review your cart and checkout.' },
      ],
    }
  },
  component: CartPage,
})

function CartPage() {
  const { items, subtotal, isFreeShipping, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const shipping = isFreeShipping ? 0 : 12
  const total = subtotal + shipping

  const cartProductIds = items.map((i) => i.productId)
  const cartCategories = [...new Set(
    items.map((i) => products.find((p) => p.id === i.productId)?.category).filter(Boolean)
  )]
  const allCategories = ['hoodies', 'pants', 'tees'] as const
  const missingCategories = allCategories.filter((c) => !cartCategories.includes(c))

  // "Complete Your Set" — products from categories NOT in cart
  const completeSetProducts = missingCategories
    .flatMap((cat) =>
      products
        .filter((p) => p.category === cat && !cartProductIds.includes(p.id))
        .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))
        .slice(0, 2)
    )
    .slice(0, 4)

  // "You May Also Like" — featured bestsellers not in cart
  const upsellProducts = products
    .filter((p) => !cartProductIds.includes(p.id) && !completeSetProducts.find((cs) => cs.id === p.id) && p.featured)
    .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))
    .slice(0, 4)

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <ShoppingBag size={64} className="text-smoke-faint mb-6" />
            <h1 className="font-heading text-3xl font-bold text-smoke mb-3">Your Cart is Empty</h1>
            <p className="text-smoke-muted mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Browse our collections and find something you love.
            </p>
            <Link to="/collections">
              <Button variant="gold" size="lg">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-smoke">
              Your Cart ({items.length})
            </h1>
            <Link
              to="/collections"
              className="flex items-center gap-2 text-sm text-smoke-muted hover:text-smoke transition-colors"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>
        </ScrollReveal>

        <FreeShippingBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-smoke/5">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.color}-${item.size}`}
                  item={item}
                />
              ))}
            </div>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 mt-4 text-xs text-smoke-faint hover:text-danger transition-colors"
            >
              <Trash2 size={12} />
              Clear Cart
            </button>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-void-light border border-smoke/5 p-6 sticky top-24">
              <h2 className="font-heading text-lg font-semibold text-smoke mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-smoke-muted">Subtotal</span>
                  <span className="text-smoke font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke-muted">Shipping</span>
                  <span className="text-smoke font-mono">
                    {isFreeShipping ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>

                {/* Promo code */}
                <div className="pt-3 border-t border-smoke/5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setPromoCode('')
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-1 bg-void border border-smoke/10 px-3 py-2 text-sm text-smoke placeholder:text-smoke-faint focus:outline-none focus:border-gold"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Apply
                    </Button>
                  </form>
                </div>

                <div className="flex justify-between pt-3 border-t border-smoke/5">
                  <span className="font-medium text-smoke">Total</span>
                  <span className="text-lg font-mono font-bold text-smoke">{formatPrice(total)}</span>
                </div>
              </div>

              <Button variant="gold" fullWidth size="lg" className="mt-6">
                Proceed to Checkout
              </Button>

              <p className="text-[11px] text-smoke-faint text-center mt-3">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>

        {/* Complete Your Set — products from missing categories */}
        {completeSetProducts.length > 0 && (
          <section className="mt-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Build the full outfit"
                title="Complete Your Set"
                subtitle="You're missing some key pieces. Add these to finish the look."
              />
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {completeSetProducts.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* You May Also Like */}
        {upsellProducts.length > 0 && (
          <section className="mt-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Bestsellers"
                title="You May Also Like"
                subtitle="Top picks from our collection. Don't miss out."
              />
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {upsellProducts.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.1}>
                  <ProductCard key={product.id} product={product} showSoldToday />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-20">
        <TrustBadges />
      </div>
    </div>
  )
}
