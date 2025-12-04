import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/products';

// GET /api/categories - Lista todas las categorías
export async function GET() {
  try {
    const categories = getCategories();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
