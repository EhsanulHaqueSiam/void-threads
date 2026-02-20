import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface UIContextValue {
  isMobileMenuOpen: boolean
  isNewsletterOpen: boolean
  isExitIntentOpen: boolean
  isSizeGuideOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openNewsletter: () => void
  closeNewsletter: () => void
  openExitIntent: () => void
  closeExitIntent: () => void
  openSizeGuide: () => void
  closeSizeGuide: () => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isNewsletterOpen, setNewsletterOpen] = useState(false)
  const [isExitIntentOpen, setExitIntentOpen] = useState(false)
  const [isSizeGuideOpen, setSizeGuideOpen] = useState(false)

  const value: UIContextValue = {
    isMobileMenuOpen,
    isNewsletterOpen,
    isExitIntentOpen,
    isSizeGuideOpen,
    toggleMobileMenu: useCallback(() => setMobileMenuOpen((v) => !v), []),
    closeMobileMenu: useCallback(() => setMobileMenuOpen(false), []),
    openNewsletter: useCallback(() => setNewsletterOpen(true), []),
    closeNewsletter: useCallback(() => setNewsletterOpen(false), []),
    openExitIntent: useCallback(() => setExitIntentOpen(true), []),
    closeExitIntent: useCallback(() => setExitIntentOpen(false), []),
    openSizeGuide: useCallback(() => setSizeGuideOpen(true), []),
    closeSizeGuide: useCallback(() => setSizeGuideOpen(false), []),
  }

  return <UIContext value={value}>{children}</UIContext>
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUI must be used within UIProvider')
  return context
}
