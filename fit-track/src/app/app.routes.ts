import { Routes } from '@angular/router';

// Layouts
import { Main } from './layout/main/main';
import { Auth } from './layout/auth/auth';

// Pages
import { Dashboard } from './components/dashboard/dashboard';
import { Settings } from './components/settings/settings';
import { Profile } from './components/profile/profile';
import { Register } from './auth/pages/register/register';
import { Login } from './auth/pages/login/login';
import { UnifiedAuth } from './auth/pages/unified-auth/unified-auth';
import { authGuard } from './auth/auth-guard';
import { publicGuard } from './auth/public-guard';
import { ForgotPassword } from './auth/pages/forgot-password/forgot-password';
import { ResetPassword } from './auth/pages/reset-password/reset-password';
import { GoogleFitCallback } from './pages/google-fit-callback/google-fit-callback';
import { Reports } from './pages/reports/reports';
import { WeightTracking } from './pages/weight-tracking/weight-tracking';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth,
        canActivate: [publicGuard], // 2. Apply the guard here
        children: [
            { path: 'register', component: Register },
            { path: 'login', component: Login },
            { path: 'unified', component: UnifiedAuth },
            { path: 'forgot-password', component: ForgotPassword },
            { path: 'reset-password/:token', component: ResetPassword },
            { path: '', redirectTo: 'unified', pathMatch: 'full' }
        ]
    },

    {
        path: 'app',
        component: Main,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'profile', component: Profile },
            { path: 'settings', component: Settings },
            { path: 'google-fit-callback', component: GoogleFitCallback },
            { path: 'reports', component: Reports },
            { path: 'weight', component: WeightTracking },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    // Default route for the entire application
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    // Wildcard route
    { path: '**', redirectTo: 'auth' }
];