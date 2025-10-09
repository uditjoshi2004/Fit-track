const util = require('util');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const { startOfDay, endOfDay, subDays } = require('date-fns');

// Initialize the Gemini client once
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Generates a personalized daily briefing for a user.
 */
async function generateDailyBriefing(user) {
  try {
    // Gather Data for Context
    const yesterday = subDays(new Date(), 1);
    const startOfYesterday = startOfDay(yesterday);
    const endOfYesterday = endOfDay(yesterday);
    const sevenDaysAgo = startOfDay(subDays(new Date(), 7));

    const [yesterdaysActivity, last7DaysActivities] = await Promise.all([
      Activity.findOne({ user: user._id, date: { $gte: startOfYesterday, $lte: endOfYesterday } }),
      Activity.find({ user: user._id, date: { $gte: sevenDaysAgo } })
    ]);

    if (!yesterdaysActivity) {
      return `Welcome back, ${user.name}! We don't have any data from yesterday to analyze yet. Get moving today!`;
    }

    // Fix for divide-by-zero error
    const totalSteps = last7DaysActivities.reduce((sum, act) => sum + (act.steps || 0), 0);
    const avgSteps = last7DaysActivities.length > 0 ? totalSteps / last7DaysActivities.length : 0;

    const contextData = {
      userName: user.name,
      yesterday: {
        steps: yesterdaysActivity.steps ?? 0,
        caloriesBurned: yesterdaysActivity.caloriesBurned ?? 0,
        activeMinutes: yesterdaysActivity.activeMinutes ?? 0,
        sleepHours: yesterdaysActivity.sleepHours ?? 0,
      },
      goals: user.goals || { steps: 10000, caloriesBurned: 500, activeMinutes: 60, sleepHours: 7.5 },
      weeklyAverages: {
        steps: avgSteps.toFixed(0),
      }
    };

    // Write the Prompt
    const prompt = `You are Fit-Track, a friendly and encouraging AI fitness coach. Analyze the user's fitness data and provide a personalized daily briefing.

User: ${contextData.userName}

Yesterday's Activity:
- Steps: ${contextData.yesterday.steps} (Goal: ${contextData.goals.steps})
- Calories Burned: ${contextData.yesterday.caloriesBurned} (Goal: ${contextData.goals.caloriesBurned})
- Active Minutes: ${contextData.yesterday.activeMinutes} (Goal: ${contextData.goals.activeMinutes})
- Sleep Hours: ${contextData.yesterday.sleepHours} (Goal: ${contextData.goals.sleepHours})

Weekly Average Steps: ${contextData.weeklyAverages.steps}

Provide a brief, encouraging summary (2-3 sentences) highlighting their progress, any goals met, and one actionable tip for today.`;

    // 3. Call the Gemini API
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return text;

  } catch (error) {
    console.error("====== ERROR GENERATING AI BRIEFING ======");
    console.error("Error Type:", error.constructor.name);
    console.error("Error Message:", error.message);
    console.error("Full Error Details:");
    console.error(util.inspect(error, { showHidden: false, depth: null, colors: true }));
    
    if (error.stack) {
      console.error("Stack Trace:");
      console.error(error.stack);
    }
    
    console.error("Context at time of error:");
    console.error("- User ID:", user._id);
    console.error("- User Name:", user.name);
    console.error("==========================================");
    
    return `AI Briefing Error: ${error.message || 'An unknown error occurred while contacting the AI service.'}`;
  }
}

module.exports = { generateDailyBriefing };