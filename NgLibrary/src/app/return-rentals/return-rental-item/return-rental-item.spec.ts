import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IBook } from '@models/iBook';
import { ReturnRentalItem } from './return-rental-item';

describe('ReturnRentalItem', () => {
  let component: ReturnRentalItem;
  let fixture: ComponentFixture<ReturnRentalItem>;
  const rental: IBook = {
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
      imports: [ReturnRentalItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnRentalItem);
    fixture.componentRef.setInput('rental', rental);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
