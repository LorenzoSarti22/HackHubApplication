import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';

// Assicurati che ci sia 'export' davanti e che si chiami 'routes' (minuscolo)
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '/dashboard' }
];
