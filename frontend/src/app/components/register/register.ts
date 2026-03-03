import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlatformRoles } from '../../enums/platform-roles';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
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
        role: PlatformRoles.STUDENT,
        photoUrl: ''
    };
    errorMessage: string = '';

    roles = Object.values(PlatformRoles);

    constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

    onRegister() {
        this.http.post('/api/user/signup', this.registerData).subscribe({
            next: (response: any) => {
                console.log('Registration successful', response);
                this.cdr.detectChanges();
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Registration failed', error);
                this.errorMessage = 'Registrazione fallita. Riprova.';
                if (error.error && error.error.message) {
                    this.errorMessage = error.error.message;
                    const msg = error.error.message;
                    if (msg.includes('users_email_key')) {
                        this.errorMessage = "L'indirizzo email inserito è già in uso.";
                    } else if (msg.includes('users_username_key')) {
                        this.errorMessage = "L'username inserito è già in uso.";
                    } else {
                        this.errorMessage = msg;
                    }
                }
                this.cdr.detectChanges();
            }
        });
    }
}
