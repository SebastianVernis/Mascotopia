// Script principal para Mascotopia
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mascotopia cargado correctamente');
    
    // Inicializar la aplicación
    initApp();
});

function initApp() {
    // Configurar navegación
    setupNavigation();
    
    // Cargar productos
    loadProducts();
    
    // Configurar carrito
    setupCart();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#') {
                console.log('Navegación a: ' + this.textContent);
            }
        });
    });
}

function loadProducts() {
    // Simulación de productos para el MVP
    const products = [
        {
            id: 1,
            name: 'Alimento para Perros Premium',
            price: 299.99,
            image: 'https://via.placeholder.com/200x200?text=Alimento+Perros',
            category: 'alimento'
        },
        {
            id: 2,
            name: 'Juguete para Gatos',
            price: 89.99,
            image: 'https://via.placeholder.com/200x200?text=Juguete+Gatos',
            category: 'juguetes'
        },
        {
            id: 3,
            name: 'Collar Ajustable',
            price: 149.99,
            image: 'https://via.placeholder.com/200x200?text=Collar',
            category: 'accesorios'
        }
    ];
    
    displayProducts(products);
}

function displayProducts(products) {
    const productsContainer = document.querySelector('#products .container');
    
    if (!productsContainer) return;
    
    let productsHTML = '<h2>Nuestros Productos</h2><div class="products-grid">';
    
    products.forEach(product => {
        productsHTML += `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        `;
    });
    
    productsHTML += '</div>';
    productsContainer.innerHTML = productsHTML;
}

function setupCart() {
    // Inicializar carrito vacío
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Mostrar mensaje de confirmación
    showNotification('Producto agregado al carrito');
}

function showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

