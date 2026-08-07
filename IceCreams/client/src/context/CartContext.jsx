import { createContext, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('lulumart-cart', [])

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id)
      if (existing) {
        return prev.map((i) => (i._id === product._id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...product, qty }]
    })
  }, [setItems])

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i._id !== id))
  }, [setItems])

  const updateQty = useCallback((id, qty) => {
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [setItems])

  const clearCart = useCallback(() => setItems([]), [setItems])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
  const grandTotal = subtotal
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = { items, addToCart, removeFromCart, updateQty, clearCart, subtotal, grandTotal, count }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
