import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleFitService } from '../../services/google-fit.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-google-fit-callback',
  imports: [],
  templateUrl: './google-fit-callback.html',
  styleUrl: './google-fit-callback.css'
})
export class GoogleFitCallback {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private googleFitService = inject(GoogleFitService);
  private authService = inject(AuthService);

  statusMessage: string = 'Connecting to Google Fit, please wait...';

  ngOnInit(): void {
    // 1. Get the authorization code from the URL's query parameters
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');

      if (code) {
        // 2. If a code exists, send it to the backend
        this.googleFitService.connectAccount(code).subscribe({
          next: () => {
            // 3. On success, refresh user profile and update connection status
            this.statusMessage = 'Successfully connected! Updating profile...';
            
            // Refresh user profile to get updated Google Fit connection status
            this.authService.getProfile().subscribe({
              next: (user) => {
                // Update the current user with the new connection status
                this.authService.currentUser.set(user);
                // Signal that Google Fit is now connected
                this.googleFitService.setConnectionStatus(true);
                
                this.statusMessage = 'Successfully connected! Redirecting...';
                setTimeout(() => this.router.navigate(['/app/dashboard']), 2000);
              },
              error: (err) => {
                console.error('Failed to refresh user profile:', err);
                this.statusMessage = 'Connected but failed to update profile. Redirecting...';
                setTimeout(() => this.router.navigate(['/app/dashboard']), 2000);
              }
            });
          },
          error: (err) => {
            this.statusMessage = `Error: ${err.error.message || 'Failed to connect.'}`;
          }
        });
      } else {
        this.statusMessage = 'Error: No authorization code found.';
      }
    });
  }
}
