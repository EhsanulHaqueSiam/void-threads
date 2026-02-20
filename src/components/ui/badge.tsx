import type { HTMLAttributes } from 'react'
import { cn } from '~/utils/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'hot' | 'new' | 'sale' | 'low-stock'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest',
        variant === 'default' && 'bg-smoke/10 text-smoke',
        variant === 'hot' && 'bg-danger text-white',
        variant === 'new' && 'bg-gold text-void',
        variant === 'sale' && 'bg-red-500 text-white',
        variant === 'low-stock' && 'bg-orange-600 text-white',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
