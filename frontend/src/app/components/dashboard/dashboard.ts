import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  activeEventsCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('/api/event/active').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.activeEventsCount = response.data.length;
        }
      },
      error: (err) => console.error('Error fetching active events count', err)
    });
  }

  get isOrganizer(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const role = payload.role || payload.roles || payload.authorities;

      // Check if role is exactly 'ORGANIZER' or check generic equality if casing differs
      // Backend enum is 'ORGANIZER'
      return role === 'ORGANIZER';
    } catch (e) {
      return false;
    }
  }

}
