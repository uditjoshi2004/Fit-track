console.log(`SERVER CHECK - Last updated at: ${new Date().toLocaleTimeString()}`);
const express = require('express');
require('dotenv').config();
const { generateDailyBriefing } = require('./services/aiAnalystService');
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
const User = require('./models/UserModel');

// Connect to Database
connectDB();

const app = express();
const PORT = 3000;

// Use the cors middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes); // <-- Use the user routes
app.use('/api/activities', activityRoutes); // Use the activity routes
app.use('/api/google-fit', googleFitRoutes); // Using the google fit routes
app.use('/api/weight', weightRoutes); // Using the weight routes
app.use('/api/upload', uploadRoutes); // Using the upload routes
app.use('/api/achievements', achievementRoutes); // Using the achievement routes
app.use('/api/hydration', hydrationRoutes); // Using the hydration routes

// --- TEMPORARY TEST FUNCTION FOR GEN AI ---
async function runAITest() {
    console.log("\n--- RUNNING AI BRIEFING TEST ---");
    try {
        // IMPORTANT: Replace with your actual user email to test
        const testUser = await User.findOne({ email: 'uditmjoshi2004@gmail.com' });

        if (testUser) {
            console.log("Found test user, generating briefing...");
            const briefing = await generateDailyBriefing(testUser);
            console.log("--- AI TEST RESULT ---");
            console.log(briefing);
        } else {
            console.log("--- AI TEST FAILED: Could not find the specified test user. ---");
        }
    } catch (error) {
        console.error("--- AI TEST CRASHED ---");
        console.error(error);
    }
}
// --------------------------------

// Modified app.listen to run the test on startup
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    runAITest();
});

// Schedule the job to run every day at 3:00 AM
cron.schedule('0 3 * * *', () => {
    console.log('Running the daily data sync task...'); // Corrected the log message
    syncAllUsersData();
}, {
    timezone: "Asia/Kolkata"
});