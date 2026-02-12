import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, RouterModule], // Add RouterModule here
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    registerData = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        birthDate: '',
        gender: 'MALE',
        role: 'STUDENT',
        photoUrl: '' // Optional or default
    };
    errorMessage: string = '';

    constructor(private http: HttpClient, private router: Router) { }

    onRegister() {
        this.http.post('/api/user/signup', this.registerData).subscribe({
            next: (response: any) => {
                console.log('Registration successful', response);
                // Redirect to login after successful registration
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Registration failed', error);
                this.errorMessage = 'Registrazione fallita. Riprova.';
                if (error.error && error.error.message) {
                    this.errorMessage = error.error.message;
                }
            }
        });
    }
}
