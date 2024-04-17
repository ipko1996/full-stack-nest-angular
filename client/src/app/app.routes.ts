import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { PermissionDeniedComponent } from './core/pages/permission-denied/permission-denied.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/pages/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/users/pages/users.routes').then((m) => m.UsersRoutes),
  },
  {
    path: 'permission-denied',
    component: PermissionDeniedComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
  // {
  //   path: 'not-found',
  //   component: NotFoundPageComponent,
  // },
];
