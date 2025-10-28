const util = require('util');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const { startOfDay, endOfDay, subDays, format } = require('date-fns');

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

/**
 * Generates a personalized answer to a follow-up question based on user's fitness data.
 */
async function getFollowUpAnswer(user, question) {
  try {
    // Gather more comprehensive data for follow-up questions (last 14 days)
    const fourteenDaysAgo = startOfDay(subDays(new Date(), 14));
    const today = endOfDay(new Date());

    const [recentActivities, userGoals] = await Promise.all([
      Activity.find({ user: user._id, date: { $gte: fourteenDaysAgo, $lte: today } }).sort({ date: -1 }),
      Promise.resolve(user.goals || { steps: 10000, caloriesBurned: 500, activeMinutes: 60, sleepHours: 7.5 })
    ]);

    if (!recentActivities || recentActivities.length === 0) {
      return "I don't have enough recent activity data to provide a personalized answer. Please make sure you're syncing your fitness data regularly.";
    }

    // Calculate averages and trends
    const totalSteps = recentActivities.reduce((sum, act) => sum + (act.steps || 0), 0);
    const totalCalories = recentActivities.reduce((sum, act) => sum + (act.caloriesBurned || 0), 0);
    const totalActiveMinutes = recentActivities.reduce((sum, act) => sum + (act.activeMinutes || 0), 0);
    const totalSleepHours = recentActivities.reduce((sum, act) => sum + (act.sleepHours || 0), 0);

    const avgSteps = totalSteps / recentActivities.length;
    const avgCalories = totalCalories / recentActivities.length;
    const avgActiveMinutes = totalActiveMinutes / recentActivities.length;
    const avgSleepHours = totalSleepHours / recentActivities.length;

    // Get yesterday's data for comparison
    const yesterday = subDays(new Date(), 1);
    const yesterdayActivity = recentActivities.find(act => 
      format(new Date(act.date), 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')
    );

    const contextData = {
      userName: user.name,
      question: question,
      recentData: {
        daysAnalyzed: recentActivities.length,
        averageSteps: Math.round(avgSteps),
        averageCalories: Math.round(avgCalories),
        averageActiveMinutes: Math.round(avgActiveMinutes),
        averageSleepHours: avgSleepHours.toFixed(1),
        yesterdaySteps: yesterdayActivity?.steps || 0,
        yesterdayCalories: yesterdayActivity?.caloriesBurned || 0,
        yesterdayActiveMinutes: yesterdayActivity?.activeMinutes || 0,
        yesterdaySleepHours: yesterdayActivity?.sleepHours || 0,
      },
      goals: userGoals,
      goalProgress: {
        stepsProgress: Math.round((avgSteps / userGoals.steps) * 100),
        caloriesProgress: Math.round((avgCalories / userGoals.caloriesBurned) * 100),
        activeMinutesProgress: Math.round((avgActiveMinutes / userGoals.activeMinutes) * 100),
        sleepProgress: Math.round((avgSleepHours / userGoals.sleepHours) * 100),
      }
    };

    // Create a focused prompt for answering the specific question
    const prompt = `You are Fit-Track, a knowledgeable and encouraging AI fitness coach. A user has asked you a specific question about their fitness data.

User: ${contextData.userName}
Question: "${contextData.question}"

Here's their recent fitness data (last ${contextData.recentData.daysAnalyzed} days):

AVERAGES:
- Steps: ${contextData.recentData.averageSteps} per day (Goal: ${contextData.goals.steps} - ${contextData.goalProgress.stepsProgress}% of goal)
- Calories Burned: ${contextData.recentData.averageCalories} per day (Goal: ${contextData.goals.caloriesBurned} - ${contextData.goalProgress.caloriesProgress}% of goal)
- Active Minutes: ${contextData.recentData.averageActiveMinutes} per day (Goal: ${contextData.goals.activeMinutes} - ${contextData.goalProgress.activeMinutesProgress}% of goal)
- Sleep: ${contextData.recentData.averageSleepHours} hours per day (Goal: ${contextData.goals.sleepHours} - ${contextData.goalProgress.sleepProgress}% of goal)

YESTERDAY'S DATA:
- Steps: ${contextData.recentData.yesterdaySteps}
- Calories: ${contextData.recentData.yesterdayCalories}
- Active Minutes: ${contextData.recentData.yesterdayActiveMinutes}
- Sleep: ${contextData.recentData.yesterdaySleepHours} hours

Please provide a helpful, specific answer to their question based on this data. Be encouraging, actionable, and personalized. Keep your response concise (2-4 sentences) but informative.`;

    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return text;

  } catch (error) {
    console.error("====== ERROR GENERATING FOLLOW-UP ANSWER ======");
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
    console.error("- Question:", question);
    console.error("==============================================");
    
    return "I'm sorry, I encountered an error while processing your question. Please try again in a moment.";
  }
}

module.exports = { generateDailyBriefing, getFollowUpAnswer };