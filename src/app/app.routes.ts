import { Routes } from '@angular/router';
import { AuthGuard } from '@core/services/auth-guard/auth-guard';
import { Home } from '@features/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@shared/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
    canActivate: [AuthGuard]
  }
];
