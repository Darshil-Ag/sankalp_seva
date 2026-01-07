# Sankalp Seva - Backend Server

Backend server for Razorpay donation verification and Supabase database recording.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials in `.env`:
   - **Razorpay Keys**: Get from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
     - Use **Test Mode** keys for development
     - `RAZORPAY_KEY_ID`: Your Razorpay Key ID
     - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret (keep this secret!)
   
   - **Supabase Credentials**: Get from [Supabase Project Settings](https://app.supabase.com/project/_/settings/api)
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_SERVICE_ROLE_KEY`: Your Service Role Key (not the anon key!)

### 3. Create Supabase Table

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase-schema.sql` to create the `donations` table

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001` (or the PORT specified in `.env`).

### 5. Test the Server

Check if the server is running:
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","timestamp":"2025-01-XX..."}
```

## API Endpoints

### POST `/api/verify-donation`

Verifies Razorpay payment signature and records donation in database.

**Request Body:**
```json
{
  "payment_id": "pay_xxxxxxxxxxxxx",
  "order_id": "order_xxxxxxxxxxxxx",
  "signature": "xxxxxxxxxxxxxxxxxxxxxxxx",
  "amount": 50100,
  "currency": "INR",
  "donor_name": "John Doe",
  "donor_email": "john@example.com",
  "donor_phone": "+919876543210"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Donation verified and recorded successfully",
  "donation": {
    "id": 1,
    "payment_id": "pay_xxxxxxxxxxxxx",
    "amount": 50100,
    "verified": true
  }
}
```

**Error Responses:**
- `400`: Invalid signature or missing required fields
- `409`: Payment already recorded (duplicate)
- `500`: Server error

## Frontend Integration

After Razorpay checkout succeeds, call this endpoint from your frontend:

```javascript
// Example: In your Razorpay success handler
const handleRazorpaySuccess = async (paymentResponse) => {
  try {
    const response = await fetch('http://localhost:3001/api/verify-donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_id: paymentResponse.razorpay_payment_id,
        order_id: paymentResponse.razorpay_order_id,
        signature: paymentResponse.razorpay_signature,
        amount: paymentResponse.amount, // Amount in paise
        currency: 'INR',
        donor_name: donorName,
        donor_email: donorEmail,
        donor_phone: donorPhone
      })
    });

    const data = await response.json();
    
    if (data.success) {
      // Show success message to user
      alert('Thank you for your donation!');
    } else {
      // Handle error
      alert('Payment verification failed. Please contact support.');
    }
  } catch (error) {
    console.error('Error verifying donation:', error);
    alert('An error occurred. Please contact support.');
  }
};
```

**Important Notes:**
- Update the API URL to your production server URL when deploying
- Amount should be in **paise** (multiply rupees by 100)
- Never expose `RAZORPAY_KEY_SECRET` or `SUPABASE_SERVICE_ROLE_KEY` in frontend code

## Security Notes

1. **Never commit `.env` file** - It contains sensitive keys
2. **Use Service Role Key** - Only in backend, never in frontend
3. **Signature Verification** - Always verify Razorpay signatures server-side
4. **HTTPS in Production** - Always use HTTPS in production

## Troubleshooting

- **Port already in use**: Change `PORT` in `.env`
- **Database connection error**: Verify Supabase URL and Service Role Key
- **Invalid signature**: Check that `RAZORPAY_KEY_SECRET` matches your Razorpay account
- **Duplicate payment**: Payment ID already exists in database (idempotency)






