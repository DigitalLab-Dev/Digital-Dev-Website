# Order Tracking & Admin Panel Guide

## 🔧 **Fixed: Order Tracking Issue**

### **Problem**
Users placed orders successfully, but when navigating to "My Orders" page, no orders were displayed (showing "You haven't placed any orders yet").

### **Root Cause**
In [routes/orders.js](routes/orders.js#L63), the code was querying with:
```javascript
userId: req.session.user._id  // ❌ WRONG
```

But the session stores the user ID as:
```javascript
req.session.user.id  // ✅ CORRECT
```

### **Fix Applied**
Changed line 63-70 in `routes/orders.js`:
```javascript
// BEFORE (❌ Incorrect)
const total = await Order.countDocuments({ userId: req.session.user._id });
const orders = await Order.find({ userId: req.session.user._id })

// AFTER (✅ Correct)
const total = await Order.countDocuments({ userId: req.session.user.id });
const orders = await Order.find({ userId: req.session.user.id })
```

### **Status**
✅ **FIXED** - Restart server to apply changes

### **How to Test Order Tracking**
1. Login to your account at: http://localhost:3000/auth/login
2. Navigate to "📦 My Orders" in navbar
3. All your placed orders should now display with:
   - Order ID
   - Order date & time
   - Services ordered (with quantities and prices)
   - Total amount
   - Current status (Pending, Processing, etc.)
   - Payment status
   - Your description/notes

---

## 👨‍💼 **Admin Panel Access & Credentials**

### **Admin Panel URL**
```
http://localhost:3000/admin/dashboard
```

### **Authentication Required**
- **Email**: admin@naqvix.com
- **Password**: Admin@1234
- **Role**: admin

### **How to Login as Admin**
1. Navigate to: http://localhost:3000/auth/login
2. Enter email: `admin@naqvix.com`
3. Enter password: `Admin@1234`
4. Click "Sign In"
5. You'll see "⚙️ Admin Panel" link in navbar (instead of "My Orders")
6. Click it to access: http://localhost:3000/admin/dashboard

### **First-Time Admin Setup**
If admin user doesn't exist, manually create it in MongoDB:
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@naqvix.com",
  password: <hashed_password>,  // Use bcryptjs to hash "Admin@1234"
  role: "admin",
  createdAt: new Date()
});
```

Or use registration then manually update role in DB:
```javascript
db.users.updateOne(
  { email: "admin@naqvix.com" },
  { $set: { role: "admin" } }
);
```

---

## ⚙️ **Admin Panel Features & Functionalities**

### **1. Dashboard - View All Services**
**URL**: http://localhost:3000/admin/dashboard

**Features**:
- 📊 Table view of all services in the system
- ⏱️ Sorted by newest first
- 📋 Columns: Name, Description, Category, Price, Rating, Image, Actions
- 🔍 Shows all 30+ services

**Actions Available**:
- ✏️ **Edit** - Modify service details
- 🗑️ **Delete** - Remove service from catalog

---

### **2. Create New Service**
**URL**: http://localhost:3000/admin/create

**Form Fields**:
- **Service Name** (required)
  - Example: "AWS Setup & Optimization"
- **Description** (required)
  - Example: "AWS infrastructure setup with auto-scaling"
- **Category** (required - dropdown)
  - Options: Website Development, Mobile App, Digital Marketing, Branding, UI/UX Design, E-commerce, Cloud Solutions, AI Solutions
- **Price** (required - number)
  - Example: 1800
- **Rating** (optional - 1-5 stars)
  - Default: 4.5
- **Service Image** (optional - file upload)
  - Accepted formats: JPEG, PNG, WebP, GIF
  - Max size: 5MB
- **Outcomes** (optional - comma-separated list)
  - Example: "Auto Scaling, EC2 Configuration, RDS Setup, Cost Optimization"

**Validation**:
- Name, Description, Category, Price are mandatory
- Image is automatically uploaded to `/public/uploads/`
- File naming: `service-{timestamp}-{random}.{ext}`

**On Success**:
- ✅ Service created and saved to MongoDB
- 📍 Redirected to dashboard
- 💬 Flash message: "Service created successfully!"

---

### **3. Edit Existing Service**
**URL**: http://localhost:3000/admin/edit/:id

**Features**:
- 📝 Pre-filled form with current service data
- 🖼️ Current image displayed
- ✅ Update any field
- 📸 Option to upload new image (old image auto-deleted)

**Example URL**:
```
http://localhost:3000/admin/edit/6a08d7e8816e18158dfc484d
```

**Updatable Fields**:
- Name
- Description
- Category
- Price
- Rating
- Image
- Outcomes

**On Success**:
- ✅ Service updated in MongoDB
- 📍 Redirected to dashboard
- 💬 Flash message: "Service updated successfully!"

---

### **4. Delete Service**
**URL**: http://localhost:3000/admin/edit/:id (has delete button)

**Features**:
- 🗑️ Delete button on edit page or dashboard
- ⚠️ Permanent deletion from database
- 📸 Associated image file auto-deleted from `/public/uploads/`
- 🔒 Protected - only admins can delete

**Confirmation**:
- JavaScript confirm dialog before deletion
- Returns JSON: `{ success: true, message: 'Service deleted successfully' }`

---

## 📊 **Admin Panel - Technical Details**

### **Protected Routes**
All admin routes require `isAdmin` middleware:
```javascript
const { isAdmin } = require('../middleware/auth');
router.get('/dashboard', isAdmin, ...);
router.get('/create', isAdmin, ...);
router.post('/create', isAdmin, upload.single('image'), ...);
router.get('/edit/:id', isAdmin, ...);
router.post('/edit/:id', isAdmin, upload.single('image'), ...);
router.delete('/:id', isAdmin, ...);
```

### **Authentication Middleware**
```javascript
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    req.user = req.session.user;
    next();
  } else {
    req.flash('error', 'Access Denied! Only administrators can access this page');
    res.redirect('/');
  }
};
```

### **File Structure**
```
routes/
└── admin.js                    # Admin CRUD operations

views/
└── admin/
    ├── layout.ejs              # Admin layout template
    ├── dashboard.ejs           # Services table (all services)
    ├── create.ejs              # Add service form
    ├── edit.ejs                # Edit service form
    └── error.ejs               # Admin error page

public/
├── uploads/                    # User-uploaded service images
│   ├── service-{timestamp}-{random}.jpg
│   ├── service-{timestamp}-{random}.png
│   └── ...
└── stylesheets/
    ├── admin.css               # Admin panel styles
    └── ...

middleware/
└── auth.js                     # isAdmin middleware
```

### **Image Upload Configuration**
```javascript
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: 'service-{timestamp}-{random}.{ext}'
  }),
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB
  fileFilter: (req, file, cb) => {
    // Allowed: JPEG, PNG, WebP, GIF
  }
});
```

---

## 🔐 **Security Features**

### **1. Role-Based Access Control (RBAC)**
- **Customer Role**: Browse services, place orders, view own orders
- **Admin Role**: Create/Read/Update/Delete services, manage catalog

### **2. Authentication Checks**
- All admin routes check for valid session with admin role
- Non-admin users redirected with error message
- Session timeout: 24 hours
- Secure httpOnly cookies

### **3. Input Validation**
- Required fields validation on both client and server
- File type validation (only image formats allowed)
- File size limit (5MB max)
- Category dropdown (prevent invalid entries)

### **4. Database Security**
- Passwords hashed with bcryptjs (10 salt rounds)
- MongoDB connection with authentication
- Environment variables for sensitive data

---

## 📋 **API Endpoints (Used by Admin Panel)**

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| GET | `/admin/dashboard` | ✅ Admin | View all services |
| GET | `/admin/create` | ✅ Admin | Show create form |
| POST | `/admin/create` | ✅ Admin | Save new service |
| GET | `/admin/edit/:id` | ✅ Admin | Show edit form |
| POST | `/admin/edit/:id` | ✅ Admin | Update service |
| DELETE | `/admin/:id` | ✅ Admin | Delete service |

---

## 🚀 **Quick Admin Tasks**

### **Task 1: Add a New Service**
1. Go to: http://localhost:3000/admin/dashboard
2. Click "➕ Add New Service" button
3. Fill form:
   - Name: "Website Redesign"
   - Description: "Complete website redesign and development"
   - Category: "Website Development"
   - Price: 2500
   - Rating: 4.7
   - Upload image (optional)
   - Outcomes: "Modern Design, Mobile Responsive, SEO Ready"
4. Click "Create Service"

### **Task 2: Update Existing Service**
1. Go to: http://localhost:3000/admin/dashboard
2. Find service in table
3. Click "✏️ Edit" button
4. Modify fields as needed
5. Click "Save Changes"

### **Task 3: Delete Service**
1. Go to: http://localhost:3000/admin/dashboard
2. Find service in table
3. Click "✏️ Edit" button
4. Scroll to bottom
5. Click "🗑️ Delete Service"
6. Confirm in dialog

### **Task 4: View All Orders (Future Feature)**
**Status**: 🔄 Not yet implemented in admin panel
**Location**: Currently customers can view via `/orders` page
**Next Step**: Add `/admin/orders` to see all customer orders

---

## 🐛 **Troubleshooting**

### **Issue: "Access Denied! Only administrators can access this page"**
- Verify you're logged in with admin account (role: "admin")
- Check database: `db.users.findOne({ email: "admin@naqvix.com" })`
- Ensure role field = "admin" (not "customer")

### **Issue: Image upload fails**
- Check file format (JPEG, PNG, WebP, GIF only)
- Verify file size < 5MB
- Ensure `/public/uploads/` directory exists
- Check file permissions: `chmod 755 public/uploads`

### **Issue: Service not appearing after creation**
- Refresh dashboard page
- Check MongoDB connection
- Verify service was saved: `db.services.findOne({ name: "..." })`

### **Issue: Cannot access admin dashboard**
- Verify server is running: `npm start`
- Check you're using correct URL: `http://localhost:3000/admin/dashboard`
- Ensure session is active (login check)
- Clear browser cookies and login again

---

## 📝 **Environment Variables Required**

```env
MONGODB_URI=mongodb://localhost:27017/naqvix_services
PORT=3000
SESSION_SECRET=your-secret-key-for-sessions
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

---

## 🎯 **Next Steps**

1. ✅ **Order Tracking Fixed** - Users can now see their orders at `/orders`
2. 🔄 **Admin Orders View** (TODO) - Add `/admin/orders` to view all customer orders
3. 🔄 **Order Management** (TODO) - Admin ability to update order status, payment status
4. 🔄 **Analytics Dashboard** (TODO) - Admin see stats (total orders, revenue, etc.)
5. 🔄 **Customer Management** (TODO) - Admin view/manage all registered users

---

## ✅ **Verification Checklist**

- [ ] Server running at http://localhost:3000
- [ ] Can login with admin@naqvix.com / Admin@1234
- [ ] "⚙️ Admin Panel" link visible in navbar when logged in as admin
- [ ] Can access dashboard at /admin/dashboard
- [ ] Can create new service with all fields
- [ ] Can edit existing service
- [ ] Can delete service with confirmation
- [ ] Image uploads working (5MB limit)
- [ ] All services display in dashboard table
- [ ] Customer can view placed orders at /orders page

