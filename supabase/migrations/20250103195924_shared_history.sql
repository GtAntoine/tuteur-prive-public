-- supabase/migrations/20250103195924_shared_history.sql
ALTER TABLE user_history ADD COLUMN is_public BOOLEAN DEFAULT false;
ALTER TABLE user_history ADD COLUMN shared_at TIMESTAMPTZ;

-- Permettre l'accès public aux entrées partagées
CREATE POLICY "Anyone can read public history entries"
  ON user_history FOR SELECT
  USING (is_public = true);
