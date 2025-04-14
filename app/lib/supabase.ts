import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgzkmcsoekyuhqavrhno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemttY3NvZWt5dWhxYXZyaG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTk0NzIsImV4cCI6MjA1OTg3NTQ3Mn0.nz4ueg3g_w-uDg8ttB_y2Ch67QNu6Z-hs9yPDosArz8';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Coupon = {
  id: string;
  title: string;
  description: string;
  code: string;
  discount_value: number;
  discount_type: 'percentage' | 'fixed';
  expiry_date: string;
  store_id: string;
  category_id: string;
  created_at: string;
  is_verified: boolean;
  is_featured: boolean;
  url: string;
};

export type Store = {
  id: string;
  name: string;
  logo_url: string;
  website: string;
  description: string;
  created_at: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
};

export async function getStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
  
  return data || [];
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching store:', error);
    return null;
  }
  
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }
  
  return data;
}

export async function getCoupons(limit = 20): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching coupons:', error);
    return [];
  }
  
  return data || [];
}

export async function getFeaturedCoupons(limit = 6): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching featured coupons:', error);
    return [];
  }
  
  return data || [];
}

export async function getCouponsByStore(storeId: string): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching store coupons:', error);
    return [];
  }
  
  return data || [];
}

export async function getCouponsByCategory(categoryId: string): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching category coupons:', error);
    return [];
  }
  
  return data || [];
}

export async function searchCoupons(query: string): Promise<Coupon[]> {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .ilike('title', `%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error searching coupons:', error);
    return [];
  }
  
  return data || [];
}
