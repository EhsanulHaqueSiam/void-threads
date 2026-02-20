/// <reference types="vite/client" />
import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { CartProvider } from '~/context/cart-context'
import { UIProvider } from '~/context/ui-context'
import { ToastProvider } from '~/components/ui/toast'
import { AnnouncementBar } from '~/components/layout/announcement-bar'
import { Navbar } from '~/components/layout/navbar'
import { NavbarMobile } from '~/components/layout/navbar-mobile'
import { Footer } from '~/components/layout/footer'
import { CartDrawer } from '~/components/cart/cart-drawer'
import { NewsletterPopup } from '~/components/popups/newsletter-popup'
import { ExitIntentPopup } from '~/components/popups/exit-intent-popup'
import { LivePurchaseToast } from '~/components/shared/live-purchase-toast'
import { BackToTop } from '~/components/shared/back-to-top'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'VOID THREADS — Premium Streetwear' },
      { name: 'description', content: 'Premium streetwear for the bold. Hoodies, pants, and tees crafted for those who dare to stand out.' },
      { name: 'theme-color', content: '#0A0A0A' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  return (
    <CartProvider>
      <UIProvider>
        <ToastProvider>
          {/* Fixed header: announcement bar + navbar */}
          <div className="fixed top-0 left-0 right-0 z-40">
            <AnnouncementBar />
            <Navbar />
          </div>
          <NavbarMobile />
          <main className="min-h-screen">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <NewsletterPopup />
          <ExitIntentPopup />
          <LivePurchaseToast />
          <BackToTop />
        </ToastProvider>
      </UIProvider>
    </CartProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-void text-smoke">
      <head>
        <HeadContent />
      </head>
      <body className="bg-void text-smoke antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
