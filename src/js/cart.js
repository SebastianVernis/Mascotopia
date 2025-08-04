// Script para el carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    
    // Event listener para el botón de checkout
    document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-container');
    const summary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>¡Agrega algunos productos para comenzar!</p>
                <a href="productos.php" class="btn">Ver Productos</a>
            </div>
        `;
        summary.style.display = 'none';
        return;
    }
    
    let html = '<div class="cart-items">';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item" data-index="${index}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="item-total">$${itemTotal.toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeItem(${index})">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Actualizar resumen
    const shipping = 50.00;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    summary.style.display = 'block';
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
        showNotification('Producto eliminado del carrito');
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Simular proceso de checkout
    const customerData = {
        name: 'Cliente Demo',
        email: 'cliente@demo.com',
        phone: '555-0123',
        address: 'Dirección de ejemplo'
    };
    
    const orderData = {
        customer: customerData,
        items: cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }))
    };
    
    // Enviar orden al backend
    submitOrder(orderData);
}

async function submitOrder(orderData) {
    try {
        const response = await fetch("/src/php/api.php/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Limpiar carrito
            localStorage.removeItem('cart');
            
            // Mostrar mensaje de éxito
            showSuccessMessage(result.data);
        } else {
            showNotification('Error al procesar la orden: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión. Inténtalo de nuevo.');
    }
}

function showSuccessMessage(order) {
    const container = document.getElementById('cart-container');
    container.innerHTML = `
        <div class="order-success">
            <h2>¡Pedido Realizado con Éxito!</h2>
            <p>Tu número de orden es: <strong>#${order.id}</strong></p>
            <p>Total: <strong>$${order.total.toFixed(2)}</strong></p>
            <p>Recibirás un email de confirmación en breve.</p>
            <a href="productos.php" class="btn">Seguir Comprando</a>
        </div>
    `;
    
    document.getElementById('cart-summary').style.display = 'none';
    updateCartCount();
}

function showNotification(message) {
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
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

