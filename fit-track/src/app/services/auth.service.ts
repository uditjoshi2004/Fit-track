import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Define an interface for the User object for type safety
export interface User {
  _id: string; name: string; email: string; height?: number;
  weight?: number; avatarUrl?: string; goals?: any; achievements?: any[];
  provider?: string; isGoogleFitConnected?: boolean; isTwoFactorEnabled?: boolean;
}

// Define interface for email status check
export interface EmailStatus {
  exists: boolean;
  hasPassword: boolean;
  provider: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api/users';

  currentUser = signal<User | null | undefined>(undefined);
  authStatus = signal<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  constructor() {
    this.loadUserOnStartup();
  }

  private loadUserOnStartup(): void {
    const token = this.getToken();
    if (token) {
      this.getProfile().subscribe({
        next: user => {
          this.currentUser.set(user);
          this.authStatus.set('authenticated');
        },
        error: () => {
          localStorage.removeItem('fit-track-token');
          this.currentUser.set(null);
          this.authStatus.set('unauthenticated');
        }
      });
    } else {
      this.currentUser.set(null);
      this.authStatus.set('unauthenticated');
    }
  }

  // Helper to centralize session logic
  private setSession(response: any): void {
    if (response.token) {
      localStorage.setItem('fit-track-token', response.token);
      const user: User = {
        _id: response._id,
        name: response.name,
        email: response.email,
        avatarUrl: response.avatarUrl,
        provider: response.provider,
        isGoogleFitConnected: response.isGoogleFitConnected
      };
      this.currentUser.set(user);
      this.authStatus.set('authenticated');
    }
  }

  // New method to get the user's profile
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  // New method to check email status for unified auth flow
  checkEmailStatus(email: string): Observable<EmailStatus> {
    return this.http.post<EmailStatus>(`${this.apiUrl}/check-email`, { email });
  }

  // Your existing register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.setSession(response))
    );
  }

  logout(): void {
    localStorage.removeItem('fit-track-token');
    this.currentUser.set(null);
    this.authStatus.set('unauthenticated');
    this.router.navigate(['/auth']);
  }

  // Your existing isLoggedIn method
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // A helper to get the token
  private getToken(): string | null {
    return localStorage.getItem('fit-track-token');
  }

  googleLogin(credential: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/google`, { token: credential }).pipe(
      tap(response => this.setSession(response))
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgotpassword`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/resetpassword/${token}`, { password });
  }

  // Get the current user's goals
  getGoals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/goals`);
  }

  // Update the user's goals
  updateGoals(goals: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/goals`, goals);
  }

  updateProfile(profileData: { name: string; height: number; weight: number }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, profileData).pipe(
      tap(updatedUser => {
        // Update the local user signal with the all new info
        this.currentUser.update(user =>
          user ? {
            ...user,
            name: updatedUser.name,
            height: updatedUser.height,
            weight: updatedUser.weight
          } : null
        );
      })
    );
  }

  // method to change user password
  changePassword(passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, passwordData);
  }


  // NEW: Upload user avatar
  uploadAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);

    // The upload URL is different, so we define it here
    const uploadUrl = 'http://localhost:3000/api/upload/avatar';

    return this.http.post<any>(uploadUrl, formData).pipe(
      tap(response => {
        // After a successful upload, update the current user's avatar URL
        this.currentUser.update(user => user ? { ...user, avatarUrl: response.url } : null);
      })
    );
  }

  // Generates the 2FA secret and returns the QR code data URL from the backend
  generateTwoFactorSecret(): Observable<{ qrCodeUrl: string }> {
    return this.http.post<{ qrCodeUrl: string }>(`${this.apiUrl}/2fa/generate`, {});
  }

  // Verifies the 6-digit token to complete the 2FA setup
  verifyTwoFactorToken(token: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/2fa/verify`, { token });
  }

  loginWithTwoFactor(userId: string, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/2fa/login`, { userId, token }).pipe(
      tap(response => this.setSession(response))
    );
  }

  // Disables 2FA by sending a final verification token
  disableTwoFactor(token: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/2fa/disable`, { token }).pipe(
      tap(updatedUser => {
        // Update the currentUser signal with the fresh user data from the backend
        this.currentUser.set(updatedUser);
      })
    );
  }

}