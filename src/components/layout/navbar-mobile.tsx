import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, Twitter } from 'lucide-react'
import { useUI } from '~/context/ui-context'
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from '~/utils/constants'

export function NavbarMobile() {
  const { isMobileMenuOpen, closeMobileMenu } = useUI()

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={closeMobileMenu}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute top-0 left-0 h-full w-[300px] bg-void border-r border-smoke/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-smoke/10">
              <span className="font-heading text-lg font-bold tracking-tight">{SITE_NAME}</span>
              <button
                onClick={closeMobileMenu}
                className="text-smoke-muted hover:text-smoke"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-6 py-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href as string}
                      params={link.slug ? { slug: link.slug } : undefined}
                      onClick={closeMobileMenu}
                      className="block py-3 text-lg text-smoke hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="px-6 py-6 border-t border-smoke/10">
              <div className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke-muted hover:text-smoke transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke-muted hover:text-smoke transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
