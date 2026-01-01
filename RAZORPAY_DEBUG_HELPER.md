# Razorpay Response Debugging Helper

## Current Issue
The Razorpay response has only 1 key, but we can't see what's inside it. This is preventing payment verification.

## What to Do

### Step 1: Make a Test Payment
1. Open browser console (F12)
2. Go to Donate page
3. Fill in the form
4. Click "Donate"
5. Complete the payment

### Step 2: Check Console Logs
Look for these logs in order:

1. **"=== Razorpay Response Debug ==="**
   - This shows the full response structure

2. **"Response has X key(s):"**
   - This shows what keys are in the response

3. **"Response appears to be wrapped in key:"**
   - If you see this, the response is wrapped

4. **"Unwrapped response:"**
   - This shows what's inside after unwrapping

5. **"Extracted values:"**
   - This shows if payment_id, order_id, signature were found

### Step 3: Share the Logs
Copy and share:
- The "Full response:" JSON output
- The "Unwrapped response:" JSON output (if present)
- The "Extracted values:" object

## Common Issues

### Issue 1: Response is Wrapped
**Symptom:** Response has 1 key, unwrapping shows the actual data
**Solution:** Code already handles this - should work automatically

### Issue 2: Response Structure is Different
**Symptom:** Unwrapped response still doesn't have razorpay_payment_id
**Solution:** We need to see the actual structure to fix it

### Issue 3: Payment Wasn't Actually Successful
**Symptom:** "Payment cancelled by user" in console
**Solution:** Make sure payment completes fully before closing modal

## Quick Test
After making a payment, in the console, type:
```javascript
// This will show the last Razorpay response
console.log('Last response:', window.lastRazorpayResponse)
```

## Next Steps
Once we see the actual response structure, we can:
1. Update the extraction logic to match the actual format
2. Fix the verification process
3. Test again

