import { Component, computed, inject, signal } from '@angular/core';
import { WeightEntry } from '../../models/weight.model';
import { WeightService } from '../../services/weight.service';
import { GoogleFitService } from '../../services/google-fit.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { format, subDays, startOfWeek, endOfWeek, getWeek, startOfMonth, endOfMonth, getMonth, startOfYear, endOfYear } from 'date-fns';
import { ChartConfiguration, ChartOptions } from 'chart.js';
// --- Charting Imports ---
import { BaseChartDirective } from 'ng2-charts'; // Ensure this import is here
import 'chart.js/auto';

type FilterType = 'week' | 'month' | '3months' | 'year';

@Component({
  selector: 'app-weight-tracking',
  imports: [CommonModule, BaseChartDirective, LucideAngularModule],
  templateUrl: './weight-tracking.html',
  styleUrl: './weight-tracking.css'
})
export class WeightTracking {
  private weightService = inject(WeightService);
  private googleFitService = inject(GoogleFitService);

  // --- State Signals ---
  public allWeightEntries = signal<WeightEntry[]>([]);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);
  public activeFilter = signal<FilterType>('month');

  // --- Computed Signals for Dynamic UI ---
  public filteredEntries = computed(() => {
    const entries = this.allWeightEntries();
    const filter = this.activeFilter();
    const now = new Date();

    if (filter === 'week') {
      return entries.filter(e => new Date(e.date) >= startOfWeek(now) && new Date(e.date) <= endOfWeek(now));
    }
    if (filter === 'month') {
      return entries.filter(e => new Date(e.date) >= startOfMonth(now) && new Date(e.date) <= endOfMonth(now));
    }
    if (filter === '3months') {
      return entries.filter(e => new Date(e.date) >= subDays(startOfMonth(now), 90) && new Date(e.date) <= endOfMonth(now));
    }
    if (filter === 'year') {
      return entries.filter(e => new Date(e.date) >= startOfYear(now) && new Date(e.date) <= endOfYear(now));
    }
    return entries;
  });

  public summaryData = computed(() => {
    const entries = this.filteredEntries();
    const filter = this.activeFilter();

    if (filter === 'month') {
      // Group by week
      return this.groupEntriesByWeek(entries);
    }
    if (filter === 'year' || filter === '3months') {
      // Group by month
      return this.groupEntriesByMonth(entries);
    }
    return []; // No grouping for 'week' view
  });

  public latestWeightEntry = computed(() => {
    const entries = this.allWeightEntries();
    if (entries.length === 0) {
      return null;
    }
    // The data is sorted by date, so the last item is the most recent
    return entries[entries.length - 1];
  });

  // --- Chart Configuration ---
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: 'start',
      },
      point: {
        backgroundColor: '#3b82f6',
        radius: 4, // <-- ADDED: Makes data points visible
        hoverRadius: 6, // <-- ADDED: Makes points larger on hover
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grace: '5%', // <-- ADDED: Adds 5% padding to the top and bottom
      },
    },
  };
  public lineChartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const entries = this.filteredEntries();
    const labels = entries.map(e => format(new Date(e.date), 'MMM d'));
    const data = entries.map(e => e.weightInKg);

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Weight (kg)',
        },
      ],
    };
  });

  // --- Component Lifecycle ---
  ngOnInit(): void {
    this.fetchWeightData();
    this.googleFitService.disconnected$.subscribe(() => {
      this.allWeightEntries.set([]);
      this.error.set(null);
      this.isLoading.set(false);
    });
    this.googleFitService.isConnected$.subscribe(isConnected => {
      if (!isConnected) {
        this.allWeightEntries.set([]);
        this.error.set(null);
        this.isLoading.set(false);
      }
    });
  }

  // --- Public Methods ---
  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  // --- Private Methods ---
  private fetchWeightData(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.weightService.getWeightData().subscribe({
      next: (data) => {
        this.allWeightEntries.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load weight data.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  // Replace your existing groupEntriesByWeek function with this
  private groupEntriesByWeek(entries: WeightEntry[]): any[] {
    const grouped = entries.reduce((acc, entry) => {
      const weekNumber = getWeek(new Date(entry.date));
      if (!acc[weekNumber]) {
        acc[weekNumber] = [];
      }
      acc[weekNumber].push(entry);
      return acc;
    }, {} as Record<number, WeightEntry[]>);

    return Object.values(grouped).map(weekEntries => {
      const firstDay = format(new Date(weekEntries[0].date), 'd MMM');
      const lastDay = format(new Date(weekEntries[weekEntries.length - 1].date), 'd MMM');
      const firstWeight = weekEntries[0].weightInKg;
      const lastWeight = weekEntries[weekEntries.length - 1].weightInKg;
      const change = lastWeight - firstWeight;

      return {
        label: weekEntries.length > 1 ? `${firstDay} - ${lastDay}` : firstDay,
        range: `${Math.min(...weekEntries.map(e => e.weightInKg))} - ${Math.max(...weekEntries.map(e => e.weightInKg))} kg`,
        change: change
      };
    });
  }

  // Replace your existing groupEntriesByMonth function with this
  private groupEntriesByMonth(entries: WeightEntry[]): any[] {
    const grouped = entries.reduce((acc, entry) => {
      const monthNumber = getMonth(new Date(entry.date));
      if (!acc[monthNumber]) {
        acc[monthNumber] = [];
      }
      acc[monthNumber].push(entry);
      return acc;
    }, {} as Record<number, WeightEntry[]>);

    return Object.values(grouped).map(monthEntries => {
      const monthName = format(new Date(monthEntries[0].date), 'MMMM yyyy');
      const firstWeight = monthEntries[0].weightInKg;
      const lastWeight = monthEntries[monthEntries.length - 1].weightInKg;
      const change = lastWeight - firstWeight;

      return {
        label: monthName,
        range: `${Math.min(...monthEntries.map(e => e.weightInKg))} - ${Math.max(...monthEntries.map(e => e.weightInKg))} kg`,
        change: change
      };
    });
  }
}