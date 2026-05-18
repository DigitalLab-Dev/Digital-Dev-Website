const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    const token = req.session.token || null;
    res.render('index', { 
        title: 'Naqvix - Digital Services',
        token: token,
        user: req.session.user || null
    });
});

module.exports = router;
