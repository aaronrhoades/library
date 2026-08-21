import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../cart-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { IBook } from '@models/iBook';
import { CartItem } from '../cart-item/cart-item';
import { RouterLink } from "@angular/router";

@Component({
  imports: [CartItem, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart implements OnInit{
  cartService = inject(CartService);
  cart$ = toObservable(this.cartService.cart);
  cart = signal<IBook[]>([]);

  ngOnInit() {
    this.cart$.subscribe({
      next: value => this.cart.set(value)
    });
  }
}
