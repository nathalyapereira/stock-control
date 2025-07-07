import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar-navigation',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    // PrimeNG
    ToolbarModule,
    ButtonModule
  ],
  templateUrl: './toolbar-navigation.html'
})
export class ToolbarNavigation {
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  handleLogout(): void {
    this.cookieService.delete('USER_INFO');
    this.router.navigate(['/home']);
  }
}
