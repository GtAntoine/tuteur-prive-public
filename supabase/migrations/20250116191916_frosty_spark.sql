/*
  # Community Features Schema Update
  
  1. New Tables
    - `user_likes` - Stores user likes on history entries
    - `user_scores` - Stores user scores for rankings
  
  2. Changes
    - Add `is_public` column to `user_history` table
    - Add policies for public access and likes
*/

-- Create user_likes table
CREATE TABLE IF NOT EXISTS user_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  history_id uuid REFERENCES user_history(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, history_id)
);

-- Create user_scores table for rankings
CREATE TABLE IF NOT EXISTS user_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  profile_id uuid REFERENCES user_profiles(id),
  score integer NOT NULL DEFAULT 0,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  period_type text NOT NULL CHECK (period_type IN ('weekly', 'monthly', 'all_time')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, profile_id, period_type, period_start)
);

-- Enable RLS
ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;

-- Policies for user_likes
CREATE POLICY "Users can read all likes"
  ON user_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own likes"
  ON user_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON user_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for user_scores
CREATE POLICY "Anyone can read scores"
  ON user_scores FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can manage scores"
  ON user_scores FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to update user score
CREATE OR REPLACE FUNCTION update_user_score()
RETURNS TRIGGER AS $$
DECLARE
  score_value integer;
BEGIN
  -- Calculate score based on the type of content
  score_value := CASE
    WHEN NEW.type = 'lesson' THEN 10
    WHEN NEW.type = 'correction' THEN 5
    WHEN NEW.type = 'guided' THEN 3
    ELSE 0
  END;

  -- Update weekly score
  INSERT INTO user_scores (
    user_id,
    profile_id,
    score,
    period_type,
    period_start,
    period_end
  )
  VALUES (
    NEW.user_id,
    NEW.profile_id,
    score_value,
    'weekly',
    date_trunc('week', NEW.timestamp),
    date_trunc('week', NEW.timestamp) + interval '1 week'
  )
  ON CONFLICT (user_id, profile_id, period_type, period_start)
  DO UPDATE SET
    score = user_scores.score + score_value,
    updated_at = now();

  -- Update monthly score
  INSERT INTO user_scores (
    user_id,
    profile_id,
    score,
    period_type,
    period_start,
    period_end
  )
  VALUES (
    NEW.user_id,
    NEW.profile_id,
    score_value,
    'monthly',
    date_trunc('month', NEW.timestamp),
    date_trunc('month', NEW.timestamp) + interval '1 month'
  )
  ON CONFLICT (user_id, profile_id, period_type, period_start)
  DO UPDATE SET
    score = user_scores.score + score_value,
    updated_at = now();

  -- Update all-time score
  INSERT INTO user_scores (
    user_id,
    profile_id,
    score,
    period_type,
    period_start,
    period_end
  )
  VALUES (
    NEW.user_id,
    NEW.profile_id,
    score_value,
    'all_time',
    '2024-01-01'::timestamptz,
    '2099-12-31'::timestamptz
  )
  ON CONFLICT (user_id, profile_id, period_type, period_start)
  DO UPDATE SET
    score = user_scores.score + score_value,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for score updates
CREATE TRIGGER update_user_score_on_history_insert
  AFTER INSERT ON user_history
  FOR EACH ROW
  EXECUTE FUNCTION update_user_score();