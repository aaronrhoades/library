import { Component, inject, output, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../auth-service';

@Component({
  imports: [FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  authService = inject(AuthService);
  registrationComplete = output<boolean>();
  registerModel = signal<IRegistration>({
    email: '',
    userName: '',
    password: ''
  });

  registerForm = form(this.registerModel, schema => {
    required(schema.email),
    required(schema.userName),
    required(schema.password)
  })

  onSubmit(event: Event) {
    event.preventDefault();
    const formValue = this.registerForm().value();
    this.authService.register(formValue).subscribe(
      {
        next: () => {
          this.registrationComplete.emit(true);
        },
        error: (err) => console.log('registration failed', err)
      }
    );
  }
}
