# 🚀 Quick Start Guide - Assignment 4

## ⚡ 5-Minute Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with content below
# MONGODB_URI=mongodb://localhost:27017/naqvix_services
# PORT=3000
# ADMIN_PASSWORD=admin123
# SESSION_SECRET=your-secret-key-12345

# 3. Make sure MongoDB is running
mongod  # (in another terminal)

# 4. Seed database (optional)
npm run seed

# 5. Start server
npm start
```

Then open: **http://localhost:3000**

---

## 🔐 Admin Access

**URL**: http://localhost:3000/admin/login  
**Password**: `admin123` (from .env file)

---

## 📋 What's Included

### Public Pages
- **Home** (/) - Welcome page with featured services
- **Services** (/services) - Service catalog with filters, search, pagination

### Admin Panel
- **Login** (/admin/login) - Password-protected access
- **Dashboard** (/admin/dashboard) - View all services in a table
- **Create** (/admin/create) - Add new services with image upload
- **Edit** (/admin/edit/:id) - Modify existing services
- **Delete** (/admin) - AJAX-based service deletion

---

## ✨ Key Features

✅ **Admin Authentication** - Session-based login  
✅ **CRUD Operations** - Create, Read, Update, Delete services  
✅ **Image Upload** - Multer integration for file uploads  
✅ **Form Validation** - Required field validation  
✅ **Responsive Design** - Mobile-friendly admin panel  
✅ **Database Integration** - MongoDB with Mongoose  
✅ **User Pages** - PUG templates with filters  
✅ **Admin Pages** - EJS templates for admin panel  

---

## 🎯 Common Tasks

### 1️⃣ Add a New Service
1. Go to: `/admin/create`
2. Enter: Name, Description, Category, Price
3. Upload image (optional)
4. Click "Add Service"

### 2️⃣ View All Services
1. Go to: `/admin/dashboard`
2. See table with all services
3. Edit or Delete any service

### 3️⃣ Update a Service
1. Click "Edit" in dashboard
2. Modify fields
3. Upload new image (optional)
4. Click "Update"

### 4️⃣ Delete a Service
1. Click "Delete" button in dashboard
2. Confirm in popup
3. Service and image removed

### 5️⃣ View Public Catalog
1. Go to: `/services`
2. Use filters: Search, Category, Price
3. Sort and navigate pages

---

## 📁 Project Structure

```
Assignment-4/
├── app.js                      ← Main server
├── package.json                ← Dependencies
├── .env                        ← Config (create this)
├── .gitignore                  ← Git ignore rules
├── models/
│   └── Service.js              ← Database schema
├── routes/
│   ├── index.js                ← Home & services routes
│   ├── services.js             ← Service catalog routes
│   └── admin.js                ← Admin CRUD routes
├── views/
│   ├── *.pug                   ← User pages (PUG)
│   └── admin/                  ← Admin pages (EJS)
├── public/
│   ├── uploads/                ← Uploaded images
│   ├── images/                 ← Static images
│   └── stylesheets/            ← CSS files
└── scripts/
    └── seedServices.js         ← Database seeding
```

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/naqvix_services

# Server Port
PORT=3000

# Admin Password
ADMIN_PASSWORD=admin123

# Session Secret (any random string)
SESSION_SECRET=your-super-secret-key-12345
```

---

## 🗄️ Database Schema

### Service Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  category: String (required),
  price: Number (required, > 0),
  rating: Number (0-5, default: 4.5),
  outcomes: [String],
  image: String (file path),
  featured: Boolean,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Sample Categories**: Website Development, Mobile App, Digital Marketing, Branding, UI/UX Design, E-commerce, Cloud Solutions, AI Solutions

---

## 🖼️ Image Upload

- **Location**: `/public/uploads/`
- **Formats**: JPEG, PNG, WebP, GIF
- **Max Size**: 5MB per file
- **Naming**: `service-[timestamp]-[random].ext`
- **Auto Cleanup**: Old images deleted when replaced

---

## 🧪 Test Database

Seed with sample data:

```bash
npm run seed
```

This populates:
- 27 sample services
- 8 categories
- Varied pricing ($1000 - $5000)
- Multiple outcomes per service

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **MongoDB Error** | Run `mongod` or `brew services start mongodb-community` |
| **Port 3000 in use** | Change `PORT=3001` in .env or `lsof -i :3000; kill -9 <PID>` |
| **Upload fails** | Create `mkdir -p public/uploads` |
| **No services showing** | Run `npm run seed` |
| **Module errors** | `rm -rf node_modules; npm install` |
| **Image not saving** | Check `/public/uploads/` directory exists |

---

## 📊 API Endpoints

### Admin Routes (Protected)
```
POST   /admin/login              ← Login page submission
GET    /admin/logout             ← End session
GET    /admin/dashboard          ← View all services
GET    /admin/create             ← Add service form
POST   /admin/create             ← Save new service
GET    /admin/edit/:id           ← Edit service form
POST   /admin/edit/:id           ← Update service
DELETE /admin/:id                ← Delete service (JSON)
```

### Public Routes
```
GET    /                         ← Home page
GET    /services                 ← Service catalog
GET    /services?search=...      ← Search services
GET    /services?category=...    ← Filter by category
GET    /services?minPrice=...    ← Price filter
GET    /services?page=...        ← Pagination
```

---

## 🔒 Security Notes

- **Session**: Expires in 24 hours
- **Password**: Change `ADMIN_PASSWORD` in production
- **Files**: Original filenames not used (prevents path traversal)
- **⚠️ Production**: Use bcrypt for passwords, JWT for tokens

---

## 🔧 Development

### Auto-Reload Mode
Install nodemon:
```bash
npm install -g nodemon
npm run dev
```

### View Logs
```bash
# In separate terminal
tail -f app.log
```

---

## 📚 Technology Stack

| Tech | Purpose |
|------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web server framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | Database ODM |
| **Multer** | File upload handling |
| **express-session** | Session management |
| **PUG** | User template engine |
| **EJS** | Admin template engine |

---

## ✅ Checklist

- [ ] MongoDB running
- [ ] `.env` file created
- [ ] `npm install` completed
- [ ] Server started with `npm start`
- [ ] Can access http://localhost:3000
- [ ] Can login to admin panel
- [ ] Can create a test service
- [ ] Can upload an image
- [ ] Can edit a service
- [ ] Can delete a service

---

## 🎓 Next Steps

1. **Explore UI** - Familiarize yourself with all pages
2. **Create Services** - Add test data through admin panel
3. **Test Features** - Try upload, edit, delete operations
4. **Review Code** - Understand CRUD implementation
5. **Customize** - Add more categories, fields, or features
6. **Deploy** - Get ready for production

---

## 📖 Full Documentation

See [README.md](README.md) for complete documentation, advanced setup, and troubleshooting.

---

**Version**: 1.0.0 | **Status**: Ready to use ✅
- ✅ Edge
- ✅ Mobile browsers

---

**All requirements completed!** 🎉

For detailed documentation, see: `README.md`
