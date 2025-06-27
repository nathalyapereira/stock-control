import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
