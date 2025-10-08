import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterState {
  // Create a signal to hold the selected date range.
  // A signal notifies any part of the app that's using it whenever its value changes.
  public selectedDateRange = signal<{ key: string, label: string }>({ key: 'today', label: 'Today' });

  // Method to update the date range from anywhere in the app
  public setDateRange(range: { key: string, label: string }): void {
    this.selectedDateRange.set(range);
  }
}
