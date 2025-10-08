import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular'; // Simplified import
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  themeService = inject(ThemeService);
  authService = inject(AuthService);

  // Add this new method
  logout(): void {
    if (window.confirm('Are you sure you want to log out?')) {
      this.authService.logout();
    }
  }
}
