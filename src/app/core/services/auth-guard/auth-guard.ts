import { inject, Injectable } from '@angular/core';
import { User } from '../user/user';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  //Injects
  private readonly userService = inject(User);
  private readonly router = inject(Router);

  canActivate():
    | CanActivateFn
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    this.userService.isLoggedIn();
    return true;
  }
}
