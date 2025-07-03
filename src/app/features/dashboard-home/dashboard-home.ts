import { ToolbarNavigation } from './../../shared/components/toolbar-navigation/toolbar-navigation';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'app-dashboard-home',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    // PrimeNG
    DrawerModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    // Components
    ToolbarNavigation
  ],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss'
})
export class DashboardHome {
  //Injects
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);
}
