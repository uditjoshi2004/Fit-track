export interface UserAchievement {
    id: string;
    name: string;
    description: string;
    type: 'daily' | 'persistent';
    isEarnedToday: boolean;
    dateEarned: string | null;
  }