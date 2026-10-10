import { Component, effect, inject, OnInit, output, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../auth-service';
import { IRole } from '@models/iRole';
import { IRegistration } from '@models/iRegistration';

@Component({
  imports: [FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements OnInit {
  authService = inject(AuthService);
  registrationComplete = output<boolean>();
  roles = signal<IRole[]>([]);
  registerModel = signal<IRegistration>({
    email: '',
    userName: '',
    password: '',
    role: 'Customer'
  });
  errors = signal<string | null>(null);
  private errorEffect = effect(() => {
    this.registerModel()
    this.errors.set(null);
  });
  registerForm = form(this.registerModel, schema => {
    required(schema.email),
    required(schema.userName),
    required(schema.password)
  });
  ngOnInit() {
    this.authService.getAllRoles().subscribe({
      next: roles => {
        this.roles.set(roles);
        if (roles.length > 0 && !this.registerModel().role) {
          this.registerModel.update(model => ({ ...model, role: roles[0].name ?? '' }));
        }
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const formValue = this.registerForm().value();
    this.authService.register(formValue).subscribe(
      {
        next: () => {
          this.registrationComplete.emit(true);
        },
        error: (err) => {
          this.errors.set(err.error.message);
        }
      }
    );
  }
}
