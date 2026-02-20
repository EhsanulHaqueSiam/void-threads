import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '~/utils/cn'

interface AccordionItem {
  id: string
  title: string
  content: string | React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('divide-y divide-smoke/10', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-smoke hover:text-gold transition-colors"
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                size={16}
                className={cn(
                  'transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-sm text-smoke-muted leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
