const express = require('express');
const router = express.Router();
const { getWeightData } = require('../controllers/weightController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/weight - Protected route
router.route('/').get(protect, getWeightData);

module.exports = router;