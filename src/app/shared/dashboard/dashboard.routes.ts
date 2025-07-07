import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/dashboard-home/dashboard-home').then((c) => c.DashboardHome)
  }
];
