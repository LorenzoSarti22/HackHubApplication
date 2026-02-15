import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = {
    username: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  onLogin() {
    this.errorMessage = null;
    this.http.post<any>('/api/user/login', this.loginData).subscribe({
      next: (response) => {
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        } else {
          console.log('Login successful but no token found in expected path', response);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login fallito. Controlla le credenziali.';
        this.cdr.detectChanges();
      }
    });
  }
}
