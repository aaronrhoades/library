import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { IBook } from '@models/iBook';

@Component({
  imports: [DatePipe],
  selector: 'app-book-card',
  styleUrl: './book-card.scss',
  templateUrl: './book-card.html',
})
export class BookCard {
  book = input.required<IBook>();
  categories = signal<string[]>([]);
  ngOnInit() {
    this.categories.set(this.book().categories.map(category => category.name));
  }
}