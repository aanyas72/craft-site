# AuthentiCraft

Welcome to Authenticraft: A video discovery site that helps users find authentic, handmade items from artisans all around the world.

As AI advances, it's getting harder and harder to figure out what is made by a person and what is made by AI.
Many listings on different sites are either dropshipped or AI-generated. Customers who are looking to support small businesses can't figure out who to trust.

That's the purpose of AuthentiCraft: a platform for users to reach sellers they know they can trust.

How it works:
Sellers can get "verified" status if they can prove that they handmake their products.
This process involves submitting video evidence, social media handles, paperwork, and any relevant information that they can 
send that proves that they handmake their products.
The video will be flagged as AI-generated or not (with the help of AI, ironically) *in progress*
And someone will go through all of the documented proof to determine whether the seller is truly handmaking their products or not
It is an extensive process, but it's meant to be very thorough so the user trusts the site and the verified sellers.
Additionally, users can report sellers they suspect of not authentically making their products

Users can browse the platform by finding items on the video discovery page (which is tailored to their preferences) *also in progress* or through the search menu.
Each listing contains a video so the user can see the handmaking process.
The user can then go to the seller's page or website and make a purchase from there!

---

## Features

- Browse handmade product listings with videos
- Seller shop profiles and account management
- Embedded product demo videos
- ML-powered product recommendations
- Add-to-bag shopping system (per-user)
- Supabase Auth with Row-Level Security

---

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/)
  - Auth with Row-Level Security (RLS) enabled
  - Realtime database with Postgres
- **Machine Learning**: Recommendation system using product similarity

---

## Database Schema

### Auth

Supabase’s built-in `auth.users` table:
- `id`: UUID (primary key)
- `email`: User email
- `created_at`: Timestamp

### `profiles`

| Column           | Type                     | Description                        |
|------------------|--------------------------|------------------------------------|
| `id`             | UUID                     | FK to `auth.users.id`, PK          |
| `email`          | TEXT                     | User email                         |
| `is_seller`      | BOOLEAN (default false)  | Whether the user is a seller       |
| `is_verified`    | BOOLEAN (default false)  | Admin-verified seller              |
| `shop_name`      | TEXT                     | Seller's shop name                 |
| `shop_description` | TEXT                   | Shop bio or description            |
| `created_at`     | TIMESTAMP WITH TIME ZONE | Created timestamp                  |
| `updated_at`     | TIMESTAMP WITH TIME ZONE | Last updated timestamp             |

### `products`

| Column              | Type                     | Description                          |
|---------------------|--------------------------|--------------------------------------|
| `id`                | UUID                     | Primary key                          |
| `seller_id`         | UUID                     | FK to `auth.users.id`                |
| `name`              | TEXT                     | Product name                         |
| `description`       | TEXT                     | Product description                  |
| `price`             | DECIMAL(10,2)            | Price                                |
| `category`          | TEXT                     | Category/tag                         |
| `image_url`         | TEXT                     | Image hosted URL                     |
| `video_url`         | TEXT                     | Optional video demo                  |
| `is_active`         | BOOLEAN (default true)   | Whether listing is live              |
| `similar_product_ids` | UUID[]                 | Array of related product IDs         |
| `created_at`        | TIMESTAMP WITH TIME ZONE | Created timestamp                    |
| `updated_at`        | TIMESTAMP WITH TIME ZONE | Last updated timestamp               |

### `bags`

| Column         | Type                     | Description                        |
|----------------|--------------------------|------------------------------------|
| `id`           | UUID                     | Primary key                        |
| `user_id`      | UUID                     | FK to `auth.users.id`              |
| `product_id`   | UUID                     | FK to `products.id`                |
| `quantity`     | INTEGER (default 1)      | How many of this product           |
| `created_at`   | TIMESTAMP WITH TIME ZONE | When added to bag                  |
| `updated_at`   | TIMESTAMP WITH TIME ZONE | Last updated time                  |

---

## Machine Learning

Basic product recommendation is powered by a `similar_product_ids` array per product, generated using simple feature-based similarity (e.g. category, name, price proximity).

Planned:
- Vector similarity with embeddings
- Content-based and collaborative filtering using product metadata and user behavior.

---
