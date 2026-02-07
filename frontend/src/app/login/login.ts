import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onLogin() {
    console.log('Tentativo di login con:', this.loginData);
    // Per ora, facciamo finta che il login vada sempre bene
    // e mandiamo l'utente alla dashboard
    this.router.navigate(['/dashboard']);
  }
}
