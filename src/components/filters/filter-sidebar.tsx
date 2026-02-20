import { X } from 'lucide-react'
import { cn } from '~/utils/cn'
import type { ProductSize } from '~/types/product'

interface Filters {
  sizes: ProductSize[]
  colors: string[]
  priceRange: [number, number] | null
}

interface FilterSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  className?: string
}

const allSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const allColors = [
  { name: 'Void Black', value: '#0A0A0A' },
  { name: 'Ash Grey', value: '#6B6B6B' },
  { name: 'Bone White', value: '#E8E4DE' },
  { name: 'Midnight Navy', value: '#1B2838' },
  { name: 'Charcoal', value: '#333333' },
  { name: 'Olive', value: '#3D4A3A' },
]
const priceRanges: { label: string; value: [number, number] }[] = [
  { label: 'Under $50', value: [0, 50] },
  { label: '$50 - $100', value: [50, 100] },
  { label: '$100 - $150', value: [100, 150] },
  { label: '$150+', value: [150, 999] },
]

export function FilterSidebar({ filters, onChange, className }: FilterSidebarProps) {
  const toggleSize = (size: ProductSize) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onChange({ ...filters, sizes: newSizes })
  }

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    onChange({ ...filters, colors: newColors })
  }

  const setPriceRange = (range: [number, number] | null) => {
    const isSame = filters.priceRange?.[0] === range?.[0] && filters.priceRange?.[1] === range?.[1]
    onChange({ ...filters, priceRange: isSame ? null : range })
  }

  const hasActiveFilters = filters.sizes.length > 0 || filters.colors.length > 0 || filters.priceRange !== null

  return (
    <div className={cn('space-y-8', className)}>
      {hasActiveFilters && (
        <button
          onClick={() => onChange({ sizes: [], colors: [], priceRange: null })}
          className="flex items-center gap-1 text-xs text-danger hover:text-red-400 transition-colors"
        >
          <X size={12} />
          Clear all filters
        </button>
      )}

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold text-smoke mb-3 uppercase tracking-wide">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                'w-10 h-10 text-xs font-medium border transition-colors',
                filters.sizes.includes(size)
                  ? 'bg-smoke text-void border-smoke'
                  : 'bg-transparent text-smoke-muted border-smoke/10 hover:border-smoke/30'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold text-smoke mb-3 uppercase tracking-wide">Color</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              title={color.name}
              className={cn(
                'w-8 h-8 border-2 transition-all',
                filters.colors.includes(color.name)
                  ? 'border-gold scale-110'
                  : 'border-transparent hover:border-smoke/30'
              )}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-smoke mb-3 uppercase tracking-wide">Price</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(range.value)}
              className={cn(
                'block w-full text-left px-3 py-2 text-sm transition-colors border',
                filters.priceRange?.[0] === range.value[0] && filters.priceRange?.[1] === range.value[1]
                  ? 'bg-smoke/5 text-smoke border-smoke/20'
                  : 'text-smoke-muted border-transparent hover:text-smoke'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export type { Filters }
