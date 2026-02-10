import { Component } from '@angular/core';
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

constructor(private router: Router) {}

isNotLogin(): boolean {
if (this.router.url === '/login') {
return false;
}
// Leggiamo da sessionStorage
return !!sessionStorage.getItem('token');
}

isOrganizer(): boolean {
// Leggiamo da sessionStorage
const role = sessionStorage.getItem('role');
console.log('Ruolo attuale (da Session):', role);
return role === 'ORGANIZER';
}

logout() {
// Puliamo la sessione
sessionStorage.clear();
this.router.navigate(['/login']);
}
}
