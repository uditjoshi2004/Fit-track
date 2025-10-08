import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DailyActivity } from '../models/fitness-data.model';
import { subDays, format } from 'date-fns'; // Import date-fns helpers

@Injectable({
  providedIn: 'root'
})
export class FitnessDataService {
  // 2. Inject HttpClient
  private http = inject(HttpClient);
  // 3. Define the URL of your new API
  private apiUrl = 'http://localhost:3000/api/activities';

  getActivities(startDate: Date, endDate: Date): Observable<DailyActivity[]> {
    const start = format(startDate, 'yyyy-MM-dd');
    const end = format(endDate, 'yyyy-MM-dd');

    return this.http.get<DailyActivity[]>(`${this.apiUrl}?startDate=${start}&endDate=${end}`);
  }

  getActivityForDate(date: string): Observable<DailyActivity | null> {
    return this.http.get<DailyActivity | null>(`${this.apiUrl}/by-date?date=${date}`);
  }
}
