import { Injectable, signal } from '@angular/core';
import { addDays, subDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateStateService {

  public selectedDate = signal(new Date());

  goToPreviousDay(): void {
    this.selectedDate.update(currentDate => subDays(currentDate, 1));
  }

  goToNextDay(): void {
    this.selectedDate.update(currentDate => addDays(currentDate, 1));
  }
  
  setDate(newDate: Date): void {
    this.selectedDate.set(newDate);
  }
}
