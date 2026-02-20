import { cn } from '~/utils/cn'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, subtitle, eyebrow, align = 'center', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-14',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-smoke">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-smoke-muted max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
