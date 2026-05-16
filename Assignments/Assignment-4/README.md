# Assignment 4: Digital Services Administration & Management System

## Overview
A secure admin panel for managing digital services. Built with Express.js, MongoDB, Mongoose, and Multer for image uploads. Includes full CRUD operations with authentication, form validation, and file management.

## Features

### 1. Admin Authentication
- Password-protected login page (`/admin/login`)
- Session-based authentication
- Logout functionality

### 2. Dashboard (`/admin/dashboard`)
- Table view of all services
- Quick stats: Service count, categories
- Edit and Delete buttons for each service
- Responsive design

### 3. Service Management (CRUD)

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
