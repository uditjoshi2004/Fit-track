import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GoogleFitService } from '../../services/google-fit.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-bmi',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './bmi.html',
  styleUrl: './bmi.css'
})
export class Bmi {
  private authService = inject(AuthService);
  private googleFitService = inject(GoogleFitService);

  // Track Google Fit connection status
  public isConnected = signal<boolean>(false);

  // Manual Calculator State
  public manualHeight = signal<number | null>(null);
  public manualHeightFeet = signal<number | null>(null);
  public manualHeightInches = signal<number | null>(null);
  public manualWeight = signal<number | null>(null);
  public manualAge = signal<number | null>(null);
  public manualGender = signal<'male' | 'female'>('male');
  public manualBmi = signal<number | null>(null);
  public manualCategory = signal<string>('');
  public showManualResult = signal<boolean>(false);
  public useMetric = signal<boolean>(true); // true = metric (kg/cm), false = US units (lb/ft+in)

  // Additional metrics
  public bmiPrime = signal<number | null>(null);
  public ponderalIndex = signal<number | null>(null);
  public healthyWeightMin = signal<number | null>(null);
  public healthyWeightMax = signal<number | null>(null);

  constructor() {
    // Monitor Google Fit connection status from AuthService
    effect(() => {
      const connectionStatus = this.authService.currentUser()?.isGoogleFitConnected;
      this.isConnected.set(connectionStatus === true);
    });

    // Subscribe to Google Fit service connection events
    this.googleFitService.isConnected$.subscribe(isConnected => {
      this.isConnected.set(isConnected);
    });

    // Subscribe to disconnect events
    this.googleFitService.disconnected$.subscribe(() => {
      this.isConnected.set(false);
    });
  }

  ngOnInit(): void {
    // Check initial connection status
    const user = this.authService.currentUser();
    this.isConnected.set(user?.isGoogleFitConnected === true);
  }

  getBmiCategoryInfo(category: string): { color: string; description: string; icon: string } {
    switch (category) {
      case 'Underweight':
        return {
          color: 'blue',
          description: 'Below normal weight range. Consider consulting a healthcare provider.',
          icon: 'arrow-down'
        };
      case 'Normal':
        return {
          color: 'green',
          description: 'Healthy weight range. Keep up the good work!',
          icon: 'check-circle'
        };
      case 'Overweight':
        return {
          color: 'yellow',
          description: 'Above normal weight range. Consider healthy lifestyle changes.',
          icon: 'alert-triangle'
        };
      case 'Obese':
        return {
          color: 'red',
          description: 'Significantly above normal range. Consult a healthcare provider.',
          icon: 'alert-circle'
        };
      default:
        return {
          color: 'gray',
          description: 'Add weight and height data to calculate your BMI.',
          icon: 'info'
        };
    }
  }

  getBmiRanges() {
    return [
      { category: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
      { category: 'Normal', range: '18.5 - 24.9', color: 'bg-green-500' },
      { category: 'Overweight', range: '25.0 - 29.9', color: 'bg-yellow-500' },
      { category: 'Obese', range: '≥ 30.0', color: 'bg-red-500' }
    ];
  }

  // Manual BMI Calculator Methods
  calculateManualBmi(): void {
    const weight = this.manualWeight();

    if (!weight || weight <= 0) {
      this.showManualResult.set(false);
      return;
    }

    let bmi: number;
    let heightInMeters: number;
    let weightInKg: number;
    let heightInInches: number;

    if (this.useMetric()) {
      // Metric: weight in kg, height in cm
      const height = this.manualHeight();
      if (!height || height <= 0) {
        this.showManualResult.set(false);
        return;
      }
      heightInMeters = height / 100;
      weightInKg = weight;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // US Units: weight in lbs, height in feet + inches
      const feet = this.manualHeightFeet();
      const inches = this.manualHeightInches();

      if (!feet || feet <= 0) {
        this.showManualResult.set(false);
        return;
      }

      // Convert feet and inches to total inches
      heightInInches = (feet * 12) + (inches || 0);

      if (heightInInches <= 0) {
        this.showManualResult.set(false);
        return;
      }

      heightInMeters = heightInInches * 0.0254;
      weightInKg = weight * 0.453592;
      bmi = (weight / (heightInInches * heightInInches)) * 703;
    }

    // Determine category
    let category: string;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // Calculate BMI Prime (BMI / 25)
    const prime = bmi / 25;

    // Calculate Ponderal Index
    const ponderal = weightInKg / Math.pow(heightInMeters, 3);

    // Calculate healthy weight range (BMI 18.5 - 25)
    const minHealthyWeight = 18.5 * heightInMeters * heightInMeters;
    const maxHealthyWeight = 25 * heightInMeters * heightInMeters;

    this.manualBmi.set(Math.round(bmi * 10) / 10);
    this.manualCategory.set(category);
    this.bmiPrime.set(Math.round(prime * 100) / 100);
    this.ponderalIndex.set(Math.round(ponderal * 10) / 10);

    // Convert healthy weight to the current unit system
    if (this.useMetric()) {
      this.healthyWeightMin.set(Math.round(minHealthyWeight * 10) / 10);
      this.healthyWeightMax.set(Math.round(maxHealthyWeight * 10) / 10);
    } else {
      this.healthyWeightMin.set(Math.round(minHealthyWeight * 2.20462 * 10) / 10);
      this.healthyWeightMax.set(Math.round(maxHealthyWeight * 2.20462 * 10) / 10);
    }

    this.showManualResult.set(true);
  }

  toggleUnit(): void {
    this.useMetric.set(!this.useMetric());
    // Clear inputs when switching units
    this.manualHeight.set(null);
    this.manualHeightFeet.set(null);
    this.manualHeightInches.set(null);
    this.manualWeight.set(null);
    this.showManualResult.set(false);
  }

  resetCalculator(): void {
    this.manualHeight.set(null);
    this.manualHeightFeet.set(null);
    this.manualHeightInches.set(null);
    this.manualWeight.set(null);
    this.manualAge.set(null);
    this.manualGender.set('male');
    this.manualBmi.set(null);
    this.manualCategory.set('');
    this.bmiPrime.set(null);
    this.ponderalIndex.set(null);
    this.healthyWeightMin.set(null);
    this.healthyWeightMax.set(null);
    this.showManualResult.set(false);
  }

  // Get BMI gauge rotation (semicircle from -90 to 90 degrees)
  getBmiGaugeRotation(): number {
    const bmi = this.manualBmi();
    if (!bmi) return -90;

    // Map BMI to angle: 15 (underweight) = -90deg, 40 (obese) = 90deg
    const minBmi = 15;
    const maxBmi = 40;
    const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi));

    // Calculate angle from -90 to 90
    const angle = ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 180 - 90;
    return angle;
  }
}
