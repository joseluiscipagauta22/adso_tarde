import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users', // Ruta principal de usuarios (ej: /users)
    loadComponent: () => import('./features/users/users').then(m => m.Users)
  },
  {
    path: '**',
    redirectTo: ''
  }
];