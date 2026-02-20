import { Link } from '@tanstack/react-router'
import { Instagram, Twitter, ArrowRight } from 'lucide-react'
import { siteConfig } from '~/data/site-config'
import { SITE_NAME, SOCIAL_LINKS } from '~/utils/constants'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-void border-t border-smoke/5 relative">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 md:py-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-heading text-2xl font-bold tracking-[-0.03em] text-smoke hover:text-gold transition-colors">
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm text-smoke-muted leading-relaxed">
              Premium streetwear for the bold. Crafted for those who dare to stand out from the void.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-smoke/10 flex items-center justify-center text-smoke-faint hover:text-gold hover:border-gold/30 transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-smoke/10 flex items-center justify-center text-smoke-faint hover:text-gold hover:border-gold/30 transition-all duration-300"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-smoke mb-5">Shop</h3>
            <ul className="space-y-3">
              {siteConfig.footer.shop.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-smoke-muted hover:text-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-smoke mb-5">Company</h3>
            <ul className="space-y-3">
              {siteConfig.footer.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-smoke-muted hover:text-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-smoke mb-5">Stay Connected</h3>
            <p className="text-sm text-smoke-muted mb-4">Get 10% off your first order and early access to drops.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setEmail('')
              }}
              className="flex"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-void-light border border-smoke/10 border-r-0 px-3 py-2.5 text-sm text-smoke placeholder:text-smoke-faint focus:outline-none focus:border-gold transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-gold text-void px-3 py-2.5 hover:bg-gold-light transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-smoke/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-smoke-faint">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-smoke-faint">
            <a href="#" className="hover:text-smoke transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-smoke transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-smoke transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
