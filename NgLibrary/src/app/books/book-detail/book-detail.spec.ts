import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetail } from './book-detail';
import { BookService } from '../book-service';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart-service';
import { IBook } from '@models/iBook';

const mockBook: IBook = {
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
const bookServiceMock = {
  getBookById: vi.fn().mockReturnValue(of(mockBook)),
};

describe('BookDetail', () => {
  let component: BookDetail;
  let fixture: ComponentFixture<BookDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetail],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetail);
    fixture.componentRef.setInput('id', 'test-book-id');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the books page when goBack is called', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/books']);
  });

  it('should call addToCart on cartService when addToCart is called', () => {
    const cartService = TestBed.inject(CartService);
    const addToCartSpy = vi.spyOn(cartService, 'addToCart');
    component.addToCart();
    expect(addToCartSpy).toHaveBeenCalledWith(mockBook);
  });
});
