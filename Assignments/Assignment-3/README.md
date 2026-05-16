# Assignment 3: Dynamic Service Catalog Integration

## Overview
A full-stack Express.js application with MongoDB integration featuring a dynamic services catalog with advanced filtering, searching, and pagination capabilities.

## Project Structure
```
Assignment-3/
├── app.js                          # Main Express server
├── package.json                    # Dependencies
├── .env                            # Environment variables
├── models/
│   └── Service.js                 # MongoDB Service schema
├── routes/
│   ├── index.js                   # Home page routes
│   └── services.js                # Services listing routes with filtering
├── views/
│   ├── layout.pug                 # Main layout template
│   ├── index.pug                  # Home page
│   ├── services.pug               # Services catalog page
│   ├── error.pug                  # Error page
│   └── 404.pug                    # 404 page
├── public/
│   ├── images/                    # Logo and assets
│   ├── javascripts/
│   │   └── main.js               # Client-side scripts
│   └── stylesheets/
│       ├── style.css             # Main styles
│       ├── layout.css            # Layout and navbar
│       └── services.css          # Services page styles
├── scripts/
│   └── seedServices.js           # Database seed script
└── README.md                      # This file
```

## Features

### ✅ Database Integration
- MongoDB with Mongoose
- Service schema with: name, description, category, price, rating, outcomes
- 30+ sample services in 8 categories
- Automatic database seeding

### ✅ Server-Side Pagination
- 8 services per page
- Navigation controls (Previous, Page Numbers, Next)
- Query parameter based navigation (?page=n)
- Pagination state preserved during filtering

### ✅ Advanced Filtering
- **Search Bar**: Full-text search by name and description
- **Category Filter**: Filter by 8 service categories
- **Price Range**: Min/Max price filtering
- **Sorting**: Sort by name, price (low/high), rating, newest

### ✅ Responsive Design
- Mobile-friendly layout
- Hamburger menu for mobile
- Grid-based responsive services display
- Sidebar filters collapse on mobile

### ✅ Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Template Engine**: Pug
- **Styling**: CSS3 with responsive design
- **Frontend**: Vanilla JavaScript

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

### Step 1: Install Dependencies
```bash
cd Assignments/Assignment-3
npm install
```

### Step 2: Ensure MongoDB is Running
```bash
# On macOS (if installed via Homebrew)
brew services start mongodb-community

# Or start MongoDB manually
mongod
```

### Step 3: Seed the Database
```bash
npm run seed
```

Expected output:
```
Connected to MongoDB
Cleared existing services
✓ Successfully seeded 30 services

Categories: Website Development, Mobile App, Digital Marketing, ...
Price Range: $500 - $5000
```

### Step 4: Start the Application

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

Server will be running at: **http://localhost:3000**

## Database Schema

### Service Model
```javascript
{
  name: String (required),
  description: String (required),
  category: String (enum: ['Website Development', 'Mobile App', 'Digital Marketing', 'Branding', 'UI/UX Design', 'E-commerce', 'Cloud Solutions', 'AI Solutions']),
  price: Number (required, min: 0),
  rating: Number (0-5, default: 0),
  outcomes: [String],
  image: String,
  featured: Boolean,
  createdAt: Date (default: now)
}
```

## Usage

### Home Page
- Visit: http://localhost:3000
- View featured services
- Navigation to full services catalog

### Services Catalog (/services)
- **Default View**: All services (Page 1)
- **Search**: Type service name in search box
- **Filter by Category**: Select category from dropdown
- **Filter by Price**: Set min/max price range
- **Sort Results**: Choose sort option (Name, Price, Rating, Newest)
- **Navigate Pages**: Use pagination controls at bottom

### URL Parameters
```
/services?page=2&search=website&category=Website%20Development&minPrice=1000&maxPrice=3000&sortBy=price-low
```

## Sample Data Categories

1. **Website Development** - E-commerce, Corporate, Portfolio websites, SaaS
2. **Mobile App** - iOS, Android, Cross-platform, Banking apps
3. **Digital Marketing** - SEO, Social Media, Email Marketing, PPC
4. **Branding** - Logo Design, Brand Identity, Rebranding
5. **UI/UX Design** - UX Audits, Design Systems, Mobile UI
6. **E-commerce** - Shopify, WooCommerce, B2B Portal
7. **Cloud Solutions** - Cloud Migration, AWS Setup, CI/CD Pipelines
8. **AI Solutions** - Chatbots, ML Models, Image Recognition

## API Endpoints

### GET /
Home page

### GET /services
Services listing page with filters

**Query Parameters**:
- `page` (number): Page number, default: 1
- `search` (string): Search query
- `category` (string): Filter by category
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sortBy` (string): Sort option (name, price-low, price-high, rating, newest)

## Features Details

### Pagination Algorithm
- Server-side calculation
- Smart page button display (max 5 buttons)
- Previous/Next navigation
- Total pages calculation
- Current page indicator

### Search Functionality
- Case-insensitive
- Searches in name and description
- Real-time filter update
- Preserves other filters during search

### Category Filter
- Dynamically populated from database
- All categories option
- Multiple services per category
- Filter preserves pagination

### Price Range Filter
- Min price: $0
- Max price: $999,999
- Automatically calculated from database
- Range validation

### Sorting Options
1. **Name (A-Z)**: Alphabetical
2. **Price (Low to High)**: Ascending
3. **Price (High to Low)**: Descending
4. **Rating (Highest)**: By rating
5. **Newest**: By creation date

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Troubleshooting

### MongoDB Connection Error
```
Error: MongoError: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Change port in `.env` or kill the process using port 3000

### Module Not Found
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Seed Failed
**Solution**: Clear and reseed
```bash
# Connect to MongoDB and drop database (or just run seed again)
npm run seed
```

## Performance Optimization

- Server-side pagination (doesn't load all data)
- Database indexing on frequently filtered fields
- Efficient MongoDB aggregation queries
- CSS minification ready
- Responsive image handling

## Future Enhancements

- Add service detail pages
- Implement user reviews and ratings
- Add shopping cart functionality
- User authentication
- Admin dashboard for service management
- Advanced search with filters combination saving
- Service comparison feature
- Email notifications

## Development Notes

- PUG template engine used for cleaner markup
- MongoDB local database setup (can switch to Atlas)
- Environment variables in `.env`
- Error handling with custom error pages
- Responsive design with mobile-first approach

## Support

For issues or questions, refer to the documentation or check:
- MongoDB Documentation: https://docs.mongodb.com
- Express.js Guide: https://expressjs.com
- Pug Documentation: https://pugjs.org

---

**Created**: May 2026  
**Assignment**: Assignment 3 - Dynamic Service Catalog Integration
