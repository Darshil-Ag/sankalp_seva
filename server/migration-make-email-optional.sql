-- Migration Script: Make donor_email optional (allow NULL)
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql
-- This fixes the error: "null value in column 'donor_email' violates not-null constraint"

-- Step 1: Remove NOT NULL constraint from donor_email
ALTER TABLE donations 
ALTER COLUMN donor_email DROP NOT NULL;

-- Step 2: Verify the change
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'donations' 
  AND column_name = 'donor_email';

-- Expected result: is_nullable should be 'YES' (meaning NULL is allowed)

-- Step 3: Optional - Verify all columns
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'donations' 
ORDER BY ordinal_position;
