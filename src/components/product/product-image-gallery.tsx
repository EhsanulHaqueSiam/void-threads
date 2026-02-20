import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import { cn } from '~/utils/cn'

interface ProductImageGalleryProps {
  images: string[]
  name: string
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [direction, setDirection] = useState(0)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const handleSelectImage = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1)
    setSelectedIndex(index)
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => handleSelectImage(i)}
            className={cn(
              'group shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-all duration-200 relative',
              selectedIndex === i
                ? 'border-gold'
                : 'border-transparent hover:border-smoke/20'
            )}
          >
            <img
              src={image}
              alt={`${name} view ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Active indicator line */}
            {selectedIndex === i && (
              <motion.div
                layoutId="thumbnail-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        ref={imageContainerRef}
        className="relative flex-1 aspect-[3/4] overflow-hidden bg-void-light cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => {
          setIsZoomed(false)
          setZoomPosition({ x: 50, y: 50 })
        }}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedIndex}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <img
              src={images[selectedIndex]}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
              style={{
                transform: isZoomed ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        <div
          className={cn(
            'absolute bottom-4 right-4 flex items-center gap-2 bg-void/70 backdrop-blur-sm px-3 py-1.5 pointer-events-none transition-opacity duration-300',
            isZoomed ? 'opacity-0' : 'opacity-100'
          )}
        >
          <ZoomIn size={14} className="text-smoke-muted" />
          <span className="text-[11px] text-smoke-muted">Hover to zoom</span>
        </div>

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-void/60 backdrop-blur-sm px-2.5 py-1 pointer-events-none">
          <span className="text-[11px] text-smoke-muted font-mono">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  )
}
