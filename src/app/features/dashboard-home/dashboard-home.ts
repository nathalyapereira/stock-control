import { isPlatformBrowser } from '@angular/common';
import { GetAllProductsResponse } from './../../../models/interfaces/products/response/GetAllProductsResponse';
import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { Products } from '@core/services/products/products';
import { DashboardImports } from '@shared/dashboard/dashboard-imports';
import { ProductsDataTransfer } from '@shared/services/products/products-data-transfer';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  imports: [...DashboardImports.imports],
  templateUrl: './dashboard-home.html',
  providers: [DashboardImports.providers]
})
export class DashboardHome implements OnInit, OnDestroy {
  //Injects
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);
  private readonly productsService = inject(Products);
  private readonly productsDataTransfer = inject(ProductsDataTransfer);
  private readonly cd = inject(ChangeDetectorRef);

  //Properties
  private readonly destroy$ = new Subject<void>();
  public listProducts: GetAllProductsResponse[] = [];
  public basicData: unknown;
  public basicOptions: unknown;

  platformId = inject(PLATFORM_ID);

  themeEffect = effect(() => {
    if (this.listProducts.length) {
      this.setProductsChartConfig();
    }
  });

  //Lifecycle
  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.listProducts = response;
            this.productsDataTransfer.setProductsDatas(this.listProducts);
            this.setProductsChartConfig();
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

  setProductsChartConfig(): void {
    console.log('Setting products chart configuration...');
    if (!isPlatformBrowser(this.platformId) && this.listProducts.length > 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Nenhum produto encontrado para exibir no gráfico.',
        life: 3000
      });
      return;
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.basicData = {
      labels: this.listProducts.map((product) => product.name),
      datasets: [
        {
          label: 'Quantidade',
          data: this.listProducts.map((product) => product.amount),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          backgroundHoverColor: documentStyle.getPropertyValue('--indigo-500'),
          tension: 0.4
        }
      ]
    };

    this.basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: '0.8',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scale: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: { weight: '500' }
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            font: { weight: '500' }
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
    this.cd.markForCheck();
  }

  //Lifecycle
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
