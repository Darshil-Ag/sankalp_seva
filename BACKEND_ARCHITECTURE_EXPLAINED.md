# Backend Architecture & 24/7 Requirements

## Current Setup

Your backend is a **traditional Express.js server** (NOT serverless). It's a Node.js application that runs continuously.

## Does It Need to Run 24/7?

**Short Answer:** It depends on your hosting platform.

### Current Deployment (Render Free Tier)

If you're on **Render's free tier**:
- ❌ **NOT 24/7** - Spins down after 15 minutes of inactivity
- ⚠️ **First request after spin-down takes 30-60 seconds** (cold start)
- ✅ **Free** - No cost
- ✅ **Auto-wakes** when someone makes a request

**Impact:**
- Donations work, but first request after inactivity is slow
- Not ideal for production with frequent donations

### Option 1: Railway (Recommended for 24/7)

**Railway:**
- ✅ **Runs 24/7** - Always available
- ✅ **Fast response** - No cold starts
- ✅ **$5 free credit/month** - Usually enough for small apps
- ✅ **Auto-deploys** from GitHub
- ⚠️ **Costs after free credit** - ~$5-10/month

**Best for:** Production apps that need reliability

### Option 2: Render Paid Tier

**Render Paid ($7/month):**
- ✅ **Runs 24/7** - Always available
- ✅ **Fast response** - No cold starts
- ✅ **Better performance**
- ⚠️ **$7/month** - Paid service

**Best for:** If you're already on Render and want to upgrade

### Option 3: Convert to Serverless (Vercel)

**Vercel Serverless:**
- ✅ **True serverless** - Only runs when called
- ✅ **No 24/7 needed** - Scales automatically
- ✅ **Free tier** - Very generous
- ✅ **Fast** - Edge functions
- ⚠️ **Requires code changes** - Need to convert to serverless functions

**Best for:** Cost-effective, scalable solution

## Comparison Table

| Platform | Type | 24/7? | Free Tier | Paid | Best For |
|----------|------|-------|-----------|------|----------|
| **Render Free** | Traditional | ❌ No (spins down) | ✅ Yes | - | Development/Testing |
| **Render Paid** | Traditional | ✅ Yes | ❌ No | $7/mo | Production (simple) |
| **Railway** | Traditional | ✅ Yes | $5 credit | $5-10/mo | Production (recommended) |
| **Vercel** | Serverless | ✅ Auto-scales | ✅ Yes | $20/mo | Production (scalable) |

## Recommendation

### For Production (Donations Need to Work Always):

**Option A: Railway (Easiest)**
- Deploy to Railway
- Get $5 free credit/month
- Runs 24/7
- Usually free for small apps
- Upgrade if needed ($5-10/month)

**Option B: Vercel Serverless (Most Cost-Effective)**
- Convert backend to serverless functions
- Free tier is very generous
- Only pays for what you use
- Scales automatically
- Requires code refactoring

### For Development/Testing:

**Render Free Tier is fine:**
- Acceptable delays on first request
- Free
- Good for testing

## Current Status Check

To check your current setup:

1. **Check your API URL:**
   - Look at `.env` file: `VITE_API_URL`
   - If it contains `onrender.com` → You're on Render
   - If it contains `railway.app` → You're on Railway
   - If it contains `vercel.app` → You're on Vercel

2. **Test cold start:**
   - Wait 20 minutes
   - Make a donation
   - If first request is slow (30-60s) → Render free tier (spins down)
   - If always fast → Railway/Paid tier (24/7)

## Quick Fix: Upgrade to Railway

If you want 24/7 without code changes:

1. Go to https://railway.app
2. Sign up with GitHub
3. Deploy from your repo
4. Set root directory: `server`
5. Add environment variables
6. Get free $5 credit/month
7. Update `VITE_API_URL` in frontend

**Result:** Backend runs 24/7, always available for donations!

## Summary

- **Current (Render Free):** Spins down, not 24/7, but free
- **Railway:** 24/7, $5 free credit, recommended
- **Vercel Serverless:** 24/7, auto-scales, free tier, requires refactoring

**For production donations, Railway is the easiest upgrade path!**



