// Script para la página de productos
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupFilters();
    updateCartCount();
});

let allProducts = [];

async function loadProducts(category = null) {
    try {
        const url = category && category !== 'all' 
            ? `/src/php/api.php/products?category=${category}`
            : `/src/php/api.php/products`;
            
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            allProducts = data.data;
            displayProducts(allProducts);
        } else {
            console.error('Error al cargar productos:', data.message);
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        // Fallback con productos estáticos
        loadFallbackProducts();
    }
}

function loadFallbackProducts() {
    allProducts = [
        {
            id: 1,
            name: 'Alimento para Perros Premium',
            price: 299.99,
            description: 'Alimento balanceado para perros adultos con ingredientes naturales.',
            image: 'https://via.placeholder.com/300x300?text=Alimento+Perros',
            category: 'alimento',
            stock: 50
        },
        {
            id: 2,
            name: 'Juguete para Gatos',
            price: 89.99,
            description: 'Juguete interactivo para mantener a tu gato entretenido.',
            image: 'https://via.placeholder.com/300x300?text=Juguete+Gatos',
            category: 'juguetes',
            stock: 25
        },
        {
            id: 3,
            name: 'Collar Ajustable',
            price: 149.99,
            description: 'Collar ajustable y cómodo para perros de todas las tallas.',
            image: 'https://via.placeholder.com/300x300?text=Collar',
            category: 'accesorios',
            stock: 30
        }
    ];
    displayProducts(allProducts);
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
        return;
    }
    
    let html = '';
    products.forEach(product => {
        html += `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="stock">Stock: ${product.stock}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    Agregar al Carrito
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar productos
            const category = this.getAttribute('data-category');
            loadProducts(category);
        });
    });
}

function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${productName} agregado al carrito`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
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
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

