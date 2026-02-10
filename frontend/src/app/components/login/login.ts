import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; //
import { HttpClient, HttpClientModule } from '@angular/common/http'; //

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
this.http.post<any>('/api/user/login', this.loginData).subscribe({
next: (response: any) => { // Aggiunto :any per evitare l'errore TS7006
console.log('Risposta completa:', response);

if (response && response.data) {
const infoUtente = response.data;

if (infoUtente.token) {
sessionStorage.setItem('token', infoUtente.token);
}

if (infoUtente.role) {
sessionStorage.setItem('role', infoUtente.role);
console.log('Ruolo salvato in Session:', infoUtente.role);
}
}

this.router.navigate(['/dashboard']).then(() => {
window.location.reload();
});
},
error: (err: any) => { // Aggiunto :any per evitare l'errore TS7006
console.error('Errore durante il login:', err);
alert('Login fallito! Controlla le credenziali.');
}
});
}
}
