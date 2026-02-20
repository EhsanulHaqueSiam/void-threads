import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '~/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium tracking-wide uppercase transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-smoke text-void hover:bg-white': variant === 'primary',
            'bg-transparent text-smoke border border-smoke/30 hover:border-smoke hover:bg-smoke/5': variant === 'secondary',
            'bg-transparent text-smoke hover:text-white hover:bg-white/5': variant === 'ghost',
            'bg-danger text-white hover:bg-red-700': variant === 'danger',
            'bg-gold text-void hover:bg-gold-light font-semibold': variant === 'gold',
          },
          {
            'px-4 py-2 text-xs': size === 'sm',
            'px-6 py-3 text-sm': size === 'md',
            'px-8 py-4 text-base': size === 'lg',
          },
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
