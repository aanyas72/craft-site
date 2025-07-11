-- Create storage bucket for product videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-videos',
  'product-videos',
  true,
  52428800, -- 50MB in bytes
  ARRAY['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm']
);

-- Create storage policies for product videos
CREATE POLICY "Users can upload their own videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-videos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view all videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-videos');

CREATE POLICY "Users can update their own videos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'product-videos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own videos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-videos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  ); 