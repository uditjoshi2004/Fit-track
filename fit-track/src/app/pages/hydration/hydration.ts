import { Component, computed, effect, inject, signal } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import {
  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  format, isToday, eachDayOfInterval, isSameMonth, getWeek
} from 'date-fns';
import { HydrationEntry } from '../../models/hydration.model';
import { HydrationService } from '../../services/hydration.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { GoalProgressCard } from '../../components/goal-progress-card/goal-progress-card';
import { AuthService } from '../../services/auth.service';

type FilterType = 'day' | 'week' | 'month';

@Component({
  selector: 'app-hydration',
  imports: [CommonModule, BaseChartDirective, GoalProgressCard],
  templateUrl: './hydration.html',
  styleUrl: './hydration.css'
})
export class Hydration {
  private hydrationService = inject(HydrationService);
  private authService = inject(AuthService);
  // --- State Signals ---
  public allEntries = signal<HydrationEntry[]>([]);
  public isLoading = signal(true);
  public error = signal<string | null>(null);
  public activeFilter = signal<FilterType>('week');
  public selectedDate = signal(new Date()); // <-- ADD THIS LINE
  public dailyGoal = signal(2500); // Daily goal in ml

  // --- KPI Computed Signals ---
  public todaysIntake = computed(() => {
    return this.allEntries()
      .filter(e => isToday(new Date(e.date)))
      .reduce((sum, entry) => sum + entry.volumeInMl, 0);
  });

  public periodAverage = computed(() => {
    const entries = this.filteredEntries();
    if (entries.length === 0) return 0;

    const totalsByDay = new Map<string, number>();
    entries.forEach(entry => {
      const day = format(new Date(entry.date), 'yyyy-MM-dd');
      const currentTotal = totalsByDay.get(day) || 0;
      totalsByDay.set(day, currentTotal + entry.volumeInMl);
    });

    const dailyValues = Array.from(totalsByDay.values());
    const totalSum = dailyValues.reduce((sum, total) => sum + total, 0);
    return Math.round(totalSum / dailyValues.length);
  });

  // --- Filtered Data Signal ---
  public filteredEntries = computed(() => {
    const entries = this.allEntries();
    const filter = this.activeFilter();
    const now = this.selectedDate();

    if (filter === 'day') return entries.filter(e => new Date(e.date) >= startOfDay(now) && new Date(e.date) <= endOfDay(now));
    if (filter === 'week') return entries.filter(e => new Date(e.date) >= startOfWeek(now) && new Date(e.date) <= endOfWeek(now));
    if (filter === 'month') return entries.filter(e => new Date(e.date) >= startOfMonth(now) && new Date(e.date) <= endOfMonth(now));
    return [];
  });

  // --- Chart Configuration ---
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, ticks: { callback: (value) => `${value} ml` } }, x: { grid: { display: false } } },
    plugins: { legend: { display: false } }
  };

  public barChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const entries = this.filteredEntries();
    const filter = this.activeFilter();
    let labels: string[] = [];
    let data: number[] = [];

    if (filter === 'day') {
      const hourlyTotals = new Array(24).fill(0);
      entries.forEach(entry => {
        const hour = new Date(entry.createdAt).getHours();
        hourlyTotals[hour] += entry.volumeInMl;
      });
      labels = hourlyTotals.map((_, i) => `${i}:00`);
      data = hourlyTotals;
    } else {
      const dailyTotals = new Map<string, number>();
      entries.forEach(entry => {
        const day = format(new Date(entry.date), 'yyyy-MM-dd');
        const currentTotal = dailyTotals.get(day) || 0;
        dailyTotals.set(day, currentTotal + entry.volumeInMl);
      });
      labels = Array.from(dailyTotals.keys()).map(d => filter === 'week' ? format(new Date(d), 'eee') : format(new Date(d), 'd'));
      data = Array.from(dailyTotals.values());
    }

    return {
      labels: labels,
      datasets: [{ data, label: 'Intake (ml)', backgroundColor: 'rgba(59, 130, 246, 0.5)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1, borderRadius: 4 }]
    };
  });

  public dailySummaryLog = computed(() => {
    const entries = this.filteredEntries();
    if (entries.length === 0) return [];

    const dailyTotals = new Map<string, number>();

    // Group entries by day and sum their volumes
    entries.forEach(entry => {
      const day = format(startOfDay(new Date(entry.date)), 'yyyy-MM-dd');
      const currentTotal = dailyTotals.get(day) || 0;
      dailyTotals.set(day, currentTotal + entry.volumeInMl);
    });

    // Convert the map to an array of objects and sort by most recent day
    return Array.from(dailyTotals.entries())
      .map(([date, totalVolume]) => ({ date, totalVolume }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  // --- NEW SIGNALS FOR CALENDAR VIEW ---
  public calendarData = computed(() => {
    const entries = this.filteredEntries();
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);
    const lastDayOfMonth = endOfMonth(now);
    const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
    const lastDayOfCalendar = endOfWeek(lastDayOfMonth);

    const entriesByDate = new Map<string, number>();
    entries.forEach(entry => {
      const day = format(startOfDay(new Date(entry.date)), 'yyyy-MM-dd');
      const currentTotal = entriesByDate.get(day) || 0;
      entriesByDate.set(day, currentTotal + entry.volumeInMl);
    });

    return eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar }).map(date => {
      const dayKey = format(date, 'yyyy-MM-dd');
      const intake = entriesByDate.get(dayKey) || 0;
      return {
        date,
        dayOfMonth: format(date, 'd'),
        isCurrentMonth: isSameMonth(date, now),
        intake,
        fillPercentage: Math.min(100, (intake / this.dailyGoal()) * 100)
      };
    });
  });

  public weeklySummaryLog = computed(() => {
    const entries = this.filteredEntries();
    if (entries.length === 0) return [];

    const weeklyTotals = new Map<number, number>();
    entries.forEach(entry => {
      const week = getWeek(new Date(entry.date));
      const currentTotal = weeklyTotals.get(week) || 0;
      weeklyTotals.set(week, currentTotal + entry.volumeInMl);
    });

    return Array.from(weeklyTotals.entries())
      .map(([week, totalVolume]) => ({ week, totalVolume }))
      .sort((a, b) => a.week - b.week);
  });

  constructor() {
    // 2. Create an effect that runs whenever the user's connection status changes
    effect(() => {
      const isConnected = this.authService.currentUser()?.isGoogleFitConnected;

      console.log('HydrationComponent detected connection status:', isConnected);

      if (isConnected) {
        this.fetchData(); // If connected, fetch the data
      } else {
        this.allEntries.set([]); // If disconnected, clear the data
        this.isLoading.set(false); // Ensure loading is off
      }
    });
  }

  private fetchData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.hydrationService.getHydrationData().subscribe({
      next: (data) => {
        this.allEntries.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load hydration data.');
        this.isLoading.set(false);
      }
    });
  }

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  selectDate(date: Date): void {
    this.selectedDate.set(date);
    this.activeFilter.set('day');
  }
}
