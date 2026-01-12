# Frontend Integration - Quick Setup

## ✅ Step 5 Complete: Frontend Razorpay Integration

The frontend has been successfully integrated with Razorpay and the backend verification endpoint.

### What Was Changed

1. **Updated `src/pages/Donate.jsx`**:
   - Added donor information fields (name, email, phone)
   - Integrated Razorpay checkout
   - Added backend verification call after successful payment
   - Added form validation and error handling
   - Added loading state during payment processing

### Environment Variables Setup

1. **Create `.env` file in project root** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Add your Razorpay Key ID** to `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   ```
   
   Get this from: https://dashboard.razorpay.com/app/keys
   - Use **Test Mode** Key ID for development
   - **Never** put `RAZORPAY_KEY_SECRET` in frontend!

3. **Optional - Backend API URL** (defaults to localhost:3001):
   ```env
   VITE_API_URL=http://localhost:3001/api/verify-donation
   ```
   
   Update this to your production backend URL when deploying.

### Testing the Integration

1. **Start the backend server** (if not already running):
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend**:
   ```bash
   npm run dev
   ```

3. **Test the donation flow**:
   - Go to the Donate page
   - Fill in your name and email
   - Select an amount
   - Click "Donate"
   - Use Razorpay test card: `4111 1111 1111 1111` (any future expiry, any CVV)
   - Complete the payment
   - You should see a success message
   - Check Supabase dashboard to verify the donation was recorded

### New Features Added

- ✅ Donor information collection (name, email, phone)
- ✅ Form validation (required fields, email format)
- ✅ Razorpay payment gateway integration
- ✅ Backend verification after payment
- ✅ Success/error messaging in both English and Hindi
- ✅ Payment processing state (loading indicator)
- ✅ Form reset after successful donation

### Important Notes

- **Razorpay Key ID**: Only the public Key ID goes in frontend `.env`
- **Backend URL**: Update `VITE_API_URL` for production deployment
- **Test Mode**: Use Razorpay test keys during development
- **Security**: All sensitive operations (signature verification, database writes) happen on the backend

### Troubleshooting

- **"Razorpay Key ID not configured"**: Make sure `.env` file exists and has `VITE_RAZORPAY_KEY_ID`
- **Payment opens but verification fails**: Check that backend server is running on port 3001
- **CORS errors**: Ensure backend has CORS enabled (already configured in `server/index.js`)
- **Database errors**: Verify Supabase credentials in `server/.env` and that the `donations` table exists

### Next Steps

1. ✅ Backend server setup - **Done**
2. ✅ Supabase table creation - **Done**
3. ✅ Frontend integration - **Done**
4. 🔄 Test with real Razorpay test payments
5. 🔄 Deploy backend to production (Vercel, Railway, etc.)
6. 🔄 Update `VITE_API_URL` to production backend URL
7. 🔄 Switch to Razorpay Live Mode keys for production










