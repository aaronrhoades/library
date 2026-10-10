import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IBook } from '@models/iBook';
import { BookCard } from './book-card';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;
  const book: IBook = {
    id: 'test-book-id',
    title: 'Test Book',
    description: '',
    imageUrl: '',
    author: '',
    isbn: '1234567890',
    publisher: '',
    categories: [],
    publishedDate: new Date(),
    pages: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard);
    fixture.componentRef.setInput('book', book);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});