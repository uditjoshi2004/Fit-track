const express = require('express');
const router = express.Router();
const ACHIEVEMENTS = require('../config/achievements');

// @route   GET /api/achievements
// @desc    Get all possible achievements
router.get('/', (req, res) => {
  // Convert the achievements object to an array and send it
  res.json(Object.values(ACHIEVEMENTS));
});

module.exports = router;