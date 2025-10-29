import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy } from 'lucide-angular';
import { AchievementService } from '../../services/achievement.service';
import { AvatarCropModal } from "../avatar-crop-modal/avatar-crop-modal";
import { UserAchievement } from '../../models/achievement.model';
import { format } from 'date-fns';

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

  // --- ADD THESE SIGNALS ---
  public achievements = signal<UserAchievement[]>([]);
  public isLoadingAchievements = signal(true);

  allAchievements: any[] = [];
  earnedBadgeIds = new Set<string>();
  showCropModal = false; // Property to control modal visibility

  ngOnInit(): void {
    // Get current user from the service
    this.user = this.authService.currentUser();

    // Initialize profile form with all fields
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      height: [''],
      dateOfBirth: [''],
      gender: [''],
    });

    // Initialize password form
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Load profile data after form initialization
    this.loadProfileData();

    this.authService.getAchievements().subscribe({
      next: (data) => {
        this.achievements.set(data);
        this.isLoadingAchievements.set(false);
      },
      error: (err) => {
        console.error('Failed to load achievements', err);
        this.isLoadingAchievements.set(false);
      }
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) return;
    this.authService.updateProfile(this.profileForm.value).subscribe({
      // --- MODIFY THIS 'next' HANDLER ---
      next: (updatedUser) => {
        this.authService.currentUser.set(updatedUser); // This updates your app state
        this.showMessage('profile', 'success', 'Profile updated successfully!');
      },
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

  // Load profile data into the form
  loadProfileData(): void {
    if (this.user) {
      // Format the date for the <input type="date"> 
      const formattedDob = this.user.dateOfBirth
        ? format(new Date(this.user.dateOfBirth), 'yyyy-MM-dd')
        : '';

      this.profileForm.patchValue({
        name: this.user.name || '',
        email: this.user.email || '',
        height: this.user.height || '',
        dateOfBirth: formattedDob,
        gender: this.user.gender || ''
      });
    }
  }
}
