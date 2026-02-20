import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import { useCart } from '~/context/cart-context'
import { useToast } from '~/components/ui/toast'
import { formatPrice } from '~/utils/format'
import type { Product } from '~/types/product'

interface StickyAddToCartProps {
  product: Product
  /** The y position after which this bar shows (usually the ATC button position) */
  triggerOffset?: number
}

export function StickyAddToCart({ product, triggerOffset = 800 }: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { addItem } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > triggerOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [triggerOffset])

  const handleAdd = () => {
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
    addToast(`${product.name} added to cart`)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[70] bg-void/95 backdrop-blur-xl border-t border-smoke/10 shadow-[0_-4px_30px_rgba(0,0,0,0.3)] lg:hidden"
        >
          <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-3">
            {/* Product mini info */}
            <div className="w-12 h-12 shrink-0 bg-void-lighter overflow-hidden">
              <img
                src={product.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-smoke font-medium truncate">{product.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-gold">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center gap-0.5">
                  <Star size={10} className="text-gold fill-gold" />
                  <span className="text-[10px] text-smoke-faint">{product.rating}</span>
                </div>
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAdd}
              className="shrink-0 flex items-center gap-2 bg-gold text-void px-5 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-gold-light transition-colors"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
