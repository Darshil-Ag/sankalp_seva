# Fix: Images Not Showing After Deployment

## Problem
Images show placeholders instead of actual photos after deployment.

## Root Cause
Vite only serves files from the `public` folder. If images aren't in `public`, they won't be included in the build and won't show on the deployed site.

## Solution: Copy All Images to Public Folder

### Step 1: Copy Missing Member Image

Copy `komal kabra.jpg` to the public folder:

```bash
# Copy komal kabra image
copy "members\komal kabra.jpg" "public\members\komal kabra.jpg"
```

Or manually:
- Copy `members/komal kabra.jpg` → `public/members/komal kabra.jpg`

### Step 2: Create gao Folder in Public and Copy Videos

```bash
# Create gao folder in public
mkdir public\gao

# Copy all videos
copy "gao\1.mp4" "public\gao\1.mp4"
copy "gao\2.mp4" "public\gao\2.mp4"
copy "gao\3.mp4" "public\gao\3.mp4"
```

Or manually:
- Create folder: `public/gao/`
- Copy `gao/1.mp4` → `public/gao/1.mp4`
- Copy `gao/2.mp4` → `public/gao/2.mp4`
- Copy `gao/3.mp4` → `public/gao/3.mp4`

### Step 3: Verify All Required Files Are in Public

Make sure these folders exist in `public/`:
```
public/
├── members/
│   ├── komal kabra.jpg  ← ADD THIS
│   ├── megha agarwal.jpeg
│   ├── anita chaparwal.jpeg
│   ├── anju agarwal.jpeg
│   ├── santosh agarwal.jpeg
│   ├── sunita khandelwal.jpeg
│   ├── ranjana bangar.jpeg
│   └── vinita agarwal.jpeg
├── photo_1/
│   └── (all 28 images)
├── photo_2/
│   └── (all 3 images)
├── gao/  ← CREATE THIS FOLDER
│   ├── 1.mp4  ← COPY THESE
│   ├── 2.mp4
│   └── 3.mp4
└── sankalp_logo.jpg
```

### Step 4: Rebuild and Redeploy

After copying files:

1. **Rebuild the project:**
   ```bash
   npm run build
   ```

2. **Check the dist folder:**
   - Open `dist/` folder
   - Verify images are there:
     - `dist/members/` should have all member images
     - `dist/photo_1/` should have all photos
     - `dist/gao/` should have all videos

3. **Redeploy:**
   - Push to GitHub (if using auto-deploy)
   - Or manually deploy the `dist` folder

## Quick Fix Script (Windows PowerShell)

Run this in your project root:

```powershell
# Copy komal kabra image
if (Test-Path "members\komal kabra.jpg") {
    Copy-Item "members\komal kabra.jpg" "public\members\komal kabra.jpg" -Force
    Write-Host "✓ Copied komal kabra.jpg"
}

# Create gao folder and copy videos
if (Test-Path "gao") {
    if (-not (Test-Path "public\gao")) {
        New-Item -ItemType Directory -Path "public\gao" | Out-Null
    }
    Copy-Item "gao\*.mp4" "public\gao\" -Force
    Write-Host "✓ Copied gao videos"
}

Write-Host "Done! Now rebuild: npm run build"
```

## Why This Happens

- **Development:** Vite serves from `public/` folder
- **Production Build:** Vite copies `public/` contents to `dist/` folder
- **If files aren't in `public/`:** They won't be in `dist/` and won't be deployed

## Verification Checklist

After copying files, verify:

- [ ] `public/members/komal kabra.jpg` exists
- [ ] `public/gao/1.mp4` exists
- [ ] `public/gao/2.mp4` exists
- [ ] `public/gao/3.mp4` exists
- [ ] All `photo_1` images are in `public/photo_1/`
- [ ] All `photo_2` images are in `public/photo_2/`
- [ ] `public/sankalp_logo.jpg` exists

Then rebuild and redeploy!

