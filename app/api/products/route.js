import { NextResponse } from 'next/server';
import { getProducts, getCategories } from '@/lib/products';

// GET /api/products - Lista todos los productos o filtra por categoría
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const products = getProducts(category);
    
    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
