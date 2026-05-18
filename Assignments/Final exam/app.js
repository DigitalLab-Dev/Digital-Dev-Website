const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB - naqvix_services database');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// View Engine Setup - PUG for user-facing pages, EJS for admin
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Also setup EJS for admin views
app.engine('ejs', require('ejs').renderFile);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session Middleware for Authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/naqvix_services',
    touchAfter: 24 * 3600 // Lazy session update
  }),
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Flash Messages Middleware
app.use(flash());

// Make user and flash messages available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const servicesRoutes = require('./routes/services');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const ordersRoutes = require('./routes/orders');

// API Routes (v1)
const apiAuthRoutes = require('./routes/api/auth');
const apiServicesRoutes = require('./routes/api/services');
const apiOrdersRoutes = require('./routes/api/orders');
const apiUserRoutes = require('./routes/api/user');

app.use('/', indexRoutes);
app.use('/services', servicesRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', ordersRoutes);

// Mount API Routes
app.use('/api/v1/auth', apiAuthRoutes);
app.use('/api/v1/services', apiServicesRoutes);
app.use('/api/v1/orders', apiOrdersRoutes);
app.use('/api/v1/user', apiUserRoutes);

// 404 Error Handler
app.use((req, res) => {
    res.status(404).render('404');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
