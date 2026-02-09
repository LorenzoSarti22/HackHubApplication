import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    console.log('Chiamata al backend per:', this.loginData.username);

    // Cambiato da /api/auth/login a /api/user/login
    this.http.post<any>('/api/user/login', this.loginData).subscribe({
      next: (response) => {
        console.log('Login Successo!', response);
        // Salva il token se presente (spesso è dentro response.data o response.token)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login Fallito:', err);
        alert('Credenziali non valide!');
      }
    });
  }
}
