# 📚 Lab-Task4: Naqvix Digital Services Platform - Complete Documentation

> Full-stack digital services platform with user authentication, order management, and admin panel

## 🎯 Quick Summary

### **What Just Got Fixed** ✨
**Order Tracking** - Users can now see their placed orders in "My Orders" page!

**The Fix**: Changed `req.session.user._id` to `req.session.user.id` in [routes/orders.js](routes/orders.js#L63)

### **Admin Panel Access**
```
Email:    admin@naqvix.com
Password: Admin@1234
URL:      http://localhost:3000/admin/dashboard
```

---

## 📖 Documentation Guide

### **📄 QUICK_START_GUIDE.md** ⭐ START HERE
Best for getting started quickly. Contains:
- Order tracking overview (FIXED!)
- Admin credentials
- Quick test instructions
- Important URLs

### **📋 ORDER_TRACKING_AND_ADMIN_GUIDE.md**
Detailed reference for all features:
- Complete admin panel guide
- All 4 admin features explained
- Troubleshooting section
- Security features
- API endpoints

### **📊 SUMMARY_GUIDE.md**
Complete overview of everything:
- Problem & solution
- All admin features
- How order tracking works
- Verification checklist
- User roles & access matrix

### **🔍 BEFORE_AFTER_ANALYSIS.md**
Deep dive into the bug:
- Before (broken code)
- After (fixed code)
- Why it failed
- Session object explanation
- Database query comparison

---

## 🎯 Key Features

### **1. Order Tracking** ✅ FIXED
- Customers can view all placed orders
- Shows order ID, date, services, total, status
- Pagination support
- Real-time order details

### **2. Admin Dashboard** ✅ WORKING
- View all services in table format
- Quick edit/delete buttons
- Service count and categories

### **3. Service Management** ✅ WORKING
**Create**: Add new services with images (5MB max)
**Edit**: Modify service details and images
**Delete**: Remove services permanently
**Upload**: Supports JPG, PNG, WebP, GIF

### **4. User Features** ✅ WORKING
**Register**: Create customer accounts
**Login**: Secure authentication
**Browse**: Browse digital services
**Cart**: Add services to cart
**Checkout**: Place orders with details
**Track**: View order history

---

## 🔐 User Roles & Access

| Feature | Customer | Admin |
|---------|----------|-------|
| Browse Services | ✅ | ✅ |
| Place Orders | ✅ | ✅ |
| **View Own Orders** | ✅ | ❌ |
| **View Dashboard** | ❌ | ✅ |
| **Create Service** | ❌ | ✅ |
| **Edit Service** | ❌ | ✅ |
| **Delete Service** | ❌ | ✅ |
| **Upload Images** | ❌ | ✅ |

---

## 🚀 Quick URLs

| Page | URL |
|------|-----|
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Create Service | http://localhost:3000/admin/create |
| My Orders | http://localhost:3000/orders |
| Services | http://localhost:3000/services |
| Login | http://localhost:3000/auth/login |
| Register | http://localhost:3000/auth/register |

---

## 🔧 Service Management (CRUD)

#### Create (`/admin/create`)
- Form to add new services
- Fields: Name, Description, Category, Price, Rating, Outcomes
- Image upload support (Multer)
- Form validation (required fields)
- Success/Error messages

#### Read (`/admin/dashboard`)
- Display all services in a table
- Service details: Name, Category, Price, Rating, Description
- Sorting by creation date

#### Update (`/admin/edit/:id`)
- Pre-populated form with existing service data
- Edit all fields
- Optional image replacement
- Old images are automatically deleted
- Validation on update

#### Delete
- Confirmation popup before deletion
- AJAX-based deletion
- Automatic image cleanup
- Real-time dashboard update

### 4. Image Upload (Multer)
- Upload location: `/public/uploads/`
- Supported formats: JPEG, PNG, WebP, GIF
- Max file size: 5MB
- Automatic file naming with timestamps
- Old images deleted when replaced

## Project Structure

```
Assignment-4/
├── app.js                          # Main Express app
├── package.json                    # Dependencies & scripts
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── models/
│   └── Service.js                 # MongoDB Service schema
├── routes/
│   ├── index.js                   # Home page routes
│   ├── services.js                # Services catalog routes
│   └── admin.js                   # Admin CRUD routes
├── views/
│   ├── layout.pug                 # User layout (PUG)
│   ├── index.pug                  # Home page (PUG)
│   ├── services.pug               # Services catalog (PUG)
│   ├── 404.pug                    # 404 page (PUG)
│   ├── error.pug                  # Error page (PUG)
│   └── admin/
│       ├── layout.ejs             # Admin layout (EJS)
│       ├── login.ejs              # Login page
│       ├── dashboard.ejs          # Services table
│       ├── create.ejs             # Add service form
│       ├── edit.ejs               # Edit service form
│       └── error.ejs              # Error page
├── public/
│   ├── images/                    # Static images
│   ├── uploads/                   # User-uploaded images
│   ├── javascripts/
│   │   └── main.js                # Client-side scripts
│   └── stylesheets/
│       ├── style.css              # User pages CSS
│       ├── layout.css             # Navbar/Footer CSS
│       └── services.css           # Services page CSS
├── scripts/
│   └── seedServices.js            # Database seeding script
└── README.md                      # This file
```

### Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer
- **User Templates**: Pug
- **Admin Templates**: EJS
- **Styling**: CSS3
- **Frontend**: Vanilla JavaScript

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create .env File
```
MONGODB_URI=mongodb://localhost:27017/naqvix_services
PORT=3000
ADMIN_PASSWORD=admin123
SESSION_SECRET=your-secret-key-here
```

### Step 3: Seed Database (Optional)
```bash
npm run seed
```

This seeds 27 sample services across 8 categories for testing.

### Step 4: Start Server
```bash
npm start
```

Server will run on `http://localhost:3000`

## Database Schema

### Service Model
```javascript
{
  name: String (required),
  description: String (required),
  category: String (enum, required),
  price: Number (required, min: 0),
  rating: Number (0-5),
  outcomes: [String],
  image: String (file path),
  featured: Boolean,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Usage

### User-Facing Pages
- **Home**: `http://localhost:3000/`
- **Services Catalog**: `http://localhost:3000/services`
- **Filtered Services**: `http://localhost:3000/services?category=Web%20Development&minPrice=1000&maxPrice=5000`

### Admin Panel
- **Login**: `http://localhost:3000/admin/login`
  - Default password: `admin123` (change in .env)
- **Dashboard**: `http://localhost:3000/admin/dashboard`
- **Add Service**: `http://localhost:3000/admin/create`
- **Edit Service**: `http://localhost:3000/admin/edit/:id`

## API Endpoints

### Admin Routes
```
POST   /admin/login              # Authenticate with password
GET    /admin/logout             # Logout & destroy session
GET    /admin/dashboard          # View all services (protected)
GET    /admin/create             # Show create form (protected)
POST   /admin/create             # Save new service (protected)
GET    /admin/edit/:id           # Show edit form (protected)
POST   /admin/edit/:id           # Update service (protected)
DELETE /admin/:id                # Delete service (protected, JSON response)
```

### User Routes
```
GET    /                         # Home page
GET    /services                 # Services catalog with filters
GET    /services?search=query    # Search services
GET    /services?category=cat    # Filter by category
GET    /services?minPrice=x&maxPrice=y  # Filter by price
GET    /services?sortBy=price    # Sort services
GET    /services?page=2          # Pagination
```

## Authentication & Security

### Session Management
- Session timeout: 24 hours
- Stored in memory (production: use session store)
- Secure cookies (set to true if using HTTPS)

### Password Protection
- Simple password-based authentication
- **Production Recommendation**: Implement proper auth (JWT, bcrypt)

### File Upload Security
- File type validation (MIME type check)
- File size limit: 5MB
- Original filenames not used (prevents path traversal)
- Images stored outside web root consideration

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **Multer** | File upload middleware |
| **express-session** | Session management |
| **PUG** | Template engine (user pages) |
| **EJS** | Template engine (admin pages) |
| **Node.js** | Runtime environment |

## Environment Variables

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/naqvix_services

# Server Port
PORT=3000

# Admin Authentication
ADMIN_PASSWORD=admin123

# Session Secret (any random string)
SESSION_SECRET=your-super-secret-key-12345
```

## Development Commands

```bash
# Start server with auto-reload (requires nodemon)
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed
```

## File Upload Directory

Images are automatically saved to `/public/uploads/` with the following naming convention:
```
service-[TIMESTAMP]-[RANDOM_NUMBER].[extension]
```

Example: `service-1716345600000-123456789.png`

## Error Handling

- Form validation errors display on the form page
- Delete operation errors show as alerts
- Server errors render error.ejs with error message
- 404 pages for non-existent routes

## Form Validation

### Required Fields
- Service Name
- Description
- Category
- Price

### Optional Fields
- Rating (defaults to 4.5)
- Image (uses default if not provided)
- Outcomes (comma-separated list)

## Confirmation Dialogs

### Delete Confirmation
```javascript
// Prevents accidental deletion with confirmation prompt
confirm(`Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`)
```

## Images & Assets

- **Static images**: `/public/images/`
- **User uploads**: `/public/uploads/`
- Both directories are served as static files

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## Future Enhancements

- [ ] Proper user authentication (JWT, bcrypt)
- [ ] Role-based access control (Admin, Manager, Viewer)
- [ ] Audit logging (track all changes)
- [ ] Image compression & optimization
- [ ] Service import/export (CSV, Excel)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Two-factor authentication (2FA)

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check MONGODB_URI

### Multer Upload Error
```
Error: Invalid file type
```
**Solution**: Only JPEG, PNG, WebP, and GIF are allowed

### Session Not Persisting
**Solution**: Check SESSION_SECRET is set in .env

### Images Not Displaying
**Solution**: Ensure `/public/uploads/` directory exists and images are properly saved

## License

ISC License

## Author

Created for SP26 Web Technologies Assignment 4

---

**Version**: 1.0.0  
**Last Updated**: May 2026
