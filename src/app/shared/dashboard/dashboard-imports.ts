import { DialogService } from 'primeng/dynamicdialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { SharedImports } from '@shared/shared-imports';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';

export const DashboardImports = {
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //PrimeNG
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    ChartModule,
    DrawerModule,
    ...SharedImports // your other shared components/modules
  ],
  providers: [CurrencyPipe, DialogService]
};
