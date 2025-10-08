import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-goal-progress-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './goal-progress-card.html',
  styleUrl: './goal-progress-card.css'
})
export class GoalProgressCard {
  @Input() title: string = 'Title';
  @Input() value: number = 0;
  @Input() goal: number = 10000;
  @Input() icon: string = 'activity';
  @Input() color: string = 'blue';
  @Input() textColor: string = ''; // Optional text color override
  // Add this line to create a new event emitter
  @Output() cardClick = new EventEmitter<void>();
  // SVG circle properties
  circumference = 2 * Math.PI * 45; // 2 * pi * radius
  strokeDashoffset = this.circumference;
  percentage = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // This function runs whenever an input changes (e.g., when the value updates)
    this.updateProgress();
  }

  private updateProgress(): void {
    if (this.goal > 0) {
      this.percentage = Math.min(100, Math.floor((this.value / this.goal) * 100));
      const progress = this.percentage / 100;
      this.strokeDashoffset = this.circumference * (1 - progress);
    } else {
      this.percentage = 0;
      this.strokeDashoffset = this.circumference;
    }
  }
}
