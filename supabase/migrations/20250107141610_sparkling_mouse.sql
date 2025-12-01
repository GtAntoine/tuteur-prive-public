-- Drop and recreate function to handle token resets with improved logic
CREATE OR REPLACE FUNCTION handle_token_reset()
RETURNS TRIGGER AS $$
BEGIN
  -- Only reset to 3 tokens if current amount is less than 3 and last reset was more than 24h ago
  IF OLD.tokens_remaining < 3 AND OLD.last_reset_date < NOW() - INTERVAL '24 hours' THEN
    NEW.tokens_remaining := 3;
    NEW.last_reset_date := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;