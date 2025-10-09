import { Component, EventEmitter, inject, input, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-goal-progress-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './goal-progress-card.html',
  styleUrl: './goal-progress-card.css'
})
export class GoalProgressCard {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() goal: number = 1;
  @Input() icon: string = '';
  @Input() color: string = 'black';
  @Input() textColor: string = '';
  @Input() unit: string = '';
  @Output() cardClick = new EventEmitter<void>()

  public themeService = inject(ThemeService);
  // SVG circle properties
  circumference = 2 * Math.PI * 45; // 2 * pi * radius
  strokeDashoffset = this.circumference;
  percentage = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['goal']) {
      this.calculateProgress();
    }
  }

  private calculateProgress(): void {
    const percent = this.goal > 0 ? (this.value / this.goal) * 100 : 0;
    this.percentage = Math.min(100, Math.max(0, percent));
    this.strokeDashoffset = this.circumference - (this.percentage / 100) * this.circumference;
  }

  get percent(): number {
    return this.goal > 0 ? (this.value / this.goal) * 100 : 0;
  }
}
