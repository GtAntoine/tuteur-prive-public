/*
  # Add tokens column to products table

  1. Changes
    - Add tokens column to products table
    - Update existing products with token values
  
  2. Notes
    - Non-destructive change
    - Maintains existing data
*/

-- Add tokens column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'tokens'
  ) THEN
    ALTER TABLE products ADD COLUMN tokens INTEGER;
  END IF;
END $$;

-- Update existing products with token values
UPDATE products 
SET tokens = CASE 
  WHEN id = 'prod_RXOFSP48PxGKWN' THEN 100  -- Produit test
  ELSE 0
END
WHERE tokens IS NULL;