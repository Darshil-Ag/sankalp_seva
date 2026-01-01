# Image Setup Instructions

To display images on the website, you need to set up the `public` folder.

## Quick Setup

1. **Create public folder** in the root directory (same level as `src`)

2. **Copy image folders** into `public`:
   ```
   public/
     ├── photo_1/
     │   ├── IMG-20251227-WA0026.jpg
     │   ├── IMG-20251227-WA0027.jpg
     │   └── ... (all other images)
     ├── photo_2/
     │   ├── WhatsApp Image 2025-12-27 at 14.25.48_e58897ce.jpg
     │   └── ... (all other images)
     ├── members/
     │   ├── IMG-20251227-WA0052.jpg
     │   ├── IMG-20251227-WA0053.jpg
     │   └── IMG-20251227-WA0054.jpg
     └── sankalp_logo.jpg
   ```

3. **Restart the dev server** after copying images:
   ```bash
   npm run dev
   ```

## What's Using These Images?

- **Logo**: Navbar and browser favicon (`sankalp_logo.jpg`)
- **Gallery**: All images from `photo_1` and `photo_2` folders
- **Members Section**: Images from `members` folder (shown on Home page)
- **Hero Background**: Uses images from `photo_1` for animated background

All image paths are already configured in the code - just copy the folders to `public` and they'll work!

