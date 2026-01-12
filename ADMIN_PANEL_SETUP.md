# Admin Panel Setup Guide

## Overview

The admin panel allows you to monitor all payments and donations received through the platform. It provides:

- **Real-time payment monitoring**
- **Donation statistics**
- **Search and filter functionality**
- **Pagination for large datasets**

## Setup Instructions

### 1. Backend Configuration

Add the admin password to your `server/.env` file:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**⚠️ Important:** 
- Use a strong password in production
- Never commit the `.env` file to Git
- Change the default password immediately

### 2. Access the Admin Panel

1. Start your backend server:
   ```bash
   cd server
   npm start
   ```

2. Start your frontend:
   ```bash
   npm run dev
   ```

3. Navigate to: `http://localhost:5173/admin`

4. Enter the admin password you set in `server/.env`

## Features

### Dashboard Statistics
- **Total Donations**: Count of all donations
- **Total Amount**: Sum of all donations in ₹
- **Verified Donations**: Count of verified payments
- **Last 30 Days**: Recent donations and amount

### Payment Table
- View all donations with:
  - Date and time
  - Donor information (name, email, phone)
  - Amount
  - Razorpay Payment ID
  - Verification status

### Search Functionality
- Search by donor name
- Search by email
- Search by payment ID

### Pagination
- View 20 donations per page
- Navigate through pages easily

## API Endpoints

### POST `/api/admin/login`
Login to admin panel.

**Request:**
```json
{
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "authentication_token"
}
```

### GET `/api/admin/donations`
Get all donations (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `search` (optional): Search term

**Response:**
```json
{
  "success": true,
  "donations": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "stats": {
    "totalDonations": 100,
    "totalAmount": 5000000,
    "totalAmountInRupees": 50000
  }
}
```

### GET `/api/admin/stats`
Get donation statistics (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalDonations": 100,
    "verifiedDonations": 95,
    "totalAmount": 5000000,
    "totalAmountInRupees": 50000,
    "recentDonations": 10,
    "recentAmount": 500000,
    "recentAmountInRupees": 5000
  }
}
```

## Security Notes

1. **Password Protection**: The admin panel is protected by a password. Set a strong password in production.

2. **Token Storage**: The authentication token is stored in localStorage. For production, consider implementing:
   - JWT tokens with expiration
   - Refresh tokens
   - More secure token storage

3. **HTTPS**: Always use HTTPS in production to protect the password during login.

4. **Rate Limiting**: Consider adding rate limiting to prevent brute force attacks.

## Troubleshooting

### Can't login?
- Check that `ADMIN_PASSWORD` is set in `server/.env`
- Restart the backend server after changing `.env`
- Check browser console for errors

### No donations showing?
- Verify that donations have been recorded in Supabase
- Check that the Supabase connection is working
- Verify the `donations` table exists in your Supabase database

### API errors?
- Check that the backend server is running
- Verify `VITE_API_URL` in frontend `.env` points to correct backend
- Check browser console and server logs for error messages

## Production Deployment

When deploying to production:

1. **Set strong admin password** in environment variables
2. **Use HTTPS** for all connections
3. **Implement JWT tokens** instead of simple token authentication
4. **Add rate limiting** to prevent brute force attacks
5. **Monitor access logs** for suspicious activity
6. **Regularly rotate** the admin password








