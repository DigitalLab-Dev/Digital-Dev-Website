// Middleware: Check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    req.flash('error', 'Please log in to access this page');
    res.redirect('/auth/login');
  }
};

// Middleware: Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    req.user = req.session.user;
    next();
  } else {
    req.flash('error', 'Access Denied! Only administrators can access this page');
    res.redirect('/');
  }
};

// Middleware: Check if user is already logged in (for login/register pages)
const isNotLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

module.exports = { isLoggedIn, isAdmin, isNotLoggedIn };
