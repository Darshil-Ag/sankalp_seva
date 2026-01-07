# Quick Deployment Guide - Railway (5 Minutes)

## 🚀 Fastest Way to Deploy Your Backend

### Step 1: Prepare (2 minutes)

1. **Make sure your `server/package.json` has:**
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

2. **Push your code to GitHub** (if not already)

### Step 2: Deploy on Railway (3 minutes)

1. **Go to:** https://railway.app
2. **Click:** "Start a New Project"
3. **Select:** "Deploy from GitHub repo"
4. **Choose:** Your repository
5. **Set Root Directory:** `server` (important!)
6. **Add Environment Variables:**
   - Click "Variables" tab
   - Add these one by one:
     ```
     PORT=3001
     RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
     RAZORPAY_KEY_SECRET=your_secret_here
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     NODE_ENV=production
     ```
7. **Wait for deployment** (1-2 minutes)
8. **Get your URL:**
   - Click "Settings" → "Generate Domain"
   - Copy the URL (e.g., `https://your-app.railway.app`)

### Step 3: Update Frontend (1 minute)

1. **Update `.env` in project root:**
   ```env
   VITE_API_URL=https://your-app.railway.app/api/verify-donation
   ```

2. **Restart frontend:**
   ```bash
   npm run dev
   ```

### Step 4: Test

1. Make a test donation
2. Check if it works!

## ✅ Done!

Your backend is now live and ready to accept donations!

---

## 🔄 Updating Later

Just push to GitHub → Railway auto-deploys!

## 🐛 Issues?

- Check Railway logs (in dashboard)
- Verify all environment variables are set
- Test health endpoint: `https://your-app.railway.app/health`






