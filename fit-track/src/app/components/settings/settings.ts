import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleFitService } from '../../services/google-fit.service';
import { Router } from '@angular/router';
import { TwoFactorAuthModal } from '../two-factor-auth-modal/two-factor-auth-modal';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, CommonModule, TwoFactorAuthModal],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  goalsForm!: FormGroup;
  isLoading = false;
  successMessage: string | null = null;

  is2faModalOpen = signal(false);
  qrCodeUrl = signal('');

  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private googleFitService = inject(GoogleFitService);
  private router = inject(Router);

  ngOnInit(): void {
    // Initialize the form with validators
    this.goalsForm = this.fb.group({
      steps: [10000, [Validators.required, Validators.min(1)]],
      caloriesBurned: [500, [Validators.required, Validators.min(1)]],
      activeMinutes: [60, [Validators.required, Validators.min(1)]],
      sleepHours: [7.5, [Validators.required, Validators.min(1)]],
      hydration: [0]
    });

    // Fetch the user's current goals and populate the form
    this.authService.getGoals().subscribe(goals => {
      if (goals) {
        this.goalsForm.patchValue(goals);
      }
    });
  }

  onSubmit(): void {
    if (this.goalsForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.successMessage = null;

    this.authService.updateGoals(this.goalsForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Goals updated successfully!';
        // Hide the message after 3 seconds
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to update goals', err);
      }
    });
  }

  disconnectGoogleFit(): void {
    if (confirm('Are you sure you want to disconnect from Google Fit? All your synced data will be deleted.')) {
      this.googleFitService.disconnect().subscribe({
        next: () => {
          alert('Successfully disconnected from Google Fit.');
          this.googleFitService.signalDisconnected();

          // Refresh user profile to update connection status
          this.authService.getProfile().subscribe({
            next: (user) => {
              this.authService.currentUser.set(user);
            },
            error: (err) => {
              console.error('Failed to refresh user profile after disconnect:', err);
            }
          });
        },
        error: (err) => alert(`Failed to disconnect: ${err.error.message}`)
      });
    }
  }

  connectGoogleFit(): void {
    this.googleFitService.redirectToGoogleAuth();
  }

  // --- Update this method ---
  enable2FA(): void {
    this.authService.generateTwoFactorSecret().subscribe({
      next: (response) => {
        // Instead of alerting, set the signals to show the modal
        this.qrCodeUrl.set(response.qrCodeUrl);
        this.is2faModalOpen.set(true);
      },
      error: (err) => {
        console.error('Failed to generate 2FA secret', err);
        alert('Error: Could not start 2FA setup.');
      }
    });
  }

  // --- Add these handler methods ---
  handle2faClose(): void {
    this.is2faModalOpen.set(false);
  }

  handle2faVerified(): void {
    this.is2faModalOpen.set(false);
    alert('2FA has been successfully enabled!');
    // Ideally, we would refresh the user's state here to update the UI
    // to show "2FA is Enabled" instead of an "Enable" button.
  }

  disable2FA(): void {
    const token = prompt('To disable 2FA, please enter the 6-digit code from your authenticator app:');

    if (token) {
      this.authService.disableTwoFactor(token).subscribe({
        next: () => {
          alert('2FA has been successfully disabled.');
        },
        error: (err) => {
          alert(`Error: ${err.error.message || 'Could not disable 2FA.'}`);
        }
      });
    }
  }
}
