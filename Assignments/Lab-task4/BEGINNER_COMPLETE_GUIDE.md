# 📚 Lab-Task4: Complete Beginner's Guide to Digital Services Platform

> A comprehensive guide explaining EVERYTHING in simple, beginner-friendly language

---

## 🎯 Table of Contents

1. [Project Overview](#project-overview)
2. [What Does This App Do?](#what-does-this-app-do)
3. [Libraries & Why We Use Them](#libraries--why-we-use-them)
4. [File Structure Explained](#file-structure-explained)
5. [How Everything Works Together](#how-everything-works-together)
6. [All Functions Explained](#all-functions-explained)
7. [Data Flow (How Information Moves)](#data-flow)

---

## 🏗️ Project Overview

### **What is Lab-Task4?**

It's a web application that sells digital services online (like a shop). Imagine an app where:
- 👤 **Customers** can register, browse services, and buy them
- 👨‍💼 **Admins** can manage the service catalog
- 💾 **Database** stores all information (users, services, orders)
- 🔐 **Security** protects user data with passwords and login

### **Real-World Analogy**

Think of it like Amazon, but for digital services:
- 🏪 Amazon = This app
- 📦 Products = Digital Services (e.g., "AWS Setup & Optimization")
- 👥 Customers = Users who buy services
- 📊 Admin Panel = Backend management system
- 💾 Database = File cabinet storing everything

---

## ✨ What Does This App Do?

### **For Customers**

1. **Register/Login** - Create account with email & password
   - ✅ Password is encrypted (safe)
   - ✅ Can login anytime

2. **Browse Services** - See all available digital services
   - 📦 Each service has name, description, price
   - ⭐ Ratings show quality

3. **Add to Cart** - Select services to buy
   - 🛒 Can add multiple services
   - 📝 Can change quantities

4. **Place Order** - Buy the services
   - 💰 Pay for selected services
   - ✅ Order is saved

5. **Track Orders** - See what they bought
   - 📋 View order history
   - ⏳ Check order status

### **For Admins**

1. **Login as Admin** - Access admin panel
   - 🔐 Special admin account

2. **View Services** - See all services in a table
   - 📊 Dashboard with all info

3. **Add Services** - Create new services to sell
   - ✏️ Fill service details
   - 📸 Upload service image

4. **Edit Services** - Change service information
   - 💲 Update price
   - 📝 Update description

5. **Delete Services** - Remove services
   - 🗑️ Permanently remove

---

## 📚 Libraries & Why We Use Them

### **What's a Library?**

A library is pre-written code that does common tasks. Instead of writing everything from scratch, we import libraries to use their functions.

**Example**: Like using a calculator app instead of doing math manually.

---

### **Libraries in This Project**

#### **1. Express.js** 🚀
**What it is**: Web framework to build the server

**Why we use it**:
- Creates the web server (http://localhost:3000)
- Handles requests from browser
- Sends responses back to browser
- Manages routes (/services, /admin, etc.)

**Where imported**:
```javascript
const express = require('express');
```

**What it does**:
```javascript
const app = express();  // Creates web server
app.listen(3000);       // Starts server on port 3000
```

---

#### **2. Mongoose** 🗄️
**What it is**: Tool to work with MongoDB (database)

**Why we use it**:
- Connects to MongoDB database
- Creates data models (structure of data)
- Saves/retrieves data from database
- Validates data

**Where imported**:
```javascript
const mongoose = require('mongoose');
```

**What it does**:
```javascript
mongoose.connect(process.env.MONGODB_URI);  // Connect to database

const userSchema = new mongoose.Schema({     // Define user structure
  name: String,
  email: String,
  password: String
});
```

---

#### **3. Pug** 🎨
**What it is**: Template engine to create HTML pages dynamically

**Why we use it**:
- Creates HTML pages with data
- Mixes HTML with JavaScript
- Shows different content for different users
- Cleaner syntax than plain HTML

**Where imported**:
```javascript
app.set('view engine', 'pug');
```

**What it does**:
```pug
// pug template
h1= user.name
p Welcome #{user.email}
// Output: <h1>John</h1><p>Welcome john@example.com</p>
```

---

#### **4. EJS** 📝
**What it is**: Another template engine (like Pug)

**Why we use it**:
- Same purpose as Pug
- We use it for admin pages specifically
- Supports different syntax

**Where imported**:
```javascript
app.engine('ejs', require('ejs').renderFile);
```

---

#### **5. dotenv** 🔑
**What it is**: Loads environment variables from .env file

**Why we use it**:
- Stores sensitive data (passwords, API keys) safely
- Keeps secrets out of code
- Different settings for development/production

**Where imported**:
```javascript
require('dotenv').config();
```

**What's in .env**:
```
MONGODB_URI=mongodb://localhost:27017/naqvix_services
PORT=3000
SESSION_SECRET=my-secret-key
JWT_SECRET=my-jwt-secret
```

**What it does**:
```javascript
const dbUrl = process.env.MONGODB_URI;  // Gets from .env file
```

---

#### **6. Express-Session** 📍
**What it is**: Manages user login sessions

**Why we use it**:
- Remembers user is logged in
- Creates session for each user
- Automatically logs out after 24 hours
- Stores user info in session

**Where imported**:
```javascript
const session = require('express-session');
```

**What it does**:
```javascript
req.session.user = {  // Store user in session
  id: user._id,
  name: user.name,
  email: user.email
};

// Now on every page: req.session.user exists
if (req.session.user) {
  // User is logged in
}
```

---

#### **7. Connect-Mongo** 🗃️
**What it is**: Stores sessions in MongoDB database

**Why we use it**:
- Without it: Sessions stored in memory (lost when server restarts)
- With it: Sessions stored in database (permanent)
- User stays logged in even after server restart

**Where imported**:
```javascript
const MongoStore = require('connect-mongo');
```

---

#### **8. Multer** 📸
**What it is**: Handles file uploads (like uploading images)

**Why we use it**:
- Admin uploads service images
- Saves files to `/public/uploads/` folder
- Validates file type & size
- Prevents malicious files

**Where imported**:
```javascript
const multer = require('multer');
```

**What it does**:
```javascript
const upload = multer({ 
  destination: './public/uploads',
  limits: { fileSize: 5 * 1024 * 1024 }  // Max 5MB
});

// In route: upload.single('image')
```

---

#### **9. Bcryptjs** 🔐
**What it is**: Encrypts passwords

**Why we use it**:
- Never store plain text passwords
- Encrypts password into gibberish
- Can't be reversed to original password
- User.matchPassword() compares entered password with stored encrypted version

**Where imported**:
```javascript
const bcrypt = require('bcryptjs');
```

**What it does**:
```javascript
// When saving password:
const hashedPassword = await bcrypt.hash('myPassword', 10);
// Stores: $2a$10$abc...xyz (encrypted)

// When checking password:
const isCorrect = await bcrypt.compare('myPassword', hashedPassword);
// Returns: true or false
```

---

#### **10. Connect-Flash** 💬
**What it is**: Shows temporary messages to user

**Why we use it**:
- "Service created successfully!" message after creating service
- "Invalid email or password" after failed login
- Messages disappear after page reload

**Where imported**:
```javascript
const flash = require('connect-flash');
```

**What it does**:
```javascript
req.flash('success', 'Service created!');  // Store message
res.redirect('/admin/dashboard');          // Redirect

// On next page: can access with res.locals.success
```

---

#### **11. JsonWebToken (JWT)** 🎫
**What it is**: Creates tokens for API authentication

**Why we use it**:
- For APIs (not traditional login)
- Token proves user identity
- Token expires after set time
- Mobile apps & external apps use tokens

**Where imported**:
```javascript
const jwt = require('jsonwebtoken');
```

**What it does**:
```javascript
const token = jwt.sign(
  { user_id: user._id, email: user.email },  // Data to encode
  'secret-key',
  { expiresIn: '24h' }
);
// Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Verify token:
const decoded = jwt.verify(token, 'secret-key');
// Returns: { user_id: '...', email: '...' }
```

---

## 📁 File Structure Explained

### **Understanding the Folder Organization**

```
Lab-task4/
├── app.js                    ← Main application file
├── .env                      ← Secrets (passwords, API keys)
├── .gitignore               ← What files to NOT push to git
├── package.json             ← Project info & dependencies
├── middleware/
│   └── auth.js             ← Authentication middleware
├── models/
│   ├── User.js             ← User data structure
│   ├── Service.js          ← Service data structure
│   └── Order.js            ← Order data structure
├── routes/
│   ├── index.js            ← Home page route
│   ├── services.js         ← Services browsing route
│   ├── auth.js             ← Login/Register routes
│   ├── admin.js            ← Admin management routes
│   ├── orders.js           ← Order tracking routes
│   └── api/                ← API routes (for apps)
│       ├── auth.js         ← API login endpoint
│       ├── services.js     ← API get services endpoint
│       ├── orders.js       ← API create order endpoint
│       └── user.js         ← API user profile endpoint
├── views/
│   ├── layout.pug          ← Base HTML template
│   ├── index.pug           ← Home page
│   ├── services.pug        ← Services list page
│   ├── auth/
│   │   ├── login.ejs       ← Login form
│   │   └── register.ejs    ← Register form
│   ├── admin/
│   │   ├── dashboard.ejs   ← Admin dashboard
│   │   ├── create.ejs      ← Add service form
│   │   └── edit.ejs        ← Edit service form
│   ├── orders.pug          ← Order history page
│   └── service-detail.pug  ← Single service page
├── public/
│   ├── uploads/            ← Service images (uploaded)
│   ├── stylesheets/        ← CSS files
│   ├── javascripts/        ← JavaScript files
│   └── images/             ← Static images
└── scripts/
    └── seedServices.js     ← Script to add test data
```

---

## 📋 Files & Their Usage

### **app.js - The Main File** 🎬

**What it is**: The heart of the application. Everything starts here.

**Size**: ~100 lines

**What it does**:

1. **Imports all libraries**
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const session = require('express-session');
   // ... more imports
   ```

2. **Creates web server**
   ```javascript
   const app = express();
   const PORT = process.env.PORT || 3000;
   ```

3. **Connects to database**
   ```javascript
   mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   ```

4. **Sets up view engines** (Pug & EJS)
   ```javascript
   app.set('view engine', 'pug');
   app.engine('ejs', require('ejs').renderFile);
   ```

5. **Uses middleware** (processes requests)
   ```javascript
   app.use(express.static(path.join(__dirname, 'public')));
   app.use(express.urlencoded({ extended: false }));
   app.use(express.json());
   ```

6. **Sets up session management**
   ```javascript
   app.use(session({
     secret: process.env.SESSION_SECRET,
     store: new MongoStore({ mongoUrl: process.env.MONGODB_URI }),
     cookie: { maxAge: 24 * 60 * 60 * 1000 }
   }));
   ```

7. **Imports all routes**
   ```javascript
   const authRoutes = require('./routes/auth');
   const adminRoutes = require('./routes/admin');
   // ... more routes
   ```

8. **Mounts routes** (links routes to app)
   ```javascript
   app.use('/auth', authRoutes);
   app.use('/admin', adminRoutes);
   app.use('/', ordersRoutes);
   app.use('/api/v1/auth', apiAuthRoutes);
   ```

9. **Starts server**
   ```javascript
   app.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}`);
   });
   ```

**Why it's important**: Without this file, nothing works. It's like the conductor of an orchestra.

---

### **Models - Data Structures** 📊

#### **models/User.js**

**What it is**: Defines how user data looks in database

**Size**: ~40 lines

**What it stores**:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$abc...xyz", // encrypted
  role: "customer" or "admin",
  createdAt: Date
}
```

**Key method**:
```javascript
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Use: if (await user.matchPassword('password123')) { }
```

**What it does**:
- Validates email is unique
- Validates password is at least 6 characters
- Auto-hashes password before saving

---

#### **models/Service.js**

**What it is**: Defines how service data looks

**What it stores**:
```javascript
{
  name: "AWS Setup & Optimization",
  description: "Complete AWS infrastructure setup",
  category: "Cloud Solutions",
  price: 1800,
  rating: 4.6,
  image: "/uploads/service-123.jpg",
  outcomes: ["Auto Scaling", "EC2 Configuration"],
  createdAt: Date
}
```

**Why**: So we know every service has these exact fields

---

#### **models/Order.js**

**What it is**: Defines how order data looks

**What it stores**:
```javascript
{
  userId: "user-id-123",
  services: [
    { serviceId: "service-1", quantity: 1, price: 1800 }
  ],
  totalAmount: 1800,
  status: "pending",
  paymentStatus: "unpaid",
  customerEmail: "john@example.com",
  customerName: "John",
  description: "Customer notes",
  createdAt: Date
}
```

---

### **Middleware - auth.js** 🔐

**What it is**: Protects routes - checks if user is logged in or is admin

**Size**: ~25 lines

**Three main functions**:

#### **1. isLoggedIn**
```javascript
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();  // User is logged in, continue
  } else {
    req.flash('error', 'Please log in');
    res.redirect('/auth/login');  // Not logged in, go to login
  }
};
```

**Used on routes that need login**:
- `/orders` - viewing orders
- `/checkout` - placing order
- `/profile` - user profile

**Example**:
```javascript
router.get('/orders', isLoggedIn, (req, res) => {
  // Only logged in users can see this
});
```

#### **2. isAdmin**
```javascript
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    req.user = req.session.user;
    next();  // Is admin, continue
  } else {
    req.flash('error', 'Only admins can access this');
    res.redirect('/');  // Not admin, go to home
  }
};
```

**Used on admin routes**:
- `/admin/dashboard`
- `/admin/create`
- `/admin/edit`

#### **3. isNotLoggedIn**
```javascript
const isNotLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/');  // Already logged in, go home
  } else {
    next();  // Not logged in, continue to register/login
  }
};
```

**Used on**:
- `/auth/register` - don't let logged in users register again
- `/auth/login` - don't let logged in users login again

---

### **Routes - Handling Requests** 🛣️

#### **routes/auth.js - User Registration & Login**

**What it does**: Handles user authentication

**Size**: ~120 lines

##### **Function 1: GET /auth/register**
```javascript
router.get('/auth/register', isNotLoggedIn, (req, res) => {
  res.render('auth/register.ejs', {
    title: 'Register',
    error: req.flash('error')
  });
});
```

**What it does**: 
- Shows registration form
- Only if user NOT logged in (isNotLoggedIn)

**Example flow**:
```
User visits: http://localhost:3000/auth/register
   ↓
Route triggers
   ↓
Renders: auth/register.ejs file
   ↓
Browser shows: Registration form
```

##### **Function 2: POST /auth/register**
```javascript
router.post('/auth/register', isNotLoggedIn, async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    
    // Validation
    if (!name || !email || !password || !passwordConfirm) {
      req.flash('error', 'All fields required');
      return res.redirect('/auth/register');
    }
    
    if (password !== passwordConfirm) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/auth/register');
    }
    
    // Check if email exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/register');
    }
    
    // Create user
    const newUser = new User({
      name, email, password, role: 'customer'
    });
    await newUser.save();
    
    req.flash('success', 'Registered! Please log in.');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/auth/register');
  }
});
```

**Step-by-step**:
1. Gets form data (name, email, password)
2. Validates all fields exist
3. Validates passwords match
4. Checks email doesn't already exist
5. Creates user in database (password auto-hashed)
6. Shows success message
7. Redirects to login

---

##### **Function 3: GET /auth/login**
```javascript
router.get('/auth/login', isNotLoggedIn, (req, res) => {
  res.render('auth/login.ejs', {
    title: 'Login',
    error: req.flash('error')
  });
});
```

**What it does**: Shows login form

---

##### **Function 4: POST /auth/login**
```javascript
router.post('/auth/login', isNotLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate fields
    if (!email || !password) {
      req.flash('error', 'Email and password required');
      return res.redirect('/auth/login');
    }
    
    // Find user and get password (normally excluded)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    
    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }
    
    // Create session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    req.flash('success', `Welcome ${user.name}!`);
    res.redirect('/');
  } catch (error) {
    req.flash('error', 'Login error');
    res.redirect('/auth/login');
  }
});
```

**Step-by-step**:
1. Gets email and password from form
2. Finds user in database
3. If user not found → "Invalid"
4. Compares entered password with stored encrypted password
5. If wrong → "Invalid"
6. If correct → Creates session
7. Shows welcome message
8. Redirects to home

**Key line**: `req.session.user = { ... }` - This makes user "logged in"

---

##### **Function 5: GET /auth/logout**
```javascript
router.get('/auth/logout', (req, res) => {
  req.flash('success', 'Logged out successfully');
  if (req.session) {
    req.session.destroy((err) => {
      if (err) console.error(err);
      res.redirect('/');
    });
  }
});
```

**What it does**: Logs user out
- Destroys session (user info deleted)
- Redirects to home
- Shows goodbye message

---

#### **routes/admin.js - Admin Service Management**

**What it does**: CRUD operations (Create, Read, Update, Delete) for services

**Size**: ~250 lines

##### **Function 1: GET /admin/dashboard**
```javascript
router.get('/admin/dashboard', isAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.render('admin/dashboard.ejs', { 
      services,
      title: 'Services Dashboard'
    });
  } catch (error) {
    res.status(500).render('admin/error.ejs', { 
      error: 'Failed to load services'
    });
  }
});
```

**What it does**:
1. Checks if user is admin (isAdmin middleware)
2. Gets all services from database
3. Sorts by newest first (createdAt: -1)
4. Shows table with all services

---

##### **Function 2: GET /admin/create**
```javascript
router.get('/admin/create', isAdmin, (req, res) => {
  res.render('admin/create.ejs', { 
    title: 'Add New Service',
    error: null,
    service: {}
  });
});
```

**What it does**: Shows form to add new service

---

##### **Function 3: POST /admin/create**
```javascript
router.post('/admin/create', isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, rating, outcomes } = req.body;
    
    // Validate required fields
    if (!name || !description || !category || !price) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(400).render('admin/create.ejs', {
        error: 'All fields required',
        service: req.body
      });
    }
    
    // Parse outcomes (comma-separated)
    let outcomesArray = [];
    if (outcomes) {
      if (Array.isArray(outcomes)) {
        outcomesArray = outcomes.filter(o => o.trim());
      } else {
        outcomesArray = outcomes.split(',').map(o => o.trim()).filter(o => o);
      }
    }
    
    // Create service
    const serviceData = {
      name,
      description,
      category,
      price: parseFloat(price),
      rating: parseFloat(rating) || 4.5,
      outcomes: outcomesArray,
      image: req.file ? `/uploads/${req.file.filename}` : '/images/default.png'
    };
    
    const newService = new Service(serviceData);
    await newService.save();
    
    req.flash('success', 'Service created successfully!');
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).render('admin/create.ejs', {
      error: 'Failed to create service: ' + error.message
    });
  }
});
```

**Step-by-step**:
1. Gets form data
2. Validates required fields
3. Splits outcomes by comma (if provided)
4. Converts price to number
5. Saves image (or uses default)
6. Creates Service object
7. Saves to database
8. Shows success message
9. Redirects to dashboard

---

##### **Function 4: POST /admin/edit/:id**
```javascript
router.post('/admin/edit/:id', isAdmin, upload.single('image'), async (req, res) => {
  try {
    // Similar to create, but:
    const service = await Service.findById(req.params.id);
    
    // Update fields
    service.name = name;
    service.description = description;
    service.category = category;
    service.price = parseFloat(price);
    
    // Delete old image if new one uploaded
    if (req.file && service.image.includes('/uploads/')) {
      fs.unlink(path.join(__dirname, '../public', service.image), () => {});
    }
    
    // Update image if provided
    if (req.file) {
      service.image = `/uploads/${req.file.filename}`;
    }
    
    await service.save();
    req.flash('success', 'Service updated!');
    res.redirect('/admin/dashboard');
  } catch (error) {
    // error handling
  }
});
```

**What it does**:
1. Finds service by ID
2. Updates fields with new data
3. Deletes old image file
4. Saves to database
5. Redirects to dashboard

---

##### **Function 5: DELETE /admin/:id**
```javascript
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    
    // Delete image file
    if (service.image && service.image.includes('/uploads/')) {
      const imagePath = path.join(__dirname, '../public', service.image);
      fs.unlink(imagePath, () => {});
    }
    
    res.json({ success: true, message: 'Deleted!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});
```

**What it does**:
1. Finds and deletes service
2. Deletes image file from server
3. Returns JSON response (for JavaScript)

---

#### **routes/orders.js - Order Management** (FIXED VERSION)

**What it does**: Shows customer orders, handles checkout

**Size**: ~120 lines

##### **Function 1: GET /orders**
```javascript
router.get('/orders', isLoggedIn, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    
    // ✅ FIXED: Using req.session.user.id (not ._id)
    const total = await Order.countDocuments({ userId: req.session.user.id });
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    
    const orders = await Order.find({ userId: req.session.user.id })
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 });
    
    res.render('orders', {
      title: 'My Orders',
      user: req.session.user,
      orders,
      page,
      totalPages
    });
  } catch (error) {
    res.status(500).render('error', { error: error.message });
  }
});
```

**Step-by-step**:
1. Gets page number from URL (?page=1)
2. Calculates how many to skip (pagination)
3. **FIXED**: Queries orders using `req.session.user.id` (correct property)
4. Gets total count for pagination
5. Fetches orders for this page only
6. Sorts by newest first
7. Renders orders page with data

**The Fix**: Changed from `req.session.user._id` to `req.session.user.id`

---

### **Views - User Interface** 🎨

#### **views/layout.pug - Main Template**

```pug
doctype html
html
  head
    title!= title
    link(rel='stylesheet' href='/stylesheets/style.css')
  body
    nav
      a(href='/') Home
      a(href='/services') Services
      if user
        a(href='/orders') 📦 My Orders
        if user.role === 'admin'
          a(href='/admin/dashboard') ⚙️ Admin Panel
        a(href='/auth/logout') Logout
      else
        a(href='/auth/login') Login
        a(href='/auth/register') Register
    
    main
      block content
    
    footer
      p &copy; 2024 Naqvix Digital Services
```

**What it does**:
- Base HTML template for all pages
- Navigation bar shows different links based on user role
- If logged in: shows user name + Orders + Logout
- If admin: shows Admin Panel link
- If not logged in: shows Login + Register
- block content: Gets replaced with page-specific content

---

#### **views/services.pug - Services List**

```pug
extends layout

block content
  h1 Our Digital Services
  .services-grid
    each service in services
      .service-card
        img(src=service.image)
        h3= service.name
        p= service.description
        p.price= '₹' + service.price
        p.rating= '★'.repeat(Math.round(service.rating))
        a.btn(href=`/service/${service._id}`) View Details
```

**What it does**:
- Shows all services in grid/card layout
- Shows image, name, description, price
- Shows star rating
- Link to view full details

**Key concept**: `each service in services` loops through all services

---

---

## 🔄 How Everything Works Together

### **User Registration Flow**

```
1. User visits http://localhost:3000/auth/register
   ↓
2. Browser sends: GET /auth/register
   ↓
3. Server matches route: router.get('/auth/register', ...)
   ↓
4. Middleware checks: isNotLoggedIn (user not logged in?)
   ↓
5. Renders: auth/register.ejs (HTML form)
   ↓
6. User fills form: name, email, password, confirm password
   ↓
7. User clicks: Register button
   ↓
8. Browser sends: POST /auth/register (with form data)
   ↓
9. Server matches route: router.post('/auth/register', ...)
   ↓
10. Route validates:
    - All fields filled?
    - Passwords match?
    - Email not used before?
   ↓
11. Bcryptjs encrypts password: "Password123" → "$2a$10$abc..."
   ↓
12. Creates user object in memory
   ↓
13. Mongoose saves to MongoDB database
   ↓
14. Shows success flash message
   ↓
15. Redirects to: /auth/login page
   ↓
16. User sees login form
```

**Key Points**:
- Password is encrypted before saving (can't read it)
- Database validates email is unique
- User can only register if NOT already logged in

---

### **User Login Flow**

```
1. User visits /auth/login
   ↓
2. Shows login form (email + password)
   ↓
3. User enters credentials and clicks "Sign In"
   ↓
4. Browser sends: POST /auth/login
   ↓
5. Server finds user by email
   ↓
6. Compares entered password with stored encrypted password using bcrypt
   ↓
7. If match:
   - Creates session: req.session.user = { id, name, email, role }
   - Shows success message
   - Redirects to home
   ↓
8. If not match:
   - Shows error: "Invalid email or password"
   - Stays on login page

AFTER LOGIN:
- On every request: req.session.user exists
- Middleware can check: if (req.session.user) { logged in }
- Navigation shows: user name + profile link + logout
- Can access: /orders, /checkout (protected routes)
```

---

### **Admin Create Service Flow**

```
1. Admin (logged in) visits: /admin/dashboard
   ↓
2. Clicks: "➕ Add New Service"
   ↓
3. Browser navigates to: /admin/create
   ↓
4. Middleware checks: isAdmin (is user admin?)
   ↓
5. Shows form: name, description, category, price, rating, image, outcomes
   ↓
6. Admin fills form:
   - Name: "AWS Setup"
   - Description: "Complete setup"
   - Category: "Cloud Solutions"
   - Price: 1800
   - Uploads image file
   ↓
7. Admin clicks: "Create Service"
   ↓
8. Browser sends: POST /admin/create (with all data + image file)
   ↓
9. Multer middleware handles file upload:
   - Validates file type (JPG/PNG/GIF/WebP only)
   - Validates file size (max 5MB)
   - Saves to: /public/uploads/service-{timestamp}-{random}.jpg
   ↓
10. Route creates Service object:
    {
      name: "AWS Setup",
      price: 1800,
      image: "/uploads/service-123.jpg",
      ...
    }
   ↓
11. Mongoose saves to database
   ↓
12. Shows success message: "Service created successfully!"
   ↓
13. Redirects to: /admin/dashboard
   ↓
14. New service appears in table
```

---

### **Customer Order Flow** (NOW WORKING!)

```
1. Customer logged in, viewing services
   ↓
2. Clicks: "View Details" on service
   ↓
3. Goes to: /service/:id (shows full details)
   ↓
4. Clicks: "🛒 Add to Cart"
   ↓
5. Item saved to localStorage (browser's local storage)
   ↓
6. Cart badge updates: "1" (showing 1 item)
   ↓
7. Clicks: "💳 Proceed to Checkout"
   ↓
8. Middleware checks: isLoggedIn (user logged in?)
   ↓
9. Shows checkout form:
   - Name (pre-filled)
   - Email (pre-filled)
   - Service description (required)
   - Special notes (optional)
   ↓
10. Shows order summary:
    - Service: AWS Setup
    - Price: $1800
    - Quantity: 1
    - Total: $1800
   ↓
11. Customer clicks: "✓ Place Order"
   ↓
12. Browser sends: POST /api/v1/orders (with JWT token)
   ↓
13. API middleware verifies JWT token
   ↓
14. Creates Order in database:
    {
      userId: customer-id,
      services: [...],
      totalAmount: 1800,
      status: "pending"
    }
   ↓
15. Returns success with Order ID
   ↓
16. Shows modal: "Order placed! ID: 6a096e24b72d05b3479eac97"
   ↓
17. Customer clicks: "View My Orders"
   ↓
18. Goes to: /orders page
   ↓
19. Server queries: Order.find({ userId: customer-id })
   ↓
20. ✅ Shows order! (FIXED - was broken before)
   ↓
21. Customer sees:
    - Order ID
    - Date ordered
    - Services purchased
    - Total amount
    - Status: Pending
```

---

## 📊 Data Flow Visualization

### **Simple Data Movement**

```
BROWSER (Frontend)              SERVER (Backend)              DATABASE (Storage)
─────────────────────────────────────────────────────────────────────────────

User registers
   │
   ├─→ POST /auth/register ─→  Route processes    ─→  Mongoose saves   ─→  MongoDB
       (name, email, pwd)       validates data        user.save()         {user doc}
       
User logs in
   │
   ├─→ POST /auth/login ──→  Route finds user   ─→  Query: User.findOne() ─→ Returns user
       (email, pwd)           checks password        bcrypt.compare()      object
                                                     creates session
                                                     
Admin creates service
   │
   ├─→ POST /admin/create ─→  Multer saves image
       (form + image)         Route validates
                              Creates service ──→  Mongoose saves ──→  MongoDB
                              object                                  {service doc}
                              
Customer places order
   │
   ├─→ POST /api/v1/orders ─→  Route processes   ─→  Mongoose saves ──→  MongoDB
       (services, qty)         creates Order         order.save()       {order doc}
       
Customer views orders
   │
   ├─→ GET /orders ────────→  Route queries ────→  MongoDB finds    ──→  Returns docs
                              Order.find()         matching orders      to route
                              |
                              └──→ Renders page ──→  Sends HTML ──→  Browser shows
                                   views/orders.pug   to browser       order list
```

---

## 🎯 All Functions Explained

### **Complete Function Reference**

#### **Authentication Functions**

| Function | File | Purpose | Returns |
|----------|------|---------|---------|
| `router.get('/register')` | auth.js | Show registration form | HTML form |
| `router.post('/register')` | auth.js | Process registration | Redirect to login |
| `router.get('/login')` | auth.js | Show login form | HTML form |
| `router.post('/login')` | auth.js | Process login | Creates session |
| `router.get('/logout')` | auth.js | Log out user | Destroys session |
| `User.matchPassword()` | User.js | Compare password | true/false |

#### **Admin Functions**

| Function | File | Purpose | Returns |
|----------|------|---------|---------|
| `GET /admin/dashboard` | admin.js | Show all services | HTML table |
| `GET /admin/create` | admin.js | Show create form | HTML form |
| `POST /admin/create` | admin.js | Save new service | Redirect to dashboard |
| `GET /admin/edit/:id` | admin.js | Show edit form | HTML form with data |
| `POST /admin/edit/:id` | admin.js | Update service | Redirect to dashboard |
| `DELETE /admin/:id` | admin.js | Delete service | JSON response |

#### **Order Functions**

| Function | File | Purpose | Returns |
|----------|------|---------|---------|
| `GET /orders` | orders.js | Show user orders | HTML page with orders |
| `GET /checkout` | orders.js | Show checkout form | HTML form |
| `POST /api/v1/orders` | api/orders.js | Create order | JSON with order ID |

#### **Service Functions**

| Function | File | Purpose | Returns |
|----------|------|---------|---------|
| `GET /services` | services.js | Show all services | HTML page |
| `GET /service/:id` | orders.js | Show service details | HTML page |

---

## 🔐 Security Explained

### **Why We Need Security**

Without security:
- Anyone could see passwords ❌
- Anyone could become admin ❌
- Anyone could delete services ❌
- Hackers could steal data ❌

### **Our Security Measures**

#### **1. Password Hashing**
```javascript
// Never store plain password
const hashedPassword = await bcrypt.hash('myPassword', 10);
// Stores: $2a$10$abc...xyz

// Can't reverse it back to "myPassword"
// Can only compare: does entered password match?
```

**Why**: If database is hacked, passwords are still safe

#### **2. Middleware Checks**
```javascript
const isAdmin = (req, res, next) => {
  if (req.session.user.role === 'admin') {
    next();  // Let admin access
  } else {
    res.redirect('/');  // Block non-admin
  }
};
```

**Why**: Only admins can create/edit/delete services

#### **3. Session Management**
```javascript
req.session.user = { ... };  // User logged in
// Session expires after 24 hours
// User automatically logs out
```

**Why**: Limits time hackers can use stolen session

#### **4. File Upload Validation**
```javascript
const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);  // Allow
    } else {
      cb(new Error('Invalid file type'));  // Block
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }  // Max 5MB
});
```

**Why**: Prevents uploading viruses or huge files

#### **5. Environment Variables**
```javascript
// .env file (never pushed to git)
MONGODB_URI=mongodb://...
SESSION_SECRET=my-secret-key
JWT_SECRET=my-jwt-secret

// Use in code:
const secret = process.env.SESSION_SECRET;
```

**Why**: Keeps secrets safe, different per environment

---

## 🎓 Beginner Summary

### **Think of it like a physical store**

```
DIGITAL SERVICES STORE

┌─────────────────────────────────────┐
│ 🏪 STORE (Our App)                  │
├─────────────────────────────────────┤
│ STAFF (Admin)                       │
│ - Add new items to catalog          │
│ - Edit prices & descriptions        │
│ - Remove old items                  │
│ - Manage everything                 │
│                                     │
│ CUSTOMERS (Users)                   │
│ - Browse items                      │
│ - Pick items they want              │
│ - Go to checkout                    │
│ - Pay & place order                 │
│ - Check order history               │
│                                     │
│ SECURITY GUARD (Middleware)         │
│ - Checks: Are you a customer?       │
│ - Checks: Are you staff/admin?      │
│ - Only lets right people in         │
│                                     │
│ CASH REGISTER (Database)            │
│ - Stores customer info              │
│ - Stores item info                  │
│ - Stores order history              │
│ - Stores everything                 │
│                                     │
└─────────────────────────────────────┘
```

### **Key Concepts**

1. **Routes** = Doors/Hallways
   - GET /services = Door to browse services
   - POST /auth/login = Door to login

2. **Middleware** = Security checkpoints
   - isLoggedIn = "Are you a customer?"
   - isAdmin = "Are you staff?"

3. **Models** = Structure/Blueprint
   - User model = How user data is organized
   - Service model = How service data is organized

4. **Views** = What customer sees
   - HTML pages with forms, lists, etc.

5. **Database** = Storage
   - MongoDB = Saves everything permanently

---

## 📞 Common Questions Answered

### **Q: How does password security work?**
A: Password is encrypted before saving. Even if hacker sees database, they can't reverse encrypt password back to original.

### **Q: Why do I need to login after every 24 hours?**
A: For security. Session expires automatically. You must login again to prove it's really you.

### **Q: What happens if I upload a malicious file?**
A: Multer checks file type. Only images allowed. Virus files are blocked.

### **Q: Can customers see admin panel?**
A: No. Middleware checks role. Only users with role='admin' can access.

### **Q: Why does customer order tracking work now?**
A: Fixed bug in orders.js. Changed from `req.session.user._id` to `req.session.user.id`. Now queries database correctly!

### **Q: What is JWT token?**
A: Special code that proves you're logged in for API requests. Like a digital ID card.

---

**This is everything about Lab-Task4! If you have questions, ask!** 🚀

