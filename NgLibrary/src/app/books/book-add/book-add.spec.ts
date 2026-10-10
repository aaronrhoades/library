import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookService } from '../book-service';
import { CategoryService } from '../../shared/services/category-service';
import { BookAdd } from './book-add';

describe('BookAdd', () => {
  let component: BookAdd;
  let fixture: ComponentFixture<BookAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAdd],
      providers: [
        {
          provide: BookService,
          useValue: {
            getBookById: () => of(null),
            saveBook: () => of(undefined),
            updateBook: () => of(undefined),
          },
        },
        {
          provide: CategoryService,
          useValue: { getAllCategories: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
