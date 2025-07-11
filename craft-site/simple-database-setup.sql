-- Simple profiles table setup
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  is_seller BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  shop_name TEXT,
  shop_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table for storing user listings
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  image_url TEXT,
  video_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Simple policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Policies for products table
CREATE POLICY "Users can view all active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Sellers can view their own products" ON products
  FOR SELECT USING (auth.uid()::text = seller_id::text);

CREATE POLICY "Sellers can insert their own products" ON products
  FOR INSERT WITH CHECK (auth.uid()::text = seller_id::text);

CREATE POLICY "Sellers can update their own products" ON products
  FOR UPDATE USING (auth.uid()::text = seller_id::text);

CREATE POLICY "Sellers can delete their own products" ON products
  FOR DELETE USING (auth.uid()::text = seller_id::text);

-- Create profiles for existing users (run this after creating the table)
-- INSERT INTO profiles (id, email)
-- SELECT id, email FROM auth.users
-- WHERE id NOT IN (SELECT id FROM profiles); 