import { GetAllProductsResponse } from './../../../../models/interfaces/products/response/GetAllProductsResponse';
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
}
