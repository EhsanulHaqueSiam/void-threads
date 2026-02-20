import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ShoppingBag, Lock, ArrowRight } from 'lucide-react'
import { Drawer } from '~/components/ui/drawer'
import { Button } from '~/components/ui/button'
import { CartItem } from './cart-item'
import { FreeShippingBar } from './free-shipping-bar'
import { useCart } from '~/context/cart-context'
import { formatPrice } from '~/utils/format'

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, isFreeShipping } = useCart()

  return (
    <Drawer isOpen={isOpen} onClose={closeCart} title={`Cart (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
          <div className="w-20 h-20 border border-smoke/10 flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-smoke-faint" />
          </div>
          <p className="text-lg font-heading font-semibold text-smoke mb-2">Your cart is empty</p>
          <p className="text-sm text-smoke-muted mb-8">
            Add some pieces to get started.
          </p>
          <Link to="/collections" onClick={closeCart}>
            <Button variant="gold" size="md" className="group gap-2">
              Start Shopping
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <FreeShippingBar />

          <div className="flex-1 overflow-y-auto px-6">
            {items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.color}-${item.size}`}
                item={item}
              />
            ))}
          </div>

          <div className="border-t border-smoke/10 px-6 py-5 space-y-4 bg-void-light/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-smoke-muted">Subtotal</span>
              <span className="text-xl font-mono font-bold text-smoke">
                {formatPrice(subtotal)}
              </span>
            </div>
            {isFreeShipping && (
              <p className="text-xs text-success font-medium">
                Free shipping applied
              </p>
            )}
            {!isFreeShipping && (
              <p className="text-xs text-smoke-faint">
                Shipping calculated at checkout
              </p>
            )}
            <Link to="/cart" onClick={closeCart} className="block">
              <Button variant="gold" fullWidth size="lg" className="text-base h-13 animate-pulse-glow">
                View Cart & Checkout
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-smoke-faint">
              <Lock size={10} />
              <span>Secure checkout · SSL encrypted</span>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  )
}
