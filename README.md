# Mascotopia - Tienda Online para Mascotas

## Descripción del Proyecto

Mascotopia es una tienda online especializada en alimentos y accesorios para mascotas, desarrollada con PHP y JavaScript Vainilla. El sitio web ofrece una experiencia de compra completa con catálogo de productos, carrito de compras y sistema de checkout.

## Características Principales

- **Catálogo de Productos**: Visualización de productos con filtros por categoría
- **Carrito de Compras**: Funcionalidad completa de agregar, modificar y eliminar productos
- **Sistema de Checkout**: Proceso de compra simulado con generación de órdenes
- **Diseño Responsivo**: Compatible con dispositivos móviles y desktop
- **API REST**: Backend en PHP para gestión de productos y órdenes

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vainilla
- **Backend**: PHP 8.1
- **Almacenamiento**: LocalStorage para carrito, datos simulados en PHP
- **Servidor**: PHP Built-in Server

## Estructura del Proyecto

```
mascotopia/
├── public/
│   ├── index.php          # Página principal
│   ├── productos.php      # Catálogo de productos
│   └── carrito.php        # Carrito de compras
├── src/
│   ├── php/
│   │   └── api.php        # API REST en PHP
│   ├── js/
│   │   ├── main.js        # JavaScript principal
│   │   ├── products.js    # Lógica de productos
│   │   └── cart.js        # Lógica del carrito
│   └── css/
│       └── style.css      # Estilos principales
├── assets/
│   └── images/
│       └── logo_mascotopia.jpeg  # Logo de la marca
└── README.md
```

## Instalación y Configuración

### Requisitos Previos

- Servidor web (Apache, Nginx) con soporte PHP 8.1 o superior.
- Base de datos (opcional, para futuras mejoras).

### Despliegue Manual

1. **Descarga el proyecto**: Descarga el archivo ZIP proporcionado y descomprímelo en tu máquina local.

2. **Sube los archivos al servidor**: Copia todo el contenido de la carpeta `mascotopia/` (incluyendo `public/`, `src/`, `assets/`, `README.md`, `todo.md`) a la raíz de tu servidor web (por ejemplo, `htdocs` para Apache o `html` para Nginx).

3. **Configura tu servidor web**: Asegúrate de que tu servidor web esté configurado para servir archivos PHP desde el directorio `public/`.
   - **Para Apache**: Puedes usar un archivo `.htaccess` en el directorio `public/` con la siguiente configuración:
     ```apache
     <IfModule mod_rewrite.c>
         RewriteEngine On
         RewriteCond %{REQUEST_FILENAME} !-f
         RewriteCond %{REQUEST_FILENAME} !-d
         RewriteRule ^(.*)$ index.php/$1 [L]
     </IfModule>
     ```
     O configura el `DocumentRoot` de tu Virtual Host para que apunte directamente a la carpeta `public/`.
   - **Para Nginx**: Configura tu bloque `server` para que el `root` apunte a la carpeta `public/` y procese los archivos PHP:
     ```nginx
     server {
         listen 80;
         server_name your_domain.com;
         root /path/to/your/mascotopia/public;

         index index.php index.html index.htm;

         location / {
             try_files $uri $uri/ /index.php?$query_string;
         }

         location ~ \.php$ {
             include snippets/fastcgi-php.conf;
             fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; # Ajusta la versión de PHP-FPM
             fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
             include fastcgi_params;
         }
     }
     ```

4. **Accede al sitio**: Una vez configurado el servidor, podrás acceder al sitio web desde tu navegador utilizando la URL de tu dominio (por ejemplo, `http://your_domain.com`).

## Uso del Sistema

### Navegación Principal

- **Inicio**: Página principal con información de bienvenida
- **Productos**: Catálogo completo con filtros por categoría
- **Carrito**: Gestión de productos seleccionados
- **Contacto**: Información de contacto (pendiente de implementar)

### Funcionalidades del Carrito

1. **Agregar Productos**: Desde la página de productos, haz clic en "Agregar al Carrito"
2. **Modificar Cantidades**: En el carrito, usa los botones + y - para ajustar cantidades
3. **Eliminar Productos**: Botón "Eliminar" para quitar productos del carrito
4. **Checkout**: Botón "Proceder al Checkout" para finalizar la compra

### API Endpoints

La API REST está disponible en `/src/php/api.php` con los siguientes endpoints:

- `GET /api.php/products` - Obtener todos los productos
- `GET /api.php/products?category=alimento` - Filtrar por categoría
- `GET /api.php/products/1` - Obtener producto específico
- `GET /api.php/categories` - Obtener categorías disponibles
- `POST /api.php/orders` - Crear nueva orden

## Características Técnicas

### Frontend

- **Diseño Responsivo**: Grid CSS y Flexbox para adaptabilidad
- **JavaScript Modular**: Separación de lógica por funcionalidades
- **LocalStorage**: Persistencia del carrito entre sesiones
- **Fetch API**: Comunicación asíncrona con el backend

### Backend

- **PHP Puro**: Sin frameworks, implementación nativa
- **Datos Simulados**: Array en memoria para productos
- **CORS Habilitado**: Permite peticiones desde cualquier origen
- **Routing Simple**: Manejo básico de rutas RESTful

### Seguridad

- **Validación de Datos**: Verificación de entrada en formularios
- **Headers de Seguridad**: CORS y Content-Type apropiados
- **Sanitización**: Escape de datos en salida HTML

## Paleta de Colores

- **Color Principal**: #FF6B35 (Naranja vibrante para acción y entusiasmo)
- **Color Secundario**: #4A90E2 (Azul confiable para estabilidad)
- **Color Acento**: #FFD700 (Amarillo dorado para optimismo y calidez)
- **Color Texto Oscuro**: #333333
- **Color Texto Claro**: #FFFFFF
- **Color Fondo Sólido**: #F0F2F5 (Gris claro para un fondo limpio)
- **Color Fondo Tarjeta**: #FFFFFF
- **Color Borde**: #DDDDDD

## Próximas Mejoras

- [ ] Página de contacto funcional
- [ ] Sistema de autenticación de usuarios
- [ ] Base de datos real (MySQL/PostgreSQL)
- [ ] Integración con pasarela de pagos real
- [ ] Panel de administración
- [ ] Sistema de inventario
- [ ] Notificaciones por email
- [ ] Búsqueda de productos
- [ ] Reseñas y calificaciones

## Soporte y Contacto

Para soporte técnico o consultas sobre el proyecto, contacta al desarrollador.

## Licencia

© 2025 Mascotopia. Todos los derechos reservados.

