import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/achievements';

  getAllAchievements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
