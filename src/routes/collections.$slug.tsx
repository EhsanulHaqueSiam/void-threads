import { createFileRoute, notFound } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { z } from 'zod'
import { SlidersHorizontal } from 'lucide-react'
import { getCollectionBySlug } from '~/data/collections'
import { getProductsByCategory, products as allProducts } from '~/data/products'
import { ProductGrid } from '~/components/product/product-grid'
import { FilterSidebar, type Filters } from '~/components/filters/filter-sidebar'
import { SortDropdown, type SortOption } from '~/components/filters/sort-dropdown'
import { QuickViewModal } from '~/components/product/quick-view-modal'
import { ScrollReveal } from '~/components/shared/scroll-reveal'
import type { Product } from '~/types/product'

const searchSchema = z.object({
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'newest', 'rating']).optional(),
  sizes: z.string().optional(),
  colors: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
})

export const Route = createFileRoute('/collections/$slug')({
  validateSearch: searchSchema,
  head({ params }) {
    const collection = getCollectionBySlug(params.slug)
    return {
      meta: [
        { title: `${collection?.name || 'Collection'} | VOID THREADS` },
        { name: 'description', content: collection?.description || 'Shop the collection.' },
      ],
    }
  },
  component: CollectionPage,
})

function CollectionPage() {
  const { slug } = Route.useParams()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const collection = getCollectionBySlug(slug)

  const [showFilters, setShowFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [sort, setSort] = useState<SortOption>((search.sort as SortOption) || 'featured')
  const [filters, setFilters] = useState<Filters>({
    sizes: search.sizes ? search.sizes.split(',') as any : [],
    colors: search.colors ? search.colors.split(',') : [],
    priceRange: search.minPrice && search.maxPrice ? [search.minPrice, search.maxPrice] : null,
  })

  const categoryProducts = collection
    ? getProductsByCategory(collection.slug)
    : allProducts

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts]

    // Filter by size
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)))
    }

    // Filter by color
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)))
    }

    // Filter by price
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      result = result.filter((p) => p.price >= min && p.price <= max)
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return result
  }, [categoryProducts, filters, sort])

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort)
    navigate({ search: { ...search, sort: newSort } as any, replace: true })
  }

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
    navigate({
      search: {
        ...search,
        sizes: newFilters.sizes.length > 0 ? newFilters.sizes.join(',') : undefined,
        colors: newFilters.colors.length > 0 ? newFilters.colors.join(',') : undefined,
        minPrice: newFilters.priceRange?.[0] ?? undefined,
        maxPrice: newFilters.priceRange?.[1] ?? undefined,
      } as any,
      replace: true,
    })
  }

  return (
    <div className="pt-24 pb-20">
      {/* Collection header */}
      <div className="relative h-48 md:h-64 overflow-hidden mb-8">
        <img
          src={collection?.image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80'}
          alt={collection?.name || 'All Products'}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-smoke">
                {collection?.name || 'All Products'}
              </h1>
              <p className="text-sm text-smoke-muted mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-smoke-muted hover:text-smoke transition-colors lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <div className="hidden lg:block" />
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <div className={`shrink-0 w-60 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-smoke-muted">No products match your filters.</p>
                <button
                  onClick={() => handleFilterChange({ sizes: [], colors: [], priceRange: null })}
                  className="text-sm text-gold hover:text-gold-light mt-2 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} columns={3} onQuickView={setQuickViewProduct} />
            )}
          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}
