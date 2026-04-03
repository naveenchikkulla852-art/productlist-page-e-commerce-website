import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('plp_cart')
    if (saved) {
      try { setItems(JSON.parse(saved)) } catch (_) {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('plp_cart', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
