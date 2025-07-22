# Image and Video Uploads

## Overview

All product listings require both an image and a video upload. This helps to establish more trust between the user and seller.

## Requirements

### Product Images
- **Required**: Yes
- **Maximum Size**: 10MB
- **Supported Formats**: JPEG, JPG, PNG, GIF, WebP
- **Upload Method**: File upload (no more URL input)

### Product Videos
- **Required**: Yes
- **Maximum Size**: 50MB
- **Supported Formats**: MP4, AVI, MOV, WMV, FLV, WebM
- **Upload Method**: File upload

## Implementation Details

### Form Validation
- Both image and video uploads are validated before form submission
- Users cannot submit a product without uploading both files
- Clear error messages guide users to complete required uploads

### Storage Setup
- Images are stored in the `product-images` bucket
- Videos are stored in the `product-videos` bucket
- Both buckets are public for viewing
- User-specific folders ensure security

### User Experience
- Real-time upload progress indicators
- Success messages confirm successful uploads
- File type and size validation with helpful error messages
- Disabled form submission until both uploads are complete

## Setup Instructions

1. **Database**: Ensure the `products` table has both `image_url` and `video_url` columns
2. **Storage**: Create both `product-images` and `product-videos` buckets in Supabase
3. **Policies**: Run the storage setup SQL files to configure access policies
4. **Testing**: Verify both upload types work correctly in the product form

## Technical Notes

- File uploads use Supabase Storage
- Images are optimized for web display
- Videos include controls for user interaction
- Both file types are validated for security and performance 