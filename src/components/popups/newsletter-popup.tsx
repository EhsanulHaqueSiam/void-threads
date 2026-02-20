import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gift, ArrowRight, X } from 'lucide-react'
import { Modal } from '~/components/ui/modal'
import { Button } from '~/components/ui/button'
import { NEWSLETTER_POPUP_DELAY, NEWSLETTER_COOLDOWN_DAYS } from '~/utils/constants'

const STORAGE_KEY = 'void-newsletter-dismissed'

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check cooldown
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (dismissed) {
        const dismissedDate = new Date(dismissed)
        const cooldownEnd = new Date(dismissedDate.getTime() + NEWSLETTER_COOLDOWN_DAYS * 24 * 60 * 60 * 1000)
        if (Date.now() < cooldownEnd.getTime()) return
      }
    } catch {
      // Ignore
    }

    // Timer trigger
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, NEWSLETTER_POPUP_DELAY)

    // Scroll trigger
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.5) {
        setIsOpen(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      // Ignore
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      // Ignore
    }
    setTimeout(() => {
      setIsOpen(false)
    }, 2500)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-8 md:p-10 text-center relative">
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/30" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/30" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/30" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/30" />

        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-16 h-16 bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6"
        >
          <Gift size={28} className="text-gold" />
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-heading text-2xl font-bold text-smoke mb-3">
              Welcome to the Void
            </h2>
            <p className="text-sm text-smoke-muted">
              Check your email for your 10% off code. Happy shopping!
            </p>
          </motion.div>
        ) : (
          <>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3 font-medium">
              Exclusive Offer
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-smoke mb-3">
              Get <span className="text-gold">10% Off</span> Your First Order
            </h2>
            <p className="text-sm text-smoke-muted mb-6 max-w-xs mx-auto">
              Join 10,000+ members of the void. Get early access to drops and your welcome discount.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-0 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-void border border-smoke/10 border-r-0 px-4 py-3.5 text-sm text-smoke placeholder:text-smoke-faint focus:outline-none focus:border-gold transition-colors"
              />
              <Button type="submit" variant="gold" className="shrink-0 px-5">
                <ArrowRight size={18} />
              </Button>
            </form>

            <p className="text-[11px] text-smoke-faint mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </Modal>
  )
}
