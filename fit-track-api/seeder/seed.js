const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/UserModel'); // 1. Import the User model
const Activity = require('../models/ActivityModel');

const importData = async () => {
  try {
    await connectDB(); // Connect to the database

    // Clear existing users and activities
    await Activity.deleteMany();
    await User.deleteMany();

    // 2. Create a single sample user
    const createdUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    const sampleUserId = createdUser._id;

    // 3. Link the sample data to the created user's ID
    const seedActivities = [
      { user: sampleUserId, date: '2025-09-15', steps: 8260, caloriesBurned: 540, activeMinutes: 30, sleepHours: 8, workoutHours: 1 },
      { user: sampleUserId, date: '2025-09-14', steps: 9345, caloriesBurned: 610, activeMinutes: 45, sleepHours: 7.5, workoutHours: 0 },
      { user: sampleUserId, date: '2025-09-13', steps: 11200, caloriesBurned: 720, activeMinutes: 60, sleepHours: 6, workoutHours: 1.5 },
      { user: sampleUserId, date: '2025-09-12', steps: 7500, caloriesBurned: 480, activeMinutes: 25, sleepHours: 8, workoutHours: 0 },
      { user: sampleUserId, date: '2025-09-11', steps: 12500, caloriesBurned: 810, activeMinutes: 75, sleepHours: 7, workoutHours: 1.2 },
      { user: sampleUserId, date: '2025-09-10', steps: 10500, caloriesBurned: 680, activeMinutes: 55, sleepHours: 6.5, workoutHours: 0.5 },
      { user: sampleUserId, date: '2025-09-09', steps: 14200, caloriesBurned: 900, activeMinutes: 90, sleepHours: 9, workoutHours: 0 },
    ];

    // Insert the user-linked data
    await Activity.insertMany(seedActivities);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();