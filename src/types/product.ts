export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  colors: ProductColor[]
  sizes: ProductSize[]
  stock: number
  category: ProductCategory
  tags: string[]
  rating: number
  reviewCount: number
  soldToday?: number
  featured?: boolean
  isNew?: boolean
}

export interface ProductColor {
  name: string
  value: string
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type ProductCategory = 'hoodies' | 'pants' | 'tees'

export interface Collection {
  name: string
  slug: ProductCategory
  description: string
  image: string
  productCount: number
}
