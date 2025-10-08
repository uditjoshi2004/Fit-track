import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoogleFitService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/google-fit';
  private disconnectSubject = new Subject<void>();
  public disconnected$ = this.disconnectSubject.asObservable();
  private connectionStatusSubject = new BehaviorSubject<boolean>(true);
  public isConnected$ = this.connectionStatusSubject.asObservable();

  redirectToGoogleAuth(): void {
    const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
      redirect_uri: 'http://localhost:4200/app/google-fit-callback',
      client_id: environment.GOOGLE_CLIENT_ID,
      access_type: 'offline', // Important to get a refresh token
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.sleep.read',
        'https://www.googleapis.com/auth/fitness.body.read'
      ].join(' ')
    };

    const queryString = new URLSearchParams(options).toString();

    // Redirect the user to Google's consent screen
    window.location.href = `${authUrl}?${queryString}`;
  }

  connectAccount(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/connect`, { code });
  }

  getTodaysData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/today`);
  }

  disconnect(): Observable<any> {
    return this.http.post(`${this.apiUrl}/disconnect`, {});
  }

  signalDisconnected(): void {
    this.disconnectSubject.next();
    this.connectionStatusSubject.next(false);
  }

  setConnectionStatus(isConnected: boolean): void {
    this.connectionStatusSubject.next(isConnected);
  }

  getIntradayData(date: Date, type: 'steps' | 'calories' | 'activeMinutes'): Observable<any[]> {
    const dateString = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get<any[]>(`${this.apiUrl}/intraday?date=${dateString}&type=${type}`);
  }
}
