-- First drop all existing policies for user_scores
DROP POLICY IF EXISTS "Users can insert own scores" ON user_scores;
DROP POLICY IF EXISTS "Users can update own scores" ON user_scores;
DROP POLICY IF EXISTS "Anyone can read scores" ON user_scores;
DROP POLICY IF EXISTS "Service role can manage all scores" ON user_scores;
DROP POLICY IF EXISTS "System can manage scores" ON user_scores;

-- Create new unified policies
CREATE POLICY "Users can read all scores"
  ON user_scores FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own scores"
  ON user_scores
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role has full access"
  ON user_scores
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;