import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SignupUserRequest } from 'src/models/interfaces/user/SignupUserRequest';
import { Observable } from 'rxjs';
import { SignupUserResponse } from 'src/models/interfaces/user/SignupUserResponse';
import { AuthRequest } from '../../../../models/interfaces/auth/AuthRequest';
import { AuthResponse } from '../../../../models/interfaces/auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class User {
  //Injects
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  //Properties
  private readonly API_URL = environment.API_URL;

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(`${this.API_URL}/user`, requestDatas);
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas);
  }

  isLoggedIn(): boolean {
    // Check if the 'token' cookie exists
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return !!JWT_TOKEN;
  }
}
