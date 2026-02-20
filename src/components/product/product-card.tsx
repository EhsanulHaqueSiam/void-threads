import { useState, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye, Flame, Clock, Heart, Expand } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { useCart } from '~/context/cart-context'
import { useToast } from '~/components/ui/toast'
import { useWishlist } from '~/hooks/use-wishlist'
import { formatPrice } from '~/utils/format'
import type { Product } from '~/types/product'
import { cn } from '~/utils/cn'

interface ProductCardProps {
  product: Product
  showSoldToday?: boolean
  className?: string
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, showSoldToday, className, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const hasMultipleImages = product.images.length > 1
  const isLowStock = product.stock <= 5
  const isOnSale = !!product.compareAtPrice
  const discount = isOnSale
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0
  const wishlisted = isInWishlist(product.id)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', 'info')
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-void-light">
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              hasMultipleImages && isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            )}
          />
          {/* Hover image */}
          {hasMultipleImages && (
            <img
              src={product.images[1]}
              alt={product.name}
              loading="lazy"
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-all duration-700',
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              )}
            />
          )}

          {/* Spotlight gradient following cursor */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(201, 168, 76, 0.08), transparent 50%)`,
            }}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">New</Badge>}
            {isOnSale && <Badge variant="sale">-{discount}%</Badge>}
            {isLowStock && (
              <Badge variant="low-stock">
                <Clock size={10} className="mr-1" />
                Only {product.stock} left
              </Badge>
            )}
            {product.soldToday && product.soldToday > 20 && (
              <Badge variant="hot">
                <Flame size={10} className="mr-1" />
                Hot
              </Badge>
            )}
          </div>

          {/* Top-right action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered || wishlisted ? 1 : 0, scale: isHovered || wishlisted ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={handleWishlist}
              className={cn(
                'w-9 h-9 flex items-center justify-center transition-colors backdrop-blur-sm',
                wishlisted
                  ? 'bg-danger/90 text-white'
                  : 'bg-void/60 text-smoke-muted hover:text-smoke'
              )}
              aria-label="Add to wishlist"
            >
              <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
            </motion.button>
            {onQuickView && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                onClick={handleQuickView}
                className="w-9 h-9 bg-void/60 backdrop-blur-sm text-smoke-muted hover:text-smoke flex items-center justify-center transition-colors"
                aria-label="Quick view"
              >
                <Expand size={14} />
              </motion.button>
            )}
          </div>

          {/* Quick add button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.25 }}
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-3 right-3 h-11 bg-gold/95 backdrop-blur-sm text-void flex items-center justify-center gap-2 hover:bg-gold transition-colors text-xs font-semibold tracking-wider uppercase"
            aria-label="Quick add to cart"
          >
            <ShoppingBag size={14} />
            Quick Add
          </motion.button>
        </div>

        {/* Product info */}
        <div className="mt-4 space-y-1.5">
          <h3 className="text-sm font-medium text-smoke truncate pr-2 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2.5">
            <span className="text-sm font-mono font-bold text-smoke">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs font-mono text-smoke-faint line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {isOnSale && (
              <span className="text-[10px] font-semibold text-danger tracking-wide">
                SAVE {discount}%
              </span>
            )}
          </div>

          {/* Color swatches */}
          <div className="flex gap-1.5 pt-0.5">
            {product.colors.slice(0, 5).map((color) => (
              <div
                key={color.value}
                className="w-3.5 h-3.5 border border-smoke/15 hover:border-smoke/40 transition-colors"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-smoke-faint self-center">
                +{product.colors.length - 5}
              </span>
            )}
          </div>

          {showSoldToday && product.soldToday && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <Eye size={12} className="text-gold/70" />
              <span className="text-xs text-smoke-faint">
                <span className="text-smoke-muted font-medium">{product.soldToday}</span> sold today
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
