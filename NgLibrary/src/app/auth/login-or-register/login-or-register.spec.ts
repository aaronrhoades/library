import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOrRegister } from './login-or-register';

describe('LoginOrRegister', () => {
  let component: LoginOrRegister;
  let fixture: ComponentFixture<LoginOrRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOrRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginOrRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
