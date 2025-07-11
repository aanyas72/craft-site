# Video Upload Setup Guide

## Prerequisites
- Supabase project with storage enabled
- Database tables already created (profiles, products)

## Step 1: Run Database Schema Updates

Execute the updated database schema files in your Supabase SQL editor:

1. **Update products table** (if not already done):
```sql
-- Add video_url column to existing products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url TEXT;
```

2. **Run the storage setup**:
```sql
-- Execute the contents of storage-setup.sql
```

## Step 2: Configure Supabase Storage

### Option A: Using SQL (Recommended)
Run the `storage-setup.sql` file in your Supabase SQL editor.

### Option B: Manual Setup
1. Go to your Supabase Dashboard → Storage
2. Create a new bucket named `product-videos`
3. Set it as public
4. Set file size limit to 50MB
5. Add allowed MIME types: `video/mp4`, `video/avi`, `video/mov`, `video/wmv`, `video/flv`, `video/webm`

## Step 3: Test the Video Upload

1. **Start your development server**:
```bash
cd craft-site
npm run dev
```

2. **Navigate to My Shop page** (`/my-shop`)

3. **Add a new product** and test video upload:
   - Click "Add New Product"
   - Fill in product details
   - Upload a video file (under 50MB)
   - Check that the upload progress shows
   - Verify the success message appears

## Step 4: Display Videos in Product Cards

The video upload is working, but you may want to display videos in your product cards. Here's how to add video display:

### Update Product Card Component
Add video display to your product cards in `my-shop/page.js`:

```jsx
{product.video_url && (
  <div className="mt-2">
    <video 
      controls 
      className="w-full h-32 object-cover rounded"
      preload="metadata"
    >
      <source src={product.video_url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}
```

## Step 5: Update Public Shop Page

Update the public shop page (`/shop/[sellerId]`) to display videos:

```jsx
{product.video_url && (
  <div className="mt-2">
    <video 
      controls 
      className="w-full h-48 object-cover rounded"
      preload="metadata"
    >
      <source src={product.video_url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}
```

## Troubleshooting

### Common Issues:

1. **"Bucket not found" error**:
   - Make sure the `product-videos` bucket exists in Supabase Storage
   - Check that the bucket name matches exactly

2. **"Permission denied" error**:
   - Verify RLS policies are set up correctly
   - Check that the user is authenticated

3. **"File too large" error**:
   - Ensure the bucket file size limit is set to 50MB
   - Check that the file is actually under 50MB

4. **Video not playing**:
   - Check that the video URL is accessible
   - Verify the video format is supported by the browser

### Debug Steps:

1. **Check browser console** for JavaScript errors
2. **Check Supabase logs** for storage errors
3. **Verify file upload** in Supabase Storage dashboard
4. **Test video URL** directly in browser

## Security Notes

- Videos are stored in user-specific folders for security
- Only authenticated users can upload videos
- All users can view videos (public bucket)
- Users can only modify/delete their own videos

## Performance Considerations

- Large video files may take time to upload
- Consider implementing video compression
- Add loading states for better UX
- Consider using video thumbnails for better performance 