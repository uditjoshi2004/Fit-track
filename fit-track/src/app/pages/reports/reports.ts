import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../../services/auth.service';
import { FitnessDataService } from '../../services/fitness-data.service';
import { DailyActivity } from '../../models/fitness-data.model';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import dayjs from 'dayjs/esm';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LucideAngularModule } from 'lucide-angular';
import { subDays, startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, BaseChartDirective, FormsModule, NgxDaterangepickerMd, LucideAngularModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  authService = inject(AuthService);
  fitnessDataService = inject(FitnessDataService);

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
  reportSummary = { totalSteps: 0, avgSleep: 0, totalActiveMinutes: 0 };
  // We can fetch data here to display in the report
  // For now, we'll just use the current user's name
  // NEW: Manage state locally
  public chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chartOptions: ChartConfiguration<'line'>['options'] = {
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

    this.fitnessDataService.getActivities(start, end).subscribe(activities => {
      this.activities = activities;
      this.prepareReportData();
    });
  }

  prepareReportData(): void {
    const diffDays = dayjs(this.selectedDateRange.endDate).diff(this.selectedDateRange.startDate, 'day');

    if (diffDays === 0) {
      this.reportTitle = `Daily Report for ${dayjs(this.selectedDateRange.startDate).format('MMM D, YYYY')}`;
    } else {
      this.reportTitle = `Activity Report: ${dayjs(this.selectedDateRange.startDate).format('MMM D')} - ${dayjs(this.selectedDateRange.endDate).format('MMM D, YYYY')}`;
    }

    this.reportSummary.totalSteps = this.activities.reduce((sum, act) => sum + (act.steps || 0), 0);
    this.reportSummary.totalActiveMinutes = this.activities.reduce((sum, act) => sum + (act.activeMinutes || 0), 0);
    const totalSleep = this.activities.reduce((sum, act) => sum + (act.sleepHours || 0), 0);
    this.reportSummary.avgSleep = this.activities.length > 0 ? totalSleep / this.activities.length : 0;

    this.chartData = {
      labels: this.activities.map(a => new Date(a.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })),
      datasets: [{
        data: this.activities.map(a => a.steps),
        label: 'Steps',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      }]
    };
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
