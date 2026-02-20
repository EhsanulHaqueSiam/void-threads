import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Eye, Truck, Shield, RotateCcw, Ruler, Check, Flame } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { useCart } from '~/context/cart-context'
import { useUI } from '~/context/ui-context'
import { useToast } from '~/components/ui/toast'
import { formatPrice } from '~/utils/format'
import { cn } from '~/utils/cn'
import type { Product, ProductSize } from '~/types/product'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [viewerCount] = useState(() => Math.floor(Math.random() * 20) + 8)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const { openSizeGuide } = useUI()
  const { addToast } = useToast()

  const isLowStock = product.stock <= 5
  const isOnSale = !!product.compareAtPrice
  const discount = isOnSale
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size', 'error')
      return
    }
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1,
    })
    setAddedToCart(true)
    addToast(`${product.name} added to cart`)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="space-y-7">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isNew && <Badge variant="new">New Arrival</Badge>}
        {isOnSale && <Badge variant="sale">-{discount}% Off</Badge>}
        {isLowStock && (
          <Badge variant="low-stock">
            <Flame size={10} className="mr-1" />
            Only {product.stock} left
          </Badge>
        )}
      </div>

      {/* Name */}
      <h1 className="font-heading text-2xl md:text-4xl font-bold tracking-[-0.02em] text-smoke leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={15}
              className={i < Math.round(product.rating) ? 'text-gold fill-gold' : 'text-smoke-faint'}
            />
          ))}
        </div>
        <span className="text-sm text-smoke-muted">
          {product.rating} ({product.reviewCount} reviews)
        </span>
        <span className="text-smoke-faint">|</span>
        <span className="text-sm text-smoke-muted">
          {product.soldToday || 0} sold today
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-3xl font-bold text-smoke">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="font-mono text-lg text-smoke-faint line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="text-sm font-semibold text-danger bg-danger/10 px-2 py-0.5">
              SAVE {formatPrice(product.compareAtPrice - product.price)}
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-smoke-muted leading-relaxed border-l-2 border-gold/20 pl-4">
        {product.description}
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-smoke/10 via-smoke/5 to-transparent" />

      {/* Color selector */}
      <div>
        <p className="text-sm font-medium text-smoke mb-3">
          Color: <span className="text-gold">{selectedColor.name}</span>
        </p>
        <div className="flex gap-2.5">
          {product.colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color)}
              className={cn(
                'relative w-11 h-11 border-2 transition-all duration-200',
                selectedColor.value === color.value
                  ? 'border-gold scale-110 shadow-[0_0_12px_rgba(201,168,76,0.25)]'
                  : 'border-smoke/10 hover:border-smoke/30'
              )}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
            >
              {selectedColor.value === color.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check size={14} className="text-white drop-shadow-lg" />
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-smoke">
            Size: <span className="text-gold">{selectedSize || 'Select a size'}</span>
          </p>
          <button
            onClick={openSizeGuide}
            className="flex items-center gap-1.5 text-xs text-smoke-muted hover:text-gold transition-colors group"
          >
            <Ruler size={12} className="group-hover:text-gold transition-colors" />
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'min-w-[52px] h-12 px-4 text-sm font-medium border transition-all duration-200',
                selectedSize === size
                  ? 'bg-gold text-void border-gold font-semibold'
                  : 'bg-transparent text-smoke-muted border-smoke/10 hover:border-gold/40 hover:text-smoke'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Urgency indicators */}
      <div className="space-y-3">
        {/* Viewer count */}
        <div className="flex items-center gap-2 text-sm bg-void-light px-4 py-2.5 border border-smoke/5">
          <div className="w-2 h-2 bg-success animate-pulse" />
          <Eye size={14} className="text-gold" />
          <span className="text-smoke-muted">
            <span className="text-smoke font-semibold">{viewerCount} people</span> are viewing this right now
          </span>
        </div>

        {/* Stock indicator */}
        {isLowStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 bg-danger/5 border border-danger/20 px-4 py-2.5"
          >
            <div className="w-2 h-2 bg-danger animate-pulse" />
            <span className="text-sm text-danger font-medium">
              Only {product.stock} left in stock — order soon!
            </span>
          </motion.div>
        )}
      </div>

      {/* Add to cart */}
      <AnimatePresence mode="wait">
        <motion.div key={addedToCart ? 'added' : 'add'}>
          <Button
            onClick={handleAddToCart}
            variant={addedToCart ? 'primary' : 'gold'}
            size="lg"
            fullWidth
            className={cn(
              'text-base h-14 relative overflow-hidden',
              !addedToCart && 'animate-pulse-glow'
            )}
            disabled={addedToCart}
          >
            {addedToCart ? (
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Check size={18} />
                Added to Cart
              </motion.span>
            ) : (
              <span>Add to Cart — {formatPrice(product.price)}</span>
            )}
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Trust mini badges */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-smoke/5">
        {[
          { icon: Truck, label: 'Free Shipping', sublabel: 'Over $150' },
          { icon: Shield, label: 'Secure Payment', sublabel: 'SSL Encrypted' },
          { icon: RotateCcw, label: '30-Day Returns', sublabel: 'No Hassle' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center gap-1.5 group">
            <item.icon size={16} className="text-smoke-faint group-hover:text-gold transition-colors" />
            <span className="text-[11px] font-medium text-smoke-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
