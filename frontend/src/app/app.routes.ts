import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { GestioneEventi } from './components/organizzatore/gestioneEventi/gestioneEventi';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'gestioneEventi', component: GestioneEventi },
  { path: '**', redirectTo: '/dashboard' }
];

