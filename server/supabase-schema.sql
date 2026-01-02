-- Create donations table in Supabase
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

CREATE TABLE IF NOT EXISTS donations (
  id BIGSERIAL PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount INTEGER NOT NULL, -- Amount in paise (e.g., 50100 = ₹501)
  currency TEXT NOT NULL DEFAULT 'INR',
  razorpay_payment_id TEXT NOT NULL UNIQUE,
  razorpay_order_id TEXT NOT NULL,
  razorpay_signature TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_payment_id ON donations(razorpay_payment_id);

CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);

CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);




