import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-kpi-card',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {
  @Input() title: string = 'Title';
  @Input() value: string = '0';
  @Input() icon: string = 'activity'; // Lucide icon name
  @Input() color: string = 'blue'; // To change icon color
}
