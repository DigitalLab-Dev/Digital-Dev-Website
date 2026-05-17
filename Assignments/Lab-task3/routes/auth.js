const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isNotLoggedIn } = require('../middleware/auth');

// REGISTER PAGE - Display form
router.get('/register', isNotLoggedIn, (req, res) => {
  res.render('auth/register.ejs', {
    title: 'Register',
    error: req.flash('error'),
    success: req.flash('success')
  });
});

// REGISTER POST - Save user to database
router.post('/register', isNotLoggedIn, async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // Validation
    if (!name || !email || !password || !passwordConfirm) {
      req.flash('error', 'All fields are required');
      return res.redirect('/auth/register');
    }

    if (password !== passwordConfirm) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/auth/register');
    }

    if (password.length < 6) {
      req.flash('error', 'Password must be at least 6 characters long');
      return res.redirect('/auth/register');
    }

    // Check if email already exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      req.flash('error', 'Email is already registered');
      return res.redirect('/auth/register');
    }

    // Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'customer'
    });

    await newUser.save();
    req.flash('success', 'User registered successfully! Please log in.');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    req.flash('error', 'An error occurred during registration');
    res.redirect('/auth/register');
  }
});

// LOGIN PAGE - Display form
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('auth/login.ejs', {
    title: 'Login',
    error: req.flash('error'),
    success: req.flash('success')
  });
});

// LOGIN POST - Verify credentials
router.post('/login', isNotLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      req.flash('error', 'Please provide email and password');
      return res.redirect('/auth/login');
    }

    // Find user and select password field (normally excluded)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Compare passwords
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Create session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'An error occurred during login');
    res.redirect('/auth/login');
  }
});

// LOGOUT
router.get('/logout', (req, res) => {
  req.flash('success', 'You have successfully logged out');
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
