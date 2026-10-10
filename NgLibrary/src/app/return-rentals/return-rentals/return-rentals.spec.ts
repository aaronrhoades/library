import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReturnRentalService } from '../return-rental-service';
import { ReturnRentals } from './return-rentals';

describe('ReturnRentals', () => {
  let component: ReturnRentals;
  let fixture: ComponentFixture<ReturnRentals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRentals],
      providers: [{
        provide: ReturnRentalService,
        useValue: {
          getRentalsGroupByUserEmail: () => of([]),
          getRentalsByUserEmail: () => of([]),
          returnRental: () => of(undefined),
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnRentals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
