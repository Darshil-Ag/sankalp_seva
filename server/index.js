import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Razorpay configuration
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  console.error('❌ Missing Razorpay credentials in .env file');
  console.error('   Required: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
  process.exit(1);
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret
});

// Admin password (should be set in environment variables)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this in production!

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Create Razorpay order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Amount must be greater than 0.'
      });
    }

    // Create order in Razorpay
    const options = {
      amount: parseInt(amount), // Amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        source: 'Sankalp Sewa Sansthan Website'
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create payment order'
    });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    if (password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = crypto.randomBytes(32).toString('hex');
      
      res.json({
        success: true,
        message: 'Login successful',
        token: token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Middleware to verify admin token (simple implementation)
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  // In production, implement proper JWT verification
  // For now, we'll use a simple check - you should implement proper JWT
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided'
    });
  }
  
  // Simple token validation (replace with JWT in production)
  next();
};

// Get all donations (Admin only)
app.get('/api/admin/donations', verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = supabase
      .from('donations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Add search filter if provided
    if (search) {
      query = query.or(`donor_name.ilike.%${search}%,donor_email.ilike.%${search}%,donor_phone.ilike.%${search}%,razorpay_payment_id.ilike.%${search}%`);
    }

    // Add cause filter if provided
    const { cause: causeFilter } = req.query;
    if (causeFilter && causeFilter !== 'all') {
      query = query.eq('cause', causeFilter);
    }

    // Add pagination
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching donations',
        error: error.message
      });
    }

    // Calculate total amount
    const totalAmount = data.reduce((sum, donation) => sum + donation.amount, 0);

    res.json({
      success: true,
      donations: data || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        totalPages: Math.ceil((count || 0) / parseInt(limit))
      },
      stats: {
        totalDonations: count || 0,
        totalAmount: totalAmount,
        totalAmountInRupees: totalAmount / 100
      }
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get donation statistics (Admin only)
app.get('/api/admin/stats', verifyAdmin, async (req, res) => {
  try {
    // Get total donations count
    const { count: totalCount } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true });

    // Get total amount
    const { data: allDonations } = await supabase
      .from('donations')
      .select('amount, created_at, verified');

    const totalAmount = allDonations?.reduce((sum, d) => sum + d.amount, 0) || 0;
    const verifiedCount = allDonations?.filter(d => d.verified).length || 0;

    // Get donations by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: recentCount } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    const recentDonations = allDonations?.filter(d => 
      new Date(d.created_at) >= thirtyDaysAgo
    ) || [];
    const recentAmount = recentDonations.reduce((sum, d) => sum + d.amount, 0);

    res.json({
      success: true,
      stats: {
        totalDonations: totalCount || 0,
        verifiedDonations: verifiedCount,
        totalAmount: totalAmount,
        totalAmountInRupees: totalAmount / 100,
        recentDonations: recentCount || 0,
        recentAmount: recentAmount,
        recentAmountInRupees: recentAmount / 100
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Verify donation endpoint (existing)
app.post('/api/verify-donation', async (req, res) => {
  try {
    const {
      payment_id,
      order_id,
      signature,
      amount,
      currency,
      donor_name,
      donor_email,
      donor_phone,
      cause
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!payment_id || payment_id.trim() === '') missingFields.push('payment_id');
    if (!order_id || order_id.trim() === '') missingFields.push('order_id');
    if (!signature || signature.trim() === '') missingFields.push('signature');
    if (!amount || amount === 0) missingFields.push('amount');
    if (!donor_name || donor_name.trim() === '') missingFields.push('donor_name');
    if (!donor_email || donor_email.trim() === '') missingFields.push('donor_email');
    if (!donor_phone || donor_phone.trim() === '') missingFields.push('donor_phone');
    if (!cause || cause.trim() === '') missingFields.push('cause');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Verify Razorpay signature
    const signatureString = `${order_id}|${payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(signatureString)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Check if payment already exists
    const { data: existingDonation } = await supabase
      .from('donations')
      .select('id')
      .eq('razorpay_payment_id', payment_id)
      .single();

    if (existingDonation) {
      return res.status(409).json({
        success: false,
        message: 'Payment already recorded'
      });
    }

    // Insert donation into database
    const { data: donation, error } = await supabase
      .from('donations')
      .insert({
        donor_name: donor_name.trim(),
        donor_email: donor_email.trim(),
        donor_phone: donor_phone.trim(),
        amount: parseInt(amount),
        currency: currency || 'INR',
        cause: cause.trim(),
        razorpay_payment_id: payment_id,
        razorpay_order_id: order_id,
        razorpay_signature: signature,
        verified: true
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error recording donation',
        error: error.message
      });
    }

    res.json({
      success: true,
      message: 'Donation verified and recorded successfully',
      donation: {
        id: donation.id,
        payment_id: donation.razorpay_payment_id,
        amount: donation.amount,
        verified: donation.verified
      }
    });
  } catch (error) {
    console.error('Verify donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin panel API available at http://localhost:${PORT}/api/admin`);
});
