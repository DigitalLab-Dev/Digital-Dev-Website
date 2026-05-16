const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'service-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  }
});

// Admin Password (in production, use proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware: Check admin authentication
const checkAdminAuth = (req, res, next) => {
  if (req.session && req.session.adminAuthenticated) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

// LOGIN PAGE
router.get('/login', (req, res) => {
  res.render('admin/login.ejs', { error: null, title: 'Admin Login' });
});

// LOGIN POST (Verify Password)
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.render('admin/login.ejs', { error: 'Password is required', title: 'Admin Login' });
  }
  
  if (password === ADMIN_PASSWORD) {
    req.session.adminAuthenticated = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login.ejs', { error: 'Invalid password', title: 'Admin Login' });
  }
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// DASHBOARD - Display all services in a table
router.get('/dashboard', checkAdminAuth, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.render('admin/dashboard.ejs', { 
      services,
      title: 'Services Dashboard',
      pageTitle: 'All Services'
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('admin/error.ejs', { 
      error: 'Failed to load services',
      title: 'Error'
    });
  }
});

// CREATE PAGE - Show form
router.get('/create', checkAdminAuth, (req, res) => {
  res.render('admin/create.ejs', { 
    title: 'Add New Service',
    pageTitle: 'Create Service',
    error: null,
    service: {}
  });
});

// CREATE POST - Save to database
router.post('/create', checkAdminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, rating, outcomes } = req.body;
    
    // Validation
    if (!name || !description || !category || !price) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(400).render('admin/create.ejs', {
        error: 'All fields (name, description, category, price) are required',
        title: 'Add New Service',
        pageTitle: 'Create Service',
        service: req.body
      });
    }

    // Parse outcomes array
    let outcomesArray = [];
    if (outcomes) {
      if (Array.isArray(outcomes)) {
        outcomesArray = outcomes.filter(o => o.trim());
      } else {
        outcomesArray = outcomes.split(',').map(o => o.trim()).filter(o => o);
      }
    }

    // Create service object
    const serviceData = {
      name,
      description,
      category,
      price: parseFloat(price),
      rating: parseFloat(rating) || 4.5,
      outcomes: outcomesArray || [],
      image: req.file ? `/uploads/${req.file.filename}` : '/images/default-service.png'
    };

    const newService = new Service(serviceData);
    await newService.save();

    res.redirect('/admin/dashboard?success=Service created successfully');
  } catch (error) {
    console.error('Create service error:', error);
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).render('admin/create.ejs', {
      error: 'Failed to create service: ' + error.message,
      title: 'Add New Service',
      pageTitle: 'Create Service',
      service: req.body
    });
  }
});

// EDIT PAGE - Show form with existing data
router.get('/edit/:id', checkAdminAuth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).render('admin/error.ejs', { 
        error: 'Service not found',
        title: 'Error'
      });
    }
    res.render('admin/edit.ejs', {
      service,
      title: 'Edit Service',
      pageTitle: `Edit: ${service.name}`,
      error: null
    });
  } catch (error) {
    console.error('Edit page error:', error);
    res.status(500).render('admin/error.ejs', { 
      error: 'Failed to load service',
      title: 'Error'
    });
  }
});

// UPDATE POST
router.post('/edit/:id', checkAdminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, rating, outcomes } = req.body;
    
    // Validation
    if (!name || !description || !category || !price) {
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      const service = await Service.findById(req.params.id);
      return res.status(400).render('admin/edit.ejs', {
        error: 'All fields (name, description, category, price) are required',
        title: 'Edit Service',
        pageTitle: `Edit: ${service.name}`,
        service: service
      });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(404).render('admin/error.ejs', { 
        error: 'Service not found',
        title: 'Error'
      });
    }

    // Parse outcomes array
    let outcomesArray = [];
    if (outcomes) {
      if (Array.isArray(outcomes)) {
        outcomesArray = outcomes.filter(o => o.trim());
      } else {
        outcomesArray = outcomes.split(',').map(o => o.trim()).filter(o => o);
      }
    }

    // Delete old image if new image is uploaded
    if (req.file && service.image && service.image.includes('/uploads/')) {
      const oldImagePath = path.join(__dirname, '../public', service.image);
      fs.unlink(oldImagePath, () => {});
    }

    // Update service
    service.name = name;
    service.description = description;
    service.category = category;
    service.price = parseFloat(price);
    service.rating = parseFloat(rating) || service.rating;
    service.outcomes = outcomesArray;
    if (req.file) {
      service.image = `/uploads/${req.file.filename}`;
    }

    await service.save();
    res.redirect('/admin/dashboard?success=Service updated successfully');
  } catch (error) {
    console.error('Update service error:', error);
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).render('admin/error.ejs', { 
      error: 'Failed to update service: ' + error.message,
      title: 'Error'
    });
  }
});

// DELETE ENDPOINT (returns JSON)
router.delete('/:id', checkAdminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    // Delete image if exists
    if (service.image && service.image.includes('/uploads/')) {
      const imagePath = path.join(__dirname, '../public', service.image);
      fs.unlink(imagePath, () => {});
    }

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
});

module.exports = router;
