import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
// Optional: Uncomment to enable rate limiting
// import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Optional: Rate limiting (uncomment if needed)
// Limits: 10 requests per 15 minutes per IP for donation endpoints
// const donationLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // 10 requests per window
//   message: { error: 'Too many requests, please try again later.' },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// Initialize Supabase client with Service Role Key (backend only)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * POST /api/create-order
 * Creates a Razorpay order for donation
 * 
 * Expected body:
 * {
 *   amount: number (in paise, e.g., 50100 for ₹501)
 *   currency: string (default: "INR")
 * }
 */
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount is required and must be greater than 0'
      });
    }

    // Create Razorpay order
    const options = {
      amount: parseInt(amount), // Amount in paise
      currency: currency,
      receipt: `donation_${Date.now()}`,
      notes: {
        type: 'donation'
      }
    };

    const order = await razorpay.orders.create(options);

    console.log('Razorpay order created:', order.id);

    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      }
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create payment order'
    });
  }
});

/**
 * POST /api/verify-donation
 * Verifies Razorpay payment signature and records donation in database
 * 
 * Expected body:
 * {
 *   payment_id: string (razorpay_payment_id)
 *   order_id: string (razorpay_order_id)
 *   signature: string (razorpay_signature)
 *   amount: number (in paise, e.g., 50100 for ₹501)
 *   currency: string (default: "INR")
 *   donor_name: string
 *   donor_email: string
 *   donor_phone: string (optional)
 * }
 */
app.post('/api/verify-donation', async (req, res) => {
  try {
    // Log incoming request (minimal logging for production)
    console.log('Verifying donation:', req.body.payment_id);

    const {
      payment_id,
      order_id,
      signature,
      amount,
      currency = 'INR',
      donor_name,
      donor_email,
      donor_phone
    } = req.body;

    // Validate required fields (check for both undefined and empty strings)
    const missingFields = [];
    if (!payment_id || (typeof payment_id === 'string' && payment_id.trim() === '')) missingFields.push('payment_id');
    if (!order_id || (typeof order_id === 'string' && order_id.trim() === '')) missingFields.push('order_id');
    if (!signature || (typeof signature === 'string' && signature.trim() === '')) missingFields.push('signature');
    if (!amount || amount === 0) missingFields.push('amount');
    if (!donor_name || (typeof donor_name === 'string' && donor_name.trim() === '')) missingFields.push('donor_name');
    if (!donor_email || (typeof donor_email === 'string' && donor_email.trim() === '')) missingFields.push('donor_email');

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      console.error('Received data:', {
        payment_id: payment_id || 'MISSING',
        order_id: order_id || 'MISSING',
        signature: signature ? 'PRESENT' : 'MISSING',
        amount: amount || 'MISSING',
        donor_name: donor_name || 'MISSING',
        donor_email: donor_email || 'MISSING'
      });
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Verify Razorpay signature using HMAC SHA256
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      console.error('RAZORPAY_KEY_SECRET not configured');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // Create signature string: order_id|payment_id
    const signatureString = `${order_id}|${payment_id}`;
    
    // Generate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(signatureString)
      .digest('hex');

    // Compare signatures (use timing-safe comparison)
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValid) {
      console.warn(`Invalid signature for payment_id: ${payment_id}`);
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature'
      });
    }

    // Signature is valid - insert donation record into Supabase
    const { data, error: dbError } = await supabase
      .from('donations')
      .insert({
        donor_name,
        donor_email,
        donor_phone: donor_phone || null,
        amount: parseInt(amount), // Store in paise
        currency,
        razorpay_payment_id: payment_id,
        razorpay_order_id: order_id,
        razorpay_signature: signature,
        verified: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      
      // Check if it's a duplicate payment_id (unique constraint violation)
      if (dbError.code === '23505') {
        return res.status(409).json({
          success: false,
          error: 'Payment already recorded'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to record donation'
      });
    }

    // Success
    console.log(`Donation verified and recorded: ${payment_id} - ₹${amount / 100}`);
    
    return res.status(200).json({
      success: true,
      message: 'Donation verified and recorded successfully',
      donation: {
        id: data.id,
        payment_id: data.razorpay_payment_id,
        order_id: data.razorpay_order_id,
        amount: data.amount,
        currency: data.currency,
        donor_name: data.donor_name,
        donor_email: data.donor_email,
        donor_phone: data.donor_phone,
        verified: data.verified,
        created_at: data.created_at
      }
    });

  } catch (error) {
    console.error('Error in verify-donation:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

