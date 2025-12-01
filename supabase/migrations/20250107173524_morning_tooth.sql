-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS initialize_user_tokens();

-- Create improved function with better error handling and validation
CREATE OR REPLACE FUNCTION initialize_user_tokens()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate input
  IF NEW.id IS NULL THEN
    RAISE EXCEPTION 'User ID cannot be null';
  END IF;

  -- Use transaction to ensure atomicity
  BEGIN
    -- Check if tokens already exist to avoid duplicates
    IF NOT EXISTS (SELECT 1 FROM account_tokens WHERE user_id = NEW.id) THEN
      INSERT INTO account_tokens (
        user_id,
        tokens_remaining,
        last_reset_date,
        updated_at
      ) VALUES (
        NEW.id,
        30, -- Initial tokens
        NOW(),
        NOW()
      );
    END IF;

    -- Verify insertion
    IF NOT EXISTS (SELECT 1 FROM account_tokens WHERE user_id = NEW.id) THEN
      RAISE EXCEPTION 'Failed to initialize tokens for user %', NEW.id;
    END IF;

  EXCEPTION
    WHEN unique_violation THEN
      -- Handle race condition gracefully
      NULL;
    WHEN OTHERS THEN
      -- Log error details but allow user creation to proceed
      RAISE WARNING 'Error initializing tokens for user %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger with AFTER INSERT to ensure user exists
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_tokens();

-- Add index to improve performance
CREATE INDEX IF NOT EXISTS idx_account_tokens_user_id 
  ON account_tokens(user_id);

-- Add constraint to ensure tokens_remaining is not negative
ALTER TABLE account_tokens 
  ADD CONSTRAINT check_tokens_remaining_not_negative 
  CHECK (tokens_remaining >= 0);