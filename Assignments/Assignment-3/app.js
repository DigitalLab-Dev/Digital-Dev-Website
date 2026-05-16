const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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

// View Engine Setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const indexRoutes = require('./routes/index');
const servicesRoutes = require('./routes/services');

app.use('/', indexRoutes);
app.use('/services', servicesRoutes);

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
