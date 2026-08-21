import { Component, signal } from '@angular/core';
import { Login } from "../login/login";
import { Register } from "../register/register";

@Component({
  imports: [Login, Register],
  selector: 'app-login-or-register',
  styleUrl: './login-or-register.scss',
  templateUrl: './login-or-register.html',
})
export class LoginOrRegister {
  isNewUser = signal<boolean>(false);

  switchLoginRegister(event?: Event) {
    event?.preventDefault();

    this.isNewUser.set(!this.isNewUser());
  }
}
