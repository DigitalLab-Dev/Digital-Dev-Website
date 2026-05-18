const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

const ITEMS_PER_PAGE = 8;

// GET /services - Display services with pagination, filtering, and searching
router.get('/', async (req, res) => {
    try {
        // Get query parameters
        const page = parseInt(req.query.page) || 1;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || 999999;
        const sortBy = req.query.sortBy || 'name';

        // Build filter object
        const filter = {
            price: { $gte: minPrice, $lte: maxPrice }
        };

        // Add search filter
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Add category filter
        if (category) {
            filter.category = category;
        }

        // Get all categories for filter dropdown
        const categories = await Service.distinct('category');

        // Build sort object
        let sortObject = {};
        switch(sortBy) {
            case 'price-low':
                sortObject = { price: 1 };
                break;
            case 'price-high':
                sortObject = { price: -1 };
                break;
            case 'rating':
                sortObject = { rating: -1 };
                break;
            case 'newest':
                sortObject = { createdAt: -1 };
                break;
            default:
                sortObject = { name: 1 };
        }

        // Calculate skip for pagination
        const skip = (page - 1) * ITEMS_PER_PAGE;

        // Get total count for pagination
        const totalServices = await Service.countDocuments(filter);
        const totalPages = Math.ceil(totalServices / ITEMS_PER_PAGE);

        // Fetch services with pagination
        const services = await Service.find(filter)
            .sort(sortObject)
            .skip(skip)
            .limit(ITEMS_PER_PAGE);

        // Get price range for filter
        const priceStats = await Service.aggregate([
            { $group: { _id: null, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } }
        ]);
        const priceRange = priceStats[0] || { minPrice: 0, maxPrice: 0 };

        // Pagination array for buttons
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

        res.render('services', {
            services,
            currentPage: page,
            totalPages,
            paginationArray,
            totalServices,
            search,
            category,
            minPrice,
            maxPrice,
            sortBy,
            categories,
            priceRange,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).render('error', { error: err.message });
    }
});

// GET /onsale-services - Display all on-sale services with client-side pagination
router.get('/onsale-services', async (req, res) => {
    try {
        // Query all services where isOnSale is true
        const onSaleServices = await Service.find({ isOnSale: true }).sort({ createdAt: -1 });
        
        // Pass all services to the view for client-side jQuery pagination
        res.render('onsale', {
            title: 'On-Sale Services',
            services: onSaleServices,
            serviceCount: onSaleServices.length,
            user: req.session.user || null
        });
    } catch (err) {
        console.error('Error fetching on-sale services:', err);
        res.status(500).render('error', { error: 'Failed to load on-sale services' });
    }
});

module.exports = router;
