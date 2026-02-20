import { useState, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp } from 'lucide-react'
import { products } from '~/data/products'
import { formatPrice } from '~/utils/format'
import type { Product } from '~/types/product'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const TRENDING_SEARCHES = ['Hoodie', 'Cargo Pants', 'Oversized', 'Essential Tee']

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 6)
    setResults(matched)
  }, [query])

  const handleSearchClick = (term: string) => {
    setQuery(term)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-2xl mx-auto pt-24 md:pt-32 px-4"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-4 text-smoke-muted hover:text-smoke transition-colors p-2"
              aria-label="Close search"
            >
              <X size={24} />
            </button>

            {/* Search input */}
            <div className="relative">
              <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-smoke-faint" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent border-b-2 border-smoke/10 focus:border-gold pl-8 pr-4 py-4 text-2xl md:text-3xl font-heading text-smoke placeholder:text-smoke-faint focus:outline-none transition-colors"
              />
            </div>

            {/* Trending searches (when no query) */}
            {query.length < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={14} className="text-gold" />
                  <span className="text-xs tracking-[0.2em] uppercase text-smoke-muted font-medium">
                    Trending
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearchClick(term)}
                      className="px-4 py-2 border border-smoke/10 text-sm text-smoke-muted hover:text-gold hover:border-gold/30 transition-all duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Search results */}
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 space-y-1"
              >
                <p className="text-xs text-smoke-faint mb-4">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      onClick={onClose}
                      className="flex items-center gap-4 py-3 px-2 hover:bg-smoke/5 transition-colors group"
                    >
                      <div className="w-12 h-14 shrink-0 bg-void-lighter overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-smoke font-medium truncate group-hover:text-gold transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-smoke-faint capitalize">{product.category}</p>
                      </div>
                      <span className="text-sm font-mono font-semibold text-smoke shrink-0">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No results */}
            {query.length >= 2 && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <p className="text-smoke-muted">No products found for "{query}"</p>
                <p className="text-xs text-smoke-faint mt-2">Try a different search term</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
