import { useRef, useState, useCallback, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { CountdownTimer } from '~/components/ui/countdown-timer'

// Drop ends 7 days from now
const dropEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

const HEADLINE_WORDS = ['WEAR', 'THE', 'VOID']

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  // Magnetic CTA button effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctaRef.current) return
    const rect = ctaRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const dist = Math.sqrt(distX * distX + distY * distY)
    if (dist < 150) {
      const pull = (150 - dist) / 150
      setMousePos({ x: distX * pull * 0.3, y: distY * pull * 0.3 })
    } else {
      setMousePos({ x: 0, y: 0 })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
  }, [])

  // Social proof count-up
  const [count, setCount] = useState(0)
  const targetCount = 10000
  useEffect(() => {
    const duration = 2000
    const startTime = Date.now()
    const startDelay = 2500
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime - startDelay
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * targetCount))
        if (progress >= 1) clearInterval(interval)
      }, 16)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ken Burns background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 animate-kenburns origin-center">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Film grain noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none animate-grain opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Cinematic gradient overlays */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: overlayOpacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/70 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/60" />
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-void to-transparent" />
      </motion.div>

      {/* Subtle grid overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(245,245,245,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Side accent lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
        className="absolute left-6 md:left-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent origin-top hidden lg:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 2, ease: 'easeOut' }}
        className="absolute right-6 md:right-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent origin-bottom hidden lg:block"
      />

      {/* Side text accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-smoke-faint"
          style={{ writingMode: 'vertical-rl' }}
        >
          EST. 2024 — VOID THREADS
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-smoke-faint"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          PREMIUM STREETWEAR
        </p>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 text-center"
        style={{ y: contentY }}
      >
        {/* Floating shimmer badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="animate-float-badge">
            <div className="relative px-5 py-2 border border-gold/40 bg-gold/5 backdrop-blur-sm">
              <span
                className="text-[11px] font-semibold tracking-[0.35em] uppercase animate-shimmer bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #C9A84C 0%, #F5F5F5 25%, #C9A84C 50%, #F5F5F5 75%, #C9A84C 100%)',
                  backgroundSize: '200% auto',
                }}
              >
                Shadow Collection — Limited Drop
              </span>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/60" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/60" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/60" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/60" />
            </div>
          </div>
        </motion.div>

        {/* Word-by-word headline with letter stagger */}
        <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.03em] leading-[0.85] mb-8">
          {HEADLINE_WORDS.map((word, wordIndex) => (
            <span key={word} className="inline-block mr-[0.25em] last:mr-0">
              {word.split('').map((char, charIndex) => {
                const globalIndex = HEADLINE_WORDS.slice(0, wordIndex)
                  .reduce((acc, w) => acc + w.length, 0) + charIndex
                const isVoidWord = word === 'VOID'
                return (
                  <motion.span
                    key={`${word}-${charIndex}`}
                    initial={{ opacity: 0, y: 60, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + globalIndex * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                    style={
                      isVoidWord
                        ? {
                            backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D9A0, #C9A84C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : { color: '#F5F5F5' }
                    }
                  >
                    {char}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-smoke-muted text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium streetwear forged in darkness. Heavyweight fabrics, minimal design,{' '}
          <span className="text-smoke font-medium">maximum presence.</span>
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Link to="/collections">
              <Button
                ref={ctaRef}
                variant="gold"
                size="lg"
                className="group gap-3 text-base px-10 py-5 animate-pulse-glow"
              >
                SHOP THE DROP
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Button>
            </Link>
          </motion.div>

          {/* Enhanced countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <CountdownTimer targetDate={dropEndDate} label="Drop ends in" />
          </motion.div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-7 h-7 border-2 border-void bg-void-lighter flex items-center justify-center"
              >
                <span className="text-[9px] text-smoke-faint font-medium">
                  {['JK', 'AL', 'MR', 'TS'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-smoke-muted">
            Joined by{' '}
            <span className="text-gold font-mono font-semibold">
              {count.toLocaleString()}+
            </span>{' '}
            streetwear enthusiasts
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-smoke-faint">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-gold/60" />
        </motion.div>
        <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  )
}
