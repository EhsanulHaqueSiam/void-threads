import { useCountdown } from '~/hooks/use-countdown'
import { cn } from '~/utils/cn'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
  label?: string
}

export function CountdownTimer({ targetDate, className, label }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) return null

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hrs' },
    { value: minutes, label: 'Min' },
    { value: seconds, label: 'Sec' },
  ]

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {label && (
        <p className="text-xs uppercase tracking-[0.2em] text-smoke-muted">{label}</p>
      )}
      <div className="flex items-center gap-2">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="font-mono text-2xl font-bold text-smoke tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-smoke-faint">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-smoke-faint text-lg mb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
