import type { Collection } from '~/types/product'

export const collections: Collection[] = [
  {
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Heavyweight, oversized, and built for the void. Our hoodies redefine premium streetwear.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    productCount: 6,
  },
  {
    name: 'Pants',
    slug: 'pants',
    description: 'From tactical cargos to wide-leg statements. Every silhouette, perfected.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    productCount: 6,
  },
  {
    name: 'Tees',
    slug: 'tees',
    description: 'Premium cotton basics and bold graphics. The foundation of every outfit.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    productCount: 6,
  },
]

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug)
}
