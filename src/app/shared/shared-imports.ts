import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarNavigation } from '@shared/components/toolbar-navigation/toolbar-navigation';

export const SharedImports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  //PrimeNG
  ToolbarModule,
  CardModule,
  ButtonModule,
  // Components
  ToolbarNavigation
];
