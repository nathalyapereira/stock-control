import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule,
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  loginCard = true;

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginCard
      ? this.loginForm.get('email')
      : this.signupForm.get('email');
  }

  get password() {
    return this.loginCard
      ? this.loginForm.get('password')
      : this.signupForm.get('password');
  }

  get name() {
    return this.signupForm.get('name');
  }

  onChangeCard(): void {
    this.loginCard = !this.loginCard;
    this.clearCard();
  }

  clearCard(): void {
    this.loginForm.reset();
    this.signupForm.reset();
  }

  onSubmitLoginForm(): void {
    console.log('Dados Login', this.loginForm.value);
  }

  onSubmitSignupForm(): void {
    console.log('Dados Signup', this.signupForm.value);
  }
}
