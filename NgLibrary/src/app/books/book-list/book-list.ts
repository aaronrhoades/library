import { Component, inject, OnInit, signal } from '@angular/core';
import { BookService } from '../book-service';
import { IBook } from '@models/iBook';
import { BookDetail } from '../book-detail/book-detail';
import { RouterLink } from "@angular/router";

@Component({
  imports: [BookDetail, RouterLink],
  selector: 'app-book-list',
  styleUrl: './book-list.scss',
  templateUrl: './book-list.html',
})
export class BookList implements OnInit{
  private bookService = inject(BookService);
  public books = signal<IBook[] | null>(null);
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(books => {
      this.books.set(books);
    });
  }
}
