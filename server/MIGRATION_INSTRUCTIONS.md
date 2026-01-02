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

