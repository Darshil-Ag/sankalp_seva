-- Migration Script: Add 'cause' column and update constraints
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- This script is safe to run multiple times (idempotent)

-- Step 1: Add the 'cause' column if it doesn't exist (nullable first)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'donations' AND column_name = 'cause'
  ) THEN
    ALTER TABLE donations ADD COLUMN cause TEXT;
    RAISE NOTICE 'Added cause column';
  END IF;
END $$;

-- Step 2: Set default value for existing rows that have NULL cause
UPDATE donations 
SET cause = 'General Donation (Use where needed most)' 
WHERE cause IS NULL;

-- Step 3: Make the column NOT NULL (only if there are no NULL values)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM donations WHERE cause IS NULL
  ) THEN
    ALTER TABLE donations ALTER COLUMN cause SET NOT NULL;
    RAISE NOTICE 'Set cause column to NOT NULL';
  ELSE
    RAISE WARNING 'Cannot set cause to NOT NULL - there are NULL values. Please update them first.';
  END IF;
END $$;

-- Step 4: Add index for better query performance (if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_donations_cause ON donations(cause);

-- Step 5: Add index on phone if it doesn't exist (for search performance)
CREATE INDEX IF NOT EXISTS idx_donations_phone ON donations(donor_phone);

-- Step 6: Optional - Update phone constraint if needed
-- Note: Only run this if you want to make phone required
-- First, set default phone for existing NULL values:
-- UPDATE donations SET donor_phone = 'N/A' WHERE donor_phone IS NULL;
-- Then make it NOT NULL:
-- ALTER TABLE donations ALTER COLUMN donor_phone SET NOT NULL;

-- Verify the column was added successfully
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'donations' 
ORDER BY ordinal_position;
