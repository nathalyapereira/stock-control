import { CreateProductRequest } from './../../../../models/interfaces/products/request/CreateProductRequest';
import { EditProductRequest } from './../../../../models/interfaces/products/request/EditProductRequest';
import { DeleteProductResponse } from './../../../../models/interfaces/products/response/DeleteProductResponse';
import { GetAllProductsResponse } from './../../../../models/interfaces/products/response/GetAllProductsResponse';
import { SaleProductResquest } from './../../../../models/interfaces/products/request/SaleProductResquest';
import { SaleProductResponse } from './../../../../models/interfaces/products/response/SaleProductResponse';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Products {
  //Injects
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private readonly API_URL = environment.API_URL;
  private readonly JWT_TOKEN = this.cookieService.get('USER_INFO');
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  };

  getProducts(): Observable<GetAllProductsResponse[]> {
    return this.httpClient
      .get<GetAllProductsResponse[]>(`${this.API_URL}/products`, this.httpOptions)
      .pipe(map((product) => product.filter((data) => data.amount > 0)));
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.httpClient.delete<DeleteProductResponse>(`${this.API_URL}/products`, {
      ...this.httpOptions,
      params: {
        product_id
      }
    });
  }

  createProduct(requestDatas: CreateProductRequest): Observable<CreateProductRequest> {
    return this.httpClient.post<CreateProductRequest>(
      `${this.API_URL}/product`,
      requestDatas,
      this.httpOptions
    );
  }

  editProduct(requestDatas: EditProductRequest): Observable<void> {
    return this.httpClient.put<void>(
      `${this.API_URL}/product/edit`,
      requestDatas,
      this.httpOptions
    );
  }

  saleProduct(requestDatas: SaleProductResquest): Observable<SaleProductResponse> {
    return this.httpClient.put<SaleProductResponse>(
      `${this.API_URL}/product/sale`,
      { amount: requestDatas.amount },
      { ...this.httpOptions, params: { product_id: requestDatas.product_id } }
    );
  }
}
