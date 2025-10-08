import { Component, inject, computed, ElementRef, HostListener, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateStateService } from '../../services/date-state.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { isToday } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { Router, RouterLink } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NgxDaterangepickerMd,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './header.html',
})
export class Header {
  // Injected Services
  dateStateService = inject(DateStateService);
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  private eRef = inject(ElementRef);
  private router = inject(Router); // 2. Inject the Router
  // --- Properties for User Profile Dropdown ---
  isDropdownOpen = false;

  // --- Properties for Date Navigator ---
  maxDate = dayjs();
  selectedDateForPicker: Dayjs;

  pickerLocale = {
    format: 'DD/MM/YYYY'
  }

  constructor() {
    this.selectedDateForPicker = dayjs(this.dateStateService.selectedDate());

    // Create an effect that runs WHENEVER the date in the service changes
    // This is the key to keeping the display in sync
    effect(() => {
      const newDate = this.dateStateService.selectedDate();
      this.selectedDateForPicker = dayjs(newDate);
    });
  }

  // --- Methods for User Profile Dropdown ---
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // --- Logic for Date Navigator ---
  isNextDayDisabled = computed(() => {
    return isToday(this.dateStateService.selectedDate());
  });

  onDateSelected(event: any) {
    if (event.startDate) {
      this.dateStateService.setDate(event.startDate.toDate());
    }
  }

  // Created a property to check if the current page is the dashboard
  get isDashboardPage(): boolean {
    return this.router.url.includes('/app/dashboard');
  }
}