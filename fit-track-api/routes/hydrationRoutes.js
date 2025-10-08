const express = require('express');
const router = express.Router();
const { getHydrationData } = require('../controllers/hydrationController');
const { protect } = require('../middleware/authMiddleware');

// Defines the GET /api/hydration endpoint
router.route('/').get(protect, getHydrationData);

module.exports = router;