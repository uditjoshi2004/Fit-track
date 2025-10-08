import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { environment } from '../../../../environments/environment';
import { NgZone } from '@angular/core';

declare var google: any; // google variable for google sign-in

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  passwordVisible = false; // 3. Add visibility property

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Save the token to localStorage
        localStorage.setItem('fit-track-token', response.token);
        // Navigate to the main application dashboard
        this.router.navigate(['/app/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // 4. Add method to toggle visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngAfterViewInit(): void {
    // Initialize the Google button
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: this.handleGoogleSignIn.bind(this)
    });

    // Render the button in our template
    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', width: '350' }
    );
  }

  // ... inside LoginComponent class
  handleGoogleSignIn(response: any): void {
    this.isLoading = true;
    this.authService.googleLogin(response.credential).subscribe({
      next: () => {
        this.isLoading = false;
        this.ngZone.run(() => {
          this.router.navigate(['/app/dashboard']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Google Sign-in failed.';
      }
    });
  }
}
