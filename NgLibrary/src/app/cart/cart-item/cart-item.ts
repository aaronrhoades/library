import { Component, inject, input } from '@angular/core';
import { IBook } from '@models/iBook';
import { CartService } from '../cart-service';

@Component({
  imports: [],
  selector: 'app-cart-item',
  styleUrl: './cart-item.scss',
  templateUrl: './cart-item.html',
})
export class CartItem {
  cartService = inject(CartService);
  cartItem = input.required<IBook>();
  
  removeFromCart() {
    this.cartService.removeFromCart(this.cartItem());
  }
}