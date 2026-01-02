# Testing Your Razorpay Integration

Now that your `.env` files are set up, follow these steps to test the complete donation flow.

## ✅ Pre-Testing Checklist

- [x] Frontend `.env` created with `VITE_RAZORPAY_KEY_ID`
- [x] Backend `server/.env` created with all required variables
- [x] Supabase `donations` table created (from `server/supabase-schema.sql`)
- [ ] Backend server installed dependencies (`cd server && npm install`)
- [ ] Frontend dependencies installed (`npm install`)

---

## 🚀 Step-by-Step Testing

### Step 1: Start Backend Server

```bash
cd server
npm install  # If not done already
npm run dev
```

**Expected output:**
```
Server running on http://localhost:3001
Health check: http://localhost:3001/health
```

**Test backend:**
- Open browser: http://localhost:3001/health
- Should see: `{"status":"ok","timestamp":"..."}`

---

### Step 2: Start Frontend

**In a new terminal:**
```bash
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### Step 3: Test Donation Flow

1. **Open frontend:** http://localhost:5173/donate

2. **Fill the form:**
   - Enter your name
   - Enter your email
   - Enter phone (optional)
   - Select a cause
   - Choose amount (or enter custom)
   - Click "Donate"

3. **Razorpay Checkout opens:**
   - Use test card: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)
   - Name: Any name

4. **After payment:**
   - You should see: "Thank you for your donation! Your payment has been verified and recorded."
   - Form should reset
   - Check backend terminal for: "Donation verified and recorded: pay_xxx - ₹xxx"

5. **Verify in Supabase:**
   - Go to: https://app.supabase.com
   - Navigate to: **Table Editor** → `donations`
   - You should see your donation record with `verified: true`

---

## 🧪 Test Scenarios

### ✅ Success Case
- Payment succeeds → Backend verifies → Database records → Success message shown

### ❌ Failure Cases to Test

**1. Invalid Card:**
- Use card: `4000 0000 0000 0002`
- Should show: "Payment failed" message

**2. User Cancels:**
- Click outside Razorpay modal or close button
- Should return to form without error

**3. Backend Down:**
- Stop backend server
- Make payment
- Should show: "Error verifying payment" message

---

## 🔍 Troubleshooting

### "Razorpay Key ID not configured"
- **Fix:** Check that `.env` in project root has `VITE_RAZORPAY_KEY_ID`
- **Fix:** Restart frontend dev server after creating `.env`

### "Payment verification failed"
- **Fix:** Check backend `server/.env` has correct `RAZORPAY_KEY_SECRET`
- **Fix:** Ensure backend server is running
- **Fix:** Check backend terminal for error messages

### "Failed to record donation"
- **Fix:** Verify Supabase credentials in `server/.env`
- **Fix:** Check that `donations` table exists in Supabase
- **Fix:** Verify `SUPABASE_SERVICE_ROLE_KEY` (not anon key)

### CORS Errors
- **Fix:** Backend already has CORS enabled, but check if frontend URL matches
- **Fix:** Verify `VITE_API_URL` points to correct backend URL

---

## 📊 What to Check After Testing

1. **Backend Logs:**
   - Should show: "Donation verified and recorded: pay_xxx - ₹xxx"

2. **Supabase Database:**
   - Go to Table Editor → `donations`
   - Verify record exists with:
     - `verified: true`
     - Correct amount (in paise)
     - Donor information
     - Payment IDs

3. **Frontend:**
   - Success message appears
   - Form resets after successful donation
   - No console errors

---

## 🎉 Success Indicators

✅ Payment modal opens correctly  
✅ Payment completes successfully  
✅ Backend logs show verification  
✅ Database has new record with `verified: true`  
✅ Frontend shows success message  
✅ Form resets after donation  

---

## 🚀 Next Steps After Testing

Once everything works:

1. **Switch to Live Mode:**
   - Get live Razorpay keys from dashboard
   - Update both `.env` files with live keys
   - Test with small real payment

2. **Deploy Backend:**
   - Deploy to Railway, Render, or Vercel
   - Update `VITE_API_URL` in frontend `.env`

3. **Deploy Frontend:**
   - Deploy to Vercel, Netlify, etc.
   - Set environment variables in hosting platform

4. **Monitor:**
   - Check Supabase for donations
   - Monitor backend logs
   - Set up error tracking (optional)

---

## 📝 Test Card Details

**Success Card:**
- Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

**Failure Card:**
- Number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVV: Any 3 digits

**More test cards:** https://razorpay.com/docs/payments/test-cards/




