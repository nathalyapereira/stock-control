import { GetAllProductsResponse } from './../../../models/interfaces/products/response/GetAllProductsResponse';
import { Component, inject, OnInit } from '@angular/core';
import { Products } from '@core/services/products/products';
import { DashboardImports } from '@shared/dashboard/dashboard-imports';
import { ProductsDataTransfer } from '@shared/services/products/products-data-transfer';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard-home',
  imports: [...DashboardImports.imports],
  templateUrl: './dashboard-home.html',
  providers: [DashboardImports.providers]
})
export class DashboardHome implements OnInit {
  //Injects
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);
  private readonly productsService = inject(Products);
  private readonly productsDataTransfer = inject(ProductsDataTransfer);

  //Properties
  public listProducts: GetAllProductsResponse[] = [];

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.listProducts = response;
          this.productsDataTransfer.setProductsDatas(this.listProducts);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao buscar produtos!',
          life: 3000
        });
      }
    });
  }
}
