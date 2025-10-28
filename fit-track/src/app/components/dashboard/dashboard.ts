import { Component, inject, effect, ViewChild, AfterViewInit, computed, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GoalProgressCard } from '../goal-progress-card/goal-progress-card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ThemeService } from '../../services/theme.service';
import { FitnessDataService } from '../../services/fitness-data.service';
import { GoogleFitService } from '../../services/google-fit.service';
import { DailyActivity } from '../../models/fitness-data.model';
import { LucideAngularModule } from 'lucide-angular';
import { DateStateService } from '../../services/date-state.service';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isYesterday } from 'date-fns';
import { AuthService } from '../../services/auth.service';
import { DetailModal } from '../detail-modal/detail-modal';
import { BodyClockComponent, SleepData, WorkoutData, HourlyActivityData } from '../body-clock/body-clock.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GoalProgressCard, BaseChartDirective, LucideAngularModule, DetailModal, BodyClockComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // themeService = inject(ThemeService);
  fitnessDataService = inject(FitnessDataService);
  googleFitService = inject(GoogleFitService);
  dateStateService = inject(DateStateService);
  authService = inject(AuthService);

  user = this.authService.currentUser; // Exposes the user signal to the template

  userGoals: any = null;

  public dataState: 'loading' | 'loaded' | 'empty' = 'loading';
  kpiData: Partial<DailyActivity> | null = null;
  private allActivities: DailyActivity[] = [];
  // NEW: Properties for the modal
  isDetailModalOpen = false;
  modalConfig: { date: Date, metric: 'steps' | 'calories' | 'activeMinutes' } = {
    date: new Date(),
    metric: 'steps'
  };

  public lineChartOptions: ChartOptions<'line'> = {};
  public barChartOptions: ChartOptions<'bar'> = {};
  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public dailyBriefing = signal<string | null>(null);
  public isBriefingLoading = signal(true);
  public conversationStep = signal<'briefing' | 'questions' | 'loading_answer' | 'answer'>('briefing');
  public followUpAnswer = signal<string | null>(null);
  public themeService = inject(ThemeService); // <-- ADD THIS LINE

  // Body Clock data
  public sleepData: SleepData | null = null;
  public workoutData: WorkoutData[] = [];
  public hourlyActivityData: HourlyActivityData[] = [];
  public isBodyClockLoading = signal(true);

  displayDateLabel = computed(() => {
    const selected = this.dateStateService.selectedDate();
    if (isToday(selected)) return 'Today';
    if (isYesterday(selected)) return 'Yesterday';
    return format(selected, 'MMMM d, yyyy');
  });

  constructor() {
    this.initializeDashboard();

    // Effect to update UI when the selected date changes
    effect(() => {
      const selectedDate = this.dateStateService.selectedDate();
      if (this.dataState !== 'loading') { // Only update if initial load is complete
        this.updateDashboardForDate(selectedDate);
      }
    });

    // Effect to handle theme changes
    effect(() => {
      this.themeService.themeSignal();
      this.updateChartOptions();
    });
  }


  // NEW: Method to open the modal
  openDetailModal(metric: 'steps' | 'calories' | 'activeMinutes'): void {
    this.modalConfig = {
      date: this.dateStateService.selectedDate(),
      metric: metric
    };
    this.isDetailModalOpen = true;
  }

  initializeDashboard(): void {
    this.dataState = 'loading';
    this.isBriefingLoading.set(true); // Start loading the briefing

    // --- ADD THIS NEW CALL FOR THE AI BRIEFING ---
    this.fitnessDataService.getDailyBriefing().subscribe({
      next: (response) => {
        this.dailyBriefing.set(response.briefing);
        this.isBriefingLoading.set(false);
      },
      error: (err) => {
        this.dailyBriefing.set('Could not load your daily briefing at this time.');
        this.isBriefingLoading.set(false);
        console.error('Error fetching briefing:', err);
      }
    });

    // First, fetch the user's goals
    this.authService.getGoals().subscribe({
      next: goals => {
        this.userGoals = goals; // 2. Save the goals
        // After getting goals, fetch the activity history
        // Use a reasonable range for fetching activities, e.g., the past 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);

        this.fitnessDataService.getActivities(startDate, endDate).subscribe({
          next: activities => {
            if (!activities || activities.length === 0) {
              this.dataState = 'empty';
              return;
            }
            this.allActivities = activities;
            this.updateDashboardForDate(this.dateStateService.selectedDate());
            this.fetchBodyClockData();
            this.dataState = 'loaded';
          },
          error: () => this.dataState = 'empty'
        });
      },
      error: () => this.dataState = 'empty'
    });
  }

  updateDashboardForDate(selectedDate: Date): void {
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    const isToday = format(new Date(), 'yyyy-MM-dd') === dateString;

    // Update KPI cards
    if (isToday) {
      // For today, get live data directly from Google Fit
      this.googleFitService.getTodaysData().subscribe(todayData => {
        this.kpiData = todayData;
      });
    } else {
      // For past days, find the data in our locally stored array
      const dayData = this.allActivities.find(a => format(new Date(a.date), 'yyyy-MM-dd') === dateString);
      this.kpiData = dayData || { steps: 0, caloriesBurned: 0, activeMinutes: 0 };
    }

    // Update charts to show the week containing the selected date
    this.processChartData(selectedDate);

    // Update body clock data for the selected date
    this.fetchBodyClockData();
  }

  processChartData(selectedDate: Date): void {
    // Calculate the start and end of the week for the selected date
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start week on Monday
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekInterval = eachDayOfInterval({ start, end });

    // Find the data for each day of that week from our local array
    const weekData = weekInterval.map(day => {
      const dateString = format(day, 'yyyy-MM-dd');
      return this.allActivities.find(a => format(new Date(a.date), 'yyyy-MM-dd') === dateString)
        || { date: dateString, steps: 0, sleepHours: 0, workoutHours: 0 }; // Default to 0 if no data
    });

    const labels = weekData.map(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }));

    // Update Line Chart data
    this.lineChartData = {
      labels,
      datasets: [{ data: weekData.map(d => d.steps), label: 'Steps', fill: true, tension: 0.4, borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.2)' }]
    };

    // Update Bar Chart data
    this.barChartData = {
      labels,
      datasets: [
        { data: weekData.map(d => d.sleepHours), label: 'Sleep (hours)', backgroundColor: 'rgb(107, 114, 128)' },
        { data: weekData.map(d => d.workoutHours), label: 'Workout (hours)', backgroundColor: 'rgb(34, 197, 94)' }
      ]
    };

    setTimeout(() => this.chart?.update(), 0);
  }

  private updateChartOptions(): void {
    const theme = this.themeService.themeSignal();
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
    const ticksColor = theme === 'dark' ? '#d1d5db' : '#374151';
    const legendColor = theme === 'dark' ? '#e5e7eb' : '#1f2937';

    const options = {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: ticksColor } },
        x: { grid: { color: gridColor }, ticks: { color: ticksColor } }
      },
      plugins: { legend: { labels: { color: legendColor } } }
    };

    this.lineChartOptions = { ...options, plugins: { legend: { display: false } } };
    this.barChartOptions = { ...options, plugins: { legend: { display: true, labels: { color: legendColor } } } };
  }

  ngAfterViewInit(): void { }

  connectGoogleFit(): void {
    this.googleFitService.redirectToGoogleAuth();
  }

  // Add this new helper method
  getKpiValue(metric: 'steps' | 'calories' | 'activeMinutes'): number {
    if (!this.kpiData) {
      return 0;
    }
    switch (metric) {
      case 'steps':
        return this.kpiData.steps || 0;
      case 'calories':
        return this.kpiData.caloriesBurned || 0;
      case 'activeMinutes':
        return this.kpiData.activeMinutes || 0;
      default:
        return 0;
    }
  }

  // Guided Questions methods
  onAskFollowUp(): void {
    this.conversationStep.set('questions');
  }

  askQuestion(question: string): void {
    this.conversationStep.set('loading_answer');
    this.fitnessDataService.askFollowUpQuestion(question).subscribe({
      next: (response) => {
        this.followUpAnswer.set(response.answer);
        this.conversationStep.set('answer');
      },
      error: (err) => {
        this.followUpAnswer.set('Sorry, I encountered an error while processing your question. Please try again.');
        this.conversationStep.set('answer');
        console.error('Error asking follow-up question:', err);
      }
    });
  }

  goBackToQuestions(): void {
    this.conversationStep.set('questions');
  }

  // Body Clock data methods
  private fetchBodyClockData(): void {
    this.isBodyClockLoading.set(true);

    // For now, we'll generate mock data based on the existing activity data
    // In a real implementation, you would fetch this from specific backend endpoints
    this.generateBodyClockDataFromActivities();

    this.isBodyClockLoading.set(false);
  }

  private generateBodyClockDataFromActivities(): void {
    const selectedDate = this.dateStateService.selectedDate();
    const dateString = format(selectedDate, 'yyyy-MM-dd');

    // Find activity data for the selected date
    const dayData = this.allActivities.find(a => format(new Date(a.date), 'yyyy-MM-dd') === dateString);

    if (dayData) {
      // Generate sleep data based on sleepHours
      this.sleepData = this.generateSleepData(dayData.sleepHours);

      // Generate workout data based on workoutHours
      this.workoutData = this.generateWorkoutData(dayData.workoutHours);

      // Generate hourly activity data based on steps
      this.hourlyActivityData = this.generateHourlyActivityData(dayData.steps, dayData.activeMinutes);
    } else {
      // No data available
      this.sleepData = null;
      this.workoutData = [];
      this.hourlyActivityData = [];
    }
  }

  private generateSleepData(sleepHours: number): SleepData {
    // Generate realistic sleep times based on sleep duration
    const sleepStartHour = 22 + Math.floor(Math.random() * 3); // 22-24 (10 PM - 12 AM)
    const sleepStartMinute = Math.floor(Math.random() * 60);
    const sleepEndHour = (sleepStartHour + Math.floor(sleepHours)) % 24;
    const sleepEndMinute = sleepStartMinute;

    return {
      startTime: `${sleepStartHour.toString().padStart(2, '0')}:${sleepStartMinute.toString().padStart(2, '0')}`,
      endTime: `${sleepEndHour.toString().padStart(2, '0')}:${sleepEndMinute.toString().padStart(2, '0')}`,
      duration: sleepHours
    };
  }

  private generateWorkoutData(workoutHours: number): WorkoutData[] {
    const workouts: WorkoutData[] = [];
    const workoutTypes = ['running', 'gym', 'yoga', 'cycling', 'swimming'];

    if (workoutHours > 0) {
      // Generate 1-3 workouts based on total workout hours
      const numWorkouts = Math.min(Math.ceil(workoutHours), 3);

      for (let i = 0; i < numWorkouts; i++) {
        const hour = 6 + Math.floor(Math.random() * 12); // 6 AM - 6 PM
        const minute = Math.floor(Math.random() * 60);
        const duration = Math.floor((workoutHours / numWorkouts) * 60); // Convert to minutes
        const type = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];

        workouts.push({
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          duration: duration,
          type: type
        });
      }
    }

    return workouts;
  }

  private generateHourlyActivityData(totalSteps: number, activeMinutes: number): HourlyActivityData[] {
    const hourlyData: HourlyActivityData[] = [];

    // Generate more realistic hourly activity patterns with better distribution
    for (let hour = 0; hour < 24; hour++) {
      let activityLevel = 0;
      let steps = 0;

      // Sleep hours (11 PM - 6 AM) - minimal activity
      if (hour >= 23 || hour <= 5) {
        activityLevel = Math.floor(Math.random() * 10); // 0-10%
        steps = Math.floor(Math.random() * 50);
      }
      // Morning routine (6-9 AM) - moderate activity
      else if (hour >= 6 && hour <= 8) {
        activityLevel = 30 + Math.floor(Math.random() * 30); // 30-60%
        steps = Math.floor((totalSteps * 0.15) * (activityLevel / 100));
      }
      // Work hours (9 AM - 5 PM) - variable activity
      else if (hour >= 9 && hour <= 16) {
        // Lunch break peak (12-1 PM)
        if (hour === 12) {
          activityLevel = 50 + Math.floor(Math.random() * 30); // 50-80%
        } else {
          activityLevel = 20 + Math.floor(Math.random() * 40); // 20-60%
        }
        steps = Math.floor((totalSteps * 0.4) * (activityLevel / 100));
      }
      // Evening (5-10 PM) - higher activity
      else if (hour >= 17 && hour <= 21) {
        activityLevel = 40 + Math.floor(Math.random() * 40); // 40-80%
        steps = Math.floor((totalSteps * 0.35) * (activityLevel / 100));
      }
      // Late evening (10-11 PM) - winding down
      else {
        activityLevel = 10 + Math.floor(Math.random() * 20); // 10-30%
        steps = Math.floor((totalSteps * 0.1) * (activityLevel / 100));
      }

      hourlyData.push({
        hour: hour,
        activityLevel: activityLevel,
        steps: steps
      });
    }

    return hourlyData;
  }

  goBackToBriefing(): void {
    this.conversationStep.set('briefing');
  }
}
