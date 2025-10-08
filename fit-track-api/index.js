const express = require('express');
const cors = require('cors'); // Imported cors
const connectDB = require('./config/db'); // Imported the connection function
const userRoutes = require('./routes/userRoutes');
const Activity = require('./models/ActivityModel');
const activityRoutes = require('./routes/activityRoutes'); // activity routes
const googleFitRoutes = require('./routes/googleFitRoutes'); // google fit routes
const uploadRoutes = require('./routes/uploadRoutes');
const cron = require('node-cron');
const { syncAllUsersData } = require('./utils/dataSync');
const achievementRoutes = require('./routes/achievementRoutes');
const weightRoutes = require('./routes/weightRoutes');
const hydrationRoutes = require('./routes/hydrationRoutes');

// Connect to Database
connectDB();

const app = express();
const PORT = 3000;

// Use the cors middleware
app.use(cors());
app.use(express.json());
app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes); // <-- Use the user routes
app.use('/api/activities', activityRoutes); // Use the activity routes
app.use('/api/google-fit', googleFitRoutes); // Using the google fit routes
app.use('/api/weight', weightRoutes); // Using the weight routes
app.use('/api/upload', uploadRoutes); // Using the upload routes
app.use('/api/achievements', achievementRoutes); // Using the achievement routes
app.use('/api/hydration', hydrationRoutes); // Using the hydration routes

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Schedule the job to run every day at 3:00 AM
cron.schedule('0 3 * * *', () => {
    console.log('Running the daily data cleanup task...');
    syncAllUsersData();
}, {
    timezone: "Asia/Kolkata"
});