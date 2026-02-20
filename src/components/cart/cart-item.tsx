import { Link } from '@tanstack/react-router'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '~/context/cart-context'
import { formatPrice } from '~/utils/format'
import { LazyImage } from '~/components/shared/lazy-image'
import type { CartItem as CartItemType } from '~/types/cart'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-smoke/5">
      <Link
        to="/products/$slug"
        params={{ slug: item.slug }}
        className="shrink-0"
      >
        <LazyImage
          src={item.image}
          alt={item.name}
          className="w-20 h-24"
          aspectRatio="5/6"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <Link
            to="/products/$slug"
            params={{ slug: item.slug }}
            className="text-sm font-medium text-smoke hover:text-gold transition-colors truncate"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.productId, item.color, item.size)}
            className="text-smoke-faint hover:text-danger transition-colors ml-2"
            aria-label="Remove item"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-xs text-smoke-muted mt-1">
          {item.color} / {item.size}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-smoke/10">
            <button
              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-smoke-muted hover:text-smoke transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-xs font-medium text-smoke">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-smoke-muted hover:text-smoke transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <span className="text-sm font-mono font-medium text-smoke">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
