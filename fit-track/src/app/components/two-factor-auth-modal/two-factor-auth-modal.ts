import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-two-factor-auth-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './two-factor-auth-modal.html',
  styleUrl: './two-factor-auth-modal.css'
})
export class TwoFactorAuthModal {
  @Input() qrCodeUrl: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() verified = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  verifyForm = this.fb.group({
    token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  onVerify(): void {
    if (this.verifyForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const token = this.verifyForm.value.token!;
    this.authService.verifyTwoFactorToken(token).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.verified.emit(); // Signal to the parent component that 2FA is enabled
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message || 'Invalid code. Please try again.');
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
