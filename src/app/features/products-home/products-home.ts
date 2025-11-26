import { EventProductAction } from '../../../models/interfaces/products/event/EventProductAction';
import { ProductEvent } from '../../../models/enums/products/ProductsEvent';
import { GetAllProductsResponse } from './../../../models/interfaces/products/response/GetAllProductsResponse';
import { Component, inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '@core/services/products/products';
import { ProductsImports } from '@shared/products/products-imports';
import { ProductsDataTransfer } from '@shared/services/products/products-data-transfer';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-home',
  imports: [ProductsImports.imports],
  templateUrl: './products-home.html',
  styleUrl: './products-home.scss',
  providers: [ProductsImports.providers],
  standalone: true
})
export class ProductsHome implements OnInit, OnDestroy {
  // Injects
  private readonly productsService = inject(Products);
  private readonly productsServiceDataTransfer = inject(ProductsDataTransfer);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  // Properties
  private readonly destroy$ = new Subject<void>();
  @Input() products: GetAllProductsResponse[] = [];
  private readonly productsDatasSubject = new BehaviorSubject<GetAllProductsResponse[]>([]);
  public productsDatas$ = this.productsDatasSubject.asObservable();
  public selectedProduct!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductEvent = ProductEvent.SALE_PRODUCT_EVENT;
  public metaKey = true;
  public loading = true;
  public first = 0;
  public rows = 5;
  public displayModal = false;
  public productEventDatas = {} as EventProductAction;
  public totalRecords = 0;

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.getServiceProductsData();
  }

  handleProductEvent(action: string, product?: GetAllProductsResponse): void {
    if (action && action !== '') {
      this.productEventDatas = product && product.id !== '' ? { action, product } : { action };
      this.displayModal = true;
    }
  }

  handleDeleteProduct(product_id: string, productName: string) {
    if (product_id !== '' && productName !== '') {
      this.confirmationService.confirm({
        message: `Tem certeza que quer remover esse produto ${productName}?`,
        header: 'Confirmação',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Não',
          severity: 'secondary',
          outlined: true
        },
        acceptButtonProps: {
          label: 'Sim'
        },
        accept: () => {
          this.deleteProduct(product_id);
        }
      });
    }
  }

  deleteProduct(product_id: string) {
    if (product_id) {
      this.productsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.getAPIProductsData();

              this.messageService.add({
                severity: 'sucess',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso!',
                life: 3000
              });
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover produto.',
              life: 3000
            });
          }
        });
    }
  }

  private getServiceProductsData(): void {
    this.getAPIProductsData();
  }

  getAPIProductsData() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatasSubject.next([...response]);
            this.totalRecords = response.length;
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao buscar produtos. Por favor, tente novamente mais tarde.',
            life: 3000
          });
          this.router.navigate(['/dashboard']);
        }
      });

    this.loading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
