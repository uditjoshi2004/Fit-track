const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const ACHIEVEMENTS = require('../config/achievements');
const { startOfDay, subDays } = require('date-fns');

/**
 * Checks for and awards new persistent streak achievements for a user.
 * @param {string} userId - The ID of the user to check.
 * @returns {Promise<Array>} A promise that resolves to an array of newly earned achievement objects.
 */
const checkAndAwardStreakAchievements = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return [];

    const newAchievements = [];
    // Get only the persistent streak achievements from our config file
    const streakAchievements = ACHIEVEMENTS.filter(a => a.type === 'persistent' && a.condition.days);
    const userEarnedIds = user.achievements.map(a => a.badgeId);

    // Fetch up to 8 recent days of activity to check for streaks up to 7 days
    const today = startOfDay(new Date());
    const queryStartDate = subDays(today, 8); 
    const recentActivities = await Activity.find({
      user: userId,
      date: { $gte: queryStartDate, $lt: today }
    }).sort({ date: -1 });

    // Create a Map for fast lookups of activity by date
    const activityMap = new Map();
    recentActivities.forEach(act => {
      activityMap.set(act.date.toISOString().split('T')[0], act);
    });
    
    // Loop through each possible streak achievement
    for (const achievement of streakAchievements) {
      if (userEarnedIds.includes(achievement.id)) {
        continue; // User already has this badge, so skip it
      }

      let streakIntact = true;
      // Loop backwards from yesterday for the required number of days
      for (let i = 1; i <= achievement.condition.days; i++) {
        const checkDate = subDays(today, i);
        const dateString = checkDate.toISOString().split('T')[0];
        const dayActivity = activityMap.get(dateString);
        
        // Check if the goal was met for that specific day
        const goalMet = dayActivity && dayActivity[achievement.metric] >= user.goals[achievement.condition.goal];

        if (!goalMet) {
          streakIntact = false;
          break; // Streak is broken for this achievement, move to the next one
        }
      }

      if (streakIntact) {
        // If the loop completed without breaking, the streak was met!
        const newBadge = {
          badgeId: achievement.id,
          name: achievement.name,
          description: achievement.description,
          dateEarned: new Date()
        };
        newAchievements.push(newBadge);
        user.achievements.push(newBadge);
      }
    }

    // If any new badges were earned, save them to the user's profile
    if (newAchievements.length > 0) {
      await user.save();
    }

    return newAchievements;

  } catch (error) {
    console.error('Error checking for streak achievements:', error);
    return [];
  }
};

module.exports = { checkAndAwardStreakAchievements };