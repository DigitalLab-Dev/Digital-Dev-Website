const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Order = require('../models/Order');
const { isLoggedIn } = require('../middleware/auth');

const ITEMS_PER_PAGE = 10;

// GET /cart - Display shopping cart
router.get('/cart', async (req, res) => {
  try {
    // Cart items come from localStorage on client-side, not from server
    // We just pass empty data and let client handle it
    res.render('cart', {
      title: 'Shopping Cart',
      user: req.session.user || null,
      cartEmpty: true,
      cartItems: [],
      subtotal: 0
    });
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// GET /service/:id - Display service details
router.get('/service/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).render('error', {
        error: 'Service not found'
      });
    }

    // Get all services for "related services" section
    const allServices = await Service.find();

    res.render('service-detail', {
      title: service.name,
      service,
      allServices,
      user: req.session.user || null
    });
  } catch (error) {
    console.error('Service detail error:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// GET /checkout - Display checkout page
router.get('/checkout', isLoggedIn, async (req, res) => {
  try {
    res.render('checkout', {
      title: 'Checkout',
      user: req.session.user,
      cartItems: [], // Cart items managed on client-side
      subtotal: 0,
      description: '',
      notes: ''
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// GET /orders - Display user's orders
router.get('/orders', isLoggedIn, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Get total count
    const total = await Order.countDocuments({ userId: req.session.user.id });
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    // Fetch orders
    const orders = await Order.find({ userId: req.session.user.id })
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 });

    // Pagination array
    const paginationArray = [];
    const maxPaginationButtons = 5;
    let startPage = Math.max(1, page - Math.floor(maxPaginationButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);

    if (endPage - startPage < maxPaginationButtons - 1) {
      startPage = Math.max(1, endPage - maxPaginationButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationArray.push(i);
    }

    res.render('orders', {
      title: 'My Orders',
      user: req.session.user,
      orders,
      page,
      totalPages,
      paginationArray,
      total
    });
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).render('error', { error: error.message });
  }
});

module.exports = router;
