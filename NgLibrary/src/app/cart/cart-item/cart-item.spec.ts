import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IBook } from '@models/iBook';
import { CartItem } from './cart-item';

describe('CartItem', () => {
  let component: CartItem;
  let fixture: ComponentFixture<CartItem>;
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
      imports: [CartItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItem);
    fixture.componentRef.setInput('cartItem', book);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
