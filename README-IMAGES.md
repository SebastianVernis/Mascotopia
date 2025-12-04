# Generación de Imágenes con Blackbox AI

Este proyecto utiliza el endpoint de generación de imágenes de Blackbox AI para crear imágenes profesionales de todos los productos del catálogo.

## 🤖 Modelo Utilizado

**Flux Pro** (`blackboxai/black-forest-labs/flux-pro`)
- Mejor calidad disponible en Blackbox AI
- Alta resolución
- Fotorrealismo profesional
- Ideal para imágenes de productos

## 📋 Requisitos Previos

1. **API Key de Blackbox AI**
   - Regístrate en [Blackbox AI](https://www.blackbox.ai)
   - Obtén tu API key desde el [Dashboard](https://www.blackbox.ai/dashboard)

2. **Dependencias instaladas**
   ```bash
   npm install
   ```

## ⚙️ Configuración

1. Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y agrega tu API key:
   ```env
   BLACKBOX_API_KEY=bb_tu_api_key_aqui
   ```

## 🚀 Uso

### Generar todas las imágenes del catálogo

```bash
node scripts/generate-product-images.js
```

Este comando:
- ✅ Genera imágenes para los 6 productos del catálogo
- ✅ Descarga y guarda las imágenes en `public/images/products/`
- ✅ Crea un reporte en `public/images/generation-report.json`
- ✅ Muestra progreso en tiempo real

### Productos incluidos

1. **Alimento para Perros Premium** - `product-1.jpg`
2. **Juguete para Gatos** - `product-2.jpg`
3. **Collar Ajustable** - `product-3.jpg`
4. **Alimento para Gatos** - `product-4.jpg`
5. **Cama para Mascotas** - `product-5.jpg`
6. **Shampoo para Perros** - `product-6.jpg`

## 📁 Estructura de Archivos

```
/
├── scripts/
│   └── generate-product-images.js    # Script de generación
├── public/
│   └── images/
│       ├── products/                 # Imágenes generadas
│       │   ├── product-1.jpg
│       │   ├── product-2.jpg
│       │   └── ...
│       └── generation-report.json    # Reporte de generación
├── .env                              # Variables de entorno (no committed)
└── .env.example                      # Ejemplo de configuración
```

## 🎨 Características de los Prompts

Cada producto tiene un prompt optimizado que incluye:
- **Estilo**: Fotografía profesional de producto
- **Calidad**: Alta resolución (8k)
- **Fondo**: Limpio y profesional
- **Iluminación**: Comercial/estudio
- **Detalles**: Específicos del producto

## 📊 Reporte de Generación

El archivo `generation-report.json` contiene:

```json
[
  {
    "id": 1,
    "name": "Alimento para Perros Premium",
    "success": true,
    "imageUrl": "https://...",
    "localPath": "/images/products/product-1.jpg"
  },
  // ...
]
```

## 🔧 Personalización

### Modificar prompts

Edita el array `products` en `scripts/generate-product-images.js`:

```javascript
{
  id: 1,
  name: 'Nombre del Producto',
  imagePrompt: 'Tu prompt personalizado aquí...'
}
```

### Cambiar modelo

Modifica la constante `IMAGE_MODEL`:

```javascript
const IMAGE_MODEL = 'blackboxai/black-forest-labs/flux-pro'; // Mejor calidad
// const IMAGE_MODEL = 'blackboxai/stable-diffusion-xl';      // Alternativa
```

### Ajustar delay entre peticiones

Modifica el timeout en la línea:

```javascript
await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos
```

## 🛠️ Integración con el Catálogo

Para usar las imágenes generadas en tu aplicación, actualiza `lib/products.js`:

```javascript
export const products = [
  {
    id: 1,
    name: 'Alimento para Perros Premium',
    image: '/images/products/product-1.jpg', // ← Ruta local
    // ...
  },
  // ...
];
```

## 🌐 API Endpoint

El script usa el endpoint de Blackbox AI:

```javascript
POST https://api.blackbox.ai/chat/completions
```

**Request:**
```json
{
  "model": "blackboxai/black-forest-labs/flux-pro",
  "messages": [
    {
      "role": "user",
      "content": "Descripción de la imagen"
    }
  ]
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "content": "https://url-de-la-imagen-generada.jpg"
      }
    }
  ]
}
```

## 📚 Recursos

- [Documentación Blackbox AI](https://docs.blackbox.ai)
- [Modelos de Imagen](https://docs.blackbox.ai/api-reference/models/image-models)
- [API Reference](https://docs.blackbox.ai/api-reference/image)

## ⚠️ Consideraciones

- **Rate Limiting**: El script incluye delays entre peticiones
- **Costos**: Consulta precios en el dashboard de Blackbox AI
- **Almacenamiento**: Las imágenes se guardan localmente
- **URLs temporales**: Las URLs generadas pueden expirar

## 🐛 Troubleshooting

### Error: "Invalid or missing API key"
- Verifica que tu `.env` tenga la API key correcta
- Asegúrate de que la key empiece con `bb_`

### Error: "fetch is not defined" (Node < 18)
- Actualiza Node.js a v18 o superior
- O instala: `npm install node-fetch`

### Imágenes no se descargan
- Verifica conexión a internet
- Chequea permisos de escritura en `public/images/`

## 📝 Notas

- Las imágenes son generadas con IA y pueden no ser perfectas
- Puedes regenerar imágenes individuales modificando el array
- El reporte JSON te permite trackear qué imágenes se generaron correctamente
