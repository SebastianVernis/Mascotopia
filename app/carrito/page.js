'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Carrito() {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    if (typeof window !== 'undefined') {
      const cartData = JSON.parse(localStorage.getItem('cart') || '[]')
      setCart(cartData)
      updateCartCount(cartData)
    }
  }

  const updateCartCount = (cartData = cart) => {
    const total = cartData.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(total)
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )

    setCart(updatedCart)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    updateCartCount(updatedCart)
  }

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId)
    setCart(updatedCart)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    updateCartCount(updatedCart)
  }

  const clearCart = () => {
    setCart([])
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    updateCartCount([])
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! Esta es una demo, no se procesará ningún pago.')
    clearCart()
  }

  return (
    <>
      <header>
        <div className="header-content">
          <Link href="/" className="logo">🐾 Mascotopia</Link>
          <nav>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/productos">Productos</Link></li>
              <li>
                <Link href="/carrito">
                  Carrito
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container cart-container">
          <h1 style={{marginBottom: '2rem'}}>Carrito de Compras</h1>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <h2>Tu carrito está vacío</h2>
              <p>Agrega productos desde nuestra tienda</p>
              <Link href="/productos">
                <button className="btn btn-primary" style={{marginTop: '2rem'}}>
                  Ver Productos
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">${item.price.toFixed(2)} c/u</p>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                      <p style={{marginTop: '1rem', fontWeight: 'bold'}}>
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Resumen de Compra</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="summary-row">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{width: '100%', marginTop: '1rem'}}
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{width: '100%', marginTop: '1rem'}}
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 Mascotopia - Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  )
}
