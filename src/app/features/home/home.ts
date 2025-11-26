import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/core/services/user/user';
import { SignupUserRequest } from 'src/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/models/interfaces/auth/AuthRequest';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    // PrimeNG
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit, OnDestroy {
  //Injects
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(User);
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  //Properties
  private readonly destroy$ = new Subject<void>();
  @ViewChild('emailInput') public emailInputRef!: ElementRef;
  @ViewChild('passwordInput') public passwordInputRef!: ElementRef;
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

  ngAfterViewInit(): void {
    // this.emailInputRef.nativeElement.value = 'Seu email aqui';
    // this.passwordInputRef.nativeElement.value = 'Sua senha aqui';
    console.log('ngAfterViewInit testes');
    // console.log('emailInputRef:', this.emailInputRef.nativeElement);
    // console.log('passwordInputRef:', this.passwordInputRef.nativeElement);
  }

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
      this.userService
        .authUser(this.loginForm.value as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token, 1, '/', '', false, 'Lax');
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Login realizado com sucesso',
                detail: `Bem-vindo de Volta ${response?.name}!`,
                life: 3000
              });
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao fazer Login',
              detail: 'Verifique suas credenciais e tente novamente.',
              life: 3000
            });
          }
        });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;

              this.messageService.add({
                severity: 'success',
                summary: 'Usuário criado com sucesso!',
                detail: `Bem-vindo ${response?.name}!`,
                life: 3000
              });
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao criar usuário',
              detail: 'Verifique os dados e tente novamente.',
              life: 3000
            });
          }
        });
    }
  }

  //Lifecycle
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
