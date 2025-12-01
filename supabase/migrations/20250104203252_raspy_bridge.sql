-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own reports" ON history_reports;
DROP POLICY IF EXISTS "Users can create reports" ON history_reports;

-- Allow users to read their own reports
CREATE POLICY "Users can read own reports"
  ON history_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create reports
CREATE POLICY "Users can create reports"
  ON history_reports FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id OR
    auth.uid() IS NOT NULL -- Allow any authenticated user to create reports
  );

-- Add default value for user_id
ALTER TABLE history_reports 
ALTER COLUMN user_id SET DEFAULT auth.uid();