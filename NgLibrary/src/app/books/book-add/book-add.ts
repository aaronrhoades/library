import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, required, FormField } from '@angular/forms/signals';
import { BookService } from '../book-service';
import { CategoryService } from '../../shared/services/category-service';
import { ICategory } from '@models/iCategory';
import { IBook } from '@models/iBook';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
interface IBookForm {
  author: string;
  title: string;
  description: string;
  publishedDate: string;
  imageUrl: string;
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
  id = input<string | null>(null);
  bookService = inject(BookService);
  categoryService = inject(CategoryService);
  categories = signal<ICategory[] | null>(null);
  selectedCategories = computed(() =>this.categories()?.filter(category => {
        return this.bookAddForm().value().categoryIds.includes(category.id);
      }));
  router = inject(Router);
  bookAddModel = signal<IBookForm>({
    author: '',
    title: '',
    description: '',
    imageUrl: '',
    publishedDate: this.toDateInputValue(new Date()),
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

    if (this.id()) {
      this.bookService.getBookById(this.id() as string).subscribe(
        {
          next: (book) => {
            console.log('Fetched book:', book);
            this.bookAddModel.set(this.mapBookToForm(book));
          }
        }
      );
    }
  }
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.bookAddForm().valid()) {
      const bookFormValue = this.bookAddForm().value();
      let saveBook$: Observable<unknown> = new Observable();
      if(this.id()) {
        const updatedBook: IBook = {
          id: this.id() as string,
          title: bookFormValue.title,
          description: bookFormValue.description,
          imageUrl: bookFormValue.imageUrl,
          author: bookFormValue.author,
          publishedDate: new Date(`${bookFormValue.publishedDate}T00:00:00`),
          isbn: bookFormValue.isbn,
          publisher: bookFormValue.publisher,
          categories: this.selectedCategories() || [],
          pages: bookFormValue.pages,

        }

        saveBook$ = this.bookService.updateBook(updatedBook);
      }
      else {

        const newBook: Omit<IBook, 'id'> = {
          title: bookFormValue.title,
          description: bookFormValue.description,
          imageUrl: bookFormValue.imageUrl,
          author: bookFormValue.author,
          publishedDate: new Date(`${bookFormValue.publishedDate}T00:00:00`),
          isbn: bookFormValue.isbn,
          publisher: bookFormValue.publisher,
          categories: this.selectedCategories() || [],
          userId: null,
          pages: bookFormValue.pages,
        }

        saveBook$ = this.bookService.saveBook(newBook)
      }

      saveBook$.subscribe({
        next: () => {
          console.log('Book saved successfully');
          this.id() ? this.backToDetails() : this.backToBookList();
        },
        error: (error) => {
          console.error('Error saving book:', error);
        }
      });
    }
  }
  mapBookToForm(book: IBook): IBookForm {
    console.log('Mapping book to form:', book.publishedDate);
    return {
      author: book.author,
      title: book.title,
      description: book.description,
      imageUrl: book.imageUrl,
      publishedDate: this.toDateInputValue(book.publishedDate),
      isbn: book.isbn,
      publisher: book.publisher,
      categoryIds: book.categories.map(cat => cat.id),
      pages: book.pages,
      id: book.id
    };
  }
 backToDetails() {
    if (this.id()) {
      // Navigate to the book detail page using the book's ID
      this.router.navigate([`/book/${this.id()}`]);
    }
  }
  backToBookList() {
    this.router.navigate(['/books']);
  }
  private toDateInputValue(value: Date | string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
