# Lab-Task3: User Authentication & Role-Based Access Control

## Overview
A secure digital services platform with user authentication, registration, password hashing, and role-based access control (Admin vs. Customer).

## ✨ Features Implemented

### 1. User Model & Registration ✅
- **User Schema**: name, email, password, role (customer/admin)
- **Password Hashing**: bcryptjs (10 salt rounds)
- **Email Validation**: Unique emails with regex pattern validation
- **Password Requirements**: Minimum 6 characters
- **Pre-save Hook**: Automatically hashes passwords before saving

### 2. Authentication Routes ✅
- **`/auth/register`** - User registration form and processing
- **`/auth/login`** - User login with email/password verification
- **`/auth/logout`** - Session destruction and redirect

### 3. Session & Cookie Management ✅
- **express-session**: Session management
- **connect-mongo**: MongoDB session store (persistent sessions)
- **Session Timeout**: 24 hours
- **Session Variables**: Stores user ID, name, email, and role

### 4. Authorization Middleware ✅
- **`isLoggedIn`**: Redirects unauthenticated users to login
- **`isAdmin`**: Checks if user is admin, denies access for customers
- **`isNotLoggedIn`**: Prevents logged-in users from accessing auth pages

### 5. Role-Based Access Control (RBAC) ✅
- **Customer Role**: Can browse services and user profile
- **Admin Role**: Can manage (CRUD) all services
- **Protected Routes**: All `/admin` routes protected by `isAdmin` middleware
- **Access Denial**: Non-admins redirected with error message

### 6. Dynamic Navigation UI ✅
- **Guest**: Shows "Login" and "Register" links
- **Logged-in User**: Shows user profile dropdown and "Logout"
- **Admin User**: Shows "Admin Panel" link
- **Real-time**: Updates based on session data

### 7. Flash Messages ✅
- **connect-flash**: Integration for temporary messages
- **Success Messages**: Registration, login, CRUD operations
- **Error Messages**: Invalid credentials, validation errors
- **Auto-dismiss**: Messages cleared after display

### 8. Admin Panel with User Info ✅
- **User Profile**: Shows logged-in admin name, email, role
- **Admin Dashboard**: Protected by isAdmin middleware
- **Create/Edit/Delete**: All protected by authentication
- **Image Management**: Multer integration for service images

## 📁 Project Structure

```
Lab-task3/
├── app.js                          # Main server with auth setup
├── package.json                    # Dependencies
├── .env                            # Environment variables
├── models/
│   ├── Service.js                  # Service schema
│   └── User.js                     # User schema with bcryptjs
├── middleware/
│   └── auth.js                     # Auth middleware (isLoggedIn, isAdmin)
├── routes/
│   ├── index.js                    # Home page
│   ├── services.js                 # Service catalog
│   ├── auth.js                     # Auth routes (register, login, logout)
│   └── admin.js                    # Admin CRUD (protected by isAdmin)
├── views/
│   ├── layout.pug                  # Main layout with dynamic navbar
│   ├── index.pug                   # Home page
│   ├── services.pug                # Service catalog
│   ├── 404.pug                     # 404 page
│   ├── error.pug                   # Error page
│   ├── auth/
│   │   ├── register.ejs            # Registration form
│   │   └── login.ejs               # Login form
│   └── admin/
│       ├── layout.ejs              # Admin layout
│       ├── dashboard.ejs           # Services table (admin only)
│       ├── create.ejs              # Add service form (admin only)
│       ├── edit.ejs                # Edit service form (admin only)
│       └── error.ejs               # Admin error page
├── public/
│   ├── uploads/                    # User-uploaded service images
│   ├── images/                     # Static images
│   └── stylesheets/
│       ├── style.css               # Services styles
│       ├── layout.css              # Navbar, footer, flash messages
│       └── services.css            # Service grid styles
└── scripts/
    └── seedServices.js             # Database seeding script
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js v14+
- MongoDB (running locally or cloud)
- npm/yarn

### Step 1: Install Dependencies
```bash
cd Lab-task3
npm install
```

### Step 2: Configure .env
```env
MONGODB_URI=mongodb://localhost:27017/naqvix_services
PORT=3000
SESSION_SECRET=your-secret-key-for-lab-task-3
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
mongod
# or (macOS)
brew services start mongodb-community
```

### Step 4: Seed Database (Optional)
```bash
npm run seed
```

### Step 5: Start Server
```bash
npm start
# or development with auto-reload
npm run dev
```

Server runs at: **http://localhost:3000**

## 📋 User Flows

### Registration Flow
1. User visits `/auth/register`
2. Fills: Name, Email, Password, Confirm Password
3. Server validates input
4. Password hashed with bcryptjs
5. User created in MongoDB
6. Redirected to login with success message

### Login Flow
1. User visits `/auth/login`
2. Enters email and password
3. Server finds user by email
4. bcryptjs compares entered password with stored hash
5. If valid: Creates session with user data
6. Session stored in MongoDB
7. Redirected to homepage with welcome message

### Admin Access Flow
1. Admin user logs in
2. Session stores `role: 'admin'`
3. Can access `/admin` routes
4. Non-admin customers get "Access Denied" message
5. Redirected to homepage

### Logout Flow
1. User clicks "Logout"
2. Session destroyed
3. MongoDB session cleared
4. Redirected to homepage
5. "Logged out successfully" message

## 🔒 Security Features

### Password Security
- ✅ Bcryptjs hashing (10 salt rounds)
- ✅ Minimum 6 character requirement
- ✅ Never stored in plain text
- ✅ `select: false` in schema (excluded from queries)

### Session Security
- ✅ MongoDB persistent store (not in-memory)
- ✅ 24-hour expiration
- ✅ Secure cookies (set to true for HTTPS)
- ✅ Session-based authentication

### Access Control
- ✅ Middleware checks before route execution
- ✅ Role-based access enforcement
- ✅ Unauthenticated users redirected
- ✅ Admin-only routes protected

### Data Validation
- ✅ Email format validation (regex)
- ✅ Unique email enforcement
- ✅ Password confirmation check
- ✅ Required field validation

## 🎯 Key Routes

### Authentication Routes
```
GET    /auth/register              # Registration form
POST   /auth/register              # Process registration
GET    /auth/login                 # Login form
POST   /auth/login                 # Process login
GET    /auth/logout                # Logout
```

### Admin Routes (Protected by isAdmin)
```
GET    /admin/dashboard            # View all services
GET    /admin/create               # Add service form
POST   /admin/create               # Save new service
GET    /admin/edit/:id             # Edit service form
POST   /admin/edit/:id             # Update service
DELETE /admin/:id                  # Delete service
```

### Public Routes
```
GET    /                           # Home page
GET    /services                   # Service catalog
```

## 📝 Database Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, min 6 chars),
  role: String (enum: ['customer', 'admin'], default: 'customer'),
  createdAt: Date (auto)
}
```

### Service Schema
```javascript
{
  name: String (required),
  description: String (required),
  category: String (required),
  price: Number (required, min: 0),
  rating: Number (0-5),
  outcomes: [String],
  image: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🧪 Testing

### Register a New User
1. Visit http://localhost:3000/auth/register
2. Fill form with: Name, Email, Password
3. Click Register
4. Success message shown
5. Redirected to login page

### Login
1. Visit http://localhost:3000/auth/login
2. Enter email and password
3. Click Sign In
4. Welcome message shown
5. Redirected to home page
6. Navbar updates (shows Logout link)

### Admin Access
1. Create user and assign role manually or use admin seed
2. Log in with admin account
3. Click "Admin Panel" in navbar
4. Access dashboard, create, edit, delete services
5. Non-admin users will get "Access Denied" if they try `/admin` routes

### Logout
1. Click "Logout" in navbar
2. Session destroyed
3. Redirected to home page
4. "Logged out successfully" message

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Start MongoDB
```bash
mongod
```

### Module Not Found
**Solution**: Install dependencies
```bash
npm install
```

### "Access Denied" for Admin
**Solution**: Ensure user role is "admin" in database
```bash
db.users.updateOne({email: "admin@example.com"}, {$set: {role: "admin"}})
```

### Password Hash Not Working
**Solution**: Ensure bcryptjs is installed
```bash
npm install bcryptjs
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| **express** | Web framework |
| **mongoose** | MongoDB ODM |
| **bcryptjs** | Password hashing |
| **express-session** | Session management |
| **connect-mongo** | MongoDB session store |
| **connect-flash** | Flash messages |
| **multer** | File uploads |
| **pug** | User template engine |
| **ejs** | Admin template engine |

## 🔄 Workflow Summary

```
User Registration → Password Hashed → Stored in DB
         ↓
    User Login → Email/Password Match → Session Created
         ↓
    Session in MongoDB → User Role Checked
         ↓
    Admin? → Yes → Access Admin Panel
    Admin? → No → Access Customer Pages
         ↓
    User Logout → Session Destroyed → Redirected Home
```

## ✅ Checklist

- [x] User Model with password hashing (bcryptjs)
- [x] Unique email validation
- [x] Registration route with validation
- [x] Login route with password comparison
- [x] Session management with MongoDB store
- [x] Flash messages (success/error)
- [x] isLoggedIn middleware
- [x] isAdmin middleware
- [x] Dynamic navbar (Guest/User/Admin)
- [x] Protected admin routes
- [x] Admin panel with user info
- [x] Logout functionality
- [x] Form validation (client & server)
- [x] Error handling

## 🎓 Next Steps

1. **Enhanced Security**: Add JWT tokens, 2FA
2. **Audit Logging**: Track all admin actions
3. **Email Verification**: Confirm email on registration
4. **Password Reset**: Forgot password functionality
5. **User Management**: Admin can manage users
6. **Permissions**: More granular role-based permissions
7. **Rate Limiting**: Prevent brute force attacks
8. **API Keys**: For external integrations

## 📚 Resources

- [Bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Express Session](https://github.com/expressjs/session)
- [Connect Mongo](https://github.com/kcbanner/connect-mongo)
- [Connect Flash](https://github.com/jaredhanson/connect-flash)
- [MongoDB Best Practices](https://docs.mongodb.com/)

---

**Version**: 1.0.0  
**Status**: ✅ Complete  
**Created**: May 2026
