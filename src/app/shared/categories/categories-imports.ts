import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { SharedImports } from '@shared/shared-imports';
import { ConfirmationService, FilterService } from 'primeng/api';
import { RouterModule } from '@angular/router';

export const CategoriesImports = {
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //PrimeNG
    ButtonModule,
    TableModule,
    CardModule,
    InputMaskModule,
    ToggleSwitchModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    SelectModule,
    ConfirmDialogModule,
    TooltipModule,
    // Shared
    ...SharedImports // your other shared components/modules
  ],
  providers: [DialogService, ConfirmationService, FilterService]
};
