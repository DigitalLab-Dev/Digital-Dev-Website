const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { verifyToken } = require('../../middleware/jwtAuth');

// GET /api/v1/user/profile - Get authenticated user's profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 'NOT_FOUND'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching profile',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

module.exports = router;
