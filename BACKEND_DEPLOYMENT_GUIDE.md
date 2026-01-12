# Backend Deployment Guide

Complete guide to deploy your Razorpay donation backend to production.

## 🚀 Recommended Hosting Platforms

### 1. **Railway** (Recommended - Easiest)
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Built-in environment variables
- ✅ Easy PostgreSQL/Supabase integration
- ✅ Automatic HTTPS

### 2. **Render**
- ✅ Free tier available
- ✅ Simple deployment
- ✅ Good for Node.js apps
- ✅ Free SSL

### 3. **Vercel**
- ✅ Excellent for serverless functions
- ✅ Free tier
- ✅ Automatic deployments
- ⚠️ Requires serverless function setup

### 4. **Heroku**
- ✅ Easy deployment
- ⚠️ No free tier anymore
- ✅ Good documentation

---

## 📋 Pre-Deployment Checklist

- [ ] Backend code is working locally
- [ ] All environment variables documented
- [ ] Supabase database is set up
- [ ] Razorpay keys are ready (test or live)
- [ ] GitHub repository is ready (for auto-deploy)

---

## 🚂 Option 1: Railway (Recommended)

### Step 1: Prepare Your Code

1. **Create a `Procfile` in `server/` folder:**
   ```bash
   web: node index.js
   ```

2. **Update `package.json` in `server/` folder:**
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

### Step 2: Deploy to Railway

1. **Sign up/Login:**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `server` folder as root directory

3. **Set Environment Variables:**
   - Go to your project → Variables tab
   - Add these variables:
     ```
     PORT=3001
     RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
     RAZORPAY_KEY_SECRET=your_live_secret_key
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     NODE_ENV=production
     ```

4. **Deploy:**
   - Railway will automatically detect Node.js
   - It will run `npm install` and `npm start`
   - Wait for deployment to complete

5. **Get Your URL:**
   - Go to Settings → Generate Domain
   - Your backend URL will be: `https://your-app.railway.app`
   - Or use custom domain if you have one

### Step 3: Update Frontend

Update your frontend `.env` file:
```env
VITE_API_URL=https://your-app.railway.app/api/verify-donation
```

---

## 🎨 Option 2: Render

### Step 1: Prepare Your Code

1. **Create `render.yaml` in project root:**
   ```yaml
   services:
     - type: web
       name: sankalp-seva-backend
       env: node
       buildCommand: cd server && npm install
       startCommand: cd server && npm start
       envVars:
         - key: PORT
           value: 3001
         - key: NODE_ENV
           value: production
   ```

### Step 2: Deploy to Render

1. **Sign up:**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `sankalp-seva-backend`
     - **Root Directory:** `server`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Set Environment Variables:**
   - Go to Environment tab
   - Add all variables:
     ```
     PORT=3001
     RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
     RAZORPAY_KEY_SECRET=your_live_secret_key
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     NODE_ENV=production
     ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy
   - Your URL: `https://sankalp-seva-backend.onrender.com`

### Step 3: Update Frontend

```env
VITE_API_URL=https://sankalp-seva-backend.onrender.com/api/verify-donation
```

---

## ⚡ Option 3: Vercel (Serverless)

### Step 1: Convert to Serverless Functions

Create `api/verify-donation.js`:
```javascript
import express from 'express';
import cors from 'cors';
// ... your existing code from server/index.js

const app = express();
app.use(cors());
app.use(express.json());

// ... all your routes

export default app;
```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd server
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all required variables

---

## 🔧 Environment Variables Setup

### Required Variables (All Platforms)

```env
# Server
PORT=3001
NODE_ENV=production

# Razorpay (Use LIVE keys for production)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key

# Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Getting Live Razorpay Keys

1. Go to https://dashboard.razorpay.com
2. Switch to **Live Mode** (top right)
3. Go to **Settings** → **API Keys**
4. Generate/View your Live keys
5. Copy Key ID and Key Secret

⚠️ **Important:** Never commit these keys to Git!

---

## 🔒 Security Checklist

- [ ] Use **Live Razorpay keys** (not test keys)
- [ ] Use **Supabase Service Role Key** (not anon key)
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Never expose keys in frontend code
- [ ] Use environment variables (not hardcoded)

---

## 🌐 CORS Configuration

Your backend already has CORS enabled. If you need to restrict it:

Update `server/index.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: true
}));
```

---

## 📝 Testing After Deployment

1. **Test Health Endpoint:**
   ```bash
   curl https://your-backend-url.railway.app/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Test Order Creation:**
   ```bash
   curl -X POST https://your-backend-url.railway.app/api/create-order \
     -H "Content-Type: application/json" \
     -d '{"amount": 10000, "currency": "INR"}'
   ```

3. **Test from Frontend:**
   - Update frontend `.env` with new API URL
   - Make a test donation
   - Check if it works end-to-end

---

## 🔄 Updating Your Deployment

### Railway/Render (Auto-deploy from GitHub)
- Push changes to GitHub
- Platform automatically redeploys

### Manual Update
- Push to GitHub
- Platform dashboard → Redeploy

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Fix:** Make sure `package.json` has all dependencies listed

### Issue: "Port already in use"
**Fix:** Remove hardcoded PORT, use `process.env.PORT || 3001`

### Issue: "CORS error"
**Fix:** Check CORS configuration, add your frontend domain

### Issue: "Environment variable not found"
**Fix:** Double-check all variables are set in hosting platform

### Issue: "Database connection failed"
**Fix:** Verify Supabase URL and Service Role Key are correct

---

## 📊 Monitoring

### Railway
- Built-in logs and metrics
- View in dashboard

### Render
- Logs tab shows real-time logs
- Metrics dashboard available

### Recommended: Add Logging
```javascript
// In server/index.js
console.log(`Server running on port ${PORT}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Railway  | $5 credit/month | $5+/month |
| Render   | Free (with limits) | $7+/month |
| Vercel   | Free (generous) | $20+/month |
| Heroku   | No free tier | $7+/month |

**Recommendation:** Start with Railway or Render free tier, upgrade when needed.

---

## ✅ Post-Deployment Steps

1. ✅ Test all endpoints
2. ✅ Update frontend API URL
3. ✅ Test complete donation flow
4. ✅ Monitor logs for errors
5. ✅ Set up error alerts (optional)
6. ✅ Document your deployment process

---

## 🎯 Quick Start (Railway - Fastest)

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo → Set root to `server/`
5. Add environment variables
6. Deploy!
7. Copy URL → Update frontend `.env`
8. Done! 🎉

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs










