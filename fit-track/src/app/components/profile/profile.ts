import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy } from 'lucide-angular';
import { AchievementService } from '../../services/achievement.service';
import { AvatarCropModal } from "../avatar-crop-modal/avatar-crop-modal";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, AvatarCropModal],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  user: User | null | undefined;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  profileMessage: { type: 'success' | 'error', text: string } | null = null;
  passwordMessage: { type: 'success' | 'error', text: string } | null = null;

  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private achievementService = inject(AchievementService); // Inject new service

  allAchievements: any[] = [];
  earnedBadgeIds = new Set<string>();
  showCropModal = false; // Property to control modal visibility

  ngOnInit(): void {
    // Get current user from the service
    this.user = this.authService.currentUser();

    // Initialize profile form
    this.profileForm = this.fb.group({
      name: [this.user?.name || '', [Validators.required]],
      email: [{ value: this.user?.email || '', disabled: true }], // Email is not editable
      height: [this.user?.height || '', [Validators.min(1)]], // For height
      weight: [this.user?.weight || '', [Validators.min(1)]], // For weight
    });

    // Initialize password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Fetch all possible achievements
    this.achievementService.getAllAchievements().subscribe(achievements => {
      this.allAchievements = achievements;
    });

    // Get the IDs of the badges the user has already earned
    const earnedBadges = this.authService.currentUser()?.achievements || [];
    this.earnedBadgeIds = new Set(earnedBadges.map(b => b.badgeId));
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) return;
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => this.showMessage('profile', 'success', 'Profile updated successfully!'),
      error: (err) => this.showMessage('profile', 'error', err.error.message || 'Failed to update profile.')
    });
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.invalid) return;
    this.authService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.showMessage('password', 'success', 'Password changed successfully!');
        this.passwordForm.reset();
      },
      error: (err) => this.showMessage('password', 'error', err.error.message || 'Failed to change password.')
    });
  }

  private showMessage(form: 'profile' | 'password', type: 'success' | 'error', text: string): void {
    if (form === 'profile') {
      this.profileMessage = { type, text };
      setTimeout(() => this.profileMessage = null, 3000);
    } else {
      this.passwordMessage = { type, text };
      setTimeout(() => this.passwordMessage = null, 3000);
    }
  }

  // This method is called when the user selects a file
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // NEW: This method is called when the user clicks "Save Picture"
  onAvatarUpload(): void {
    if (!this.selectedFile) return;

    this.authService.uploadAvatar(this.selectedFile).subscribe({
      next: () => {
        this.showMessage('profile', 'success', 'Profile picture updated!');
        this.selectedFile = null;
        this.imagePreview = null;
      },
      error: (err) => {
        this.showMessage('profile', 'error', err.error.message || 'Upload failed.');
      }
    });
  }

  // This method is called by the modal's (imageCropped) event
  onImageCropped(imageBlob: Blob): void {
    const imageFile = new File([imageBlob], "avatar.png", { type: "image/png" });
    this.authService.uploadAvatar(imageFile).subscribe({
      next: () => this.showMessage('profile', 'success', 'Profile picture updated!'),
      error: (err) => this.showMessage('profile', 'error', err.error.message || 'Upload failed.')
    });
  }
}
