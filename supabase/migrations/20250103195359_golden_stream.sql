/*
  # Add user data tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `grade` (text)
      - `avatar_color` (text)
      - `avatar_id` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `profile_id` (uuid, references user_profiles)
      - `type` (text)
      - `data` (jsonb)
      - `images` (text[])
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  grade text NOT NULL,
  avatar_color text NOT NULL,
  avatar_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create history table
CREATE TABLE IF NOT EXISTS user_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  profile_id uuid REFERENCES user_profiles(id),
  type text NOT NULL,
  data jsonb NOT NULL,
  images text[] NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Add RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can read own profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profiles"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for user_history
CREATE POLICY "Users can read own history"
  ON user_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON user_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own history"
  ON user_history FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);