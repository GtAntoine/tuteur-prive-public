/*
  # Add missing Stripe policies

  1. Changes
    - Add missing INSERT and UPDATE policies for customers table
    - Add missing INSERT and UPDATE policies for subscriptions table
    
  2. Security
    - Ensure users can only modify their own data
    - Maintain existing RLS policies
*/

-- Add missing policies for customers table
CREATE POLICY "Allow users to insert own customer data"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own customer data"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add missing policies for subscriptions table
CREATE POLICY "Allow users to insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);