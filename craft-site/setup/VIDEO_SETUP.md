# Image and Video Upload Setup Guide

## Step 1: Run Database Schema Updates

Execute the updated database schema files in the Supabase SQL editor:

1. **Update products table** (if not already done):
```sql
-- Add video_url column to existing products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url TEXT;
```

2. **Run the storage setup for videos**:
```sql
-- Execute the contents of storage-setup.sql
```

3. **Run the storage setup for images**:
```sql
-- Execute the contents of storage-setup-images.sql
```

## Step 2: Configure Supabase Storage

Run both storage setup files in your Supabase SQL editor:
- `storage-setup.sql` (for videos)
- `storage-setup-images.sql` (for images)

#### For Videos:
1. Go to your Supabase Dashboard → Storage
2. Create a new bucket named `product-videos`
3. Set it as public
4. Set file size limit to 50MB
5. Add allowed MIME types: `video/mp4`, `video/avi`, `video/mov`, `video/wmv`, `video/flv`, `video/webm`

#### For Images:
1. Go to your Supabase Dashboard → Storage
2. Create a new bucket named `product-images`
3. Set it as public
4. Set file size limit to 10MB
5. Add allowed MIME types: `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp`

## Step 3: Test the Upload Features

1. **Start your development server**:
```bash
cd craft-site
npm run dev
```

2. **Navigate to My Shop page** (`/my-shop`)

3. **Add a new product** and test both uploads:
   - Click "Add New Product"
   - Fill in product details
   - Upload an image (under 10MB)
   - Upload a video file (under 50MB)
   - Check that both upload progress shows
   - Verify the success messages appear
   - Submit the form

## Step 4: Display Images and Videos in Product Cards

The upload features are working, and both images and videos are now displayed in your product cards.

### Product Form Requirements
- **Product Image**: Required, max 10MB, supports JPEG, PNG, GIF, WebP
- **Product Video**: Required, max 50MB, supports MP4, AVI, MOV, WMV, FLV, WebM

## Step 5: Update Public Shop Page

The public shop page (`/shop/[sellerId]`) fetches the latest updates to the database and will 

## Troubleshooting

### Common Issues:

1. **"Bucket not found" error**:
   - Make sure both `product-videos` and `product-images` buckets exist in Supabase Storage
   - Check that the bucket names match exactly

2. **"Permission denied" error**:
   - Verify RLS policies are set up correctly
   - Check that the user is authenticated

3. **"File too large" error**:
   - Ensure the bucket file size limits are set correctly (50MB for videos, 10MB for images)
   - Check that the file is actually under the size limit

4. **"Required field missing" error**:
   - Both image and video uploads are now mandatory
   - Make sure both files are uploaded before submitting the form

5. **Video/Image not playing/displaying**:
   - Check that the file URL is accessible
   - Verify the file format is supported by the browser

### Debug Steps:

1. **Check browser console** for JavaScript errors
2. **Check Supabase logs** for storage errors
3. **Verify file upload** in Supabase Storage dashboard
4. **Test file URLs** directly in browser

## Security Notes

- Files are stored in user-specific folders for security
- Only authenticated users can upload files
- All users can view files (public buckets)
- Users can only modify/delete their own files

## Performance Considerations

- Large files may take time to upload
- Consider implementing file compression
- Add loading states for better UX
- Consider using image/video thumbnails for better performance