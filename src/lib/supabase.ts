import { createClient } from '@supabase/supabase-js';
import { Game } from './data';

const supabaseUrl = 'https://ccfyuybdkrunzidptxou.supabase.co';
const supabaseAnonKey = 'sb_publishable_LZ4Rnf7AvtzM4Z-t-ALDdQ_SUVLLJEd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: string;
  platform: string;
  rating: number;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

// UI Mapping Helpers
export function mapProductToGame(product: Record<string, unknown>): Game {
  const name = String(product.name || 'Juego Desconocido');
  const platform = String(product.platform || 'Multi');
  const categoryName = String(product.category_name || 'Juego');
  const description = String(product.description || '');
  const price = Number(product.price) || 0;
  const rating = Number(product.rating) || 4.5;

  // Generate stable colors based on name if not provided
  const hash = name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const colors = [
    { from: '#1a0505', to: '#8b1a1a' },
    { from: '#0a0a1a', to: '#3a1a6e' },
    { from: '#1a0a1a', to: '#7b1fa2' },
    { from: '#0a1a0a', to: '#2e7d32' },
    { from: '#0a0a1a', to: '#0d47a1' }
  ];
  const color = colors[hash % colors.length];

  return {
    slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
    title: name,
    platform: platform as 'PS5' | 'Xbox' | 'Nintendo' | 'PC' | 'Multi',
    genre: categoryName,
    price: price,
    description: description,
    gradFrom: color.from,
    gradTo: color.to,
    gradAngle: 135 + (hash % 45),
    rating: rating,
    reviewCount: (hash * 7) % 1000,
    esrb: 'T',
    releaseYear: 2024,
    image: String(product.image_url || '')
  };
}

export async function getProducts(options: { category?: string; limit?: number } = {}): Promise<Game[]> {
  let query = supabase
    .from('ga_products')
    .select('*, ga_categories(name)');
  
  if (options.category) {
    query = query.eq('ga_categories.name', options.category);
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  
  const productsWithCategory = (data || []).map(p => {
    const category = (p as { ga_categories?: { name: string } }).ga_categories;
    return {
      ...p,
      category_name: category ? category.name : null
    };
  });

  return productsWithCategory.map(p => mapProductToGame(p as Record<string, unknown>));
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('ga_categories').select('*');
  if (error) throw error;
  return data || [];
}
