const jwt = require('jsonwebtoken');

// Verify JWT Token Middleware
const verifyToken = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please include JWT token in Authorization header',
        code: 'NO_TOKEN'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-key');

    // Append decoded user info to req object
    req.user = decoded;
    req.userId = decoded.user_id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again',
        code: 'TOKEN_EXPIRED'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        success: false,
        message: 'Invalid token. Please provide a valid JWT token',
        code: 'INVALID_TOKEN'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Token verification failed',
      code: 'VERIFICATION_FAILED'
    });
  }
};

// Check if user is admin
const verifyAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access Denied. Only administrators can perform this action',
      code: 'ADMIN_ONLY'
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin
};
