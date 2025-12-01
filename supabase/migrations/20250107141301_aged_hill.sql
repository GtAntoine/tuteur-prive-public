-- Create tokens table if it doesn't exist
CREATE TABLE IF NOT EXISTS account_tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  tokens_remaining integer NOT NULL DEFAULT 30,
  last_reset_date timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
    AND c.relname = 'account_tokens'
    AND c.relrowsecurity = true
  ) THEN
    ALTER TABLE account_tokens ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own tokens" ON account_tokens;
DROP POLICY IF EXISTS "Users can update own tokens" ON account_tokens;
DROP POLICY IF EXISTS "Users can insert own tokens" ON account_tokens;

-- Recreate policies
CREATE POLICY "Users can read own tokens" 
  ON account_tokens 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens" 
  ON account_tokens 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens" 
  ON account_tokens 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Drop existing functions and triggers if they exist
DROP TRIGGER IF EXISTS check_token_reset ON account_tokens;
DROP FUNCTION IF EXISTS handle_token_reset();
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS initialize_user_tokens();

-- Recreate function to handle token resets
CREATE OR REPLACE FUNCTION handle_token_reset()
RETURNS TRIGGER AS $$
BEGIN
  -- If last reset was more than 24 hours ago, reset tokens
  IF OLD.last_reset_date < NOW() - INTERVAL '24 hours' THEN
    NEW.tokens_remaining := 3;
    NEW.last_reset_date := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger for token resets
CREATE TRIGGER check_token_reset
  BEFORE UPDATE ON account_tokens
  FOR EACH ROW
  EXECUTE FUNCTION handle_token_reset();

-- Recreate function to initialize tokens for new users
CREATE OR REPLACE FUNCTION initialize_user_tokens()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO account_tokens (user_id, tokens_remaining)
  VALUES (NEW.id, 30)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger for new user initialization
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_tokens();

-- Initialize tokens for existing users who don't have them yet
INSERT INTO account_tokens (user_id, tokens_remaining)
SELECT id, 30
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM account_tokens)
ON CONFLICT (user_id) DO NOTHING;