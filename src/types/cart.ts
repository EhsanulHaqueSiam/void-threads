export interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; color: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; color: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
