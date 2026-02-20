import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Star, Eye, ShoppingBag, ArrowRight, Check } from 'lucide-react'
import { Modal } from '~/components/ui/modal'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { useCart } from '~/context/cart-context'
import { useToast } from '~/components/ui/toast'
import { formatPrice } from '~/utils/format'
import { cn } from '~/utils/cn'
import type { Product, ProductSize } from '~/types/product'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const { addToast } = useToast()

  if (!product) return null

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
      color: product.colors[selectedColor].name,
      size: selectedSize,
      quantity: 1,
    })
    setAddedToCart(true)
    addToast(`${product.name} added to cart`)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image side */}
        <div className="relative aspect-[3/4] md:aspect-auto bg-void-lighter overflow-hidden">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">New</Badge>}
            {isOnSale && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          {/* Thumbnail dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'w-2 h-2 transition-all',
                    selectedImage === i ? 'bg-gold w-4' : 'bg-smoke/30'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info side */}
        <div className="p-6 md:p-8 flex flex-col">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-smoke tracking-tight">
            {product.name}
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.round(product.rating) ? 'text-gold fill-gold' : 'text-smoke-faint'}
                />
              ))}
            </div>
            <span className="text-xs text-smoke-muted">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-mono text-xl font-bold text-smoke">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-sm text-smoke-faint line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="text-xs text-smoke-muted mt-3 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Color selector */}
          <div className="mt-5">
            <p className="text-xs font-medium text-smoke-muted mb-2">
              Color: {product.colors[selectedColor].name}
            </p>
            <div className="flex gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(i)}
                  className={cn(
                    'w-8 h-8 border-2 transition-all',
                    selectedColor === i ? 'border-gold' : 'border-smoke/10 hover:border-smoke/30'
                  )}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-4">
            <p className="text-xs font-medium text-smoke-muted mb-2">
              Size: {selectedSize || 'Select'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'min-w-[40px] h-9 px-3 text-xs font-medium border transition-all',
                    selectedSize === size
                      ? 'bg-gold text-void border-gold'
                      : 'bg-transparent text-smoke-muted border-smoke/10 hover:border-gold/40'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Viewer count */}
          <div className="flex items-center gap-1.5 mt-4">
            <Eye size={12} className="text-gold" />
            <span className="text-[11px] text-smoke-faint">
              {Math.floor(Math.random() * 15) + 5} people viewing
            </span>
          </div>

          {/* Add to cart */}
          <div className="mt-auto pt-5">
            <Button
              onClick={handleAddToCart}
              variant={addedToCart ? 'primary' : 'gold'}
              fullWidth
              className="gap-2"
              disabled={addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check size={16} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to Cart — {formatPrice(product.price)}
                </>
              )}
            </Button>

            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 mt-3 text-xs text-smoke-muted hover:text-gold transition-colors"
            >
              View Full Details
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  )
}
