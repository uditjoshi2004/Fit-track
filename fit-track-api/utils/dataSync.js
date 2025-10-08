const { google } = require('googleapis');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const { startOfDay, endOfDay, subDays } = require('date-fns');
const { toDate, format } = require('date-fns-tz');
const WeightEntry = require('../models/WeightEntry');
const userTimezone = 'Asia/Kolkata';
const HydrationEntry = require('../models/HydrationEntry');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

// A helper to get the start of a given day
const getStartOfDay = (date) => {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  return start;
};

const syncWeightData = async (userId, authClient) => {
  try {
    const fitness = google.fitness({ version: 'v1', auth: authClient });

    const now = new Date();
    const startTime = new Date();
    startTime.setFullYear(now.getFullYear() - 1);

    const startTimeNanos = startTime.getTime() * 1000000;
    const endTimeNanos = now.getTime() * 1000000;

    const response = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight',
      datasetId: `${startTimeNanos}-${endTimeNanos}`,
    });
    const weightPoints = response.data.point;
    if (!weightPoints || weightPoints.length === 0) {
      console.log(`Weight sync ran, but Google Fit returned no data points.`);
      return;
    }

    const operations = weightPoints.map(point => {
      const entryDate = getStartOfDay(new Date(parseInt(point.startTimeNanos / 1000000)));
      return {
        updateOne: {
          filter: { user: userId, date: entryDate },
          update: {
            $set: {
              user: userId,
              date: entryDate,
              weightInKg: point.value[0].fpVal.toFixed(2)
            }
          },
          upsert: true
        }
      };
    });

    const result = await WeightEntry.bulkWrite(operations);
    console.log(`Synced ${result.upsertedCount + result.modifiedCount} weight entries for user ${userId}.`);

  } catch (error) {
    console.error('Error syncing Google Fit weight data:', error.message);
  }
};

const syncUserFitData = async (user) => {
  // Guard clause to prevent crash if token is missing
  if (!user.googleFitRefreshToken) {
    console.log(`Skipping sync for ${user.email}: No refresh token found.`);
    return;
  }

  try {
    console.log(`Syncing data for user: ${user.email}`);
    oauth2Client.setCredentials({ refresh_token: user.googleFitRefreshToken });

    // ------ SYNC ACTIVITY DATA ------
    const yesterday = subDays(new Date(), 1);
    const startTime = startOfDay(yesterday);
    const endTime = endOfDay(yesterday);

    const [stepsRes, caloriesRes, minutesRes] = await Promise.all([
      google.fitness({ version: 'v1', auth: oauth2Client }).users.dataset.aggregate({ userId: 'me', requestBody: { aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }], startTimeMillis: startTime.getTime(), endTimeMillis: endTime.getTime() } }),
      google.fitness({ version: 'v1', auth: oauth2Client }).users.dataset.aggregate({ userId: 'me', requestBody: { aggregateBy: [{ dataTypeName: 'com.google.calories.expended' }], startTimeMillis: startTime.getTime(), endTimeMillis: endTime.getTime() } }),
      google.fitness({ version: 'v1', auth: oauth2Client }).users.dataset.aggregate({ userId: 'me', requestBody: { aggregateBy: [{ dataTypeName: 'com.google.active_minutes' }], startTimeMillis: startTime.getTime(), endTimeMillis: endTime.getTime() } }),
    ]);

    const steps = stepsRes.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;
    const caloriesBurned = caloriesRes.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || 0;
    const activeMinutes = minutesRes.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;

    await Activity.updateOne(
      { user: user._id, date: startOfDay(yesterday) },
      { $set: { user: user._id, date: startOfDay(yesterday), steps, caloriesBurned, activeMinutes } },
      { upsert: true }
    );

    // ------ SYNC OTHER DATA TYPES ------
    await syncWeightData(user._id, oauth2Client);
    await syncHydrationData(user._id, oauth2Client); // <-- This is the new line

    console.log(`✅ Successfully synced all data for ${user.email}`);
  } catch (error) {
    console.error(`❌ Failed to sync data for ${user.email}:`, error.message);
  }
};

const syncAllUsersData = async () => {
  console.log('--- Running Daily Data Sync Job ---');
  const usersToSync = await User.find({ googleFitRefreshToken: { $ne: null } });

  for (const user of usersToSync) {
    await syncUserFitData(user);
  }
  console.log('--- Daily Data Sync Job Finished ---');
};

const syncHydrationData = async (userId, authClient) => {
  try {
    const fitness = google.fitness({ version: 'v1', auth: authClient });

    // Fetch data for the last year
    const now = new Date();
    const startTime = new Date();
    startTime.setFullYear(now.getFullYear() - 1);

    const startTimeNanos = startTime.getTime() * 1000000;
    const endTimeNanos = now.getTime() * 1000000;

    const response = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'raw:com.google.hydration:com.google.android.apps.fitness:user_input',
      datasetId: `${startTimeNanos}-${endTimeNanos}`,
    });

    const dataPoints = response.data.point;
    if (!dataPoints || dataPoints.length === 0) {
      console.log(`No hydration data found for user ${userId}.`);
      return;
    }

    const operations = dataPoints.map(point => {
      const entryDate = getStartOfDay(new Date(parseInt(point.startTimeNanos / 1000000)));
      // Google Fit provides hydration in liters, we'll store it in milliliters.
      const volumeInMl = point.value[0].fpVal * 1000;

      return {
        updateOne: {
          filter: { user: userId, date: entryDate },
          update: {
            $set: {
              user: userId,
              date: entryDate,
              volumeInMl: Math.round(volumeInMl)
            }
          },
          upsert: true
        }
      };
    });

    const result = await HydrationEntry.bulkWrite(operations);
    console.log(`Synced ${result.upsertedCount + result.modifiedCount} hydration entries for user ${userId}.`);

  } catch (error) {
    console.error('Error syncing Google Fit hydration data:', error.message);
  }
};

module.exports = { syncAllUsersData, syncUserFitData, syncWeightData, syncHydrationData };