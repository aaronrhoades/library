import { TestBed } from '@angular/core/testing';
import { ReturnRentalService } from './return-rental-service';

describe('ReturnRentalService', () => {
  let service: ReturnRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
