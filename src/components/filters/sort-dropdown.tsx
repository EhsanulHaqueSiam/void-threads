import { cn } from '~/utils/cn'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
  className?: string
}

const options: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className={cn(
        'bg-void-light border border-smoke/10 px-3 py-2 text-sm text-smoke appearance-none cursor-pointer focus:outline-none focus:border-gold pr-8',
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A3A3A3' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 8px center',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
