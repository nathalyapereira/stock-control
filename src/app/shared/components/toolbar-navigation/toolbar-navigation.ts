import { ProductEvent } from './../../../../models/enums/products/ProductsEvent';
import { GetAllProductsResponse } from './../../../../models/interfaces/products/response/GetAllProductsResponse';
import { EventProductAction } from './../../../../models/interfaces/products/event/EventProductAction';
import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '@core/services/products/products';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { SharedImports } from '@shared/shared-imports';

@Component({
  selector: 'app-toolbar-navigation',
  imports: SharedImports,
  templateUrl: './toolbar-navigation.html',
  standalone: true
})
export class ToolbarNavigation implements OnDestroy {
  // Injects
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly productsService = inject(Products);
  private readonly messageService = inject(MessageService);

  // Properties
  private readonly destroy$ = new Subject<void>();
  @Output() getProductsDatas = new EventEmitter<void>();
  public displayModal = false;
  public loading = false;
  public productsDatas$!: Observable<GetAllProductsResponse[]>;

  public productEventDatas = {} as EventProductAction;

  handleLogout(): void {
    this.cookieService.delete('USER_INFO');
    this.router.navigate(['/home']);
  }

  handleSaleProduct() {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;
    this.productEventDatas = { action: saleProductAction };
    this.displayModal = true;
  }

  getAPIProductsData() {
    this.getProductsDatas.emit();
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
