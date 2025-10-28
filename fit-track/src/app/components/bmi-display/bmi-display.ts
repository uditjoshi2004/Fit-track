import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BmiData {
  height: number;
  latestWeight: number;
  bmi: number;
  category: string;
}

@Component({
  selector: 'app-bmi-display',
  imports: [CommonModule],
  templateUrl: './bmi-display.html',
  styleUrl: './bmi-display.css'
})
export class BmiDisplay {
  @Input() bmiData: BmiData | null = null;

  getCategoryClass(): string {
    if (!this.bmiData) return '';

    switch (this.bmiData.category) {
      case 'Underweight':
        return 'text-blue-600 dark:text-blue-400';
      case 'Normal':
        return 'text-green-600 dark:text-green-400';
      case 'Overweight':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Obese':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }
}
