/*
  # Create subscription tables

  1. New Tables
    - subscriptions: Stores user subscription data
    - prices: Stores Stripe price information
    - products: Stores Stripe product information
    - customers: Stores Stripe customer information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users for products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- Create prices table
CREATE TABLE IF NOT EXISTS prices (
  id text PRIMARY KEY,
  product_id text REFERENCES products(id),
  active boolean,
  description text,
  unit_amount bigint,
  currency text,
  type text,
  interval text,
  interval_count integer,
  metadata jsonb
);

ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users for prices"
  ON prices FOR SELECT
  TO authenticated
  USING (true);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  email text,
  metadata jsonb
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read own customer data"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  status text,
  metadata jsonb,
  price_id text REFERENCES prices(id),
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  ended_at timestamp with time zone,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);