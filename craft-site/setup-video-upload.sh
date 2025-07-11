#!/bin/bash

echo "🎥 Setting up Video Upload for Craft Website"
echo "=============================================="

echo ""
echo "📋 Prerequisites:"
echo "1. Make sure you have a Supabase project"
echo "2. Ensure you're logged into Supabase CLI (if using CLI)"
echo "3. Have your database connection details ready"
echo ""

echo "🚀 Next Steps:"
echo ""
echo "1. 📊 Update Database Schema:"
echo "   - Go to your Supabase Dashboard → SQL Editor"
echo "   - Run: ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url TEXT;"
echo ""

echo "2. 🗂️  Create Storage Bucket:"
echo "   - Go to Supabase Dashboard → Storage"
echo "   - Create bucket named 'product-videos'"
echo "   - Set as public"
echo "   - Set file size limit to 50MB"
echo "   - Add MIME types: video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm"
echo ""

echo "3. 🔐 Set Storage Policies:"
echo "   - Run the storage-setup.sql file in your SQL Editor"
echo "   - Or manually create the policies from the VIDEO_SETUP.md file"
echo ""

echo "4. 🧪 Test the Implementation:"
echo "   - Start your dev server: npm run dev"
echo "   - Go to /my-shop"
echo "   - Add a new product with video upload"
echo ""

echo "📖 For detailed instructions, see: VIDEO_SETUP.md"
echo ""
echo "✅ Setup complete! Your video upload feature should now be working." 