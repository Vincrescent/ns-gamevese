import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ns-wishlist') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('ns-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (game) => {
    setWishlist(prev => {
      if (prev.find(g => g.id === game.id)) return prev
      return [...prev, game]
    })
  }

  const removeFromWishlist = (gameId) => {
    setWishlist(prev => prev.filter(g => g.id !== gameId))
  }

  const isWishlisted = (gameId) => wishlist.some(g => g.id === gameId)

  const toggleWishlist = (game) => {
    if (isWishlisted(game.id)) {
      removeFromWishlist(game.id)
    } else {
      addToWishlist(game)
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
