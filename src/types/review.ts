export interface Review {
  id: string
  productId: string
  author: string
  avatar?: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  images?: string[]
}
