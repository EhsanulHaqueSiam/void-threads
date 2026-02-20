import { SITE_NAME, SITE_URL } from './constants'

interface SeoConfig {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'product'
}

export function getSeoMeta({ title, description, image, url, type = 'website' }: SeoConfig) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const ogImage = image || `${SITE_URL}/og-image.jpg`

  return {
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage,
    ogUrl: fullUrl,
    ogType: type,
  }
}

export function getProductJsonLd(product: {
  name: string
  description: string
  price: number
  image: string
  slug: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
  }
}
