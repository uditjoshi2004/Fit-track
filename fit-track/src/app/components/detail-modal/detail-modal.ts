import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { GoogleFitService } from '../../services/google-fit.service';
import { ChartConfiguration } from 'chart.js';
import { CommonModule, DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-detail-modal',
  imports: [CommonModule, DatePipe, BaseChartDirective, LucideAngularModule],
  templateUrl: './detail-modal.html',
  styleUrl: './detail-modal.css'
})
export class DetailModal {
  @Input() date: Date = new Date();
  @Input() metricType: 'steps' | 'calories' | 'activeMinutes' = 'steps';
  @Input() dailyTotal: number = 0;
  @Output() close = new EventEmitter<void>();

  googleFitService = inject(GoogleFitService);

  status: 'loading' | 'loaded' | 'error' = 'loading';
  chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true, maintainAspectRatio: false };

  ngOnInit(): void {
    this.googleFitService.getIntradayData(this.date, this.metricType).subscribe({
      next: (data) => {
        const labels = data.map(d => `${d.time}:00`);
        const values = data.map(d => d.value);

        this.chartData = {
          labels: labels,
          datasets: [{
            data: values,
            label: this.metricType.charAt(0).toUpperCase() + this.metricType.slice(1),
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
          }]
        };
        this.status = 'loaded';
      },
      error: () => this.status = 'error'
    });
  }
}
