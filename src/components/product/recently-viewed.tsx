import { useEffect, useState } from 'react'
import { products } from '~/data/products'
import { ProductCard } from './product-card'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import { SectionHeading } from '~/components/shared/section-heading'
import type { Product } from '~/types/product'

interface RecentlyViewedProps {
  currentProductId: string
}

const STORAGE_KEY = 'void-recently-viewed'
const MAX_ITEMS = 6

export function addToRecentlyViewed(productId: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[]
    const filtered = stored.filter((id) => id !== productId)
    filtered.unshift(productId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)))
  } catch {
    // Ignore
  }
}

export function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[]
      const filtered = stored
        .filter((id) => id !== currentProductId)
        .slice(0, 4)
      const found = filtered
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[]
      setViewedProducts(found)
    } catch {
      // Ignore
    }
  }, [currentProductId])

  if (viewedProducts.length === 0) return null

  return (
    <section className="py-16 border-t border-smoke/5">
      <ScrollReveal>
        <SectionHeading title="Recently Viewed" />
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {viewedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
