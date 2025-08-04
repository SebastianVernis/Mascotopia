<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito - Mascotopia</title>
    <link rel="stylesheet" href="/src/css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <img src="../assets/images/logo_mascotopia.jpeg" alt="Mascotopia Logo">
                <h1>Mascotopia</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="index.php">Inicio</a></li>
                    <li><a href="productos.php">Productos</a></li>
                    <li><a href="contacto.php">Contacto</a></li>
                    <li><a href="carrito.php">Carrito (<span id="cart-count">0</span>)</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section id="cart-page">
            <div class="container">
                <h1>Tu Carrito de Compras</h1>
                
                <div id="cart-container">
                    <!-- El contenido del carrito se cargará aquí -->
                </div>
                
                <div id="cart-summary" class="cart-summary" style="display: none;">
                    <h3>Resumen del Pedido</h3>
                    <div class="summary-line">
                        <span>Subtotal:</span>
                        <span id="subtotal">$0.00</span>
                    </div>
                    <div class="summary-line">
                        <span>Envío:</span>
                        <span id="shipping">$50.00</span>
                    </div>
                    <div class="summary-line total">
                        <span>Total:</span>
                        <span id="total">$0.00</span>
                    </div>
                    <button id="checkout-btn" class="checkout-btn">Proceder al Checkout</button>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Mascotopia. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="../src/js/cart.js"></script>
</body>
</html>

