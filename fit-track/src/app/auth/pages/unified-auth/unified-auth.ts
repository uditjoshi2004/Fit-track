import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, EyeOff, ArrowLeft } from 'lucide-angular';
import { environment } from '../../../../environments/environment';
import { NgZone } from '@angular/core';

declare var google: any;

interface EmailStatus {
  exists: boolean;
  hasPassword: boolean;
  provider: string | null;
}

@Component({
  selector: 'app-unified-auth',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './unified-auth.html',
  styleUrl: './unified-auth.css'
})
export class UnifiedAuth {
  // Form management
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  signupForm!: FormGroup;

  // State management
  currentStep: 'email' | 'password' | 'signup' | 'google-only' | '2fa' = 'email';
  isLoading = false;
  errorMessage: string | null = null;
  passwordVisible = false;
  signupPasswordVisible = false;

  // Email status
  emailStatus: EmailStatus | null = null;
  enteredEmail = '';

  twoFactorForm!: FormGroup;
  tempUserId: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    this.initializeForms();
  }

  ngAfterViewInit(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: this.handleGoogleSignIn.bind(this)
    });

    // Render Google button for initial email step
    this.renderGoogleButton('google-btn');
  }

  private initializeForms(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.twoFactorForm = this.fb.group({
      token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onEmailSubmit(): void {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.enteredEmail = this.emailForm.value.email;

    // Check email status
    this.authService.checkEmailStatus(this.enteredEmail).subscribe({
      next: (status: EmailStatus) => {
        this.emailStatus = status;
        this.isLoading = false;

        if (!status.exists) {
          // New user - show signup form
          this.currentStep = 'signup';
        } else if (status.hasPassword) {
          // Existing user with password - show password form
          this.currentStep = 'password';
        } else {
          // User exists but signed up with Google - show Google-only message
          this.currentStep = 'google-only';
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Something went wrong. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = null;

    const credentials = {
      email: this.enteredEmail,
      password: this.passwordForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.twoFactorRequired) {
          // --- THIS IS THE NEW LOGIC ---
          // 2FA is required, move to the next step
          this.tempUserId = response._id;
          this.currentStep = '2fa';
        } else {
          // No 2FA, login is complete
          this.router.navigate(['/welcome']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid password. Please try again.';
        this.isLoading = false;
      }
    });
  }

  on2faSubmit(): void {
    if (this.twoFactorForm.invalid || !this.tempUserId) return;
    this.isLoading = true;
    this.errorMessage = null;

    const token = this.twoFactorForm.value.token!;

    this.authService.loginWithTwoFactor(this.tempUserId, token).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid 2FA code.';
        this.isLoading = false;
      }
    });
  }

  onSignupSubmit(): void {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const userData = {
      email: this.enteredEmail,
      name: this.signupForm.value.name,
      password: this.signupForm.value.password
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('fit-track-token', response.token);
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  handleGoogleSignIn(response: any): void {
    this.isLoading = true;
    this.authService.googleLogin(response.credential).subscribe({
      next: () => {
        this.isLoading = false;
        this.ngZone.run(() => {
          this.router.navigate(['/welcome']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Google Sign-in failed.';
      }
    });
  }

  goBackToEmail(): void {
    this.currentStep = 'email';
    this.errorMessage = null;
    this.emailStatus = null;
    this.enteredEmail = '';
    this.emailForm.reset();
    this.passwordForm.reset();
    this.signupForm.reset();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleSignupPasswordVisibility(): void {
    this.signupPasswordVisible = !this.signupPasswordVisible;
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 'email':
        return 'Welcome to Fit-Track';
      case 'password':
        return 'Enter your password';
      case 'signup':
        return 'Create your account';
      case 'google-only':
        return 'Account found';
      default:
        return 'Welcome to Fit-Track';
    }
  }

  getStepSubtitle(): string {
    switch (this.currentStep) {
      case 'email':
        return 'Enter your email to get started';
      case 'password':
        return `Enter your password for ${this.enteredEmail}`;
      case 'signup':
        return `Complete your account setup for ${this.enteredEmail}`;
      case 'google-only':
        return `You have already signed up with Google before. Please use "Continue with Google" to sign in.`;
      default:
        return 'Enter your email to get started';
    }
  }

  private renderGoogleButton(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Clear any existing content
      element.innerHTML = '';
      // Render the Google button
      google.accounts.id.renderButton(
        element,
        { theme: 'outline', size: 'large', width: '350' }
      );
    }
  }

  triggerGoogleSignIn(): void {
    // Trigger Google Sign-In programmatically
    google.accounts.id.prompt();
  }
}
