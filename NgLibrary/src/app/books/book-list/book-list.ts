import { Component, computed, DestroyRef, inject, OnChanges, OnInit, signal } from '@angular/core';
import { BookService } from '../book-service';
import { IBook } from '@models/iBook';
import { BookCard } from '../book-card/book-card';
import { RouterLink } from "@angular/router";
import { debounce, form, FormField } from '@angular/forms/signals';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth/auth-service';
interface SearchTerm {
  title: string
}
@Component({
  imports: [BookCard, RouterLink, FormField],
  selector: 'app-book-list',
  styleUrl: './book-list.scss',
  templateUrl: './book-list.html',
})
export class BookList implements OnInit, OnChanges {
  authService = inject(AuthService);
  searchModel = signal<SearchTerm>({title: ''});
  searchForm = form(this.searchModel, (config) => {
    debounce(config.title, 300)
  });
  debouncedQuery = computed(() => this.searchForm().value().title);
  debouncedQuery$ = toObservable(this.debouncedQuery);

  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);
  public books = signal<IBook[] | null>(null);
  ngOnInit(): void {
    this.getAndSetAllBooks();
    
   
    this.debouncedQuery$.pipe(
      distinctUntilChanged(),
      tap(() => console.log('tap')),
      switchMap(val => val === '' ? this.bookService.getAllBooks() : this.bookService.searchBooks(val)),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: books => this.books.set(books),
      complete: () => console.log('Observable completed')
    })
  }
  ngOnChanges(changes: any) {
    console.log(changes);
  }

  getAndSetAllBooks() {
    this.bookService.getAllBooks().subscribe(books => {
      this.books.set(books);
    });
  }
}
