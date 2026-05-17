const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isAdmin } = require('../middleware/auth');

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

// DASHBOARD - Display all services in a table (Protected: Admin only)
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.render('admin/dashboard.ejs', { 
      services,
      title: 'Services Dashboard',
      pageTitle: 'All Services',
      user: req.user
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('admin/error.ejs', { 
      error: 'Failed to load services',
      title: 'Error'
    });
  }
});

// CREATE PAGE - Show form (Protected: Admin only)
router.get('/create', isAdmin, (req, res) => {
  res.render('admin/create.ejs', { 
    title: 'Add New Service',
    pageTitle: 'Create Service',
    error: null,
    service: {},
    user: req.user
  });
});

// CREATE POST - Save to database (Protected: Admin only)
router.post('/create', isAdmin, upload.single('image'), async (req, res) => {
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
        service: req.body,
        user: req.user
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

    req.flash('success', 'Service created successfully!');
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Create service error:', error);
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).render('admin/create.ejs', {
      error: 'Failed to create service: ' + error.message,
      title: 'Add New Service',
      pageTitle: 'Create Service',
      service: req.body,
      user: req.user
    });
  }
});

// EDIT PAGE - Show form with existing data (Protected: Admin only)
router.get('/edit/:id', isAdmin, async (req, res) => {
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
      error: null,
      user: req.user
    });
  } catch (error) {
    console.error('Edit page error:', error);
    res.status(500).render('admin/error.ejs', { 
      error: 'Failed to load service',
      title: 'Error'
    });
  }
});

// UPDATE POST (Protected: Admin only)
router.post('/edit/:id', isAdmin, upload.single('image'), async (req, res) => {
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
        service: service,
        user: req.user
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
    req.flash('success', 'Service updated successfully!');
    res.redirect('/admin/dashboard');
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

// DELETE ENDPOINT (returns JSON) (Protected: Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
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
