import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Clock } from 'lucide-react'
import { Modal } from '~/components/ui/modal'
import { Button } from '~/components/ui/button'

const SESSION_KEY = 'void-exit-intent-shown'

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 1024) return

    // Only once per session
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
    } catch {
      // Ignore
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
        try {
          sessionStorage.setItem(SESSION_KEY, 'true')
        } catch {
          // Ignore
        }
        document.removeEventListener('mouseout', handleMouseLeave)
      }
    }

    // Delay adding the listener to prevent immediate trigger
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setIsOpen(false), 2500)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-8 md:p-10 text-center relative">
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-danger/30" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-danger/30" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-danger/30" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-danger/30" />

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-16 h-16 bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-6"
        >
          <Zap size={28} className="text-danger" />
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-heading text-2xl font-bold text-smoke mb-3">
              Your 15% Off Code
            </h2>
            <div className="bg-void border border-gold/30 px-6 py-3 inline-block my-4 relative">
              <span className="font-mono text-lg text-gold font-bold tracking-[0.15em]">
                STAYINVOID
              </span>
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 animate-shimmer pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)',
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
            <p className="text-sm text-smoke-muted">
              Apply at checkout. Valid for 24 hours.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock size={14} className="text-danger" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-danger font-semibold">
                Limited Time Offer
              </p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-smoke mb-2">
              Wait — Don't Leave Empty Handed
            </h2>
            <p className="text-sm text-smoke-muted mb-3">
              Here's an exclusive offer just for you:
            </p>
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
              className="text-4xl font-heading font-bold text-danger mb-5"
            >
              15% OFF
            </motion.p>
            <p className="text-sm text-smoke-muted mb-6 max-w-xs mx-auto">
              Enter your email to receive your exclusive discount code.
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

            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 text-xs text-smoke-faint hover:text-smoke transition-colors"
            >
              No thanks, I'll pay full price
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}
