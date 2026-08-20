import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, required, FormField } from '@angular/forms/signals';
import { BookService } from '../book-service';
import { CategoryService } from '../../shared/services/category-service';
import { ICategory } from '@models/iCategory';
import { IBook } from '@models/iBook';
interface IBookForm {
  author: string;
  title: string;
  publishedDate: Date;
  isbn: string;
  publisher: string;
  categoryIds: string[];
  pages: number;
  id: string;
}
@Component({
  imports: [FormField, FormsModule],
  selector: 'app-book-add',
  styleUrl: './book-add.scss',
  templateUrl: './book-add.html',
})

export class BookAdd implements OnInit {
  bookService = inject(BookService);
  categoryService = inject(CategoryService);
  categories = signal<ICategory[] | null>(null);
  bookAddModel = signal<IBookForm>({
    author: '',
    title: '',
    publishedDate: new Date(),
    isbn: '',
    publisher: '',
    categoryIds: [],
    pages: 0,
    id: ''
  });
  bookAddForm = form(this.bookAddModel, (schema) => {
    required(schema.title);
  });

  ngOnInit() {
    this.categoryService.getAllCategories()
    .subscribe(categories => {
      this.categories.set(categories);
    });
  }
  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted:', this.bookAddForm().value());
    if (this.bookAddForm().valid()) {
      console.log('Form is valid. Proceeding to save the book.');
      const bookFormValue = this.bookAddForm().value();
      const selectedCategories = this.categories()?.filter(category => {
        return bookFormValue.categoryIds.includes(category.id);
      });

      const newBook: Omit<IBook, 'id'> = {
        title: bookFormValue.title,
        author: bookFormValue.author,
        publishedDate: bookFormValue.publishedDate,
        isbn: bookFormValue.isbn,
        publisher: bookFormValue.publisher,
        categories: selectedCategories || [],
        pages: bookFormValue.pages
      }
      this.bookService.saveBook(newBook).subscribe({
        next: () => {
          console.log('Book saved successfully');
        },
        error: (error) => {
          console.error('Error saving book:', error);
        }
      });
    }
  }
}
