import { motion } from 'framer-motion'
import { cn } from '~/utils/cn'

interface ProgressBarProps {
  progress: number
  className?: string
  showLabel?: boolean
  label?: string
}

export function ProgressBar({ progress, className, showLabel = false, label }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && label && (
        <p className="text-xs text-smoke-muted mb-1">{label}</p>
      )}
      <div className="h-1.5 w-full bg-smoke/10 overflow-hidden">
        <motion.div
          className="h-full bg-gold"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
