import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '~/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full bg-void-light border border-smoke/10 px-4 py-3 text-sm text-smoke placeholder:text-smoke-faint transition-colors focus:border-gold focus:outline-none',
            error && 'border-danger',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
