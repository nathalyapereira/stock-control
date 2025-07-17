import { GetAllProductsResponse } from './../../../models/interfaces/products/response/GetAllProductsResponse';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '@core/services/products/products';
import { ProductsImports } from '@shared/products/products-imports';
import { ProductsDataTransfer } from '@shared/services/products/products-data-transfer';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-home',
  imports: [ProductsImports.imports],
  templateUrl: './products-home.html',
  styleUrl: './products-home.scss',
  providers: [ProductsImports.providers],
  standalone: true
})
export class ProductsHome implements OnInit {
  // Injects
  private readonly productsService = inject(Products);
  private readonly productsServiceDataTransfer = inject(ProductsDataTransfer);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  // Properties
  private readonly destroy$ = new Subject<void>();
  public productsDatas: GetAllProductsResponse[] = [];
  public selectedProduct!: GetAllProductsResponse;
  public metaKey = true;
  public loading = true;

  ngOnInit(): void {
    this.getServiceProductsData();
    this.loading = false;
  }

  private getServiceProductsData(): void {
    const productsLoaded = this.productsServiceDataTransfer.getProductsDatas();

    if (productsLoaded.length > 0) {
      this.productsDatas = productsLoaded;
    } else {
      this.getAPIProductsData();
    }
  }

  getAPIProductsData() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
          }
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao buscar produtos. Por favor, tente novamente mais tarde.',
            life: 3000
          });
          this.router.navigate(['/dashboard']);
        }
      });
  }

  addProduct(product?: GetAllProductsResponse) {
    console.warn('Add', product?.name);
  }
}
