const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const ACHIEVEMENTS = require('../config/achievements');

const checkAndAwardAchievements = async (userId) => {
  const user = await User.findById(userId);
  const activities = await Activity.find({ user: userId }).sort({ date: -1 });

  if (!user || activities.length === 0) return [];

  const newlyEarned = [];
  const userBadgeIds = user.achievements.map(a => a.badgeId);

  // --- RULE CHECKING LOGIC ---

  // Check for single-day step counts
  const maxSteps = Math.max(...activities.map(a => a.steps));
  if (maxSteps >= 10000 && !userBadgeIds.includes(ACHIEVEMENTS.STEPS_10K.id)) {
    newlyEarned.push(ACHIEVEMENTS.STEPS_10K);
  }
  if (maxSteps >= 15000 && !userBadgeIds.includes(ACHIEVEMENTS.STEPS_15K.id)) {
    newlyEarned.push(ACHIEVEMENTS.STEPS_15K);
  }

  // Check for 3-day goal streak
  if (!userBadgeIds.includes(ACHIEVEMENTS.GOAL_STREAK_3.id)) {
    let streak = 0;
    for (let i = 0; i < activities.length && i < 3; i++) {
      if (activities[i].steps >= user.goals.steps) {
        streak++;
      }
    }
    if (streak >= 3) {
      newlyEarned.push(ACHIEVEMENTS.GOAL_STREAK_3);
    }
  }

  // We could add the 7-day streak logic here too...

  // --- AWARDING ACHIEVEMENTS LOGIC ---
  if (newlyEarned.length > 0) {
    newlyEarned.forEach(badge => {
      user.achievements.push({
        badgeId: badge.id,
        name: badge.name,
        description: badge.description,
        dateEarned: new Date(),
      });
    });
    await user.save();
  }

  return newlyEarned;
};

module.exports = { checkAndAwardAchievements };