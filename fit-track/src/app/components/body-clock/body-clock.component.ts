import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SleepData {
  startTime: string; // e.g., '22:30'
  endTime: string;   // e.g., '06:30'
  duration: number;  // in hours
}

export interface WorkoutData {
  time: string;      // e.g., '07:00'
  duration: number;  // in minutes
  type: string;      // e.g., 'running', 'gym', 'yoga'
}

export interface HourlyActivityData {
  hour: number;      // 0-23
  activityLevel: number; // 0-100 (percentage)
  steps: number;
}

@Component({
  selector: 'app-body-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body-clock.component.html',
  styleUrls: ['./body-clock.component.css']
})
export class BodyClockComponent implements OnInit, OnChanges {
  @Input() sleepData: SleepData | null = null;
  @Input() workoutData: WorkoutData[] = [];
  @Input() hourlyActivityData: HourlyActivityData[] = [];

  // Make Math and Date available in template
  Math = Math;
  Date = Date;

  // SVG dimensions
  readonly centerX = 150;
  readonly centerY = 150;
  readonly outerRadius = 120;
  readonly innerRadius = 60;
  readonly activityRadius = 90;
  readonly sleepRadius = 75;

  // Processed data for rendering
  sleepArc: { startAngle: number; endAngle: number; largeArcFlag: number } | null = null;
  workoutMarkers: Array<{ angle: number; x: number; y: number; type: string; time: string }> = [];
  activitySegments: Array<{ hour: number; angle: number; intensity: number; color: string; steps: number; endHour: number }> = [];
  hourLabels: Array<{ hour: number; x: number; y: number; label: string }> = [];
  
  // Current time for indicator
  currentTime = {
    hour: 0,
    minute: 0,
    angle: 0,
    x: 0,
    y: 0
  };

  // Tooltip state
  tooltip = {
    visible: false,
    x: 0,
    y: 0,
    content: '',
    type: ''
  };

  ngOnInit() {
    this.processData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sleepData'] || changes['workoutData'] || changes['hourlyActivityData']) {
      this.processData();
    }
  }

  private processData() {
    this.processSleepData();
    this.processWorkoutData();
    this.processActivityData();
    this.generateHourLabels();
    this.updateCurrentTime();
  }

  private processSleepData() {
    if (!this.sleepData) {
      this.sleepArc = null;
      return;
    }

    const startAngle = this.timeToAngle(this.sleepData.startTime);
    const endAngle = this.timeToAngle(this.sleepData.endTime);
    
    // Handle sleep that crosses midnight
    const largeArcFlag = endAngle < startAngle ? 1 : 0;
    
    this.sleepArc = {
      startAngle,
      endAngle,
      largeArcFlag
    };
  }

  private processWorkoutData() {
    this.workoutMarkers = this.workoutData.map(workout => {
      const angle = this.timeToAngle(workout.time);
      const x = this.centerX + Math.cos(angle - Math.PI / 2) * this.activityRadius;
      const y = this.centerY + Math.sin(angle - Math.PI / 2) * this.activityRadius;
      
      return {
        angle,
        x,
        y,
        type: workout.type,
        time: workout.time
      };
    });
  }

  private processActivityData() {
    // Create 12 segments (2-hour blocks) to reduce congestion
    this.activitySegments = [];
    
    for (let block = 0; block < 12; block++) {
      const startHour = block * 2;
      const endHour = startHour + 1;
      
      // Calculate average activity for this 2-hour block
      const blockData = this.hourlyActivityData.filter(data => 
        data.hour >= startHour && data.hour <= endHour
      );
      
      const avgIntensity = blockData.length > 0 
        ? blockData.reduce((sum, data) => sum + data.activityLevel, 0) / blockData.length
        : 0;
      
      const totalSteps = blockData.reduce((sum, data) => sum + data.steps, 0);
      
      const angle = (block * 30) * (Math.PI / 180); // 30 degrees per 2-hour block
      const color = this.getActivityColor(avgIntensity);
      
      this.activitySegments.push({
        hour: startHour, // Store start hour for reference
        angle,
        intensity: avgIntensity,
        color,
        steps: totalSteps,
        endHour: endHour
      });
    }
  }

  private generateHourLabels() {
    this.hourLabels = [];
    
    for (let hour = 0; hour < 24; hour += 2) { // Show every 2 hours
      const angle = (hour * 15) * (Math.PI / 180);
      const x = this.centerX + Math.cos(angle - Math.PI / 2) * (this.outerRadius + 15);
      const y = this.centerY + Math.sin(angle - Math.PI / 2) * (this.outerRadius + 15);
      
      this.hourLabels.push({
        hour,
        x,
        y,
        label: this.formatHour(hour)
      });
    }
  }

  private timeToAngle(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const angle = (totalMinutes / (24 * 60)) * 2 * Math.PI;
    return angle;
  }

  private getActivityColor(intensity: number): string {
    if (intensity === 0) return '#e5e7eb'; // gray-200
    if (intensity < 25) return '#fef3c7'; // yellow-100
    if (intensity < 50) return '#fed7aa'; // orange-200
    if (intensity < 75) return '#fb923c'; // orange-400
    return '#ea580c'; // orange-600
  }

  private formatHour(hour: number): string {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  }

  private updateCurrentTime(): void {
    const now = new Date();
    this.currentTime.hour = now.getHours();
    this.currentTime.minute = now.getMinutes();
    
    const currentAngle = ((this.currentTime.hour + this.currentTime.minute / 60) * 15) * (Math.PI / 180);
    this.currentTime.angle = currentAngle;
    this.currentTime.x = this.centerX + Math.cos(currentAngle - Math.PI / 2) * (this.outerRadius + 10);
    this.currentTime.y = this.centerY + Math.sin(currentAngle - Math.PI / 2) * (this.outerRadius + 10);
  }

  // Helper methods for SVG path generation
  createArcPath(startAngle: number, endAngle: number, radius: number, largeArcFlag: number): string {
    const startX = this.centerX + Math.cos(startAngle - Math.PI / 2) * radius;
    const startY = this.centerY + Math.sin(startAngle - Math.PI / 2) * radius;
    const endX = this.centerX + Math.cos(endAngle - Math.PI / 2) * radius;
    const endY = this.centerY + Math.sin(endAngle - Math.PI / 2) * radius;
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }

  createHourSegmentPath(hour: number, radius: number): string {
    // For 2-hour blocks, each segment spans 30 degrees
    const startAngle = (hour * 30) * (Math.PI / 180);
    const endAngle = ((hour + 2) * 30) * (Math.PI / 180);
    
    const startX = this.centerX + Math.cos(startAngle - Math.PI / 2) * radius;
    const startY = this.centerY + Math.sin(startAngle - Math.PI / 2) * radius;
    const endX = this.centerX + Math.cos(endAngle - Math.PI / 2) * radius;
    const endY = this.centerY + Math.sin(endAngle - Math.PI / 2) * radius;
    
    return `M ${this.centerX} ${this.centerY} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`;
  }

  // Tooltip methods
  showTooltip(event: MouseEvent, content: string, type: string): void {
    this.tooltip.visible = true;
    this.tooltip.x = event.clientX;
    this.tooltip.y = event.clientY;
    this.tooltip.content = content;
    this.tooltip.type = type;
  }

  hideTooltip(): void {
    this.tooltip.visible = false;
  }

  getActivityTooltipText(segment: any): string {
    const startTime = this.formatHour(segment.hour);
    const endTime = this.formatHour(segment.endHour);
    return `${startTime} - ${endTime}: ${segment.steps} steps, ${Math.round(segment.intensity)}% activity`;
  }

  getWorkoutTooltipText(marker: any): string {
    const workout = this.workoutData.find(w => w.time === marker.time);
    if (workout) {
      return `${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} at ${workout.time} (${workout.duration} min)`;
    }
    return `Workout at ${marker.time}`;
  }

  getSleepTooltipText(): string {
    if (this.sleepData) {
      return `Sleep: ${this.sleepData.startTime} - ${this.sleepData.endTime} (${this.sleepData.duration}h)`;
    }
    return 'No sleep data available';
  }
}
