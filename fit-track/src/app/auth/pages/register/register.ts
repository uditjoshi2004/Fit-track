import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { environment } from '../../../../environments/environment';
import { NgZone } from '@angular/core';
declare var google: any; // google variable for google sign-in

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  passwordVisible = false; // 3. Add visibility property
  private ngZone = inject(NgZone);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_CLIENT_ID,
      callback: this.handleGoogleSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn-register'), // Use a unique ID
      { theme: 'outline', size: 'large', width: '350' }
    );
  }

  handleGoogleSignIn(response: any): void {
    this.isLoading = true;
    this.authService.googleLogin(response.credential).subscribe({
      next: () => {
        this.isLoading = false;
        this.ngZone.run(() => {
          this.router.navigate(['app/dashboard']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Google Sign-in failed.';
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Registration successful! Please log in.');
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Add method to toggle visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
