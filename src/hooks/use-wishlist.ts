import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'void-wishlist'

function getStoredWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(getStoredWishlist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // Ignore
    }
  }, [wishlist])

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev
      return [...prev, productId]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }, [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      }
      return [...prev, productId]
    })
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  )

  return {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  }
}
