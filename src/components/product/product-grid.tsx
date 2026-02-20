import { ProductCard } from './product-card'
import type { Product } from '~/types/product'
import { cn } from '~/utils/cn'

interface ProductGridProps {
  products: Product[]
  className?: string
  columns?: 2 | 3 | 4
  onQuickView?: (product: Product) => void
}

export function ProductGrid({ products, className, columns = 3, onQuickView }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 md:gap-6',
        {
          'grid-cols-2': columns === 2,
          'grid-cols-2 md:grid-cols-3': columns === 3,
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
        },
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  )
}
