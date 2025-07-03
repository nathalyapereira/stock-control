import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  templateUrl: './toolbar-navigation.html',
  styleUrl: './toolbar-navigation.scss'
})
export class ToolbarNavigation {}
