import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // If the user is already logged in, redirect them to the dashboard
    router.navigate(['/app/dashboard']);
    return false; // Block access to the auth page
  } else {
    // If the user is not logged in, allow access
    return true;
  }
};
