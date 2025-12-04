// Base de datos en memoria - Productos
export const products = [
  {
    id: 1,
    name: 'Alimento para Perros Premium',
    price: 299.99,
    description: 'Alimento balanceado para perros adultos con ingredientes naturales.',
    image: '/images/products/product-1.jpg',
    category: 'alimento',
    stock: 50
  },
  {
    id: 2,
    name: 'Juguete para Gatos',
    price: 89.99,
    description: 'Juguete interactivo para mantener a tu gato entretenido.',
    image: '/images/products/product-2.jpg',
    category: 'juguetes',
    stock: 25
  },
  {
    id: 3,
    name: 'Collar Ajustable',
    price: 149.99,
    description: 'Collar ajustable y cómodo para perros de todas las tallas.',
    image: '/images/products/product-3.jpg',
    category: 'accesorios',
    stock: 30
  },
  {
    id: 4,
    name: 'Alimento para Gatos',
    price: 249.99,
    description: 'Alimento premium para gatos con sabor a salmón.',
    image: '/images/products/product-4.jpg',
    category: 'alimento',
    stock: 40
  },
  {
    id: 5,
    name: 'Cama para Mascotas',
    price: 399.99,
    description: 'Cama suave y cómoda para el descanso de tu mascota.',
    image: '/images/products/product-5.jpg',
    category: 'accesorios',
    stock: 15
  },
  {
    id: 6,
    name: 'Shampoo para Perros',
    price: 129.99,
    description: 'Shampoo hipoalergénico para el cuidado del pelaje.',
    image: '/images/products/product-6.jpg',
    category: 'higiene',
    stock: 35
  }
];

export const categories = [
  { id: 'alimento', name: 'Alimento' },
  { id: 'juguetes', name: 'Juguetes' },
  { id: 'accesorios', name: 'Accesorios' },
  { id: 'higiene', name: 'Higiene' }
];

export function getProducts(category = null) {
  if (category) {
    return products.filter(p => p.category === category);
  }
  return products;
}

export function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

export function getCategories() {
  return categories;
}
