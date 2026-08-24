import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "@shared/header/header";
import { CartNotificationBar } from './cart/cart-notification-bar/cart-notification-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CartNotificationBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('NgLibrary');
}
