import { Routes } from '@angular/router';

export const UsersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
];
