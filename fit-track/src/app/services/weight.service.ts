import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WeightEntry } from '../models/weight.model';

@Injectable({
  providedIn: 'root'
})
export class WeightService {
  private http = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/api/weight`;

  /**
   * Fetches all weight entries for the logged-in user.
   * The auth interceptor will automatically add the JWT token.
   */
  getWeightData(): Observable<WeightEntry[]> {
    return this.http.get<WeightEntry[]>(this.API_URL);
  }
}
