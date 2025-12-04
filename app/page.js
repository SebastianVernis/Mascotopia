'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    updateCartCount()
  }, [])

  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const total = cart.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(total)
    }
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
          <div className="hero">
            <h1>🐾 Bienvenido a Mascotopia</h1>
            <p>Los mejores productos para tus mascotas en un solo lugar</p>
            <Link href="/productos">
              <button className="btn btn-primary" style={{marginTop: '2rem'}}>
                Ver Productos
              </button>
            </Link>
          </div>

          <div style={{marginTop: '3rem'}}>
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>¿Por qué elegirnos?</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
              <div style={{background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏆</div>
                <h3>Calidad Premium</h3>
                <p>Productos de las mejores marcas</p>
              </div>
              <div style={{background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚚</div>
                <h3>Envío Rápido</h3>
                <p>Entrega en 24-48 horas</p>
              </div>
              <div style={{background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💰</div>
                <h3>Mejores Precios</h3>
                <p>Ofertas todo el año</p>
              </div>
            </div>
          </div>
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
