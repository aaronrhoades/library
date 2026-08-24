import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../cart-service';
import { IBook } from '@models/iBook';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { I18nPluralPipe } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  imports: [RouterLink, I18nPluralPipe],
  selector: 'app-cart-notification-bar',
  styleUrl: './cart-notification-bar.scss',
  templateUrl: './cart-notification-bar.html',
})
export class CartNotificationBar implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);
  cart = this.cartService.cart;//signal<IBook | null>(null);
  isCartPage = signal<boolean>(false);
  itemMapping: { [k: string]: string } = {
    '=0': 'items',
    '=1': 'item',
    'other': 'items' // The '#' symbol automatically injects the count
  };

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe({
      next: route => {
        if(route.urlAfterRedirects === '/cart') {
          this.isCartPage.set(true);
        } else {
          this.isCartPage.set(false);
        }
      }
    });
  }
}
