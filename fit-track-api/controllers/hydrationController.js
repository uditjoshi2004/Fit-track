const HydrationEntry = require('../models/HydrationEntry');

// @desc    Get all hydration entries for the logged-in user
// @route   GET /api/hydration
// @access  Private
const getHydrationData = async (req, res) => {
  try {
    const hydrationData = await HydrationEntry.find({ user: req.user.id }).sort({ date: 'asc' });
    res.status(200).json(hydrationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching hydration data' });
  }
};

module.exports = {
  getHydrationData,
};