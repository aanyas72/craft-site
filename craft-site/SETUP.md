# Seller Account Setup

This guide explains how to set up the seller functionality for the craft website.

## Database Setup

1. **Set up Supabase Database:**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL commands from `database-setup.sql` to create the profiles table

2. **Environment Variables:**
   Make sure you have the following environment variables set in your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Features Implemented

### Sell Page (`/sell`)
- **"Start Creating Today"** component in the center
- **Become a Seller** button that upgrades user account to seller status
- Shows seller benefits and account status
- Redirects to login if user is not authenticated

### Header Component
- **Shop button** appears next to the bag button only for sellers
- Uses `FiStore` icon from react-icons
- Automatically checks seller status on page load and auth state changes

### Database Schema
The `profiles` table includes:
- `id` (UUID, references auth.users)
- `email` (TEXT)
- `is_seller` (BOOLEAN, default FALSE)
- `shop_name` (TEXT, for future use)
- `shop_description` (TEXT, for future use)
- `created_at` and `updated_at` timestamps

## How It Works

1. **User Authentication:** Users must be logged in to access the sell page
2. **Seller Upgrade:** Clicking "Become a Seller" updates the user's profile in the database
3. **Header Updates:** The shop button automatically appears for sellers
4. **Row Level Security:** Database policies ensure users can only access their own profile data

## Testing

1. Create a user account and log in
2. Navigate to `/sell`
3. Click "Become a Seller"
4. Check that the shop button appears in the header
5. Refresh the page to verify the seller status persists 