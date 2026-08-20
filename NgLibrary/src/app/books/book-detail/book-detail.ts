import { Component, inject, input, signal } from '@angular/core';
import { BookService } from '../book-service';
import { DatePipe } from '@angular/common';
import { IBook } from '@models/iBook';
import { Router } from '@angular/router';

@Component({
  imports: [DatePipe],
  selector: 'app-book-detail',
  styleUrl: './book-detail.scss',
  templateUrl: './book-detail.html',
})
export class BookDetail {
  router = inject(Router);
  id = input.required<string>();
  bookService = inject(BookService);
  book = signal<IBook | null>(null);
  categories = signal<string[]>([]);

  ngOnInit() {
    const bookId = this.id();
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe(book => {
        this.book.set(book);
        this.categories.set(book.categories.map(category => category.name));
      });
    }
  }
  goBack() {
    this.router.navigate(['/books']);
  }
  onEdit() {
    this.router.navigate([`/book/edit/${this.id()}`]);
  }
  onDelete() {
    const bookId = this.id();
    if (bookId) {
      // Call the delete method from the BookService
      this.bookService.deleteBook(bookId).subscribe(() => {
        // After deletion, navigate back to the book list
        this.router.navigate(['/books']);
      });
    }
  }
}
