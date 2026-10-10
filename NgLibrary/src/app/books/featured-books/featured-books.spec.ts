import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookService } from '../book-service';
import { FeaturedBooks } from './featured-books';

describe('FeaturedBooks', () => {
  let component: FeaturedBooks;
  let fixture: ComponentFixture<FeaturedBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedBooks],
      providers: [{
        provide: BookService,
        useValue: { getFeaturedBooks: () => of([]) },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedBooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
