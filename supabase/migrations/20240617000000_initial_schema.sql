-- Drop existing tables if they exist (in reverse order of dependencies)
-- Using CASCADE to also drop dependent objects
DROP TABLE IF EXISTS coupon_clicks CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS referrals CASCADE; -- Added this table since it depends on categories
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create stores table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  discount_value NUMERIC DEFAULT 0,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')),
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  url TEXT NOT NULL
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupon_clicks table for analytics
CREATE TABLE coupon_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Fashion', 'fashion', 'Clothing, shoes, accessories, and more'),
('Electronics', 'electronics', 'Computers, phones, TVs, and other electronic devices'),
('Food & Dining', 'food-dining', 'Restaurants, food delivery, and grocery stores'),
('Travel', 'travel', 'Hotels, flights, car rentals, and vacation packages'),
('Health & Beauty', 'health-beauty', 'Skincare, makeup, vitamins, and wellness products'),
('Home & Garden', 'home-garden', 'Furniture, decor, appliances, and gardening supplies');

-- Insert sample stores
INSERT INTO stores (name, logo_url, website, description, slug) VALUES
('Amazon', 'https://logo.clearbit.com/amazon.com', 'https://amazon.com', 'Online retailer of books, movies, music and games, electronics, toys, clothing, and more', 'amazon'),
('Walmart', 'https://logo.clearbit.com/walmart.com', 'https://walmart.com', 'Retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores', 'walmart'),
('Target', 'https://logo.clearbit.com/target.com', 'https://target.com', 'General merchandise retailer with stores in all 50 U.S. states', 'target'),
('Best Buy', 'https://logo.clearbit.com/bestbuy.com', 'https://bestbuy.com', 'Electronics and appliance retailer', 'best-buy'),
('Nike', 'https://logo.clearbit.com/nike.com', 'https://nike.com', 'Athletic footwear, apparel, equipment, accessories, and services', 'nike'),
('Uber Eats', 'https://logo.clearbit.com/ubereats.com', 'https://ubereats.com', 'Food delivery service', 'uber-eats');

-- Insert sample coupons
INSERT INTO coupons (title, description, code, discount_value, discount_type, expiry_date, store_id, category_id, is_verified, is_featured, url) VALUES
('20% Off Electronics', 'Get 20% off on all electronics', 'TECH20', 20, 'percentage', NOW() + INTERVAL '30 days', (SELECT id FROM stores WHERE slug = 'amazon'), (SELECT id FROM categories WHERE slug = 'electronics'), true, true, 'https://amazon.com'),
('$10 Off Your First Order', 'Get $10 off your first order over $50', 'FIRST10', 10, 'fixed', NOW() + INTERVAL '60 days', (SELECT id FROM stores WHERE slug = 'walmart'), (SELECT id FROM categories WHERE slug = 'food-dining'), true, true, 'https://walmart.com'),
('Free Shipping', 'Free shipping on all orders over $35', 'FREESHIP', 0, 'fixed', NOW() + INTERVAL '45 days', (SELECT id FROM stores WHERE slug = 'target'), (SELECT id FROM categories WHERE slug = 'fashion'), true, false, 'https://target.com'),
('Buy One Get One Free', 'Buy one item, get another of equal or lesser value for free', 'BOGO', 0, 'fixed', NOW() + INTERVAL '15 days', (SELECT id FROM stores WHERE slug = 'best-buy'), (SELECT id FROM categories WHERE slug = 'electronics'), false, true, 'https://bestbuy.com'),
('30% Off Footwear', 'Get 30% off all footwear', 'SHOES30', 30, 'percentage', NOW() + INTERVAL '20 days', (SELECT id FROM stores WHERE slug = 'nike'), (SELECT id FROM categories WHERE slug = 'fashion'), true, true, 'https://nike.com'),
('$5 Off Delivery', 'Get $5 off your delivery fee', 'DELIVER5', 5, 'fixed', NOW() + INTERVAL '10 days', (SELECT id FROM stores WHERE slug = 'uber-eats'), (SELECT id FROM categories WHERE slug = 'food-dining'), true, false, 'https://ubereats.com');

-- Create RLS policies
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for stores" ON stores FOR SELECT USING (true);
CREATE POLICY "Allow public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access for coupons" ON coupons FOR SELECT USING (true);

-- Create policies for authenticated insert access
CREATE POLICY "Allow authenticated insert for newsletter_subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated insert for coupon_clicks" ON coupon_clicks FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_coupons_store_id ON coupons(store_id);
CREATE INDEX idx_coupons_category_id ON coupons(category_id);
CREATE INDEX idx_coupons_is_featured ON coupons(is_featured);
CREATE INDEX idx_coupons_created_at ON coupons(created_at);
CREATE INDEX idx_stores_slug ON stores(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
