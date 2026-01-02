# Frontend Integration Guide

This guide shows how to connect your existing Razorpay checkout to the backend verification endpoint.

## Step 1: Update Your Donate Component

In `src/pages/Donate.jsx`, replace the `handleDonate` function with Razorpay integration:

```javascript
const handleDonate = async () => {
  if (finalAmount <= 0 || isNaN(finalAmount)) {
    setError(t.errors.invalidAmount)
    return
  }

  if (finalAmount < 1) {
    setError(t.errors.minDonation)
    return
  }

  // Convert amount to paise (multiply by 100)
  const amountInPaise = Math.round(finalAmount * 100)

  // Razorpay options
  const options = {
    key: process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxx', // Your Razorpay Key ID
    amount: amountInPaise,
    currency: 'INR',
    name: 'Sankalp Sewa Sansthan',
    description: `Donation for ${cause}`,
    handler: async function (response) {
      // This function is called after successful payment
      try {
        // Call backend to verify and record donation
        const verifyResponse = await fetch('http://localhost:3001/api/verify-donation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: amountInPaise,
            currency: 'INR',
            donor_name: 'Donor Name', // Get from form input
            donor_email: 'donor@example.com', // Get from form input
            donor_phone: '+919876543210', // Optional, get from form input
          })
        })

        const data = await verifyResponse.json()

        if (data.success) {
          // Show success message
          alert(language === 'en' 
            ? 'Thank you for your donation! Your payment has been verified.'
            : 'आपके दान के लिए धन्यवाद! आपका भुगतान सत्यापित हो गया है।')
          
          // Optionally redirect or reset form
          setAmount(501)
          setCustomAmount('')
          setError('')
        } else {
          // Verification failed
          alert(language === 'en'
            ? 'Payment verification failed. Please contact support with payment ID: ' + response.razorpay_payment_id
            : 'भुगतान सत्यापन विफल। कृपया समर्थन से संपर्क करें: ' + response.razorpay_payment_id)
        }
      } catch (error) {
        console.error('Error verifying donation:', error)
        alert(language === 'en'
          ? 'An error occurred while verifying your payment. Please contact support.'
          : 'आपके भुगतान को सत्यापित करते समय एक त्रुटि हुई। कृपया समर्थन से संपर्क करें।')
      }
    },
    prefill: {
      name: 'Donor Name', // Pre-fill from form
      email: 'donor@example.com', // Pre-fill from form
      contact: '+919876543210' // Pre-fill from form
    },
    theme: {
      color: '#3399cc'
    },
    modal: {
      ondismiss: function() {
        // User closed the payment modal
        console.log('Payment cancelled by user')
      }
    }
  }

  // Open Razorpay checkout
  const razorpay = new window.Razorpay(options)
  razorpay.open()
}
```

## Step 2: Add Environment Variable for Frontend

Create or update `.env` in your project root (not in server folder):

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

**Note:** Only the Key ID goes in frontend. Never put `RAZORPAY_KEY_SECRET` in frontend!

## Step 3: Update API URL for Production

When deploying, update the API URL in the fetch call:

```javascript
// Development
const API_URL = 'http://localhost:3001/api/verify-donation'

// Production (update with your server URL)
const API_URL = 'https://your-backend-domain.com/api/verify-donation'
```

## Step 4: Add Donor Information Form (Optional)

You may want to collect donor information before opening Razorpay:

```javascript
const [donorName, setDonorName] = useState('')
const [donorEmail, setDonorEmail] = useState('')
const [donorPhone, setDonorPhone] = useState('')

// Add form fields in your JSX, then use these values in:
// - options.prefill
// - options.handler body (donor_name, donor_email, donor_phone)
```

## Complete Example

Here's a more complete example with donor form:

```javascript
const [donorName, setDonorName] = useState('')
const [donorEmail, setDonorEmail] = useState('')
const [donorPhone, setDonorPhone] = useState('')

const handleDonate = async () => {
  // Validation
  if (finalAmount <= 0 || isNaN(finalAmount)) {
    setError(t.errors.invalidAmount)
    return
  }

  if (!donorName || !donorEmail) {
    setError(language === 'en' ? 'Please enter your name and email' : 'कृपया अपना नाम और ईमेल दर्ज करें')
    return
  }

  const amountInPaise = Math.round(finalAmount * 100)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/verify-donation'

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amountInPaise,
    currency: 'INR',
    name: 'Sankalp Sewa Sansthan',
    description: `Donation for ${cause}`,
    handler: async function (response) {
      try {
        const verifyResponse = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: amountInPaise,
            currency: 'INR',
            donor_name: donorName,
            donor_email: donorEmail,
            donor_phone: donorPhone || null,
          })
        })

        const data = await verifyResponse.json()
        
        if (data.success) {
          alert(language === 'en' 
            ? 'Thank you for your donation!'
            : 'आपके दान के लिए धन्यवाद!')
          // Reset form
          setAmount(501)
          setCustomAmount('')
          setDonorName('')
          setDonorEmail('')
          setDonorPhone('')
        } else {
          alert(language === 'en'
            ? 'Verification failed. Please contact support.'
            : 'सत्यापन विफल। कृपया समर्थन से संपर्क करें।')
        }
      } catch (error) {
        console.error('Error:', error)
        alert(language === 'en'
          ? 'An error occurred. Please contact support.'
          : 'एक त्रुटि हुई। कृपया समर्थन से संपर्क करें।')
      }
    },
    prefill: {
      name: donorName,
      email: donorEmail,
      contact: donorPhone
    },
    theme: { color: '#3399cc' }
  }

  const razorpay = new window.Razorpay(options)
  razorpay.on('payment.failed', function (response) {
    alert(language === 'en'
      ? 'Payment failed. Please try again.'
      : 'भुगतान विफल। कृपया पुनः प्रयास करें।')
  })
  razorpay.open()
}
```

## Testing

1. Start the backend server: `cd server && npm run dev`
2. Start the frontend: `npm run dev`
3. Make a test donation using Razorpay test cards
4. Check Supabase dashboard to see the donation record

## Test Cards (Razorpay Test Mode)

- **Success**: Card number `4111 1111 1111 1111`, any future expiry, any CVV
- **Failure**: Card number `4000 0000 0000 0002`



