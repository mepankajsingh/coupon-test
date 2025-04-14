# Coupon Application

A web application for displaying and managing coupons, built with Remix, TypeScript, and Supabase.

## Database Setup

This application uses Supabase as its database. To set up the database schema:

1. Create a new Supabase project
2. Navigate to the SQL Editor in your Supabase dashboard
3. Run the SQL migration file located at `supabase/migrations/20240617000000_initial_schema.sql`

This will create all necessary tables, sample data, and security policies.

## Development

To start the development server:

```sh
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features

- Browse coupons by category or store
- Search for coupons
- Copy coupon codes with a single click
- Newsletter subscription
- Responsive design
