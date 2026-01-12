# Sankalp Sewa Sansthan - Full-Stack NGO Website Project

## Project Overview
Developed a comprehensive, production-ready full-stack web application for Sankalp Sewa Sansthan, a registered NGO in Kishangarh, Rajasthan, serving communities across the state. The platform enables online donations, showcases organizational initiatives, and provides administrative tools for donation management.

## Technical Stack

### Frontend
- **React 18** - Modern component-based UI framework
- **Vite** - Next-generation build tool for fast development and optimized production builds
- **React Router DOM v6** - Client-side routing with dynamic route parameters
- **Framer Motion** - Advanced animations and page transitions
- **CSS Modules** - Component-scoped styling with CSS variables for theming
- **Context API** - State management for language switching and global state

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - RESTful API framework
- **Razorpay SDK** - Payment gateway integration for secure online transactions
- **Supabase** - PostgreSQL database with real-time capabilities
- **CORS** - Cross-origin resource sharing configuration
- **dotenv** - Environment variable management

### Database
- **PostgreSQL** (via Supabase) - Relational database
- **Database Schema Design** - Normalized schema with proper indexing
- **Database Migrations** - Version-controlled schema changes

### Deployment & DevOps
- **Vercel** - Frontend deployment with automatic CI/CD
- **Render/Railway** - Backend server deployment
- **Environment Variables** - Secure configuration management
- **Git Version Control** - Code versioning and collaboration

## Key Features Implemented

### 1. **Bilingual Support (i18n)**
- Complete English/Hindi translation system
- Language context provider for global state management
- Dynamic language switching with persistent user preference
- 700+ translation strings across all pages

### 2. **Payment Integration**
- **Razorpay Payment Gateway** - Secure payment processing
- Real-time order creation and payment verification
- Payment signature validation for security
- Support for multiple donation causes (6 categories)
- Custom amount input with validation
- Payment success/failure handling with user feedback
- Transaction data persistence in database

### 3. **Admin Dashboard**
- **Authentication System** - Token-based admin login
- **Real-time Statistics** - Total donations, amounts, verified transactions
- **Advanced Filtering** - Search by name, email, phone, payment ID
- **Cause-based Filtering** - Filter donations by cause category
- **Pagination** - Efficient data loading (50 items per page)
- **Auto-logout** - Security feature on navigation away
- **Responsive Design** - Works on all device sizes
- **Data Export Ready** - Structured API responses for reporting

### 4. **Donation Management System**
- Multi-cause donation selection (Gau Sewa, Child Education, Healthcare, etc.)
- Form validation (client-side and server-side)
- Donor information collection (name, email, phone)
- Payment verification with cryptographic signature validation
- Database transaction logging with timestamps
- Donation verification status tracking

### 5. **Content Management**
- **Dynamic Pages** - 15+ fully functional pages
- **Event Management** - Upcoming events with detail pages
- **Initiative Showcases** - Detailed pages for major programs
- **Gallery System** - Responsive image grid with lightbox
- **Team Member Profiles** - Interactive member cards with detail pages
- **Video Integration** - Cow feeding videos for transparency

### 6. **User Experience Features**
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Framer Motion for page transitions and scroll animations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **Loading States** - User feedback during async operations
- **Error Handling** - Comprehensive error messages and fallbacks
- **Scroll to Top** - Navigation enhancement
- **Chatbot Integration** - Interactive user assistance

### 7. **Security Features**
- Payment signature verification
- Admin authentication with token-based authorization
- Environment variable protection for API keys
- CORS configuration for API security
- Input validation and sanitization
- SQL injection prevention via parameterized queries

## Pages & Components

### Pages (15+)
1. Home - Hero section, trust indicators, team members, focus areas
2. About - Organization history, vision, mission
3. Programs - Initiative cards with detail pages
4. Impact - Community impact stories and statistics
5. Get Involved - Volunteer opportunities
6. Gallery - Responsive image gallery
7. Contact - Contact form and location information
8. Legal - Registration details and transparency
9. Donate - Payment form with Razorpay integration
10. Donation Success/Failed - Payment status pages
11. Admin Panel - Dashboard for donation management
12. Event Detail - Dynamic event pages
13. Initiative Detail - Program detail pages (Gau Shala, Ladli Ghar)
14. Member Profile - Individual team member profiles
15. Various detail pages for initiatives

### Reusable Components (20+)
- Navbar with mobile menu
- Footer with social links
- Hero sections
- Program cards
- Event cards
- Member cards
- Donation section
- Trust indicators
- Focus area cards
- Timeline component
- Scroll reveal animations
- Chatbot widget
- Video players
- And more...

## Database Schema

### Donations Table
- `id` (BIGSERIAL PRIMARY KEY)
- `donor_name` (TEXT NOT NULL)
- `donor_email` (TEXT NOT NULL)
- `donor_phone` (TEXT NOT NULL)
- `amount` (INTEGER NOT NULL) - in paise
- `currency` (TEXT DEFAULT 'INR')
- `cause` (TEXT NOT NULL) - donation category
- `razorpay_payment_id` (TEXT UNIQUE)
- `razorpay_order_id` (TEXT NOT NULL)
- `razorpay_signature` (TEXT NOT NULL)
- `verified` (BOOLEAN DEFAULT false)
- `created_at` (TIMESTAMPTZ DEFAULT NOW())

### Indexes
- Index on `donor_phone` for search optimization
- Index on `cause` for filtering
- Unique constraint on `razorpay_payment_id`

## API Endpoints

### Public Endpoints
- `POST /api/create-order` - Create Razorpay payment order
- `POST /api/verify-donation` - Verify and store donation
- `GET /health` - Server health check

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/donations` - Fetch donations with pagination, search, filtering
- `GET /api/admin/stats` - Get donation statistics

## Technical Achievements

### 1. **Full-Stack Development**
- Built complete frontend and backend from scratch
- Integrated third-party payment gateway
- Designed and implemented database schema
- Created RESTful API architecture

### 2. **Payment Processing**
- Integrated Razorpay payment gateway
- Implemented secure payment verification using cryptographic signatures
- Handled payment success/failure scenarios
- Created order management system

### 3. **Database Design**
- Designed normalized database schema
- Implemented database migrations
- Created indexes for query optimization
- Ensured data integrity with constraints

### 4. **State Management**
- Implemented Context API for global state
- Managed authentication state
- Handled form state and validation
- Optimized re-renders with proper state management

### 5. **Security Implementation**
- Payment signature verification
- Token-based authentication
- Environment variable protection
- Input validation and sanitization
- CORS configuration

### 6. **Performance Optimization**
- Code splitting with React Router
- Lazy loading for images
- Optimized animations with Framer Motion
- Database query optimization with indexes
- Pagination for large datasets

### 7. **User Experience**
- Responsive design for all screen sizes
- Smooth page transitions
- Loading states and error handling
- Bilingual support
- Accessibility features

### 8. **DevOps & Deployment**
- Configured Vercel for frontend deployment
- Set up backend server deployment
- Environment variable management
- CI/CD pipeline configuration
- Production build optimization

## Project Statistics

- **Total Pages**: 15+
- **Reusable Components**: 20+
- **API Endpoints**: 6
- **Database Tables**: 1 (with proper schema)
- **Translation Strings**: 700+
- **Lines of Code**: ~10,000+
- **Development Time**: Full-stack project
- **Deployment**: Production-ready

## Skills Demonstrated

### Frontend Skills
- React.js (Hooks, Context API, Router)
- Modern JavaScript (ES6+)
- CSS Modules & Styling
- Responsive Web Design
- Animation Libraries (Framer Motion)
- Form Handling & Validation
- State Management
- Component Architecture

### Backend Skills
- Node.js & Express.js
- RESTful API Design
- Database Design (PostgreSQL)
- Payment Gateway Integration
- Authentication & Authorization
- Error Handling
- API Security

### Database Skills
- PostgreSQL
- Schema Design
- Database Migrations
- Query Optimization
- Indexing Strategies

### DevOps Skills
- Git Version Control
- Environment Configuration
- Deployment (Vercel, Render/Railway)
- CI/CD Pipeline
- Production Build Optimization

### Soft Skills
- Problem Solving
- Full-Stack Architecture
- Third-Party API Integration
- Security Best Practices
- User Experience Design
- Performance Optimization

## Resume Bullet Points

### For Software Developer / Full-Stack Developer Role:

• **Developed a full-stack NGO donation platform** using React, Node.js, and PostgreSQL, enabling secure online donations with Razorpay payment gateway integration, processing transactions with cryptographic signature verification

• **Built a comprehensive admin dashboard** with real-time statistics, advanced filtering (search, pagination, cause-based filtering), and token-based authentication, enabling efficient donation management and reporting

• **Implemented bilingual support (English/Hindi)** using React Context API, managing 700+ translation strings across 15+ pages with dynamic language switching and persistent user preferences

• **Designed and implemented database schema** with PostgreSQL via Supabase, including proper indexing, constraints, and migration scripts for optimized query performance and data integrity

• **Created RESTful API architecture** with Express.js, implementing secure endpoints for payment processing, donation verification, and admin operations with proper error handling and validation

• **Developed responsive, accessible UI** with React, CSS Modules, and Framer Motion, ensuring mobile-first design, smooth animations, and WCAG compliance across all device sizes

• **Integrated third-party payment gateway (Razorpay)** with complete payment flow including order creation, signature verification, success/failure handling, and transaction logging

• **Deployed production-ready application** on Vercel (frontend) and Render/Railway (backend), configuring environment variables, CI/CD pipelines, and optimizing build processes

• **Implemented security best practices** including payment signature verification, token-based authentication, CORS configuration, input validation, and SQL injection prevention

• **Built 15+ dynamic pages and 20+ reusable components** including donation forms, admin panels, event management, gallery systems, and team member profiles with interactive features

### For Frontend Developer Role:

• **Developed a responsive React application** with 15+ pages using React Router, Context API, and Framer Motion, implementing smooth page transitions, animations, and component-based architecture

• **Implemented bilingual support (English/Hindi)** using React Context API, managing 700+ translation strings with dynamic language switching and persistent user preferences

• **Built interactive UI components** including donation forms with validation, admin dashboards, image galleries, event cards, and team member profiles with hover effects and animations

• **Integrated Razorpay payment gateway** in React, handling payment flow, form validation, error states, and success/failure redirects with proper user feedback

• **Created responsive, accessible designs** using CSS Modules, mobile-first approach, semantic HTML, ARIA labels, and ensuring WCAG compliance across all pages

• **Optimized performance** with code splitting, lazy loading, optimized animations, and efficient state management to ensure fast load times and smooth user experience

### For Backend Developer Role:

• **Developed RESTful API** using Node.js and Express.js, implementing secure endpoints for payment processing, donation management, and admin operations with proper error handling

• **Integrated Razorpay payment gateway** with cryptographic signature verification, order creation, payment validation, and secure transaction logging to database

• **Designed and implemented PostgreSQL database schema** with proper indexing, constraints, and migration scripts, optimizing queries for admin dashboard filtering and reporting

• **Built admin authentication system** with token-based authorization, implementing secure login, protected routes, and session management

• **Implemented payment verification system** with signature validation, ensuring transaction integrity and preventing fraudulent payments

• **Created comprehensive API documentation** and error handling, with proper HTTP status codes, validation messages, and logging for debugging and monitoring

## Technologies Used (For Skills Section)

**Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, CSS Modules, Framer Motion, React Router, Context API, Vite

**Backend:** Node.js, Express.js, RESTful APIs, Razorpay SDK

**Database:** PostgreSQL, Supabase, SQL, Database Design, Migrations

**Tools & DevOps:** Git, Vercel, Render/Railway, Environment Variables, CI/CD

**Third-Party Integrations:** Razorpay Payment Gateway, Supabase Database

## Project Highlights

✅ **Production-Ready** - Fully deployed and functional
✅ **Secure** - Payment verification, authentication, input validation
✅ **Scalable** - Modular architecture, reusable components
✅ **Accessible** - WCAG compliant, semantic HTML
✅ **Responsive** - Works on all devices
✅ **Bilingual** - English/Hindi support
✅ **Well-Documented** - Code comments, API documentation
✅ **Optimized** - Fast load times, efficient queries

---

**Project Type:** Full-Stack Web Application
**Industry:** Non-Profit / NGO
**Status:** Production-Ready / Live
**Team Size:** Individual Project (or specify if team)
**Duration:** [Your Duration]



