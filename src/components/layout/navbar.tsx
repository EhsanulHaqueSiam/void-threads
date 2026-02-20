import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ShoppingBag, Menu, Search, User, Heart } from 'lucide-react'
import { useScrollPosition } from '~/hooks/use-scroll-position'
import { useCart } from '~/context/cart-context'
import { useUI } from '~/context/ui-context'
import { useWishlist } from '~/hooks/use-wishlist'
import { NAV_LINKS, SITE_NAME } from '~/utils/constants'
import { SearchOverlay } from '~/components/shared/search-overlay'
import { cn } from '~/utils/cn'

export function Navbar() {
  const { isScrolled } = useScrollPosition()
  const { itemCount, openCart } = useCart()
  const { toggleMobileMenu } = useUI()
  const { wishlistCount } = useWishlist()
  const [isSearchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'w-full transition-all duration-500',
          isScrolled
            ? 'bg-void/95 backdrop-blur-xl border-b border-smoke/5 shadow-[0_1px_20px_rgba(0,0,0,0.3)]'
            : 'bg-void/80 backdrop-blur-sm'
        )}
      >
        <nav className="max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-smoke hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl font-bold tracking-[-0.03em] text-smoke hover:text-gold transition-colors duration-300"
          >
            {SITE_NAME}
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href as string}
                params={link.slug ? { slug: link.slug } : undefined}
                className="relative text-sm text-smoke-muted hover:text-smoke transition-colors duration-300 group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center justify-center text-smoke-muted hover:text-smoke transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
            <button
              className="hidden md:flex items-center justify-center relative text-smoke-muted hover:text-smoke transition-colors duration-200"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </button>
            <button
              className="hidden md:flex items-center justify-center text-smoke-muted hover:text-smoke transition-colors duration-200"
              aria-label="Account"
            >
              <User size={19} />
            </button>
            <button
              onClick={openCart}
              className="relative text-smoke-muted hover:text-smoke transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-void text-[10px] font-bold flex items-center justify-center"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
