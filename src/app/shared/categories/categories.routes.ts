import { Routes } from '@angular/router';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/categories-home/categories-home').then((c) => c.CategoriesHome)
  }
];
