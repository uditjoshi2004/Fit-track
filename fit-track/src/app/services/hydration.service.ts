import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HydrationEntry } from '../models/hydration.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HydrationService {
  private http = inject(HttpClient);
  private API_URL = `${environment.apiUrl}/api/hydration`;

  /**
   * Fetches all hydration entries for the logged-in user.
   * The auth interceptor will automatically add the JWT token.
   */
  getHydrationData(): Observable<HydrationEntry[]> {
    return this.http.get<HydrationEntry[]>(this.API_URL);
  }
}
