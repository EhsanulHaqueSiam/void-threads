export const SITE_NAME = 'VOID THREADS'
export const SITE_TAGLINE = 'Wear the Void'
export const SITE_DESCRIPTION = 'Premium streetwear for the bold. Hoodies, pants, and tees crafted for those who dare to stand out.'
export const SITE_URL = 'https://voidthreads.com'

export const FREE_SHIPPING_THRESHOLD = 150
export const NEWSLETTER_DISCOUNT = 10
export const EXIT_INTENT_DISCOUNT = 15

export const NEWSLETTER_POPUP_DELAY = 30000 // 30 seconds
export const NEWSLETTER_POPUP_SCROLL = 0.5 // 50% scroll
export const NEWSLETTER_COOLDOWN_DAYS = 7

export const NAV_LINKS = [
  { label: 'Shop', href: '/collections', slug: undefined },
  { label: 'Hoodies', href: '/collections/$slug', slug: 'hoodies' },
  { label: 'Pants', href: '/collections/$slug', slug: 'pants' },
  { label: 'Tees', href: '/collections/$slug', slug: 'tees' },
  { label: 'About', href: '/about', slug: undefined },
  { label: 'Contact', href: '/contact', slug: undefined },
] as const

export const ANNOUNCEMENT_MESSAGES = [
  'FREE SHIPPING ON ORDERS OVER $150',
  'NEW DROP — SHADOW COLLECTION NOW LIVE',
  'USE CODE VOID10 FOR 10% OFF YOUR FIRST ORDER',
] as const

export const TRUST_BADGES = [
  { icon: 'Truck', label: 'Free Shipping', description: 'On orders over $150' },
  { icon: 'Shield', label: 'Secure Payment', description: '256-bit SSL encryption' },
  { icon: 'RotateCcw', label: '30-Day Returns', description: 'No questions asked' },
  { icon: 'Award', label: 'Premium Quality', description: 'Heavyweight fabrics' },
] as const

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/voidthreads',
  twitter: 'https://twitter.com/voidthreads',
  tiktok: 'https://tiktok.com/@voidthreads',
} as const
