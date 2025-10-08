import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleFitService } from '../../services/google-fit.service';


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

  statusMessage: string = 'Connecting to Google Fit, please wait...';

  ngOnInit(): void {
    // 1. Get the authorization code from the URL's query parameters
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');

      if (code) {
        // 2. If a code exists, send it to the backend
        this.googleFitService.connectAccount(code).subscribe({
          next: () => {
            // 3. On success, redirect to the dashboard
            this.statusMessage = 'Successfully connected! Redirecting...';
            setTimeout(() => this.router.navigate(['/app/dashboard']), 2000);
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
