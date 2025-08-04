<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos - Mascotopia</title>
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
        <section id="products-page">
            <div class="container">
                <h1>Nuestros Productos</h1>
                
                <div class="filters">
                    <button class="filter-btn active" data-category="all">Todos</button>
                    <button class="filter-btn" data-category="alimento">Alimento</button>
                    <button class="filter-btn" data-category="juguetes">Juguetes</button>
                    <button class="filter-btn" data-category="accesorios">Accesorios</button>
                </div>
                
                <div id="products-container" class="products-grid">
                    <!-- Los productos se cargarán aquí dinámicamente -->
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Mascotopia. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="../src/js/products.js"></script>
</body>
</html>

