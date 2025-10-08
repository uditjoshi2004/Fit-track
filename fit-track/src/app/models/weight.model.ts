// in src/app/models/weight.model.ts

export interface WeightEntry {
    _id: string;
    user: string;
    weightInKg: number;
    date: string; // Dates are transmitted as strings in JSON
    createdAt: string;
    updatedAt: string;
}