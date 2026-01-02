# Database Migration Instructions

## Adding 'cause' Column to Existing Table

Your current `donations` table is missing the `cause` column which is required for the new filtering feature.

### Quick Migration Steps:

1. **Open Supabase SQL Editor**
   - Go to: https://app.supabase.com
   - Navigate to your project
   - Click on "SQL Editor" in the left sidebar

2. **Run the Migration Script**
   - Copy the contents of `server/migration-add-cause.sql`
   - Paste it into the SQL Editor
   - Click "Run" or press `Ctrl+Enter`

3. **Verify the Migration**
   - The script will show a success message
   - Check the table structure to confirm the `cause` column was added

### What the Migration Does:

✅ Adds `cause` column to the `donations` table  
✅ Sets default value "General Donation (Use where needed most)" for existing rows  
✅ Makes the column NOT NULL  
✅ Adds index on `cause` for better query performance  
✅ Adds index on `donor_phone` for search performance  

### After Migration:

- **Existing donations** will have cause set to "General Donation (Use where needed most)"
- **New donations** will require a cause to be specified
- The admin dashboard will now show cause filtering options

### Troubleshooting:

If you get an error about NULL values:
1. Check if there are any rows with NULL cause: 
   ```sql
   SELECT COUNT(*) FROM donations WHERE cause IS NULL;
   ```
2. If there are NULL values, update them first:
   ```sql
   UPDATE donations SET cause = 'General Donation (Use where needed most)' WHERE cause IS NULL;
   ```
3. Then run the migration again

### Optional: Make Phone Required

If you want to make `donor_phone` required (NOT NULL) for new donations:

```sql
-- First, set default for existing NULL values
UPDATE donations SET donor_phone = 'N/A' WHERE donor_phone IS NULL;

-- Then make it NOT NULL
ALTER TABLE donations ALTER COLUMN donor_phone SET NOT NULL;
```

**Note:** Only do this if you're okay with existing NULL phone numbers being set to 'N/A'.

---

## Making Email Optional

Your database currently requires `donor_email` to be NOT NULL, but the application now makes email optional. You need to allow NULL values.

### Quick Migration Steps:

1. **Open Supabase SQL Editor**
   - Go to: https://app.supabase.com
   - Navigate to your project
   - Click on "SQL Editor" in the left sidebar

2. **Run the Email Migration Script**
   - Copy the contents of `server/migration-make-email-optional.sql`
   - Paste it into the SQL Editor
   - Click "Run" or press `Ctrl+Enter`

3. **Verify the Migration**
   - The script will show that `is_nullable` is now 'YES' for `donor_email`
   - This means NULL values are now allowed

### What This Migration Does:

✅ Removes NOT NULL constraint from `donor_email` column  
✅ Allows NULL values for email (making it optional)  
✅ Verifies the change was successful  

### After Migration:

- **New donations** can be created without an email address
- **Existing donations** are not affected
- The error "null value in column 'donor_email' violates not-null constraint" will be resolved

### Error Fix:

If you're seeing this error:
```
null value in column "donor_email" of relation "donations" violates not-null constraint
```

Run the `migration-make-email-optional.sql` script to fix it.

