import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from './../../../../models/interfaces/products/response/GetAllProductsResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransfer {
  // Properties
  public productsDataEmitter$ = new BehaviorSubject<GetAllProductsResponse[]>([]);
  public productsDatas: GetAllProductsResponse[] = [];

  setProductsDatas(products: GetAllProductsResponse[]): void {
    if (products) {
      this.productsDataEmitter$.next([...products]);
      this.getProductsDatas();
    }
  }

  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data.filter((product) => product.amount > 0))
      )
      .subscribe((response) => {
        if (response.length > 0) {
          this.productsDatas = response;
        }
      });
    return this.productsDatas;
  }
}
