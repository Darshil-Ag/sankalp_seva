# Render Deployment Fix

## Issue
Render is trying to run `npm run build` but your server doesn't need a build step.

## Solution

### Option 1: Update Render Settings (Recommended)

1. Go to your Render dashboard
2. Select your web service
3. Go to **Settings**
4. Find **Build Command**
5. Change it from:
   ```
   npm install; npm run build
   ```
   To:
   ```
   npm install
   ```
6. Keep **Start Command** as:
   ```
   npm start
   ```
7. Save and redeploy

### Option 2: Use render.yaml (Alternative)

Create `render.yaml` in your project root:

```yaml
services:
  - type: web
    name: sankalp-seva-backend
    env: node
    rootDir: server
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 3001
      - key: NODE_ENV
        value: production
```

Then in Render:
1. Go to **Settings** → **Infrastructure as Code**
2. Connect the `render.yaml` file
3. Redeploy

### Option 3: Build Script (Already Added)

I've added a dummy build script to `server/package.json`:
```json
"build": "echo 'No build step required for Node.js server'"
```

This will make `npm run build` succeed without doing anything.

## Recommended Render Settings

- **Root Directory:** `server`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Auto-Deploy:** `Yes` (if connected to GitHub)

## Environment Variables

Make sure these are set in Render:
```
PORT=3001
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

## After Fixing

1. Save settings in Render
2. Click **Manual Deploy** → **Deploy latest commit**
3. Wait for deployment
4. Test: `https://your-app.onrender.com/health`










