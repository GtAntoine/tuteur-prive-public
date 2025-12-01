/*
  # Add Report Issue Feature
  
  1. New Tables
    - `history_reports`
      - `id` (uuid, primary key)
      - `history_id` (uuid, references user_history)
      - `user_id` (uuid, references auth.users)
      - `message` (text, optional)
      - `created_at` (timestamp)
      - `status` (text) - 'pending', 'resolved', 'rejected'
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS history_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  history_id uuid REFERENCES user_history(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(history_id, user_id)
);

ALTER TABLE history_reports ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own reports
CREATE POLICY "Users can read own reports"
  ON history_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create reports
CREATE POLICY "Users can create reports"
  ON history_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);