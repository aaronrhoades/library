import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { BookService } from '../book-service';
import { IBook } from '@models/iBook';
import { IBookSearchFilter } from '@models/iBookSearchFilter';
import { Router, RouterLink } from '@angular/router';
import { debounce, form, FormField } from '@angular/forms/signals';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth-service';
import { CartService } from '../../cart/cart-service';
import { FeaturedBooks } from '../featured-books/featured-books';

type SortField = 'Title' | 'Author' | 'Available';
type SortDirection = 'asc' | 'desc';

interface BookSearchFilterForm {
  title: string;
  author: string;
  available: string;
  sortBy?: SortField;
  sortDirection?: SortDirection;
}

@Component({
  imports: [RouterLink, FormField, FeaturedBooks],
  selector: 'app-book-list',
  styleUrl: './book-list.scss',
  templateUrl: './book-list.html',
})
export class BookList implements OnInit {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);
  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);

  public books = signal<IBook[] | null>(null);
  public pageNumber = signal(1);
  public pageSize = 10;
  public totalPages = signal(0);
  public totalCount = signal(0);

  searchModel = signal<BookSearchFilterForm>({
    title: '',
    author: '',
    available: '',
    sortBy: 'Title',
    sortDirection: 'asc',
  });

  searchForm = form(this.searchModel, (schema) => {
    debounce(schema.title, 300),
      debounce(schema.author, 300),
      debounce(schema.available, 300)
  });

  debouncedQuery = computed(() => this.searchForm().value());
  pagedQuery = computed(() => ({
    ...this.debouncedQuery(),
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize,
  }));
  debouncedQuery$ = toObservable(this.pagedQuery);

  constructor() {
    effect(() => {
      this.debouncedQuery();
      this.pageNumber.set(1);
    });
  }

  ngOnInit(): void {
    this.debouncedQuery$
      .pipe(
        distinctUntilChanged((prev, curr) =>
          prev.title === curr.title &&
          prev.author === curr.author &&
          prev.available === curr.available &&
          prev.sortBy === curr.sortBy &&
          prev.sortDirection === curr.sortDirection &&
          prev.pageNumber === curr.pageNumber &&
          prev.pageSize === curr.pageSize),
        switchMap(() => {
          const formValue = this.searchForm().value();
          const rawAvailable = formValue.available;
          const available = rawAvailable === '' ? undefined : rawAvailable === 'true';

          const filter: IBookSearchFilter = {
            title: formValue.title?.trim() || undefined,
            author: formValue.author?.trim() || undefined,
            available,
            sortBy: formValue.sortBy ?? 'Title',
            sortDirection: formValue.sortDirection ?? 'asc',
            pageNumber: this.pageNumber(),
            pageSize: this.pageSize,
          };

          return this.bookService.searchBooks(filter);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: result => {
          this.books.set(result.items);
          this.totalCount.set(result.totalCount);
          this.totalPages.set(result.totalPages);
        },
      });
  }

  toggleSort(column: SortField): void {
    const current = this.searchModel();

    const isSameColumn = current.sortBy === column;
    const nextDirection: SortDirection = isSameColumn
      ? (current.sortDirection === 'asc' ? 'desc' : 'asc')
      : 'asc';

    this.searchModel.set({
      ...current,
      sortBy: column,
      sortDirection: nextDirection,
    });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.pageNumber.set(pageNumber);
    }
  }

  sortIndicator(column: SortField): string {
    const current = this.searchModel();
    if (current.sortBy !== column) return '';
    return current.sortDirection === 'asc' ? '↑' : '↓';
  }

  viewBookDetails(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }

  addBookToCart(book: IBook): void {
    this.cartService.addToCart(book);
  }

  removeBookFromCart(book: IBook, event: Event) {
    event.preventDefault();
    this.cartService.removeFromCart(book);
  }

}
