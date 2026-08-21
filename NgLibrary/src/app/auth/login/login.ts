import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ILogin } from '@models/iLogin';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  authService = inject(AuthService);
  private router = inject(Router);
  loginModel = signal<ILogin>({
    email: '',
    password: ''
  });
  loginForm = form(this.loginModel, (schema) => {
    required(schema.email),
    required(schema.password)
  });
  loginError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const loginModelEffect = this.loginModel(); //reacting to this signal
      this.loginError.set(null);
    })
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({next: (isLoggedIn) => {
      if(isLoggedIn) {
        this.router.navigate(['/books']);
      }
    }});
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const formValue = this.loginForm().value();
    this.authService.login(formValue).subscribe({
      next: val => {
        console.log('logged in successfully', val);
        this.router.navigate(['/books']);
      },
      error: err => {
        if (err?.error?.status === 401) {
          this.loginError.set('Incorrect username or password');
          console.log('401 error found');
        }
      }
    });
  }
}
