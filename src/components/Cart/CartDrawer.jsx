import React from 'react'
import { useCart } from '../../context/CartContext'
import styles from './CartDrawer.module.css'

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart()

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.drawer} ${open ? styles.open : ''}`} aria-label="Shopping cart">
        <div className={styles.header}>
          <h2 className={styles.title}>Cart ({items.length})</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛒</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className={styles.itemList}>
              {items.map(item => (
                <li key={item.id} className={styles.item}>
                  <img src={item.thumbnail} alt={item.title} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</p>
                    <div className={styles.itemQty}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)} aria-label="Remove item">✕</button>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
              <button className={styles.checkoutBtn}>Proceed to Checkout</button>
              <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
