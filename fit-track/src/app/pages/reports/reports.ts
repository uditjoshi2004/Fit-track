import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../../services/auth.service';
import { FitnessDataService } from '../../services/fitness-data.service';
import { HydrationService } from '../../services/hydration.service';
import { WeightService } from '../../services/weight.service';
import { DailyActivity } from '../../models/fitness-data.model';
import { HydrationEntry } from '../../models/hydration.model';
import { WeightEntry } from '../../models/weight.model';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import dayjs from 'dayjs/esm';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LucideAngularModule } from 'lucide-angular';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, BaseChartDirective, FormsModule, NgxDaterangepickerMd, LucideAngularModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  authService = inject(AuthService);
  fitnessDataService = inject(FitnessDataService);
  hydrationService = inject(HydrationService);
  weightService = inject(WeightService);
  private http = inject(HttpClient);

  // Properties to manage the date range picker / dropdown
  selectedDateRange = {
    startDate: dayjs().subtract(6, 'days'),
    endDate: dayjs(),
  };

  isDropdownOpen = false;
  displayedRangeText = 'Last 7 Days';

  ranges: any = {
    'Today': [dayjs(), dayjs()],
    'Yesterday': [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    'Last 7 Days': [dayjs().subtract(6, 'days'), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'days'), dayjs()],
    'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Last Month': [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  };

  reportTitle = 'Activity Report';
  activities: DailyActivity[] = [];
  hydrationData: HydrationEntry[] = [];
  weightData: WeightEntry[] = [];
  
  // Enhanced report summary with more metrics
  reportSummary = { 
    totalSteps: 0, 
    avgSteps: 0,
    totalActiveMinutes: 0, 
    avgActiveMinutes: 0,
    avgSleep: 0, 
    avgHydration: 0,
    workoutDays: 0,
    weightChange: 0
  };

  // AI Analysis
  aiSummary = '';
  correlationInsights = '';
  isLoadingAI = false;

  // Chart data for multiple charts
  public stepsChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public weightChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public hydrationChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public sleepChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  
  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Separate options for bar charts to satisfy strict template typing
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit(): void {
    this.fetchReportData();
  }

  // Toggle dropdown visibility
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handle selection from predefined ranges
  selectPredefinedRange(label: 'Today' | 'Yesterday' | 'Last 7 Days' | 'Last 30 Days'): void {
    const range = this.ranges[label];
    if (range && Array.isArray(range) && range.length === 2) {
      this.selectedDateRange = { startDate: range[0], endDate: range[1] };
      this.displayedRangeText = label;
      this.isDropdownOpen = false;
      this.fetchReportData();
    }
  }

  fetchReportData(): void {
    const start = this.selectedDateRange.startDate.toDate();
    const end = this.selectedDateRange.endDate.toDate();

    // Fetch all data in parallel
    this.fitnessDataService.getActivities(start, end).subscribe(activities => {
      this.activities = activities;
      this.prepareReportData();
    });

    this.hydrationService.getHydrationData().subscribe(hydration => {
      // Filter hydration data for the selected date range
      this.hydrationData = hydration.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
      });
      this.prepareReportData();
    });

    this.weightService.getWeightData().subscribe(weight => {
      // Filter weight data for the selected date range
      this.weightData = weight.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
      });
      this.prepareReportData();
    });

    // Generate AI analysis
    this.generateAIAnalysis();
  }

  prepareReportData(): void {
    const diffDays = dayjs(this.selectedDateRange.endDate).diff(this.selectedDateRange.startDate, 'day');

    if (diffDays === 0) {
      this.reportTitle = `Daily Report for ${dayjs(this.selectedDateRange.startDate).format('MMM D, YYYY')}`;
    } else {
      this.reportTitle = `Activity Report: ${dayjs(this.selectedDateRange.startDate).format('MMM D')} - ${dayjs(this.selectedDateRange.endDate).format('MMM D, YYYY')}`;
    }

    // Calculate enhanced metrics
    this.reportSummary.totalSteps = this.activities.reduce((sum, act) => sum + (act.steps || 0), 0);
    this.reportSummary.avgSteps = this.activities.length > 0 ? this.reportSummary.totalSteps / this.activities.length : 0;
    
    this.reportSummary.totalActiveMinutes = this.activities.reduce((sum, act) => sum + (act.activeMinutes || 0), 0);
    this.reportSummary.avgActiveMinutes = this.activities.length > 0 ? this.reportSummary.totalActiveMinutes / this.activities.length : 0;
    
    const totalSleep = this.activities.reduce((sum, act) => sum + (act.sleepHours || 0), 0);
    this.reportSummary.avgSleep = this.activities.length > 0 ? totalSleep / this.activities.length : 0;
    
    const totalHydration = this.hydrationData.reduce((sum, entry) => sum + (entry.volumeInMl || 0), 0);
    this.reportSummary.avgHydration = this.hydrationData.length > 0 ? totalHydration / this.hydrationData.length : 0;
    
    this.reportSummary.workoutDays = this.activities.filter(act => (act.activeMinutes || 0) > 30).length;
    
    // Calculate weight change
    const sortedWeights = this.weightData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.reportSummary.weightChange = sortedWeights.length > 1 ? 
      sortedWeights[sortedWeights.length - 1].weightInKg - sortedWeights[0].weightInKg : 0;

    this.prepareCharts();
  }

  prepareCharts(): void {
    const labels = this.activities.map(a => new Date(a.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));

    // Steps chart (combo with active minutes)
    this.stepsChartData = {
      labels: labels,
      datasets: [
        {
          data: this.activities.map(a => a.steps),
          label: 'Steps',
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.1,
          type: 'line'
        },
        {
          data: this.activities.map(a => a.activeMinutes),
          label: 'Active Minutes',
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.1,
          type: 'line'
        }
      ]
    };

    // Weight chart
    this.weightChartData = {
      labels: this.weightData.map(w => new Date(w.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })),
      datasets: [{
        data: this.weightData.map(w => w.weightInKg),
        label: 'Weight (kg)',
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.1,
      }]
    };

    // Hydration chart
    this.hydrationChartData = {
      labels: labels,
      datasets: [{
        data: labels.map(label => {
          const date = this.activities.find(a => 
            new Date(a.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) === label
          )?.date;
          if (!date) return 0;
          const hydrationEntry = this.hydrationData.find(h => 
            new Date(h.date).toDateString() === new Date(date).toDateString()
          );
          return hydrationEntry ? hydrationEntry.volumeInMl / 1000 : 0; // Convert to liters
        }),
        label: 'Hydration (L)',
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]
    };

    // Sleep chart
    this.sleepChartData = {
      labels: labels,
      datasets: [{
        data: this.activities.map(a => a.sleepHours || 0),
        label: 'Sleep (hours)',
        backgroundColor: 'rgba(139, 69, 19, 0.8)',
        borderColor: 'rgb(139, 69, 19)',
        borderWidth: 1
      }]
    };
  }

  generateAIAnalysis(): void {
    this.isLoadingAI = true;
    const start = this.selectedDateRange.startDate.toDate();
    const end = this.selectedDateRange.endDate.toDate();
    const dateRange = this.displayedRangeText;

    // Generate AI summary
    this.http.post('http://localhost:3000/api/users/ai/report-summary', {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      dateRange: dateRange
    }).subscribe({
      next: (response: any) => {
        this.aiSummary = response.summary;
        this.isLoadingAI = false;
      },
      error: (error) => {
        console.error('Error generating AI summary:', error);
        this.aiSummary = 'Unable to generate AI analysis at this time.';
        this.isLoadingAI = false;
      }
    });

    // Generate correlation insights
    this.http.post('http://localhost:3000/api/users/ai/correlation-insights', {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    }).subscribe({
      next: (response: any) => {
        this.correlationInsights = response.insights;
      },
      error: (error) => {
        console.error('Error generating correlation insights:', error);
        this.correlationInsights = 'Unable to generate correlation insights at this time.';
      }
    });
  }

  public generatePDF(): void {
    const data = document.getElementById('pdf-content');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('Fit-Track-Report.pdf');
      });
    }
  }
}
