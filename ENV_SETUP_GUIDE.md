# Environment Variables Setup Guide

This guide explains where to create `.env` files and what to store in each one.

## 📁 File Locations

You need **TWO separate `.env` files** in different locations:

```
sankalp-seva-main/
├── .env                    ← Frontend .env (CREATE THIS)
├── server/
│   └── .env               ← Backend .env (YOU ALREADY HAVE THIS)
└── ...
```

---

## 1️⃣ Frontend `.env` File

**Location:** `sankalp-seva-main/.env` (project root, same level as `package.json`)

**Contents:**
```env
# Razorpay Configuration (Frontend)
# Get your Razorpay Key ID from: https://dashboard.razorpay.com/app/keys
# Use Test Mode Key ID for development (starts with rzp_test_)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Backend API URL (Optional - defaults to localhost:3001)
# Update this when deploying to production
VITE_API_URL=http://localhost:3001/api/verify-donation
```

**What to put here:**
- ✅ `VITE_RAZORPAY_KEY_ID` - Your Razorpay **Key ID** (public key, safe for frontend)
- ✅ `VITE_API_URL` - Your backend server URL (optional, has default)

**What NOT to put here:**
- ❌ `RAZORPAY_KEY_SECRET` - Never put secrets in frontend!
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - Never put secrets in frontend!

**How to get Razorpay Key ID:**
1. Go to https://dashboard.razorpay.com/app/keys
2. Copy the **Key ID** (starts with `rzp_test_` for test mode)
3. Paste it in your `.env` file

---

## 2️⃣ Backend `.env` File

**Location:** `sankalp-seva-main/server/.env` (inside server folder)

**Contents:**
```env
# Server Configuration
PORT=3001

# Razorpay Configuration (Backend - SECRET)
# Get these from: https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Supabase Configuration (Backend - SECRET)
# Get these from: https://app.supabase.com/project/_/settings/api
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**What to put here:**
- ✅ `PORT` - Server port (default: 3001)
- ✅ `RAZORPAY_KEY_ID` - Your Razorpay Key ID (same as frontend)
- ✅ `RAZORPAY_KEY_SECRET` - Your Razorpay **Key Secret** (KEEP SECRET!)
- ✅ `SUPABASE_URL` - Your Supabase project URL
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase Service Role Key (KEEP SECRET!)

**How to get these values:**

### Razorpay Keys:
1. Go to https://dashboard.razorpay.com/app/keys
2. Copy **Key ID** → Put in both frontend and backend `.env`
3. Copy **Key Secret** → Put ONLY in backend `server/.env` (never in frontend!)

### Supabase Credentials:
1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy **Project URL** → Put in `SUPABASE_URL`
5. Copy **service_role** key (NOT the anon key!) → Put in `SUPABASE_SERVICE_ROLE_KEY`

---

## 🔒 Security Rules

### ✅ DO:
- Put **Key ID** in both frontend and backend `.env`
- Put **Key Secret** ONLY in backend `server/.env`
- Put **Service Role Key** ONLY in backend `server/.env`
- Add `.env` files to `.gitignore` (already done)

### ❌ DON'T:
- Never put `RAZORPAY_KEY_SECRET` in frontend `.env`
- Never put `SUPABASE_SERVICE_ROLE_KEY` in frontend `.env`
- Never commit `.env` files to Git
- Never share `.env` files publicly

---

## 📝 Quick Setup Steps

### Step 1: Create Frontend `.env`
```bash
# In project root (sankalp-seva-main/)
# Create .env file with:
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
VITE_API_URL=http://localhost:3001/api/verify-donation
```

### Step 2: Update Backend `server/.env`
```bash
# In server/ folder
# Make sure it has:
PORT=3001
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 3: Restart Servers
After creating/updating `.env` files:
```bash
# Restart frontend (if running)
npm run dev

# Restart backend (if running)
cd server
npm run dev
```

---

## 🧪 Testing

After setting up both `.env` files:

1. **Test Frontend:**
   - Start frontend: `npm run dev`
   - Go to Donate page
   - If you see "Razorpay Key ID not configured" error → Frontend `.env` is missing or wrong

2. **Test Backend:**
   - Start backend: `cd server && npm run dev`
   - Check: `http://localhost:3001/health`
   - If you see errors about missing env vars → Backend `server/.env` is missing or wrong

---

## 📋 Checklist

- [ ] Created `.env` in project root with `VITE_RAZORPAY_KEY_ID`
- [ ] Created/updated `server/.env` with all backend variables
- [ ] Got Razorpay Key ID from dashboard
- [ ] Got Razorpay Key Secret from dashboard (backend only)
- [ ] Got Supabase URL from project settings
- [ ] Got Supabase Service Role Key from project settings (backend only)
- [ ] Verified `.env` files are in `.gitignore`
- [ ] Restarted both frontend and backend servers

---

## 🆘 Troubleshooting

**"Razorpay Key ID not configured" error:**
- Check that `.env` exists in project root (not in server folder)
- Check that variable name is `VITE_RAZORPAY_KEY_ID` (with `VITE_` prefix)
- Restart frontend dev server after creating `.env`

**Backend can't connect to Supabase:**
- Check that `server/.env` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Verify you're using **Service Role Key** (not anon key)
- Restart backend server after updating `.env`

**Payment verification fails:**
- Check that `RAZORPAY_KEY_SECRET` in `server/.env` matches your Razorpay account
- Verify both frontend and backend use the same Razorpay account (test/live mode)










