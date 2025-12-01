-- Create tokens table
CREATE TABLE account_tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  tokens_remaining integer NOT NULL DEFAULT 3,
  last_reset_date timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE account_tokens ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Users can read own tokens"
  ON account_tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON account_tokens FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens"
  ON account_tokens FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create trigger function
CREATE OR REPLACE FUNCTION create_account_tokens()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO account_tokens (user_id, tokens_remaining)
  VALUES (NEW.id, 3);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_account_tokens();