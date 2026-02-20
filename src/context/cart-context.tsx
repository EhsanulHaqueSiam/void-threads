import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { CartItem, CartState, CartAction } from '~/types/cart'
import { FREE_SHIPPING_THRESHOLD } from '~/utils/constants'

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  freeShippingProgress: number
  isFreeShipping: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      )

      if (existingIndex > -1) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        }
        return { ...state, items: newItems, isOpen: true }
      }

      return { ...state, items: [...state.items, action.payload], isOpen: true }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.productId === action.payload.productId &&
              item.color === action.payload.color &&
              item.size === action.payload.size)
        ),
      }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(item.productId === action.payload.productId &&
                item.color === action.payload.color &&
                item.size === action.payload.size)
          ),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    default:
      return state
  }
}

function getInitialState(): CartState {
  return { items: [], isOpen: false }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState())

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('void-cart')
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[]
        parsed.forEach((item) => dispatch({ type: 'ADD_ITEM', payload: item }))
      }
    } catch {
      // Ignore
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('void-cart', JSON.stringify(state.items))
    } catch {
      // Ignore
    }
  }, [state.items])

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    itemCount,
    subtotal,
    freeShippingProgress,
    isFreeShipping,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (productId, color, size) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, color, size } }),
    updateQuantity: (productId, color, size, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, color, size, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
  }

  return <CartContext value={value}>{children}</CartContext>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
