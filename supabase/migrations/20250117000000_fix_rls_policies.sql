-- Drop existing RLS policies for user_scores
DROP POLICY IF EXISTS "Anyone can read scores" ON user_scores;
DROP POLICY IF EXISTS "System can manage scores" ON user_scores;

-- Create new RLS policies for user_scores
CREATE POLICY "Anyone can read scores"
  ON user_scores FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own scores"
  ON user_scores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scores"
  ON user_scores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add policy for service role
CREATE POLICY "Service role can manage all scores"
  ON user_scores
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;
