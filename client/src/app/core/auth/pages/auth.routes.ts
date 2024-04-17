import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./logout-page/logout-page.component').then(
        (m) => m.LogoutPageComponent
      ),
  },
];
