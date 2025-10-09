import { Component, inject, effect, ViewChild, AfterViewInit, computed, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GoalProgressCard } from '../goal-progress-card/goal-progress-card';
import { KpiCard } from '../kpi-card/kpi-card';
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

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GoalProgressCard, BaseChartDirective, LucideAngularModule, DetailModal],
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // themeService = inject(ThemeService);
  fitnessDataService = inject(FitnessDataService);
  googleFitService = inject(GoogleFitService);
  dateStateService = inject(DateStateService);
  authService = inject(AuthService);

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
  public themeService = inject(ThemeService); // <-- ADD THIS LINE

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
}
