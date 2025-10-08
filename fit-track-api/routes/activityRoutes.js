const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const { startOfDay, endOfDay, subDays } = require('date-fns');
const { toDate } = require('date-fns-tz');

// Define the user's timezone
const userTimezone = 'Asia/Kolkata';

// Create a new OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:4200/app/google-fit-callback'
);

// This route now accepts startDate and endDate queries
router.get('/', protect, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Build a query object
        const query = {
            user: req.user._id,
        };

        // If dates are provided, add them to the query
        if (startDate && endDate) {
            query.date = {
                $gte: startOfDay(new Date(startDate)),
                $lte: endOfDay(new Date(endDate)),
            };
        }

        const activities = await Activity.find(query).sort({ date: 'asc' });
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/google-fit/connect
// @desc    Receive auth code, get tokens, and sync historical data
// @access  Private
router.post('/connect', protect, async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: 'Authorization code is required' });
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        if (tokens.refresh_token) {
            const user = await User.findById(req.user._id);
            user.googleFitRefreshToken = tokens.refresh_token;
            await user.save();
        }

        const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

        // 3. Use timezone-aware date calculations
        const endTime = endOfDay(new Date());
        const startTime = startOfDay(subDays(endTime, 29));

        const response = await fitness.users.dataset.aggregate({
            userId: 'me',
            requestBody: {
                aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
                bucketByTime: { durationMillis: 86400000 },
                startTimeMillis: startTime.getTime(),
                endTimeMillis: endTime.getTime(),
            },
        });

        const stepsData = response.data.bucket;
        if (stepsData && stepsData.length > 0) {
            for (const day of stepsData) {
                const value = day.dataset[0].point[0]?.value[0]?.intVal || 0;
                // 4. Convert the date from Google (UTC) to the user's local timezone
                const date = toDate(parseInt(day.startTimeMillis), { timeZone: userTimezone });

                await Activity.updateOne(
                    { user: req.user._id, date: startOfDay(date) },
                    {
                        $set: {
                            user: req.user._id,
                            date: startOfDay(date),
                            steps: value,
                            caloriesBurned: Math.round(value / 20),
                            activeMinutes: Math.round(value / 100),
                        }
                    },
                    { upsert: true }
                );
            }
        }

        res.json({ message: 'Successfully connected to Google Fit and synced data!' });

    } catch (error) {
        console.error('Error during Google Fit connection:', error.message);
        res.status(500).json({ message: 'Failed to connect to Google Fit' });
    }
});

// @route   GET /api/google-fit/today
// @desc    Get the current day's live data from Google Fit
// @access  Private
router.get('/today', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user || !user.googleFitRefreshToken) {
            return res.status(400).json({ message: 'Google Fit not connected for this user.' });
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2Client.setCredentials({ refresh_token: user.googleFitRefreshToken });

        const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

        // 5. Use timezone-aware date calculations for "Today"
        const now = new Date();
        const startTime = startOfDay(now);
        const endTime = now;

        const response = await fitness.users.dataset.aggregate({
            userId: 'me',
            requestBody: {
                aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
                startTimeMillis: startTime.getTime(),
                endTimeMillis: endTime.getTime(),
            },
        });

        const steps = response.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;

        res.json({
            date: new Date().toISOString(),
            steps: steps,
            caloriesBurned: Math.round(steps / 20),
            activeMinutes: Math.round(steps / 100),
        });

    } catch (error) {
        console.error('Error fetching today\'s data from Google Fit:', error.message);
        res.status(500).json({ message: 'Failed to fetch today\'s data' });
    }
});

module.exports = router;