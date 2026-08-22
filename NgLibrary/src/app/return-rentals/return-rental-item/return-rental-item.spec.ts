import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnRentalItem } from './return-rental-item';

describe('ReturnRentalItem', () => {
  let component: ReturnRentalItem;
  let fixture: ComponentFixture<ReturnRentalItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRentalItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnRentalItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
