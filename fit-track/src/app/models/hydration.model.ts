export interface HydrationEntry {
    _id: string;
    user: string;
    volumeInMl: number;
    date: string; // Dates are sent as ISO strings from the backend
    createdAt: string;
    updatedAt: string;
  }