# Fix: DonationSection Export Error

## The Error
```
The requested module '/src/components/DonationSection.jsx' does not provide an export named 'default'
```

## Solution

This is a Vite Hot Module Reload (HMR) caching issue. The file is correct, but Vite needs to be refreshed.

### Quick Fix:

1. **Stop the dev server** (Press `Ctrl+C` in terminal)

2. **Clear Vite cache** (optional but recommended):
   ```bash
   rm -rf node_modules/.vite
   ```
   Or on Windows:
   ```powershell
   Remove-Item -Recurse -Force node_modules\.vite
   ```

3. **Restart the dev server**:
   ```bash
   npm run dev
   ```

### Alternative: Hard Refresh Browser

- Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open DevTools and right-click the refresh button → "Empty Cache and Hard Reload"

### If Still Not Working:

1. Check that `DonationSection.jsx` has the export at the end:
   ```jsx
   export default DonationSection
   ```

2. Verify the import in `Home.jsx`:
   ```jsx
   import DonationSection from '../components/DonationSection'
   ```

3. Try temporarily commenting out the DonationSection import/usage, save, then uncomment it.

The file is correct - this is just a caching issue that a restart will fix!

