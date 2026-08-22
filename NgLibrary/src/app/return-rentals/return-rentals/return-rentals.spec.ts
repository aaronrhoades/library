import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnRentals } from './return-rentals';

describe('ReturnRentals', () => {
  let component: ReturnRentals;
  let fixture: ComponentFixture<ReturnRentals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRentals],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnRentals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
