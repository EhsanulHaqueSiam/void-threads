import { useState } from 'react'
import { cn } from '~/utils/cn'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain'
}

export function LazyImage({ src, alt, className, aspectRatio, objectFit = 'cover' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn('relative overflow-hidden bg-void-light', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-smoke/5" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full transition-opacity duration-500',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  )
}
