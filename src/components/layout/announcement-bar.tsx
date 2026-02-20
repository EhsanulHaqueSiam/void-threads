import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ANNOUNCEMENT_MESSAGES } from '~/utils/constants'

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-gold text-void text-center py-2.5 px-4 overflow-hidden">
      {/* Subtle shimmer overlay */}
      <div
        className="absolute inset-0 opacity-10 animate-shimmer pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          backgroundSize: '200% 100%',
        }}
      />
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-[11px] font-semibold tracking-[0.2em] uppercase relative z-10"
        >
          {ANNOUNCEMENT_MESSAGES[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
