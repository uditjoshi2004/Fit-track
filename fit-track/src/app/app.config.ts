import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Import the Module and ALL the icons you need for the whole app
import { LucideAngularModule, Home, BarChart3, User, Settings, Footprints, Flame, Timer, ChevronDown, Sun, Moon, FileX2, Eye, EyeOff, LogOut, ChevronLeft, ChevronRight, Trophy, X, FileDown, Calendar, Gauge, ArrowUpRight, ArrowDownLeft, ArrowLeft, Droplet, DropletIcon, GlassWater } from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(NgxDaterangepickerMd.forRoot()),
    // Use this to make the older module pattern work with your standalone app
    importProvidersFrom(
      LucideAngularModule.pick({
        Home,
        BarChart3,
        User,
        Settings,
        Footprints,
        Flame,
        Timer,
        ChevronDown,
        Sun,
        Moon,
        FileX2,
        Eye,
        EyeOff,
        LogOut,
        ChevronLeft,
        ChevronRight,
        Trophy,
        X,
        FileDown,
        Calendar,
        Gauge,
        ArrowUpRight,
        ArrowDownLeft,
        ArrowLeft,
        GlassWater
      })
    )
  ]
};