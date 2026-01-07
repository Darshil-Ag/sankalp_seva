# Fix Images Not Showing After Deployment

## ✅ What I Just Fixed

1. ✅ Copied `komal kabra.jpg` to `public/members/`
2. ✅ Created `public/gao/` folder
3. ✅ Copied all 3 videos to `public/gao/`

## Next Steps to Fix Deployment

### Step 1: Rebuild Your Project

```bash
npm run build
```

This will copy all files from `public/` to `dist/` folder.

### Step 2: Verify Build Output

Check that images are in `dist/` folder:
- `dist/members/` should have all member images including `komal kabra.jpg`
- `dist/photo_1/` should have all photos
- `dist/photo_2/` should have all photos
- `dist/gao/` should have all 3 videos (1.mp4, 2.mp4, 3.mp4)
- `dist/sankalp_logo.jpg` should exist

### Step 3: Redeploy

**If using Vercel/Netlify (auto-deploy):**
- Push changes to GitHub
- Platform will auto-rebuild and deploy

**If deploying manually:**
- Upload the `dist` folder contents to your hosting

## Common Issues & Solutions

### Issue 1: Images Still Not Showing

**Check:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Look for failed image requests (red entries)
5. Check the actual URL being requested

**Common causes:**
- Wrong base path in `vite.config.js` (should be `base: "/"`)
- Images not in `public` folder
- Case sensitivity (Windows vs Linux servers)

### Issue 2: Case Sensitivity

Some hosting (Linux servers) is case-sensitive. Check:
- File names match exactly (including case)
- `komal kabra.jpg` vs `Komal Kabra.jpg`
- `photo_1` vs `Photo_1`

### Issue 3: Cached Build

Clear cache and rebuild:
```bash
# Delete old build
rm -rf dist

# Rebuild
npm run build
```

### Issue 4: Base Path Issue

If your site is deployed to a subdirectory (e.g., `yoursite.com/subfolder/`):

Update `vite.config.js`:
```javascript
export default defineConfig({
  base: "/subfolder/",  // Change this
  plugins: [react()],
})
```

## Verification Checklist

Before deploying, verify:

- [ ] All images in `public/members/` (including komal kabra.jpg)
- [ ] All images in `public/photo_1/` (28 images)
- [ ] All images in `public/photo_2/` (3 images)
- [ ] All videos in `public/gao/` (3 videos)
- [ ] `public/sankalp_logo.jpg` exists
- [ ] Run `npm run build` successfully
- [ ] Check `dist/` folder has all images
- [ ] Test locally: `npm run preview`

## Quick Test

After rebuilding, test locally:
```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` and check if images load.

If images work locally but not on production:
- Check hosting platform settings
- Verify base path configuration
- Check browser console for 404 errors

