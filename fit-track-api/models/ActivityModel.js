const mongoose = require('mongoose');

// This is the blueprint for our daily activity data
const activitySchema = new mongoose.Schema({
  // Add this user field
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a reference to our User model
  },
  date: {
    type: Date,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  activeMinutes: {
    type: Number,
    required: true,
  },
  sleepHours: {
    type: Number,
    default: 0 // Add this default
  },
  workoutHours: {
    type: Number,
    default: 0 // Add this default
  },
});

// The model is the tool we use to interact with the 'activities' collection in the database
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;