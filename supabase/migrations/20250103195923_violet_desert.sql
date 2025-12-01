/*
  # Add storage bucket for user images

  1. Create Bucket
    - Create a new storage bucket for user images
    - Set up public access policies
*/

-- Create bucket for user images
INSERT INTO storage.buckets (id, name, public)
VALUES ('user_images', 'user_images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'user_images' AND
    auth.uid() = owner
  );

-- Allow authenticated users to read their own images
CREATE POLICY "Users can read own images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'user_images' AND
    auth.uid() = owner
  );

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'user_images' AND
    auth.uid() = owner
  );