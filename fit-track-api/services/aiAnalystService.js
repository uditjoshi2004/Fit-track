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

/**
 * Generates an AI-powered report summary for a specific date range
 */
async function generateReportSummary(user, activities, hydrationData, weightData, dateRange) {
  try {
    // Calculate comprehensive metrics
    const totalSteps = activities.reduce((sum, act) => sum + (act.steps || 0), 0);
    const avgSteps = activities.length > 0 ? totalSteps / activities.length : 0;
    const totalActiveMinutes = activities.reduce((sum, act) => sum + (act.activeMinutes || 0), 0);
    const avgActiveMinutes = activities.length > 0 ? totalActiveMinutes / activities.length : 0;
    const totalSleep = activities.reduce((sum, act) => sum + (act.sleepHours || 0), 0);
    const avgSleep = activities.length > 0 ? totalSleep / activities.length : 0;
    const totalHydration = hydrationData.reduce((sum, entry) => sum + (entry.volumeInMl || 0), 0);
    const avgHydration = hydrationData.length > 0 ? totalHydration / hydrationData.length : 0;
    
    // Calculate weight change
    const sortedWeights = weightData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const weightChange = sortedWeights.length > 1 ? 
      sortedWeights[sortedWeights.length - 1].weightInKg - sortedWeights[0].weightInKg : 0;

    // Count workouts (days with active minutes > 30)
    const workoutDays = activities.filter(act => (act.activeMinutes || 0) > 30).length;

    const contextData = {
      userName: user.name,
      dateRange: dateRange,
      metrics: {
        totalSteps: Math.round(totalSteps),
        avgSteps: Math.round(avgSteps),
        totalActiveMinutes: Math.round(totalActiveMinutes),
        avgActiveMinutes: Math.round(avgActiveMinutes),
        avgSleep: avgSleep.toFixed(1),
        avgHydration: Math.round(avgHydration),
        workoutDays: workoutDays,
        weightChange: weightChange.toFixed(1)
      },
      goals: user.goals || { steps: 10000, caloriesBurned: 500, activeMinutes: 60, sleepHours: 7.5 },
      daysAnalyzed: activities.length
    };

    const prompt = `You are Fit-Track, an expert AI fitness coach. Analyze this user's fitness data and provide a personalized 3-bullet report summary.

User: ${contextData.userName}
Period: ${contextData.dateRange}
Days Analyzed: ${contextData.daysAnalyzed}

FITNESS METRICS:
- Total Steps: ${contextData.metrics.totalSteps} (Average: ${contextData.metrics.avgSteps}/day)
- Total Active Minutes: ${contextData.metrics.totalActiveMinutes} (Average: ${contextData.metrics.avgActiveMinutes}/day)
- Average Sleep: ${contextData.metrics.avgSleep} hours/day
- Average Hydration: ${contextData.metrics.avgHydration}ml/day
- Workout Days: ${contextData.metrics.workoutDays}
- Weight Change: ${contextData.metrics.weightChange > 0 ? '+' : ''}${contextData.metrics.weightChange}kg

GOALS:
- Steps: ${contextData.goals.steps}/day
- Active Minutes: ${contextData.goals.activeMinutes}/day
- Sleep: ${contextData.goals.sleepHours} hours/day

Provide a 3-bullet summary with:
1. **Win** - Highlight one thing they did really well
2. **Trend** - Identify one interesting pattern you noticed
3. **Focus** - Give one specific, actionable tip for next week

Be encouraging, specific, and data-driven. Keep each bullet to 1-2 sentences.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return text;

  } catch (error) {
    console.error("====== ERROR GENERATING REPORT SUMMARY ======");
    console.error("Error:", error.message);
    return `AI Analysis Error: ${error.message || 'Unable to generate report summary at this time.'}`;
  }
}

/**
 * Generates correlation insights between different fitness metrics
 */
async function generateCorrelationInsights(user, activities, hydrationData, weightData) {
  try {
    // Calculate correlations
    const workoutDays = activities.filter(act => (act.activeMinutes || 0) > 30);
    const nonWorkoutDays = activities.filter(act => (act.activeMinutes || 0) <= 30);
    
    const workoutDaySleep = workoutDays.reduce((sum, act) => sum + (act.sleepHours || 0), 0) / (workoutDays.length || 1);
    const nonWorkoutDaySleep = nonWorkoutDays.reduce((sum, act) => sum + (act.sleepHours || 0), 0) / (nonWorkoutDays.length || 1);
    
    const workoutDaySteps = workoutDays.reduce((sum, act) => sum + (act.steps || 0), 0) / (workoutDays.length || 1);
    const nonWorkoutDaySteps = nonWorkoutDays.reduce((sum, act) => sum + (act.steps || 0), 0) / (nonWorkoutDays.length || 1);

    // Hydration correlation with activity
    const highHydrationDays = activities.filter(act => {
      const dayHydration = hydrationData.find(h => 
        new Date(h.date).toDateString() === new Date(act.date).toDateString()
      );
      return dayHydration && dayHydration.volumeInMl > 2000; // 2L threshold
    });
    
    const highHydrationSteps = highHydrationDays.reduce((sum, act) => sum + (act.steps || 0), 0) / (highHydrationDays.length || 1);
    const lowHydrationSteps = activities.filter(act => {
      const dayHydration = hydrationData.find(h => 
        new Date(h.date).toDateString() === new Date(act.date).toDateString()
      );
      return !dayHydration || dayHydration.volumeInMl <= 2000;
    }).reduce((sum, act) => sum + (act.steps || 0), 0) / (activities.length - highHydrationDays.length || 1);

    const contextData = {
      userName: user.name,
      correlations: {
        workoutSleep: {
          workoutDays: workoutDaySleep.toFixed(1),
          nonWorkoutDays: nonWorkoutDaySleep.toFixed(1),
          difference: (workoutDaySleep - nonWorkoutDaySleep).toFixed(1)
        },
        hydrationActivity: {
          highHydrationSteps: Math.round(highHydrationSteps),
          lowHydrationSteps: Math.round(lowHydrationSteps),
          difference: Math.round(highHydrationSteps - lowHydrationSteps)
        },
        workoutSteps: {
          workoutDays: Math.round(workoutDaySteps),
          nonWorkoutDays: Math.round(nonWorkoutDaySteps),
          difference: Math.round(workoutDaySteps - nonWorkoutDaySteps)
        }
      }
    };

    const prompt = `You are Fit-Track, an expert AI fitness coach. Analyze these correlation patterns and provide 2-3 key insights about how this user's habits connect.

User: ${contextData.userName}

CORRELATION DATA:
1. SLEEP vs WORKOUTS:
   - Sleep on workout days: ${contextData.correlations.workoutSleep.workoutDays} hours
   - Sleep on non-workout days: ${contextData.correlations.workoutSleep.nonWorkoutDays} hours
   - Difference: ${contextData.correlations.workoutSleep.difference} hours

2. HYDRATION vs ACTIVITY:
   - Steps on high-hydration days: ${contextData.correlations.hydrationActivity.highHydrationSteps}
   - Steps on low-hydration days: ${contextData.correlations.hydrationActivity.lowHydrationSteps}
   - Difference: ${contextData.correlations.hydrationActivity.difference} steps

3. WORKOUTS vs STEPS:
   - Steps on workout days: ${contextData.correlations.workoutSteps.workoutDays}
   - Steps on non-workout days: ${contextData.correlations.workoutSteps.nonWorkoutDays}
   - Difference: ${contextData.correlations.workoutSteps.difference} steps

Provide 2-3 specific insights about how their habits connect. Be encouraging and actionable. Keep each insight to 1-2 sentences.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return text;

  } catch (error) {
    console.error("====== ERROR GENERATING CORRELATION INSIGHTS ======");
    console.error("Error:", error.message);
    return `Correlation Analysis Error: ${error.message || 'Unable to generate insights at this time.'}`;
  }
}

module.exports = { generateDailyBriefing, getFollowUpAnswer, generateReportSummary, generateCorrelationInsights };