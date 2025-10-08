const WeightEntry = require('../models/WeightEntry');

// @desc    Get all weight entries for the logged-in user
// @route   GET /api/weight
// @access  Private
const getWeightData = async (req, res) => {
  try {
    const weightData = await WeightEntry.find({ user: req.user.id }).sort({ date: 'asc' });

    res.status(200).json(weightData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching weight data' });
  }
};

module.exports = {
  getWeightData,
};