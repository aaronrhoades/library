import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BookService } from '../book-service';
import { BookList } from './book-list';

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [
        provideRouter([]),
        {
          provide: BookService,
          useValue: {
            searchBooks: () => of({
              items: [],
              pageNumber: 1,
              pageSize: 10,
              totalCount: 0,
              totalPages: 0,
            }),
            getFeaturedBooks: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
