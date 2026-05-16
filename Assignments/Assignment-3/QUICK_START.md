# 🚀 Quick Start Guide - Assignment 3

## 30 Second Setup

```bash
# 1. Navigate to project
cd "Assignments/Assignment-3"

# 2. Install dependencies
npm install

# 3. Make sure MongoDB is running
mongod  # (in another terminal)

# 4. Seed database
npm run seed

# 5. Start server
npm run dev
```

Then open: **http://localhost:3000**

## What You Get

### Home Page (/)
- Featured services showcase
- Call-to-action buttons
- Direct links to service categories

### Services Catalog (/services)
- **30 Services** across 8 categories
- **Pagination**: 8 items per page
- **Search**: Find services by name/description
- **Category Filter**: Select from 8 categories
- **Price Filter**: Set min/max price range
- **Sorting**: 5 sort options
- **Responsive Design**: Works on mobile, tablet, desktop

## Key Features

✅ **MongoDB Integration** - Local database  
✅ **Pug Templates** - Clean HTML templating  
✅ **Advanced Filtering** - Search + Category + Price  
✅ **Server-Side Pagination** - 8 items per page  
✅ **Sorting** - 5 sort options  
✅ **Responsive** - Mobile-friendly  
✅ **Professional UI** - Modern design  

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Run `mongod` in separate terminal |
| Port 3000 already in use | Kill process or change .env PORT |
| npm install fails | Delete node_modules, try again |
| Database seed fails | Just run `npm run seed` again |

## Environment Setup (.env)
```
MONGODB_URI=mongodb://localhost:27017/naqvix_services
PORT=3000
NODE_ENV=development
```

## Service Data (Sample)
- **Categories**: 8 different types
- **Services**: 30+ items total
- **Price Range**: $500 - $5000
- **Ratings**: 4.3 - 4.9 stars
- **Outcomes**: 2-4 outcomes per service

## File Structure Quick Reference
```
Assignment-3/
├── app.js                    ← Server entry point
├── package.json              ← Dependencies
├── .env                      ← Config
├── models/Service.js         ← Database schema
├── routes/                   ← API routes
├── views/                    ← Pug templates
├── public/stylesheets/       ← CSS files
└── scripts/seedServices.js   ← Data seeding
```

## Next Steps (Optional Enhancements)

1. Add service detail page (/services/:id)
2. Implement user authentication
3. Add shopping cart
4. Create admin dashboard
5. Add user reviews
6. Implement email notifications

## Browser Testing

Test on:
- ✅ Chrome
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

**All requirements completed!** 🎉

For detailed documentation, see: `README.md`
