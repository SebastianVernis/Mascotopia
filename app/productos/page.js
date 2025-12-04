'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Productos() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [cartCount, setCartCount] = useState(0)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    loadProducts()
    updateCartCount()
  }, [category])

  const loadProducts = async () => {
    try {
      const url = category === 'all' 
        ? '/api/products'
        : `/api/products?category=${category}`
      
      const res = await fetch(url)
      const data = await res.json()
      
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const total = cart.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(total)
      } catch (error) {
        console.error('localStorage access error:', error)
        setCartCount(0)
      }
    }
  }

  const addToCart = (product) => {
    if (typeof window !== 'undefined') {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingItem = cart.find(item => item.id === product.id)

        if (existingItem) {
          existingItem.quantity += 1
        } else {
          cart.push({ ...product, quantity: 1 })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        updateCartCount()
        showNotification(`${product.name} agregado al carrito`)
      } catch (error) {
        console.error('localStorage access error:', error)
        showNotification('Error al agregar al carrito')
      }
    }
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
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
        <div className="container">
          <h1 style={{marginBottom: '2rem'}}>Nuestros Productos</h1>

          <div className="products-header">
            <div className="filters">
              <button 
                className={`filter-btn ${category === 'all' ? 'active' : ''}`}
                onClick={() => setCategory('all')}
              >
                Todos
              </button>
              <button 
                className={`filter-btn ${category === 'alimento' ? 'active' : ''}`}
                onClick={() => setCategory('alimento')}
              >
                Alimento
              </button>
              <button 
                className={`filter-btn ${category === 'juguetes' ? 'active' : ''}`}
                onClick={() => setCategory('juguetes')}
              >
                Juguetes
              </button>
              <button 
                className={`filter-btn ${category === 'accesorios' ? 'active' : ''}`}
                onClick={() => setCategory('accesorios')}
              >
                Accesorios
              </button>
              <button 
                className={`filter-btn ${category === 'higiene' ? 'active' : ''}`}
                onClick={() => setCategory('higiene')}
              >
                Higiene
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">Cargando productos...</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <button 
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {notification && (
        <div className="notification success">
          {notification}
        </div>
      )}

      <footer>
        <div className="container">
          <p>&copy; 2024 Mascotopia - Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  )
}
