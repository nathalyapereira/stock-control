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
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('@shared/dashboard/dashboard-module').then((m) => m.DashboardModule),
  //   canActivate: [AuthGuard]
  // }
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@features/dashboard-home/dashboard-home').then((m) => m.DashboardHome),
    canActivate: [AuthGuard]
  }
];
