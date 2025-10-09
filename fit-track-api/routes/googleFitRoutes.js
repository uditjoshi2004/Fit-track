const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const WeightEntry = require('../models/WeightEntry');
const { startOfDay, endOfDay, subDays } = require('date-fns');
const { toDate, format } = require('date-fns-tz');
const { checkAndAwardAchievements } = require('../services/achievementService');
const userTimezone = 'Asia/Kolkata';
const { syncUserFitData, syncWeightData, syncHydrationData } = require('../utils/dataSync');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:4200/app/google-fit-callback'
);

// Helper for aggregated data (steps, calories, etc.)
const getAggregatedData = async (fitness, { startTime, endTime, dataTypeName }) => {
  const response = await fitness.users.dataset.aggregate({
    userId: 'me',
    requestBody: {
      aggregateBy: [{ dataTypeName }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: startTime.getTime(),
      endTimeMillis: endTime.getTime(),
    },
  });
  return response.data.bucket;
};

// Helper to get ALL sessions (sleep, workouts, etc.)
const getAllSessions = async (fitness, { startTime, endTime }) => {
  const response = await fitness.users.sessions.list({
    userId: 'me',
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
  });
  return response.data.session;
};

// @route   POST /api/google-fit/connect
router.post('/connect', protect, async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.body.code);
    oauth2Client.setCredentials(tokens);
    if (tokens.refresh_token) {
      const user = await User.findById(req.user._id);
      user.googleFitRefreshToken = tokens.refresh_token;
      await user.save();
    }
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    const endTime = endOfDay(new Date());
    const startTime = startOfDay(subDays(endTime, 29));

    // Fetch all data streams in parallel
    const [stepsData, caloriesData, minutesData, allSessions] = await Promise.all([
      getAggregatedData(fitness, { startTime, endTime, dataTypeName: 'com.google.step_count.delta' }),
      getAggregatedData(fitness, { startTime, endTime, dataTypeName: 'com.google.calories.expended' }),
      getAggregatedData(fitness, { startTime, endTime, dataTypeName: 'com.google.active_minutes' }),
      getAllSessions(fitness, { startTime, endTime })
    ]);

    const combinedData = new Map();

    // Helper function to process and merge aggregated data
    const processAggregated = (data, fieldName) => {
      if (data) {
        for (const day of data) {
          const value = day.dataset[0].point[0]?.value[0]?.fpVal || day.dataset[0].point[0]?.value[0]?.intVal || 0;
          const date = toDate(parseInt(day.startTimeMillis), { timeZone: userTimezone });
          const dateString = format(date, 'yyyy-MM-dd');

          if (!combinedData.has(dateString)) {
            combinedData.set(dateString, { date: startOfDay(date), user: req.user._id });
          }
          combinedData.get(dateString)[fieldName] = Math.round(value);
        }
      }
    };

    processAggregated(stepsData, 'steps');
    processAggregated(caloriesData, 'caloriesBurned');
    processAggregated(minutesData, 'activeMinutes');

    // Process all sessions to find sleep and workouts
    if (allSessions) {
      for (const session of allSessions) {
        const sessionStart = parseInt(session.startTimeMillis);
        const sessionEnd = parseInt(session.endTimeMillis);
        const durationHours = (sessionEnd - sessionStart) / (1000 * 60 * 60);
        const date = toDate(sessionStart, { timeZone: userTimezone });
        const dateString = format(date, 'yyyy-MM-dd');

        if (!combinedData.has(dateString)) {
          combinedData.set(dateString, { date: startOfDay(date), user: req.user._id });
        }

        if (session.activityType === 72) { // Sleep
          const existingSleep = combinedData.get(dateString).sleepHours || 0;
          combinedData.get(dateString).sleepHours = existingSleep + durationHours;
        } else { // Workouts
          const existingWorkout = combinedData.get(dateString).workoutHours || 0;
          combinedData.get(dateString).workoutHours = existingWorkout + durationHours;
        }
      }
    }

    // Save the fully combined data to the database
    for (const data of combinedData.values()) {
      await Activity.updateOne(
        { user: req.user._id, date: data.date },
        { $set: data },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }

    // At the end of the 'try' block, before res.json(...)
    for (const data of combinedData.values()) {
      await Activity.updateOne(
        { user: req.user._id, date: data.date },
        { $set: data },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }

    const newBadges = await checkAndAwardAchievements(req.user._id);
    await syncWeightData(req.user._id, oauth2Client);
    await syncHydrationData(req.user._id, oauth2Client);

    res.json({
      message: 'Successfully connected and synced data!',
      newlyEarnedAchievements: newBadges // Sending new badges to the frontend
    });
  } catch (error) {
    console.error('Error during Google Fit connection:', error.message);
    res.status(500).json({ message: 'Failed to connect to Google Fit' });
  }
});

// @route   GET /api/google-fit/today
router.get('/today', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.googleFitRefreshToken) {
      return res.status(400).json({ message: 'Google Fit not connected for this user.' });
    }

    oauth2Client.setCredentials({ refresh_token: user.googleFitRefreshToken });
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    const now = new Date();
    const startTime = startOfDay(now);

    const [stepsRes, caloriesRes, minutesRes] = await Promise.all([
      fitness.users.dataset.aggregate({ userId: 'me', requestBody: { aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }], startTimeMillis: startTime.getTime(), endTimeMillis: now.getTime() } }),
      fitness.users.dataset.aggregate({ userId: 'me', requestBody: { aggregateBy: [{ dataTypeName: 'com.google.calories.expended' }], startTimeMillis: startTime.getTime(), endTimeMillis: now.getTime() } }),
      fitness.users.dataset.aggregate({ userId: 'me', requestBody: { aggregateBy: [{ dataTypeName: 'com.google.active_minutes' }], startTimeMillis: startTime.getTime(), endTimeMillis: now.getTime() } }),
    ]);

    const steps = stepsRes.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;
    const caloriesBurned = caloriesRes.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || 0;
    const activeMinutes = minutesRes.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;

    res.json({
      date: new Date().toISOString(),
      steps: Math.round(steps),
      caloriesBurned: Math.round(caloriesBurned),
      activeMinutes: Math.round(activeMinutes),
    });
  } catch (error) {
    console.error("Error fetching today's data from Google Fit:", error.message);
    res.status(500).json({ message: "Failed to fetch today's data" });
  }
});

// @route   POST /api/google-fit/disconnect
router.post('/disconnect', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.googleFitRefreshToken = undefined;
      await user.save();
      await Activity.deleteMany({ user: req.user._id });
      await WeightEntry.deleteMany({ user: req.user._id });
      res.json({ message: 'Successfully disconnected from Google Fit.' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error disconnecting from Google Fit:', error.message);
    res.status(500).json({ message: 'Failed to disconnect from Google Fit' });
  }
});

// @route   GET /api/google-fit/intraday
// @desc    Get intraday (hourly) data for a specific metric
// @access  Private
router.get('/intraday', protect, async (req, res) => {
  const { date, type } = req.query;

  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.googleFitRefreshToken) {
      return res.status(400).json({ message: 'Google Fit not connected.' });
    }

    oauth2Client.setCredentials({ refresh_token: user.googleFitRefreshToken });
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    let dataTypeName;
    switch (type) {
      case 'steps':
        dataTypeName = 'com.google.step_count.delta';
        break;
      case 'calories':
        dataTypeName = 'com.google.calories.expended';
        break;
      case 'activeMinutes':
        dataTypeName = 'com.google.active_minutes';
        break;
      default:
        return res.status(400).json({ message: 'Invalid data type requested.' });
    }

    const targetDate = new Date(date);
    const startTime = startOfDay(targetDate, { timeZone: userTimezone });
    const endTime = endOfDay(targetDate, { timeZone: userTimezone });

    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{ dataTypeName }],
        bucketByTime: { durationMillis: 3600000 }, // 1 hour
        startTimeMillis: startTime.getTime(),
        endTimeMillis: endTime.getTime(),
      },
    });

    const hourlyData = response.data.bucket.map(bucket => {
      const value = bucket.dataset[0].point[0]?.value[0]?.fpVal || bucket.dataset[0].point[0]?.value[0]?.intVal || 0;
      return {
        time: new Date(parseInt(bucket.startTimeMillis)).getHours(),
        value: Math.round(value)
      };
    });

    res.json(hourlyData);

  } catch (error) {
    console.error(`Error fetching intraday data for ${type}:`, error.message);
    res.status(500).json({ message: 'Failed to fetch detailed data' });
  }
});

// @desc    Manually trigger a data sync for the logged in user
// @route   POST /api/google-fit/sync
// @access  Private
router.post('/sync', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Run the sync function for this specific user
    await syncUserFitData(user);

    res.status(200).json({ message: 'Data sync completed successfully.' });
  } catch (error) {
    console.error('Manual sync error:', error);
    res.status(500).json({ message: 'Server error during manual sync.' });
  }
});

// @desc    List all available data sources for the user (for debugging)
// @route   GET /api/google-fit/sources
// @access  Private
router.get('/sources', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    oauth2Client.setCredentials({ refresh_token: user.googleFitRefreshToken });
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    const response = await fitness.users.dataSources.list({ userId: 'me' });

    console.log('--- AVAILABLE DATA SOURCES ---');
    console.log(JSON.stringify(response.data.dataSource, null, 2));

    res.json(response.data.dataSource);
  } catch (error) {
    console.error('Error listing data sources:', error);
    res.status(500).json({ message: 'Failed to list data sources' });
  }
});

module.exports = router;