const ACHIEVEMENTS = [
  // --- Daily Achievements ---
  {
    id: 'daily_stepper_10k',
    name: 'Daily Stepper',
    description: 'Walk 10,000 steps in a single day.',
    type: 'daily',
    metric: 'steps',
    condition: { value: 10000 },
  },
  {
    id: 'super_walker_15k',
    name: 'Super Walker',
    description: 'Walk 15,000 steps in a single day.',
    type: 'daily',
    metric: 'steps',
    condition: { value: 15000 },
  },

  // --- Persistent Achievements (Streaks) ---
  {
    id: 'streak_3_day',
    name: 'On a Roll',
    description: 'Meet your step goal 3 days in a row.',
    type: 'persistent',
    metric: 'steps',
    condition: { goal: 'steps', days: 3 },
  },
  {
    id: 'streak_7_day',
    name: 'Week of Dedication',
    description: 'Meet your step goal 7 days in a row.',
    type: 'persistent',
    metric: 'steps',
    condition: { goal: 'steps', days: 7 },
  },
];

module.exports = ACHIEVEMENTS;