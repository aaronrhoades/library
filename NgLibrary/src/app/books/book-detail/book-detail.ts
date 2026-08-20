import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { IBook } from '@models/iBook';

@Component({
  imports: [DatePipe],
  selector: 'app-book-detail',
  styleUrl: './book-detail.scss',
  templateUrl: './book-detail.html',
})
export class BookDetail {
  book = input.required<IBook>();
  categories = signal<string[]>([]);
  ngOnInit() {
    this.categories.set(this.book().categories.map(category => category.name));
  }
}
