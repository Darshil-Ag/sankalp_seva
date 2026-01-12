# Quick Reference: .env Files

## 📍 File Locations

```
sankalp-seva-main/
│
├── .env                          ← CREATE THIS (Frontend)
│   └── VITE_RAZORPAY_KEY_ID
│   └── VITE_API_URL (optional)
│
└── server/
    └── .env                      ← YOU HAVE THIS (Backend)
        └── PORT
        └── RAZORPAY_KEY_ID
        └── RAZORPAY_KEY_SECRET
        └── SUPABASE_URL
        └── SUPABASE_SERVICE_ROLE_KEY
```

---

## 🎯 Frontend `.env` (Project Root)

**File:** `sankalp-seva-main/.env`

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
VITE_API_URL=http://localhost:3001/api/verify-donation
```

**Get Key ID from:** https://dashboard.razorpay.com/app/keys

---

## 🔐 Backend `.env` (Server Folder)

**File:** `sankalp-seva-main/server/.env`

```env
PORT=3001
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Get from:**
- Razorpay: https://dashboard.razorpay.com/app/keys
- Supabase: https://app.supabase.com/project/_/settings/api

---

## ⚠️ Remember

- **Key ID** → Safe for frontend (put in both `.env` files)
- **Key Secret** → Backend only! (only in `server/.env`)
- **Service Role Key** → Backend only! (only in `server/.env`)










