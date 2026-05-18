const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
const Service = require('../../models/Service');
const User = require('../../models/User');
const { verifyToken, verifyAdmin } = require('../../middleware/jwtAuth');

// POST /api/v1/orders - Create a new order (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { services, description, notes } = req.body;

    // Validation
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one service in the order',
        code: 'INVALID_SERVICES'
      });
    }

    // Fetch user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Process services and calculate total
    let totalAmount = 0;
    const processedServices = [];

    for (const item of services) {
      if (!item.serviceId || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Each service must have serviceId and quantity',
          code: 'INVALID_SERVICE_DATA'
        });
      }

      // Fetch service details
      const service = await Service.findById(item.serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: `Service with ID ${item.serviceId} not found`,
          code: 'SERVICE_NOT_FOUND'
        });
      }

      const subtotal = service.price * item.quantity;
      totalAmount += subtotal;

      processedServices.push({
        serviceId: service._id,
        serviceName: service.name,
        quantity: item.quantity,
        price: service.price,
        subtotal: subtotal
      });
    }

    // Create order
    const order = new Order({
      userId: req.userId,
      services: processedServices,
      totalAmount: totalAmount,
      customerEmail: user.email,
      customerName: user.name,
      description: description || '',
      notes: notes || '',
      status: 'pending',
      paymentStatus: 'unpaid'
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: {
          id: order._id,
          userId: order.userId,
          services: order.services,
          totalAmount: order.totalAmount,
          status: order.status,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

// GET /api/v1/orders - Get user's orders (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Order.countDocuments({ userId: req.userId });
    const totalPages = Math.ceil(total / limit);

    // Fetch orders
    const orders = await Order.find({ userId: req.userId })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        orders: orders,
        pagination: {
          current_page: page,
          total_pages: totalPages,
          total_items: total,
          items_per_page: limit
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching orders',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

// GET /api/v1/orders/:id - Get order details (protected)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format',
        code: 'INVALID_ID'
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        code: 'NOT_FOUND'
      });
    }

    // Check if order belongs to user or user is admin
    if (order.userId.toString() !== req.userId.toString() && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this order',
        code: 'FORBIDDEN'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: {
        order: order
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the order',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

module.exports = router;
