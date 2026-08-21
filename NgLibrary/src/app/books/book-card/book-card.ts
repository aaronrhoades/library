import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '@models/iBook';
import { CartService } from '../../cart/cart-service';
import { AuthService } from '../../auth/auth-service';

@Component({
  imports: [DatePipe],
  selector: 'app-book-card',
  styleUrl: './book-card.scss',
  templateUrl: './book-card.html',
})
export class BookCard {
  book = input.required<IBook>();
  router = inject(Router);
  authService = inject(AuthService);
  cartService = inject(CartService);
  categories = signal<string[]>([]);
  ngOnInit() {
    this.categories.set(this.book().categories.map(category => category.name));
  }
  onViewDetails() {
    // Navigate to the book detail page using the book's ID
    this.router.navigate([`/book/${this.book().id}`]);
  }
  addToCart() {
    this.cartService.addToCart(this.book());
  }
}