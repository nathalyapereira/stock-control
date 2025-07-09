import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/products-home/products-home').then((c) => c.ProductsHome)
  }
];
