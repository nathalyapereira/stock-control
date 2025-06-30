import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/core/services/user/user';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/core/services/auth/AuthRequest';

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
    RippleModule
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers: [CookieService]
})
export class Home {
  //Injects
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(User);
  private readonly cookieService = inject(CookieService);

  //Properties
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signupForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getError(fieldName: string, article: string, controlName: string): string {
    const control = this.loginCard
      ? this.loginForm.get(controlName)
      : this.signupForm.get(controlName);
    if (!control?.errors) return '';

    if (control.errors['required']) return `${fieldName} é obrigatóri${article}.`;
    if (control.errors['email']) return `Formato de ${fieldName} inválid${article}.`;
    if (control.errors['minlength']) {
      const required = control.errors['minlength'].requiredLength;
      return `Mínimo de ${required} caracteres.`;
    }

    return `${fieldName} inválid${article}.`;
  }

  get email() {
    return this.loginCard ? this.loginForm.get('email') : this.signupForm.get('email');
  }

  get password() {
    return this.loginCard ? this.loginForm.get('password') : this.signupForm.get('password');
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
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            alert('Usuário teste logado com sucesso!');
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
          }
        }
      });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignupUserRequest).subscribe({
        next: (response) => {
          if (response) {
            alert('Usuário teste criado com sucesso!');
            this.signupForm.reset();
            this.loginCard = true;
          }
        },
        error: (err) => console.log(err)
      });
    }
  }
}
