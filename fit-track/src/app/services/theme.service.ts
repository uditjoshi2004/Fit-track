import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // A signal to hold the current theme ('light' or 'dark')
  themeSignal = signal<string>('light');

  constructor() {
    // Check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      this.themeSignal.set(savedTheme);
    } else if (prefersDark) {
      this.themeSignal.set('dark');
    }

    // An effect that runs whenever the themeSignal changes
    effect(() => {
      const theme = this.themeSignal();
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Save the new theme to localStorage
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme() {
    // Update the signal to the opposite theme
    this.themeSignal.update(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  }
}
