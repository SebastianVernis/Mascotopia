<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Simulación de base de datos en memoria
$products = [
    [
        'id' => 1,
        'name' => 'Alimento para Perros Premium',
        'price' => 299.99,
        'description' => 'Alimento balanceado para perros adultos con ingredientes naturales.',
        'image' => 'https://via.placeholder.com/300x300?text=Alimento+Perros',
        'category' => 'alimento',
        'stock' => 50
    ],
    [
        'id' => 2,
        'name' => 'Juguete para Gatos',
        'price' => 89.99,
        'description' => 'Juguete interactivo para mantener a tu gato entretenido.',
        'image' => 'https://via.placeholder.com/300x300?text=Juguete+Gatos',
        'category' => 'juguetes',
        'stock' => 25
    ],
    [
        'id' => 3,
        'name' => 'Collar Ajustable',
        'price' => 149.99,
        'description' => 'Collar ajustable y cómodo para perros de todas las tallas.',
        'image' => 'https://via.placeholder.com/300x300?text=Collar',
        'category' => 'accesorios',
        'stock' => 30
    ],
    [
        'id' => 4,
        'name' => 'Alimento para Gatos',
        'price' => 249.99,
        'description' => 'Alimento premium para gatos con sabor a salmón.',
        'image' => 'https://via.placeholder.com/300x300?text=Alimento+Gatos',
        'category' => 'alimento',
        'stock' => 40
    ],
    [
        'id' => 5,
        'name' => 'Cama para Mascotas',
        'price' => 399.99,
        'description' => 'Cama suave y cómoda para el descanso de tu mascota.',
        'image' => 'https://via.placeholder.com/300x300?text=Cama+Mascotas',
        'category' => 'accesorios',
        'stock' => 15
    ],
    [
        'id' => 6,
        'name' => 'Snacks para Perros',
        'price' => 79.99,
        'description' => 'Deliciosos snacks naturales para premiar a tu perro.',
        'image' => 'https://via.placeholder.com/300x300?text=Snacks+Perros',
        'category' => 'alimento',
        'stock' => 60
    ]
];

// Obtener método HTTP
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));

// Routing básico
switch ($method) {
    case 'GET':
        if (empty($request[0])) {
            // GET /api.php - Obtener todos los productos
            echo json_encode(['success' => true, 'data' => $products]);
        } elseif ($request[0] === 'products') {
            if (isset($request[1]) && is_numeric($request[1])) {
                // GET /api.php/products/1 - Obtener producto específico
                $productId = intval($request[1]);
                $product = array_filter($products, function($p) use ($productId) {
                    return $p['id'] === $productId;
                });
                
                if ($product) {
                    echo json_encode(['success' => true, 'data' => array_values($product)[0]]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
                }
            } else {
                // GET /api.php/products - Obtener todos los productos
                $category = $_GET['category'] ?? null;
                $filteredProducts = $products;
                
                if ($category) {
                    $filteredProducts = array_filter($products, function($p) use ($category) {
                        return $p['category'] === $category;
                    });
                }
                
                echo json_encode(['success' => true, 'data' => array_values($filteredProducts)]);
            }
        } elseif ($request[0] === 'categories') {
            // GET /api.php/categories - Obtener categorías
            $categories = array_unique(array_column($products, 'category'));
            echo json_encode(['success' => true, 'data' => $categories]);
        }
        break;
        
    case 'POST':
        if ($request[0] === 'orders') {
            // POST /api.php/orders - Crear nueva orden
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['items']) || !isset($input['customer'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
                break;
            }
            
            // Simular creación de orden
            $orderId = rand(1000, 9999);
            $total = 0;
            
            foreach ($input['items'] as $item) {
                $product = array_filter($products, function($p) use ($item) {
                    return $p['id'] === $item['id'];
                });
                
                if ($product) {
                    $product = array_values($product)[0];
                    $total += $product['price'] * $item['quantity'];
                }
            }
            
            $order = [
                'id' => $orderId,
                'customer' => $input['customer'],
                'items' => $input['items'],
                'total' => $total,
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            echo json_encode(['success' => true, 'data' => $order]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Método no permitido']);
        break;
}
?>

