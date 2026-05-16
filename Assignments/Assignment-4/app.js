const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
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

// Session Middleware for Admin Authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
const indexRoutes = require('./routes/index');
const servicesRoutes = require('./routes/services');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/services', servicesRoutes);
app.use('/admin', adminRoutes);

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
