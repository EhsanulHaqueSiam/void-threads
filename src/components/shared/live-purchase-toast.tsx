import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MapPin } from 'lucide-react'
import { products } from '~/data/products'

const CITIES = [
  'New York', 'Los Angeles', 'London', 'Toronto', 'Berlin',
  'Tokyo', 'Sydney', 'Paris', 'Chicago', 'Miami',
  'Amsterdam', 'Seoul', 'Melbourne', 'Stockholm', 'Dubai',
]

const FIRST_NAMES = [
  'Sarah', 'Marcus', 'Alex', 'Jordan', 'Taylor',
  'Devon', 'Riley', 'Kai', 'Morgan', 'Avery',
  'Liam', 'Emma', 'Noah', 'Olivia', 'Ethan',
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateNotification() {
  const product = getRandomItem(products)
  const city = getRandomItem(CITIES)
  const name = getRandomItem(FIRST_NAMES)
  const timeAgo = Math.floor(Math.random() * 10) + 1
  return { product, city, name, timeAgo }
}

export function LivePurchaseToast() {
  const [notification, setNotification] = useState<ReturnType<typeof generateNotification> | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // First notification after 15-25 seconds
    const initialDelay = 15000 + Math.random() * 10000

    const showNotification = () => {
      const notif = generateNotification()
      setNotification(notif)
      setIsVisible(true)

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    const initialTimer = setTimeout(() => {
      showNotification()

      // Subsequent notifications every 20-40 seconds
      const interval = setInterval(() => {
        showNotification()
      }, 20000 + Math.random() * 20000)

      return () => clearInterval(interval)
    }, initialDelay)

    return () => clearTimeout(initialTimer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 z-[90] max-w-xs bg-void-light border border-smoke/10 shadow-2xl shadow-black/30 cursor-pointer"
          onClick={() => setIsVisible(false)}
        >
          <div className="flex gap-3 p-3">
            {/* Product thumbnail */}
            <div className="w-14 h-14 shrink-0 bg-void-lighter overflow-hidden">
              <img
                src={notification.product.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <ShoppingBag size={10} className="text-gold shrink-0" />
                <span className="text-[11px] text-gold font-medium">Just purchased</span>
              </div>
              <p className="text-xs text-smoke font-medium truncate">
                {notification.name} bought {notification.product.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={9} className="text-smoke-faint shrink-0" />
                <span className="text-[10px] text-smoke-faint">
                  {notification.city} · {notification.timeAgo}m ago
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar that shrinks */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-0.5 bg-gold/40 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
