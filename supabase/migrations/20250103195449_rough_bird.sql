/*
  # Add selected profile table

  1. New Table
    - `user_selected_profile`
      - `user_id` (uuid, primary key, references auth.users)
      - `profile_id` (uuid, references user_profiles)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS user_selected_profile (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  profile_id uuid REFERENCES user_profiles(id),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_selected_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own selected profile"
  ON user_selected_profile FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own selected profile"
  ON user_selected_profile FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own selected profile"
  ON user_selected_profile FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);