import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/products';

// GET /api/products/[id] - Obtiene un producto específico
export async function GET(request, { params }) {
  try {
    const product = getProductById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
