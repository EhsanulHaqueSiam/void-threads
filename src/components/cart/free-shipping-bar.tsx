import { Truck } from 'lucide-react'
import { ProgressBar } from '~/components/ui/progress-bar'
import { useCart } from '~/context/cart-context'
import { FREE_SHIPPING_THRESHOLD } from '~/utils/constants'
import { formatPrice } from '~/utils/format'

export function FreeShippingBar() {
  const { subtotal, freeShippingProgress, isFreeShipping } = useCart()
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div className="px-6 py-3 bg-void-light">
      <div className="flex items-center gap-2 mb-2">
        <Truck size={14} className={isFreeShipping ? 'text-success' : 'text-smoke-muted'} />
        <p className="text-xs text-smoke-muted">
          {isFreeShipping
            ? "You've unlocked free shipping!"
            : `Add ${formatPrice(remaining)} more for free shipping`}
        </p>
      </div>
      <ProgressBar progress={freeShippingProgress} />
    </div>
  )
}
