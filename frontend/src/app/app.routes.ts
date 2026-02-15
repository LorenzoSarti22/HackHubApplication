import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { GestioneEventi } from './components/organizzatore/gestioneEventi/gestioneEventi';
import { Register } from './components/register/register';
import { ActiveHackathons } from './components/activeHackathons/activeHackathons';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'activeHackathons', component: ActiveHackathons },
  { path: 'gestioneEventi', component: GestioneEventi },
  { path: '**', redirectTo: '/dashboard' }
];

