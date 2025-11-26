import { GetAllCategoriesResponse } from '../../../../models/interfaces/categories/response/GetAllCategoriesResponse';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Categories {
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

  getAllCategories(): Observable<GetAllCategoriesResponse[]> {
    return this.httpClient.get<GetAllCategoriesResponse[]>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  deleteCategory(category_id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        category_id
      }
    });
  }

  createCategory(requestDatas: { name: string }): Observable<GetAllCategoriesResponse> {
    return this.httpClient.post<GetAllCategoriesResponse>(
      `${this.API_URL}/category`,
      requestDatas,
      this.httpOptions
    );
  }

  editCategory(requestDatas: { name: string; category_id: string }): Observable<void> {
    return this.httpClient.put<void>(
      `${this.API_URL}/category/edit`,
      { name: requestDatas?.name },

      {
        ...this.httpOptions,
        params: {
          category_id: requestDatas.category_id
        }
      }
    );
  }
}
