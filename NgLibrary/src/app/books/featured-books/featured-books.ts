import { Component, inject, OnInit, signal } from '@angular/core';
import { BookService } from '../book-service';
import { IBook } from '@models/iBook';
import { BookCard } from '../book-card/book-card';

@Component({
  imports: [BookCard],
  selector: 'app-featured-books',
  styleUrl: './featured-books.scss',
  templateUrl: './featured-books.html',
})
export class FeaturedBooks implements OnInit{
  bookService = inject(BookService);
  featuredBooks = signal<IBook[]>([]);

  ngOnInit() {
    this.bookService.getFeaturedBooks().subscribe({
      next: value => this.featuredBooks.set(value)
    });
  }
}
