import { Component } from '@angular/core';
import { ProductsImports } from '@shared/products/products-imports';

@Component({
  selector: 'app-products-home',
  imports: [ProductsImports.imports],
  templateUrl: './products-home.html',
  styleUrl: './products-home.scss',
  providers: [ProductsImports.providers],
  standalone: true
})
export class ProductsHome {}
