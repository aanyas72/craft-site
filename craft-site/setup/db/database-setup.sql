-- Create profiles table for storing user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
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
  similar_product_ids UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING ((select auth.uid()) = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK ((select auth.uid()) = id);

-- Create policies for products table
CREATE POLICY "Users can view active or their own products" ON products
  FOR SELECT USING (
    is_active = true OR (select auth.uid()) = seller_id
  );

CREATE POLICY "Sellers can view their own products" ON products
  FOR SELECT USING ((select auth.uid()) = seller_id);

CREATE POLICY "Sellers can insert their own products" ON products
  FOR INSERT WITH CHECK ((select auth.uid()) = seller_id);

CREATE POLICY "Sellers can update their own products" ON products
  FOR UPDATE USING ((select auth.uid()) = seller_id);

CREATE POLICY "Sellers can delete their own products" ON products
  FOR DELETE USING ((select auth.uid()) = seller_id);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
   SET search_path = public, auth;

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id); 