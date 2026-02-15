import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isEventsMenuOpen = false;

  constructor(public router: Router) { }

  toggleEventsMenu() {
    this.isEventsMenuOpen = !this.isEventsMenuOpen;
  }

  isNotLogin(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }

  isOrganizer(): boolean {
    const userInfo = this.getUserInfo();
    return userInfo?.role === 'ORGANIZER';
  }

  getUserInfo(): { username: string, role: string } | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Check expiration
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        this.logout();
        return null;
      }

      // Read role from claim
      return { username: payload.sub, role: payload.role };
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
