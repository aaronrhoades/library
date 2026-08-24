import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartNotificationBar } from './cart-notification-bar';

describe('CartNotificationBar', () => {
  let component: CartNotificationBar;
  let fixture: ComponentFixture<CartNotificationBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartNotificationBar],
    }).compileComponents();

    fixture = TestBed.createComponent(CartNotificationBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
