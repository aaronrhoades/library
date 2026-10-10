import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Receipt } from './receipt';

describe('Receipt', () => {
  let component: Receipt;
  let fixture: ComponentFixture<Receipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Receipt],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Receipt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
