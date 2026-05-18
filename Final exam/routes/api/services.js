const express = require('express');
const router = express.Router();
const Service = require('../../models/Service');

// GET /api/v1/services - Get all services with pagination and filtering
router.get('/', async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering parameters
    const category = req.query.category;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const search = req.query.search;

    // Build filter object
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const total = await Service.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Fetch services
    const services = await Service.find(filter)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    return res.status(200).json({
      success: true,
      message: 'Services retrieved successfully',
      data: {
        services: services,
        pagination: {
          current_page: page,
          total_pages: totalPages,
          total_items: total,
          items_per_page: limit
        }
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching services',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

// GET /api/v1/services/:id - Get single service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID format',
        code: 'INVALID_ID'
      });
    }

    const service = await Service.findById(id).select('-__v');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
        code: 'NOT_FOUND'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service retrieved successfully',
      data: {
        service: service
      }
    });
  } catch (error) {
    console.error('Get service error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the service',
      code: 'SERVER_ERROR',
      error: error.message
    });
  }
});

module.exports = router;
