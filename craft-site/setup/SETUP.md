# Seller Account Setup

## Database Setup

1. **Set up Supabase Database:**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL commands from `database-setup.sql` to create the profiles and products tables

2. **Environment Variables:**
   Set up the following environment variables in your `.env` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Features:

### Sell Page (`/sell`)
- **"Start Creating Today"** component
- **Become a Seller** button that changes the user's status to seller
- Shows seller benefits and account status
- Redirects to login if user is not authenticated

### My Shop Page (`/my-shop`)
- **Product Management:** View, add, edit, and delete product listings
- **Product Form:** Comprehensive form for adding/editing products with fields for name, price, category, description, and image URL
- **Product Status:** Toggle products between active and inactive states
- **Empty State:** Encouraging message when no products are listed
- **Access Control:** Only accessible to users with seller status

### Header Component
- **Shop button** appears next to the bag button only for sellers (links to `/my-shop`)
- **My Shop tab** appears in navigation for sellers
- Automatically checks seller status on page load and auth state changes

### Database Schema

#### Profiles Table
- `id` (UUID, references auth.users)
- `email` (TEXT)
- `is_seller` (BOOLEAN, default FALSE)
- `shop_name` (TEXT, for future use)
- `shop_description` (TEXT, for future use)
- `created_at` and `updated_at` timestamps

#### Products Table
- `id` (UUID, primary key)
- `seller_id` (UUID, references auth.users)
- `name` (TEXT, required)
- `description` (TEXT)
- `price` (DECIMAL, required)
- `category` (TEXT)
- `image_url` (TEXT)
- `is_active` (BOOLEAN, default TRUE)
- `created_at` and `updated_at` timestamps

## How It Works

1. **User Authentication:** Users must be logged in to access seller features
2. **Seller Upgrade:** Clicking "Become a Seller" updates the user's profile in the database
3. **Header Updates:** The shop button and My Shop tab automatically appear for sellers
4. **Product Management:** Sellers can manage their product listings through the My Shop page
5. **Row Level Security:** Database policies ensure users can only access their own data

## Testing

1. Create a user account and log in
2. Navigate to `/sell`
3. Click "Become a Seller"
4. Check that the shop button appears in the header
5. Navigate to `/my-shop` to manage products
6. Add, edit, and delete products to test functionality
7. Refresh the page to verify the seller status persists 